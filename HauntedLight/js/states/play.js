// Play state
"use strict";
var Play = function (game) { };
Play.prototype = {
	create: function () {
		if (cheat)
			tutorialOn = false;
		game.time.advancedTiming = true;
		// Physics: // diff: not in master
		// game.physics.startSystem(Phaser.Physics.ARCADE); // diff: not in master
		// game.physics.setBoundsToWorld(); // diff: not in master

		// World: // diff: not in master
		// game.physics.arcade.gravity.y = this.GRAVITY; // diff: not in master
		// game.physics.arcade.TILE_BIAS = 32; // diff: not in master
		// game.stage.setBackgroundColor('#87CEEB'); // diff: not in master
		//tilemap
		map = game.add.tilemap('level');
		// map.addTilesetImage('FloorWall', 'floorwall'); // diff: not in master
		map.addTilesetImage('objects', 'objects');
		map.addTilesetImage('floor', 'floor');
		map.addTilesetImage('wall', 'wall');
		// map.addTilesetImage('Puzzle_1', 'puzzle_1');  // diff: not in master
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
		// Sounds:
		sounds = new Sounds(game);
		// Player:
		player = new Player(game);
		game.add.existing(player);
		// HUD
		hud = new HUD(game);
		hud.fixedToCamera = true;
		// Debugging
		debug = new debugPlugin(game);
		debug.addDebug();

		if (!tutorialOn) {
			player.hasFlashlight = true;
			player.loadTexture('Player_f', 4);
			player.frame = 0;
			map.replace(CHEST_FLASHLIGHT_INDEX, -1, 148, 76, 1, 1, objectLayer);
			shadow.x -= 100 * GRID_SIZE;
			shadow.y += 3 * GRID_SIZE;
			player.inTutorial = false;
			shadow.startMove = true;
			player.endTutorialEvent = false;
			map.replace(PRISONDOOR_1_INDEX, PRISONDOOR_1_INDEX + 1, 48, 75, 1, 1, objectLayer);
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
		if ((player.currentHP <= 0) && (!cheat)) {
			game.state.start('Death');
		}
	}
};
