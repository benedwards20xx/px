//TODO:
//
// refactor any remaining components to work properly
// make water work (other obstacles?)
// make water work so it can't obstruct hallways
// update enemy types for level
// add start menu
// add end menu
// can take out grid in map?

// look for places to update loops/deletion
// *** SEE BELOW ***
// var s = new Object();
// s[1] = 'bs';
// s[3] = 'as';
// console.log(s[3]); <- 'bs'
// delete s[3];
// console.log(s[3]); <- undefined

// add pause/info menu
// add info bar
// update level colors
// add health for enemies 
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


//var wolf = {symbol: 'w', color: '#3b3b3b', health: 1};
var creatures = {
  spider: { symbol: 's', color: '#663300', health: 1 },
  bat: { symbol: 'b', color: '#003399', health: 1 },
  zombie: { symbol: 'z', color: '#66ff66', health: 2 },
  demon: { symbol: 'd', color: '#ff0000', health: 3 }
};
  // spider: 
// ];
// var spider = {symbol: 's', color: '#663300', health: 1};
// var bat = {symbol: 'b', color: '#003399', health: 1};
// var zombie = {symbol: 'z', color: '#33cc33', health: 2};
// var demon = {symbol: 'd', color: '#ff0000', health: 3};

/*var apple = {symbol: 'a', color: '#ff0000'};
var key = {symbol: 'k', color: '#ffff00'};
var chest = {symbol: 'c', color: '#ffff00'};

var itemTypes = [
  [apple],
  [apple, key],
  [apple, key],
  [apple],
  [chest]
]*/

/*var startLevelDescriptions = [
  'You are on top of a snow covered mountain, looking for a way in.',
  'You have entered the mountain, but must go deeper.',
  'You venture deeper, hearing groans from the undead.',
  'You venture deeper, feeling the heat from the lava inside the mountain.',
  'You venture into what seems like a dimension of the underworld.',
];*/

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

var level = function() {
  var player;
  var enemies = [];
  var curLevelNum = 0;
  var defaultMinCaves = 3;
  var defaultMaxCaves = 5;
  var defaultMinEnemies = 3;
  var defaultMaxEnemies = 7;
  var levelData = [
    {
      wallColor: '#3b3b3b',
      floorColor: '#d9d9d9',
      waterColor: '#0099ff',
      backgroundColor: '#ffffff',
      enemyTypes: [creatures.spider]
    },
    {
      wallColor: '#3b3b3b',
      floorColor: '#b3b3b3',
      waterColor: '#0000ff',
      backgroundColor: '#d9d9d9',
      enemyTypes: [creatures.spider, creatures.bat]
    },
    {
      wallColor: '#3b3b3b',
      floorColor: '#8c8c8c',
      waterColor: '#0000ff',
      backgroundColor: '#b3b3b3',
      enemyTypes: [creatures.bat, creatures.zombie]
    },
    {
      wallColor: '#3b3b3b',
      floorColor: '#666666',
      waterColor: '#ff6600',
      backgroundColor: '#8c8c8c',
      enemyTypes: [creatures.zombie]
    },
    {
      wallColor: '#3b3b3b',
      floorColor: '#404040',
      waterColor: '#ff6600',
      backgroundColor: '#666666',
      enemyTypes: [creatures.demon]
    }
  ];
  var maxLevelNum = levelData.length;
  return {
    getPlayer: function() {
      return player;
    },
    initPlayerAtPos: function(col, row) {
      if (player) {
        player.updateSymbol(col, row, player.symbol, player.color);
      }
      player = new Player(col, row);
    },
    updatePlayerHP: function(hp) {
      player.updateHP(hp);
    },
    getEnemies: function() {
      return enemies;
    },
    isEnemySymbol: function(symbol) {
      for (var e in levelData[curLevelNum].enemyTypes) {
        if(levelData[curLevelNum].enemyTypes[e].symbol == symbol) {
          return true;
        }
      }
      return false;
    },
    getEnemyAtPos: function(col, row) {
      for (var e in enemies) {
        if(enemies[e].row == row && enemies[e].col == col) {
          return enemies[e];
        }
      }
      return null;
    },
    moveEnemiesAI: function() {
      for (var x in enemies) {
        enemies[x].updatePositionAI();
      }
    },
    addEnemy: function(enemy) {
      enemies.push(enemy);
    },
    removeEnemyAtPos: function(col, row) {
      for (var x = 0; x < enemies.length; x++) {
        if(enemies[x].col == col && enemies[x].row == row) {
          enemies.splice(x, 1);
          //delete enemies[x];
        }
      }
    },
    updateEnemyHPatPos: function(col, row, hp) {
      for (var e in enemies) {
        if(enemies[e].row == row && enemies[e].col == col) {
          enemies[e].updateHP(hp);
        }
      }
    },
    getLevelNum: function() {
      return curLevelNum;
    },
    updateLevelNum: function(num) {
      curLevelNum = num > maxLevelNum ? maxLevelNum : num;
    },
    getMaxLevelNum: function() {
      return maxLevelNum;
    },
    getWallColor: function() {
      return levelData[curLevelNum].wallColor;
    },
    getFloorColor: function() {
      return levelData[curLevelNum].floorColor;
    },
    getWaterColor: function() {
      return levelData[curLevelNum].waterColor;
    },
    getBackgroundColor: function() {
      return levelData[curLevelNum].backgroundColor;
    },
    getEnemyTypes: function() {
      return levelData[curLevelNum].enemyTypes;
    },
    getMinCaves: function() {
      return defaultMinCaves + curLevelNum;
    },
    getMaxCaves: function() {
      return defaultMaxCaves + curLevelNum;
    },
    getMinEnemies: function() {
      return defaultMinEnemies + curLevelNum;
    },
    getMaxEnemies: function() {
      return defaultMaxEnemies + curLevelNum;
    },
    startNewLevel: function() {
      enemies = [];
      //map.reset();
      map.init();
      map.digMap();
      map.placeWater();
      map.digHallways();
      map.populate();
    }
  };
}();

