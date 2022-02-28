
// ******************* Script Begin *******************

// Initialize canvas
const canvas = document.getElementById('powder_canvas');
const ctx = canvas.getContext('2d');
const canvasDimension = 600;
canvas.width = canvasDimension;
canvas.height = canvasDimension;
ctx.imageSmoothingEnabled = false;

// Global Variables
const mouse = {
    down: false,
    x: undefined,
    y: undefined,
    size: 5,
    colorId: element.sand.id
}
const gridDimension = 100;
const imageData = ctx.createImageData(gridDimension, gridDimension);
const colorGrid = new ColorGrid(gridDimension, gridDimension);
paintCanvas(canvas);

canvas.addEventListener('mousedown', toggleMouseDown);
canvas.addEventListener('mouseup', toggleMouseUp);
canvas.addEventListener('mouseleave', toggleMouseUp);
canvas.addEventListener('mousemove', setMouse);
document.addEventListener('keypress', function(e) {
  switch (e.key) {
    case 's':
      mouse.colorId = element.sand.id;
      break;
    case 'w':
      mouse.colorId = element.water.id;
      break;
    case 'e':
      mouse.colorId = element.empty.id;
      break;
  }
});

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
  if (mouse.down) {
    drawSquare();
  }
  const dir = Math.random() < 0.5 ? 1 : -1;
  for (let y = 0; y < gridDimension; y++) {
  //for (let y = gridDimension - 1; y >= 0; y--) {
    for (let x = 0; x < gridDimension; x++) {
      switch (colorGrid.getPixel(x, y)) {
        case 1:
          handleSand(x, y, dir);
          break;
        case 2:
          handleWater(x, y, dir);
          break;
      }
      
    }
  }
}

function handleSand(x, y, dir) {
  const bottom = colorGrid.isEmpty(x, y + 1)
  const botLeft = colorGrid.isEmpty(x - 1, y + 1);
  const botRight = colorGrid.isEmpty(x + 1, y + 1);
  if (bottom) {
    colorGrid.setPixel(x, y, element.empty.id);
    colorGrid.setPixel(x, y + 1, element.sand.id)
  } else {
    if (botLeft && botRight ) {
      colorGrid.setPixel(x, y, element.empty.id);
      colorGrid.setPixel(x + dir, y + 1, element.sand.id);
    } else if (botLeft) {
      colorGrid.setPixel(x, y, element.empty.id);
      colorGrid.setPixel(x - 1, y + 1, element.sand.id);
    } else if (botRight) {
      colorGrid.setPixel(x, y, element.empty.id);
      colorGrid.setPixel(x + 1, y + 1, element.sand.id);
    }
  }
}

function handleWater(x, y, dir) {
  const bottom = colorGrid.isEmpty(x, y + 1)
  const botLeft = colorGrid.isEmpty(x - 1, y + 1);
  const botRight = colorGrid.isEmpty(x + 1, y + 1);
  const left = colorGrid.isEmpty(x - 1, y);
  const right = colorGrid.isEmpty(x + 1, y);
  if (bottom) {
    colorGrid.setPixel(x, y, element.empty.id);
    colorGrid.setPixel(x, y + 1, element.water.id)
  } else if (botLeft || botRight) {
    if (botLeft && botRight ) {
      colorGrid.setPixel(x, y, element.empty.id);
      colorGrid.setPixel(x + dir, y + 1, element.water.id);
    } else if (botLeft) {
      colorGrid.setPixel(x, y, element.empty.id);
      colorGrid.setPixel(x - 1, y + 1, element.water.id);
    } else if (botRight) {
      colorGrid.setPixel(x, y, element.empty.id);
      colorGrid.setPixel(x + 1, y + 1, element.water.id);
    }
  } else {
    if (left && right) {
      colorGrid.setPixel(x, y, element.empty.id);
      colorGrid.setPixel(x + dir, y, element.water.id);
    } else if (left) {
      colorGrid.setPixel(x, y, element.empty.id);
      colorGrid.setPixel(x - 1, y, element.water.id);
    } else if (right) {
      colorGrid.setPixel(x, y, element.empty.id);
      colorGrid.setPixel(x + 1, y, element.water.id);
    }
  }
}

function drawSquare(e) {
    const penOffset = Math.floor(mouse.size / 2);
    colorGrid.setSquare(mouse.x - penOffset, mouse.y - penOffset, mouse.size, mouse.colorId);
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
