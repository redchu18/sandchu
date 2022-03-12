
// ******************* Script Begin *******************

// Initialize canvas
const canvas = document.getElementById('powder_canvas');
const ctx = canvas.getContext('2d');
const widthProp = .78;
const heightProp = .53;
let canvasWidth = Math.floor(window.innerWidth * widthProp);
let canvasHeight = Math.floor(window.innerWidth * heightProp);
canvas.width = canvasWidth;
canvas.height = canvasHeight;
ctx.imageSmoothingEnabled = false;

// Variables
const ashId = element.ashId;
const ablazeCharcoalId = element.ablazeCharcoalId;
const ablazePlantId = element.ablazePlantId;
const fireId = element.fireId;
const sandId = element.sandId;
const waterId = element.waterId;
const emptyId = element.emptyId;
const rockId = element.rockId;
const oilId = element.oilId;
const dirtId = element.dirtId;
const seedId = element.seedId;
const growingFlowerId = element.growingFlowerId;
const flowerStemId = element.flowerStemId;
const redPetalId = element.redPetalId;
const yellowPetalId = element.yellowPetalId;
const bluePetalId = element.bluePetalId;
const pinkPetalId = element.pinkPetalId;
const purplePetalId = element.purplePetalId;

const mouse = {
    down: false,
    x: undefined,
    y: undefined,
    size: 15,
    colorId: sandId
}
const gameState = {
  pause: false
}
const gridWidth = 400;
const gridHeight = 300;
const imageData = ctx.createImageData(gridWidth, gridHeight);
const colorGrid = new ColorGrid(gridWidth, gridHeight);
colorGrid.loadSavedGrid();
paintCanvas(canvas);


// Event listeners
canvas.addEventListener('mousedown', handleMouseDown);
canvas.addEventListener('mouseup', handleMouseUp);
canvas.addEventListener('mouseleave', handleMouseUp);
canvas.addEventListener('mousemove', handleMouseMove);

for (let i = 0; i < childrenUiButtons.length; i++) {
  const uiElement = childrenUiButtons[i];
  if (uiElement.tagName == 'BUTTON') {
    uiElement.addEventListener('click', function(e) {
      selectElement(this.id);
    })
  }
}

mouseSlider.addEventListener('mouseup', function(e) {
  mouse.size = parseInt(this.value);
});

// Controls
selectElement(1); // Select default element

