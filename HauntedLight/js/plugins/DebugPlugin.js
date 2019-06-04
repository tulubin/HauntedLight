// Debug Plugin:
function debugPlugin(game) {
	Phaser.Plugin.call(this, game);
	this.toggle = false;
	// this.tileIndex
	// this.currentLayer
	// this.tileX
	// this.tileY
};

debugPlugin.prototype = Object.create(Phaser.Plugin.prototype);
debugPlugin.prototype.constructor = debugPlugin;

debugPlugin.prototype.addDebug = function () {
	marker = game.add.graphics();
	marker.lineStyle(2, 0xffffff, 1);
	marker.drawRect(0, 0, 32, 32);
	marker.visible = false;
	game.input.addMoveCallback(this.updateMarker, this);
	game.input.onDown.add(this.getTileProperties, this);
	cursors = game.input.keyboard.createCursorKeys();
};
debugPlugin.prototype.updateDebug = function () {
	if (game.input.keyboard.justPressed(Phaser.Keyboard.I)) {
		this.toggle = !this.toggle;
		marker.visible = this.toggle;
	}
	this.render();
};
debugPlugin.prototype.render = function () {
	if (this.toggle) {
		game.debug.text('FPS: ' + game.time.fps || 'FPS: --', 40, 40, "#00ff00");
		game.debug.cameraInfo(game.camera, GRID_SIZE, GRID_SIZE);
		// game.debug.spriteCoords(player, GRID_SIZE, 500);
		game.debug.text('colorPuzzleTrigger: ' + player.colorPuzzleTrigger, 32, game.camera.height - 220);
		game.debug.text('nextColorBlock: ' + player.nextColorBlock, 32, game.camera.height - 200);
		game.debug.text('thisColorBlock: ' + player.thisColorBlock, 32, game.camera.height - 180);
		if (player.orientation.up)
			game.debug.text('player orientation: ' + 'UP', 32, game.camera.height - 160);
		else if (player.orientation.down)
			game.debug.text('player orientation: ' + 'DOWN', 32, game.camera.height - 160);
		else if (player.orientation.left)
			game.debug.text('player orientation: ' + 'LEFT', 32, game.camera.height - 160);
		else if (player.orientation.right)
			game.debug.text('player orientation: ' + 'RIGHT', 32, game.camera.height - 160);
		game.debug.text('player visible: ' + player.visible, 32, game.camera.height - 140);
		game.debug.text('player hided: ' + player.hided, 32, game.camera.height - 120);
		game.debug.text('Tile x: ' + this.tileX + ' Tile y: ' + this.tileY, 32, game.camera.height - 100);
		game.debug.text('Current tile layer: ' + this.currentLayer, 32, game.camera.height - 80);
		game.debug.text('Target tile index: ' + this.tileIndex, 32, game.camera.height - 60);
		game.debug.text('Front object: ' + player.frontObjectIndex, 32, game.camera.height - 40);
		game.debug.text('                   Right object: ' + player.rightObjectIndex, 32, game.camera.height - 40);
		game.debug.text('                                        Left object: ' + player.leftObjectIndex, 32, game.camera.height - 40);
		game.debug.text('                                                            Back object: ' + player.backObjectIndex, 32, game.camera.height - 40);
		game.debug.text('Player tween stoped: ' + player.tweenCompleted.toString(), 32, game.camera.height - 20);
	} else {
		game.debug.text('', 32, 664);
	}
};
debugPlugin.prototype.updateMarker = function () {
	marker.x = wallLayer.getTileX(game.input.activePointer.worldX) * 32;
	marker.y = wallLayer.getTileY(game.input.activePointer.worldY) * 32;
};
debugPlugin.prototype.getTileProperties = function () {
	this.tileX = wallLayer.getTileX(game.input.activePointer.worldX);
	this.tileY = wallLayer.getTileY(game.input.activePointer.worldY);
	var tile = map.getTile(this.tileX, this.tileY, objectLayer, true);
	// Note: JSON.stringify will convert the object tile properties to a string
	// currentDataString = JSON.stringify(tile.properties);
	if (tile.index !== -1) {
		this.currentLayer = 'Object';
		this.tileIndex = tile.index;
	} else {
		this.tileX = objectLayer.getTileX(game.input.activePointer.worldX);
		this.tileY = objectLayer.getTileY(game.input.activePointer.worldY);
		tile = map.getTile(this.tileX, this.tileY, wallLayer, true);
		if (tile.index !== -1) {
			this.currentLayer = 'Wall';
			this.tileIndex = tile.index;
		} else {
			this.tileX = floorLayer.getTileX(game.input.activePointer.worldX);
			this.tileY = floorLayer.getTileY(game.input.activePointer.worldY);
			tile = map.getTile(this.tileX, this.tileY, floorLayer, true);
			this.currentLayer = 'Floor';
			this.tileIndex = tile.index;
		}
	}

	// tile.properties.wibble = true;
};