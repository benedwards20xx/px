// var font = 'monospace';
// var fontSize = 24;

// var floorSymbol  = '.';
// var wallSymbol   = '#';
// var waterSymbol  = '~';
// var playerSymbol = '@';
// var exitSymbol   = '=';
// var foodSymbol   = '%';

var emptyCell = '';

var menuBackgroundColor = '#000000';
var menuFontColor = '#ffffff';

var defaultBackgroundColor = '#000000';

var defaultNumCols = 3;
var defaultNumRows = 3;

var defaultCellDim = 50;
var defaultCellColor = '#ffffff';

var defaultWidth = defaultNumCols * defaultCellDim;
var defaultHeight = defaultNumRows * defaultCellDim;

// console.log("dW: " + defaultWidth);
// console.log("dH: " + defaultHeight);

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

  game.input.mouse.capture = true;
}