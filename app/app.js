(function(){
//TODO:
//
// refactor any remaining components to work properly
// make water work (other obstacles?)
// make water work so it can't obstruct hallways
// update enemy types for levelSetup
// add health for enemies
// add start menu
// add end menu
// add pause/info menu
// add info bar
// update level colors
// add health items
// add better health indication?
// look if camera follow with larger map is possible
// add key item(s)
// add unlockable exit (last level)
// add mobile playability
// add extra controls
// test all levels
// add a secret two player mode?
// add secret levels?
// add secret see-all mode?

/*var wallColors = [
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
];*/

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

/*var startLevelDescriptions = [
  'You are on top of a snow covered mountain, looking for a way in.',
  'You have entered the mountain, but must go deeper.',
  'You venture deeper, hearing groans from the undead.',
  'You venture deeper, feeling the heat from the lava inside the mountain.',
  'You venture into what seems like a dimension of the underworld.',
];*/


//var canvasWidth  = mapWidth;
//var canvasHeight = mapHeight;
//var canvasHeight = mapHeight + mapFontSize;

// var map = [];
// var gameDisplay = [];

var player;
var enemies = [];
// var currentLevelNum = 0;
// var currentLevel;
var maxLevelNum = 5;
var defaultMaxHp = 3;
var defaultEnemyHp = 1;

// var defaultMinCaves = 3;
// var defaultMaxCaves = 7;
// var defaultMinCaveSize = 80;
// var defaultMaxCaveSize = 20;
// var defaultMinEnemies = 3;
// var defaultMaxEnemies = 7;

var font = 'monospace';
var fontSize = 24;

var floorSymbol  = '.';
var wallSymbol   = '#';
var waterSymbol  = '~';
var playerSymbol = '@';
var exitSymbol   = '=';

var randomMoveDif = 6;

var menuBackgroundColor = '#000000';
var playerColor = '#0000cc';
var exitColor = '#9b3bff';

/*this.minCaves = defaultMinCaves + num;
  this.maxCaves = defaultMaxCaves + num;
  this.minEnemies = defaultMinEnemies + num;
  this.maxEnemies = defaultMaxEnemies + num;
  this.enemyTypes = num < enemyTypes.length ? enemyTypes[num] : enemyTypes[0];*/

var defaultNumCols = 48;
var defaultNumRows = 24;
var defaultWidth = defaultNumCols * fontSize * 0.6;
var defaultHeight = defaultNumRows * fontSize;
var canvasId = 'container';

var defaultMinCaveSize = 20;
var defaultMaxCaveSize = 80;

var levelSetup = function() {
  var curLevelNum = 0;
  var defaultMinCaves = 3;
  var defaultMaxCaves = 5;
  var defaultMinEnemies = 3;
  var defaultMaxEnemies = 7;
  var levels = [
    {
      wallColor: '#3b3b3b',
      floorColor: '#aaaaaa',
      waterColor: '#0000ff',
      backgroundColor: '#ffffff',
      minCaves: defaultMinCaves,
      maxCaves: defaultMaxCaves
    },
    {
      wallColor: '#3b3b3b',
      floorColor: '#999999',
      waterColor: '#0000ff',
      backgroundColor: '#aaaaaa',
      minCaves: defaultMinCaves,
      maxCaves: defaultMaxCaves
    },
    {
      wallColor: '#3b3b3b',
      floorColor: '#999999',
      waterColor: '#0000ff',
      backgroundColor: '#aaaaaa',
      minCaves: defaultMinCaves,
      maxCaves: defaultMaxCaves
    },
    {
      wallColor: '#3b3b3b',
      floorColor: '#737373',
      waterColor: '#0000ff',
      backgroundColor: '#999999',
      minCaves: defaultMinCaves,
      maxCaves: defaultMaxCaves
    },
    {
      wallColor: '#3b3b3b',
      floorColor: '#737373',
      waterColor: '#0000ff',
      backgroundColor: '#999999',
      minCaves: defaultMinCaves,
      maxCaves: defaultMaxCaves
    }
  ];
  var maxLevelNum = levels.length;
  return {
    getLevelNum: function() {
      return curLevelNum;
    },
    updateLevelNum: function(num) {
      curLevelNum = num > maxNumLevel ? maxNumLevel : num;
    },
    getWallColor: function() {
      return levels[curLevelNum].wallColor;
    },
    getFloorColor: function() {
      return levels[curLevelNum].floorColor;
    },
    getWaterColor: function() {
      return levels[curLevelNum].waterColor;
    },
    getBackgroundColor: function() {
      return levels[curLevelNum].backgroundColor;
    },
    getMinCaves: function() {
      return levels[curLevelNum].minCaves;
    },
    getMaxCaves: function() {
      return levels[curLevelNum].maxCaves;
    }
  };
}();

var game = new Phaser.Game(
  defaultWidth,
  defaultHeight,
  Phaser.AUTO,
  canvasId,
  {
    create: create
  }
);

// = new Level(currentLevelNum);

function create() {
  //$('#container').css('width', canvasWidth + 'px');
  //$('#container').css('margin', '0 auto');
  //$('#content').css('width', canvasWidth + 'px');
  //$('#content').css('margin', '0 auto');

  //controls
  spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  cursors = game.input.keyboard.createCursorKeys();

  cursors.left.onDown.add(moveWithKey, this);
  cursors.right.onDown.add(moveWithKey, this);
  cursors.up.onDown.add(moveWithKey, this);
  cursors.down.onDown.add(moveWithKey, this);

  //menu.setupStartMenu();

  /*var infoGraphics = game.add.graphics();
  infoGraphics.lineStyle(2, 0x000000, 1);
  infoGraphics.beginFill(0x000000, 1);
  infoGraphics.drawRect(0, mapHeight, canvasWidth, canvasHeight);*/

  //currentLevelNum;

  //game.stage.backgroundColor = levelSetup.getBackgroundColor();
  map.resetMap();
  map.initMap();
  map.digMap();
  map.digHallways();
  map.placeWater();
  //map.resetMap();
}

var menu = function() {
  var menuFontSize = 32;
  var menuFontColor = '#ffffff';
  var startText = 'Press Spacebar to Start';
  return {
    setupStartMenu: function() {
      game.stage.backgroundColor = menuBackgroundColor;
      game.add.text(
        game.width/2,
        game.height/2,
        startText,
        {
          font: menuFontSize + 'px ' + font,
          fill: menuFontColor
        }
      );
    }
  };
}();

var map = function() {
  var numCols = 48;
  var numRows = 24;

  var width = numCols * fontSize * 0.6;
  var height = numRows * fontSize;

  var grid = [];
  var display = [];

  var caveLocs = [];
  //var diggers = [];
  //var buildStatus = 'ready';
  //var hallwayDigger = 'ready';

  return {
    getNumCols: function() {
      //if (grid[0]) {
      //  return grid[0].length;
      //}
      return numCols;
    },
    getNumRows: function() {
      //if (grid) {
      //  return grid.length;
      //}
      return numRows;
    },
    getWidth: function() {
      return width;
    },
    getHeight: function() {
      return height;
    },
    getNumCaveLocs: function() {
      return caveLocs.length;
    },
    getAllPosWithSymbol: function(symbol) {
      var posList = [];
      for (var row = 0; row < grid.length; row++) {
        for (var col = 0; col < grid[row].length; col++) {
          if (grid[row][col] == symbol) {
            posList.push({col: col, row: row});
          }
        }
      }
      return posList;
    },
    //getCavePos: function(num) {
    //  return cavePos[num];
    //},
    //addCavePos: function(col, row) {
    //  cavePos.push({col: col, row: row});
    //},
    //addDigger: function(digger) {
    //  diggers.push(digger);
    //},
    //getDiggerAtIndex: function(index) {
    //  return diggers[index];
    //},
    //getNumDiggers: function() {
    //  return diggers.length;
    //},
    getMapGridAtPos: function(col, row) {
      return grid[row][col];
    },
    getMapDisplayAtPos: function(col, row) {
      return display[row][col];
    },
    setMapGridAtPos: function(col, row, tile) {
      grid[row][col] = tile;
    },
    setMapDisplayAtPos: function(col, row, symbol) {
      display[row][col] = symbol;
    },
    initMapRow: function(row) {
      grid[row] = [];
      display[row] = [];
    },
    seekNextRandomPos: function(col, row) {
      switch (Math.floor((Math.random() * 4) + 1)) {
        // north
        case 1:
          row = row - 1 >= 0 ? row - 1 : row;
          break;
        // east
        case 2:
          col = col + 1 < numCols ? col + 1 : col;
          break;
        // south
        case 3:
          row = row + 1 < numRows ? row + 1 : row;
          break;
        // west
        case 4:
          col = col - 1 >= 0 ? col - 1 : col;
          break;
      }
      return {col: col, row: row};
    },
    resetMap: function() {
      grid = [];
      display = [];
      caveLocs = [];
      /*diggers = [];
      buildStatus = 'ready';
      hallwayDigger = 'ready';*/
    },
    initMap: function() {
      game.stage.backgroundColor = levelSetup.getBackgroundColor();
      for (var row = 0; row < numRows; row++) {
        this.initMapRow(row);
        for (var col = 0; col < numCols; col++) {
          var tile = new Tile(col, row, wallSymbol, levelSetup.getWallColor());
          display[row][col] =  tile;
          grid[row][col] = wallSymbol;
        }
      }
    },
    digMap: function() {
      var numCaveDiggers = Math.floor((Math.random() * levelSetup.getMaxCaves()) + levelSetup.getMinCaves());
      for(var i = 0; i < numCaveDiggers; i++) {       
        var col = Math.floor(Math.random() * (numCols - 1));
        var row = Math.floor(Math.random() * (numRows - 1));
        var numBlocks = Math.floor((Math.random() * defaultMaxCaveSize) + defaultMinCaveSize);
        for (; numBlocks > 0; numBlocks--) {
          this.updateSymbolsChunk(col, row, floorSymbol, levelSetup.getFloorColor());
          //this.updateDisplayOriginalColors(col, row, currentLevel.floorColor);
          // this.updateDisplayOriginal
          // var tile = display[row][col];
          // if (tile) { tile.originalColor = current.floorColor };
    //if (tile !== null) { tile.originalColor = this.caveColor; }
    //tile = map.getMapDisplayAtPos(this.col, this.row - 1);
    //if (tile !== null) { tile.originalColor = this.caveColor; }
    //tile = map.getMapDisplayAtPos(this.col, this.row + 1);
    //if (tile !== null) { tile.originalColor = this.caveColor; }
    //tile = map.getMapDisplayAtPos(this.col - 1, this.row);
    //if (tile !== null) { tile.originalColor = this.caveColor; }
    //tile = map.getMapDisplayAtPos(this.col + 1, this.row);
    //if (tile !== null) { tile.originalColor = this.caveColor; }
          var randPos = this.seekNextRandomPos(col, row);
          col = randPos.col;
          row = randPos.row;
        }
        caveLocs.push({col: col, row: row});
      }
    },
    digHallways: function() {
      for (var caveIndex = 0; caveIndex < caveLocs.length - 1; caveIndex++) {
        //this.updateColor maybe?
        var curCaveLoc = caveLocs[caveIndex];
        var nextCaveLoc = caveLocs[caveIndex + 1];
        while (curCaveLoc.col != nextCaveLoc.col ||
            curCaveLoc.row != nextCaveLoc.row) {
          if (nextCaveLoc.row > curCaveLoc.row) {
            curCaveLoc.row = curCaveLoc.row + 1 <= numRows ? curCaveLoc.row + 1 : curCaveLoc.row; 
          } else if (nextCaveLoc.row < curCaveLoc.row) {
            curCaveLoc.row = curCaveLoc.row - 1 >= 0 ? curCaveLoc.row - 1 : curCaveLoc.row; 
          } else if (nextCaveLoc.col > curCaveLoc.col) {
            curCaveLoc.col = curCaveLoc.col + 1 <= numCols ? curCaveLoc.col + 1 : curCaveLoc.col; 
          } else if (nextCaveLoc.col < curCaveLoc.col) {
            curCaveLoc.col = curCaveLoc.col - 1 >= 0 ? curCaveLoc.col - 1 : curCaveLoc.col; 
          }
          this.updateSymbol(curCaveLoc.col, curCaveLoc.row, floorSymbol, levelSetup.getFloorColor());  
        }
      }
    },
    placeWater: function() {
      var numWaterPlacement = Math.floor(Math.random() * map.getNumCaveLocs());
      var availablePosList = this.getAllPosWithSymbol(floorSymbol);
      for(var i = 0; i < numWaterPlacement; i++) {
        //var col = Math.floor(Math.random() * (numCols - 1));
        //var row = Math.floor(Math.random() * (numRows - 1));
        //var randPos = this.seekNextRandomPos(col, row);
        //col = randPos.col;
        //row = randPos.row;
        var index = Math.floor((Math.random() * (availablePosList.length -1)));
        if (index >= 0) {
          var randPos = availablePosList[index];
          console.log('randPos: ' + randPos);
          console.log(randPos);
          var numBlocks = Math.floor((Math.random() * defaultMaxCaveSize/2) +
            defaultMinCaveSize/2);
          for (; numBlocks > 0; numBlocks--) {
            // console.log('numBlocks: ' + numBlocks);
            console.log(randPos.col);
            console.log(randPos.row);
            if (this.getMapGridAtPos(randPos.col, randPos.row) == floorSymbol/* || tempSymbol == waterSymbol*/) {
              this.updateSymbol(randPos.col, randPos.row, waterSymbol, levelSetup.getWaterColor());
              var tile = this.getMapDisplayAtPos(randPos.col, randPos.row);
              console.log('mapdisplaytile');
              console.log(tile);
              tile.updateSymbol(waterSymbol);
              tile.updateColor(levelSetup.getWaterColor());
            }
            randPos = this.seekNextRandomPos(randPos.col, randPos.row);
          }
        }
      }
    },
        /*for (; numBlocks > 0; numBlocks--) {
          var tempSymbol = this.getMapGridAtPos(col, row);
          if (tempSymbol == floorSymbol || tempSymbol == waterSymbol) {
            this.updateSymbol(col, row, waterSymbol, levelSetup.getWaterColor());
            var tile = this.getMapDisplayAtPos(col, row);
            tile.updateSymbol(waterSymbol);
            tile.updateColor(levelSetup.getWaterColor());
          }
        }
      }*/
      //var availablePosList = returnPosWithSymbol(floorSymbol);
     /* var numEnemies = Math.floor((Math.random() * levelSetup.getMaxEnemies()) + levelSetup.getMinEnemies());
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
  }*/
/*Drone.prototype.water = function(index) {
  var row = this.row;
  var column = this.column;
  switch(Math.floor((Math.random() * 4) + 1)) {
    //north
    case 1:
      row-1 >= 0 ? row-=1 : row=row;
      break;
    //east
    case 2:
      column+1 <= columns ? column+=1 : column=column;
      break;
    //south
    case 3:
      row+1 <= rows ? row+=1 : row=row;
      break;
    //west
    case 4:
      column-1 >= 0 ? column-=1 : column=column;
      break;
  }

  var temp_symbol = symbolAtPosition(row, column);
  if(temp_symbol == '.' || temp_symbol == this.mine_symbol)
  {
    updateSymbol(this.row, this.column, this.mine_symbol, this.mine_colour);
    var tile = tileAtPosition(this.row, this.column);
    tile.original_colour = this.mine_colour;
    tile.original_symbol = this.mine_symbol;
    updateSymbol(row,column,this.symbol,this.colour);
    this.column = column;
    this.row = row;
  }
  this.life--;
}*/
    /*updateBuildStatus: function(status) {
      buildStatus = status;
    },*/
    updateSymbol: function(col, row, symbol, color) {
      // console.log('isdig');
      if (typeof color === 'undefined') {
        color = levelSetup.getFloorColor(currentLevelNum);
      }
      if (display[row] && display[row][col]) {
        display[row][col].updateSymbol(symbol);
        display[row][col].updateColor(color);
        grid[row][col] = symbol;
      }
    },
    updateSymbolsChunk: function(col, row, symbol, color) {
      this.updateSymbol(col, row, symbol, color);
      this.updateSymbol(col, row - 1, symbol, color);
      this.updateSymbol(col, row + 1, symbol, color);
      this.updateSymbol(col - 1, row, symbol, color);
      this.updateSymbol(col + 1, row, symbol, color);
    },
    updateDisplayOriginalColors: function(col, row, color) {
      var tile = display[row][col];
      if (tile !== null) { tile.originalColor = color; }
      tile = display[row - 1][col];
      if (tile !== null) { tile.originalColor = color; }
      tile = display[row + 1][col];
      if (tile !== null) { tile.originalColor = color; }
      tile = display[row][col - 1];
      if (tile !== null) { tile.originalColor = color; }
      tile = display[row][col + 1];
      if (tile !== null) { tile.originalColor = color; }
    }
  };
}();

/*function initMap() {
  if(currentLevelNum > 0) {
    for (var row = 0; row < map.getNumRows(); row++) {
      for (var col = 0; col < map.getNumCols(); col++) {
        map.updateSymbol(col, row, wallSymbol, currentLevel.wallColor);
      }
    }
  } else {
    for (var row = 0; row < map.getNumRows(); row++) {
      map.initMapRow();
      for (var col = 0; col < map.getNumCols(); col++) {
        var tile = new Tile(col, row, wallSymbol, currentLevel.wallColor);
        console.log(tile);
        map.setMapDisplayAtPos(tile);
        map.setMapGridAtPos(wallSymbol);
      }
    }
  }
  //initDigging();
  //while (map.buildStatus != 'done') {
  //  buildLevel();
  //}
}*/

/*function updateSymbol(row, col, symbol, color) {
  if (typeof color === 'undefined') { 
    color = currentLevel.floorColor;
  }
  if (gameDisplay[row] && gameDisplay[row][col]) {
    gameDisplay[row][col].updateSymbol(symbol);
    gameDisplay[row][col].updateColor(color);
    map[row][col] = symbol;
  }
}*/




/*function initDigging() {
  var numCaveDiggers = Math.floor((Math.random() * currentLevel.maxCaves) + currentLevel.minCaves);
  console.log(numCaveDiggers);
  for(var i = 0; i < numCaveDiggers; i++) {
    var numBlocks = Math.floor((Math.random() * defaultMaxCaveSize) + defaultMinCaveSize);
    var col = Math.floor(Math.random() * (map.cols - 1));
    var row = Math.floor(Math.random() * (map.rows - 1));
    var digger = new MapGenerator(col, row, numBlocks);
    map.addDigger(digger);
    map.addCavePos(col, row);
    //cavePos.push({col: col, row: row});
  }
}*/

// function startLevel(num) {
  //currentLevel = new Level(currentLevelNum);
  //diggers = [];
  //cavePos = [];
  //enemies = [];
  //hallwayDigger = 'ready';
  //buildStatus = 'ready';
  // game.stage.backgroundColor = currentLevel.backgroundColor;
  // map.resetMap();
  // map.initMap();
  // map.digMap();
  // map.digHallways();
  //map.resetMap();
  // console.log('here2');
  //populateMap();
// }

/*function buildLevel() {
  //dig caves
  for(var i = 0; i < map.getNumDiggers(); i++) {
    // console.log(i);
    var digger = map.getDiggerAtIndex(i);
    if (map.getDiggerAtIndex(i).numBlocks > 0) {
      digger.digCave();
    } else {
      digger.end();
    }
  }*/

  //if (map.buildStatus == 'ready' && map.diggers.length === 0) {
    //initObstacleSetup();
    //buildStatus = 'obstacles';
    //map.buildStatus = 'hallways';
  //}
  
  //dig hallways
  /*if (map.buildStatus == 'hallways') {
    if (map.hallwayDigger == 'ready') {
      var start = map.getCavePos(0);
      map.hallwayDigger = new MapGenerator(start.col, start.row, 100);
    }
    if (map.hallwayDigger !== null && map.hallwayDigger != 'ready') {
      map.hallwayDigger.hallway();
    }
    if(map.hallwayDigger === null) {
      buildStatus = 'done';
    }
  }*/
  // map.buildStatus = 'done';
// }

/*function updateSymbol(row, col, symbol, color) {
  if (typeof color === 'undefined') { 
    color = currentLevel.floorColor;
  }
  if (gameDisplay[row] && gameDisplay[row][col]) {
    gameDisplay[row][col].updateSymbol(symbol);
    gameDisplay[row][col].updateColor(color);
    map[row][col] = symbol;
  }
}*/

function populateMap() {
  var availablePosList = returnPosWithSymbol(floorSymbol);
  var numEnemies = Math.floor((Math.random() * levelSetup.getMaxEnemies()) + levelSetup.getMinEnemies());
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
  var exitIndex = Math.floor((Math.random() * (availablePosList.length - 1)));
  var exitPos = availablePosList[exitIndex];
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

/*function symbolAtPos(x, y) {
  if (gameDisplay[y] && gameDisplay[y][x]) {
    return map[y][x];
  }
  return '';
}*/

/*function tileAtPos(x, y) {
  var tile = null;
  if (gameDisplay[y] && gameDisplay[y][x]) {
    return gameDisplay[y][x];
  }
  return tile;
}*/

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
  this.originalSymbol = symbol;
  this.symbol = symbol;
  this.originalColor = color;
  this.color = color;
  this.text = game.add.text(
    fontSize * 0.6 * x,
    fontSize * y,
    this.symbol,
    {
      font: fontSize + 'px ' + font,
      fill: this.color
    }
  );
  this.updateSymbol = function(symbol) {
    // console.log('aaaa ' + symbol);
    this.symbol = symbol;
    // console.log(this.text);
    this.text.setText(this.symbol);
  };
  this.updateColor = function(color) {
    this.color = color;
    this.text.setStyle({
      font: fontSize + 'px ' + font,
      fill: this.color
    });
  };
}

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
  this.updateHP = function(hp) {
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
  this.updatePosition = function(x, y) {
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
        startLevel(currentLevelNum);
      } else {
        gameOver();
      }
    }
    moveEnemiesAI();
  };
  this.updateHpText = function() {
    this.hpText.setText('HP: ' + this.hp + '/' + this.maxHp);
  };
}

