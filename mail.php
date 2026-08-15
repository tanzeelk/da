<?php
/**
 * Shared form-to-email relay for DA Group's contact and career forms.
 *
 * Replaces the third-party Web3Forms submission target. Uses PHPMailer over
 * authenticated SMTP so mail actually lands (vs. PHP's bare mail(), which
 * commonly gets spam-filtered) and gives full control over the resume
 * attachment size limit, which was the root cause of the career form's old
 * "Request Too Long" error on Web3Forms.
 *
 * Both career.html and contact.html POST here with a hidden "form_type"
 * field ("career" or "contact") so one script can serve both.
 *
 * ── SETUP (do this before deploying) ──────────────────────────────────
 * 1. In Hostinger hPanel → Emails, create/confirm the mailbox this sends
 *    FROM (e.g. noreply@dagroupindia.com) and note its password.
 * 2. Fill in SMTP_USERNAME and SMTP_PASSWORD below. Never commit real
 *    credentials to a public repo — on a private repo this is acceptable,
 *    but consider moving them to a .env file loaded outside web root if
 *    the repo is ever made public.
 * 3. SMTP_HOST/SMTP_PORT below match Hostinger's standard mail server;
 *    confirm in hPanel → Emails → Connect Devices if they differ.
 * ─────────────────────────────────────────────────────────────────────
 */

require __DIR__ . '/lib/PHPMailer/Exception.php';
require __DIR__ . '/lib/PHPMailer/PHPMailer.php';
require __DIR__ . '/lib/PHPMailer/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception as PHPMailerException;

header('Content-Type: application/json');

// ── Config — fill in real values before deploy ──────────────────────────
const SMTP_HOST     = 'smtp.hostinger.com';
const SMTP_PORT     = 465; // 465 = SSL, 587 = STARTTLS — confirm in hPanel
const SMTP_USERNAME = 'noreply@dagroupindia.com'; // TODO: confirm/create this mailbox in hPanel
const SMTP_PASSWORD = 'REPLACE_WITH_REAL_MAILBOX_PASSWORD';           // TODO
const MAIL_FROM     = 'noreply@dagroupindia.com';                     // TODO
const MAIL_FROM_NAME = 'DA Group Website';

const CONTACT_TO = 'contact@dagroupindia.com'; // where "Get in touch" submissions land
const CAREER_TO  = 'contact@dagroupindia.com'; // TODO: point to actual HR inbox if different

const MAX_RESUME_BYTES = 5 * 1024 * 1024; // 5 MB — matches client-side check in career.html
const ALLOWED_RESUME_TYPES = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

function respond(bool $success, string $message): void
{
    http_response_code($success ? 200 : 400);
    echo json_encode(['success' => $success, 'message' => $message]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(false, 'Invalid request method.');
}

// Honeypot — both forms already carry this hidden field; a filled value means a bot
if (!empty($_POST['botcheck'])) {
    // Return success so bots don't learn the honeypot failed, but send nothing
    respond(true, 'Thank you.');
}

$formType = $_POST['form_type'] ?? '';

$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host       = SMTP_HOST;
    $mail->SMTPAuth   = true;
    $mail->Username   = SMTP_USERNAME;
    $mail->Password   = SMTP_PASSWORD;
    $mail->SMTPSecure = SMTP_PORT === 465 ? PHPMailer::ENCRYPTION_SMTPS : PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = SMTP_PORT;

    $mail->setFrom(MAIL_FROM, MAIL_FROM_NAME);
    $mail->isHTML(false);

    if ($formType === 'career') {
        $name       = trim($_POST['name'] ?? '');
        $email      = trim($_POST['email'] ?? '');
        $telephone  = trim($_POST['telephone'] ?? '');
        $position   = trim($_POST['position'] ?? '');

        if ($name === '' || $email === '' || $telephone === '' || $position === '') {
            respond(false, 'Please fill in all required fields.');
        }
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            respond(false, 'Please enter a valid email address.');
        }

        if (!isset($_FILES['resume']) || $_FILES['resume']['error'] === UPLOAD_ERR_NO_FILE) {
            respond(false, 'Please attach your resume.');
        }
        $resume = $_FILES['resume'];

        if ($resume['error'] !== UPLOAD_ERR_OK) {
            // UPLOAD_ERR_INI_SIZE / UPLOAD_ERR_FORM_SIZE mean it exceeded php.ini's
            // upload_max_filesize / post_max_size — raise those in php.ini or
            // an .htaccess php_value override if this fires legitimately.
            respond(false, 'Resume upload failed. Please try a smaller file (max 5 MB).');
        }
        if ($resume['size'] > MAX_RESUME_BYTES) {
            respond(false, 'Resume is too large. Please upload a file under 5 MB.');
        }
        $mimeType = mime_content_type($resume['tmp_name']);
        if (!in_array($mimeType, ALLOWED_RESUME_TYPES, true)) {
            respond(false, 'Unsupported file type. Please upload a PDF, DOC, or DOCX.');
        }

        $mail->addAddress(CAREER_TO);
        $mail->addReplyTo($email, $name);
        $mail->Subject = 'New Career Application - DA Group Website';
        $mail->Body =
            "New job application from the DA Group careers page.\n\n" .
            "Name: {$name}\n" .
            "Email: {$email}\n" .
            "Telephone: {$telephone}\n" .
            "Position: {$position}\n";

        $mail->addAttachment($resume['tmp_name'], $resume['name']);

    } elseif ($formType === 'contact') {
        $firstName = trim($_POST['first_name'] ?? '');
        $lastName  = trim($_POST['last_name'] ?? '');
        $email     = trim($_POST['email'] ?? '');
        $company   = trim($_POST['company'] ?? '');
        $position  = trim($_POST['position'] ?? '');
        $message   = trim($_POST['message'] ?? '');

        if ($firstName === '' || $lastName === '' || $email === '' || $message === '') {
            respond(false, 'Please fill in all required fields.');
        }
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            respond(false, 'Please enter a valid email address.');
        }
        if (strlen($message) < 10) {
            respond(false, 'Message is too short.');
        }

        $mail->addAddress(CONTACT_TO);
        $mail->addReplyTo($email, "{$firstName} {$lastName}");
        $mail->Subject = 'New Contact Enquiry - DA Group Website';
        $mail->Body =
            "New enquiry from the DA Group contact page.\n\n" .
            "Name: {$firstName} {$lastName}\n" .
            "Email: {$email}\n" .
            "Company: " . ($company !== '' ? $company : '—') . "\n" .
            "Position: " . ($position !== '' ? $position : '—') . "\n\n" .
            "Message:\n{$message}\n";

    } else {
        respond(false, 'Unknown form type.');
    }

    $mail->send();
    respond(true, 'Thank you! Your submission has been received.');

} catch (PHPMailerException $e) {
    error_log('mail.php PHPMailer error: ' . $mail->ErrorInfo);
    respond(false, 'Something went wrong sending your message. Please try again shortly.');
} catch (Throwable $e) {
    error_log('mail.php error: ' . $e->getMessage());
    respond(false, 'Something went wrong. Please try again.');
}
