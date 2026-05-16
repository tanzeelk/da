function vw(px) { return (px / 1440) * window.innerWidth; }

// ── Read more helpers ─────────────────────────────────────

function setupReadMore(btnSelector, descSelector) {
  const btn = document.querySelector(btnSelector);
  const desc = document.querySelector(descSelector);
  if (btn && desc) {
    btn.addEventListener('click', () => {
      const expanded = desc.classList.toggle('desc-expanded');
      btn.innerHTML = expanded ? 'Read less &#8249;' : '<img src="./assets/read_more_icon.png" alt="Read more" class="read-more-icon" />';
    });
  }
}

function resetReadMore(container) {
  if (!container) return;
  const desc = container.querySelector('.scene5-desc, .scene6-desc, .scene7-desc, .scene6-red-desc, .scene4-red-desc');
  const btn = container.querySelector('.read-more-btn, .scene4-read-more');
  if (desc) desc.classList.remove('desc-expanded');
  if (btn) btn.innerHTML = '<img src="./assets/read_more_icon.png" alt="Read more" class="read-more-icon" />';
}

// ── Per-scene timeline refs (so we can kill & recreate) ───

let t4 = null, t5 = null, t6 = null, t7 = null;

// ── Scene 4 ──────────────────────────────────────────────

function initScene4() {
  if (t4) { t4.kill(); t4 = null; }

  setupReadMore('.scene4-read-more', '.scene4-red-desc');

  const scene4ImageCircle = document.querySelector('.scene4-image-circle');
  const scene4RedCircle = document.querySelector('.scene4-red-circle');
  const scene4GreyCircle = document.querySelector('.scene4-grey-circle');
  const scene4SmallRedCircle = document.querySelector('.scene4-small-red-circle');
  const scene4SmallRedCircleRight = document.querySelector('.scene4-small-red-circle-right');
  const scene4Tagline = document.querySelector('.scene4-tagline');
  const scene4Group1 = document.querySelector('.scene4-group-1');
  const scene4Group2 = document.querySelector('.scene4-group-2');
  const scene4RedText = document.querySelector('.scene4-red-text');
  const scene4SmallRedCircleLogo = document.querySelector('.scene4-small-red-circle-logo');

  gsap.set(scene4GreyCircle, { opacity: 1, y: 0 });
  gsap.set(scene4ImageCircle, { y: vw(500), x: 0 });
  gsap.set(scene4RedCircle, { y: vw(235) });
  gsap.set(scene4SmallRedCircle, { x: vw(-150), opacity: 1 });
  gsap.set(scene4SmallRedCircleRight, { x: 0, y: vw(400), opacity: 1 });
  gsap.set(scene4Group1, { opacity: 0, y: vw(300), x: vw(-75) });
  gsap.set(scene4Group2, { opacity: 0, y: vw(300), x: vw(-75) });
  gsap.set(scene4RedText, { opacity: 0, y: vw(500) });
  if (scene4SmallRedCircleLogo) gsap.set(scene4SmallRedCircleLogo, { opacity: 0 });

  t4 = gsap.timeline({
    scrollTrigger: {
      trigger: '.scene4',
      start: 'top top',
      end: '+=1200',
      scrub: 1,
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
      markers: false,
    },
  });

  t4.to(scene4GreyCircle, { opacity: 1, duration: 0.4, ease: 'power2.out' }, 0);
  t4.to(scene4ImageCircle, { y: vw(450), duration: 0.4, ease: 'power2.out' }, 0);
  t4.to(scene4RedCircle, { y: vw(185), duration: 0.4, ease: 'power2.out' }, '<');
  t4.fromTo(scene4SmallRedCircle, { opacity: 0, y: 0 }, { opacity: 1, y: vw(10), duration: 0.3, ease: 'power2.out' }, 0);
  t4.to(scene4SmallRedCircle, { x: vw(200), opacity: 0, duration: 0.5, ease: 'power1.inOut' }, 0.35);
  t4.fromTo(scene4SmallRedCircleRight, { opacity: 0, x: vw(500) }, { opacity: 1, x: vw(-300), duration: 0.5, ease: 'power2.out' }, 0);
  t4.fromTo(scene4RedText, { opacity: 0, y: vw(500) }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 0);
  t4.fromTo(scene4Group1, { opacity: 0, y: vw(300), x: vw(-75) }, { opacity: 1, y: vw(-20), duration: 0.5, ease: 'power2.out' }, 0);
  t4.fromTo(scene4Group2, { opacity: 0, y: vw(300), x: vw(-75) }, { opacity: 1, y: vw(-10), duration: 0.5, ease: 'power2.out' }, 0.1);
  t4.to(scene4ImageCircle, { x: vw(-350), duration: 0.3, ease: 'power2.out' }, 0.2);
  if (scene4Tagline) t4.to(scene4Tagline, { opacity: 1, y: vw(50), duration: 0.5, ease: 'power2.out' }, 0);
  if (scene4SmallRedCircleLogo) t4.to(scene4SmallRedCircleLogo, { opacity: 1, duration: 0.5, ease: 'power2.out' }, 0.55);
}

// ── Scene 5 ──────────────────────────────────────────────

let isShowingConvention = false;
let isShowingSSILP = false;

