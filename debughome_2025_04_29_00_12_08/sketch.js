let img15, img16, img17, img18, img19, img20, img21, customCursor;
let chicagoFont;

function preload() {
  img15 = loadImage('home.png');
  img16 = loadImage('home1.png');
  img17 = loadImage('home2.png');
  img18 = loadImage('home3.png');
  img19 = loadImage('home4.png');
  img20 = loadImage('home5.png');
  img21 = loadImage('home6.png');
  customCursor = loadImage('cursor.png');
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
  image(img15, width / 2, height / 2, 1024, 684);
  showHomeHoverImages();
  image(customCursor, mouseX + 10, mouseY + 10, 22.5, 36);
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