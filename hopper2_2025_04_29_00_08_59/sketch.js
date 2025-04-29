let img14, img15, img16, img17, img18, img19;
let clickSound;
let customCursor;
let matrixFont;
let currentPage = 1;
let popupTimer = 0;
let showPopup = false;

function preload() {
  img14 = loadImage('five.png');
  img15 = loadImage('fivepop.png');
  img16 = loadImage('six.png');
  img17 = loadImage('sixpop.png');
  img18 = loadImage('seven.png');
  img19 = loadImage('sevenpop.png');

  customCursor = loadImage('cursor.png');
  clickSound = loadSound('click.mp3');

  matrixFont = loadFont('DOTMATRI.TTF');
}

function setup() {
  createCanvas(1024, 684);
  imageMode(CENTER);
  noCursor();
  popupTimer = millis();
  typeStart = millis();
}

let typeText = `From then on,
when anything
went wrong with
a computer, we
said it had
bugs in it.`;
let typedIndex = 0;
let typeStart = 0;

function draw() {
  background(0);

  if (currentPage === 1) {
    image(img14, width / 2, height / 2, width, height);
    if (millis() - popupTimer > 3000) {
      showPopup = true;
    }
    if (showPopup) {
      let flash = frameCount % 120 < 60;
      if (flash) {
        image(img15, width / 2, height / 2, width, height);
      }
    }
    // typewriter text
    textFont(matrixFont);
    textSize(72);
    fill('#393839');
    textAlign(LEFT, TOP);
    textLeading(70);
    let charsToShow = floor((millis() - typeStart - 1000) / 30);
    text(typeText.substring(0, charsToShow), 133, 101.25);
  }

  if (currentPage === 2) {
    image(img16, width / 2, height / 2, width, height);
    if (millis() - popupTimer > 3000) {
      let flash = frameCount % 120 < 60;
      if (flash) {
        image(img17, width / 2, height / 2, width, height);
      }
    }
  }

  if (currentPage === 3) {
    image(img18, width / 2, height / 2, width, height);
    if (millis() - popupTimer > 3000) {
      image(img19, width / 2, height / 2, width, height);
    }
  }

  image(customCursor, mouseX, mouseY, 22.5, 36);
}

function mousePressed() {
  if (clickSound.isLoaded()) clickSound.play();
}

function keyPressed() {
  if (currentPage === 1 && showPopup) {
    currentPage = 2;
    popupTimer = millis();
    showPopup = false;
  } else if (currentPage === 2) {
    currentPage = 3;
    popupTimer = millis();
  }
}

