// Debug Plugin:
function debugPlugin(game) {
	Phaser.Plugin.call(this, game);
	this.trigger = false;
};

debugPlugin.prototype = Object.create(Phaser.Plugin.prototype);
debugPlugin.prototype.constructor = debugPlugin;

var tileIndex;
var currentLayer;
var tileX;
var tileY;

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
	if (game.input.keyboard.justPressed(Phaser.Keyboard.O)) {
		this.trigger = !this.trigger;
		marker.visible = this.trigger;
	}
	this.render();
};
debugPlugin.prototype.render = function () {
	if (this.trigger) {
		game.debug.text('FPS: ' + game.time.fps || 'FPS: --', 40, 40, "#00ff00");
		game.debug.cameraInfo(game.camera, GRID_SIZE, GRID_SIZE);
		// game.debug.spriteCoords(player, GRID_SIZE, 500);
		game.debug.text('player hided: ' + player.hided, 32, game.camera.height - 120);
		game.debug.text('Tile x: ' + tileX + ' Tile y: ' + tileY, 32, game.camera.height - 100);
		game.debug.text('Current tile layer: ' + currentLayer, 32, game.camera.height - 80);
		game.debug.text('Target tile index: ' + tileIndex, 32, game.camera.height - 60);
		game.debug.text('Front object: ' + frontObjectIndex, 32, game.camera.height - 40);
		game.debug.text('Player Stop Moving: ' + player.tweenCompleted.toString(), 32, game.camera.height - 20);
	} else {
		game.debug.text('', 32, 664);
	}
};
debugPlugin.prototype.updateMarker = function () {
	marker.x = wallLayer.getTileX(game.input.activePointer.worldX) * 32;
	marker.y = wallLayer.getTileY(game.input.activePointer.worldY) * 32;
};
debugPlugin.prototype.getTileProperties = function () {
	tileX = wallLayer.getTileX(game.input.activePointer.worldX);
	tileY = wallLayer.getTileY(game.input.activePointer.worldY);
	var tile = map.getTile(tileX, tileY, wallLayer, true);
	// Note: JSON.stringify will convert the object tile properties to a string
	// currentDataString = JSON.stringify(tile.properties);
	if (tile.index !== -1) {
		currentLayer = 'wall';
		tileIndex = tile.index;
	} else {
		tileX = objectLayer.getTileX(game.input.activePointer.worldX);
		tileY = objectLayer.getTileY(game.input.activePointer.worldY);
		tile = map.getTile(tileX, tileY, objectLayer, true);
		if (tile.index !== -1) {
			currentLayer = 'Object';
			tileIndex = tile.index;
		} else {
			tileX = floorLayer.getTileX(game.input.activePointer.worldX);
			tileY = floorLayer.getTileY(game.input.activePointer.worldY);
			tile = map.getTile(tileX, tileY, floorLayer, true);
			currentLayer = 'Floor';
			tileIndex = tile.index;
		}
	}

	// tile.properties.wibble = true;
};