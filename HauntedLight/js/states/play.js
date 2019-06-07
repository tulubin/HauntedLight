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
		
		// camera = new Camera(game);
		// game.add.existing(camera);

		hud = new HUD(game);
		hud.fixedToCamera = true;

		debug = new debugPlugin(game);
		debug.addDebug();

		if (!tutorialOn) {
			player.hasFlashlight = true;
			player.loadTexture('Player_f', 4);
			map.replace(CHEST_FLASHLIGHT_INDEX, -1, 148, 76, 1, 1, objectLayer);
			shadow.x -= 100 * GRID_SIZE;
			shadow.y += 3 * GRID_SIZE;
			player.inTutorial = false;
			shadow.startMove = true;
			player.endTutorialEvent = false;
			map.replace(PRISON_DOOR_INDEX, PRISON_DOOR_INDEX + 1, 48, 75, 1, 1, objectLayer);
			game.time.events.add(Phaser.Timer.SECOND * 10, function () {
				hud.upKey.destroy();
				hud.downKey.destroy();
				hud.leftKey.destroy();
				hud.rightKey.destroy();
				hud.sprintKey.destroy();
				hud.sprintText.destroy();
				hud.spacebar.destroy();
				hud.spacebarText.destroy();
			}, this);
		}
	},
	update: function () {
		debug.updateDebug();
		if ((player.currentHP <= 0) && (debug.toggle === false)) {
			game.state.start('Death');
		}
	}
};
