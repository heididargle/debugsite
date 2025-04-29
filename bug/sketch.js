let mothImg, wallImgs = [], glitchImg, score0Img, score1Img, livesImg, gameOverImg;
let moth;
let walls = [];
let glitches = [];
let scores = [];
let trail = [];
let score = 0;
let lives = 3;
let canvasW = 1024;
let canvasH = 684;
let scrollSpeed = 2;
let gameOver = false;

let scoreSound, errorSound, restartSound;

let chicagoFont;

function preload() {
  chicagoFont = loadFont('ChicagoKare-Regular.otf');
  mothImg = loadImage('moth.png');
  wallImgs = [
    loadImage('wall1.png'),
    loadImage('wall2.png'),
    loadImage('wall3.png'),
    loadImage('wall4.png')
  ];
  glitchImg = loadImage('glitch.png');
  score0Img = loadImage('score0.png');
  score1Img = loadImage('score1.png');
  livesImg = loadImage('lives.png');
  gameOverImg = loadImage('gameover.png');

  scoreSound = loadSound('score.mp3');
  errorSound = loadSound('error.mp3');
  restartSound = loadSound('restart.mp3');
}

function setup() {
  createCanvas(canvasW, canvasH);
  moth = {
    x: width / 2,
    y: height / 2,
    w: 31.5,
    h: 40.5,
    speed: 5
  };
}

function draw() {
  
  if (lives <= 0 && !gameOver) {
    gameOver = true;
    restartSound.play();
  }

  background(0);

  scrollSpeed = 1.8 + floor(score / 20) * 0.75;

  if (frameCount % 5 === 0) {
    trail.push({ x: moth.x + moth.w / 2, y: moth.y });
    if (trail.length > 30) trail.shift();
  }

  noStroke();
  fill(255);
  for (let i = 0; i < trail.length; i++) {
    rect(trail[i].x, trail[i].y, 3, 3);
    trail[i].y -= 1.5;
  }

  image(mothImg, moth.x, moth.y, moth.w, moth.h);
  handleInput();

  if (frameCount % 40 === 0) spawnWall();
  if (frameCount % 40 === 0) spawnScore();
  if (frameCount % 90 === 0) spawnGlitch();

  for (let i = walls.length - 1; i >= 0; i--) {
    walls[i].y -= scrollSpeed;
    image(walls[i].img, walls[i].x, walls[i].y, walls[i].w, walls[i].h);
    if (checkCollision(moth, walls[i])) {
      lives--;
      errorSound.play();
      walls.splice(i, 1);
    } else if (walls[i].y + walls[i].h < 0) {
      walls.splice(i, 1);
    }
  }

  for (let i = scores.length - 1; i >= 0; i--) {
    scores[i].y -= scrollSpeed;
    image(scores[i].img, scores[i].x, scores[i].y, scores[i].w, scores[i].h);
    if (checkCollision(moth, scores[i])) {
      score += scores[i].value;
      scoreSound.play();
      scores.splice(i, 1);
    } else if (scores[i].y + scores[i].h < 0) {
      scores.splice(i, 1);
    }
  }

  for (let i = glitches.length - 1; i >= 0; i--) {
    glitches[i].y -= scrollSpeed;
    image(glitchImg, glitches[i].x, glitches[i].y, 26, 18);
    if (checkCollision(moth, glitches[i])) {
      score = max(0, score - 15);
      errorSound.play();
      glitches.splice(i, 1);
    } else if (glitches[i].y + 18 < 0) {
      glitches.splice(i, 1);
    }
  }

  drawScore();
  drawLives();

  if (gameOver) {
    imageMode(CENTER);
    image(gameOverImg, width / 2, height / 2, width, height);
    noLoop();
}
}

function handleInput() {
  if (keyIsDown(LEFT_ARROW)) moth.x -= moth.speed;
  if (keyIsDown(RIGHT_ARROW)) moth.x += moth.speed;
  if (keyIsDown(DOWN_ARROW)) moth.y += moth.speed;
  if (keyIsDown(UP_ARROW)) moth.y -= moth.speed;

  moth.x = constrain(moth.x, 0, width - moth.w);
  moth.y = constrain(moth.y, 0, height - moth.h);
}

function spawnWall() {
  let index = floor(random(wallImgs.length));
  let img = wallImgs[index];
  let widths = [100, 150, 200, 250];
  let x = random(0, width - widths[index]);

  for (let i = 0; i < walls.length; i++) {
    if (abs(walls[i].x - x) < widths[index] && abs(walls[i].y - height) < 30) {
      return;
    }
  }

  walls.push({ img: img, x: x, y: height, w: widths[index], h: 30 });
}

function spawnGlitch() {
  let x = random(0, width - 26);
  for (let i = 0; i < walls.length; i++) {
    if (abs(walls[i].x - x) < 26 && abs(walls[i].y - height) < 30) {
      return;
    }
  }
  glitches.push({ x: x, y: height, w: 26, h: 18 });
}

function spawnScore() {
  let isOne = random() < 0.35;
  let img = isOne ? score1Img : score0Img;
  let value = isOne ? 5 : 3;
  let w = isOne ? 6.75 : 13.5;
  let x = random(0, width - w);
  for (let i = 0; i < walls.length; i++) {
    if (abs(walls[i].x - x) < w && abs(walls[i].y - height) < 30) {
      return;
    }
  }
  for (let i = 0; i < scores.length; i++) {
    if (abs(scores[i].x - x) < w && abs(scores[i].y - height) < 30) {
      return;
    }
  }
  scores.push({ img: img, x: x, y: height, w: w, h: 18, value: value });
}

function checkCollision(a, b) {
  return !(a.x + a.w < b.x || a.x > b.x + b.w || a.y + a.h < b.y || a.y > b.y + b.h);
}

function drawScore() {
  fill(255);
  textFont(chicagoFont);
  textSize(35);
  textAlign(LEFT, TOP);
  noStroke();
  text("Score: " + score, 40, 40);
}

function drawLives() {
  textFont(chicagoFont);
  textSize(35);
  fill(255);
  textAlign(RIGHT, TOP);
  noStroke();
  text("Lives:", width - 110, 40);
  for (let i = 0; i < lives; i++) {
    image(livesImg, width - 100 + i * 20, 48, 15.75, 20.25);
  }
}

