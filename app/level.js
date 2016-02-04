var creatures = {
  spider: { symbol: 's', color: '#663300' },
  bat: { symbol: 'b', color: '#003399' },
  zombie: { symbol: 'z', color: '#66ff66' },
  demon: { symbol: 'd', color: '#ff0000' }
};

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
  var maxLevelNum = levelData.length - 1;
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
      curLevelNum = num >= maxLevelNum ? maxLevelNum : num;
    },
    getMaxLevelNum: function() {
      console.log('maxLevelNum ' + maxLevelNum);
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