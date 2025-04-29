let customCursor, clickSound;
let popupTimer = 0;
let showPopup = false;
let currentPage = 1;
let sounds = {};
let p10VideoStarted = false;
let p10VideoEnded = false;
let p10PopupTimer = 0;

let images = {};
let videos = {};

function preload() {

  images.p1 = loadImage('p1.png');
  images.p1_3 = loadImage('p1.3.png');
  videos.p1_2 = createVideo(['p1.2.mp4']);
  videos.p1_2.hide();

  images.p2 = loadImage('p2.png');
  images.p2_2 = loadImage('p2.2.png');

  images.p3 = loadImage('p3.png');
  images.p3_2 = loadImage('p3.2.png');

  images.p4 = loadImage('p4.png');
  images.p4_2 = loadImage('p4.2.png');

  images.p5 = loadImage('p5.png');
  images.p5_2 = loadImage('p5.2.png');

  images.p6 = loadImage('p6.png');
  images.p6_2 = loadImage('p6.2.png');

  images.p7 = loadImage('p7.png');
  images.p7_2 = loadImage('p7.2.png');

  images.p8 = loadImage('p8.png');
  images.p8_2 = loadImage('p8.2.png');

  images.p9 = loadImage('p9.png');

  images.p10 = loadImage('p10.png');
  videos.p10_1 = createVideo(['p10.1.mp4']);
  videos.p10_1.hide();
  sounds.liftoff = loadSound('liftoff.mp3');

  images.p10_4 = loadImage('p10.4.png');
  images.p10_5 = loadImage('p10.5.png');

  customCursor = loadImage('cursor.png');
  clickSound = loadSound('click.mp3');
}

function setup() {
  createCanvas(1024, 684);
  imageMode(CENTER);
  noCursor();
  popupTimer = millis();
  videos.p1_2.loop();
  videos.p1_2.volume(0);
  videos.p10_1.volume(0);
}

function draw() {
  background(0);

  if (currentPage === 1) {
    drawVideoTopAligned(videos.p1_2);
    image(images.p1, width / 2, height / 2, width, height);
    if (millis() - popupTimer > 5000) {
      image(images.p1_3, width / 2, height / 2, width, height);
      showPopup = true;
    }
  } else if (currentPage >= 2 && currentPage <= 8) {
    image(images[`p${currentPage}`], width / 2, height / 2, width, height);
    if (millis() - popupTimer > 3000) {
      if (frameCount % 80 < 40) {
        image(images[`p${currentPage}_2`], width / 2, height / 2, width, height);
      }
    }
  } else if (currentPage === 9) {
    image(images.p9, width / 2, height / 2, width, height);
    if (millis() - popupTimer > 5000) {
      currentPage = 10;
      popupTimer = millis();
      p10VideoStarted = false;
      p10VideoEnded = false;
    }
  } else if (currentPage === 10) {
    if (!p10VideoStarted) {
      videos.p10_1.play();
      if (sounds.liftoff.isLoaded()) {
        sounds.liftoff.play();
      }
      p10VideoStarted = true;
    }

    if (!videos.p10_1.elt.ended) {
      drawVideoTopAligned(videos.p10_1);
      image(images.p10, width / 2, height / 2, width, height);
    } else {
      if (!p10VideoEnded) {
        p10PopupTimer = millis();
        p10VideoEnded = true;
      }
      image(images.p10_4, width / 2, height / 2, width, height);
      if (millis() - p10PopupTimer > 3000) {
        image(images.p10_5, width / 2, height / 2, width, height);
      }
    }
  }

  image(customCursor, mouseX + 10, mouseY + 10, 22, 36);
}

function drawVideoTopAligned(vid) {
  let vidAspect = vid.width / vid.height;
  let canvasAspect = width / height;
  let newWidth, newHeight;

  if (vidAspect > canvasAspect) {
    newHeight = height;
    newWidth = vidAspect * newHeight;
  } else {
    newWidth = width;
    newHeight = newWidth / vidAspect;
  }

  image(vid, width / 2, newHeight / 2, newWidth, newHeight);
}

function mousePressed() {
  if (clickSound.isLoaded()) {
    clickSound.play();
  }

  if (currentPage === 1 && showPopup) {
    if (
      mouseX >= 512.3932 && mouseX <= 512.3932 + 115 &&
      mouseY >= 572.676 && mouseY <= 572.676 + 30.324
    ) {
      currentPage = 2;
      popupTimer = millis();
    }
  }
}

function keyPressed() {
  if (currentPage >= 2 && currentPage <= 7) {
    currentPage++;
    popupTimer = millis();
  } else if (currentPage === 8) {
    currentPage = 9;
    popupTimer = millis();
  }
}

