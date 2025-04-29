// Full merged code with fixes: Rectangles removed, text rendering adjusted to regular style

let img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12, img13, img14, img15, img16, img17, img18, img19, img20, img21, img22;
let errorSound, clickSound, restartSound;
let currentPage = 1;
let customCursor;
let popups = [];
let popupInterval = 2000;
let animationStarted = false;
let lastPopupTime = 0;
let firstPopupTime = 0;
let firstPopupShown = false;
let popupDelay = 1000;
let clickTime = 0;
let volumeLevel = 0.2;
let maxVolume = 1.0;
let blackScreenStart = 0;
let sadMacStart = 0;
let debug1Start = 0;
let debug2Start = 0;
let debug2SoundPlayed = false;
let showDebug3 = false;
let showDebug4 = false;
let chicagoFont;
let finalTextEndTime = 0;
let lastTypeTime = 0;
let typeSpeed = 800;

function preload() {
  img1 = loadImage('homestart.png');
  img2 = loadImage('blackscreen.png');
  img3 = loadImage('bugpopup.png');
  img4 = loadImage('sadmac.png');
  img5 = loadImage('debug1.png');
  img6 = loadImage('debug2.png');
  img7 = loadImage('debug3.png');
  img8 = loadImage('debug4.png');
  img9 = loadImage('blackbg.png');
  img10 = loadImage('bg1.png');
  img11 = loadImage('bg2.png');
  img12 = loadImage('bg3.png');
  img13 = loadImage('bg4.png');
  img14 = loadImage('continue.png');
  img15 = loadImage('home.png');
  img16 = loadImage('home1.png');
  img17 = loadImage('home2.png');
  img18 = loadImage('home3.png');
  img19 = loadImage('home4.png');
  img20 = loadImage('home5.png');
  img21 = loadImage('home6.png');
  img22 = loadImage('cursor.png');

  customCursor = loadImage('cursor.png');
  errorSound = loadSound('error.mp3');
  clickSound = loadSound('click.mp3');
  restartSound = loadSound('restart.mp3');
  chicagoFont = loadFont('ChicagoKare-Regular.otf');
}

function setup() {
  createCanvas(1024, 684);
  textFont(chicagoFont);
  textStyle(NORMAL);
  imageMode(CENTER);
  noCursor();
}

function draw() {
  background(0);

  if (currentPage >= 7 && currentPage <= 10) {
    drawTypingPages();
  } else if (currentPage === 11) {
    if (finalTextEndTime === 0) {
      finalTextEndTime = millis();
      if (restartSound.isLoaded()) restartSound.play();
    }
    image(img9, width / 2, height / 2, 1024, 684);
    if (millis() - finalTextEndTime > 1000) {
      currentPage = 12;
    }
  } else if (currentPage === 12) {
    image(img15, width / 2, height / 2, 1024, 684);
    showHomeHoverImages();
  } else {
    drawIntroPages();
  }

  image(customCursor, mouseX + 10, mouseY + 10, 22.5, 36);
}

function drawIntroPages() {
  switch (currentPage) {
    case 1:
      image(img1, width / 2, height / 2, 1024, 684);
      break;
    case 2:
      image(img1, width / 2, height / 2, 1024, 684);
      if (!firstPopupShown && millis() - clickTime > popupDelay) {
        addPopup();
        firstPopupTime = millis();
        firstPopupShown = true;
        lastPopupTime = millis();
      }
      let timeSinceFirstPopup = millis() - firstPopupTime;
      if (firstPopupShown && timeSinceFirstPopup > 8000) {
        if (errorSound.isLoaded()) {
          errorSound.setVolume(1.0);
          errorSound.play();
        }
        currentPage = 3;
        blackScreenStart = millis();
      }
      for (let popup of popups) {
        image(img3, popup.x, popup.y, 270, 214);
      }
      if (firstPopupShown && timeSinceFirstPopup <= 8000 && millis() - lastPopupTime > popupInterval) {
        addPopup();
        lastPopupTime = millis();
        popupInterval *= 0.6;
        popupInterval = max(popupInterval, 100);
        volumeLevel = min(volumeLevel + 0.05, maxVolume);
      }
      break;
    case 3:
      image(img2, width / 2, height / 2, 1024, 684);
      if (millis() - blackScreenStart > 2000) {
        currentPage = 4;
        sadMacStart = millis();
        if (restartSound.isLoaded()) restartSound.play();
      }
      break;
    case 4:
      image(img4, width / 2, height / 2, 1024, 684);
      if (millis() - sadMacStart > 2000) {
        currentPage = 5;
        debug1Start = millis();
      }
      break;
    case 5:
      image(img5, width / 2, height / 2, 1024, 684);
      if (millis() - debug1Start > 1000) {
        currentPage = 6;
        debug2Start = millis();
      }
      break;
    case 6:
      image(img5, width / 2, height / 2, 1024, 684);
      if (millis() - debug2Start > 0) {
        image(img6, width / 2, height / 2, 1024, 684);
        if (!debug2SoundPlayed && errorSound.isLoaded()) {
          errorSound.play();
          debug2SoundPlayed = true;
        }
      }
      if (showDebug3) image(img7, width / 2, height / 2, 1024, 684);
      if (showDebug4) image(img8, width / 2, height / 2, 1024, 684);
      break;
  }
}

