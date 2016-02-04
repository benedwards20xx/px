Readme file for Mountain Roguelike.

This game was created by Ben Edwards.

The game is hosted on Heroku at: https://mountainroguelike.herokuapp.com/

If the Heroku app is down or you would like to check out the game locally simply
clone this repository and open up the index.html.

This was created in an attempt to create a game that generates levels
procedurally, like a rogue-like. With that in mind I deciced to use text for 
graphics to make it look more in line with older games in the genre.

This is an HTML5 game placed inside of a "canvas" element in the main html page.
The Phaser (phaser.io) framework was used to easily place a game inside the 
canvas element, as well as add simple controls and graphics. 

The idea for story in the game is that the player starts out on a snowy 
mountain, finds a way in and ventures deeper into the mountain. Right now that
might not be entirely clear due to attempting to get the main focus of building 
a simple rogue-like finished. 

There are a number of features that I could add in the future.
  - mobile compatibility
  - potential algorithm improvements
  - add more obstacles
  - add health items
  - add keys or other item mechanics
  - make lava (late game water) dangerous
  - make more levels and balance levels a little better
  - update level looks

Controls for the game are:
  - Arrow keys: Move player
  - Spacebar: Proceed through menus and pause game

This game may  be incompatible with some browsers but was tested using Google 
Chrome and IE11.