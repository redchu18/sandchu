
// ******************* Script Begin *******************

// Initialize canvas
const canvas = document.getElementById('powder_canvas');
const ctx = canvas.getContext('2d');
const canvasWidth = 600;
const canvasHeight = 800;
canvas.width = canvasWidth;
canvas.height = canvasHeight;
ctx.imageSmoothingEnabled = false;

// Variables
const fireId = element.fireId;
const sandId = element.sandId;
const waterId = element.waterId;
const emptyId = element.emptyId;
const rockId = element.rockId;
const oilId = element.oilId;

const mouse = {
    down: false,
    x: undefined,
    y: undefined,
    size: 10,
    colorId: sandId
}
const gameState = {
  pause: false
}
const gridWidth = 150;
const gridHeight = 200;
const imageData = ctx.createImageData(gridWidth, gridHeight);
const colorGrid = new ColorGrid(gridWidth, gridHeight);
paintCanvas(canvas);


// Event listeners
canvas.addEventListener('mousedown', handleMouseDown);
canvas.addEventListener('mouseup', handleMouseUp);
canvas.addEventListener('mouseleave', handleMouseUp);
canvas.addEventListener('mousemove', handleMouseMove);

// Controls
document.addEventListener('keypress', function(e) {
  switch (e.key) {
    case 'f':
      mouse.colorId = fireId;
      break;
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
  for (let y = 0; y < gridHeight; y++) {
    if (leftFirst) {
      for (let x = 0; x < gridWidth; x++) {
        handlePixel(x, y, dir);
      }
    } else {
      for (let x = gridWidth - 1; x >= 0; x--) {
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
    case 5:
      handleFire(x, y, dir, pixelId);
  }
}

function handleFire(x, y, dir, fireId) {
  if (fireShouldDissapear()) {
    colorGrid.setPixel(x, y, emptyId);
    return;
  } else if (!fireShouldRise()) {
    return;
  }

  const top = shouldSwapFire(x, y - 1);
  const topLeft = shouldSwapFire(x - 1, y - 1);
  const topRight = shouldSwapFire(x +  1, y - 1);
  const left = shouldSwapFire(x - 1, y);
  const right = shouldSwapFire(x + 1, y);
  if (top) {
    colorGrid.swapPixel(x, y, x, y - 1);
  } else if (topLeft || topRight) {
    if (topLeft && topRight) {
      colorGrid.swapPixel(x, y, x + dir, y - 1);
    } else if (topLeft) {
      colorGrid.swapPixel(x, y, x - 1, y - 1);
    } else if (topRight) {
      colorGrid.swapPixel(x, y, x + 1, y - 1);
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
  if (shouldCatchFire(x, y, pixelId)) {
    colorGrid.setPixel(x, y, fireId);
    return;
  }

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

// Fire Interaction
function shouldCatchFire(x, y, pixelId) {
  let shouldCatch = Math.random() < elementProps[pixelId].flammability;
  if (shouldCatch) {
    if (
      colorGrid.isPixel(x + 1, y, fireId) ||
      colorGrid.isPixel(x - 1, y, fireId) ||
      colorGrid.isPixel(x, y - 1, fireId) ||
      colorGrid.isPixel(x, y + 1, fireId) ||
      colorGrid.isPixel(x + 1, y - 1, fireId) ||
      colorGrid.isPixel(x - 1, y - 1) ||
      colorGrid.isPixel(x + 1, y + 1) ||
      colorGrid.isPixel(x + 1, y + 1)
    ) {
      return true;
    }
  }
  return false;
}

// Fire movement
function shouldSwapFire(x, y) {
  return colorGrid.isEmpty(x, y);
}

function fireShouldRise() {
  return Math.random() < elementProps[fireId].riseRate;
}

function fireShouldDissapear() {
  return Math.random() < elementProps[fireId].burnRate;
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
    mouse.x = Math.floor((e.offsetX / canvasWidth) * gridWidth);
    mouse.y = Math.floor((e.offsetY / canvasHeight) * gridHeight);
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
    ctx.drawImage(imageBitMap, 0, 0, canvasWidth, canvasHeight);
  });
}
