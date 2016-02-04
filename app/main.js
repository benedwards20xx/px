var font = 'monospace';
var fontSize = 24;

var floorSymbol  = '.';
var wallSymbol   = '#';
var waterSymbol  = '~';
var playerSymbol = '@';
var exitSymbol   = '=';

var menuBackgroundColor = '#000000';
var menuFontColor = '#ffffff';

var defaultNumCols = 48;
var defaultNumRows = 24;
var defaultWidth = defaultNumCols * fontSize * 0.6;
var defaultHeight = defaultNumRows * fontSize + fontSize + 6;

// update object prototype for use
// Object.size = function(obj) {
//   var size = 0, key;
//   for (key in obj) {
//       if (obj.hasOwnProperty(key)) size++;
//   }
//   return size;
// };

var game = new Phaser.Game(
  defaultWidth,
  defaultHeight,
  Phaser.AUTO,
  'container',
  { create: create }
);

function create() {
  game.state.add('startMenu', startMenu);
  game.state.add('play', play);
  game.state.add('gameOver', gameOver);
  game.state.start('startMenu');
}