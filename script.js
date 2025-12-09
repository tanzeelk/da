const heroText = document.querySelector(".hero-text");
const body = document.body;
const circleBack = document.querySelector(".circle-back");
// Add a background inside the center circle
const circleBackBg = document.createElement("div");
circleBackBg.classList.add("circle-back-bg");
circleBack.appendChild(circleBackBg);

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Fixed Navigation Bar - Show from Scene 4 onwards till the end
const fixedNav = document.getElementById('fixedNav');

ScrollTrigger.create({
  trigger: ".scene4",
  start: "center center",
  endTrigger: "body",
  end: "bottom bottom",
  onEnter: () => fixedNav.classList.add('visible'),
  onLeaveBack: () => fixedNav.classList.remove('visible'),
  markers: false
});

// Smooth scroll for footer links
document.querySelectorAll('a[href="#footer"]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('footer').scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  });
});

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

// let t3 = gsap.timeline({
//   scrollTrigger: {
//     trigger: ".scene3",
//     start: "top 70%",   // start when scene3 top hits viewport bottom
//     end: "+=800",
//     scrub: true,
//     pin: false,
//     markers: false
//   }
// });

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

// Lock top bar in fixed position after it fades in
tl.to(topBar, {
  duration: 0.1,
  onComplete: function() {
    gsap.set(topBar, { position: "fixed", top: "40px", left: "50%", transform: "translateX(-50%)", zIndex: 100 });
  }
}, "<");

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
  { opacity: 0.5, y: 250 }, // starts far down
  { opacity: 1, y: 10, duration: 1, ease: "power2.out" },
  "-=1.5" 
);

// BigCircle appears after text animations complete - fades in and moves down
tl.fromTo(bigCircle, 
  { opacity: 0, y: -50 }, // starts above, invisible
  { opacity: 0.9, y: 500, duration: 1.5, ease: "power2.out" },
  "-=1.5" 
);

