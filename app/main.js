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

var defaultNumCols = 3;
var defaultNumRows = 3;

var defaultBoxDim = 50;

var defaultWidth = defaultNumCols * defaultBoxDim;
var defaultHeight = defaultNumRows * defaultBoxDim;

console.log("dW: " + defaultWidth);
console.log("dH: " + defaultHeight);

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