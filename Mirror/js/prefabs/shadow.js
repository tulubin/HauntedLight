// Shadow prefab

function Shadow(game, x, y) {
	// call Sprite constructor within this object
	// new Sprite(game, x, y, key, frame)
	Phaser.Sprite.call(this, game, x, y, 'player_atlas');
	this.anchor.set(0.5);
	this.inSight = false;
	// this.alpha = 0.5;
}

// inherit prototype from Phaser.Sprite and set constructor to Shadow
// the Object.create method creates a new object w/ the specified prototype object and properties
Shadow.prototype = Object.create(Phaser.Sprite.prototype);
// since we used Object.create, we need to explicitly set the constructor
Shadow.prototype.constructor = Shadow;  

Shadow.prototype.update = function() {
	this.moveShadow();
}
Shadow.prototype.moveShadow = function() {
	if(player.lastX > this.x)
		this.x += game.rnd.integerInRange(-1, 30)/30;
	else
		this.x -= game.rnd.integerInRange(-1, 30)/30;
	if(player.lastY > this.y)
		this.y += game.rnd.integerInRange(-1, 30)/30;
	else
		this.y -= game.rnd.integerInRange(-1, 30)/30;
}