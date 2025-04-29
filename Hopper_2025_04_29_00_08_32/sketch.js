let img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12, img13, img14, img15, img16, img17, img18, img19;

let errorSound, clickSound, restartSound;
let currentPage = 1;
let customCursor;
let matrixFont;
let chicagoFont;
let overlayY = -684;
let overlayActive = false;
let triggerOverlay = false;
let popupTimer = 0;
let showPopup = false;
let canAdvanceFromPage2 = false;
let canAdvanceFromPage3 = false;
let canAdvanceFromPage4 = false;
let hasAdvancedToPage4 = false;
let typewriterIndex = 0;
let typewriterText = `> SYSTEM ERROR DETECTED
> INITIATING TRACE...

ERROR: Unknown binary entity detected

> LOGGING STACK TRACE...
Function: decodeSignal()
    Line 42: unexpected input: 'flutter'
    Line 113: anomaly flagged in relay node

WARNING: unauthorized program attempting
to execute...

> RUNNING bug.exe...`;

let instructionsText = `> RUNNING bug.exe...
> LOADING INSTRUCTIONS...

LEFT_ARROW - move left  
RIGHT_ARROW - move right
DOWN_ARROW - move down
UP_ARROW - move up

EAT(0, 1) - gain (3, 5) points
TOUCH(GLITCH) - lose 15 points 
TOUCH(WALL) - lose life  

> PRESS ANY KEY TO START...`;
let typewriterStartTime = 0;

function preload() {
  img1 = loadImage('one.png');
  img2 = loadImage('onepop.png');
  img3 = loadImage('two.png');
  img4 = loadImage('twopop.png');
  img5 = loadImage('three.png');
  img6 = loadImage('threepop1.png');
  img7 = loadImage('threepop2.png');
  img8 = loadImage('four.png');
  img9 = loadImage('fourpop1.png');
  img10 = loadImage('fourpop2.png');
  img11 = loadImage('game1.png');
  img12 = loadImage('game2.png');
  img13 = loadImage('game3.png');
  img14 = loadImage('five.png');
  img15 = loadImage('fivepop.png');
  img16 = loadImage('six.png');
  img17 = loadImage('sixpop.png');
  img18 = loadImage('seven.png');
  img19 = loadImage('sevenpop.png');

  customCursor = loadImage('cursor.png');

  errorSound = loadSound('error.mp3');
  clickSound = loadSound('click.mp3');
  restartSound = loadSound('restart.mp3');

  matrixFont = loadFont('DOTMATRI.TTF');
  chicagoFont = loadFont('ChicagoKare-Regular.otf');
}

function setup() {
  textFont(matrixFont);
  createCanvas(1024, 684);
  imageMode(CENTER);
  noCursor();
  popupTimer = millis();
}

function draw() {
  let timeSinceStart = millis() - popupTimer;

  if (hasAdvancedToPage4 && currentPage === 4 && canAdvanceFromPage4) {
    let charsToShow = floor((millis() - typewriterStartTime) / 20);
    if (charsToShow >= typewriterText.length && millis() - typewriterStartTime > typewriterText.length * 20 + 1000) {
      currentPage = 5;
      popupTimer = millis();
    }
  }
  background(0);

  if (currentPage === 1) {
    image(img1, width / 2, height / 2, width, height);
    if (millis() - popupTimer > 1000) {
      showPopup = true;
    }
    if (showPopup) {
      image(img2, width / 2, height / 2, width, height);
    }
  }

  if (currentPage === 2) {
    image(img3, width / 2, height / 2, width, height);
    if (millis() - popupTimer > 3000) {
      let flash = frameCount % 120 < 60;
      canAdvanceFromPage2 = true;
      if (flash) {
        image(img4, width / 2, height / 2, width, height);
      }
    }
  }

  if (currentPage === 3) {
    image(img5, width / 2, height / 2, width, height);
    if (millis() - popupTimer > 3000) {
      let flash = frameCount % 120 < 60;
      canAdvanceFromPage3 = true;
      if (flash) {
        image(img6, width / 2, height / 2, width, height);
      }
    }
    if (
      mouseX >= 572.6937 && mouseX <= 572.6937 + 368.9776 &&
      mouseY >= 91.0969 && mouseY <= 91.0969 + 369.3129
    ) {
      image(img7, width / 2, height / 2, width, height);
    }
  }

  if (currentPage === 4) {
    image(img8, width / 2, height / 2, width, height);
    if (!hasAdvancedToPage4 && millis() - popupTimer > 3000) {
      let flash = frameCount % 120 < 60;
      canAdvanceFromPage4 = true;
      if (flash) {
        image(img9, width / 2, height / 2 + 20, width, height);
      }
    }
    if (hasAdvancedToPage4) {
      let flash = frameCount % 120 < 60;
      if (flash) {
        image(img9, width / 2, height / 2 + 20, width, height);
      }
      image(img10, width / 2, height / 2, width, height);

      textFont(chicagoFont);
      textSize(20);
      fill(255);
      textAlign(LEFT, TOP);
      let charsToShow = floor((millis() - typewriterStartTime) / 20);
      let displayText = typewriterText.substring(0, charsToShow);
      textLeading(18);
      text(displayText, 296.1553, 230.5736);
    }
  }

  if (currentPage === 5) {
    if (triggerOverlay && !overlayActive) {
      overlayActive = true;
      overlayY = -65.25;
    }

    if (overlayActive && overlayY < height + 100) {
      overlayY += 10.25;
    }

    textFont(chicagoFont);
    textSize(20);
    fill(255);
    textAlign(LEFT, TOP);
    textLeading(18);

    if (timeSinceStart <= 2000) {
      text(typewriterText, 296.1553, 230.5736);
    }

    if (timeSinceStart > 2000 && timeSinceStart < 2100 && restartSound.isLoaded()) {
      restartSound.play();
    }

    if (timeSinceStart > 3000) {
      let lineHeight = 18;
      let lines = instructionsText.split('\n');
      let typedText = instructionsText.substring(0, floor((timeSinceStart - 3000) / 20));
      let typedLines = typedText.split('\n');
      for (let i = 0; i < typedLines.length; i++) {
        let yLine = 230.5736 + i * lineHeight;
        if (!overlayActive || overlayY < yLine) {
          text(typedLines[i], 390.8235, yLine);
        }
      }
    }

    if (overlayActive) {
      image(img13, width / 2, overlayY, 67.5, 65.25);
    }
  }

  image(customCursor, mouseX + 10, mouseY + 10, 22.5, 36);
}

function mousePressed() {
  if (clickSound.isLoaded()) clickSound.play();

  if (currentPage === 1 && showPopup) {
    if (
      mouseX >= 512.3932 && mouseX <= 512.3932 + 115 &&
      mouseY >= 577.2302 && mouseY <= 577.2302 + 31
    ) {
      currentPage = 2;
      popupTimer = millis();
      showPopup = false;
    }
  }
}

function keyPressed() {
  if (currentPage === 5) {
    triggerOverlay = true;
  }
  if (currentPage === 2 && canAdvanceFromPage2) {
    currentPage = 3;
    popupTimer = millis();
  } else if (currentPage === 3 && canAdvanceFromPage3) {
    currentPage = 4;
    popupTimer = millis();
  } else if (currentPage === 4 && canAdvanceFromPage4) {
    hasAdvancedToPage4 = true;
    popupTimer = millis();
    typewriterStartTime = millis();
    typewriterIndex = 0;
    if (errorSound.isLoaded()) errorSound.play();
  }
}

