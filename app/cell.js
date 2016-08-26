function Cell(col, row, color) {
  // this.symbol = symbol;
  this.originalColor = color;
  this.color = color;
  
  this.col = col;
  this.row = row;

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