function drawTypingPages() {
  let bgImages = [img10, img11, img12, img13];
  let currentBg = bgImages[currentPage - 7];
  image(img9, width / 2, height / 2, 1024, 684);
  image(currentBg, width / 2, height / 2, 1024, 684);

  textFont(chicagoFont);
  textStyle(NORMAL);
  textSize(28);
  textAlign(LEFT);
  fill(255);

  let x = 88.9688;
  let y = 297;
  let lines = typingTexts[currentPage - 7].split("\n");
  let elapsed = millis() - lastTypeTime;
  let linesToShow = floor(elapsed / 1000);

  for (let i = 0; i < min(linesToShow, lines.length); i++) {
    text(lines[i], x, y + i * 40);
  }
}

function mousePressed() {
  if (clickSound.isLoaded()) clickSound.play();

  if (currentPage === 1 && mouseX > 464.75 && mouseX < 559.25 && mouseY > 421.1309 && mouseY < 460.436) {
    currentPage = 2;
    animationStarted = true;
    clickTime = millis();
    firstPopupShown = false;
    popupInterval = 2000;
    popups = [];
    volumeLevel = 0.2;
    debug2SoundPlayed = false;
  }

  if (currentPage === 6 && mouseX > 442.067 && mouseX < 496.067 && mouseY > 384.7246 && mouseY < 415.0446) {
    showDebug3 = true;
    if (errorSound.isLoaded()) errorSound.play();
  }

  if (currentPage === 6 && mouseX > 529.817 && mouseX < 583.817 && mouseY > 384.7246 && mouseY < 415.0446) {
    currentPage = 7;
    lastTypeTime = millis();
  }

  if (currentPage >= 7 && currentPage <= 10) {
    if (mouseX > 45.25 && mouseX < 74.5 && mouseY > 614.25 && mouseY < 643.5) {
      if (currentPage > 7) {
        currentPage--;
        lastTypeTime = millis();
      }
    }
    if (mouseX > 947.5 && mouseX < 976.75 && mouseY > 614.25 && mouseY < 643.5) {
      if (currentPage < 10) {
        currentPage++;
        lastTypeTime = millis();
      } else if (currentPage === 10) {
        currentPage = 11;
        lastTypeTime = millis();
      }
    }
  }
}

function addPopup() {
  if (errorSound.isLoaded()) {
    errorSound.setVolume(volumeLevel);
    errorSound.play();
  }
  let popup = {
    x: firstPopupShown ? random(135, width - 135) : width / 2,
    y: firstPopupShown ? random(107, height - 107) : height / 2
  };
  popups.push(popup);
}

function showHomeHoverImages() {
  let files = [
    { x: 241.875, y: 286.875, img: img16 },
    { x: 511.875, y: 286.875, img: img17 },
    { x: 781.875, y: 286.875, img: img18 },
    { x: 241.875, y: 481.8953, img: img19 },
    { x: 511.875, y: 481.8953, img: img20 },
    { x: 781.875, y: 481.8953, img: img21 }
  ];

  for (let file of files) {
    if (mouseX > file.x - 75.375 && mouseX < file.x + 75.375 && mouseY > file.y - 55.125 && mouseY < file.y + 55.125) {
      image(file.img, width / 2, height / 2, 1024, 684);
    }
  }

}

let typingTexts = [
  `Computer programming is the process of writing instructions that \na computer can follow to perform tasks, from solving equations \nto generating graphics. Today, we often associate coding with \ninnovation and power. But its origins tell a different story.`,
  `In the early days of computing, programming was considered tedious, \nclerical work, an extension of secretarial labor. As a result, women were \noften the ones doing it. They were essential to the development of \nmodern computing, programming early machines like the ENIAC and \nlaying the foundations for the software that drives our world today.`,
  `But as the field gained prestige and profitability, women were \nsystematically pushed out. Their labor was often made invisible, \ntheir names erased from the narrative.`,
  `This website explores the forgotten and underrecognized women \nof early computing. It invites you to navigate their histories \nthrough the familiar interface of a 1980s Macintosh.`
];