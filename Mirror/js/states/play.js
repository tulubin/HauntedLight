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
		//player = new Player(game);
		player = game.add.sprite(game.world.centerX, game.world.centerY, "player_atlas", "child00");
		//game.add.existing(player);
		game.camera.follow(player);

		//Add player animation
		player.animations.add("walkDown", Phaser.Animation.generateFrameNames('child', 0, 3, "", 2), 4, true);
		player.animations.add("walkUp", Phaser.Animation.generateFrameNames('child', 4, 7, "", 2), 4, true);
		player.animations.add("walkLeft", Phaser.Animation.generateFrameNames('child', 8, 11, "", 2), 4, true);
		player.animations.add("walkRight", Phaser.Animation.generateFrameNames('child', 12, 15, "", 2), 4, true);
		
		// HUD:
		game.plugin.addHUD();



	},
	update: function() {
    	//play animation when walking
    	if((game.input.keyboard.justPressed(Phaser.Keyboard.UP) || game.input.keyboard.justPressed(Phaser.Keyboard.W)) && playerTweenCompleted) {
        	player.animations.play("walkUp");
    	} else if ((game.input.keyboard.justPressed(Phaser.Keyboard.DOWN) || game.input.keyboard.justPressed(Phaser.Keyboard.S)) && playerTweenCompleted) {
        	player.animations.play("walkDown");
    	} else if ((game.input.keyboard.justPressed(Phaser.Keyboard.LEFT) || game.input.keyboard.justPressed(Phaser.Keyboard.A)) && playerTweenCompleted) {
        	player.animations.play("walkLeft");
    	} else if ((game.input.keyboard.justPressed(Phaser.Keyboard.RIGHT) || game.input.keyboard.justPressed(Phaser.Keyboard.D)) && playerTweenCompleted) {
        	player.animations.play("walkRight");
    	}
	},
	render: function() {
		// Debugging tools:
	    game.debug.cameraInfo(game.camera, GRID_SIZE, GRID_SIZE);
	    game.debug.spriteCoords(player, GRID_SIZE, 500);
	    game.debug.text('Player Stop Moving: ' + playerTweenCompleted.toString(), 32, 600);
	}
};