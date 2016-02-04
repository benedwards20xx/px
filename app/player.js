function Player(col, row) {
  this.col = col;
  this.row = row;
  this.color = '#0000cc';
  this.maxHp = defaultMaxHp;
  this.hp = this.maxHp;
  this.symbol = playerSymbol;
  // this.hpText = game.add.text(
  //   0,
  //   mapHeight,
  //   'HP: ' + this.hp + '/' + this.maxHp,
  //   {
  //     font: mapFontSize + 'px ' + mapFont,
  //     fill: '#fff',
  //     align: 'left'
  //   }
  // );
  // this.descriptionText = game.add.text(
  //   0,
  //   mapHeight + mapFontSize,
  //   '',
  //   {
  //     font: mapFontSize + 'px ' + mapFont,
  //     fill: '#fff',
  //     align: 'left'
  //   }
  // );
  map.updateSymbol(col, row, playerSymbol, this.color);
  this.updateHP = function(hp) {
    if (this.hp + hp <= this.maxHp) {
      this.hp += hp;
      // this.updateHpText();
    }
    console.log('player hp: ' + this.hp);
    if (this.hp <= 0) {
      game.state.start('gameOver');
      // gameOver();
      // var tile = map.getCellAtPos(this.col, this.row);
      // map.updateSymbol(this.col, this.row, floorSymbol, tile.originalColor);
      // player = null;
    }
  };
  this.updatePosition = function(col, row) {
    // this.descriptionText.setText('');
    var tile = map.getCellAtPos(col, row);
    if (typeof tile != 'undefined') {
      if(tile.symbol == floorSymbol) {
        // var tile = map.getCellAtPos(this.col, this.row);
        map.updateSymbol(this.col, this.row, floorSymbol, tile.originalColor);
        map.updateSymbol(col, row, this.symbol, this.color);
        this.col = col;
        this.row = row;
      } else if (level.isEnemySymbol(tile.symbol)) {
        var enemy = level.updateEnemyHPatPos(col, row, -1);
        // enemy.updateHP(-1);
      } else if (tile.symbol == exitSymbol) {
        var curLevelNum = level.getLevelNum();
        //console.log('curLevelNum ' + curLevelNum);
        if (curLevelNum < level.getMaxLevelNum()) {
          level.updateLevelNum(curLevelNum + 1);
          level.startNewLevel();
        } else {
          gameOver('win');
        }
      }
    }
    level.moveEnemiesAI();
  };
  // this.updateHpText = function() {
  //   this.hpText.setText('HP: ' + this.hp + '/' + this.maxHp);
  // };
}