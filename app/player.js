function Player(col, row) {
  this.col = col;
  this.row = row;
  this.color = '#0099ff';
  this.maxHp = 5;
  this.hp = this.maxHp;
  this.symbol = playerSymbol;
  map.updateSymbol(col, row, playerSymbol, this.color);
  this.getHpSymbols = function() {
    var newHpSymbols = '';
    for (var i = 0; i < this.hp; i++) {
      newHpSymbols += this.symbol;
    }
    return newHpSymbols;
  }
  this.updateHpText = function(text) {
    this.playerHPText.setText(text);
  };
  this.playerText = game.add.text(
    0,
    game.height - fontSize - 2,
    'HP:',
    {
      font: fontSize + 'px ' + font,
      fill: menuFontColor,
      align: 'left'
    }
  );
  this.playerHPText = game.add.text(
    this.playerText.width,
    game.height - fontSize - 2,
    this.getHpSymbols(),
    {
      font: fontSize + 'px ' + font,
      fill: this.color,
      align: 'left'
    }
  );
  this.updateHP = function(hp) {
    if (this.hp + hp <= this.maxHp) {
      this.hp += hp;
      this.updateHpText(this.getHpSymbols());
    }
    if (this.hp <= 0) {
      level.updateGameOverReason('You died while adventuring...');
      game.state.start('gameOver');
    }
  };
  this.updatePosition = function(col, row) {
    if (col >= 0 && col < map.getNumCols() &&
      row >= 0 && row < map.getNumRows())
    var tile = map.getCellAtPos(col, row);
    if (typeof tile != 'undefined' && tile != null) {
      if (tile.symbol == floorSymbol || tile.symbol == foodSymbol) {
        map.updateSymbol(this.col, this.row, floorSymbol, tile.originalColor);
        map.updateSymbol(col, row, this.symbol, this.color);
        this.col = col;
        this.row = row;
        if (tile.symbol == foodSymbol)
          this.updateHP(1);
        level.moveEnemiesAI();
      } else if (level.isEnemySymbol(tile.symbol)) {
        var enemy = level.updateEnemyHPatPos(col, row, -1);
      } else if (tile.symbol == exitSymbol) {
        var curLevelNum = level.getLevelNum();
        if (curLevelNum < level.getMaxLevelNum()) {
          level.updateLevelNum(curLevelNum + 1);
          level.startNewLevel();
        } else {
          level.updateGameOverReason('You won by reaching the final exit!');
          game.state.start('gameOver');
        }
      }
    }
  };
}