// Journey text appears at same time as bigCircle - comes up from bottom
const journeyText = document.querySelector(".journey-text");
tl.fromTo(journeyText,
  { opacity: 0, y: 400 }, // starts below, invisible
  { opacity: 1, y: 190, duration: 1.5, ease: "power2.out" },
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
const heroTextScene2 = document.querySelector(".scene2 .hero-text-scene2");
// Add a background inside the center circle
const circleBackScene2Bg = document.createElement("div");
circleBackScene2Bg.classList.add("circle-back-scene2-bg");
circleBackScene2.appendChild(circleBackScene2Bg);

const foundingText = document.querySelector(".founding-text");
const growthText = document.querySelector(".growth-text");


// Fade in hero text while circles leave
t2.fromTo(heroTextScene2, 
  { opacity: 0, y: 200 }, // starts far down
  { opacity: 1, y: -40, duration: 1.5, ease: "power2.out" },
   "<-1.5");

// Second line of hero text (white span) in scene2 - slides up after first
t2.fromTo(
  heroTextScene2.querySelector("span"),
  { opacity: 0, y: 200 }, // starts far down
  { opacity: 1, y: 10, duration: 1.5, ease: "power2.out" },
  "-=0.03"
);
// Everything starts scrolling up earlier
t2.to(circleBackScene2Top, { 
  y: "40vh", 
  duration: 2, 
  ease: "power2.inOut" 
}, "-=0.5");



// Founding text appears after heroText2
t2.fromTo(foundingText,
  { opacity: 0, y: 300 },
  { opacity: 1, y: 250, duration: 1.5, ease: "power2.out" },
  "+=0.3"
);

// Growth text appears slightly after founding text
t2.fromTo(growthText,
  { opacity: 0, y: 300 },
  { opacity: 1, y: 210, duration: 1.5, ease: "power2.out" },
  "-=0.5"
);

// Scene3 elements animation in scene2
// const scene3Image = document.querySelector(".scene3-image");
// const scene3RedCircle = document.querySelector(".scene3-red-circle");
// const scene3GroupText = document.querySelector(".scene3-group-text");
// const scene3VenturesText = document.querySelector(".scene3-ventures-text");
// const scene3RedCircleText = document.querySelector(".scene3-red-circle-text");



// // Step 1: Fade in both image and circle together
// t3.fromTo(
//   scene3Image,
//   { opacity: 0, width: "350px", height: "350px", borderRadius: "50%" },
//   { opacity: 1, ease: "power2.out", duration: 1 }
// );

// t3.fromTo(
//   scene3RedCircle,
//   { opacity: 0, width: "320px", height: "320px" },
//   { opacity: 0.9, ease: "power2.out", duration: 2 },
//   0 // <-- start at same time as image
// );

// // Step 2: Expand image into wide rounded rectangle
// // t3.to(
// //   scene3Image,
// //   {
// //     width: "100vw",
// //     height: "350px",
// //     borderRadius: "60px",
// //     ease: "power3.out"
// //   }
// // );

// gsap.to(scene3Image, {
//   scrollTrigger: {
//     trigger: ".scene3",
//     start: "top 90%",
//     end: "center 50%",
//         scrub: 1,           // smooth scrub over scroll
//   },
//   width: "100vw",
//   height: "350px",
//   borderRadius: "0px",
//   ease: "power2.out"
// });



// // Step 4: Slide the red circle to the right
//  t3.to(scene3RedCircle,
//   { left: "calc(50vw - 100px)", duration: 2, ease: "power2.out" },
//   "<"
// );

// // Step 3: Transition to square corners
// t3.to(
//   scene3Image,
//   {
//     borderRadius: "0px",
//     duration:1,
//     ease: "power2.out"
//   },
//   "-=0.1"
// );



// // Fade in 'Our Group' halfway through image expansion - slides up from much lower
// t3.fromTo(scene3GroupText, 
//   { opacity: 0, y: 400 },
//   { opacity: 1, y: 0, duration: 2, ease: "power3.out" },
//   "-=1.0"
// );

// // 'Our Ventures' text - slides up from bottom
// t3.fromTo(scene3VenturesText,
//   { opacity: 0, y: 400 },
//   { opacity: 1, y: -60, duration: 2.5, ease: "power3.out" },
//   "-=0.5"
// );

// // Fade in red circle text at same time as ventures text - slides up from bottom
// t3.fromTo(scene3RedCircleText,
//   { opacity: 0, y: 100 },
//   { opacity: 1, y: 0, duration: 2.5, ease: "power2.out" },
//   "-=0.5"
// );

// // Animate background circles with parallax effect - floating up slowly
// const bgCircles = document.querySelectorAll(".bg-circle");
// t3.from(".bg-circle", {
//   y: 200,
//   opacity: 0,
//   stagger: {
//     each: 0.25,
//     from: "random"
//   },
//   duration: 5, // base
//   ease: "power2.out"
// }, "-=1.5");

// t3.to(".bg-circle", i => ({
//   y: 0,
//   opacity: 1,
//   duration: 2 + Math.random() * 2, // each circle gets unique speed
//   ease: "power2.out"
// }), "<");


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
    start: "top 90%",    // starts when scene is just entering viewport
    end: "bottom 40%",   // longer scroll distance = smoother animations
    scrub: 4,            // smooth interpolation tied to scroll
    markers: false
  }
});

// -----------------------
// Step 1: Fade in image + circle together
t3.fromTo(
  scene3Image,
  { opacity: 0, width: "350px", height: "350px", borderRadius: "50%" },
  { opacity: 1, ease: "power2.out" }
);

t3.fromTo(
  scene3RedCircle,
  { opacity: 0, width: "320px", height: "320px" },
  { opacity: 0.9, ease: "power2.out" },
  0
);



let expandTL = gsap.timeline();

expandTL.to(scene3Image, {
  width: "100vw",
  height: "350px",
  borderRadius: "200px",
  ease: "none",    // no easing so scroll fully controls pace
  duration: 1
});

expandTL.to(scene3RedCircle, {
  left: "calc(50vw - 200px)",
  ease: "none",   // important! scroll-controlled
  duration: 1
}, 0.1); // starts at the same time as the image expansion



t3.add(expandTL, ">0.5");

