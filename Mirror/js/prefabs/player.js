// Player prefab

function Player(game) {
	// call Sprite constructor within this object
	// new Sprite(game, x, y, key, frame)
	Phaser.Sprite.call(this, game, game.world.centerX, game.world.centerY, 'Player');
	this.anchor.set(0.5);

	// player sounds:
	footstep = game.add.audio('Footstep');
	
	// player physics:
	game.physics.arcade.enable(this);
	// game.physics.enable(this, Phaser.Physics.ARCADE);
	this.body.immovable = true;	
	this.gridPosition = new Phaser.Point(this.body.x/GRID_SIZE, this.body.y/GRID_SIZE);
}

// inherit prototype from Phaser.Sprite and set constructor to Player
// the Object.create method creates a new object w/ the specified prototype object and properties
Player.prototype = Object.create(Phaser.Sprite.prototype);
// since we used Object.create, we need to explicitly set the constructor
Player.prototype.constructor = Player;  

Player.prototype.update = function() {
	// this.body.velocity.x = 0;
 //    this.body.velocity.y = 0;
 //    this.body.angularVelocity = 0;

	// Player Controls:
	if((game.input.keyboard.justPressed(Phaser.Keyboard.UP) || game.input.keyboard.justPressed(Phaser.Keyboard.W)) && playerTweenCompleted) {
		movePlayer(0, -1);
	} else if ((game.input.keyboard.justPressed(Phaser.Keyboard.DOWN) || game.input.keyboard.justPressed(Phaser.Keyboard.S)) && playerTweenCompleted) {
		movePlayer(0, 1);
	} else if ((game.input.keyboard.justPressed(Phaser.Keyboard.LEFT) || game.input.keyboard.justPressed(Phaser.Keyboard.A)) && playerTweenCompleted) {
		movePlayer(-1, 0);
	} else if ((game.input.keyboard.justPressed(Phaser.Keyboard.RIGHT) || game.input.keyboard.justPressed(Phaser.Keyboard.D)) && playerTweenCompleted) {
		movePlayer(1, 0);
	}

	// Play footsetps while moving:
	if(playerTweenCompleted === true) {
		footstep.stop();
	} else if (playerTweenCompleted === false) {
		footstep.play('', 0, 1, true, false);
	}
}
// move player:
function movePlayer(x, y) {
	var playerTween;
	playerTweenCompleted = false;
	player.gridPosition.x += x;  
	player.gridPosition.y += y; 
	playerTween = game.add.tween(player).to({x: player.gridPosition.x * GRID_SIZE, y: player.gridPosition.y * GRID_SIZE}, PLAYER_WALKING_DRUATION, Phaser.Easing.Quadratic.InOut, true);
	playerTween.onComplete.add(onComplete, this);
}
// mark when player stop moving:
function onComplete() {
	playerTweenCompleted = true;
}