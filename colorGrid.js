class ColorGrid {

  readGrid = new Array();
  grid = new Array(); 

  constructor(width, height) {
    this.height = height;
    this.width = width;
    this.resetGrid();
    this.readyReadGrid();
  }

  // Ready read only grid
  readyReadGrid() {
    this.readGrid = this.grid.map((row) => row.slice());
  }

  // Get pixel from read grid
  getReadGridPixelId(x, y) {
    return this.readGrid[y][x];
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

  // Get the pixel at location xys
  getPixel(x, y) {
    return this.grid[y][x];
  }

  // Initializes "grid" field into a 2D array. The elements of the 2D array is an array of length 4, representing RGBA colors
  resetGrid() {
    this.grid.length = this.height;

    for (let i = 0; i < this.grid.length; i++) {

      const row = new Array(this.width);

      for (let j = 0; j < row.length; j++) {
        row[j] = element.emptyId;
      }

      this.grid[i] = row;
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
    const pixel = this.grid[y1][x1];
    this.grid[y1][x1] = this.grid[y2][x2];
    this.grid[y2][x2] = pixel;
  }

  // Set a single pixel in the grid using xy location and color
  setPixel(x, y, elementId) {
    if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
      this.grid[y][x] = elementId;
    }
  } 

  // Return "grid" values as one array
  // The returned value will be converted into UInt8ClampedArray for putImageData()
  getColorArray() {
    const colorArray = new Array();
    this.grid.forEach((row) => {
      row.forEach((elementId) => {
        colorArray.push(...elementProps[elementId].color);
      });
    });
    return Uint8ClampedArray.from(colorArray);
  }
}