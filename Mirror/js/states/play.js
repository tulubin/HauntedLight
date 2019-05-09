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
		map.addTilesetImage('colorblock', 'tilesheet');
		mapLayer = map.createLayer('Tile Layer 1');
		mapLayer.resizeWorld();
		map.setCollisionByExclusion([1], true, mapLayer);
		// background = game.add.tileSprite(0, 0, 288, 288, 'Background');
		// background.scale.setTo(10, 10);
		// game.world.setBounds(0, 0, WORLD_SIZE, WORLD_SIZE);

		// Player:
		player = new Player(game);
		game.add.existing(player);
		// game.camera.follow(player);

		// HUD:
		game.plugin.addHUD();

	    //  Our painting marker
	    marker = game.add.graphics();
	    marker.lineStyle(2, 0xffffff, 1);
	    marker.drawRect(0, 0, 32, 32);

        game.input.addMoveCallback(this.updateMarker, this);

	    game.input.onDown.add(this.getTileProperties, this);

	    cursors = game.input.keyboard.createCursorKeys();

	},
	update: function() {

	},
	render: function() {
		// Debugging tools:
	    game.debug.cameraInfo(game.camera, GRID_SIZE, GRID_SIZE);
	    game.debug.spriteCoords(player, GRID_SIZE, 500);
	    game.debug.text('Player Stop Moving: ' + playerTweenCompleted.toString(), 32, 570);

	    game.debug.body(player);
        if(currentDataString){
	        game.debug.text('Tile properties: ' + currentDataString, 16, 550);
	    } else {
	        game.debug.text("Click on a tile to reveal the properties of the tile", 16, 550);
	    }
	},
	getTileProperties: function() {
	    var x = mapLayer.getTileX(game.input.activePointer.worldX);
	    var y = mapLayer.getTileY(game.input.activePointer.worldY);
	    var tile = map.getTile(x, y, mapLayer);
	    // Note: JSON.stringify will convert the object tile properties to a string
	    // currentDataString = JSON.stringify(tile.properties);
	    currentDataString = tile.index;
	    // tile.properties.wibble = true;

	},
	updateMarker: function() {
	    marker.x = mapLayer.getTileX(game.input.activePointer.worldX) * 32;
	    marker.y = mapLayer.getTileY(game.input.activePointer.worldY) * 32;
	}
};