/*var menu = function() {
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
}();*/

var map = function() {
  var numCols = 48;
  var numRows = 24;

  var grid = [];
  var caveLocs = [];

  return {
    getNumCols: function() {
      return numCols;
    },
    getNumRows: function() {
      return numRows;
    },
    getNumCaveLocs: function() {
      return caveLocs.length;
    },
    getAllPosWithSymbol: function(symbol) {
      var posList = [];
      for (var row = 0; row < grid.length; row++) {
        for (var col = 0; col < grid[row].length; col++) {
          if (grid[row][col].symbol == symbol) {
            posList.push({col: col, row: row});
          }
        }
      }
      return posList;
    },
    isSymbolObstacleAtPos: function(col, row) {
      return grid[row][col].symbol != floorSymbol;
    },
    canReplaceFloorAtPos: function(col, row) {
      if (col - 1 >= 0 &&
        col + 1 < numCols &&
        row - 1 >= 0 &&
        row + 1 < numRows)
      {
        // north
        if (this.isSymbolObstacleAtPos(col, row - 1))
          return false;
        // north-east
        if (this.isSymbolObstacleAtPos(col + 1, row - 1))
          return false;
        // east
        if (this.isSymbolObstacleAtPos(col + 1, row))
          return false;
        // south-east
        if (this.isSymbolObstacleAtPos(col + 1, row + 1))
          return false;
        // south
        if (this.isSymbolObstacleAtPos(col, row + 1))
          return false;
        // south-west
        if (this.isSymbolObstacleAtPos(col - 1, row + 1))
          return false;
        // west
        if (this.isSymbolObstacleAtPos(col - 1, row))
          return false;
        // north-west
        if (this.isSymbolObstacleAtPos(col - 1, row - 1))
          return false;
        return true;
      } else {
        return false;
      }
    },
    getCellAtPos: function(col, row) {
      return grid[row][col];
    },
    //getMapDisplayAtPos: function(col, row) {
    //  return display[row][col];
    //},
    setCellAtPos: function(col, row, tile) {
      grid[row][col] = tile;
    },
    //setMapDisplayAtPos: function(col, row, symbol) {
    //  display[row][col] = symbol;
    //},
    //initMapRow: function(row) {
    //  grid[row] = [];
      //display[row] = [];
    //},
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
    reset: function() {
      /*if (grid) {
        for (var row = 0; row < numCols; row++) {
          grid[row] = [];  
          for (var col = 0; col < numCols; col++) {
            grid[row][col] = null;
          }
        }
      }*/
      //grid = [];
      //display = [];
      //caveLocs = [];
    },
    clear: function() {
      for (var row = 0; row < numRows; row++) {
        if (grid[row]) {
          for (var col = 0; col < numCols; col++) {
            if (grid[row][col]) {
              grid[row][col].removeTile();
            }
          }
        }
      }
    },
    init: function() {
      game.stage.backgroundColor = level.getBackgroundColor();
      caveLocs = [];
      for (var row = 0; row < numRows; row++) {
        if (grid[row]) {
          for (var col = 0; col < numCols; col++) {
            if (grid[row][col]) {
              grid[row][col].updateTile(wallSymbol, level.getWallColor());
            }
          }
        } else {
          grid[row] = [];
          // this.initMapRow(row);
          for (var col = 0; col < numCols; col++) {
            //if (grid[row][col]) {
            //  console.log('uh');
            //  grid[row][col].updateTile(wallSymbol, level.getWallColor());
            //} else {
            //  console.log('huh');
              var tile = new Tile(col, row, wallSymbol, level.getWallColor());
              grid[row][col] =  tile;  
            //}
            
            //grid[row][col] = wallSymbol;
          }
        }
      }
    },
    digMap: function() {
      var numCaveDiggers = Math.floor((Math.random() * level.getMaxCaves()) + level.getMinCaves());
      for(var i = 0; i < numCaveDiggers; i++) {       
        var col = Math.floor(Math.random() * (numCols - 1));
        var row = Math.floor(Math.random() * (numRows - 1));
        caveLocs.push({col: col, row: row});
        var numBlocks = Math.floor((Math.random() * defaultMaxCaveSize) + defaultMinCaveSize);
        for (; numBlocks > 0; numBlocks--) {
          this.updateSymbolsChunk(col, row, floorSymbol, level.getFloorColor());
          var randPos = this.seekNextRandomPos(col, row);
          col = randPos.col;
          row = randPos.row;
        }
        caveLocs.push({col: col, row: row});
      }
    },
    digHallways: function() {
      for (var caveIndex = 0; caveIndex < caveLocs.length - 1; caveIndex++) {
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
          this.updateSymbol(curCaveLoc.col, curCaveLoc.row, floorSymbol, level.getFloorColor());  
        }
      }
    },
    placeWater: function() {
      var numWaterPlacement = Math.floor(Math.random() * map.getNumCaveLocs());
      var availablePosList = this.getAllPosWithSymbol(floorSymbol);
      for(var i = 0; i < numWaterPlacement; i++) {
        var index = Math.floor((Math.random() * (availablePosList.length -1)));
        if (index >= 0) {
          var randPos = availablePosList[index];
          var numBlocks = Math.floor((Math.random() * defaultMaxCaveSize/3) +
            defaultMinCaveSize/3);
          for (; numBlocks > 0; numBlocks--) {
            if (this.getCellAtPos(randPos.col, randPos.row).symbol == wallSymbol) {
              this.updateSymbol(randPos.col, randPos.row, waterSymbol, level.getWaterColor());
            }
            else if (this.canReplaceFloorAtPos(randPos.col, randPos.row)) {
              this.updateSymbol(randPos.col, randPos.row, waterSymbol, level.getWaterColor());
            }
            availablePosList.splice(index, 1);
            randPos = this.seekNextRandomPos(randPos.col, randPos.row);
          }
        }
      }
    },
    populate: function() {
      var availablePosList = this.getAllPosWithSymbol(floorSymbol);
      // populate enemies
      var numEnemies = Math.floor((Math.random() * level.getMaxEnemies()) + level.getMinEnemies());
      for (var x = 0; x < numEnemies; x++) {
        var index = Math.floor((Math.random() * (availablePosList.length - 1)));
        if (index >= 0) {
          var pos = availablePosList[index];
          // console.log('level.getEnemyTypes()');
          // console.log(level.getEnemyTypes());
          var enemyTypes = level.getEnemyTypes();
          var enemyTypeIndex = Math.floor(Math.random() * enemyTypes.length);
          var enemyType = enemyTypes[enemyTypeIndex];
          var enemy = new Enemy(pos.col, pos.row, enemyType.symbol, enemyType.color);
          level.addEnemy(enemy);
          availablePosList.splice(index, 1);
        }
      }
      // place player
      var playerIndex = Math.floor((Math.random() * (availablePosList.length - 1)));
      var playerPos = availablePosList[playerIndex];
      var player = level.getPlayer();
      if (player) {
        player.updatePosition(playerPos.col, playerPos.row);
      } else {
        level.initPlayerAtPos(playerPos.col, playerPos.row);
      }
      availablePosList.splice(playerIndex, 1);
      // place exit
      var exitIndex = Math.floor((Math.random() * (availablePosList.length - 1)));
      var exitPos = availablePosList[exitIndex];
      map.updateSymbol(exitPos.col, exitPos.row, exitSymbol, exitColor);
    },
    updateSymbol: function(col, row, symbol, color) {
      if (typeof color === 'undefined') {
        color = level.getFloorColor(currentLevelNum);
      }
      if (grid[row] && grid[row][col]) {
        //display[row][col].updateTile(symbol, color);
        //grid[row][col] = symbol;
        grid[row][col].updateTile(symbol, color);
      }
    },
    updateSymbolsChunk: function(col, row, symbol, color) {
      this.updateSymbol(col, row, symbol, color);
      this.updateSymbol(col, row - 1, symbol, color);
      this.updateSymbol(col, row + 1, symbol, color);
      this.updateSymbol(col - 1, row, symbol, color);
      this.updateSymbol(col + 1, row, symbol, color);
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

  level.startNewLevel();
}

function moveWithKey(key) {
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
}

function gameOver(status) {
  console.log('gameOver');
  if (status = 'dead') {
    console.log('dead');
  } else if (status = 'win') {
    console.log('win');
  }
  map.clear();
  game.stage.backgroundColor = menuBackgroundColor;
}

//entities
function Tile(x, y, symbol, color) {
  //this.originalSymbol = symbol;
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
  this.updateTile = function(symbol, color) {
    this.symbol = symbol;
    this.text.setText(this.symbol);
    this.color = color;
    if (symbol == wallSymbol ||
      symbol == floorSymbol ||
      symbol == waterSymbol)
    {
      this.originalColor = color;
    }
    
    this.text.setStyle({
      font: fontSize + 'px ' + font,
      fill: this.color
    });
  };
  this.removeTile = function() {
    this.text.destroy();
  }
}

function Player(col, row) {
  this.col = col;
  this.row = row;
  this.color = '#0000cc';
  this.maxHp = defaultMaxHp;
  this.hp = this.maxHp;
  this.symbol = playerSymbol;
  /*this.hpText = game.add.text(
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
  );*/
  map.updateSymbol(col, row, playerSymbol, this.color);
  this.updateHP = function(hp) {
    if (this.hp + hp <= this.maxHp) {
      this.hp += hp;
      // this.updateHpText();
    }
    console.log('player hp: ' + this.hp);
    if (this.hp <= 0) {
      gameOver();
      var tile = map.getCellAtPos(this.col, this.row);
      map.updateSymbol(this.col, this.row, floorSymbol, tile.originalColor);
      player = null;
    }
  };
  this.updatePosition = function(col, row) {
    // this.descriptionText.setText('');
    var tile = map.getCellAtPos(col, row);
    if (typeof tile != 'undefined') {
      if(tile.symbol == floorSymbol) {
        // var tile = map.getCellAtPos(this.col, this.row);
        map.updateSymbol(this.col, this.row, floorSymbol, tile.originalColor);
        map.updateSymbol(col, row, this.symbol, this.color);
        this.col = col;
        this.row = row;
      } else if (level.isEnemySymbol(tile.symbol)) {
        var enemy = level.updateEnemyHPatPos(col, row, -1);
        // enemy.updateHP(-1);
      } else if (tile.symbol == exitSymbol) {
        var curLevelNum = level.getLevelNum();
        // console.log('curLevelNum ' + curLevelNum);
        if (curLevelNum < level.getMaxLevelNum()) {
          level.updateLevelNum(curLevelNum + 1);
          level.startNewLevel();
        } else {
          gameOver('win');
        }
      }
    }
    level.moveEnemiesAI();
  };
  /*this.updateHpText = function() {
    this.hpText.setText('HP: ' + this.hp + '/' + this.maxHp);
  };*/
}

function Enemy(col, row, symbol, color) {
  this.col = col;
  this.row = row;
  this.symbol = symbol;
  this.color = color;
  this.hp = defaultEnemyHp;
  map.updateSymbol(this.col, this.row, symbol, color);
  this.updatePosition = function(col, row) {
    if (map.getCellAtPos(col, row).symbol == floorSymbol) {
      var tile = map.getCellAtPos(this.col, this.row);
      map.updateSymbol(this.col, this.row, floorSymbol, tile.originalColor);
      map.updateSymbol(col, row, this.symbol, this.color);
      this.col = col;
      this.row = row;
    } else if(map.getCellAtPos(col, row).symbol == playerSymbol) {
      level.updatePlayerHP(-1);
    }
  };
  this.updatePositionAI = function() {
    var player = level.getPlayer();
    var dx = player.col - this.col;
    var dy = player.row - this.row;

    // if far from player, move randomly
    if (Math.abs(dx) + Math.abs(dy) > randomMoveDif) {
      var randPos = map.seekNextRandomPos(this.col, this.row);
      this.updatePosition(randPos.col, randPos.row);  
    } else {
      if (Math.abs(dx) > Math.abs(dy)) {
        if (dx < 0) {
          // west
          this.updatePosition(this.col - 1, this.row);
        } else {
          // east
          this.updatePosition(this.col + 1, this.row);
        }
      } else {
        if (dy < 0) {
          // north
          this.updatePosition(this.col, this.row - 1);
        } else {
          // down
          this.updatePosition(this.col, this.row + 1);
        }
      }
    }
  };
  this.updateHP = function(hp) {
    this.hp += hp;
    if (this.hp <= 0)
      this.remove();
  };
  this.remove = function() {
    var tile = map.getCellAtPos(this.col, this.row);
    map.updateSymbol(this.col, this.row, floorSymbol, tile.originalColor);
    level.removeEnemyAtPos(this.col, this.row);
  };
}