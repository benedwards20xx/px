var gameOver = {
  create: function() {
    map.clear();
    game.stage.backgroundColor = '#000';
    var text = game.add.text(
      0,
      0,
      'Game Over',
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
      this.state.start('play');
    }
  }
}