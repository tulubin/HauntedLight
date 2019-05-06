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
		game.physics.arcade.gravity.y = this.GRAVITY;
		// TILE_BIAS adds a pixel "buffer" around your tiles to avoid collision tunneling
		// see https://thoughts.amphibian.com/2016/02/dont-fall-through-tile-bias-in-phaser.html
		game.physics.arcade.TILE_BIAS = 32;

		// set bg color
		game.stage.setBackgroundColor('#87CEEB');

		// create new Tilemap object - when using Tiled, you only need to pass the key
		map = game.add.tilemap('level');
		// add an image to the map to be used as a tileset (tileset, key)
		// the tileset name is specified w/in the .json file (or in Tiled)
		// a single map may use multiple tilesets
		map.addTilesetImage('tilesheet-color', 'tilesheet');
		// set ALL tiles to collide *except* those passed in the array
		map.setCollisionByExclusion([]);
		// create new TilemapLayer object 
		// A Tilemap Layer is a set of map data combined with a tileset
		mapLayer = map.createLayer('Tile Layer 1');
		
		// set the world size to match the size of the Tilemap layer
		mapLayer.resizeWorld();

		// background = game.add.tileSprite(0, 0, 300, 300, 'Background');
		// background.scale.setTo(10, 10);
		// game.world.setBounds(0, 0, 3000, 3000);

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