// 



"use strict";

// define globals
var game;
var player;
var PLAYER_WALKING_DRUATION = 1500;
var WORLD_SIZE = 2880;
var GRID_SIZE = 32;
// var playerTween;
var footstep;
var playerTweenCompleted = true;
var hud;
// var timer;
// var count;
// var map;
// var mapLayer;

window.onload = function() {	
	// define game
	game = new Phaser.Game(750, 750, Phaser.AUTO, 'myGame');
	
	// define states
	game.state.add('Title', Title);
	game.state.add('Play', Play);
	game.state.start('Title');
}