// -----------------------
// Step 4: Gradually transition border-radius to rectangle
t3.to(scene3Image, {
  borderRadius: "0px",
  ease: "power2.out"
}, "<+=1"); // starts slightly after expansion begins

// -----------------------
// Step 5: Fade + slide up 'Our Group' and 'Our Ventures' texts
t3.fromTo(scene3GroupText,
  { opacity: 0, y: 250 },
  { opacity: 1, y: 0, ease: "power3.out" },
  "-=1.5"  // overlap with image expansion
);

t3.fromTo(scene3VenturesText,
  { opacity: 0, y: 250 },
  { opacity: 1, y: -40, ease: "power3.out" },
  "-=1.3"
);

t3.fromTo(scene3RedCircleText,
  { opacity: 0, y: 100 },
  { opacity: 1, y: 0, ease: "power2.out" },
  "-=2.0"
);

// -----------------------
// Step 6: Background circles float up slowly
// t3.fromTo(
//   ".bg-circle",
//   { y: 150, opacity: 0 },
//   {
//     y: 0,
//     opacity: 1,
//     ease: "power2.out",
//     stagger: { each: 0.25, from: "random" }
//   },
//   "-=3"  // start with texts, so movement is visible immediately
// );


// Animate the 4 main grey circles from grey-circles-section
const greyCircles = document.querySelectorAll(".grey-circle");

let bgTL = gsap.timeline({
  scrollTrigger: {
    trigger: ".scene3",
   start: "top 80%",    // when scene3 top hits viewport bottom
    end: "bottom center",   // long runway so they move sloooowly
    scrub: 1,
    markers: false
  }
});

bgTL.fromTo(
  ".bg-circle",
  { y: 150, opacity: 0 },
  {
    y: 0,
    opacity: 1,
    ease: "none",    // scroll controls everything = slow, smooth
    stagger: { each: 0.35, from: "random" }
  }
);
// greyCircles.forEach((circle, index) => {
//   // Random speeds and delays for each circle
//   const randomSpeed = 3 + Math.random() * 2; // Random duration between 3-5 seconds
//   const randomDelay = Math.random() * 1.5; // Random delay between 0-1.5 seconds
  
//   t3.fromTo(circle,
//     { y: 300, opacity: 0 }, // Start from below
//     { 
//       y: 0, // End at original position
//       opacity: 1,
//       duration: randomSpeed,
//       ease: "power2.out" 
//     },
//     `-=${2 - randomDelay}` // Random start times
//   );
// });




const scene4ImageCircle = document.querySelector(".scene4-image-circle");
const scene4RedCircle = document.querySelector(".scene4-red-circle");
const scene4GreyCircle = document.querySelector(".scene4-grey-circle");
// Falling circle from scene3 to scene4
const scene4FallingCircle = document.querySelector('.scene4-falling-circle');
const scene4Tagline = document.querySelector('.scene4-tagline');
const scene4NewText = document.querySelector('.scene4-new-text');

const scene4RedText = document.querySelector('.scene4-red-text');
// t4.fromTo(scene4FallingCircle,
//   { opacity: 1, top: "-500px" },
//   { top: "1px", opacity: 1, duration: 1, ease: "power2.out" },
//   0
// );
// Animate new text fading in with circles
t4.to(scene4NewText,
  { opacity: 1, duration: 0.2, ease: "power2.out" },
  0
);

// Animate image circle moving left
t4.to(scene4ImageCircle,
  { x: -150, duration: 0.2, ease: "power2.out" },
  0
);

// Animate red circle moving right
t4.to(scene4RedCircle,
  { x: 150, duration: 0.2, ease: "power2.out" },
  0
)



t4.to(scene4RedText, {
  opacity: 1,
  y:20,
  duration: 0.3,
  ease: "power2.out"
}, 0.1);

// Fade in grey circle after red circle stops moving
t4.to(scene4GreyCircle, {
  opacity: 1,
  y: -300,
  duration: 0.1,
  ease: "power2.out"
}, 0.1);

t4.to(scene4Tagline, {
  opacity: 1,
  y: 50,
  duration: 0.1,
  ease: "power2.out"
}, 0);




