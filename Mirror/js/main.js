// 



"use strict";

// ----------------Globals-----------------
// Objects:
var game;
var player;
var playerTween;
var footstep;
var hud;
var debug;
var light;
var map;
var floorLayer;
var terrainLayer;
var objectLayer;
var marker;
var cursors;
var interactText;
var shadowTexture;
var gradient;
// Variable:
var playerTweenCompleted = true;
var playerOrientation = { up: false, down: true, left: false, right: false };
var frontObject = null;
// Tile-Map Constants:
var DOOR_CLOSED_INDEX = 17;
var DOOR_OPEN_INDEX = 18;
// Other Constants:
var GRID_SIZE = 32;
var PLAYER_WALKING_DRUATION = 250;
var LIGHT_RADIUS = 100;

window.onload = function() {	
	// define game
	game = new Phaser.Game(500, 500, Phaser.AUTO, 'myGame');
	
	// define states
	game.state.add('Title', Title);
	game.state.add('Play', Play);
	game.state.start('Title');
}