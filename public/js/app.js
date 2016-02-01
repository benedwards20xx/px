//TODO:
//
// test all levels
// add health into enemies
// change updateSymbol to have x, y instead of y, x
// work on obstacles
// add start screen
// add end/restart screen
// add items - health, keys, treasure chest
// a little darker each level? 

var mapRows = 24;
var mapCols = 48;

var floorSymbol  = '.';
var wallSymbol   = '#';
var playerSymbol = '@';
var exitSymbol   = '=';

var wallColors = [
  '#3b3b3b',
  '#3b3b3b',
  '#3b3b3b',
  '#3b3b3b',
  '#3b3b3b'
];
var floorColors = [
  '#aaaaaa',
  '#999999',
  '#999999',
  '#737373',
  '#737373'
];
var backgroundColors = [
  '#ffffff',
  '#aaaaaa',
  '#aaaaaa',
  '#999999',
  '#999999'
];

//var wolf = {symbol: 'w', color: '#3b3b3b', health: 1};
var spider = {symbol: 's', color: '#663300', health: 1};
var bat = {symbol: 'b', color: '#003399', health: 1};
var zombie = {symbol: 'z', color: '#33cc33', health: 2};
var demon = {symbol: 'd', color: '#ff0000', health: 3};

var enemyTypes = [
  [spider],
  [spider, bat],
  [bat, zombie],
  [zombie],
  [demon]
];

var apple = {symbol: 'a', color: '#ff0000'};
var key = {symbol: 'k', color: '#ffff00'};
var chest = {symbol: 'c', color: '#ffff00'};

var itemTypes = [
  [apple],
  [apple, key],
  [apple, key],
  [apple],
  [chest]
]

var randomMoveDif = 6;

/*var startLevelDescriptions = [
  'You are on top of a snow covered mountain, looking for a way in.',
  'You have entered the mountain, but must go deeper.',
  'You venture deeper, hearing groans from the undead.',
  'You venture deeper, feeling the heat from the lava inside the mountain.',
  'You venture into what seems like a dimension of the underworld.',
];*/

var playerColor = '#0000cc';
var exitColor = "#9B3BFF";

var mapFont = 'monospace';
var mapFontSize = 24;

var mapWidth  = mapCols * mapFontSize * 0.6;
var mapHeight = mapRows * mapFontSize;
var canvasWidth  = mapWidth;
var canvasHeight = mapHeight + mapFontSize;

var map = [];
var gameDisplay = [];
var cavePos = [];
var buildStatus = 'ready';

var defaultMinCaves = 3;
var defaultMaxCaves = 7;
var defaultMinCaveSize = 80;
var defaultMaxCaveSize = 20;
var defaultMinEnemies = 3;
var defaultMaxEnemies = 7;

var diggers = [];
var hallwayDigger = 'ready';
var player;
var actorList;
var enemies = [];
var currentLevelNum = 0;
var maxLevelNum = 5;
var defaultMaxHp = 3;
var defaultEnemyHp = 1;

// initialize phaser, call create() once done
var game = new Phaser.Game(
  canvasWidth,
  canvasHeight,
  Phaser.AUTO,
  'container',
  {
    create: create
  }
);

var currentLevel = new Level(currentLevelNum);
var enemyMovementEvent;

function create() {
  //$('#container').css('width', canvasWidth + 'px');
  //$('#container').css('margin', '0 auto');
  //$('#content').css('width', canvasWidth + 'px');
  //$('#content').css('margin', '0 auto');

  spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  cursors = game.input.keyboard.createCursorKeys();

  cursors.left.onDown.add(moveWithKey, this);
  cursors.right.onDown.add(moveWithKey, this);
  cursors.up.onDown.add(moveWithKey, this);
  cursors.down.onDown.add(moveWithKey, this);

  var infoGraphics = game.add.graphics();
  infoGraphics.lineStyle(2, 0x000000, 1);
  infoGraphics.beginFill(0x000000, 1);
  infoGraphics.drawRect(0, mapHeight, canvasWidth, canvasHeight);

  startLevel(currentLevelNum);
}

