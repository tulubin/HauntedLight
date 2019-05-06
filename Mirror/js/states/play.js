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

		background = game.add.tileSprite(0, 0, 300, 300, 'Background');
		background.scale.setTo(10, 10);
		game.world.setBounds(0, 0, WORLD_SIZE, WORLD_SIZE);

		// Player:
		player = game.add.sprite(WORLD_SIZE/2+GRID_SIZE/2, WORLD_SIZE/2+GRID_SIZE/2, 'Player');
		player.anchor.set(0.5);
		game.physics.enable(player, Phaser.Physics.ARCADE);
		player.body.maxVelocity.set(250);
		player.body.collideWorldBounds = true;
		player.body.immovable = true;
		player.body.drag.set(1500);
		game.camera.follow(player);
		player.gridPosition = new Phaser.Point((WORLD_SIZE/2+GRID_SIZE/2)/GRID_SIZE, (WORLD_SIZE/2+GRID_SIZE/2)/GRID_SIZE);
		
	},
	update: function() {
		// Controls:
		if((game.input.keyboard.justPressed(Phaser.Keyboard.UP) || game.input.keyboard.justPressed(Phaser.Keyboard.W)) && player.y >= GRID_SIZE ) {
			// player.body.velocity.y -= PLAYER_WALKING_SPEED;
			this.movePlayer(0, -1);
		} 
		if((game.input.keyboard.justPressed(Phaser.Keyboard.DOWN) || game.input.keyboard.justPressed(Phaser.Keyboard.S)) && player.y <= WORLD_SIZE - GRID_SIZE ) {
			// player.body.velocity.y += PLAYER_WALKING_SPEED;
			this.movePlayer(0, 1);
		}
		if((game.input.keyboard.justPressed(Phaser.Keyboard.LEFT) || game.input.keyboard.justPressed(Phaser.Keyboard.A)) && player.x >= GRID_SIZE) {
			// player.body.velocity.x -= PLAYER_WALKING_SPEED;
			this.movePlayer(-1, 0);
		} 
		if((game.input.keyboard.justPressed(Phaser.Keyboard.RIGHT) || game.input.keyboard.justPressed(Phaser.Keyboard.D)) && player.x <= WORLD_SIZE - GRID_SIZE)  {
			// player.body.velocity.x += PLAYER_WALKING_SPEED;
			this.movePlayer(1, 0);
		}
		// if((player.body.velocity.x != 0) || (player.body.velocity.y != 0)) {
		// 	this.footstep.play('', 0, 1, false, false);
		// }
	},
	render: function() {
		// Debugging tools:
	    game.debug.cameraInfo(game.camera, GRID_SIZE, GRID_SIZE);
	    game.debug.spriteCoords(player, GRID_SIZE, 500);
	},
	movePlayer: function(x, y) {  
		player.gridPosition.x += x;  
		player.gridPosition.y += y;  // doing it this way means the player's position will always be a multiple of GRID_SIZE  
		game.add.tween(player).to({x: player.gridPosition.x * GRID_SIZE, y: player.gridPosition.y * GRID_SIZE}, 250, Phaser.Easing.Quadratic.InOut, true);
	}
};