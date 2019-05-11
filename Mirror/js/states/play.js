// Play state

var Play = function(game) {
};
Play.prototype = {
	create: function() {
		
		// Physics:
		game.physics.startSystem(Phaser.Physics.ARCADE);
		// game.physics.setBoundsToWorld();

		// World:
		// game.physics.arcade.gravity.y = this.GRAVITY;
		game.physics.arcade.TILE_BIAS = 32;
		game.stage.setBackgroundColor('#87CEEB');
		map = game.add.tilemap('level');
		map.addTilesetImage('FloorWall', 'floorwall');
		map.addTilesetImage('Doors', 'door');
		map.setCollisionByExclusion([]);
		floorLayer = map.createLayer('Floor');
		terrainLayer = map.createLayer('Terrain');
		objectLayer = map.createLayer('Objects');
		terrainLayer.resizeWorld();
		// map.setCollisionByExclusion([1], true, mapLayer);
		// background = game.add.tileSprite(0, 0, 288, 288, 'Background');
		// background.scale.setTo(10, 10);
		// game.world.setBounds(0, 0, WORLD_SIZE, WORLD_SIZE);

		// Player:
		player = new Player(game);
		game.add.existing(player);

		// HUD:
		light = new LightPlugin(game);
		light.addLight();
		hud = new HUDPlugin(game);
		hud.addHUD();
		debug = new DebugPlugin(game);
		debug.addDebug();

     //    game.input.addMoveCallback(this.updateMarker, this);

	    // game.input.onDown.add(this.getTileProperties, this);

	    // cursors = game.input.keyboard.createCursorKeys();

	},
	update: function() {
		light.updateLight();
		hud.updateHUD();
		debug.updateDebug();
	},
};