function initScene5() {
  if (t5) { t5.kill(); t5 = null; }
  isShowingConvention = false;
  isShowingSSILP = false;

  document.querySelectorAll('.scene5 .read-more-btn').forEach((btn) => {
    const desc = btn.previousElementSibling;
    if (desc) btn.addEventListener('click', () => {
      const expanded = desc.classList.toggle('desc-expanded');
      btn.innerHTML = expanded ? 'Read less &#8249;' : '<img src="./assets/read_more_icon.png" alt="Read more" class="read-more-icon" />';
    });
  });

  const scene5ImageCircle = document.querySelector('.scene5-image-circle');
  const scene5RedCircle = document.querySelector('.scene5-red-circle');
  const scene5GreyCircle = document.querySelector('.scene5-grey-circle');
  const scene5Text = document.querySelector('.scene5-text');
  const scene5Group1 = document.querySelector('.scene5-group-1');
  const scene5Group2 = document.querySelector('.scene5-group-2');
  const scene5SmallRedCircle = document.querySelector('.scene5-small-red-circle');
  const scene5TopLeftCircle = document.querySelector('.scene5-top-left-circle');
  const scene5GreyOutlineCircle = document.querySelector('.scene5-grey-outline-circle');
  const scene5SubcompanyBg = document.querySelector('.scene5-subcompany-bg');
  const scene5SubcompanyLogos = document.querySelector('.scene5-subcompany-logos');
  const scene5RightArrows = document.querySelector('.scene5-right-arrows');

  gsap.set(scene5SmallRedCircle, { y: vw(-800), x: vw(-550) });
  if (scene5TopLeftCircle) gsap.set(scene5TopLeftCircle, { left: vw(400) + 'px' });
  if (scene5GreyOutlineCircle) gsap.set(scene5GreyOutlineCircle, { top: vw(-100) + 'px', opacity: 0 });
  gsap.set(scene5GreyCircle, { opacity: 0, y: vw(500) });
  gsap.set(scene5ImageCircle, { y: vw(215), x: 0 });
  gsap.set(scene5RedCircle, { y: vw(215) });
  gsap.set(scene5Group1, { opacity: 0, y: vw(400) });
  gsap.set(scene5Group2, { opacity: 0, y: vw(400) });
  gsap.set(scene5Text, { opacity: 0, y: 0 });
  if (scene5SubcompanyBg) gsap.set(scene5SubcompanyBg, { opacity: 0 });
  if (scene5SubcompanyLogos) gsap.set(scene5SubcompanyLogos, { opacity: 0 });
  if (scene5RightArrows) gsap.set(scene5RightArrows, { opacity: 0 });

  // Reset convention/ssilp state visually
  scene5RedCircle.classList.remove('show-convention', 'show-ssilp');
  scene5GreyCircle.classList.remove('show-convention', 'show-ssilp');
  const scene5NewTextContainer = document.querySelector('.scene5-new-text');
  const scene5CirclesContainer = document.querySelector('.scene5-circles-container');
  if (scene5NewTextContainer) scene5NewTextContainer.classList.remove('show-convention', 'show-ssilp');
  if (scene5CirclesContainer) scene5CirclesContainer.classList.remove('show-convention', 'show-ssilp');
  const cc5 = document.querySelector('.scene5-convention-content');
  const sc5 = document.querySelector('.scene5-ssilp-content');
  if (cc5) gsap.set(cc5, { opacity: 0 });
  if (sc5) gsap.set(sc5, { opacity: 0 });

  // Reset text/image to defaults
  const s5heading = scene5RedCircle.querySelector('.scene5-heading');
  const s5desc = scene5RedCircle.querySelector('.scene5-desc');
  if (s5heading) s5heading.innerHTML = 'DURGESH <br />INFRASTRUCTURE PVT LTD';
  if (s5desc) s5desc.innerHTML = 'Redefining urban living with innovative design,<br />luxury spaces and developments across<br />Ahmedabad and Mumbai\'s evolving skylines,<br />Durgesh Infrastructure Pvt. Ltd. is rapidly<br />gaining recognition in the real estate sector.';
  if (scene5ImageCircle) scene5ImageCircle.style.backgroundImage = "url('./assets/image05.webp')";

  t5 = gsap.timeline({
    scrollTrigger: {
      trigger: '.scene5',
      start: 'top 55%',
      end: '+=900',
      scrub: 1,
      pin: true,
      markers: false,
    },
  });

  t5.to(scene5ImageCircle, { y: vw(-230), duration: 0.4, ease: 'power2.out' }, 0);
  t5.to(scene5RedCircle, { y: vw(-230), duration: 0.4, ease: 'power2.out' }, '<');
  if (scene5TopLeftCircle) t5.fromTo(scene5TopLeftCircle, { left: vw(400) + 'px', opacity: 0 }, { opacity: 1, left: vw(180) + 'px', duration: 1, ease: 'power2.out', onComplete: () => { scene5TopLeftCircle.style.backgroundImage = "url('./assets/shaktismallimage.png')"; scene5TopLeftCircle.style.borderRadius = '0'; } }, 0);
  if (scene5GreyOutlineCircle) t5.to(scene5GreyOutlineCircle, { opacity: 1, top: 'calc(100vh - 500px)', duration: 1.2, ease: 'power2.out' }, 0);
  t5.fromTo(scene5SmallRedCircle, { opacity: 0, y: vw(-800), x: vw(-550) }, { opacity: 1, y: vw(-550), duration: 0.3, ease: 'power2.out' }, 0);
  t5.to(scene5SmallRedCircle, { x: vw(-700), opacity: 0, duration: 0.55, ease: 'power1.inOut' }, 0.45);
  t5.fromTo(scene5Group1, { opacity: 0, y: vw(400) }, { opacity: 1, y: vw(50), duration: 0.8, ease: 'power2.out' }, 0.2);
  t5.fromTo(scene5Group2, { opacity: 0, y: vw(400) }, { opacity: 1, y: vw(50), duration: 0.8, ease: 'power2.out' }, 0.4);
  t5.to(scene5ImageCircle, { x: vw(100), duration: 0.5, ease: 'power2.out' }, 0.4);
  t5.to(scene5Text, { opacity: 1, y: vw(-60), duration: 0.3, ease: 'power2.out' }, 0.1);
  t5.to(scene5GreyCircle, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, 0);
  if (scene5SubcompanyBg) t5.to(scene5SubcompanyBg, { opacity: 1, duration: 0.4, ease: 'power2.out' }, 0.4);
  if (scene5SubcompanyLogos) t5.to(scene5SubcompanyLogos, { opacity: 1, duration: 0.4, ease: 'power2.out' }, 0.4);
  if (scene5RightArrows) t5.to(scene5RightArrows, { opacity: 1, duration: 0.4, ease: 'power2.out' }, 0.4);
  if (scene5GreyOutlineCircle) t5.to(scene5GreyOutlineCircle, { opacity: 0, duration: 0.4, ease: 'power2.out' }, 0.6);

  // Arrow handlers
  const scene5RedCircleContainer = scene5RedCircle;
  const scene5GreyCircleContainer = scene5GreyCircle;
  const g1 = scene5NewTextContainer.querySelector('.scene5-group-1');
  const g2 = scene5NewTextContainer.querySelector('.scene5-group-2');
  const originalGroup1HTML = g1.innerHTML;
  const originalGroup2HTML = g2.innerHTML;

  function updateScene5ToConvention() {
    resetReadMore(scene5RedCircleContainer);
    scene5RedCircleContainer.querySelector('.scene5-heading').innerHTML = 'SHREE SHAKTI <br>CONVENTION CENTRE';
    scene5RedCircleContainer.querySelector('.scene5-desc').innerHTML = 'Strategically located between Ahmedabad and <br> Gandhinagar, Shree Shakti Convention Centre is built on <br>2.5 lakh square feet as an all-purpose destination for events. <br>The perfect blend of scale, elegance and hospitality, we elevate events into experience.';
    const lg1 = scene5NewTextContainer.querySelector('.scene5-group-1');
    const lg2 = scene5NewTextContainer.querySelector('.scene5-group-2');
    lg1.innerHTML = '<div class="text-red">Setting <br>a stage for</div>';
    lg2.innerHTML = '<div class="text-blue">life\'s finest <br>moments.</div>';
    lg1.style.opacity = '1'; lg2.style.opacity = '1';
    scene5RedCircleContainer.classList.add('show-convention');
    scene5GreyCircleContainer.classList.add('show-convention');
    scene5NewTextContainer.classList.add('show-convention');
    scene5CirclesContainer.classList.add('show-convention');
    const c = document.querySelector('.scene5-convention-content');
    if (c) gsap.to(c, { opacity: 1, duration: 0.3 });
    const ic = document.querySelector('.scene5-image-circle');
    if (ic) { ic.style.backgroundImage = "url(./assets/SSCC.webp)"; ic.style.width = ''; ic.style.height = ''; ic.style.top = ''; }
    const goc = document.querySelector('.scene5-grey-outline-circle');
    if (goc) gsap.to(goc, { left: 'calc(100% - 200px)', top: '-100px', duration: 1.2, ease: 'power2.inOut' });
    const drc = document.querySelector('.scene5-descending-red-circle');
    if (drc) { gsap.set(drc, { right: '5%', left: 'auto' }); gsap.to(drc, { opacity: 1, top: '-50px', duration: 1.4, ease: 'power2.inOut' }); }
    isShowingConvention = true;
  }

  function updateScene5ToDefault() {
    resetReadMore(scene5RedCircleContainer);
    scene5RedCircleContainer.querySelector('.scene5-heading').innerHTML = 'DURGESH <br />INFRASTRUCTURE PVT LTD';
    scene5RedCircleContainer.querySelector('.scene5-desc').innerHTML = 'Redefining urban living with innovative design,<br />luxury spaces and developments across<br />Ahmedabad and Mumbai\'s evolving skylines,<br />Durgesh Infrastructure Pvt. Ltd. is rapidly<br />gaining recognition in the real estate sector.';
    const lg1 = scene5NewTextContainer.querySelector('.scene5-group-1');
    const lg2 = scene5NewTextContainer.querySelector('.scene5-group-2');
    lg1.innerHTML = originalGroup1HTML; lg2.innerHTML = originalGroup2HTML;
    lg1.style.opacity = '1'; lg2.style.opacity = '1';
    const ic = document.querySelector('.scene5-image-circle');
    if (ic) { ic.style.backgroundImage = "url(./assets/image05.webp)"; ic.style.width = ''; ic.style.height = ''; ic.style.top = ''; }
    scene5RedCircleContainer.classList.remove('show-convention', 'show-ssilp');
    scene5GreyCircleContainer.classList.remove('show-convention', 'show-ssilp');
    scene5NewTextContainer.classList.remove('show-convention', 'show-ssilp');
    scene5CirclesContainer.classList.remove('show-convention', 'show-ssilp');
    const c = document.querySelector('.scene5-convention-content');
    const s = document.querySelector('.scene5-ssilp-content');
    if (c) gsap.to(c, { opacity: 0, duration: 0.3 });
    if (s) gsap.to(s, { opacity: 0, duration: 0.3 });
    isShowingConvention = false; isShowingSSILP = false;
  }

  function updateScene5ToSSILP() {
    resetReadMore(scene5RedCircleContainer);
    scene5RedCircleContainer.querySelector('.scene5-heading').innerHTML = 'SHREE SHAKTI INTEGRATED LOGISTICS PARK';
    scene5RedCircleContainer.querySelector('.scene5-desc').innerHTML = 'Designed to support growing distribution needs, Shree Shakti Integrated Logistics Park is strategically located on the Ahmedabad–Rajkot National Highway to enable smooth and efficient operations. Its modern equipment, services, and facilities help minimise logistics overheads and address warehousing challenges.';
    const lg1 = scene5NewTextContainer.querySelector('.scene5-group-1');
    const lg2 = scene5NewTextContainer.querySelector('.scene5-group-2');
    lg1.innerHTML = '<div class="text-red">Paving<br>the way</div>';
    lg2.innerHTML = '<div class="text-blue">to economic<br>growth</div>';
    scene5RedCircleContainer.classList.add('show-ssilp');
    scene5GreyCircleContainer.classList.add('show-ssilp');
    scene5NewTextContainer.classList.add('show-ssilp');
    scene5CirclesContainer.classList.add('show-ssilp');
    lg1.style.opacity = '1'; lg2.style.opacity = '1';
    const s = document.querySelector('.scene5-ssilp-content');
    if (s) gsap.to(s, { opacity: 1, duration: 0.3 });
    const ic = document.querySelector('.scene5-image-circle');
    if (ic) { ic.style.backgroundImage = "url(./assets/SSILP.webp)"; ic.style.width = ''; ic.style.height = ''; ic.style.top = ''; }
    isShowingSSILP = true;
  }

  const leftArrowBtn = document.getElementById('scene5-left-arrow');
  const rightArrowBtn = document.getElementById('scene5-right-arrow');
  if (leftArrowBtn) leftArrowBtn.addEventListener('click', (e) => { e.preventDefault(); if (isShowingConvention) updateScene5ToDefault(); else if (!isShowingSSILP && !isShowingConvention) updateScene5ToSSILP(); });
  if (rightArrowBtn) rightArrowBtn.addEventListener('click', (e) => { e.preventDefault(); if (!isShowingConvention && !isShowingSSILP) updateScene5ToConvention(); else if (isShowingSSILP) updateScene5ToDefault(); });
  const backArrowBtn = document.getElementById('scene5-back-arrow');
  if (backArrowBtn) backArrowBtn.addEventListener('click', (e) => { e.preventDefault(); if (isShowingConvention) updateScene5ToDefault(); });
  const ssilpBackArrowBtn = document.getElementById('scene5-ssilp-back-arrow');
  if (ssilpBackArrowBtn) ssilpBackArrowBtn.addEventListener('click', (e) => { e.preventDefault(); if (isShowingSSILP) updateScene5ToDefault(); });
  const logoSSILP = document.getElementById('scene5-logo-ssilp');
  if (logoSSILP) logoSSILP.addEventListener('click', (e) => { e.preventDefault(); if (!isShowingSSILP && !isShowingConvention) updateScene5ToSSILP(); });
  const logoConvention = document.getElementById('scene5-logo-convention');
  if (logoConvention) logoConvention.addEventListener('click', (e) => { e.preventDefault(); if (!isShowingConvention && !isShowingSSILP) updateScene5ToConvention(); });
}

