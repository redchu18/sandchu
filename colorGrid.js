class ColorGrid {

  writeGrid = new Array(); 
  readGrid = new Array();

  constructor(height, width, emptyColor) {
    this.height = height;
    this.width = width;
    this.emptyColor = emptyColor;
    this.resetGrids();
  }

  // Check if an xy location is in bounds
  #isInBounds(x, y) {
    return x >= 0 && x < this.width && y >= 0 && y < this.height;
  }

  // Check if cell is empty
  isWriteGridEmpty(x, y) {
    return this.#isInBounds(x, y) && this.isWriteGridColor(x, y, this.emptyColor);
  }


  // Check if a cell is a certain color in read grid
  isReadGridColor(x, y, color) {
    return this.getReadGridPixel(x, y)[4] == color[4];
  }

  // Check if a cell is a certain color in write grid
  isWriteGridColor(x, y, color) {
    return this.getWriteGridPixel(x, y)[4] == color[4];
  }

  // Get the pixel at location xy
  getWriteGridPixel(x, y) {
    return this.writeGrid[y][x];
  }

  // Get the pixel at location xy
  getReadGridPixel(x, y) {
    return this.readGrid[y][x];
  }

  // Initializes "grid" field into a 2D array. The elements of the 2D array is an array of length 4, representing RGBA colors
  resetGrids() {
    this.writeGrid.length = this.height;

    for (let i = 0; i < this.writeGrid.length; i++) {

      const row = new Array(this.width);

      for (let j = 0; j < row.length; j++) {
        row[j] = this.emptyColor;
      }

      this.writeGrid[i] = row;
    } 

    this.readyReadGrid();
  }

  // Makes read grid same as write grid
  readyReadGrid() {
    this.readGrid = this.writeGrid;
  }

  // Set pixels to color a square using xy location, color and length
  setSquare(x, y, length, color) {
    const startingX = x;
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length; j++) {
        this.setWriteGridPixel(x, y, color);
        x++;
      }
      y++;
      x = startingX;
    }
  }

  // Set a single pixel in the grid using xy location and color
  setWriteGridPixel(x, y, color) {
    if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
      this.writeGrid[y][x] = color;
    }
  } 

  // Return "writeGrid" values as one array
  // The returned value will be converted into UInt8ClampedArray for putImageData()
  getColorArray() {
    const colorArray = new Array();
    this.writeGrid.forEach((row) => {
      row.forEach((color) => {
        colorArray.push(color[0], color[1], color[2], color[3]);
      })
    });
    return Uint8ClampedArray.from(colorArray);
  }
}