// Shadow prefab

function Shadow(game) {
	// call Sprite constructor within this object
	// new Sprite(game, x, y, key, frame)
	Phaser.Sprite.call(this, game, GRID_SIZE * 148 + GRID_SIZE / 2, GRID_SIZE * 71 + GRID_SIZE / 2, 'Shadow');
	this.anchor.set(0.5);
	this.inSight = false;
	this.moveDis = 80;
	this.alpha = 0.5;
	this.startMove = false;
	// particles
	this.shadowEmitter = game.add.emitter(this.x, this.y, 1000);
	this.shadowEmitter.width = 8;
	this.shadowEmitter.height = 16;
	this.shadowEmitter.makeParticles('CrossParticle');
	// this.addChild(this.shadowEmitter);
	this.shadowEmitter.setRotation(0, 0);
	// this.shadowEmitter.setAlpha(0.3, 0.6);
	// this.shadowEmitter.setScale(0.02, 0.1, 0.02, 0.1);
	this.shadowEmitter.gravity = -50;
	this.shadowEmitter.setXSpeed(-20, 20);
	this.shadowEmitter.setYSpeed(-5, 20);
	// this.shadowEmitter.x = ;
	// this.shadowEmitter.y = ;
	this.shadowEmitter.start(false, 700, 20);
	// this.shadowEmitter.emitParticle();
	// this.shadowEmitter.start(true, 1000, null, 30);
	// x = Phaser.Math.distance(this.x, this.y, player.lastX, player.lastY)-this.moveDis
	this.game.time.events.loop(1500, function () {
		if (this.startMove && !player.inMirror) {
			if (player.isHided) {
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
	this.shadowEmitter.x = this.x;
	this.shadowEmitter.y = this.y;
}