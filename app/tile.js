function Tile(x, y, symbol, color) {
  //this.originalSymbol = symbol;
  this.symbol = symbol;
  this.originalColor = color;
  this.color = color;
  this.text = game.add.text(
    fontSize * 0.6 * x,
    fontSize * y,
    this.symbol,
    {
      font: fontSize + 'px ' + font,
      fill: this.color
    }
  );
  this.updateTile = function(symbol, color) {
    this.symbol = symbol;
    this.text.setText(this.symbol);
    this.color = color;
    if (symbol == wallSymbol ||
      symbol == floorSymbol ||
      symbol == waterSymbol)
    {
      this.originalColor = color;
    }
    
    this.text.setStyle({
      font: fontSize + 'px ' + font,
      fill: this.color
    });
  };
  this.removeTile = function() {
    this.text.destroy();
  }
}