const heroText = document.querySelector(".hero-text");
const body = document.body;
const circleBack = document.querySelector(".circle-back");
// Add a background inside the center circle
const circleBackBg = document.createElement("div");
circleBackBg.classList.add("circle-back-bg");
circleBack.appendChild(circleBackBg);

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Hero title animation
gsap.from(".title", {
  duration: 1.5,
  y: 50,
  opacity: 0,
  ease: "power3.out"
});

// Parallax scroll effect
gsap.to(".layer-bg", {
  y: -100,
  scrollTrigger: {
    trigger: ".parallax",
    start: "top bottom",
    scrub: true
  }
});

gsap.to(".layer-mid", {
  y: -200,
  scrollTrigger: {
    trigger: ".parallax",
    start: "top bottom",
    scrub: true
  }
});

gsap.to(".layer-fg", {
  y: -300,
  scrollTrigger: {
    trigger: ".parallax",
    start: "top bottom",
    scrub: true
  }
});

// Fade-in content section
gsap.to(".content", {
  opacity: 1,
  duration: 1.5,
  y: -30,
  scrollTrigger: {
    trigger: ".content",
    start: "top 80%",
    toggleActions: "play none none reverse"
  }
});

let tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".scene1",
    start: "top top",
    end: "+=3500",   // longer scroll to allow rotation + expansion
    scrub: true,
    pin: true,
    markers: false
  }
});

let t2 = gsap.timeline({
  scrollTrigger: {
    trigger: ".scene2",
    start: "top top",
    end: "+=1500",   // extended to allow image expansion
    scrub: true,
    pin: true,
    markers: false
  }
});

let t3 = gsap.timeline({
  scrollTrigger: {
    trigger: ".scene3",
    start: "top bottom",   // start when scene3 top hits viewport bottom
    end: "+=600",
    scrub: true,
    pin: false,
    markers: false
  }
});

// Scene 4 Timeline - Two circles animating apart horizontally
let t4 = gsap.timeline({
  scrollTrigger: {
    trigger: ".scene4",
    start: "top bottom",   // start when scene4 enters viewport
    end: "+=800",
    scrub: true,
    pin: false,
    markers: false
  }
});

const finalText = document.querySelector(".final-text");
const topBar = document.querySelector(".top-bar");

const textContent = finalText.textContent.trim();
finalText.innerHTML = ""; 

textContent.split("").forEach(char => {
  const span = document.createElement("span");
  span.textContent = char;
  span.style.opacity = 0;
  finalText.appendChild(span);
});

const spans = finalText.querySelectorAll("span");
const logo = document.querySelector(".logo");

// Create two clones of the back circle
const circleLeft = circleBack.cloneNode(true);
const circleRight = circleBack.cloneNode(true);
const bigCircle = circleBack.cloneNode(true);


circleLeft.classList.add("circle-left");
circleRight.classList.add("circle-right");
bigCircle.classList.add("big-circle");

circleLeft.style.opacity = 0;
circleRight.style.opacity = 0;
bigCircle.style.opacity = 0;

// Append clones to the scene
const circle = document.querySelector(".circle");
circle.appendChild(circleLeft);
circle.appendChild(circleRight);
circle.appendChild(bigCircle);


tl.to(".circle-back", {
    rotationY: 0,
    duration: 1,
    repeat: 0,
    ease: "none",
  }, 0);

  tl.to(".circle-front", {
    opacity: 0,
    duration: 0.2,
    ease: "power1.out"
  }, ">");

  tl.to(".circle-back", {
    scale: 12,
    ease: "none",
    onUpdate: function () {
      const scale = gsap.getProperty(".circle-back", "scale");
      const textEl = document.querySelector(".scroll-text");
      
      if ((scale >= 1 && scale < 9) && !window._textChanged) {
        textEl.innerText = "Scroll continue";
      }

      if ((scale > 9 && scale < 10)) {
        textEl.innerText = "Get started";
      }
      
      if (scale > 10 && !window._textFaded) {
        gsap.to(textEl, {
          opacity: 0,
          duration: 0.6,
          ease: "power2.out"
        });

        window._textFaded = true;
      }
    }
  });

tl.to(".final-text", { opacity: 1 }, "-=0.5");
tl.to(spans, {
  opacity: 1,
  stagger: { each: 0.02, ease: "none" }
});

// Fade out the typewriter text once all letters are visible
tl.to(finalText, { opacity: 0, duration: 0.5 });

// Fade in top bar (logo + menu) simultaneously
tl.to(topBar, { opacity: 1, duration: 0.5, ease: "power2.out" });
tl.to(logo, { opacity: 1, duration: 0.5 }, "<");

