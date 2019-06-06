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
var hud;
var camera;
var huanted;
// Variables:
var playerMaxHP = 100;
var playerMaxMP = 100;
var playerMaxBattery = 100;
var tutorialOn = true;
// Tile-Map Constants:
var PRISON_DOOR_INDEX = 159;
var HIDDEN_DOOR_INDEX = 271;
var DOOR_1_INDEX = 165; // closed door index is this +1, broken version is this +2 and +3
var CLOSET_1_INDEX = 119; // those are 64x64 objects and placed in order in the tileset, so this +1 means right half of this whole object, this +2 +3 stand for closed version.
var CLOSET_2_INDEX = 123;
var DESK_1_INDEX = 135;
var DESK_2_INDEX = 139;
var BED_1_INDEX = 151;
var BED_2_INDEX = 155;
var MIRROR_1_INDEX = 192;
var CLOSET_1_R_INDEX = 215;
var CLOSET_2_R_INDEX = 219;
var DESK_1_R_INDEX = 229;
var DESK_2_R_INDEX = 231;
var BED_1_R_INDEX = 233;
var BED_2_R_INDEX = 235;
var CHEST_FLASHLIGHT_INDEX = 185;
var PUZZLE_COLOR_BLOCK_YELLOW_INDEX = 34;
var PUZZLE_COLOR_BLOCK_BLUE_INDEX = 35;
var PUZZLE_COLOR_BLOCK_GREEN_INDEX = 29;
var PUZZLE_COLOR_BLOCK_RED_INDEX = 30;
var PUZZLE_TRIGGER_1_INDEX = 175;
// Other Constants:
var GRID_SIZE = 32;
var CONTROL_RESPONSE_DELAY = 150;
var RED_TINT = '0xff0000';
var DARK_TINT = '0x808080';
var LIGHT_TINT = '0xd9d9d9';
var PRESS_TINT = '0x66ff66';
var RESET_TINT = '0xFFFFFF';
var DEFAULT_VISION_LENGTH = 35;
var DEFAULT_FLISHLIGHT_LENGTH = 120;
var DEFAULT_VISION_ANGLE = Math.PI * 2;
var DEFAULT_FLASHLIGHT_ANGLE = Math.PI * 0.5;

window.onload = function () {
	// define game
	game = new Phaser.Game(480, 360, Phaser.AUTO, 'myGame');

	// define states
	game.state.add('Boost', Boost);
	game.state.add('Title', Title);
	game.state.add('Play', Play);
	game.state.add('Death', Death);
	game.state.start('Boost');
}