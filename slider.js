const slider = document.querySelector(".slider");
const slides = document.querySelector(".slides");
const images = Array.from(slides.querySelectorAll("img"));
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");
const dotsContainer = document.querySelector(".dots");
const counter = document.querySelector(".counter");

let currentIndex = 0;
let isMoving = false;

// Add one copy at each end so the slider can loop smoothly.
const firstCopy = images[0].cloneNode(true);
const lastCopy = images[images.length - 1].cloneNode(true);
slides.appendChild(firstCopy);
slides.insertBefore(lastCopy, images[0]);

let allSlides = Array.from(slides.querySelectorAll("img"));
slides.style.transform = "translateX(-100%)";

// Make one dot for each real image.
images.forEach((image, index) => {
  const dot = document.createElement("button");
  dot.className = "dot";
  dot.type = "button";
  dot.setAttribute("aria-label", `Show image ${index + 1}`);
  dot.addEventListener("click", () => showSlide(index));
  dotsContainer.appendChild(dot);
});

const dots = Array.from(dotsContainer.querySelectorAll(".dot"));

function updateDots() {
  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentIndex);
  });
  counter.textContent = `Image ${currentIndex + 1} of ${images.length}`;
}

function showSlide(index) {
  if (isMoving || index === currentIndex) return;
  currentIndex = index;
  isMoving = true;
  slides.style.transition = "transform 0.45s ease";
  slides.style.transform = `translateX(-${(currentIndex + 1) * 100}%)`;
  updateDots();
}

function nextSlide() {
  if (isMoving) return;
  if (currentIndex === images.length - 1) {
    currentIndex = images.length; // Move to the copied first slide.
    isMoving = true;
    slides.style.transition = "transform 0.45s ease";
    slides.style.transform = `translateX(-${(currentIndex + 1) * 100}%)`;
    updateDots();
  } else {
    showSlide(currentIndex + 1);
  }
}

function previousSlide() {
  if (isMoving) return;
  if (currentIndex === 0) {
    currentIndex = -1; // Move to the copied last slide.
    isMoving = true;
    slides.style.transition = "transform 0.45s ease";
    slides.style.transform = "translateX(0)";
    updateDots();
  } else {
    showSlide(currentIndex - 1);
  }
}

slides.addEventListener("transitionend", () => {
  if (currentIndex === images.length) {
    currentIndex = 0;
    slides.style.transition = "none";
    slides.style.transform = "translateX(-100%)";
  } else if (currentIndex === -1) {
    currentIndex = images.length - 1;
    slides.style.transition = "none";
    slides.style.transform = `translateX(-${images.length * 100}%)`;
  }
  isMoving = false;
  updateDots();
});

nextButton.addEventListener("click", nextSlide);
prevButton.addEventListener("click", previousSlide);
updateDots();
