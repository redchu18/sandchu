class ColorGrid {

  grid = new Array(); 

  constructor(height, width) {
    this.height = height;
    this.width = width;
    this.resetGrid();
  }

  // for testing purposes, this makes the entire grid red
  // this initializes "grid" field into a 2D array. The elements of the 2D array is an array of length 4, representing RGBA colors
  resetGrid() {
    this.grid.length = this.height;

    for (let i = 0; i < this.grid.length; i++) {

      const colorRed = [255, 0, 0, 1];
      const row = new Array(this.width);

      for (let j = 0; j < row.length; j ++) {
        row[j] = colorRed;
      }

      this.grid[i] = row;
    } 
  }

  // return values as one array
  // the returned value will be converted into UInt8ClampedArray for putImageData()
  getColorArray() {
    const colorArray = new Array();
    this.grid.forEach((row) => {
      row.forEach((color) => {
        colorArray.push(color[0], color[1], color[2], color[3]);
      })
    });
    return colorArray;
  }
}