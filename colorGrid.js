class ColorGrid {

  grid = new Array(); 

  constructor(height, width) {
    this.height = height;
    this.width = width;
    this.resetGrid();
  }

  // initializes and sets entire grid to black
  resetGrid() {
    this.grid.length = this.height;

    for (let i = 0; i < this.grid.length; i++) {

      const colorBlack = [0, 0, 0, 0];
      const row = new Array(this.width);

      for (let j = 0; j < row.length; j ++) {
        row[j] = colorBlack;
      }

      this.grid[i] = row;
    } 
  }
}