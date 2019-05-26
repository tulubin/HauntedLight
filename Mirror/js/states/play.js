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
		// game.stage.setBackgroundColor('#87CEEB');
		map = game.add.tilemap('level');
		// map.addTilesetImage('FloorWall', 'floorwall');
		map.addTilesetImage('doorAnimate', 'door');
		map.addTilesetImage('objects', 'objects');
		map.addTilesetImage('0', 'texture_0');
		map.addTilesetImage('1', 'texture_1');
		map.addTilesetImage('2', 'texture_2');
		map.addTilesetImage('3', 'texture_3');
		map.addTilesetImage('obj', 'obj');
		map.addTilesetImage('decorations', 'decorations');
		// map.addTilesetImage('Puzzle_1', 'puzzle_1');
		map.setCollisionByExclusion([]);
		floorLayer = map.createLayer('Floor');
		wallLayer = map.createLayer('Wall');
		objectLayer = map.createLayer('Objects');
		// decorationLayer = map.createLayer('Decorations');
		wallLayer.resizeWorld();
		decorations = game.add.group();
		map.createFromObjects('Decorations', 120, 'decorations', 0, true, false, decorations)
		
		// map.setCollisionByExclusion([1], true, mapLayer);
		// background = game.add.tileSprite(0, 0, 288, 288, 'Background');
		// background.scale.setTo(10, 10);
		// game.world.setBounds(0, 0, WORLD_SIZE, WORLD_SIZE);

		// floorLayer.alpha = 0;
		// wallLayer.alpha = 0;
		// objectLayer.alpha = 0;
		// Player:
		player = new Player(game);
		game.add.existing(player);

		shadow = new Shadow(game);
		game.add.existing(shadow);
		//var someText = game.add.text(GRID_SIZE*20.5, GRID_SIZE*26, 'Thanks For Playing the Demo!', {font: 'Helvetica', fontSize: '12px', fill: '#fff'});
		//someText.anchor.set(0.5);

		// HUD:
		light = new LightPlugin(game);
		light.addLight();
		hud = new HUD(game);
		// hud = new HUDPlugin(game);
		// hud.addHUD();
		debug = new DebugPlugin(game);
		debug.addDebug();
	},
	update: function() {
		light.updateLight();
		// hud.updateHUD();
		debug.updateDebug();
		if(MIRROR_TOUCHED) {
			player.x = GRID_SIZE*11 + GRID_SIZE/2;
			player.y = GRID_SIZE*9 + GRID_SIZE/2; 
			if(touch_counter === 4) {
				var someText = game.add.text(GRID_SIZE*20.5, GRID_SIZE*26, 'Thanks For Playing the Demo!', {font: 'Helvetica', fontSize: '12px', fill: '#fff'});
				someText.anchor.set(0.5);
			}
			
			MIRROR_TOUCHED = false;
		}
	}
};
