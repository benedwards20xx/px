var cursors;
var spacebar;

var play = {
  // preload: function() {
  // },
  create: function() {
    game.stage.backgroundColor = '#fff';

    // set up controls for keyboard input
    cursors = game.input.keyboard.createCursorKeys();
    
    cursors.left.onDown.add(this.moveWithKey, this);
    cursors.right.onDown.add(this.moveWithKey, this);
    cursors.up.onDown.add(this.moveWithKey, this);
    cursors.down.onDown.add(this.moveWithKey, this);
    
    spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spacebar.onDown.add(this.printSpace, this);

    level.startNewLevel();
  },
  moveWithKey: function(key) {
    var player = level.getPlayer();
    if (typeof player != 'undefined') {
      if (key.event.keyIdentifier == "Left") {
        player.updatePosition(player.col - 1, player.row);
      } else if (key.event.keyIdentifier == "Right") {
        player.updatePosition(player.col + 1, player.row);
      } else if (key.event.keyIdentifier == "Up") {
        player.updatePosition(player.col, player.row - 1);
      } else if (key.event.keyIdentifier == "Down") {
        player.updatePosition(player.col, player.row + 1);
      }
    }
  },
  printSpace: function() {
    console.log('space');
  }
}