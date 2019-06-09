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
var player; // the character
var shadow; // the enemy
var debug;
var light; //diff:not in master
var map; // the tilemap
var floorLayer; // the tilemap layer contains floors
var wallLayer; // the tilemap layer contains walls
var objectLayer; // the tilemap layer contains objects
var cursors; // the cursors
var interactText; //diff:not in master
var shadowTexture; //diff:not in master
var gradient; //diff:not in master
var timer;
var decorations; // the tilemap layer contains decorations, not used
var hud; // HUD
var camera; // the camera
var sounds; // the sounds
// Variables:
var cheat = false; // cheat mode
var playerMaxHP = 100; // default player max HP
var playerMaxMP = 100; // default player max MP
var playerMaxBattery = 100; // default player max Battery
var tutorialOn = true; // tutorial switch
// Tile-Map Constants(for tile map indexs):
var PRISONDOOR_1_INDEX = 159;
var PRISONDOOR_2_INDEX = 161;
var HIDDEN_DOOR_INDEX = 259;
var DOOR_1_INDEX = 165; // closed door index is this +1, broken version is this +2 and +3
var DOOR_2_INDEX = 163;
var CLOSET_1_INDEX = 119; // those are 64x64 objects and placed in order in the tileset, so this +1 means right half of this whole object, this +2 +3 stand for closed version.
var CLOSET_2_INDEX = 123;
var DESK_1_INDEX = 135;
var DESK_2_INDEX = 139;
var BED_1_INDEX = 151;
var BED_2_INDEX = 155;
var MIRROR_1_INDEX = 192;
var DOOR_2_R_INDEX = 243;
var PRISONDOOR_2_R_INDEX = 241;
// var CLOSET_1_R_INDEX = 215; //diff:not in master
// var CLOSET_2_R_INDEX = 219; //diff:not in master
// var DESK_1_R_INDEX = 229; //diff:not in master
// var DESK_2_R_INDEX = 231; //diff:not in master
// var BED_1_R_INDEX = 233; //diff:not in master
// var BED_2_R_INDEX = 235; //diff:not in master
var CHEST_FLASHLIGHT_INDEX = 185;
var PUZZLE_COLOR_BLOCK_YELLOW_INDEX = 34;
var PUZZLE_COLOR_BLOCK_BLUE_INDEX = 35;
var PUZZLE_COLOR_BLOCK_GREEN_INDEX = 29;
var PUZZLE_COLOR_BLOCK_RED_INDEX = 30;
var PUZZLE_TRIGGER_1_INDEX = 175;
var TRAP_BUTTON_INDEX = 183;
var BATTERY_INDEX = 265;
var PILL_INDEX = 275;

// Other Constants:
var GRID_SIZE = 32; // gride size of tile map
var CONTROL_RESPONSE_DELAY = 150; // input delay for turn around player
var RED_TINT = '0xff0000'; // colors
var DARK_TINT = '0x808080';
var LIGHT_TINT = '0xd9d9d9';
var PRESS_TINT = '0x66ff66';
var RESET_TINT = '0xFFFFFF';
var HP_LEVEL_1_TINT = '0xb30000';
var HP_LEVEL_2_TINT = '0xe67300';
var HP_LEVEL_3_TINT = '0xb37700';
var HP_LEVEL_4_TINT = '0xffcc00';
var DEFAULT_VISION_LENGTH = 35; // default light radius of player without flashlight
var DEFAULT_FLISHLIGHT_LENGTH = 120; // default light radius of player with flashlight
var DEFAULT_VISION_ANGLE = Math.PI * 2; // default light angle of player without flashlight
var DEFAULT_FLASHLIGHT_ANGLE = Math.PI * 0.5; // default light angle of player with flashlight
var DOOR_OPENING_TIME = 1; // time for opening the door
var RADIUS_ROUNDED_RECT = 5; // for HUD bars
// var CAMERA_OFFSET = 0; //diff:not in master
// var CAMERA_SPEED = 1; //diff:not in master

window.onload = function () {
	// define game
	game = new Phaser.Game(560, 420, Phaser.AUTO, 'myGame');

	// define states
	game.state.add('Boost', Boost);
	game.state.add('Title', Title);
	game.state.add('Play', Play);
	game.state.add('Death', Death);
	game.state.add('End', End);
	game.state.start('Boost');
}