// Shadow prefab
"use strict";
function Shadow(game) {
	Phaser.Sprite.call(this, game, GRID_SIZE * 148 + GRID_SIZE / 2, GRID_SIZE * 71 + GRID_SIZE / 2, 'Shadow');
	this.anchor.set(0.5);
	this.inSight = false;
	this.moveDis = 50;
	this.startMove = false;
	// particles
	this.shadowEmitter = game.add.emitter(this.x, this.y, 1000);
	this.shadowEmitter.width = 8;
	this.shadowEmitter.height = 16;
	this.shadowEmitter.makeParticles('CrossParticle');
	this.shadowEmitter.setRotation(0, 0);
	this.shadowEmitter.gravity = -50;
	this.shadowEmitter.setXSpeed(-20, 20);
	this.shadowEmitter.setYSpeed(-5, 20);
	this.shadowEmitter.start(false, 700, 10);
	// looped event for shadow movement
	this.game.time.events.loop(1500, function () {
		if (this.startMove && !player.inMirror) {
			if (player.isHided) {
				let directionX = Math.random() < 0.5 ? -1 : 1;
				let directionY = Math.random() < 0.5 ? -1 : 1;
				let moveX = game.rnd.integerInRange(0, this.moveDis);
				let moveY = Math.sqrt(Math.pow(this.moveDis, 2) - Math.pow(moveX, 2));
				game.add.tween(shadow).to({ x: this.x + moveX * directionX, y: this.y + moveY * directionY }, 1499, Phaser.Easing.Quadratic.InOut, true);
			} else {
				let moveX = (player.lastX - this.x) / Phaser.Math.distance(this.x, this.y, player.lastX, player.lastY) * this.moveDis;
				let moveY = (player.lastY - this.y) / Phaser.Math.distance(this.x, this.y, player.lastX, player.lastY) * this.moveDis;
				game.add.tween(shadow).to({ x: this.x + moveX, y: this.y + moveY }, 1499, Phaser.Easing.Quadratic.InOut, true);
			}
		}
	}, this)
}

Shadow.prototype = Object.create(Phaser.Sprite.prototype);
Shadow.prototype.constructor = Shadow;

Shadow.prototype.update = function () {
	this.shadowEmitter.x = this.x;
	this.shadowEmitter.y = this.y;
}