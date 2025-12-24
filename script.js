const heroText = document.querySelector(".hero-text");
const body = document.body;
const circleBack = document.querySelector(".circle-back");

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Fixed Navigation Bar - Show from Scene 4 onwards till the end
const fixedNav = document.getElementById("fixedNav");

ScrollTrigger.create({
  trigger: ".scene4",
  start: "center center",
  endTrigger: "body",
  end: "bottom bottom",
  onEnter: () => fixedNav.classList.add("visible"),
  onLeaveBack: () => fixedNav.classList.remove("visible"),
  markers: false,
});

// Smooth scroll for footer links
document.querySelectorAll('a[href="#footer"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("footer").scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
});

// Hero title animation
gsap.from(".title", {
  duration: 1.5,
  y: 50,
  opacity: 0,
  ease: "power3.out",
});

// Parallax scroll effect
gsap.to(".layer-bg", {
  y: -100,
  scrollTrigger: {
    trigger: ".parallax",
    start: "top bottom",
    scrub: true,
  },
});

gsap.to(".layer-mid", {
  y: -200,
  scrollTrigger: {
    trigger: ".parallax",
    start: "top bottom",
    scrub: true,
  },
});

gsap.to(".layer-fg", {
  y: -300,
  scrollTrigger: {
    trigger: ".parallax",
    start: "top bottom",
    scrub: true,
  },
});

// Fade-in content section
gsap.to(".content", {
  opacity: 1,
  duration: 1.5,
  y: -30,
  scrollTrigger: {
    trigger: ".content",
    start: "top 80%",
    toggleActions: "play none none reverse",
  },
});

let tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".scene1",
    start: "top top",
    end: "+=2400", // longer scroll to allow rotation + expansion
    scrub: true,
    pin: true,
    markers: false,
  },
});

let t2 = gsap.timeline({
  scrollTrigger: {
    trigger: ".scene2",
    start: "top top",
    end: "+=1500", // extended to allow image expansion
    scrub: true,
    pin: true,
    markers: false,
  },
});

const topBar = document.querySelector(".top-bar");

const finalText = document.querySelector(".final-text");
const lines = finalText.textContent.trim().split("\n"); // split by new line
finalText.innerHTML = "";

// Wrap lines
lines.forEach((lineText, i) => {
  const line = document.createElement("div");
  line.classList.add("line");
  if (i % 2 === 1) line.classList.add("indent"); // indent 2nd & 4th line

  const words = lineText.trim().split(" ");
  words.forEach((word) => {
    const span = document.createElement("span");
    span.textContent = word + " ";
    span.style.opacity = 0; // Start hidden
    line.appendChild(span);
  });

  finalText.appendChild(line);
});

const spans = finalText.querySelectorAll("span");
const logo = document.querySelector(".logo");
gsap.set(spans, { opacity: 0 });
gsap.set(finalText, { opacity: 1 });
// Create clones of the back circle BEFORE adding the background
const circleLeft = circleBack.cloneNode(true);
const circleRight = circleBack.cloneNode(true);
const circleCenter = circleBack.cloneNode(true);

// Now add the background image only to the original circleBack
const circleBackBg = document.createElement("div");
circleBackBg.classList.add("circle-back-bg");
circleBack.appendChild(circleBackBg);

circleLeft.classList.add("circle-left");
circleRight.classList.add("circle-right");
circleCenter.classList.add("circle-center");

// Set initial opacity to 0 so they appear with animation
circleLeft.style.opacity = 0;
circleRight.style.opacity = 0;
circleCenter.style.opacity = 0;

// Append clones to the scene
const circle = document.querySelector(".circle");
circle.appendChild(circleLeft);
circle.appendChild(circleRight);
circle.appendChild(circleCenter);

// Scene 4 Timeline - Red circle and image rise up, then image slides left
let t4 = gsap.timeline({
  scrollTrigger: {
    trigger: ".scene4",
    start: "top 50%",
    end: "+=1200",
    scrub: 1,
    pin: true,
    markers: false,
  },
});

tl.to(
  ".circle-back",
  {
    rotationY: 0,
    duration: 1,
    repeat: 0,
    ease: "none",
  },
  0
);