function Enemy(x, y, symbol, color) {
  this.x = x;
  this.y = y;
  this.symbol = symbol;
  this.color = color;
  //this.originalColor = color;
  this.hp = defaultEnemyHp;
  updateSymbol(this.y, this.x, symbol, color);
  this.updatePosition = function(x, y) {
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
  this.updatePositionAI = function() {
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
  this.updateHP = function(hp) {
    this.hp += hp;
    if (this.hp <= 0) {
      this.remove();
    }
  };
  this.remove = function() {
    var tile = tileAtPos(this.x, this.y);
    updateSymbol(this.y, this.x, floorSymbol, tile.originalColor);
    //remove the enemy
    for (var x = 0; x < enemies.length; x++) {
      if(enemies[x].x == this.x && enemies[x].y == this.y) {
        enemies.splice(x, 1);
      }
    }
  };
}

/*function Level(num) {
  this.wallColor = num < wallColors.length ? wallColors[num] : wallColors[0];
  this.floorColor = num < floorColors.length ? floorColors[num] : wallColors[0];
  this.backgroundColor = num < backgroundColors.length ? backgroundColors[num] : backgroundColors[0];
  this.minCaves = defaultMinCaves + num;
  this.maxCaves = defaultMaxCaves + num;
  this.minEnemies = defaultMinEnemies + num;
  this.maxEnemies = defaultMaxEnemies + num;
  this.enemyTypes = num < enemyTypes.length ? enemyTypes[num] : enemyTypes[0];
}*/

/*function MapGenerator(startCol, startRow, numBlocks) {
  this.col = startCol;
  this.row = startRow;
  console.log(numBlocks);
  this.numBlocks = numBlocks;
  this.caveColor = currentLevel.floorColor;
  this.caveSymbol = floorSymbol;
  this.caveNum = 0;
  //map.updateSymbol(startCol, startRow, this.caveSymbol, this.caveColor);
}

MapGenerator.prototype.digCave = function() {
  if (this.numBlocks > 0) {
    map.updateSymbol(this.col, this.row, this.caveSymbol, this.caveColor);
    map.updateSymbol(this.col, this.row - 1, this.caveSymbol, this.caveColor);
    map.updateSymbol(this.col, this.row + 1, this.caveSymbol, this.caveColor);
    map.updateSymbol(this.col - 1, this.row, this.caveSymbol, this.caveColor);
    map.updateSymbol(this.col + 1, this.row, this.caveSymbol, this.caveColor);

    //updateSymbol(this.row, this.col, this.caveSymbol, this.caveColor);
    //updateSymbol(this.row - 1, this.col, this.caveSymbol, this.caveColor);
    //updateSymbol(this.row + 1, this.col, this.caveSymbol, this.caveColor);
    //updateSymbol(this.row, this.col - 1, this.caveSymbol, this.caveColor);
    //updateSymbol(this.row, this.col + 1, this.caveSymbol, this.caveColor);

    //change original color to new
    //var tile = map.getMapDisplayAtPos(this.col, this.row);
    //if (tile !== null) { tile.originalColor = this.caveColor; }
    //tile = map.getMapDisplayAtPos(this.col, this.row - 1);
    //if (tile !== null) { tile.originalColor = this.caveColor; }
    //tile = map.getMapDisplayAtPos(this.col, this.row + 1);
    //if (tile !== null) { tile.originalColor = this.caveColor; }
    //tile = map.getMapDisplayAtPos(this.col - 1, this.row);
    //if (tile !== null) { tile.originalColor = this.caveColor; }
    //tile = map.getMapDisplayAtPos(this.col + 1, this.row);
    //if (tile !== null) { tile.originalColor = this.caveColor; }

    switch (Math.floor((Math.random() * 4) + 1)) {
      case 1:
        this.row = this.row - 1 >= 0 ? this.row - 1 : this.row;
        break;
      case 2:
        this.col = this.col + 1 <= map.getNumCols() ? this.col + 1 : this.col;
        break;
      case 3:
        this.row = this.row + 1 <= map.getNumRows() ? this.row + 1 : this.row;
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
*/
})()