// Start circles, text animations all together
// Circles fade in and start moving
tl.to([circleLeft, circleRight], {
  opacity: 0.9,
  duration: 1
}, ">");

// Move left circle off-screen (starts same time as circles fade in)
tl.to(circleLeft, {
  x: "-150vw", 
  rotation: -360, 
  duration: 2, 
  ease: "power2.inOut" 
}, "<");

// Move right circle off-screen (same timing as left)
tl.to(circleRight, {
  x: "150vw", 
  rotation: 360, 
  duration: 2, 
  ease: "power2.inOut" 
}, "<");

// Fade in center circle background (same timing - reveals the bg photo)
tl.to(circleBackBg, { opacity: 1, duration: 1.5 }, "<");

// First line of hero text (red) - slides up from bottom at same time as circles move
tl.fromTo(heroText, 
  { opacity: 0, y: 200 }, // starts far down
  { opacity: 1, y: -40, duration: 1, ease: "power2.out" }, "<");

// Second line of hero text (white) - starts from much lower, ends much lower

tl.fromTo(
  heroText.querySelector("span"),
  { opacity: 0, y: 200 }, // starts far down
  { opacity: 1, y: 10, duration: 1, ease: "power2.out" },
  "-=0.03" 
);

// BigCircle appears after text animations complete - fades in and moves down
tl.fromTo(bigCircle, 
  { opacity: 0, y: -50 }, // starts above, invisible
  { opacity: 0.9, y: 450, duration: 1.5, ease: "power2.out" } 
);

// Journey text appears at same time as bigCircle - comes up from bottom
const journeyText = document.querySelector(".journey-text");
tl.fromTo(journeyText,
  { opacity: 0, y: 300 }, // starts below, invisible
  { opacity: 1, y: 200, duration: 1.5, ease: "power2.out" },
  "<" // same time as bigCircle
);

// Lock bigCircle in place after animation completes
tl.to(bigCircle, {
  duration: 0.1,
  onComplete: function() {
    // Remove from ScrollTrigger timeline so it doesn't move with scroll
    gsap.set(bigCircle, { position: "fixed", top: "50%", left: "50%" });
  }
});

const circleBackScene2Top = document.querySelector(".scene2 .circle-back.top");
const circleBackScene2 = document.querySelector(".scene2 .circle-back.back");
const heroTextScene2 = document.querySelector(".scene2 .hero-text");
// Add a background inside the center circle
const circleBackScene2Bg = document.createElement("div");
circleBackScene2Bg.classList.add("circle-back-scene2-bg");
circleBackScene2.appendChild(circleBackScene2Bg);

const foundingText = document.querySelector(".founding-text");
const growthText = document.querySelector(".growth-text");

// Everything starts scrolling up earlier
t2.to(circleBackScene2Top, { 
  y: "35vh", 
  duration: 2, 
  ease: "power2.inOut" 
}, "-=0.5");

// Fade in hero text while circles leave
t2.fromTo(heroTextScene2, 
  { opacity: 0, y: 200 }, // starts far down
  { opacity: 1, y: -40, duration: 1.5, ease: "power2.out" }, "<");

// Second line of hero text (white span) in scene2 - slides up after first
t2.fromTo(
  heroTextScene2.querySelector("span"),
  { opacity: 0, y: 200 }, // starts far down
  { opacity: 1, y: 10, duration: 1.5, ease: "power2.out" },
  "-=0.03"
);

// Founding text appears after heroText2
t2.fromTo(foundingText,
  { opacity: 0, y: 300 },
  { opacity: 1, y: 200, duration: 1.5, ease: "power2.out" },
  "+=0.3"
);

// Growth text appears slightly after founding text
t2.fromTo(growthText,
  { opacity: 0, y: 300 },
  { opacity: 1, y: 210, duration: 1.5, ease: "power2.out" },
  "-=0.5"
);

// Scene3 elements animation in scene2
const scene3Image = document.querySelector(".scene3-image");
const scene3RedCircle = document.querySelector(".scene3-red-circle");

// Fade in the image behind the red circle (after growth text)
t3.fromTo(scene3Image,
  { opacity: 0.8, width: "100px", height: "100px", borderRadius: "50%" },
  { opacity: 1, duration: 0.2, ease: "power2.out" },
  "+=0.5"
);

// Fade in red circle on top of image
t3.fromTo(scene3RedCircle,
  { opacity: 0 },
  { opacity: 0.7, duration: 1, ease: "power2.out" },
  "<"
);

// Expand image horizontally while staying circular at first, then rectangular
// Expand with round edges
t3.to(scene3Image,
  { width: "100vw", height: "200px", borderRadius: "100px", duration: 3, ease: "power2.out" },
  "0"
);
// Then reveal full image (square corners)
t3.to(scene3Image,
  { borderRadius: "0px", duration: 0.5, ease: "power2.inOut" },
  "<"
);