tl.to(
  ".circle-front",
  {
    opacity: 0,
    duration: 0.2,
    ease: "power1.out",
  },
  ">"
);

tl.to(".circle-back", {
  scale: 4,
  ease: "none",
  onUpdate: function () {
    const scale = gsap.getProperty(".circle-back", "scale");
    const textEl = document.querySelector(".scroll-text");

    if (scale >= 1 && scale < 9 && !window._textChanged) {
      textEl.innerText = "Scroll continue";
    }
  },
});

// medium → large
tl.to(".circle-back", {
  scale: 12,
  ease: "none",
  onUpdate: function () {
    const scale = gsap.getProperty(".circle-back", "scale");
    const textEl = document.querySelector(".scroll-text");

    if (scale > 9 && scale < 10) {
      textEl.innerText = "Get started";
    }

    if (scale > 10 && !window._textFaded) {
      gsap.to(textEl, {
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
      });

      window._textFaded = true;
    }
  },
});

tl.to(
  spans,
  {
    opacity: 1,
    stagger: 0.18,
    duration: 0.3,
    ease: "power2.out",
  },
  ">"
);
// Fade out the typewriter text once all letters are visible
tl.to(finalText, { opacity: 0, duration: 0.5 });

// Fade in top bar (logo + menu) simultaneously
tl.to(topBar, { opacity: 1, duration: 0.5, ease: "power2.out" });
tl.to(logo, { opacity: 1, duration: 0.5 }, "<");

// Lock top bar in fixed position after it fades in
tl.to(
  topBar,
  {
    duration: 0.1,
    onComplete: function () {
      gsap.set(topBar, {
        position: "fixed",
        top: "40px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 100,
      });
    },
  },
  "<"
);

// Start circles, text animations all together
// Step 1: All circles and image fade in together
tl.to(
  [circleLeft, circleRight],
  {
    opacity: 1,
    duration: 0.1,
  },
  ">"
);

tl.to(
  circleCenter,
  {
    opacity: 0.5,
    duration: 0.1,
  },
  "<"
);

tl.to(
  circleBackBg,
  {
    opacity: 1,
    duration: 0.1,
    ease: "power2.out",
  },
  "<"
);

// Step 2: Left and right circles move out while text animations happen
tl.to(
  circleLeft,
  {
    x: "-150vw",
    duration: 2.6,
    ease: "power2.inOut",
  },
  ">"
);

tl.to(
  circleRight,
  {
    x: "150vw",
    duration: 2.6,
    ease: "power2.inOut",
  },
  "<"
);

// First line of hero text (red) - slides up from bottom at same time as circles move
tl.fromTo(
  heroText,
  { opacity: 0, y: 200 },
  { opacity: 1, y: -40, duration: 1, ease: "power2.inOut" },
  "<"
);

// Second line of hero text (blue) - starts from much lower, ends much lower
tl.fromTo(
  heroText.querySelector("span"),
  { opacity: 0.5, y: 230 },
  { opacity: 1, y: 10, duration: 2, ease: "power2.inOut" },
  "<"
);

// Journey text appears with hero text
const journeyText = document.querySelector(".journey-text");
tl.fromTo(
  journeyText,
  { opacity: 0, y: 300 },
  { opacity: 1, y: 190, duration: 2, ease: "power2.inOut" },
  "<"
);

// Step 3: After text animations stop, circleCenter moves down and grows
tl.to(
  circleCenter,
  { y: 750, opacity: 1, scale: 15, duration: 1.2, ease: "power2.out" },
  "+=0.5"
);

// Lock circleCenter in place after animation completes
tl.to(circleCenter, {
  duration: 1,
  onComplete: function () {
    // Remove from ScrollTrigger timeline so it doesn't move with scroll
    gsap.set(circleCenter, { position: "fixed", top: "53%", left: "48%" });
  },
});

const circleBackScene2Top = document.querySelector(".scene2 .circle-back.top");
const circleBackScene2 = document.querySelector(".scene2 .circle-back.back");
const heroTextScene2 = document.querySelector(".scene2 .hero-text-scene2");
// Add a background inside the center circle
const circleBackScene2Bg = document.createElement("div");
circleBackScene2Bg.classList.add("circle-back-scene2-bg");
circleBackScene2.appendChild(circleBackScene2Bg);

