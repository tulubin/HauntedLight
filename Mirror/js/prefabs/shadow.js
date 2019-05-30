// Shadow prefab

function Shadow(game) {
	// call Sprite constructor within this object
	// new Sprite(game, x, y, key, frame)
	Phaser.Sprite.call(this, game, GRID_SIZE * 154 + GRID_SIZE / 2, GRID_SIZE * 70 + GRID_SIZE / 2, 'Shadow');
	this.anchor.set(0.5);
	this.inSight = false;
	this.moveDis = 80;
	this.alpha = 0.5;
	this.startMove = false;
	this.moveToReal = false;
	// x = Phaser.Math.distance(this.x, this.y, player.lastX, player.lastY)-this.moveDis
	this.game.time.events.loop(1500, function () {
		if (this.startMove && !player.inMirror) {
			if (player.hided) {
				var directionX = Math.random() < 0.5 ? -1 : 1;
				var directionY = Math.random() < 0.5 ? -1 : 1;
				var moveX = game.rnd.integerInRange(0, this.moveDis);
				var moveY = Math.sqrt(Math.pow(this.moveDis, 2) - Math.pow(moveX, 2));
				this.game.add.tween(shadow).to({ x: this.x + moveX * directionX, y: this.y + moveY * directionY }, 1499, Phaser.Easing.Quadratic.InOut, true);
			} else {
				var moveX = (player.lastX - this.x) / Phaser.Math.distance(this.x, this.y, player.lastX, player.lastY) * this.moveDis;
				var moveY = (player.lastY - this.y) / Phaser.Math.distance(this.x, this.y, player.lastX, player.lastY) * this.moveDis;
				this.game.add.tween(shadow).to({ x: this.x + moveX, y: this.y + moveY }, 1499, Phaser.Easing.Quadratic.InOut, true);
			}
		}
	}, this)
}

// inherit prototype from Phaser.Sprite and set constructor to Shadow
// the Object.create method creates a new object w/ the specified prototype object and properties
Shadow.prototype = Object.create(Phaser.Sprite.prototype);
// since we used Object.create, we need to explicitly set the constructor
Shadow.prototype.constructor = Shadow;

Shadow.prototype.update = function () {
}