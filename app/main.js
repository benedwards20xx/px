// var maxLevelNum = 5;
var defaultMaxHp = 5;
// var defaultMaxHp = 300;
var defaultEnemyHp = 1;

var font = 'monospace';
var fontSize = 24;

var floorSymbol  = '.';
var wallSymbol   = '#';
var waterSymbol  = '~';
var playerSymbol = '@';
var exitSymbol   = '=';

var randomMoveDif = 6;

var menuBackgroundColor = '#000000';
// var playerColor = '#0000cc';
var exitColor = '#9b3bff';

var defaultNumCols = 48;
var defaultNumRows = 24;
var defaultWidth = defaultNumCols * fontSize * 0.6;
var defaultHeight = defaultNumRows * fontSize;
var canvasId = 'container';

var defaultMinCaveSize = 20;
var defaultMaxCaveSize = 80;

// console.log( 'attempt ' + s);
var game = new Phaser.Game(
  defaultWidth,
  defaultHeight,
  Phaser.AUTO,
  canvasId,
  { create: create }
);

// game.state.add('Menu', Menu);

// game.state.add('Game', Game);

// game.state.start('Menu');

function create() {
  //$('#container').css('width', canvasWidth + 'px');
  //$('#container').css('margin', '0 auto');
  //$('#content').css('width', canvasWidth + 'px');
  //$('#content').css('margin', '0 auto');

  //controls
  // spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  // cursors = game.input.keyboard.createCursorKeys();

  // cursors.left.onDown.add(moveWithKey, this);
  // cursors.right.onDown.add(moveWithKey, this);
  // cursors.up.onDown.add(moveWithKey, this);
  // cursors.down.onDown.add(moveWithKey, this);

  //menu.setupStartMenu();

  // var infoGraphics = game.add.graphics();
  // infoGraphics.lineStyle(2, 0x000000, 1);
  // infoGraphics.beginFill(0x000000, 1);
  // infoGraphics.drawRect(0, mapHeight, canvasWidth, canvasHeight);
  game.state.add('menu', menu);
  game.state.add('play', play);
  game.state.add('gameOver', gameOver);
  game.state.start('menu');

  //level.startNewLevel();
}

/*function moveWithKey(key) {
  var player = level.getPlayer();
  if (player) {
  // if (player !== null) {
    if(key.event.keyIdentifier == "Left")
    {
      player.updatePosition(player.col - 1, player.row);
    }
    else if(key.event.keyIdentifier == "Right") {
      player.updatePosition(player.col + 1, player.row);
    }
    else if(key.event.keyIdentifier == "Up") {
      player.updatePosition(player.col, player.row - 1);
    }
    else if(key.event.keyIdentifier == "Down") {
      player.updatePosition(player.col, player.row + 1);
    }
  }
}*/

// function gameOver(status) {
//   console.log('gameOver');
//   if (status = 'dead') {
//     console.log('dead');
//   } else if (status = 'win') {
//     console.log('win');
//   }
//   game.state.start('gameOver');
//   // map.clear();
//   // game.stage.backgroundColor = menuBackgroundColor;
// }

//entities
// function Tile(x, y, symbol, color) {
//   //this.originalSymbol = symbol;
//   this.symbol = symbol;
//   this.originalColor = color;
//   this.color = color;
//   this.text = game.add.text(
//     fontSize * 0.6 * x,
//     fontSize * y,
//     this.symbol,
//     {
//       font: fontSize + 'px ' + font,
//       fill: this.color
//     }
//   );
//   this.updateTile = function(symbol, color) {
//     this.symbol = symbol;
//     this.text.setText(this.symbol);
//     this.color = color;
//     if (symbol == wallSymbol ||
//       symbol == floorSymbol ||
//       symbol == waterSymbol)
//     {
//       this.originalColor = color;
//     }
    
//     this.text.setStyle({
//       font: fontSize + 'px ' + font,
//       fill: this.color
//     });
//   };
//   this.removeTile = function() {
//     this.text.destroy();
//   }
// }

