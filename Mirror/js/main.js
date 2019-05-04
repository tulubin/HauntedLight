// 



"use strict";

// define globals
var game;
var player;
var PLAYER_X_ACCELERATION = 50;
var PLAYER_Y_ACCELERATION = 50;

window.onload = function() {	
	// define game
	game = new Phaser.Game(750, 750, Phaser.AUTO, 'myGame');
	
	// define states
	game.state.add('Title', Title);
	game.state.add('Play', Play);
	game.state.start('Title');
}