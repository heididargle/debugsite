let img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12, img13;
let customCursor;
let errorSound, clickSound;
let pixelFont;
let ada13;
let currentPage = 1;
let showImg2 = false;
let startTime;
let videoStartTime;
let showImg12 = false;
let quote = "The science of operations,\nas derived from mathematics\nmore especially, is a science\nof itself, and has its own\nabstract truth and value.";
let charIndex = 0;
let lastCharTime = 0;

function preload() {
  img1 = loadImage('ada1.png');
  img2 = loadImage('ada2.png');
  img3 = loadImage('ada3.png');
  img4 = loadImage('ada4.png');
  img5 = loadImage('ada5.png');
  img6 = loadImage('ada6.png');
  img7 = loadImage('ada7.png');
  img8 = loadImage('ada8.png');
  img9 = loadImage('ada9.png');
  img10 = loadImage('ada10.png');
  img11 = loadImage('ada11.png');
  img12 = loadImage('ada12.png');
  img13 = loadImage('cursor.png');
  
   customCursor = loadImage('cursor.png');

  errorSound = loadSound('error.mp3');
  clickSound = loadSound('click.mp3');
  pixelFont = loadFont('PF Pixelscript Regular.ttf');
  ada13 = createVideo('ada13.mp4');
  ada13.volume(0);
  ada13.hide();
}

function setup() {
  createCanvas(1024, 684);
  imageMode(CENTER);
  textFont(pixelFont);
  textSize(60);
  textAlign(CENTER, TOP);
  fill(255);
  startTime = millis();
  noCursor();
}

function draw() {
  background(220);

  if (currentPage === 1) {
    image(img1, width / 2, height / 2, width, height);
    if (millis() - startTime > 2000) {
      showImg2 = true;
    }
    if (showImg2) {
      image(img2, width / 2, height / 2, width, height);
    }
  } else if (currentPage === 2) {
    image(img3, width / 2, height / 2, width, height);
  } else if (currentPage === 3) {
    image(img4, width / 2, height / 2, width, height);
  } else if (currentPage === 4) {
    image(img5, width / 2, height / 2, width, height);
    let hoverX = 512;
    let hoverY = 259.875;
    let hoverW = 430.78;
    let hoverH = 290.25;
    if (
      mouseX > hoverX - hoverW / 2 &&
      mouseX < hoverX + hoverW / 2 &&
      mouseY > hoverY - hoverH / 2 &&
      mouseY < hoverY + hoverH / 2
    ) {
      image(img6, width / 2, height / 2, width, height);
    }
  } else if (currentPage === 5) {
    image(img7, width / 2, height / 2, width, height);
    if (millis() - lastCharTime > 60 && charIndex < quote.length) {
      charIndex++;
      lastCharTime = millis();
    }
    let displayedText = quote.substring(0, charIndex);
    text(displayedText, width / 2, 140);
  } else if (currentPage === 6) {
    image(img8, width / 2, height / 2, width, height);
  } else if (currentPage === 7) {
    image(img9, width / 2, height / 2, width, height);
  } else if (currentPage === 8) {
    image(img10, width / 2, height / 2, width, height);
  } else if (currentPage === 9) {
    if (!videoStartTime) {
      videoStartTime = millis();
    }
    image(ada13, width / 2, height / 2, width, height);
    image(img11, width / 2, height / 2, width, height);
    if (ada13.elt.readyState >= 2 && ada13.elt.paused) {
      ada13.play();
    }
    if (millis() - videoStartTime > 4000) {
      showImg12 = true;
    }
    if (showImg12) {
      image(img12, width / 2, height / 2, width, height);
    }
  }
  
image(customCursor, mouseX + 10, mouseY + 10, 22.5, 36);
  
}

function mousePressed() {
  if (clickSound && clickSound.isLoaded()) {
    if (clickSound.isPlaying()) {
      clickSound.stop();
    }
    clickSound.play();
  }

  if (currentPage === 1 && showImg2) {
    let buttonX = 563.6079;
    let buttonY = 585.643;
    let buttonW = 114.7841;
    let buttonH = 30.3211;
    if (
      mouseX > buttonX - buttonW / 2 &&
      mouseX < buttonX + buttonW / 2 &&
      mouseY > buttonY - buttonH / 2 &&
      mouseY < buttonY + buttonH / 2
    ) {
      currentPage = 2;
    }
  }

  if (
    mouseX > 54.125 - 29.25 / 2 &&
    mouseX < 54.125 + 29.25 / 2 &&
    mouseY > 628.875 - 29.25 / 2 &&
    mouseY < 628.875 + 29.25 / 2
  ) {
    if (currentPage > 1) {
      currentPage--;
    }
  }

  if (
    mouseX > 969.875 - 29.25 / 2 &&
    mouseX < 969.875 + 29.25 / 2 &&
    mouseY > 628.875 - 29.25 / 2 &&
    mouseY < 628.875 + 29.25 / 2
  ) {
    if (currentPage < 12) {
      currentPage++;
    }
  }
}

