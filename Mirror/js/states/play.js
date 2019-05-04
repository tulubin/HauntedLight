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
		// game.add.tileSprite(0, 0, 1920, 1920, 'background');
		background = game.add.tileSprite(0, 0, 300, 300, 'Background');
		background.scale.setTo(10, 10);
		game.world.setBounds(0, 0, 3000, 3000);
		// Player:
		player = game.add.sprite(game.width/2+16, game.height/2+16, 'Player');
		player.anchor.set(0.5);
		game.physics.enable(player, Phaser.Physics.ARCADE);
		player.body.maxVelocity.set(250);
		player.body.collideWorldBounds = true;
		player.body.immovable = true;
		player.body.drag.set(1500);
		game.camera.follow(player);
	},
	update: function() {
		// Controls:
		if(game.input.keyboard.isDown(Phaser.Keyboard.UP) || game.input.keyboard.isDown(Phaser.Keyboard.W) ) {
			player.body.velocity.y -= PLAYER_WALKING_SPEED;
		} 
		if(game.input.keyboard.isDown(Phaser.Keyboard.DOWN) || game.input.keyboard.isDown(Phaser.Keyboard.S)) {
			player.body.velocity.y += PLAYER_WALKING_SPEED;
		}
		if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT) || game.input.keyboard.isDown(Phaser.Keyboard.A)) {
			player.body.velocity.x -= PLAYER_WALKING_SPEED;
		} 
		if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) || game.input.keyboard.isDown(Phaser.Keyboard.D)) {
			player.body.velocity.x += PLAYER_WALKING_SPEED;
		}
		if((player.body.velocity.x != 0) || (player.body.velocity.y != 0)) {
			this.footstep.play('', 0, 1, false, false);
		}
	},
	render: function() {
		// Debugging tools:
	    game.debug.cameraInfo(game.camera, 32, 32);
	    game.debug.spriteCoords(player, 32, 500);
	}

};