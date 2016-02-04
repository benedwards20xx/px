var menu = {
  create: function() {
    game.stage.backgroundColor = '#000';
    var text = game.add.text(
      0,
      0,
      'Start Game',
      {
        font: '24px monospace',
        fill: '#fff',
        boundsAlignH: 'center',
        boundsAlignV: 'middle'
      }
    );
    text.setTextBounds(0, 0, defaultWidth, defaultHeight);
  },
  update: function() {
    if (game.input.activePointer.isDown || 
      game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
      //level.startNewLevel();
      this.startGame();
    }
  },
  startGame: function() {
    game.state.start('play');
  }
}