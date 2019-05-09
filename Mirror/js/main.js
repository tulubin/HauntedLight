// 



"use strict";

// ----------------Globals-----------------
// Objects:
var game;
var player;
var playerTween;
var footstep;
var hud;
var map;
var floorLayer;
var terrainLayer;
var marker;
var cursors;
// Variable:
var currentDataString;
var playerTweenCompleted = true;
// Tile-Map Constants:
var DOOR_INDEX = 1;
// Other Constants:
var GRID_SIZE = 32;
var PLAYER_WALKING_DRUATION = 250;

window.onload = function() {	
	// define game
	game = new Phaser.Game(750, 750, Phaser.AUTO, 'myGame');
	
	// define states
	game.state.add('Title', Title);
	game.state.add('Play', Play);
	game.state.start('Title');
}