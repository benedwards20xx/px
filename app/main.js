var font = 'monospace';
var fontSize = 24;

// var floorSymbol  = '.';
// var wallSymbol   = '#';
// var waterSymbol  = '~';
// var playerSymbol = '@';
// var exitSymbol   = '=';
// var foodSymbol   = '%';

var menuBackgroundColor = '#000000';
var menuFontColor = '#ffffff';

var defaultNumCols = 3;
var defaultNumRows = 3;
var defaultWidth = defaultNumCols * fontSize * 0.6;
var defaultHeight = defaultNumRows * fontSize + fontSize + 6;

var game = new Phaser.Game(
  defaultWidth,
  defaultHeight,
  Phaser.AUTO,
  'container',
  { create: create }
);

function create() {
  //game.state.add('startMenu', startMenu);
  game.state.add('play', play);
  //game.state.add('gameOver', gameOver);
  //game.state.start('startMenu');
  game.state.start('play');
}