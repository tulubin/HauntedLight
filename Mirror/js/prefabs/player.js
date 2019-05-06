// Player prefab

function Player(game) {
	// call Sprite constructor within this object
	// new Sprite(game, x, y, key, frame)
	Phaser.Sprite.call(this, game, game.world.centerX, game.world.centerY, 'Player');
	this.anchor.set(0.5);

	// physics:
	game.physics.arcade.enable(this);
	this.body.immovable = true;	
	this.gridPosition = new Phaser.Point(this.body.x/GRID_SIZE, this.body.y/GRID_SIZE);
}

// inherit prototype from Phaser.Sprite and set constructor to Player
// the Object.create method creates a new object w/ the specified prototype object and properties
Player.prototype = Object.create(Phaser.Sprite.prototype);
// since we used Object.create, we need to explicitly set the constructor
Player.prototype.constructor = Player;  

// turn on rotation in endless nightmare mode:
Player.prototype.update = function() {
	// Controls:
	if(game.input.keyboard.justPressed(Phaser.Keyboard.UP) || game.input.keyboard.justPressed(Phaser.Keyboard.W)) {
		// player.body.velocity.y -= PLAYER_WALKING_SPEED;
		movePlayer(0, -1);
	} 
	if(game.input.keyboard.justPressed(Phaser.Keyboard.DOWN) || game.input.keyboard.justPressed(Phaser.Keyboard.S)) {
		// player.body.velocity.y += PLAYER_WALKING_SPEED;
		movePlayer(0, 1);
	}
	if(game.input.keyboard.justPressed(Phaser.Keyboard.LEFT) || game.input.keyboard.justPressed(Phaser.Keyboard.A)) {
		// player.body.velocity.x -= PLAYER_WALKING_SPEED;
		movePlayer(-1, 0);
	} 
	if(game.input.keyboard.justPressed(Phaser.Keyboard.RIGHT) || game.input.keyboard.justPressed(Phaser.Keyboard.D)) {
		// player.body.velocity.x += PLAYER_WALKING_SPEED;
		movePlayer(1, 0);
	}
}
function movePlayer(x, y) {
	player.gridPosition.x += x;  
	player.gridPosition.y += y;  // doing it player way means the player's position will always be a multiple of GRID_SIZE  
	game.add.tween(player).to({x: player.gridPosition.x * GRID_SIZE, y: player.gridPosition.y * GRID_SIZE}, PLAYER_WALKING_DRUATION, Phaser.Easing.Quadratic.InOut, true);
}