// Scene 5 Timeline - Red circle left, Image right
let t5 = gsap.timeline({
  scrollTrigger: {
    trigger: ".scene5",
    start: "top bottom",
    end: "+=400",
    scrub: true,
    pin: false,
    markers: false
  }
});

const scene5ImageCircle = document.querySelector(".scene5-image-circle");
const scene5RedCircle = document.querySelector(".scene5-red-circle");
const scene5GreyCircle = document.querySelector(".scene5-grey-circle");
const scene5Text = document.querySelector(".scene5-text");

t5.to(scene5RedCircle, { x: -150, duration: 1.25, ease: "power2.out" }, 0);
t5.to(scene5ImageCircle, { x: 150, duration: 1.25, ease: "power2.out" }, 0);
t5.to(scene5Text, { opacity: 1, y: -60, duration: 0.6, ease: "power2.out" }, 0.25);
t5.to(scene5GreyCircle, { opacity: 1, y: -300, duration: 0.3, ease: "power2.out" }, 0.25);

// Scene 6 Timeline - Image left, Red circle right
let t6 = gsap.timeline({
  scrollTrigger: {
    trigger: ".scene6",
    start: "top bottom",
    end: "+=400",
    scrub: true,
    pin: false,
    markers: false
  }
});

const scene6ImageCircle = document.querySelector(".scene6-image-circle");
const scene6RedCircle = document.querySelector(".scene6-red-circle");
const scene6GreyCircle = document.querySelector(".scene6-grey-circle");
const scene6Text = document.querySelector(".scene6-text");

t6.to(scene6ImageCircle, { x: -150, duration: 1.25, ease: "power2.out" }, 0);
t6.to(scene6RedCircle, { x: 150, duration: 1.25, ease: "power2.out" }, 0);
t6.to(scene6Text, { opacity: 1, y: -60, duration: 0.6, ease: "power2.out" }, 0.1);
t6.to(scene6GreyCircle, { opacity: 1, y: -300, duration: 0.2, ease: "power2.out" }, 0.25);

// Scene 7 Timeline - Red circle left, Image right
let t7 = gsap.timeline({
  scrollTrigger: {
    trigger: ".scene7",
    start: "top bottom",
    end: "+=400",
    scrub: true,
    pin: false,
    markers: false
  }
});

const scene7ImageCircle = document.querySelector(".scene7-image-circle");
const scene7RedCircle = document.querySelector(".scene7-red-circle");
const scene7GreyCircle = document.querySelector(".scene7-grey-circle");
const scene7Text = document.querySelector(".scene7-text");

t7.to(scene7RedCircle, { x: -150, duration: 1.25, ease: "power2.out" }, 0);
t7.to(scene7ImageCircle, { x: 150, duration: 1.25, ease: "power2.out" }, 0);
t7.to(scene7Text, { opacity: 1, y: -60, duration: 0.6, ease: "power2.out" }, 0.1);
t7.to(scene7GreyCircle, { opacity: 1, y: -300, duration: 0.2, ease: "power2.out" }, 0.25);

// Scene 8 Timeline - Image left, Red circle right
let t8 = gsap.timeline({
  scrollTrigger: {
    trigger: ".scene8",
    start: "top bottom",
    end: "+=400",
    scrub: true,
    pin: false,
    markers: false
  }
});

const scene8ImageCircle = document.querySelector(".scene8-image-circle");
const scene8RedCircle = document.querySelector(".scene8-red-circle");
const scene8GreyCircle = document.querySelector(".scene8-grey-circle");
const scene8Text = document.querySelector(".scene8-text");

t8.to(scene8ImageCircle, { x: -150, duration: 1.25, ease: "power2.out" }, 0);
t8.to(scene8RedCircle, { x: 150, duration: 1.25, ease: "power2.out" }, 0);
t8.to(scene8Text, { opacity: 1, y: -60, duration: 0.6, ease: "power2.out" }, 0.1);
t8.to(scene8GreyCircle, { opacity: 1, y: -300, duration: 0.2, ease: "power2.out" }, 0.25);