// ── Scene 6 ──────────────────────────────────────────────

function initScene6() {
  if (t6) { t6.kill(); t6 = null; }

  document.querySelectorAll('.scene6 .read-more-btn').forEach((btn) => {
    const desc = btn.previousElementSibling;
    if (desc) btn.addEventListener('click', () => {
      const expanded = desc.classList.toggle('desc-expanded');
      btn.innerHTML = expanded ? 'Read less &#8249;' : '<img src="./assets/read_more_icon.png" alt="Read more" class="read-more-icon" />';
    });
  });

  let scene6IsExpanded = false;

  const scene6ImageCircle = document.querySelector('.scene6-image-circle');
  const scene6RedCircle = document.querySelector('.scene6-red-circle');
  const scene6GreyCircle = document.querySelector('.scene6-grey-circle');
  const scene6SmallRedCircle = document.querySelector('.scene6-small-red-circle');
  const scene6SmallRedCircle1 = document.querySelector('.scene6-small-red-circle-1');
  const scene6SmallRedCircle1Logo = document.querySelector('.scene6-small-red-circle-1-logo');
  const scene6SmallRedCircle2 = document.querySelector('.scene6-small-red-circle-2');
  const scene6SmallRedCircle2Logo = document.querySelector('.scene6-small-red-circle-2-logo');
  const scene6SmallRedCircle3 = document.querySelector('.scene6-small-red-circle-3');
  const scene6SmallRedCircle3Logo = document.querySelector('.scene6-small-red-circle-3-logo');
  const scene6GreyOutlineCircle = document.querySelector('.scene6-grey-outline-circle');
  const scene6RedText = document.querySelector('.scene6-red-text');
  const scene6Group1 = document.querySelector('.scene6-group-1');
  const scene6Group2 = document.querySelector('.scene6-group-2');
  const scene6SubcompanyBg = document.querySelector('.scene6-subcompany-bg');
  const scene6SubcompanyLogos = document.querySelector('.scene6-subcompany-logos');
  const scene6RightArrows = document.querySelector('.scene6-right-arrows');

  // Reset text/state
  const s6heading = document.querySelector('.scene6-red-heading');
  const s6desc = document.querySelector('.scene6-red-desc');
  if (s6heading) s6heading.innerHTML = 'SHREE SHAKTI <br /> SEVA KENDRA';
  if (s6desc) s6desc.innerHTML = 'Shree Shakti Seva Kendra, Ambaji has emerged as a transformative force, helping women claim fundamental right to dignity and autonomy in the tribal and underprivileged communities. Collaboration and compassion have helped women work towards their empowerment, fostering lasting change.';
  if (scene6ImageCircle) scene6ImageCircle.style.backgroundImage = "url('./assets/image06.webp')";
  const scene6GreyLogo = document.querySelector('.scene6-grey-logo');
  if (scene6GreyLogo) { scene6GreyLogo.src = './assets/SHREESHAKTIMAIN-logo.png'; scene6GreyLogo.alt = 'Shree Shakti Logo'; }
  if (scene6RedText) scene6RedText.classList.remove('showing-nsk');
  const rg1 = document.querySelector('.scene6-group-1 .text-red');
  const rg2 = document.querySelector('.scene6-group-2 .text-blue');
  if (rg1) rg1.innerHTML = 'Lighting <br>new paths where';
  if (rg2) rg2.innerHTML = 'empowerment <br>blooms.';

  gsap.set(scene6ImageCircle, { y: vw(415), x: vw(-120) });
  gsap.set(scene6RedCircle, { y: vw(415), x: vw(-100) });
  gsap.set(scene6SmallRedCircle, { y: vw(-310), x: 0 });
  gsap.set(scene6GreyCircle, { opacity: 0, y: vw(500) });
  gsap.set(scene6GreyOutlineCircle, { opacity: 0 });
  gsap.set(scene6SubcompanyBg, { opacity: 0 });
  gsap.set(scene6SubcompanyLogos, { opacity: 0 });
  gsap.set(scene6RightArrows, { opacity: 0 });
  gsap.set(scene6Group1, { opacity: 0, y: vw(400) });
  gsap.set(scene6Group2, { opacity: 0, y: vw(400) });
  gsap.set(scene6RedText, { opacity: 0, y: 0 });
  gsap.set(scene6SmallRedCircle1, { opacity: 0, x: vw(100) });
  gsap.set(scene6SmallRedCircle2, { opacity: 0, x: vw(100) });
  gsap.set(scene6SmallRedCircle3, { opacity: 0, x: vw(100) });
  if (scene6SmallRedCircle1Logo) gsap.set(scene6SmallRedCircle1Logo, { opacity: 0 });
  if (scene6SmallRedCircle2Logo) gsap.set(scene6SmallRedCircle2Logo, { opacity: 0 });
  if (scene6SmallRedCircle3Logo) gsap.set(scene6SmallRedCircle3Logo, { opacity: 0 });
  const scene6BackArrow = document.getElementById('scene6-back-arrow');
  if (scene6BackArrow) gsap.set(scene6BackArrow, { opacity: 0 });

  t6 = gsap.timeline({
    scrollTrigger: {
      trigger: '.scene6',
      start: 'top 50%',
      end: '+=1200',
      scrub: 1,
      pin: true,
      markers: false,
      onUpdate: () => {
        if (scene6IsExpanded) {
          const sb = document.querySelector('.scene6-subcompany-bg');
          const sl = document.querySelector('.scene6-subcompany-logos');
          const ra = document.querySelector('.scene6-right-arrows');
          const ba = document.getElementById('scene6-back-arrow');
          const st = document.querySelector('.scene6-red-text');
          if (sb) sb.style.opacity = '0';
          if (sl) sl.style.opacity = '0';
          if (ra) ra.style.opacity = '0';
          if (ba && st) ba.style.opacity = parseFloat(window.getComputedStyle(st).opacity);
        }
      }
    },
  });

  t6.to(scene6GreyCircle, { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }, 0);
  t6.to(scene6ImageCircle, { y: vw(-215), duration: 0.4, ease: 'power2.out' }, 0);
  t6.to(scene6RedCircle, { y: vw(-215), duration: 0.4, ease: 'power2.out' }, 0);
  t6.fromTo(scene6Group1, { opacity: 0, y: vw(400) }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, 0.5);
  t6.fromTo(scene6Group2, { opacity: 0, y: vw(400) }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, 0.6);
  t6.fromTo(scene6SmallRedCircle, { opacity: 0, y: vw(-290) }, { opacity: 1, y: vw(-220), duration: 0.8, ease: 'power2.out' }, '<0.1');
  t6.to(scene6SmallRedCircle, { x: vw(900), opacity: 0, duration: 0.8, ease: 'power2.in' }, 1.7);
  t6.fromTo(scene6SmallRedCircle1, { opacity: 0, x: vw(100) }, { opacity: 1, x: vw(410), duration: 0.5, ease: 'power2.out' }, '<0.1');
  t6.fromTo(scene6SmallRedCircle2, { opacity: 0, x: vw(100) }, { opacity: 1, x: vw(410), duration: 0.5, ease: 'power2.out' }, '<0.25');
  t6.fromTo(scene6SmallRedCircle3, { opacity: 0, x: vw(100) }, { opacity: 1, x: vw(280), duration: 0.5, ease: 'power2.out' }, '<0.25');
  t6.to(scene6SmallRedCircle1Logo, { opacity: 1, duration: 0.5, ease: 'power2.out' }, '<');
  t6.to(scene6SmallRedCircle2Logo, { opacity: 1, duration: 0.5, ease: 'power2.out' }, '<');
  t6.to(scene6SmallRedCircle3Logo, { opacity: 1, duration: 0.5, ease: 'power2.out' }, '<');
  t6.fromTo(scene6SubcompanyBg, { opacity: 0 }, { opacity: 1, duration: 0.4, pointerEvents: 'none', ease: 'power2.out' }, 0.4);
  t6.fromTo(scene6SubcompanyLogos, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: 'power2.out' }, 0.4);
  t6.fromTo(scene6RightArrows, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: 'power2.out' }, 0.4);
  t6.to(scene6GreyOutlineCircle, { opacity: 0.7, top: 'calc(50% - 785px)', duration: 1.2, ease: 'power2.out' }, 0.5);
  t6.to(scene6SmallRedCircle1, { y: vw(120), duration: 1, ease: 'power2.out' }, 1.0);
  t6.to(scene6ImageCircle, { x: vw(-485), duration: 0.5, ease: 'power2.out' }, 0.8);
  t6.to(scene6RedText, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }, 0.8);
  t6.to(scene6GreyOutlineCircle, { x: vw(900), opacity: 0, duration: 0.8, ease: 'power2.in' }, 1.7);

  const scene6Arrow1 = document.getElementById('scene6-arrow-1');
  const scene6Arrow2 = document.getElementById('scene6-arrow-2');
  const scene6Arrow3 = document.getElementById('scene6-arrow-3');
  const scene6BackArrowBtn = document.getElementById('scene6-back-arrow');
  const scene6ImageCircleElement = document.querySelector('.scene6-image-circle');
  let isShowingNSK = false;

  function scene6ShowSub(imgUrl, heading, desc, g1text, g2text, logoSrc, logoAlt) {
    scene6IsExpanded = true;
    if (scene6ImageCircleElement) scene6ImageCircleElement.style.backgroundImage = 'url(' + imgUrl + ')';
    const h = document.querySelector('.scene6-red-heading');
    const d = document.querySelector('.scene6-red-desc');
    if (h) h.innerHTML = heading;
    if (d) d.innerHTML = desc;
    const rg1 = document.querySelector('.scene6-group-1 .text-red');
    const rg2 = document.querySelector('.scene6-group-2 .text-blue');
    if (rg1) rg1.innerHTML = g1text;
    if (rg2) rg2.innerHTML = g2text;
    [scene6SubcompanyBg, scene6SubcompanyLogos, scene6RightArrows].forEach(el => { if (el) gsap.to(el, { opacity: 0, duration: 0.3 }); });
    if (scene6RightArrows) gsap.to(scene6RightArrows, { pointerEvents: 'none', duration: 0 });
    const gl = document.querySelector('.scene6-grey-logo');
    if (gl) { gl.src = logoSrc; gl.alt = logoAlt; }
    if (scene6BackArrowBtn) gsap.to(scene6BackArrowBtn, { opacity: 1, duration: 0.3 });
    const rt = document.querySelector('.scene6-red-text');
    if (rt) rt.classList.add('showing-nsk');
  }

  function scene6RestoreDefault() {
    scene6IsExpanded = false;
    if (scene6ImageCircleElement) scene6ImageCircleElement.style.backgroundImage = "url('./assets/image06.webp')";
    const h = document.querySelector('.scene6-red-heading');
    const d = document.querySelector('.scene6-red-desc');
    if (h) h.innerHTML = 'SHREE SHAKTI <br /> SEVA KENDRA';
    if (d) d.innerHTML = 'Shree Shakti Seva Kendra, Ambaji has emerged as a <br />transformative force, helping women claim their <br />fundamental right to dignity and autonomy in the tribal <br />and underprivileged communities. Collaboration and <br />compassion have helped women work towards their <br />empowerment, fostering lasting change.';
    const rg1 = document.querySelector('.scene6-group-1 .text-red');
    const rg2 = document.querySelector('.scene6-group-2 .text-blue');
    if (rg1) rg1.innerHTML = 'Lighting <br>new paths where';
    if (rg2) rg2.innerHTML = 'empowerment <br>blooms.';
    [scene6SubcompanyBg, scene6SubcompanyLogos].forEach(el => { if (el) gsap.to(el, { opacity: 1, duration: 0.3 }); });
    if (scene6RightArrows) gsap.to(scene6RightArrows, { opacity: 1, duration: 0.3, pointerEvents: 'auto' });
    if (scene6BackArrowBtn) gsap.to(scene6BackArrowBtn, { opacity: 0, duration: 0.3 });
    const gl = document.querySelector('.scene6-grey-logo');
    if (gl) { gl.src = './assets/SHREESHAKTIMAIN-logo.png'; gl.alt = 'Shree Shakti Logo'; }
    const rt = document.querySelector('.scene6-red-text');
    if (rt) rt.classList.remove('showing-nsk');
    isShowingNSK = false;
  }

  if (scene6Arrow1) scene6Arrow1.addEventListener('click', (e) => { e.preventDefault(); resetReadMore(scene6RedCircle); scene6ShowSub('./assets/NSK.webp', 'NARI SASHAKTIKARAN KENDRA', 'With this establishment, we empower rural women to become agents of change. Training in pottery, agarbatti making, sewing, and handicrafts have helped women built an identity of their own. They gain confidence, decision-making capacity, and social mobility where they were previously excluded from formal economic and civic spaces.', 'Building <br>confidence,', 'one skill at <br>a time.', './assets/NSSK.png', 'NSSK Logo'); isShowingNSK = true; });
  if (scene6Arrow2) scene6Arrow2.addEventListener('click', (e) => { e.preventDefault(); resetReadMore(scene6RedCircle); scene6ShowSub('./assets/SSSOI-microimage.webp', 'SHREE SHAKTI <br /> SCHOOL OF INNOVATION', 'Self-Reliance (Atmanirbharta), Collaborative Leadership. Indian Knowledge Systems, Challenge-Based Learning are the pillars of the Shree Shakti School of Innovation. The learning model goes beyond textbooks, with interactive experiences that help connect with nature, others, and the self.', 'Learning that <br>goes', 'beyond <br>pages.', './assets/SSSOI.png', 'SSSOI Logo'); });
  if (scene6Arrow3) scene6Arrow3.addEventListener('click', (e) => { e.preventDefault(); resetReadMore(scene6RedCircle); scene6ShowSub('./assets/Chhatralaya-microimage.webp', 'CHHATRALAYA', 'More than just a hostel, Chhatralaya is an effort to build a home. With balanced meals and a nurturing environment, we help kids have a brighter future. This is a space that shields children from the consequences of poverty, helping them live a happier and healthier life.', 'A strong <br>foundation.', 'A secure <br>future.', './assets/Chhatralaya.png', 'Chhatralaya Logo'); });
  if (scene6BackArrowBtn) scene6BackArrowBtn.addEventListener('mousedown', (e) => { e.preventDefault(); resetReadMore(scene6RedCircle); scene6RestoreDefault(); });
  const logoNSSK = document.getElementById('scene6-logo-nssk');
  if (logoNSSK) logoNSSK.addEventListener('click', (e) => { e.preventDefault(); if (isShowingNSK) scene6BackArrowBtn.click(); else scene6Arrow1.click(); });
  const logoSSSIOI = document.getElementById('scene6-logo-sssoi');
  if (logoSSSIOI) logoSSSIOI.addEventListener('click', (e) => { e.preventDefault(); scene6Arrow2.click(); });
  const logoChhatralaya = document.getElementById('scene6-logo-chhatralaya');
  if (logoChhatralaya) logoChhatralaya.addEventListener('click', (e) => { e.preventDefault(); scene6Arrow3.click(); });
}

