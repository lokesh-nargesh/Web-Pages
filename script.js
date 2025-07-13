// ========== 3D Cube Rotation ==========
const cube = document.getElementById("cube");
const scene = document.getElementById("scene");

let angleX = -20;
let angleY = 0;
let isDragging = false;
let startX, startY;
let lastAngleX = angleX;
let lastAngleY = angleY;
let autoRotate = true;
let resumeTimeout;

function animate() {
  if (autoRotate) angleY += 0.3;
  cube.style.transform = `rotateX(${angleX}deg) rotateY(${angleY}deg)`;
  requestAnimationFrame(animate);
}
animate();

// ========== Drag Support ==========
scene.addEventListener("mousedown", (e) => {
  isDragging = true;
  startX = e.clientX;
  startY = e.clientY;
  lastAngleX = angleX;
  lastAngleY = angleY;
  autoRotate = false;
  clearTimeout(resumeTimeout);
});
scene.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  const dx = e.clientX - startX;
  const dy = e.clientY - startY;
  angleY = lastAngleY + dx * 0.5;
  angleX = lastAngleX - dy * 0.5;
});
scene.addEventListener("mouseup", () => {
  isDragging = false;
  resumeTimeout = setTimeout(() => autoRotate = true, 5000);
});
scene.addEventListener("mouseleave", () => {
  isDragging = false;
  resumeTimeout = setTimeout(() => autoRotate = true, 5000);
});
scene.addEventListener("touchstart", (e) => {
  isDragging = true;
  const touch = e.touches[0];
  startX = touch.clientX;
  startY = touch.clientY;
  lastAngleX = angleX;
  lastAngleY = angleY;
  autoRotate = false;
  clearTimeout(resumeTimeout);
});
scene.addEventListener("touchmove", (e) => {
  if (!isDragging) return;
  const touch = e.touches[0];
  const dx = touch.clientX - startX;
  const dy = touch.clientY - startY;
  angleY = lastAngleY + dx * 0.5;
  angleX = lastAngleX - dy * 0.5;
});
scene.addEventListener("touchend", () => {
  isDragging = false;
  resumeTimeout = setTimeout(() => autoRotate = true, 5000);
});

// ========== Confetti ==========
const canvas = document.getElementById('confetti-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const pieces = [];
const colors = ['#ff5252', '#ff4081', '#ffb74d', '#81d4fa', '#aed581'];
for (let i = 0; i < 100; i++) {
  pieces.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 8 + 2,
    speed: Math.random() * 3 + 1,
    color: colors[Math.floor(Math.random() * colors.length)],
    rotation: Math.random() * 360,
  });
}
function updateConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let piece of pieces) {
    ctx.fillStyle = piece.color;
    ctx.save();
    ctx.translate(piece.x, piece.y);
    ctx.rotate((piece.rotation * Math.PI) / 180);
    ctx.fillRect(-piece.size / 2, -piece.size / 2, piece.size, piece.size);
    ctx.restore();

    piece.y += piece.speed;
    piece.rotation += 2;

    if (piece.y > canvas.height) {
      piece.y = -10;
      piece.x = Math.random() * canvas.width;
    }
  }
  requestAnimationFrame(updateConfetti);
}
updateConfetti();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// ========== Background Changer ==========
const bg = document.getElementById("bg-layer");
const birthdayImages = [
  "https://images.pexels.com/photos/2072181/pexels-photo-2072181.jpeg",
  "https://images.pexels.com/photos/3171837/pexels-photo-3171837.jpeg",
  "https://images.pexels.com/photos/2072154/pexels-photo-2072154.jpeg",
  "https://images.pexels.com/photos/2072183/pexels-photo-2072183.jpeg",
  "https://images.pexels.com/photos/2072180/pexels-photo-2072180.jpeg",
  "https://images.pexels.com/photos/2072155/pexels-photo-2072155.jpeg",
];
let currentBgIndex = 0;
function updateBackground() {
  currentBgIndex = (currentBgIndex + 1) % birthdayImages.length;
  bg.style.backgroundImage = `url(${birthdayImages[currentBgIndex]})`;
}
bg.style.backgroundImage = `url(${birthdayImages[0]})`;
setInterval(updateBackground, 5000);

// ========== Countdown Timer to 17 July 2025 ==========
function updateTimer() {
  const now = new Date();
  const target = new Date("2025-07-17T00:00:00");
  const diff = target - now;

  if (diff <= 0) {
    document.getElementById("timer").innerText = "🎉 It's Rani's Birthday Today! 🎉";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  document.getElementById("timer").innerText =
    `${days}d ${hours}h ${minutes}m ${seconds}s`;
}
setInterval(updateTimer, 1000);
updateTimer();

// ========== Floating Hearts ==========
function createHeart() {
  const heart = document.createElement("div");
  heart.classList.add("heart");
  heart.style.left = Math.random() * window.innerWidth + "px";
  heart.style.animationDuration = (3 + Math.random() * 3) + "s";
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 6000);
}
setInterval(createHeart, 500);
