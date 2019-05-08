

// TASKMASTER
"use strict";

var Play = function(game) {
};

Play.prototype = {
	preload: function() {
		game.load.path = 'assets/';
		// load tilemap data (key, url, data, format)
		game.load.tilemap('level', 'mainroom.json', null, Phaser.Tilemap.TILED_JSON);	
		// load tilemap spritesheet (key, url, frameWidth, frameHeight)
		game.load.spritesheet('tilesheet', 'colorblock.png', 96, 128);
	},
	create: function() {
		// spin up physics
		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.physics.arcade.gravity.y = this.GRAVITY;
		// TILE_BIAS adds a pixel "buffer" around your tiles to avoid collision tunneling
		// see https://thoughts.amphibian.com/2016/02/dont-fall-through-tile-bias-in-phaser.html
		game.physics.arcade.TILE_BIAS = 32;

		// set bg color
		game.stage.setBackgroundColor('#87CEEB');

		// create new Tilemap object - when using Tiled, you only need to pass the key
		this.map = game.add.tilemap('level');
		// add an image to the map to be used as a tileset (tileset, key)
		// the tileset name is specified w/in the .json file (or in Tiled)
		// a single map may use multiple tilesets
		this.map.addTilesetImage('abstract platformer', 'tilesheet');
		// set ALL tiles to collide *except* those passed in the array
		this.map.setCollisionByExclusion([]);
		// create new TilemapLayer object 
		// A Tilemap Layer is a set of map data combined with a tileset
		this.mapLayer = this.map.createLayer('Tile Layer 1');
		
		// set the world size to match the size of the Tilemap layer
		this.mapLayer.resizeWorld();
	},
	update: function() {
		
	},
	render: function() {
	}
};

// init game and state
var game = new Phaser.Game(900, 700, Phaser.AUTO);
game.state.add('Play', Play);
game.state.start('Play');