
// ******************* Script Begin *******************

// Initialize canvas
const canvas = document.getElementById('powder_canvas');
const ctx = canvas.getContext('2d');
const canvasDimension = 600;
canvas.width = canvasDimension;
canvas.height = canvasDimension;
ctx.imageSmoothingEnabled = false;

// Variables
const sandId = element.sandId;
const waterId = element.waterId;
const emptyId = element.emptyId;
const rockId = element.rockId;
const oilId = element.oilId;

const mouse = {
    down: false,
    x: undefined,
    y: undefined,
    size: 5,
    colorId: sandId
}
const gameState = {
  pause: false
}
const gridDimension = 150;
const imageData = ctx.createImageData(gridDimension, gridDimension);
const colorGrid = new ColorGrid(gridDimension, gridDimension);
paintCanvas(canvas);


// Event listeners
canvas.addEventListener('mousedown', handleMouseDown);
canvas.addEventListener('mouseup', handleMouseUp);
canvas.addEventListener('mouseleave', handleMouseUp);
canvas.addEventListener('mousemove', handleMouseMove);

// Controls
document.addEventListener('keypress', function(e) {
  switch (e.key) {
    case 's':
      mouse.colorId = sandId;
      break;
    case 'w':
      mouse.colorId = waterId;
      break;
    case 'e':
      mouse.colorId = emptyId;
      break;
    case 'r':
      mouse.colorId = rockId;
      break;
    case 'o':
      mouse.colorId = oilId;
      break;
    case 'p':
      if (gameState.pause) {
        gameState.pause = false;
        animate();
      } else {
        gameState.pause = true;
      }
      break;
    case ' ':
      if (gameState.pause) {
        stepFrame();
      }
      break;
  }
});

// begin animation
animate();

// ******************* Animation *******************
function stepFrame() {
  colorGrid.readyReadGrid();
  updateGrid();
}

function animate() {
  if (!gameState.pause) {
    stepFrame(); 
  }
  paintCanvas();
  requestAnimationFrame(animate);
}



// ******************* Helper Functions *******************
// Update the grid to the next frame
function updateGrid() {
  if (mouse.down) {
    drawSquare();
  }
  const dir = Math.random() < 0.5 ? 1 : -1;
  let leftFirst = true;
  for (let y = 0; y < gridDimension; y++) {
    if (leftFirst) {
      for (let x = 0; x < gridDimension; x++) {
        handlePixel(x, y, dir);
      }
    } else {
      for (let x = gridDimension - 1; x >= 0; x--) {
        handlePixel(x, y, dir);
      }
    }
    leftFirst = !leftFirst;
  }
}

function handlePixel(x, y, dir) {
  const pixelId = colorGrid.getReadGridPixelId(x, y);
  switch (pixelId) {
    case 1:
      handleSand(x, y, dir, pixelId);
      break;
    case 2:
    case 4:
      handleLiquid(x, y, dir, pixelId);
      break;
  }
}

function handleSand(x, y, dir, pixelId) {
  const bottom = shouldSwap(pixelId, x, y + 1)
  const botLeft = shouldSwap(pixelId, x - 1, y + 1);
  const botRight = shouldSwap(pixelId, x + 1, y + 1);
  if (bottom) {
    colorGrid.swapPixel(x, y, x, y + 1);
  } else {
    if (botLeft && botRight ) {
      colorGrid.swapPixel(x, y, x + dir, y + 1);
    } else if (botLeft) {
      colorGrid.swapPixel(x, y, x - 1 , y + 1);
    } else if (botRight) {
      colorGrid.swapPixel(x, y, x + 1, y + 1);
    }
  }
}

function handleLiquid(x, y, dir, pixelId) {
  const bottom = shouldSwap(pixelId, x, y + 1)
  const botLeft = shouldSwap(pixelId, x - 1, y + 1);
  const botRight = shouldSwap(pixelId, x + 1, y + 1);
  const left = shouldSwap(pixelId, x - 1, y);
  const right = shouldSwap(pixelId, x + 1, y);
  if (bottom) {
    colorGrid.swapPixel(x, y, x, y + 1);
  } else if (botLeft || botRight) {
    if (botLeft && botRight ) {
      colorGrid.swapPixel(x, y, x + dir, y + 1);
    } else if (botLeft) {
      colorGrid.swapPixel(x, y, x - 1, y + 1);
    } else if (botRight) {
      colorGrid.swapPixel(x, y, x + 1, y + 1);
    }
  } else {
    if (left && right) {
      colorGrid.swapPixel(x, y, x + dir, y);
    } else if (left) {
      colorGrid.swapPixel(x, y, x - 1, y);
    } else if (right) {
      colorGrid.swapPixel(x, y, x + 1, y);
    }
  }
}

function shouldSwap(pixelId, x, y) {
  if (colorGrid.isEmpty(x, y)) {
    return true;
  } else if (colorGrid.isInBounds(x, y)) {
    const locationPixelId = colorGrid.getReadGridPixelId(x, y);
    const density =  elementProps[pixelId].density;
    const locationDensity =  elementProps[locationPixelId].density;

    return density > locationDensity;
  }
  return false;
}

function drawSquare(e) {
    const penOffset = Math.floor(mouse.size / 2);
    colorGrid.setSquare(mouse.x - penOffset, mouse.y - penOffset, mouse.size, mouse.colorId);
}

function setMouse(e) {
    mouse.x = Math.floor((e.offsetX / canvasDimension) * gridDimension);
    mouse.y = Math.floor((e.offsetY / canvasDimension) * gridDimension);
}

function handleMouseMove(e) {
  setMouse(e);
  if (gameState.pause && mouse.down) {
    drawSquare();
  }
}

function handleMouseDown(e) {
  if (e.buttons == 1) {
    mouse.down = true;
    setMouse(e);
    drawSquare();
  }
}

function handleMouseUp(e) {
  mouse.down = false;
}

function paintCanvas() {
  imageData.data.set(colorGrid.getColorArray());
  createImageBitmap(imageData).then((imageBitMap) => {
    ctx.drawImage(imageBitMap, 0, 0, canvasDimension, canvasDimension);
  });
}