const foundingText = document.querySelector(".founding-text");
const growthText = document.querySelector(".growth-text");

// Fade in hero text while circles leave
t2.fromTo(
  heroTextScene2,
  { opacity: 0, y: 200 }, // starts far down
  { opacity: 1, y: -40, duration: 1.5, ease: "power2.out" },
  "<-1.5"
);

// Everything starts scrolling up earlier
t2.to(
  circleBackScene2Top,
  {
    y: "90vh",
    duration: 2.2,
    ease: "power2.inOut",
  },
  "<"
);

// Second line of hero text (white span) in scene2 - slides up after first
t2.fromTo(
  heroTextScene2.querySelector("span"),
  { opacity: 0, y: 200 }, // starts far down
  { opacity: 1, y: 10, duration: 1.5, ease: "power2.out" },
  "<1" // starts slightly after first line
);

// Founding text appears after heroText2
t2.fromTo(
  foundingText,
  { opacity: 0, y: 300 },
  { opacity: 1, y: 190, duration: 1, ease: "power2.out" }
);

// Growth text appears slightly after founding text
t2.fromTo(
  growthText,
  { opacity: 0, y: 300 },
  { opacity: 1, y: 170, duration: 1.5, ease: "power2.out" },
  "<0.5"
);

const scene3Image = document.querySelector(".scene3-image");
const scene3RedCircle = document.querySelector(".scene3-red-circle");
const scene3GroupText = document.querySelector(".scene3-group-text");
const scene3VenturesText = document.querySelector(".scene3-ventures-text");
const scene3RedCircleText = document.querySelector(".scene3-red-circle-text");

// Background circles
const bgCircles = document.querySelectorAll(".bg-circle");

// ScrollTrigger timeline
let t3 = gsap.timeline({
  scrollTrigger: {
    trigger: ".scene3",
    // start: "top bottom",    // starts when scene is just entering viewport
    // end: "bottom 40%",   // longer scroll distance = smoother animations
    // scrub: 4,            // smooth interpolation tied to scroll
    start: "top 80%",
    end: "bottom 80%",
    scrub: 1.5,
    markers: false,
  },
});

// -----------------------
// Step 1: Fade in image + circle together
t3.fromTo(
  scene3Image,
  { opacity: 0, width: "330px", height: "330px", borderRadius: "50%" },
  { opacity: 1, ease: "power2.out" }
);

t3.fromTo(
  scene3RedCircle,
  { opacity: 0, width: "300px", height: "300px" },
  { opacity: 0.9, ease: "power2.out" },
  0
);

let expandTL = gsap.timeline();

expandTL.to(scene3Image, {
  width: "100vw",
  height: "330px",
  borderRadius: "200px",
  ease: "none", // no easing so scroll fully controls pace
  duration: 1,
});

expandTL.to(
  scene3RedCircle,
  {
    left: "calc(50vw - 100px)",
    ease: "none", // important! scroll-controlled
    duration: 1,
  },
  0.1
); // starts at the same time as the image expansion

t3.add(expandTL, ">0.5");

// -----------------------
// Step 4: Gradually transition border-radius to rectangle
t3.to(
  scene3Image,
  {
    borderRadius: "0px",
    ease: "power2.out",
  },
  "<+=1"
); // starts slightly after expansion begins