function initMap() {
  if(currentLevelNum > 0) {
    for (var y = 0; y < mapRows; y++) {
      for (var x = 0; x < mapCols; x++) {
        updateSymbol(y, x, wallSymbol, currentLevel.wallColor);
      }
    }
  } else {
    for (var y = 0; y < mapRows; y++) {
      map[y] = [];
      gameDisplay[y] = [];
      for (var x = 0; x < mapCols; x++) {
        var tile = new Tile(x, y, wallSymbol, currentLevel.wallColor);
        gameDisplay[y][x] = tile;
        map[y][x] = wallSymbol;
      }
    }
  }
  initDigging();
  while (buildStatus != 'done') {
    buildLevel();
  }
}

function initDigging() {
  var numCaveDiggers = Math.floor((Math.random() * currentLevel.maxCaves) + currentLevel.minCaves);
  for(var i = 0; i < numCaveDiggers; i++) {
    var numBlocks = Math.floor((Math.random() * defaultMaxCaveSize) + defaultMinCaveSize);
    var col = Math.floor(Math.random() * (mapCols - 1));
    var row = Math.floor(Math.random() * (mapRows - 1));
    var digger = new MapGenerator(col, row, numBlocks);
    diggers.push(digger);
    cavePos.push({col: col, row: row});
  }
}

function startLevel(num) {
  currentLevel = new Level(currentLevelNum);
  diggers = [];
  cavePos = [];
  enemies = [];
  hallwayDigger = 'ready';
  buildStatus = 'ready';
  game.stage.backgroundColor = currentLevel.backgroundColor;
  initMap();
  populateMap();
}

function buildLevel() {
  //dig caves
  for(var i in diggers) {
    if (diggers[i].numBlocks > 0) {
      diggers[i].digCave();
    } else {
      diggers[i].end();
    }
  }

  if (buildStatus == 'ready' && diggers.length === 0) {
    //initObstacleSetup();
    //buildStatus = 'obstacles';
    buildStatus = 'hallways';
  }
  
  //dig hallways
  if (buildStatus == 'hallways') {
    if (hallwayDigger == 'ready') {
      var start = cavePos[0];
      hallwayDigger = new MapGenerator(start.col, start.row, 100);
    }
    if (hallwayDigger !== null && hallwayDigger != 'ready') {
      hallwayDigger.hallway();
    }
    if(hallwayDigger === null) {
      buildStatus = 'done';
    }
  }
}

function updateSymbol(row, col, symbol, color) {
  if (typeof color === 'undefined') { 
    color = currentLevel.floorColor;
  }
  if (gameDisplay[row] && gameDisplay[row][col]) {
    gameDisplay[row][col].updateSymbol(symbol);
    gameDisplay[row][col].updateColor(color);
    map[row][col] = symbol;
  }
}

function populateMap() {
  var availablePosList = returnPosWithSymbol(floorSymbol);
  var numEnemies = Math.floor((Math.random() * currentLevel.maxEnemies) + currentLevel.minEnemies);
  for (var x = 0; x < numEnemies; x++) {
    var index = Math.floor((Math.random() * (availablePosList.length - 1)));
    if (index >= 0) {
      var pos = availablePosList[index];
      var enemyTypeIndex = Math.floor(Math.random() * currentLevel.enemyTypes.length);
      var enemyType = currentLevel.enemyTypes[enemyTypeIndex];
      var enemy = new Enemy(pos.col, pos.row, enemyType.symbol, enemyType.color);
      enemies.push(enemy);
      availablePosList.splice(index, 1);
    }
  }

  //place player
  var playerIndex = Math.floor((Math.random() * (availablePosList.length - 1)));
  var playerPos = availablePosList[playerIndex];
  if (player) {
    player.updatePosition(playerPos.col, playerPos.row);
  } else {
    player = new Player(playerPos.col, playerPos.row);
  }

  //place exit
  console.log('place exit');
  var exitIndex = Math.floor((Math.random() * (availablePosList.length - 1)));
  var exitPos = availablePosList[exitIndex];
  console.log('exitPos');
  console.log(exitPos);
  updateSymbol(exitPos.row, exitPos.col, exitSymbol, exitColor);
}

