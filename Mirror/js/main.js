// GitHub link:
// https://github.com/tulubin/UCSC_120_Game_Project

// Group Member:
// Lubin Tu
// Ang Li
// Xueer Zhu

"use strict";

// ----------------Globals-----------------
// Objects:
var game;
var player;
var shadow;
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
var timer;
var decorations;
// Variable:
var frontObject = null;
var frontObjectIndex = -1;
var touch_counter = 0;
var directionAngle = 270*Math.PI/180;
// Tile-Map Constants:
var DOOR_CLOSED_INDEX = 1;
var DOOR_OPEN_INDEX = 2;
var CLOTH_GOOD_INDEX = 25;
var CLOTH_BREAK_INDEX = 28;
var BALL_GOOD_INDEX = 29;
var BALL_BREAK_INDEX = 30;
var CASE_GOOD_INDEX = 31;
var CASE_BREAK_INDEX = 32;
var RING_GOOD_INDEX = 33;
var RING_BREAK_INDEX = 34;
var MIRROR_GOOD_INDEX = 26;
var MIRROR_BREAK_INDEX = 27;
var MIRROR_TOUCHED = false;
// Light Constants:
var LIGHT_ANGLE = Math.PI*0.4;
var NUMBER_OF_RAYS = LIGHT_ANGLE*50;
var RAY_LENGTH = 120;
// Other Constants:
var GRID_SIZE = 32;
var CONTROL_RESPONSE_DELAY = 150;


window.onload = function() {	
	// define game
	game = new Phaser.Game(640, 360, Phaser.AUTO, 'myGame');
	
	// define states
	game.state.add('Title', Title);
	game.state.add('Play', Play);
	game.state.add('End', End);
	game.state.start('Title');
}