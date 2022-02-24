class ColorGrid {

  grid = new Array(); 

  constructor(height, width) {
    this.height = height;
    this.width = width;
    this.resetGrid();
  }

  // Initializes "grid" field into a 2D array. The elements of the 2D array is an array of length 4, representing RGBA colors
  resetGrid() {
    this.grid.length = this.height;

    for (let i = 0; i < this.grid.length; i++) {

      const colorBlack = [0, 0, 0, 255];
      const row = new Array(this.width);

      for (let j = 0; j < row.length; j ++) {
        row[j] = colorBlack;
      }

      this.grid[i] = row;
    } 
  }

  // Set pixels to color a square using xy location, color and length
  setSquare(x, y, length, color) {
    const startingX = x;
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length; j++) {
        this.setPixel(x, y, color);
        x++;
      }
      y++;
      x = startingX;
    }
  }

  // Set a single pixel in the grid using xy location and color
  setPixel(x, y, color) {
    if (x >= 0 && x < 300 && y >= 0 && y < 300) {
      this.grid[y][x] = color;
    }
  } 

  // Return "grid" values as one array
  // The returned value will be converted into UInt8ClampedArray for putImageData()
  getColorArray() {
    const colorArray = new Array();
    this.grid.forEach((row) => {
      row.forEach((color) => {
        colorArray.push(color[0], color[1], color[2], color[3]);
      })
    });
    return Uint8ClampedArray.from(colorArray);
  }
}