function returnPosWithSymbol(symbol) {
  var posList = [];
  for (var y = 0; y < map.length; y++) {
    for (var x = 0; x < map[y].length; x++) {
      if (map[y][x] == symbol) {
        posList.push({col: x, row: y});
      }
    }
  }
  return posList;
}

function returnEnemyAtPos(x, y) {
  for (var e in enemies) {
    if(enemies[e].y == y && enemies[e].x == x) {
      return enemies[e];
    }
  }
  return null;
}

function isEnemySymbol(symbol) {
  for (var e in currentLevel.enemyTypes) {
    if (currentLevel.enemyTypes[e].symbol == symbol) {
      return true;
    }
  }
  return false;
}

function moveWithKey(key) {
  if(player !== null) {
    if(key.event.keyIdentifier == "Left")
    {
      player.updatePosition(player.x - 1, player.y);
    }
    else if(key.event.keyIdentifier == "Right") {
      player.updatePosition(player.x + 1, player.y);
    }
    else if(key.event.keyIdentifier == "Up") {
      player.updatePosition(player.x, player.y - 1);
    }
    else if(key.event.keyIdentifier == "Down") {
      player.updatePosition(player.x, player.y + 1);
    }
  }
}

function symbolAtPos(x, y) {
  if (gameDisplay[y] && gameDisplay[y][x]) {
    return map[y][x];
  }
  return '';
}

function tileAtPos(x, y) {
  var tile = null;
  if (gameDisplay[y] && gameDisplay[y][x]) {
    return gameDisplay[y][x];
  }
  return tile;
}

/*function moveEnemies() {
  for (var e in enemies) {
    var y = enemies[e].y;
    var x = enemies[e].x;
    switch(Math.floor((Math.random() * 4) + 1)) {
      case 1:
        y = y - 1 > 0 ? y - 1 : y;
        break;
      case 2:
        x = x + 1 < mapCols ? x += 1 : x;
        break;
      case 3:
        y = y + 1 < mapRows ? y += 1 : y;
        break;
      case 4:
        x = x - 1 > 0 ? x -= 1 : x;
        break;
    }
    enemies[e].updatePosition(col, row);
  }
}*/

function moveEnemiesAI() {
  for (var x in enemies) {
    enemies[x].updatePositionAI();
  }
}

function gameOver() {

}

//entities
function Tile(x, y, symbol, color) {
  this.symbol = symbol;
  this.originalColor = color;
  this.color = color;
  this.originalSymbol = symbol;
  this.text = game.add.text(
    mapFontSize * 0.6 * x,
    mapFontSize * y,
    this.symbol,
    {
      font: mapFontSize + 'px ' + mapFont,
      fill: this.color
    }
  );
}

Tile.prototype.updateSymbol = function(symbol) {
  this.symbol = symbol;
  this.text.setText(this.symbol);
};

Tile.prototype.updateColor = function(color) {
  this.color = color;
  this.text.setStyle({
    font: mapFontSize + 'px ' + mapFont,
    fill: this.color
  });
};

function Player(x, y) {
  this.x = x;
  this.y = y;
  this.color = playerColor;
  this.maxHp = defaultMaxHp;
  this.hp = this.maxHp;
  this.symbol = playerSymbol;
  this.hpText = game.add.text(
    0,
    mapHeight,
    'HP: ' + this.hp + '/' + this.maxHp,
    {
      font: mapFontSize + 'px ' + mapFont,
      fill: '#fff',
      align: 'left'
    }
  );
  this.descriptionText = game.add.text(
    0,
    mapHeight + mapFontSize,
    '',
    {
      font: mapFontSize + 'px ' + mapFont,
      fill: '#fff',
      align: 'left'
    }
  );
  updateSymbol(y, x, playerSymbol, this.color);
}

Player.prototype.updateHpText = function() {
  this.hpText.setText('HP: ' + this.hp + '/' + this.maxHp);
};