document.addEventListener('keypress', function(e) {
  switch (e.key) {
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

document.getElementById("playpause").addEventListener('click', () => {
  if (playpause.checked) {
    gameState.pause = true;
  } else {
    gameState.pause = false;
    animate();
  }
});

document.getElementById("save_button").addEventListener('click', () => {
  savedArray = colorGrid.getGrid().map((row) => row.slice());
});

document.getElementById("load_button").addEventListener('click', () => {
  colorGrid.loadSavedGrid();
});

document.getElementById("clear_button").addEventListener('click', () => {
  colorGrid.resetGrid();
})

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
  let leftFirst = true;
  for (let y = 0; y < gridHeight; y++) {
    if (leftFirst) {
      for (let x = 0; x < gridWidth; x++) {
        const dir = Math.random() < 0.5 ? 1 : -1;
        handlePixel(x, y, dir);
      }
    } else {
      for (let x = gridWidth - 1; x >= 0; x--) {
        const dir = Math.random() < 0.5 ? 1 : -1;
        handlePixel(x, y, dir);
      }
    }
    leftFirst = !leftFirst;
  }
}

function handlePixel(x, y, dir) {
  const pixelId = colorGrid.getReadGridPixelId(x, y);
  switch (pixelId) {
    case sandId:
    case dirtId:
    case seedId:
    case ashId:
      handleSolid(x, y, dir, pixelId);
      break;
    case waterId:
    case oilId:
      handleLiquid(x, y, dir, pixelId);
      break;
    case fireId:
      handleFire(x, y, dir, pixelId);
      break;
    case growingFlowerId:
      handleGrowingFlower(x, y, dir, pixelId);
      break;
    case flowerStemId:
    case redPetalId:
    case yellowPetalId:
    case bluePetalId:
    case pinkPetalId:
    case purplePetalId:
      handlePlantMatter(x, y, pixelId);
      break;
    case ablazeCharcoalId:
    case ablazePlantId:
      handleAblazeElements(x, y, pixelId);
  }
}

function handleAblazeElements(x, y, pixelId) {

  if (hasAdjacentPixel(x, y, waterId)) {
    colorGrid.setPixel(x, y, ashId);
  }

  if (pixelId == ablazePlantId) {
    const shouldTransform = Math.random() < elementProps[pixelId].charcoalChance;
    if (shouldTransform) {
      colorGrid.setPixel(x, y, ablazeCharcoalId);
    }
  } else if (pixelId == ablazeCharcoalId) {
    const shouldTransform = Math.random() < elementProps[pixelId].ashChance;
    if (shouldTransform) {
      colorGrid.setPixel(x, y, ashId);
    }
  }
  produceFire(x, y);
}

function handlePlantMatter(x, y, pixelId) {
  if (shouldPlantCatchFire(x, y, pixelId)) {
    colorGrid.setPixel(x, y, ablazePlantId);
  }
}

function shouldPlantCatchFire(x, y, pixelId) {
  if (shouldCatchFire(x, y, pixelId)) {
    return true;
  }
  if (hasAdjacentPixel(x, y, ablazePlantId) && Math.random() < elementProps[ablazePlantId].spreadChance) {
    return true;
  }
}

function handleGrowingFlower(x, y, dir, pixelId) {
  if (Math.random() < elementProps[pixelId].stopGrowingChance) {
    return;
  }

  if (Math.random() < elementProps[pixelId].bloomChance) {
    bloomFLower(x, y, pixelId);
    return;
  }

  const top = colorGrid.isEmpty(x, y - 1);
  const topLeft = colorGrid.isEmpty(x - 1, y - 1);
  const topRight = colorGrid.isEmpty(x + 1, y - 1);

  const shouldGrowUp = Math.random() < elementProps[pixelId].topBias;
  
  if (shouldGrowUp && top) {
    colorGrid.setPixel(x, y - 1, growingFlowerId);
    colorGrid.setPixel(x, y, flowerStemId);
  } else if (topLeft || topRight) {
    if (topLeft && topRight) {
      colorGrid.setPixel(x + dir, y - 1, growingFlowerId);
      colorGrid.setPixel(x, y, flowerStemId);
    } else if (topLeft) {
      colorGrid.setPixel(x - 1, y - 1, growingFlowerId);
      colorGrid.setPixel(x, y, flowerStemId);
    } else if (topRight) {
      colorGrid.setPixel(x + 1, y - 1, growingFlowerId);
      colorGrid.setPixel(x, y, flowerStemId);
    }
  }
}

// fix spaghetti code here
function bloomFLower(x, y, pixelId) {
  colorGrid.setPixel(x, y, flowerStemId);
  const flowerPetalId = pickRandomFlowerPetalId();
  const shouldGrowOverStem = Math.random() < elementProps[pixelId].growOverStemChance;
  for (let i = -3; i <= 3; i++) {
    for (let j = -1; j >= -4; j--) {
      if (Math.random() < elementProps[pixelId].hollowChance) {
        continue;
      }

      if (!shouldGrowOverStem) {
        if (colorGrid.isPixel(x + i, y + j, flowerStemId)) {
          continue;
        }
      }

      if (colorGrid.isEmpty(x + i, y + j) || colorGrid.isPixel(x + i, y + j, flowerStemId)) {
        if (
          (j != -4 || i != -3) && 
          (j != -4 || i != 3) &&
          (j != -1 || i != -3) &&
          (j != -1 || i != 3)
        ) {
          colorGrid.setPixel(x + i, y + j, flowerPetalId);
        }
      }
    }
  }
}

function pickRandomFlowerPetalId() {
  return 10 + Math.floor((Math.random() * 5));
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

function handleSolid(x, y, dir, pixelId) {
  if (shouldCatchFire(x, y, pixelId)) {
    colorGrid.setPixel(x, y, fireId);
    return;
  }

  if (shouldStartGrowing(x, y, pixelId)) {
    colorGrid.setPixel(x, y, growingFlowerId);
    return;
  }

  if (shouldDissapear(x, y, pixelId)) {
    colorGrid.setPixel(x, y, emptyId);
    return;
  }

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

function shouldDissapear(x, y, pixelId) {
  if (pixelId == seedId) {
    return (hasAdjacentPixel(x, y, growingFlowerId) || hasAdjacentPixel(x, y, flowerStemId));
  }
}

function handleLiquid(x, y, dir, pixelId) {
  if (shouldCatchFire(x, y, pixelId)) {
    colorGrid.setPixel(x, y, fireId);
    produceFire(x, y);
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

// Seed Interaction
function shouldStartGrowing(x, y) {
  if (
    colorGrid.isPixel(x, y, seedId) && 
    colorGrid.isPixel(x, y + 1, dirtId) ||
    colorGrid.isPixel(x, y + 1, growingFlowerId)
  ) {
    return true;
  }
  return false;
}

// Fire Interaction
function produceFire(x, y) {
  // setFireIfNotEmpty(x, y - 1);
  setFireIfNotEmpty(x, y + 1);
  setFireIfNotEmpty(x - 1, y);
  setFireIfNotEmpty(x + 1, y);
}

function setFireIfNotEmpty(x, y) {
  if (colorGrid.isEmpty(x, y)) {
    colorGrid.setPixel(x, y, fireId);
  }
}

function shouldCatchFire(x, y, pixelId) {
  let shouldCatch = Math.random() < elementProps[pixelId].flammability;
  if (shouldCatch) {
    return hasAdjacentPixel(x, y, fireId);
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

function hasAdjacentPixel(x, y, pixelId) {
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i != 0 || j != 0) {
        if (colorGrid.isInBounds(x + i, y + j) && colorGrid.getPixel(x + i, y + j) == pixelId) {
          return true;
        }
      }
    }
  }
  return false;
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

function selectElement(id) {
  resetButtonsToDefault();
  highlightButton(id);
  mouse.colorId = parseInt(id);
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
