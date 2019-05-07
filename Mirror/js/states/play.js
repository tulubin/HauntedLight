// Play state

var Play = function(game) {
};
Play.prototype = {
	create: function() {
		
		// Physics:
		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.physics.setBoundsToWorld();

		// World:
		// game.physics.arcade.gravity.y = this.GRAVITY;
		// game.physics.arcade.TILE_BIAS = 32;
		// game.stage.setBackgroundColor('#87CEEB');
		// map = game.add.tilemap('level');
		// map.addTilesetImage('tilesheet-color', 'tilesheet');
		// map.setCollisionByExclusion([]);
		// mapLayer = map.createLayer('Tile Layer 1');
		// mapLayer.resizeWorld();
		background = game.add.tileSprite(0, 0, 288, 288, 'Background');
		background.scale.setTo(10, 10);
		game.world.setBounds(0, 0, WORLD_SIZE, WORLD_SIZE);

		// Player:
		player = new Player(game);
		game.add.existing(player);
		game.camera.follow(player);
		
		// HUD:
		// --------------------HP---------------------
		this.HP = game.add.sprite(game.width-64, 32, 'Player');
    	this.HP.fixedToCamera = true;
    	// --------------back MP bar------------------
    	this.HPbar_b = game.add.sprite(game.width-248, 40, 'Player');
    	this.HPbar_b.scale.setTo(5, 0.5);
    	this.HPbar_b.fixedToCamera = true;
    	this.HPbar_b.tint = 0x000000;
    	// --------------front HP bar-----------------
    	this.HPbar_f = game.add.sprite(game.width-248, 40, 'Player');
    	this.HPbar_f.scale.setTo(4.8, 0.5);
    	this.HPbar_f.fixedToCamera = true;
    	this.HPbar_f.tint = 0xE8000C;
    	// --------------------MP---------------------
    	this.MP = game.add.sprite(game.width-64, 96, 'Player');
    	this.MP.fixedToCamera = true;
    	// --------------back MP bar------------------
    	this.MPbar_b = game.add.sprite(game.width-248, 104, 'Player');
    	this.MPbar_b.scale.setTo(5, 0.5);
    	this.MPbar_b.fixedToCamera = true;
    	this.MPbar_b.tint = 0x000000;
    	// --------------front MP bar-----------------
    	this.MPbar_f = game.add.sprite(game.width-248, 104, 'Player');
    	this.MPbar_f.scale.setTo(4.8, 0.5);
    	this.MPbar_f.fixedToCamera = true;
    	this.MPbar_f.tint = 0x141BFF;
	},
	update: function() {
	},
	render: function() {
		// Debugging tools:
	    game.debug.cameraInfo(game.camera, GRID_SIZE, GRID_SIZE);
	    game.debug.spriteCoords(player, GRID_SIZE, 500);
	    game.debug.text('Player Stop Moving: ' + playerTweenCompleted.toString(), 32, 600);
	}
};