Player.prototype.updatePosition = function(x, y) {
  this.descriptionText.setText('');
  var sym = symbolAtPos(x, y);
  if(sym == floorSymbol) {
    var tile = tileAtPos(this.x, this.y);
    updateSymbol(this.y, this.x, floorSymbol, tile.originalColor);
    updateSymbol(y, x, this.symbol, this.color);
    this.x = x;
    this.y = y;
  } else if (isEnemySymbol(sym)) {
    var enemy = returnEnemyAtPos(x, y);
    enemy.updateHP(-1);
  } else if (sym == exitSymbol) {
    //reset();
    if (currentLevelNum <= maxLevelNum) {
      currentLevelNum++;
      game.time.events.remove(enemyMovementEvent);
      startLevel(currentLevelNum);
    } else {
      gameOver();
    }
  }
  moveEnemiesAI();
};

Player.prototype.updateHP = function(hp) {
  if (this.hp + hp <= this.maxHp) {
    this.hp += hp;
    this.updateHpText();
  }
  if (this.hp <= 0) {
    gameOver();
    var tile = tileAtPos(this.x, this.y);
    updateSymbol(this.y, this.x, floorSymbol, tile.originalColor);
    player = null;
  }
};

function Enemy(x, y, symbol, color) {
  this.x = x;
  this.y = y;
  this.symbol = symbol;
  this.color = color;
  //this.originalColor = color;
  this.hp = defaultEnemyHp;
  updateSymbol(this.y, this.x, symbol, color);
}

Enemy.prototype.updatePosition = function(x, y) {
  if (symbolAtPos(x, y) == floorSymbol) {
    var tile = tileAtPos(this.x, this.y);
    updateSymbol(this.y, this.x, floorSymbol, tile.originalColor);
    updateSymbol(y, x, this.symbol, this.color);
    this.x = x;
    this.y = y;
  } else if(symbolAtPos(x, y) == playerSymbol) {
    player.updateHP(-1);
  }
};

Enemy.prototype.updatePositionAI = function() {
  var dx = player.x - this.x;
  var dy = player.y - this.y;

  if (Math.abs(dx) + Math.abs(dy) > randomMoveDif) {
    switch(Math.floor((Math.random() * 4) + 1)) {
      case 1:
        if (this.y - 1 > 0)
          this.updatePosition(this.x, this.y - 1);
        break;
      case 2:
        if (this.x + 1 < mapCols)
          this.updatePosition(this.x + 1, this.y);
        break;
      case 3:
        if (this.y + 1 > mapRows)
          this.updatePosition(this.x, this.y + 1);
        break;
      case 4:
        if (this.x - 1 > 0)
          this.updatePosition(this.x - 1, this.y);
        break;
    }
    
  }

  if (Math.abs(dx) > Math.abs(dy)) {
    if (dx < 0) {
      //left
      this.updatePosition(this.x - 1, this.y);
    } else {
      //right
      this.updatePosition(this.x + 1, this.y);
    }
  } else {
    if (dy < 0) {
      //up
      this.updatePosition(this.x, this.y - 1);
    } else {
      //down
      this.updatePosition(this.x, this.y + 1);
    }
  }
};

Enemy.prototype.updateHP = function(hp) {
  this.hp += hp;
  if (this.hp <= 0) {
    this.remove();
  }
};

Enemy.prototype.remove = function() {
  var tile = tileAtPos(this.x, this.y);
  updateSymbol(this.y, this.x, floorSymbol, tile.originalColor);
  //remove the enemy
  for (var x = 0; x < enemies.length; x++) {
    if(enemies[x].x == this.x && enemies[x].y == this.y) {
      enemies.splice(x, 1);
    }
  }
};

function Level(num) {
  this.wallColor = num < wallColors.length ? wallColors[num] : wallColors[0];
  this.floorColor = num < floorColors.length ? floorColors[num] : wallColors[0];
  this.backgroundColor = num < backgroundColors.length ? backgroundColors[num] : backgroundColors[0];
  this.minCaves = defaultMinCaves + num;
  this.maxCaves = defaultMaxCaves + num;
  this.minEnemies = defaultMinEnemies + num;
  this.maxEnemies = defaultMaxEnemies + num;
  this.enemyTypes = num < enemyTypes.length ? enemyTypes[num] : enemyTypes[0];
}

function MapGenerator(startCol, startRow, numBlocks) {
  this.col = startCol;
  this.row = startRow;
  this.numBlocks = numBlocks;
  this.caveColor = currentLevel.floorColor;
  this.caveSymbol = floorSymbol;
  this.caveNum = 0;
  updateSymbol(this.row, this.col, this.caveSymbol, this.caveColor);
}

