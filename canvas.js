
// ******************* Script Begin *******************

// Initialize canvas
const canvas = document.getElementById('powder_canvas');
const ctx = canvas.getContext('2d');
const dimension = 300;
canvas.width = dimension;
canvas.height = dimension;

// Global Variables
const palett = {
  white: [255, 255, 255, 255, 1],
  black: [0, 0, 0, 255, 0]
}
const mouse = {
    x: undefined,
    y: undefined,
    size: 5,
    color: palett.white
}
const imageData = ctx.createImageData(dimension, dimension);
const colorGrid = new ColorGrid(dimension, dimension);

paintCanvas(canvas);
canvas.addEventListener('mousedown', drawSquare)
canvas.addEventListener('mousemove', drawSquare);

// begin animation
animate();

// ******************* Animation *******************
function animate() {
  requestAnimationFrame(animate);
  updateGrid();
  paintCanvas();
}

// ******************* Helper Functions *******************
// Update the grid to the next frame
function updateGrid() {
  var dir = Math.random() < 0.5 ? -1 : 1;
  for (let y = dimension - 2; y >= 0; y--) {
    for (let x = 0; x < dimension; x++) {
      if (colorGrid.getPixel(x, y)[4] == palett.white[4]) {
        if (colorGrid.getPixel(x, y + 1)[4] == palett.black[4]) {
          colorGrid.setPixel(x, y, palett.black);
          colorGrid.setPixel(x, y + 1, palett.white);
        } else {
          if (colorGrid.getPixel(x + dir, y + 1)[4] == palett.black[4]) {
            colorGrid.setPixel(x, y, palett.black);
            colorGrid.setPixel(x + dir, y + 1, palett.white);
          } else if (colorGrid.getPixel(x - dir, y + 1)[4] == palett.black[4]) {
            colorGrid.setPixel(x, y, palett.black);
            colorGrid.setPixel(x - dir, y + 1, palett.white);
          }
        }
      }
    }
  }
}

// Draw line based on mouse position
function drawSquare(e) {
    
    setMouse(e);

    if (e.buttons == 1) {
      const penOffset = Math.floor(mouse.size / 2);
      colorGrid.setSquare(e.offsetX - penOffset, e.offsetY - penOffset, mouse.size, mouse.color);
    }
}

// Set mouse position on global variable
function setMouse(e) {
    mouse.x = e.offsetX;
    mouse.y = e.offsetY;
}

function paintCanvas() {
  imageData.data.set(colorGrid.getColorArray());
  ctx.putImageData(imageData, 0, 0);
}

// Reset the mouse to default
function noMouse() {
    mouse.x = undefined,
    mouse.y = undefined
}
