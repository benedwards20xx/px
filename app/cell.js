function Cell(col, row, cellDim, color) {
  // this.symbol = symbol;
  // this.originalColor = color;
  if (color == null) {
    this.color = defaultCellColor;
    this.originalColor = defaultCellColor;
  } else {
    this.color = color;
    this.originalColor = color;
  }

  if (cellDim == null) {
    this.cellDim = defaultCellDim;
  } else {
    this.cellDim = cellDim;
  }
  
  this.col = col;
  this.row = row;

  console.log("creating cell: " + (col + 1) + ", " + (row + 1));
  console.log("with color: " + color);

  var graphics = game.add.graphics(0, 0);

  graphics.lineStyle(2, this.color, 1);
  this.box = graphics.drawRoundedRect(
    this.col * this.cellDim, 
    this.row * this.cellDim,
    this.cellDim,
    this.cellDim,
    5
  );

  var cell = px.create(
    this.col * this.cellDim,
    this.row * this.cellDim,
    this.col + this.row * 3
  );
  // cell.inputEnabled = true;
  // cell.input.start(0, true);
  // cell.events.onInputDown.add(this.clickCell);

  // game.input.addMoveCallback(this.clickBox, this);

  // window.graphics.drawRoundedRect(50, 250, defaultBoxDim, defaultBoxDim, 10);
  // this.rect = Phaser.Graphics.drawRoundedRect(
  //   x:
  //   y:
  //   w:
  //   h:
  //   rad:
  // );

  // this.text = game.add.text(
  //   fontSize * 0.6 * x,
  //   fontSize * y,
  //   this.symbol,
  //   {
  //     font: fontSize + 'px ' + font,
  //     fill: this.color
  //   }
  // );

  // this.clickBox = function(mouse) {
  //   console.log(mouse.event);
  // }

  this.clickCell = function(cell, pointer) {
    console.log("cell: " + cell);
    console.log("pointer: " + pointer);
  };

  this.updateCell = function(color) {
    // this.symbol = symbol;
    // this.text.setText(this.symbol);
    this.color = color;



    // if (symbol == wallSymbol ||
    //   symbol == floorSymbol ||
    //   symbol == waterSymbol)
    // {
    //   this.originalColor = color;
    // }
    // this.text.setStyle({
    //   font: fontSize + 'px ' + font,
    //   fill: this.color
    // });
  };
}