// Play state

var Play = function(game) {
};
Play.prototype = {
	create: function() {
		// Sounds:
		this.footstep = game.add.audio('Footstep');
		
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
		// player = game.add.sprite(game.world.centerX, game.world.centerY, 'Player');
		// player.anchor.set(0.5);
		// game.physics.enable(player, Phaser.Physics.ARCADE);
		// player.body.maxVelocity.set(250);
		// player.body.collideWorldBounds = true;
		// player.body.immovable = true;
		// player.body.drag.set(1500);
		game.camera.follow(player);
		
	},
	update: function() {
		// // Controls:
		// if(game.input.keyboard.justPressed(Phaser.Keyboard.UP) || game.input.keyboard.justPressed(Phaser.Keyboard.W)) {
		// 	// player.body.velocity.y -= PLAYER_WALKING_SPEED;
		// 	this.movePlayer(0, -1);
		// } 
		// if(game.input.keyboard.justPressed(Phaser.Keyboard.DOWN) || game.input.keyboard.justPressed(Phaser.Keyboard.S)) {
		// 	// player.body.velocity.y += PLAYER_WALKING_SPEED;
		// 	this.movePlayer(0, 1);
		// }
		// if(game.input.keyboard.justPressed(Phaser.Keyboard.LEFT) || game.input.keyboard.justPressed(Phaser.Keyboard.A)) {
		// 	// player.body.velocity.x -= PLAYER_WALKING_SPEED;
		// 	this.movePlayer(-1, 0);
		// } 
		// if(game.input.keyboard.justPressed(Phaser.Keyboard.RIGHT) || game.input.keyboard.justPressed(Phaser.Keyboard.D)) {
		// 	// player.body.velocity.x += PLAYER_WALKING_SPEED;
		// 	this.movePlayer(1, 0);
		// }
		// if(player.tween.isRunning) {
		// 	this.footstep.play('', 0, 1, true, false);
		// } else {
		// 	this.footstep.stop();
		// }
	},
	render: function() {
		// Debugging tools:
	    game.debug.cameraInfo(game.camera, GRID_SIZE, GRID_SIZE);
	    game.debug.spriteCoords(player, GRID_SIZE, 500);
	    // game.debug.text('Velocity_X: ' + player.body.velocity.x, 32, 600);
	}
};