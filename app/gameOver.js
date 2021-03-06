var gameOver = {
  create: function() {
    var reason = level.getGameOverReason();
    game.stage.backgroundColor = menuBackgroundColor;

    var gameOverText = game.add.text(
      0,
      0,
      'Game Over',
      {
        font: fontSize * 2 + 'px ' + font,
        fill: menuFontColor, 
        boundsAlignH: 'center',
        boundsAlignV: 'middle'
      }
    );
    gameOverText.setTextBounds(0, 0, game.width, game.height/2);

    var reasonText = level.getGameOverReason();
    var controlsText = game.add.text(
      0,
      game.height/2,
      reasonText +
      '\nClick or press space to retry.',
      {
        font: fontSize + 'px ' + font,
        fill: menuFontColor,
        boundsAlignH: 'center',
        boundsAlignV: 'middle'
      }
    );
    controlsText.setTextBounds(0, 0, game.width, game.height/2);
    level.clearPlayer();
    level.updateLevelNum(0);
  },
  update: function() {
    if (game.input.activePointer.isDown || 
      game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
      this.state.start('play');
    }
  }
}