// -----------------------
// Step 5: Fade + slide up 'Our Group' and 'Our Ventures' texts
t3.fromTo(
  scene3GroupText,
  { opacity: 0, y: 250 },
  { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" }
);

t3.fromTo(
  scene3VenturesText,
  { opacity: 0, y: 250 },
  { opacity: 1, y: -40, duration: 0.9, ease: "power3.out" }
);

t3.fromTo(
  scene3RedCircleText,
  { opacity: 0, y: 200 },
  { opacity: 1, y: -10, duration: 1, ease: "power2.inOut" },
  "<"
);

// Animate the 4 main grey circles from grey-circles-section
const greyCircles = document.querySelectorAll(".grey-circle");
// Timeline for background circles floating up
let floatTL = gsap.timeline({
  scrollTrigger: {
    trigger: ".scene3",
    start: "top 20%", // start earlier when scene3 enters viewport
    end: "bottom 20%", // end later for longer animation duration
    scrub: 2,
    markers: false,
  },
});

bgCircles.forEach((circle, i) => {
  // 60% chance to float up and disappear, 40% chance to float up and stop
  const floatAway = Math.random() < 0.5;

  floatTL.fromTo(
    circle,
    { y: 0, opacity: 1 }, // start visible at their natural position
    {
      y: floatAway ? -400 : -100, // float up high and disappear OR float up a bit and stop
      opacity: floatAway ? 0 : 1, // fade out if floating away, stay visible if stopping
      ease: "power1.out",
    },
    i * 0.05 // slight stagger for more dynamic effect
  );
});

// Separate timeline for grey circles with different timing
let greyCirclesTL = gsap.timeline({
  scrollTrigger: {
    trigger: ".scene3",
    start: "top 40%", // start later so animation happens when you reach scene3
    end: "bottom 30%", // end when scene3 leaves viewport
    scrub: 1.5,
    markers: false,
  },
});

// Animate grey circles sliding in with random speeds
greyCircles.forEach((circle, index) => {
  // const randomSpeed = 1.5 + Math.random() * 1.5; // Random duration between 1.5-3 seconds
  const randomSpeed = 1.6 + Math.random() * 1.2; // 1.6–2.8s

  greyCirclesTL.fromTo(
    circle,
    { y: 200, opacity: 0 }, // Start from below
    {
      y: -100, // End at original position
      opacity: 1,
      duration: randomSpeed,
      ease: "sine.out"
    },
    0 // Start at the beginning of the timeline
  );
});

const scene4ImageCircle = document.querySelector(".scene4-image-circle");
const scene4RedCircle = document.querySelector(".scene4-red-circle");
const scene4GreyCircle = document.querySelector(".scene4-grey-circle");
// Falling circle from scene3 to scene4
const scene4FallingCircle = document.querySelector(".scene4-falling-circle");
const scene4SmallRedCircle = document.querySelector(".scene4-small-red-circle");
const scene4SmallRedCircleRight = document.querySelector(
  ".scene4-small-red-circle-right"
);
const scene4Tagline = document.querySelector(".scene4-tagline");
const scene4NewText = document.querySelector(".scene4-new-text");
const scene4Group1 = document.querySelector(".scene4-group-1");
const scene4Group2 = document.querySelector(".scene4-group-2");

const scene4RedText = document.querySelector(".scene4-red-text");

// Set initial positions: red circle and image start below viewport
gsap.set([scene4RedCircle, scene4ImageCircle], { y: 500 });
gsap.set(scene4RedCircle, { y: 200 });
gsap.set(scene4SmallRedCircle, { y: -500 });
gsap.set(scene4SmallRedCircleRight, { x: 0 });

// Step 1: Red circle and image rise up together (0-0.4)
t4.to(
  scene4ImageCircle,
  {
    y: -50,
    duration: 0.4,
    ease: "power2.out",
  },
  0
);
t4.to(
  scene4RedCircle,
  {
    y: -350,
    duration: 0.4,
    ease: "power2.out",
  },
  "<"
);

// Small red circle drops from top (0-0.3)
t4.fromTo(
  scene4SmallRedCircle,
  {
    opacity: 0,
    y: -500,
  },
  {
    opacity: 1,
    y: -250,
    duration: 0.3,
    ease: "power2.out",
  },
  0
);

// Small red circle slides from right to left (0-0.3)
t4.fromTo(
  scene4SmallRedCircleRight,
  {
    opacity: 0,
    x: 500,
  },
  {
    opacity: 1,
    x: -250,
    duration: 0.3,
    ease: "power2.out",
  },
  0
);

// Step 2: Text groups animate in while circles rise (0-0.5)
t4.fromTo(
  scene4Group1,
  { opacity: 0, y: 200 },
  { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" },
  0.1
);

t4.fromTo(
  scene4Group2,
  { opacity: 0, y: 200 },
  { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" },
  0.2
);

// Step 3: After red circle stops, image slides left (0.4-0.7)
t4.to(
  scene4ImageCircle,
  {
    x: -300,
    duration: 0.3,
    ease: "power2.out",
  },
  0.4
);

// Step 4: Red circle text appears when red circle stops (0.4-0.7)
t4.to(
  scene4RedText,
  {
    opacity: 1,
    y: 0,
    duration: 0.3,
    ease: "power2.out",
  },
  0.4
);

t4.to(
  scene4Tagline,
  {
    opacity: 1,
    y: 50,
    duration: 0.5,
    ease: "power2.out",
  },
  0
);

// Fade in DI_Red logo on small red circle from right (towards end)
const scene4SmallRedCircleLogo = document.querySelector(
  ".scene4-small-red-circle-logo"
);
t4.to(
  scene4SmallRedCircleLogo,
  {
    opacity: 1,
    duration: 0.5,
    ease: "power2.out",
  },
  0.55
);

// Scene 5 Timeline - Red circle left, Image right
let t5 = gsap.timeline({
  scrollTrigger: {
    trigger: ".scene5",
    start: "top 50%",
    end: "+=1200",
    scrub: 1,
    pin: true,
    markers: false,
  },
});

const scene5ImageCircle = document.querySelector(".scene5-image-circle");
const scene5RedCircle = document.querySelector(".scene5-red-circle");
const scene5GreyCircle = document.querySelector(".scene5-grey-circle");
const scene5Text = document.querySelector(".scene5-text");
const scene5NewText = document.querySelector(".scene5-new-text");
const scene5Group1 = document.querySelector(".scene5-group-1");
const scene5Group2 = document.querySelector(".scene5-group-2");
const scene5SmallRedCircle = document.querySelector(".scene5-small-red-circle");
const scene5TopLeftCircle = document.querySelector(".scene5-top-left-circle");
const scene5GreyOutlineCircle = document.querySelector(".scene5-grey-outline-circle");

gsap.set(scene5SmallRedCircle, { y: -800, x: -550 });
gsap.set(scene5TopLeftCircle, { left: "400px" });
gsap.set(scene5GreyOutlineCircle, { top: "-100px", opacity:0 });

// Set initial positions: red circle and image start below viewport
gsap.set(scene5ImageCircle, { y: 500 });
gsap.set(scene5RedCircle, { y: 215 });
t5.to(
  scene5ImageCircle,
  {
    y: 75,
    duration: 0.4,
    ease: "power2.out",
  },
  0
);
t5.to(
  scene5RedCircle,
  {
    y: -225,
    duration: 0.4,
    ease: "power2.out",
  },
  "<"
);

// Top left circle slides in from left (0-0.25)
t5.fromTo(
  scene5TopLeftCircle,{ left: "400px", 
    opacity: 0,  },
  {
    opacity: 1,
    left: "220px",
    duration: 1,
    ease: "power2.out",
    onComplete: () => {
      // Replace circle with image (keep same 75px size)
      scene5TopLeftCircle.style.backgroundImage = "url('./assets/shaktismallimage.png')";
      scene5TopLeftCircle.style.borderRadius = "0";
    }
  },
  0
);

// After circle reaches final position and becomes image, slide it left and down
t5.to(
  scene5TopLeftCircle,
  {
    top: "calc(100vh - 450px)",
    duration: 0.4,
    ease: "power2.out",
    opacity:1
  },
  1.2
);

// Grey outline circle animates from top to bottom
t5.to(
  scene5GreyOutlineCircle,
  {
    opacity: 1,
    top: "calc(100vh - 500px)",
    duration: 1.2,
    ease: "power2.out",
  },
  0
);

// Small red circle drops from top left (0-0.3)
t5.fromTo(
  scene5SmallRedCircle,
  {
    opacity: 0,
    y: -800,
    x: -550,
  },
  {
    opacity: 1,
    y: -550,
    duration: 0.3,
    ease: "power2.out",
  },
  0
);

// Step 4: After circles stop, image moves right (red circle stays in place)
// Step 3: Text groups animate in while circles rise
t5.fromTo(
  scene5Group1,
  { opacity: 0, y: 400 },
  { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
  0.2
);

t5.fromTo(
  scene5Group2,
  { opacity: 0, y: 400 },
  { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
  0.4
);

t5.to(
  scene5ImageCircle,
  {
    x: 350,
    duration: 0.5,
    ease: "power2.out",
  },
  0.4
);

t5.to(
  scene5Text,
  {
    opacity: 1,
    y: -60,
    duration: 0.3,
    ease: "power2.out",
  },
  0.1
);

// Fade in subcompany background when text animation stops
const scene5SubcompanyBg = document.querySelector(".scene5-subcompany-bg");
const scene5SubcompanyLogos = document.querySelector(
  ".scene5-subcompany-logos"
);
const scene5RightArrows = document.querySelector(".scene5-right-arrows");
t5.to(
  scene5SubcompanyBg,
  {
    opacity: 1,
    duration: 0.4,
    ease: "power2.out",
  },
  0.4
);

// Fade in logos at the same time
t5.to(
  scene5SubcompanyLogos,
  {
    opacity: 1,
    duration: 0.4,
    ease: "power2.out",
  },
  0.4
);

// Fade in arrows at the same time
t5.to(
  scene5RightArrows,
  {
    opacity: 1,
    duration: 0.4,
    ease: "power2.out",
  },
  0.4
);

// Scene 6 Timeline - Image left, Red circle right
let t6 = gsap.timeline({
  scrollTrigger: {
    trigger: ".scene6",
    start: "top bottom",
    end: "+=800",
    scrub: 1.5,
    pin: false,
    markers: false,
  },
});

const scene6ImageCircle = document.querySelector(".scene6-image-circle");
const scene6RedCircle = document.querySelector(".scene6-red-circle");
const scene6GreyCircle = document.querySelector(".scene6-grey-circle");
const scene6Text = document.querySelector(".scene6-text");

t6.to(scene6ImageCircle, { x: -150, duration: 1.25, ease: "power2.out" }, 0);
t6.to(scene6RedCircle, { x: 150, duration: 1.25, ease: "power2.out" }, 0);
t6.to(
  scene6Text,
  { opacity: 1, y: -60, duration: 0.6, ease: "power2.out" },
  0.1
);
t6.to(
  scene6GreyCircle,
  { opacity: 1, y: -300, duration: 0.2, ease: "power2.out" },
  0.25
);

// Scene 7 Timeline - Red circle left, Image right
let t7 = gsap.timeline({
  scrollTrigger: {
    trigger: ".scene7",
    start: "top bottom",
    end: "+=800",
    scrub: 1.5,
    pin: false,
    markers: false,
  },
});

const scene7ImageCircle = document.querySelector(".scene7-image-circle");
const scene7RedCircle = document.querySelector(".scene7-red-circle");
const scene7GreyCircle = document.querySelector(".scene7-grey-circle");
const scene7Text = document.querySelector(".scene7-text");

t7.to(scene7RedCircle, { x: -150, duration: 1.25, ease: "power2.out" }, 0);
t7.to(scene7ImageCircle, { x: 150, duration: 1.25, ease: "power2.out" }, 0);
t7.to(
  scene7Text,
  { opacity: 1, y: -60, duration: 0.6, ease: "power2.out" },
  0.1
);
t7.to(
  scene7GreyCircle,
  { opacity: 1, y: -300, duration: 0.2, ease: "power2.out" },
  0.25
);

// Scene 8 Timeline - Image left, Red circle right
let t8 = gsap.timeline({
  scrollTrigger: {
    trigger: ".scene8",
    start: "top bottom",
    end: "+=800",
    scrub: 1.5,
    pin: false,
    markers: false,
  },
});

const scene8ImageCircle = document.querySelector(".scene8-image-circle");
const scene8RedCircle = document.querySelector(".scene8-red-circle");
const scene8GreyCircle = document.querySelector(".scene8-grey-circle");
const scene8Text = document.querySelector(".scene8-text");

t8.to(scene8ImageCircle, { x: -150, duration: 1.25, ease: "power2.out" }, 0);
t8.to(scene8RedCircle, { x: 150, duration: 1.25, ease: "power2.out" }, 0);
t8.to(
  scene8Text,
  { opacity: 1, y: -60, duration: 0.6, ease: "power2.out" },
  0.1
);
t8.to(
  scene8GreyCircle,
  { opacity: 1, y: -300, duration: 0.2, ease: "power2.out" },
  0.25
);

// Scene 5 Arrow Click Handlers
const leftArrowBtn = document.getElementById("scene5-left-arrow");
const rightArrowBtn = document.getElementById("scene5-right-arrow");
const scene5RedCircleContainer = document.querySelector(".scene5-red-circle");
const scene5GreyCircleContainer = document.querySelector(".scene5-grey-circle");
const scene5NewTextContainer = document.querySelector(".scene5-new-text");
const scene5CirclesContainer = document.querySelector(
  ".scene5-circles-container"
);

let isShowingConvention = false;
let isShowingSSILP = false;

// Store original content for group1 and group2
const group1 = scene5NewTextContainer.querySelector(".scene5-group-1");
const group2 = scene5NewTextContainer.querySelector(".scene5-group-2");
const originalGroup1HTML = group1.innerHTML;
const originalGroup2HTML = group2.innerHTML;

function updateScene5ToConvention() {
  // Update text content
  const heading = scene5RedCircleContainer.querySelector(".scene5-heading");
  const desc = scene5RedCircleContainer.querySelector(".scene5-desc");

  heading.innerHTML = "SHREE SHAKTI <br>CONVENTION CENTRE";
  desc.innerHTML =
    "Strategically located between Ahmedabad and <br> Gandhinagar, Shree Shakti Convention Centre is built on <br>2.5 lakh square feet as an all-purpose destination for events. <br>The perfect blend of scale, elegance and hospitality, we elevate events into experience.";

  // Update main text - hide group elements and show new text
  const group1 = scene5NewTextContainer.querySelector(".scene5-group-1");
  const group2 = scene5NewTextContainer.querySelector(".scene5-group-2");

  // Store original content
  if (!group1.dataset.original) {
    group1.dataset.original = group1.innerHTML;
  }
  if (!group2.dataset.original) {
    group2.dataset.original = group2.innerHTML;
  }

  group1.innerHTML = '<div class="text-red">Setting <br>a stage for</div>';
  group2.innerHTML = '<div class="text-blue">life\'s finest <br>moments.</div>';

  group1.style.opacity = "1";
  group2.style.opacity = "1";

  // Add show-convention class to trigger CSS
  scene5RedCircleContainer.classList.add("show-convention");
  scene5GreyCircleContainer.classList.add("show-convention");
  scene5NewTextContainer.classList.add("show-convention");
  scene5CirclesContainer.classList.add("show-convention");

  // Show convention content (right arrow hidden by CSS .show-convention class)
  const conventionContent = document.querySelector(
    ".scene5-convention-content"
  );
  const rightArrows = document.querySelector(".scene5-right-arrows");
  const subcompanyBg = document.querySelector(".scene5-subcompany-bg");
  const subcompanyLogos = document.querySelector(".scene5-subcompany-logos");
  const regularArrows = document.querySelector(".scene5-right-arrows");

  if (conventionContent) {
    gsap.to(conventionContent, { opacity: 1, duration: 0.3 });
  }

  // Change image to SSCC.png
  const imageCircle = document.querySelector(".scene5-image-circle");
  if (imageCircle) {
    imageCircle.style.backgroundImage = "url(./assets/SSCC.png)";
    imageCircle.style.width = "485px";
    imageCircle.style.height = "485px";
    imageCircle.style.top = "calc(50% - 300px)";
  }

  isShowingConvention = true;
}

function updateScene5ToDefault() {
  // Reset text content
  const heading = scene5RedCircleContainer.querySelector(".scene5-heading");
  const desc = scene5RedCircleContainer.querySelector(".scene5-desc");

  heading.textContent = "DURGESH INFRASTRUCTURE PVT LTD";
  desc.innerHTML =
    "Redefining urban living with innovative design,<br />luxury spaces and developments across<br />Ahmedabad and Mumbai's evolving skylines,<br />Durgesh Infrastructure Pvt. Ltd. is rapidly<br />gaining recognition in the real estate sector.";

  // Reset main text
  const group1 = scene5NewTextContainer.querySelector(".scene5-group-1");
  const group2 = scene5NewTextContainer.querySelector(".scene5-group-2");

  // Restore original content
  group1.innerHTML = originalGroup1HTML;
  group2.innerHTML = originalGroup2HTML;

  group1.style.opacity = "1";
  group2.style.opacity = "1";

  // Change image back to image05.png
  const imageCircle = document.querySelector(".scene5-image-circle");
  if (imageCircle) {
    imageCircle.style.backgroundImage = "url(./assets/image05.png)";
    imageCircle.style.width = "595px";
    imageCircle.style.height = "595px";

  }

  // Remove show-convention class
  scene5RedCircleContainer.classList.remove("show-convention");
  scene5GreyCircleContainer.classList.remove("show-convention");
  scene5NewTextContainer.classList.remove("show-convention");
  scene5CirclesContainer.classList.remove("show-convention");

  // Remove show-ssilp class
  scene5RedCircleContainer.classList.remove("show-ssilp");
  scene5GreyCircleContainer.classList.remove("show-ssilp");
  scene5NewTextContainer.classList.remove("show-ssilp");
  scene5CirclesContainer.classList.remove("show-ssilp");

  // Hide both convention and SSILP content
  const conventionContent = document.querySelector(".scene5-convention-content");
  const ssilpContent = document.querySelector(".scene5-ssilp-content");
  
  if (conventionContent) {
    gsap.to(conventionContent, { opacity: 0, duration: 0.3 });
  }
  if (ssilpContent) {
    gsap.to(ssilpContent, { opacity: 0, duration: 0.3 });
  }

  isShowingConvention = false;
  isShowingSSILP = false;
}

function updateScene5ToSSILP() {
  // Update text content
  const heading = scene5RedCircleContainer.querySelector(".scene5-heading");
  const desc = scene5RedCircleContainer.querySelector(".scene5-desc");

  heading.innerHTML = "Shree Shakti Integrated Logistics Park";
  desc.innerHTML =
    "Designed to support growing distribution needs, Shree Shakti Integrated Logistics Park is strategically located on the Ahmedabad–Rajkot National Highway to enable smooth and efficient operations. Its modern equipment, services, and facilities help minimise logistics overheads and address warehousing challenges.";

  // Update main text
  const group1 = scene5NewTextContainer.querySelector(".scene5-group-1");
  const group2 = scene5NewTextContainer.querySelector(".scene5-group-2");

  group1.innerHTML = '<div class="text-red">Paving<br>the way</div>';
  group2.innerHTML = '<div class="text-blue">to economic<br>growth</div>';

  // Add show-ssilp class to trigger CSS
  scene5RedCircleContainer.classList.add("show-ssilp");
  scene5GreyCircleContainer.classList.add("show-ssilp");
  scene5NewTextContainer.classList.add("show-ssilp");
  scene5CirclesContainer.classList.add("show-ssilp");

  group1.style.opacity = "1";
  group2.style.opacity = "1";

  // Show SSILP content
  const ssilpContent = document.querySelector(".scene5-ssilp-content");
  if (ssilpContent) {
    gsap.to(ssilpContent, { opacity: 1, duration: 0.3 });
  }

  // Change image to SSILP.png
  const imageCircle = document.querySelector(".scene5-image-circle");
  if (imageCircle) {
    imageCircle.style.backgroundImage = "url(./assets/SSILP.png)";
    imageCircle.style.width = "485px";
    imageCircle.style.height = "485px";
    imageCircle.style.top = "calc(50% - 300px)";
  }

  isShowingSSILP = true;
}

leftArrowBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (isShowingConvention) {
    updateScene5ToDefault();
  } else if (!isShowingSSILP && !isShowingConvention) {
    updateScene5ToSSILP();
  }
});

rightArrowBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (!isShowingConvention && !isShowingSSILP) {
    updateScene5ToConvention();
  } else if (isShowingSSILP) {
    updateScene5ToDefault();
  }
});

const backArrowBtn = document.getElementById("scene5-back-arrow");
if (backArrowBtn) {
  backArrowBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (isShowingConvention) {
      updateScene5ToDefault();
    }
  });
}

const ssilpBackArrowBtn = document.getElementById("scene5-ssilp-back-arrow");
if (ssilpBackArrowBtn) {
  ssilpBackArrowBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (isShowingSSILP) {
      updateScene5ToDefault();
    }
  });
}

