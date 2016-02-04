function Enemy(col, row, symbol, color) {
  this.col = col;
  this.row = row;
  this.symbol = symbol;
  this.color = color;
  this.hp = defaultEnemyHp;
  map.updateSymbol(this.col, this.row, symbol, color);
  this.updatePosition = function(col, row) {
    if (map.getCellAtPos(col, row).symbol == floorSymbol) {
      var tile = map.getCellAtPos(this.col, this.row);
      map.updateSymbol(this.col, this.row, floorSymbol, tile.originalColor);
      map.updateSymbol(col, row, this.symbol, this.color);
      this.col = col;
      this.row = row;
    } else if(map.getCellAtPos(col, row).symbol == playerSymbol) {
      level.updatePlayerHP(-1);
    }
  };
  this.updatePositionAI = function() {
    var player = level.getPlayer();
    var dx = player.col - this.col;
    var dy = player.row - this.row;

    // if far from player, move randomly
    if (Math.abs(dx) + Math.abs(dy) > randomMoveDif) {
      var randPos = map.seekNextRandomPos(this.col, this.row);
      this.updatePosition(randPos.col, randPos.row);  
    } else {
      if (Math.abs(dx) > Math.abs(dy)) {
        if (dx < 0) {
          // west
          this.updatePosition(this.col - 1, this.row);
        } else {
          // east
          this.updatePosition(this.col + 1, this.row);
        }
      } else {
        if (dy < 0) {
          // north
          this.updatePosition(this.col, this.row - 1);
        } else {
          // down
          this.updatePosition(this.col, this.row + 1);
        }
      }
    }
  };
  this.updateHP = function(hp) {
    this.hp += hp;
    if (this.hp <= 0)
      this.remove();
  };
  this.remove = function() {
    var tile = map.getCellAtPos(this.col, this.row);
    map.updateSymbol(this.col, this.row, floorSymbol, tile.originalColor);
    level.removeEnemyAtPos(this.col, this.row);
  };
}