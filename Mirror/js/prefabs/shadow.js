// Shadow prefab

function Shadow(game) {
	// call Sprite constructor within this object
	// new Sprite(game, x, y, key, frame)
	Phaser.Sprite.call(this, game, 1000, 1000, 'player_atlas');
	this.anchor.set(0.5);
}

// inherit prototype from Phaser.Sprite and set constructor to Shadow
// the Object.create method creates a new object w/ the specified prototype object and properties
Shadow.prototype = Object.create(Phaser.Sprite.prototype);
// since we used Object.create, we need to explicitly set the constructor
Shadow.prototype.constructor = Shadow;  

Shadow.prototype.update = function() {
	this.moveShadow();
}
Player.prototype.moveShadow = function() {
	
}