// ── Scene 7 ──────────────────────────────────────────────

function initScene7() {
  if (t7) { t7.kill(); t7 = null; }

  document.querySelectorAll('.scene7 .read-more-btn').forEach((btn) => {
    const desc = btn.previousElementSibling;
    if (desc) btn.addEventListener('click', () => {
      const expanded = desc.classList.toggle('desc-expanded');
      btn.innerHTML = expanded ? 'Read less &#8249;' : '<img src="./assets/read_more_icon.png" alt="Read more" class="read-more-icon" />';
    });
  });

  const scene7ImageCircle = document.querySelector('.scene7-image-circle');
  const scene7RedCircle = document.querySelector('.scene7-red-circle');
  const scene7GreyCircle = document.querySelector('.scene7-grey-circle');
  const scene7Text = document.querySelector('.scene7-text');
  const scene7Group1 = document.querySelector('.scene7-group-1');
  const scene7Group2 = document.querySelector('.scene7-group-2');
  const scene7SmallRedCircle = document.querySelector('.scene7-small-red-circle');
  const scene7TopLeftCircle = document.querySelector('.scene7-top-left-circle');
  const scene7GreyOutlineCircle = document.querySelector('.scene7-grey-outline-circle');
  const scene7SubcompanyBg = document.querySelector('.scene7-subcompany-bg');
  const scene7SubcompanyLogos = document.querySelector('.scene7-subcompany-logos');
  const scene7RightArrows = document.querySelector('.scene7-right-arrows');

  // Reset text/state
  const s7heading = scene7RedCircle.querySelector('.scene7-heading');
  const s7desc = scene7RedCircle.querySelector('.scene7-desc');
  if (s7heading) s7heading.textContent = 'Durgesh Child Care Initiative Pvt. Ltd.';
  if (s7desc) s7desc.innerHTML = 'Children are the future of our world. To build a brighter tomorrow for them, is to build a brighter tomorrow for us all. We, at Durgesh Child Care Initiative Pvt. Ltd., equip children to achieve their dreams, with holistic learning methods.';
  if (scene7ImageCircle) { scene7ImageCircle.style.backgroundImage = "url('./assets/image08.webp')"; scene7ImageCircle.style.width = ''; scene7ImageCircle.style.height = ''; }
  scene7RedCircle.classList.remove('show-convention', 'show-ssilp');
  scene7GreyCircle.classList.remove('show-convention', 'show-ssilp');
  const scene7NewTextContainer = document.querySelector('.scene7-new-text');
  const scene7CirclesContainer = document.querySelector('.scene7-circles-container');
  if (scene7NewTextContainer) scene7NewTextContainer.classList.remove('show-convention', 'show-ssilp');
  if (scene7CirclesContainer) scene7CirclesContainer.classList.remove('show-convention', 'show-ssilp');
  const cc7 = document.querySelector('.scene7-convention-content');
  const sc7 = document.querySelector('.scene7-ssilp-content');
  if (cc7) gsap.set(cc7, { opacity: 0 });
  if (sc7) gsap.set(sc7, { opacity: 0 });
  const lg1init = scene7Group1 ? scene7Group1.querySelector('.text-red') : null;
  const lg2init = scene7Group2 ? scene7Group2.querySelector('.text-blue') : null;
  if (lg1init) lg1init.innerHTML = 'Little <br> steps lead';
  if (lg2init) lg2init.innerHTML = 'to big <br>dreams';

  gsap.set(scene7SmallRedCircle, { y: vw(-800), x: vw(-550) });
  if (scene7TopLeftCircle) gsap.set(scene7TopLeftCircle, { left: vw(400) + 'px', opacity: 0, backgroundImage: '', borderRadius: '' });
  if (scene7GreyOutlineCircle) gsap.set(scene7GreyOutlineCircle, { top: vw(-100) + 'px', opacity: 0, x: 0 });
  gsap.set(scene7ImageCircle, { y: vw(215), x: 0 });
  gsap.set(scene7RedCircle, { y: vw(215) });
  gsap.set(scene7GreyCircle, { opacity: 0, y: vw(500) });
  gsap.set(scene7Group1, { opacity: 0, y: vw(400) });
  gsap.set(scene7Group2, { opacity: 0, y: vw(400) });
  gsap.set(scene7Text, { opacity: 0, y: 0 });
  if (scene7SubcompanyBg) gsap.set(scene7SubcompanyBg, { opacity: 0 });
  if (scene7SubcompanyLogos) gsap.set(scene7SubcompanyLogos, { opacity: 0 });
  if (scene7RightArrows) gsap.set(scene7RightArrows, { opacity: 0 });

  t7 = gsap.timeline({
    scrollTrigger: {
      trigger: '.scene7',
      start: 'top 50%',
      end: '+=1200',
      scrub: 1,
      pin: true,
      markers: false,
    },
  });

  t7.to(scene7ImageCircle, { y: vw(-225), duration: 0.4, ease: 'power2.out' }, 0);
  t7.to(scene7GreyCircle, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, 0);
  t7.to(scene7RedCircle, { y: vw(-225), duration: 0.4, ease: 'power2.out' }, '<');
  if (scene7TopLeftCircle) t7.fromTo(scene7TopLeftCircle, { left: vw(400) + 'px', opacity: 0 }, { opacity: 1, left: vw(180) + 'px', duration: 2, ease: 'power2.out', onComplete: () => { scene7TopLeftCircle.style.backgroundImage = "url('./assets/shaktismallimage.png')"; scene7TopLeftCircle.style.borderRadius = '0'; } }, 0);
  if (scene7GreyOutlineCircle) {
    t7.to(scene7GreyOutlineCircle, { x: vw(-285), opacity: 0.7, duration: 1.2, ease: 'power2.out' }, 0.5);
    t7.to(scene7GreyOutlineCircle, { x: vw(-900), opacity: 0, duration: 0.8, ease: 'power2.in' }, 1.7);
  }
  t7.fromTo(scene7SmallRedCircle, { opacity: 0, y: vw(-800), x: vw(-710) }, { opacity: 1, y: vw(-550), duration: 0.3, ease: 'power2.out' }, 0);
  t7.to(scene7SmallRedCircle, { y: vw(-750), x: vw(-600), scale: 1.15, opacity: 0, duration: 0.6, ease: 'power2.inOut' }, 0.5);
  t7.fromTo(scene7Group1, { opacity: 0, y: vw(400) }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, 0.2);
  t7.fromTo(scene7Group2, { opacity: 0, y: vw(400) }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, 0.4);
  t7.to(scene7ImageCircle, { x: vw(80), duration: 0.5, ease: 'power2.out' }, 0.4);
  t7.to(scene7Text, { opacity: 1, y: vw(-60), duration: 0.3, ease: 'power2.out' }, 0.1);
  if (scene7SubcompanyBg) t7.to(scene7SubcompanyBg, { opacity: 1, duration: 0.4, ease: 'power2.out' }, 0.4);
  if (scene7SubcompanyLogos) t7.to(scene7SubcompanyLogos, { opacity: 1, duration: 0.4, ease: 'power2.out' }, 0.4);
  if (scene7RightArrows) t7.to(scene7RightArrows, { opacity: 1, duration: 0.4, ease: 'power2.out' }, 0.4);

  const scene7RedCircleContainer = scene7RedCircle;
  const scene7GreyCircleContainer = scene7GreyCircle;
  const scene7LeftArrowBtn = document.getElementById('scene7-left-arrow');
  const scene7RightArrowBtn = document.getElementById('scene7-right-arrow');
  let isShowingToyJoy = false;
  let isShowingLittleWings = false;

  const originalScene7Group1HTML = scene7Group1.innerHTML;
  const originalScene7Group2HTML = scene7Group2.innerHTML;

  function updateScene7ToToyJoy() {
    resetReadMore(scene7RedCircleContainer);
    scene7RedCircleContainer.querySelector('.scene7-heading').innerHTML = 'TOY JOY TALES';
    scene7RedCircleContainer.querySelector('.scene7-desc').innerHTML = 'An exciting new indoor play area where every corner sparks imagination and every moment is an adventure. From thrilling rides to creative zones, we\'re building a space that brings joy, laughter and unforgettable memories for kids and families.';
    const lg1 = scene7NewTextContainer.querySelector('.scene7-group-1');
    const lg2 = scene7NewTextContainer.querySelector('.scene7-group-2');
    lg1.innerHTML = '<div class="text-red">Endless <br>journey of</div>';
    lg2.innerHTML = '<div class="text-blue">joy and <br>delight.</div>';
    lg1.style.opacity = '1'; lg2.style.opacity = '1';
    scene7RedCircleContainer.classList.add('show-convention');
    scene7GreyCircleContainer.classList.add('show-convention');
    scene7NewTextContainer.classList.add('show-convention');
    scene7CirclesContainer.classList.add('show-convention');
    const c = document.querySelector('.scene7-convention-content');
    if (c) gsap.to(c, { opacity: 1, duration: 0.3 });
    const ic = document.querySelector('.scene7-image-circle');
    if (ic) { ic.style.backgroundImage = 'url(./assets/image07.webp)'; ic.style.width = ''; ic.style.height = ''; ic.style.top = ''; }
    isShowingToyJoy = true;
  }

  function updateScene7ToDefault() {
    resetReadMore(scene7RedCircleContainer);
    scene7RedCircleContainer.querySelector('.scene7-heading').textContent = 'Durgesh Child Care Initiative Pvt. Ltd.';
    scene7RedCircleContainer.querySelector('.scene7-desc').innerHTML = 'A space dedicated to nurturing young minds, fostering creativity, and supporting children in their journey of growth and discovery. We believe that every child deserves a safe, joyful, and enriching environment where they can thrive, explore, and reach their fullest potential through holistic learning methods.';
    const lg1 = scene7NewTextContainer.querySelector('.scene7-group-1');
    const lg2 = scene7NewTextContainer.querySelector('.scene7-group-2');
    lg1.innerHTML = originalScene7Group1HTML; lg2.innerHTML = originalScene7Group2HTML;
    lg1.style.opacity = '1'; lg2.style.opacity = '1';
    const ic = document.querySelector('.scene7-image-circle');
    if (ic) { ic.style.backgroundImage = 'url(./assets/image08.webp)'; ic.style.width = vw(525) + 'px'; ic.style.height = vw(525) + 'px'; }
    scene7RedCircleContainer.classList.remove('show-convention', 'show-ssilp');
    scene7GreyCircleContainer.classList.remove('show-convention', 'show-ssilp');
    scene7NewTextContainer.classList.remove('show-convention', 'show-ssilp');
    scene7CirclesContainer.classList.remove('show-convention', 'show-ssilp');
    const c = document.querySelector('.scene7-convention-content');
    const s = document.querySelector('.scene7-ssilp-content');
    if (c) gsap.to(c, { opacity: 0, duration: 0.3 });
    if (s) gsap.to(s, { opacity: 0, duration: 0.3 });
    isShowingToyJoy = false; isShowingLittleWings = false;
  }

  function updateScene7ToLittleWings() {
    resetReadMore(scene7RedCircleContainer);
    scene7RedCircleContainer.querySelector('.scene7-heading').innerHTML = 'LITTLE WINGS';
    scene7RedCircleContainer.querySelector('.scene7-desc').innerHTML = 'A nurturing learning center focused on early childhood development through innovative, play-based education. We create meaningful learning experiences that help children discover their unique strengths and build a strong foundation for lifelong success.';
    const lg1 = scene7NewTextContainer.querySelector('.scene7-group-1');
    const lg2 = scene7NewTextContainer.querySelector('.scene7-group-2');
    lg1.innerHTML = '<div class="text-red">Shaping<br> minds for</div>';
    lg2.innerHTML = '<div class="text-blue">a brighter <br>future.</div>';
    scene7RedCircleContainer.classList.add('show-ssilp');
    scene7GreyCircleContainer.classList.add('show-ssilp');
    scene7NewTextContainer.classList.add('show-ssilp');
    scene7CirclesContainer.classList.add('show-ssilp');
    lg1.style.opacity = '1'; lg2.style.opacity = '1';
    const s = document.querySelector('.scene7-ssilp-content');
    if (s) gsap.to(s, { opacity: 1, duration: 0.3 });
    const ic = document.querySelector('.scene7-image-circle');
    if (ic) { ic.style.backgroundImage = 'url(./assets/littlewings-microimage.webp)'; ic.style.width = ''; ic.style.height = ''; ic.style.top = ''; }
    isShowingLittleWings = true;
  }

  if (scene7LeftArrowBtn) scene7LeftArrowBtn.addEventListener('click', (e) => { e.preventDefault(); if (isShowingLittleWings) updateScene7ToDefault(); else if (!isShowingLittleWings && !isShowingToyJoy) updateScene7ToToyJoy(); });
  if (scene7RightArrowBtn) scene7RightArrowBtn.addEventListener('click', (e) => { e.preventDefault(); if (!isShowingToyJoy && !isShowingLittleWings) updateScene7ToLittleWings(); else if (isShowingToyJoy) updateScene7ToDefault(); });

  const scene7BackArrowBtn = document.getElementById('scene7-back-arrow');
  if (scene7BackArrowBtn) scene7BackArrowBtn.addEventListener('click', (e) => { e.preventDefault(); updateScene7ToDefault(); });
  const scene7SsilpBackArrowBtn = document.getElementById('scene7-ssilp-back-arrow');
  if (scene7SsilpBackArrowBtn) scene7SsilpBackArrowBtn.addEventListener('click', (e) => { e.preventDefault(); updateScene7ToDefault(); });
  const logoToyJoy = document.getElementById('scene7-logo-toyjoy');
  if (logoToyJoy) logoToyJoy.addEventListener('click', (e) => { e.preventDefault(); if (isShowingToyJoy) updateScene7ToDefault(); else updateScene7ToToyJoy(); });
  const logoLittleWings = document.getElementById('scene7-logo-littlewings');
  if (logoLittleWings) logoLittleWings.addEventListener('click', (e) => { e.preventDefault(); if (isShowingLittleWings) updateScene7ToDefault(); else updateScene7ToLittleWings(); });
}

// ── Grey circle click — show panel + kill old + reinit GSAP ──

const initFns = { '1': initScene4, '2': initScene5, '3': initScene6, '4': initScene7 };

document.querySelectorAll('.grey-circles-container .grey-circle[data-company]').forEach((circle) => {
  circle.addEventListener('click', function () {
    const id = this.getAttribute('data-company');

    document.querySelectorAll('.grey-circles-container .grey-circle').forEach(c => c.classList.remove('gc-active'));
    document.querySelectorAll('.gc-company-panel').forEach(p => p.classList.remove('gc-panel-active'));

    this.classList.add('gc-active');
    const panel = document.querySelector('.gc-company-panel[data-company="' + id + '"]');
    if (panel) {
      panel.classList.add('gc-panel-active');
      requestAnimationFrame(() => {
        if (initFns[id]) initFns[id]();
        ScrollTrigger.refresh();
      });
    }
  });
});
