
// ******************* Script Begin *******************

// Initialize canvas
const canvas = document.getElementById('powder_canvas');
const ctx = canvas.getContext('2d');
const canvasDimension = 600;
canvas.width = canvasDimension;
canvas.height = canvasDimension;
ctx.imageSmoothingEnabled = false;

// Global Variables
const palett = {
  water: [30, 130, 190, 255, 2],
  sand: [190, 180, 130, 255, 1],
  empty: [0, 0, 0, 255, 0]
}
const mouse = {
    down: false,
    x: undefined,
    y: undefined,
    size: 1,
    color: palett.sand
}
const gridDimension = 10;
const imageData = ctx.createImageData(gridDimension, gridDimension);
const colorGrid = new ColorGrid(gridDimension, gridDimension, palett.empty);

paintCanvas(canvas);
canvas.addEventListener('mousedown', toggleMouseDown);
canvas.addEventListener('mouseup', toggleMouseUp);
canvas.addEventListener('mouseleave', toggleMouseUp);
canvas.addEventListener('mousemove', setMouse);
document.addEventListener('keypress', function(e) {
  switch (e.key) {
    case 's':
      console.log('pressed');
      mouse.color = palett.sand;
      break;
    case 'w':
      mouse.color = palett.water;
      break;
    case 'e':
      mouse.color = palett.empty;
      break;
  }
});

// begin animation
animate();

// ******************* Animation *******************
function animate() {
  requestAnimationFrame(animate);
  colorGrid.readyReadGrid();
  updateGrid();
  paintCanvas();
}

// ******************* Helper Functions *******************
// Update the grid to the next frame
function updateGrid() {
  if (mouse.down) {
    drawSquare();
  }
  const dir = Math.random() < 0.5 ? 1 : -1;
  for (let y = gridDimension - 2; y >= 0; y--) {
    for (let x = 0; x < gridDimension; x++) {
      // if (colorGrid.isReadGridColor(x, y, palett.sand)) {
      //   const bottom = colorGrid.isWriteGridEmpty(x, y + 1)
      //   const botLeft = colorGrid.isWriteGridEmpty(x - 1, y + 1);
      //   const botRight = colorGrid.isWriteGridEmpty(x + 1, y + 1);
      //   if (bottom) {
      //     colorGrid.setWriteGridPixel(x, y, palett.empty);
      //     colorGrid.setWriteGridPixel(x, y + 1, palett.sand)
      //   } else {
      //     if (botLeft && botRight ) {
      //       colorGrid.setWriteGridPixel(x, y, palett.empty);
      //       colorGrid.setWriteGridPixel(x + dir, y + 1, palett.sand);
      //     } else if (botLeft) {
      //       colorGrid.setWriteGridPixel(x, y, palett.empty);
      //       colorGrid.setWriteGridPixel(x - 1, y + 1, palett.sand);
      //     } else if (botRight) {
      //       colorGrid.setWriteGridPixel(x, y, palett.empty);
      //       colorGrid.setWriteGridPixel(x + 1, y + 1, palett.sand);
      //     }
      //   }
      // }
      if (colorGrid.isReadGridColor(x, y, palett.water)) {
        const bottom = colorGrid.isWriteGridEmpty(x, y + 1)
        const botLeft = colorGrid.isWriteGridEmpty(x - 1, y + 1);
        const botRight = colorGrid.isWriteGridEmpty(x + 1, y + 1);
        const left = colorGrid.isWriteGridEmpty(x - 1, y);
        const right = colorGrid.isWriteGridEmpty(x + 1, y);
        if (bottom) {
          colorGrid.setWriteGridPixel(x, y, palett.empty);
          colorGrid.setWriteGridPixel(x, y + 1, palett.water)
        } else if (botLeft || botRight) {
          if (botLeft && botRight ) {
            colorGrid.setWriteGridPixel(x, y, palett.empty);
            colorGrid.setWriteGridPixel(x + dir, y + 1, palett.water);
          } else if (botLeft) {
            colorGrid.setWriteGridPixel(x, y, palett.empty);
            colorGrid.setWriteGridPixel(x - 1, y + 1, palett.water);
          } else if (botRight) {
            colorGrid.setWriteGridPixel(x, y, palett.empty);
            colorGrid.setWriteGridPixel(x + 1, y + 1, palett.water);
          }
        } else {
          if (left && right) {
            colorGrid.setWriteGridPixel(x, y, palett.empty);
            colorGrid.setWriteGridPixel(x + dir, y, palett.water);
          } else if (left) {
            colorGrid.setWriteGridPixel(x, y, palett.empty);
            colorGrid.setWriteGridPixel(x - 1, y, palett.water);
          } else if (right) {
            colorGrid.setWriteGridPixel(x, y, palett.empty);
            colorGrid.setWriteGridPixel(x + 1, y, palett.water);
          }
        }
      }
    }
  }
}

function drawSquare(e) {
    const penOffset = Math.floor(mouse.size / 2);
    colorGrid.setSquare(mouse.x - penOffset, mouse.y - penOffset, mouse.size, mouse.color);
}

function setMouse(e) {
    mouse.x = Math.floor((e.offsetX / canvasDimension) * gridDimension);
    mouse.y = Math.floor((e.offsetY / canvasDimension) * gridDimension);
}

function toggleMouseDown(e) {
  if (e.buttons == 1) {
    mouse.down = true;
    setMouse(e);
  }
}

function toggleMouseUp(e) {
  mouse.down = false;
}

function paintCanvas() {
  imageData.data.set(colorGrid.getColorArray());
  createImageBitmap(imageData).then((imageBitMap) => {
    ctx.drawImage(imageBitMap, 0, 0, canvasDimension, canvasDimension);
  });
}
