
// ******************* Script Begin *******************

// Initialize canvas
const canvas = document.getElementById('powder_canvas');
const ctx = canvas.getContext('2d');
const dimension = 300;
canvas.width = dimension;
canvas.height = dimension;

// Global Variables
const palett = {
  white: [255, 255, 255, 255]
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
canvas.addEventListener('mousedown', drawline)
canvas.addEventListener('mousemove', drawline);

// ******************* Script End *******************

// ******************* Helper Functions *******************
// Draw line based on mouse position
function drawline(e) {
    
    setMouse(e);

    if (e.buttons == 1) {
      const penOffset = Math.floor(mouse.size / 2);
      colorGrid.setSquare(e.offsetX - penOffset, e.offsetY - penOffset, mouse.size, mouse.color);
      paintCanvas();
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

// ******************* End Helper Functions *******************