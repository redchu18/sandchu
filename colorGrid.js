class ColorGrid {

  readGrid = new Array();
  grid = new Array(); 

  constructor(width, height) {
    this.height = height;
    this.width = width;
    this.resetGrid();
    this.readyReadGrid();
  }

  calculateIndexPosition(x, y) {
    return y * this.width + x;
  }

  // Set a single pixel in the grid using xy location and color
  setPixel(x, y, elementId) {
    if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
      this.grid[this.calculateIndexPosition(x, y)] = elementId;
    }
  } 

  // Get the pixel at location xys
  getPixel(x, y) {
    return this.grid[this.calculateIndexPosition(x, y)];
  }

  // Get pixel from read grid
  getReadGridPixelId(x, y) {
    return this.readGrid[this.calculateIndexPosition(x, y)];
  }

  // Ready read only grid
  readyReadGrid() {
    this.readGrid = [...this.grid];
  }

  // Check if cell is in bounds
  isInBounds(x, y) {
    return x >= 0 && x < this.width && y >= 0 && y < this.height;
  }

  // Check if cell is empty
  isEmpty(x, y) {
    return this.isInBounds(x, y) && this.getPixel(x, y) == element.emptyId;
  }

  // Returns whether or not a pixel has a certain id
  isPixel(x, y, pixelId) {
    return this.isInBounds(x, y) && this.getReadGridPixelId(x, y) == pixelId;
  }

  // Initializes "grid" field into a 2D array. The elements of the 2D array is an array of length 4, representing RGBA colors
  resetGrid() {
    this.grid = [];
    for (let i = 0; i < this.width; i++) {
      for (let j = 0; j < this.height; j++) {
        this.grid.push(element.emptyId);
      }
    } 
  }

  // Set pixels to color a square using xy location, color and length
  setSquare(x, y, length, elementId) {
    const startingX = x;
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length; j++) {
        if (this.isEmpty(x, y) || elementId == element.emptyId) {
          this.setPixel(x, y, elementId);
        }
        x++;
      }
      y++;
      x = startingX;
    }
  }

  // Swap pixel
  swapPixel(x1, y1, x2, y2) {
    const pixel = this.getPixel(x1, y1);
    this.setPixel(x1, y1, this.getPixel(x2, y2));
    this.setPixel(x2, y2, pixel);
  }

  // Load saved state
  loadSavedGrid() {
    this.grid = [...savedArray];
    this.readyReadGrid();
  }

  // save current state
  saveState() {
    savedArray = [...this.grid];
  }

  // Return "grid" values as one array
  // The returned value will be converted into UInt8ClampedArray for putImageData()
  getColorArray() {
    const colorArray = new Array();
    this.grid.forEach((elementId) => {
      colorArray.push(...elementProps[elementId].color);
    });
    return Uint8ClampedArray.from(colorArray);
  }

}