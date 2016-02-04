var startMenu = {
  create: function() {
    game.stage.backgroundColor = menuBackgroundColor;

    var gameStartText = game.add.text(
      0,
      0,
      'Mountain Roguelike',
      {
        font: fontSize * 2 + 'px ' + font,
        fill: menuFontColor,
        boundsAlignH: 'center',
        boundsAlignV: 'middle'
      }
    );
    gameStartText.setTextBounds(0, 0, game.width, game.height/2);
    
    var controlsText = game.add.text(
      0,
      game.height/2,
      'Click or press space to start.\n' +
      'Use arrow keys to control player.\n' +
      'Spacebar will pause and show a legend.',
      {
        font: fontSize + 'px ' + font,
        fill: menuFontColor,
        boundsAlignH: 'center',
        boundsAlignV: 'middle'
      }
    );
    controlsText.setTextBounds(0, 0, game.width, game.height/2);
  },
  update: function() {
    if (game.input.activePointer.isDown || 
      game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
      this.startGame();
    }
  },
  startGame: function() {
    game.state.start('play');
  }
}