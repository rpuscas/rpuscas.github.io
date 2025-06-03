const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const startBtn = document.getElementById('startBtn');
const gameOverScreen = document.getElementById('gameOverScreen');
const nextPageBtn = document.getElementById('nextPageBtn');

const birdImg = new Image();
birdImg.src = 'images/bird.png';

const birdDeadImg = new Image();
birdDeadImg.src = 'images/bird-dead.png';

const pipeTopImg = new Image();
pipeTopImg.src = 'images/pic06.jpg';

const pipeBottomImg = new Image();
pipeBottomImg.src = 'images/pic06.jpg';

let currentBirdImg = birdImg;

let gameStarted = false;
let gravityEnabled = false;
let gameOver = false;
let wonGame = false;
let bird, pipes, frame, score;
let animationFrameId;
let imageSwitched = false;

let pipeWidth = 60;
let pipeGap = 280;
const maxScore = 15;

function initGame() {
  bird = {
    x: 120,
    y: 300,
    radius: 40, // visual radius
    collisionRadius: 30, // 75% for collision
    velocity: 0,
    gravity: 0.25,
    lift: -7
  };

  pipes = [];
  frame = 0;
  score = 0;
  gameOver = false;
  wonGame = false;
  gravityEnabled = false;
  currentBirdImg = birdImg;
  imageSwitched = false;

  canvas.style.display = 'block';
  gameOverScreen.style.display = 'none';
  startBtn.style.display = 'none';
}

function drawBird() {
  const size = bird.radius * 2;
  ctx.save();
  ctx.beginPath();
  ctx.arc(bird.x, bird.y, bird.radius, 0, Math.PI * 2);
  ctx.closePath();
  ctx.clip();
  ctx.drawImage(currentBirdImg, bird.x - bird.radius, bird.y - bird.radius, size, size);
  ctx.restore();
}

function drawPipes() {
  pipes.forEach(pipe => {
    ctx.drawImage(pipeTopImg, pipe.x, 0, pipeWidth, pipe.top);
    ctx.drawImage(pipeBottomImg, pipe.x, pipe.top + pipeGap, pipeWidth, canvas.height - (pipe.top + pipeGap));
  });
}

function updatePipes() {
  if (frame % 140 === 0) {
    let top = Math.random() * 300 + 100;
    pipes.push({ x: canvas.width, top: top });
  }

  pipes.forEach(pipe => pipe.x -= 2);

  if (pipes.length && pipes[0].x < -pipeWidth) {
    pipes.shift();
    score++;
  }
}

function drawScore() {
  ctx.fillStyle = '#000';
  ctx.font = '28px sans-serif';
  ctx.fillText(`Puntos: ${score}`, 20, 40);
}

function checkCollision() {
  for (let pipe of pipes) {
    if (
      bird.x + bird.collisionRadius > pipe.x &&
      bird.x - bird.collisionRadius < pipe.x + pipeWidth
    ) {
      if (
        bird.y - bird.collisionRadius < pipe.top ||
        bird.y + bird.collisionRadius > pipe.top + pipeGap
      ) {
        if (!imageSwitched) {
          currentBirdImg = birdDeadImg;
          imageSwitched = true;
        }
        gameOver = true;
        wonGame = false;
        return;
      }
    }
  }

  if (
    bird.y + bird.collisionRadius >= canvas.height ||
    bird.y - bird.collisionRadius <= 0
  ) {
    if (!imageSwitched) {
      currentBirdImg = birdDeadImg;
      imageSwitched = true;
    }
    gameOver = true;
    wonGame = false;
  }

  if (score >= maxScore) {
    gameOver = true;
    wonGame = true;
    showWinScreen();
  }
}

function showWinScreen() {
  canvas.style.display = 'none';
  gameOverScreen.style.display = 'block';
}

function resetGame() {
  if (animationFrameId) cancelAnimationFrame(animationFrameId);
  initGame();
  gameStarted = true;
  gameLoop();
}

function gameLoop() {
  if (!gameStarted) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (gravityEnabled) {
    bird.velocity += bird.gravity;
    bird.y += bird.velocity;
  }

  drawBird();
  updatePipes();
  drawPipes();
  drawScore();
  checkCollision();

  if (!gameOver) {
    frame++;
    animationFrameId = requestAnimationFrame(gameLoop);
  } else {
    drawBird(); // Show final bird position with dead image
  }
}

document.addEventListener('keydown', (e) => {
  if (e.code === 'Space') {
    if (!gameStarted) return;

    if (gameOver) {
      if (!wonGame) {
        gameOverScreen.style.display = 'none';
        resetGame();
      }
    } else {
      if (!gravityEnabled) gravityEnabled = true;
      bird.velocity = bird.lift;
    }
  }
});

canvas.addEventListener('click', () => {
  if (gameStarted && !gameOver) {
    if (!gravityEnabled) gravityEnabled = true;
    bird.velocity = bird.lift;
  }
});

startBtn.addEventListener('click', () => {
  initGame();
  gameStarted = true;
  gameLoop();
});

nextPageBtn.addEventListener('click', () => {
  window.location.href = "prueba2.html"; // cambia la URL
});
