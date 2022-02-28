class ColorGrid {

  readGrid = new Array();
  grid = new Array(); 

  constructor(height, width) {
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
  getReadGridPixel(x, y) {
    return this.readGrid[y][x];
  }

  // Check if cell is empty
  isEmpty(x, y) {
    const isInBounds = x >= 0 && x < this.width && y >= 0 && y < this.height;
    return isInBounds && this.getPixel(x, y) == element.empty.id;
  }

  // Get the pixel at location xy
  getPixel(x, y) {
    return this.grid[y][x];
  }

  // Initializes "grid" field into a 2D array. The elements of the 2D array is an array of length 4, representing RGBA colors
  resetGrid() {
    this.grid.length = this.height;

    for (let i = 0; i < this.grid.length; i++) {

      const row = new Array(this.width);

      for (let j = 0; j < row.length; j++) {
        row[j] = element.empty.id;
      }

      this.grid[i] = row;
    } 
  }

  // Set pixels to color a square using xy location, color and length
  setSquare(x, y, length, colorId) {
    const startingX = x;
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length; j++) {
        this.setPixel(x, y, colorId);
        x++;
      }
      y++;
      x = startingX;
    }
  }

  // Set a single pixel in the grid using xy location and color
  setPixel(x, y, colorId) {
    if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
      this.grid[y][x] = colorId;
    }
  } 

  // Return "grid" values as one array
  // The returned value will be converted into UInt8ClampedArray for putImageData()
  getColorArray() {
    const colorArray = new Array();
    this.grid.forEach((row) => {
      row.forEach((colorId) => {
        switch (colorId) {
          case 0:
            colorArray.push(...element.empty.color);
            break;
          case 1:
            colorArray.push(...element.sand.color);
            break;
          case 2:
            colorArray.push(...element.water.color);
            break;
          case 3:
            colorArray.push(...element.rock.color);
            break;
        }
      })
    });
    return Uint8ClampedArray.from(colorArray);
  }
}