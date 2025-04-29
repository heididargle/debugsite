let newImg1, newImg12, newImg2, newImg22, newImg23, newImg4;
let newImg3, newImg32, newImg33, newImg34;
let newImg4Main, newImg42, newImg43, newImg44;
let newImg5, newImg52, newImg53, newImg54;
let newImg6, newImg62, newImg63, newImg64;
let newImg7, newImg72, newImg73, newImg74;
let clickSound;
let currentPage = 1;
let customCursor;
let popupTimer = 0;
let fadeStartTime = 0;
let fadeStage = 0;
let fadeProgress = 0;

function preload() {
  newImg1 = loadImage('1.png');
  newImg12 = loadImage('12.png');
  newImg2 = loadImage('2.png');
  newImg22 = loadImage('22.png');
  newImg23 = loadImage('23.png');
  newImg4 = loadImage('24.png');
  newImg3 = loadImage('3.png');
  newImg32 = loadImage('32.png');
  newImg33 = loadImage('33.png');
  newImg34 = loadImage('34.png');
  newImg4Main = loadImage('4.png');
  newImg42 = loadImage('42.png');
  newImg43 = loadImage('43.png');
  newImg44 = loadImage('44.png');
  newImg5 = loadImage('5.png');
  newImg52 = loadImage('52.png');
  newImg53 = loadImage('53.png');
  newImg54 = loadImage('54.png');
  newImg6 = loadImage('6.png');
  newImg62 = loadImage('62.png');
  newImg63 = loadImage('63.png');
  newImg64 = loadImage('64.png');
  newImg7 = loadImage('7.png');
  newImg72 = loadImage('72.png');
  newImg73 = loadImage('73.png');
  newImg74 = loadImage('74.png');

  customCursor = loadImage('cursor.png');
  clickSound = loadSound('click.mp3');
}

function setup() {
  createCanvas(1024, 684);
  imageMode(CENTER);
  noCursor();
  popupTimer = millis();
}

function draw() {
  background(0);
  let elapsed = millis() - popupTimer;

  if (currentPage === 1) {
    image(newImg1, width / 2, height / 2, width, height);
    if (elapsed > 3000) {
      image(newImg12, width / 2, height / 2, width, height);
    }
  }

  handleFadePages();

  image(customCursor, mouseX + 10, mouseY + 10, 22.5, 36);
}

function handleFadePages() {
  let elapsed = millis() - popupTimer;
  let fadeImgs;
  if (currentPage === 2) fadeImgs = [newImg2, newImg22, newImg23, newImg4, 3000];
  if (currentPage === 3) fadeImgs = [newImg3, newImg32, newImg33, newImg34, 3000];
  if (currentPage === 4) fadeImgs = [newImg4Main, newImg42, newImg43, newImg44, 3000];
  if (currentPage === 5) fadeImgs = [newImg5, newImg52, newImg53, newImg54, 3000];
  if (currentPage === 6) fadeImgs = [newImg6, newImg62, newImg63, newImg64, 3000];
  if (currentPage === 7) fadeImgs = [newImg7, newImg72, newImg73, newImg74, 5000];

  if (!fadeImgs) return;

  if (fadeStage === 0) {
    image(fadeImgs[0], width / 2, height / 2, width, height);
    if (elapsed > 1000) {
      fadeStage = 1;
      fadeStartTime = millis();
    }
  } else if (fadeStage === 1) {
    let fadeElapsed = millis() - fadeStartTime;
    fadeProgress = constrain(fadeElapsed / 1000, 0, 1);
    image(fadeImgs[0], width / 2, height / 2, width, height);
    tint(255, fadeProgress * 255);
    image(fadeImgs[1], width / 2, height / 2, width, height);
    noTint();
    if (fadeProgress >= 1) {
      fadeStage = 2;
      fadeStartTime = millis();
    }
  } else if (fadeStage === 2) {
    let fadeElapsed = millis() - fadeStartTime;
    fadeProgress = constrain(fadeElapsed / 1000, 0, 1);
    image(fadeImgs[1], width / 2, height / 2, width, height);
    tint(255, fadeProgress * 255);
    image(fadeImgs[2], width / 2, height / 2, width, height);
    noTint();
    if (fadeProgress >= 1 && fadeElapsed > fadeImgs[4]) {
      fadeStage = 3;
    }
  } else if (fadeStage === 3) {
    image(fadeImgs[2], width / 2, height / 2, width, height);
    image(fadeImgs[3], width / 2, height / 2, width, height);
  }
}

function mousePressed() {
  if (clickSound.isLoaded()) clickSound.play();

  if (currentPage === 1 && millis() - popupTimer > 3000) {
    if (mouseX >= 512.3932 && mouseX <= 512.3932 + 115 && mouseY >= 553.6045 && mouseY <= 553.6045 + 30.3241) {
      currentPage = 2;
      popupTimer = millis();
      fadeStage = 0;
    }
  } else if (currentPage === 2 && fadeStage === 3) {
    if (mouseX >= 67.5 && mouseX <= 67.5 + 228 && mouseY >= 581.8 && mouseY <= 581.8 + 40.2) {
      currentPage = 3;
      popupTimer = millis();
      fadeStage = 0;
    }
  } else if (currentPage === 3 && fadeStage === 3) {
    if (mouseX >= 654.4371 && mouseX <= 654.4371 + 228 && mouseY >= 572.769 && mouseY <= 572.769 + 40.2) {
      currentPage = 4;
      popupTimer = millis();
      fadeStage = 0;
    }
  } else if (currentPage === 4 && fadeStage === 3) {
    if (mouseX >= 729.4761 && mouseX <= 729.4761 + 228 && mouseY >= 548.0777 && mouseY <= 548.0777 + 40.2) {
      currentPage = 5;
      popupTimer = millis();
      fadeStage = 0;
    }
  } else if (currentPage === 5 && fadeStage === 3) {
    if (mouseX >= 731.2965 && mouseX <= 731.2965 + 228 && mouseY >= 498.3841 && mouseY <= 498.3841 + 40.2) {
      currentPage = 6;
      popupTimer = millis();
      fadeStage = 0;
    }
  } else if (currentPage === 6 && fadeStage === 3) {
    if (mouseX >= 67.8647 && mouseX <= 67.8647 + 228 && mouseY >= 582.3928 && mouseY <= 582.3928 + 40.2) {
      currentPage = 7;
      popupTimer = millis();
      fadeStage = 0;
    }
  }
}