MapGenerator.prototype.digCave = function() {
  if (this.numBlocks > 0) {
    updateSymbol(this.row, this.col, this.caveSymbol, this.caveColor);
    updateSymbol(this.row - 1, this.col, this.caveSymbol, this.caveColor);
    updateSymbol(this.row + 1, this.col, this.caveSymbol, this.caveColor);
    updateSymbol(this.row, this.col - 1, this.caveSymbol, this.caveColor);
    updateSymbol(this.row, this.col + 1, this.caveSymbol, this.caveColor);

    //change original color to new
    var tile = tileAtPos(this.col, this.row);
    if (tile !== null) { tile.originalColor = this.caveColor; }
    tile = tileAtPos(this.col, this.row - 1);
    if (tile !== null) { tile.originalColor = this.caveColor; }
    tile = tileAtPos(this.col, this.row + 1);
    if (tile !== null) { tile.originalColor = this.caveColor; }
    tile = tileAtPos(this.col - 1, this.row);
    if (tile !== null) { tile.originalColor = this.caveColor; }
    tile = tileAtPos(this.col + 1, this.row);
    if (tile !== null) { tile.originalColor = this.caveColor; }

    switch (Math.floor((Math.random() * 4) + 1)) {
      case 1:
        this.row = this.row - 1 >= 0 ? this.row - 1 : this.row;
        break;
      case 2:
        this.col = this.col + 1 <= mapCols ? this.col + 1 : this.col;
        break;
      case 3:
        this.row = this.row + 1 <= mapRows ? this.row + 1 : this.row;
        break;
      case 4:
        this.col = this.col - 1 >= 0 ? this.col - 1 : this.col;
        break;
    }

    this.numBlocks--;
  }
};

MapGenerator.prototype.hallway = function(index) {
  var nextPos = cavePos[this.caveNum];
  var tile = tileAtPos(this.row, this.col);
  if (tile !== null) { tile.originalColor = this.caveColor; }
  tile = tileAtPos(this.col, this.row - 1);
  if (tile !== null) { tile.originalColor = this.caveColor; }
  tile = tileAtPos(this.col, this.row + 1);
  if (tile !== null) { tile.originalColor = this.caveColor; }
  tile = tileAtPos(this.col - 1, this.row);
  if (tile !== null) { tile.originalColor = this.caveColor; }
  tile = tileAtPos(this.col + 1, this.row);
  if (tile !== null) { tile.originalColor = this.caveColor; }
  
  if (nextPos.row > this.row) {
    this.row = this.row + 1 <= mapRows ? this.row + 1 : this.row;
  } else if (nextPos.row < this.row) {
    this.row = this.row - 1 >= 0 ? this.row - 1 : this.row;
  } else if (nextPos.col > this.col) {
    this.col = this.col + 1 <= mapCols ? this.col + 1 : this.col;
  } else if (nextPos.col < this.col) {
    this.col = this.col - 1 >= 0 ? this.col - 1 : this.col;
  }

  updateSymbol(this.row, this.col, this.caveSymbol, this.caveColor);
  
  if (this.col == nextPos.col && this.row == nextPos.row) {
    var nextCaveNum = this.caveNum + 1;
    if (cavePos[nextCaveNum]) {
      this.caveNum = nextCaveNum;
      var nextCavePos = cavePos[nextCaveNum];
    } else {
      updateSymbol(this.row, this.col, this.caveSymbol, this.caveColor);
      hallwayDigger = null;
    }
  }
};

MapGenerator.prototype.end = function(index) {
  updateSymbol(this.row, this.col, this.caveSymbol, this.caveColor);
  updateSymbol(this.row - 1, this.col, this.caveSymbol, this.caveColor);
  updateSymbol(this.row + 1, this.col, this.caveSymbol, this.caveColor);
  updateSymbol(this.row, this.col - 1, this.caveSymbol, this.caveColor);
  updateSymbol(this.row, this.col + 1, this.caveSymbol, this.caveColor);
  diggers.splice(index, 1);
};