// Camera prefab

function Camera(game) {
	// call Sprite constructor within this object
	// new Sprite(game, x, y, key, frame)
	// Phaser.Sprite.call(this, game, player.x, player.y + 100 + 30, 'Camera');
	Phaser.Sprite.call(this, game, player.x, player.y + 100, 'Temp');
	this.anchor.set(0.5);
	this.alpha = 0;

	game.camera.follow(this, 0, 1, 1);
	game.time.events.add(Phaser.Timer.SECOND * 0.5, function () {
		game.camera.follow(this, 0, 0.2, 0.2);
	}, this);
}

// inherit prototype from Phaser.Sprite and set constructor to Camera
// the Object.create method creates a new object w/ the specified prototype object and properties
Camera.prototype = Object.create(Phaser.Sprite.prototype);
// since we used Object.create, we need to explicitly set the constructor
Camera.prototype.constructor = Camera;
// this.orientation = { up: false, down: true, left: false, right: false };
Camera.prototype.update = function () {
	if (player.orientation.up) {
		this.x = player.x;
		this.y = player.y - 100;
	} else if (player.orientation.down) {
		this.x = player.x;
		this.y = player.y + 100;
	} else if (player.orientation.left) {
		this.x = player.x - 100;
		this.y = player.y;
	} else if (player.orientation.right) {
		this.x = player.x + 100;
		this.y = player.y;
	}
}