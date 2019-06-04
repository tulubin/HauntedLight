// Play state

var Play = function (game) {
};
Play.prototype = {
	create: function () {
		game.time.advancedTiming = true;
		// Physics:
		// game.physics.startSystem(Phaser.Physics.ARCADE);
		// game.physics.setBoundsToWorld();

		// World:
		// game.physics.arcade.gravity.y = this.GRAVITY;
		// game.physics.arcade.TILE_BIAS = 32;
		// game.stage.setBackgroundColor('#87CEEB');
		map = game.add.tilemap('level');
		// map.addTilesetImage('FloorWall', 'floorwall');
		map.addTilesetImage('objects', 'objects');
		map.addTilesetImage('floor', 'floor');
		map.addTilesetImage('wall', 'wall');
		// map.addTilesetImage('Puzzle_1', 'puzzle_1');
		map.setCollisionByExclusion([]);
		floorLayer = map.createLayer('Floor');
		wallLayer = map.createLayer('Wall');
		objectLayer = map.createLayer('Objects');
		floorLayer.resizeWorld();
		decorations = game.add.group();
		map.createFromObjects('Decorations', 120, 'decorations', 0, true, false, decorations)
		floorLayer.tint = DARK_TINT;
		wallLayer.tint = DARK_TINT;
		objectLayer.tint = DARK_TINT;
		decorations.tint = DARK_TINT;

		// Player:
		player = new Player(game);
		game.add.existing(player);

		//var someText = game.add.text(GRID_SIZE*20.5, GRID_SIZE*26, 'Thanks For Playing the Demo!', {font: 'Helvetica', fontSize: '12px', fill: '#fff'});
		//someText.anchor.set(0.5);

		debug = new debugPlugin(game);
		debug.addDebug();
	},
	update: function () {
		debug.updateDebug();
		if ((player.currentHP <= 0) && (debug.toggle === false)) {
			game.state.start('Death');
		}
	}
};