// function Player(col, row) {
//   this.col = col;
//   this.row = row;
//   this.color = '#0000cc';
//   this.maxHp = defaultMaxHp;
//   this.hp = this.maxHp;
//   this.symbol = playerSymbol;
//   // this.hpText = game.add.text(
//   //   0,
//   //   mapHeight,
//   //   'HP: ' + this.hp + '/' + this.maxHp,
//   //   {
//   //     font: mapFontSize + 'px ' + mapFont,
//   //     fill: '#fff',
//   //     align: 'left'
//   //   }
//   // );
//   // this.descriptionText = game.add.text(
//   //   0,
//   //   mapHeight + mapFontSize,
//   //   '',
//   //   {
//   //     font: mapFontSize + 'px ' + mapFont,
//   //     fill: '#fff',
//   //     align: 'left'
//   //   }
//   // );
//   map.updateSymbol(col, row, playerSymbol, this.color);
//   this.updateHP = function(hp) {
//     if (this.hp + hp <= this.maxHp) {
//       this.hp += hp;
//       // this.updateHpText();
//     }
//     console.log('player hp: ' + this.hp);
//     if (this.hp <= 0) {
//       game.state.start('gameOver');
//       // gameOver();
//       // var tile = map.getCellAtPos(this.col, this.row);
//       // map.updateSymbol(this.col, this.row, floorSymbol, tile.originalColor);
//       // player = null;
//     }
//   };
//   this.updatePosition = function(col, row) {
//     // this.descriptionText.setText('');
//     var tile = map.getCellAtPos(col, row);
//     if (typeof tile != 'undefined') {
//       if(tile.symbol == floorSymbol) {
//         // var tile = map.getCellAtPos(this.col, this.row);
//         map.updateSymbol(this.col, this.row, floorSymbol, tile.originalColor);
//         map.updateSymbol(col, row, this.symbol, this.color);
//         this.col = col;
//         this.row = row;
//       } else if (level.isEnemySymbol(tile.symbol)) {
//         var enemy = level.updateEnemyHPatPos(col, row, -1);
//         // enemy.updateHP(-1);
//       } else if (tile.symbol == exitSymbol) {
//         var curLevelNum = level.getLevelNum();
//         //console.log('curLevelNum ' + curLevelNum);
//         if (curLevelNum < level.getMaxLevelNum()) {
//           level.updateLevelNum(curLevelNum + 1);
//           level.startNewLevel();
//         } else {
//           gameOver('win');
//         }
//       }
//     }
//     level.moveEnemiesAI();
//   };
//   // this.updateHpText = function() {
//   //   this.hpText.setText('HP: ' + this.hp + '/' + this.maxHp);
//   // };
// }

// function Enemy(col, row, symbol, color) {
//   this.col = col;
//   this.row = row;
//   this.symbol = symbol;
//   this.color = color;
//   this.hp = defaultEnemyHp;
//   map.updateSymbol(this.col, this.row, symbol, color);
//   this.updatePosition = function(col, row) {
//     if (map.getCellAtPos(col, row).symbol == floorSymbol) {
//       var tile = map.getCellAtPos(this.col, this.row);
//       map.updateSymbol(this.col, this.row, floorSymbol, tile.originalColor);
//       map.updateSymbol(col, row, this.symbol, this.color);
//       this.col = col;
//       this.row = row;
//     } else if(map.getCellAtPos(col, row).symbol == playerSymbol) {
//       level.updatePlayerHP(-1);
//     }
//   };
//   this.updatePositionAI = function() {
//     var player = level.getPlayer();
//     var dx = player.col - this.col;
//     var dy = player.row - this.row;

//     // if far from player, move randomly
//     if (Math.abs(dx) + Math.abs(dy) > randomMoveDif) {
//       var randPos = map.seekNextRandomPos(this.col, this.row);
//       this.updatePosition(randPos.col, randPos.row);  
//     } else {
//       if (Math.abs(dx) > Math.abs(dy)) {
//         if (dx < 0) {
//           // west
//           this.updatePosition(this.col - 1, this.row);
//         } else {
//           // east
//           this.updatePosition(this.col + 1, this.row);
//         }
//       } else {
//         if (dy < 0) {
//           // north
//           this.updatePosition(this.col, this.row - 1);
//         } else {
//           // down
//           this.updatePosition(this.col, this.row + 1);
//         }
//       }
//     }
//   };
//   this.updateHP = function(hp) {
//     this.hp += hp;
//     if (this.hp <= 0)
//       this.remove();
//   };
//   this.remove = function() {
//     var tile = map.getCellAtPos(this.col, this.row);
//     map.updateSymbol(this.col, this.row, floorSymbol, tile.originalColor);
//     level.removeEnemyAtPos(this.col, this.row);
//   };
// }