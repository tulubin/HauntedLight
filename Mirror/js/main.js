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
// Tile-Map Constants:
var DOOR_1_INDEX = 159;
var CLOSET_1_INDEX = 119;
var CLOSET_2_INDEX = 123;
var DESK_1_INDEX = 135;
var DESK_2_INDEX = 139;
var BED_1_INDEX = 151;
var BED_2_INDEX = 155;
var MIRROR_1_INDEX = 192;
var CHEST_FLASHLIGHT_INDEX = 185;
// Other Constants:
var GRID_SIZE = 32;
var CONTROL_RESPONSE_DELAY = 150;
var DARK_TINT = '0x808080';
var LIGHT_TINT = '0xd9d9d9';


window.onload = function () {
	// define game
	game = new Phaser.Game(640, 480, Phaser.AUTO, 'myGame');

	// define states
	game.state.add('Title', Title);
	game.state.add('Play', Play);
	game.state.add('End', End);
	game.state.start('Title');
}