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
      // if (grid) {
      //   for (var row = 0; row < numCols; row++) {
      //     grid[row] = [];  
      //     for (var col = 0; col < numCols; col++) {
      //       grid[row][col] = null;
      //     }
      //   }
      // }
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