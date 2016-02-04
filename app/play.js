var cursors;
var spacebar;
var pause = false;
var pauseMenuRect;
var pauseMenuText;

var play = {
  create: function() {
    // set up controls for keyboard input
    cursors = game.input.keyboard.createCursorKeys();
    
    cursors.left.onDown.add(this.moveWithKey, this);
    cursors.right.onDown.add(this.moveWithKey, this);
    cursors.up.onDown.add(this.moveWithKey, this);
    cursors.down.onDown.add(this.moveWithKey, this);
    
    spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spacebar.onDown.add(this.pausePlay, this);

    //insert bottom info bar
    var infoBar = game.add.graphics();
    infoBar.lineStyle(2, 0x000000, 1);
    infoBar.beginFill(0x000000, 1);
    infoBar.drawRect(0, game.height - fontSize - 2, game.width, game.height);

    var controlsText = game.add.text(
      game.width/2 + fontSize,
      game.height - fontSize * 3/4,
      'Use arrow keys to control - Press space to pause',
      {
        font: fontSize/2 + 'px ' + font,
        fill: menuFontColor,
        align: 'right'
      }
    );

    level.startNewLevel();
  },
  moveWithKey: function(key) {
    if (!pause) {
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
    }
  },
  pausePlay: function() {
    if (!pause) {
      pauseMenuRect = game.add.graphics();
      pauseMenuRect.lineStyle(2, 0x000000, 1);
      pauseMenuRect.beginFill(0x000000, 1);
      pauseMenuRect.drawRect(game.width/4, game.height/4,
        game.width/2, game.height/2);
      var enemyTypes = level.getEnemyTypes();
      var enemyTypeSymbols = '';  
      for (var e in enemyTypes) {
        enemyTypeSymbols += enemyTypes[e].symbol + ' ';
      };
      pauseMenuText = game.add.text(
        pauseMenuRect.width/2,
        pauseMenuRect.height/2,
        'Player:  ' + playerSymbol + '\n' +
        'Enemies: ' + enemyTypeSymbols + '\n' +
        'Food:    ' + foodSymbol + '\n' +
        'Exit:    ' + exitSymbol + '\n' +
        'Floor:   ' + floorSymbol + '\n' +
        'Wall:    ' + wallSymbol + '\n' +
        'Water:   ' + waterSymbol + '\n',
        {
          font: fontSize + 'px ' + font,
          fill: menuFontColor,
          boundsAlignH: 'center',
          boundsAlignV: 'middle'
        }
      );
      pauseMenuText.setTextBounds(0, 0, pauseMenuRect.width, pauseMenuRect.height);
    } else {
      pauseMenuRect.destroy();
      pauseMenuText.destroy();
    }
    pause = !pause;
  }
}