// Red circle slides to the right faster, stopping before the edge
t3.to(scene3RedCircle,
  { left: "calc(45vw - 199px)", duration: 2, ease: "power2.out" },
  "-=1"
);
const scene3GroupText = document.querySelector(".scene3-group-text");
const scene3VenturesText = document.querySelector(".scene3-ventures-text");
// Fade in 'Our Group' halfway through image expansion
t3.to(scene3GroupText, {
  opacity: 1,
  duration: 0.5,
  ease: "power2.out"
}, "-=0.7");

// Fade in and slide up 'Our Ventures' after image expansion
t3.fromTo(scene3VenturesText,
  { opacity: 0, y: 40 },
  { opacity: 1, y: -60, duration: 0.5, ease: "power2.out" },
  ">"
);



const scene4ImageCircle = document.querySelector(".scene4-image-circle");
const scene4RedCircle = document.querySelector(".scene4-red-circle");

// Animate image circle moving left
t4.to(scene4ImageCircle,
  { x: -150, duration: 1.25, ease: "power2.out" },
  0
);

// Animate red circle moving right
t4.to(scene4RedCircle,
  { x: 150, duration: 1.25, ease: "power2.out" },
  0
);

const scene4RedText = document.querySelector('.scene4-red-text');

t4.to(scene4RedText, {
  opacity: 1,
  y:20,
  duration: 0.8,
  ease: "power2.out"
}, 0.7);

// Scene 5 Timeline - Red circle left, Image right
let t5 = gsap.timeline({
  scrollTrigger: {
    trigger: ".scene5",
    start: "top bottom",
    end: "+=800",
    scrub: true,
    pin: false,
    markers: false
  }
});

const scene5ImageCircle = document.querySelector(".scene5-image-circle");
const scene5RedCircle = document.querySelector(".scene5-red-circle");
const scene5Text = document.querySelector(".scene5-text");

t5.to(scene5RedCircle, { x: -150, duration: 1.25, ease: "power2.out" }, 0);
t5.to(scene5ImageCircle, { x: 150, duration: 1.25, ease: "power2.out" }, 0);
t5.to(scene5Text, { opacity: 1, y: -60, duration: 0.8, ease: "power2.out" }, 0.7);

// Scene 6 Timeline - Image left, Red circle right
let t6 = gsap.timeline({
  scrollTrigger: {
    trigger: ".scene6",
    start: "top bottom",
    end: "+=800",
    scrub: true,
    pin: false,
    markers: false
  }
});

const scene6ImageCircle = document.querySelector(".scene6-image-circle");
const scene6RedCircle = document.querySelector(".scene6-red-circle");
const scene6Text = document.querySelector(".scene6-text");

t6.to(scene6ImageCircle, { x: -150, duration: 1.25, ease: "power2.out" }, 0);
t6.to(scene6RedCircle, { x: 150, duration: 1.25, ease: "power2.out" }, 0);
t6.to(scene6Text, { opacity: 1, y: -60, duration: 0.8, ease: "power2.out" }, 0.7);

// Scene 7 Timeline - Red circle left, Image right
let t7 = gsap.timeline({
  scrollTrigger: {
    trigger: ".scene7",
    start: "top bottom",
    end: "+=800",
    scrub: true,
    pin: false,
    markers: false
  }
});

const scene7ImageCircle = document.querySelector(".scene7-image-circle");
const scene7RedCircle = document.querySelector(".scene7-red-circle");
const scene7Text = document.querySelector(".scene7-text");

t7.to(scene7RedCircle, { x: -150, duration: 1.25, ease: "power2.out" }, 0);
t7.to(scene7ImageCircle, { x: 150, duration: 1.25, ease: "power2.out" }, 0);
t7.to(scene7Text, { opacity: 1, y: -60, duration: 0.8, ease: "power2.out" }, 0.7);

// Scene 8 Timeline - Image left, Red circle right
let t8 = gsap.timeline({
  scrollTrigger: {
    trigger: ".scene8",
    start: "top bottom",
    end: "+=800",
    scrub: true,
    pin: false,
    markers: false
  }
});

const scene8ImageCircle = document.querySelector(".scene8-image-circle");
const scene8RedCircle = document.querySelector(".scene8-red-circle");
const scene8Text = document.querySelector(".scene8-text");

t8.to(scene8ImageCircle, { x: -150, duration: 1.25, ease: "power2.out" }, 0);
t8.to(scene8RedCircle, { x: 150, duration: 1.25, ease: "power2.out" }, 0);
t8.to(scene8Text, { opacity: 1, y: -60, duration: 0.8, ease: "power2.out" }, 0.7);
