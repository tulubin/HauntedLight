// Player prefab

function Player(game) {
	// call Sprite constructor within this object
	// new Sprite(game, x, y, key, frame)
	Phaser.Sprite.call(this, game, GRID_SIZE*7+GRID_SIZE/2, GRID_SIZE*9+GRID_SIZE/2, 'player_atlas', 'child00');
	this.anchor.set(0.5);
	// player sounds:
	footstep = game.add.audio('Footstep');
	// game.camera.follow(this);
	// player physics:
	// game.physics.arcade.enable(this);
	game.camera.follow(this, 0, 1, 1);
	// game.physics.enable(this, Phaser.Physics.ARCADE);
	// this.body.setSize(32, 32, -6, -1);
	// this.body.drag.set(200);
	// this.body.maxVelocity = 50;
	// this.body.immovable = true;	
	// this.body.collideWorldBounds = true;
	// this.gridPosition = new Phaser.Point(this.body.x/GRID_SIZE, this.body.y/GRID_SIZE);

	//Add player animation
	this.animations.add("walkDown", Phaser.Animation.generateFrameNames('child', 0, 3, "", 2), 6, true);
	this.animations.add("walkUp", Phaser.Animation.generateFrameNames('child', 4, 7, "", 2), 6, true);
	this.animations.add("walkLeft", Phaser.Animation.generateFrameNames('child', 8, 11, "", 2), 6, true);
	this.animations.add("walkRight", Phaser.Animation.generateFrameNames('child', 12, 15, "", 2), 6, true);

	//  This will set Tile ID 26 (the coin) to call the hitCoin function when collided with
	// map.setTileIndexCallback(26, hitCoin, this);

	// cursors = this.game.input.keyboard.createCursorKeys();

	// this.wasd = {
	//   up: this.game.input.keyboard.addKey(Phaser.Keyboard.W),
	//   down: this.game.input.keyboard.addKey(Phaser.Keyboard.S),
	//   left: This.game.input.keyboard.addKey(Phaser.Keyboard.A),
	//   right: this.game.input.keyboard.addKey(Phaser.Keyboard.D),
	// };
}

// inherit prototype from Phaser.Sprite and set constructor to Player
// the Object.create method creates a new object w/ the specified prototype object and properties
Player.prototype = Object.create(Phaser.Sprite.prototype);
// since we used Object.create, we need to explicitly set the constructor
Player.prototype.constructor = Player;  

Player.prototype.update = function() {
	// this.body.velocity.x = 0;
	// this.body.velocity.y = 0;

	// game.physics.arcade.collide(this, terrainLayer);
		// game.physics.arcade.collide(this, terrainLayer, blockMoving, null, this);

	// Player Controls:
	if((game.input.keyboard.isDown(Phaser.Keyboard.UP) || game.input.keyboard.isDown(Phaser.Keyboard.W)) && playerTweenCompleted) {
		player.animations.play("walkUp");
		playerOrientation = { up: true, down: false, left: false, right: false }
		this.checkCollision(this.centerX, this.centerY-32, playerOrientation);
		// movePlayer({ up: true, down: false, left: false, right: false });
	} else if ((game.input.keyboard.isDown(Phaser.Keyboard.DOWN) || game.input.keyboard.isDown(Phaser.Keyboard.S)) && playerTweenCompleted) {
		player.animations.play("walkDown");
		playerOrientation = { up: false, down: true, left: false, right: false };
		this.checkCollision(this.centerX, this.centerY+32, playerOrientation);
	} else if ((game.input.keyboard.isDown(Phaser.Keyboard.LEFT) || game.input.keyboard.isDown(Phaser.Keyboard.A)) && playerTweenCompleted) {
		player.animations.play("walkLeft");
		playerOrientation = { up: false, down: false, left: true, right: false };
		this.checkCollision(this.centerX-32, this.centerY, playerOrientation);
	} else if ((game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) || game.input.keyboard.isDown(Phaser.Keyboard.D)) && playerTweenCompleted) {
		player.animations.play("walkRight");
		playerOrientation = { up: false, down: false, left: false, right: true };
		this.checkCollision(this.centerX+32, this.centerY, playerOrientation);
	} else if ((frontObject !== null) && (game.input.keyboard.justPressed(Phaser.Keyboard.E))) {
		if(frontObject.index === DOOR_CLOSED_INDEX)
			map.replace(DOOR_CLOSED_INDEX, DOOR_OPEN_INDEX, frontObject.x, frontObject.y, 1, 1, objectLayer);
		else if(frontObject.index === DOOR_OPEN_INDEX)
			map.replace(DOOR_OPEN_INDEX, DOOR_CLOSED_INDEX, frontObject.x, frontObject.y, 1, 1, objectLayer);
	}
	this.updateFrontObject(playerOrientation);

	// Play footsetps while moving:
	if(playerTweenCompleted === true) {
		footstep.stop();
		this.animations.stop();
	}
	// game.debug.text('Player velocity x: ' + player.body.velocity.x, 32, 600);
	game.debug.text('PlayerX: ' + player.centerX + ' PlayerY: ' + player.centerY, 32, 632);
}

// move player:
Player.prototype.movePlayer = function(directions) {
// function movePlayer(directions) {
	footstep.play('', 0, 1, false, true);
	if(directions.up === true) {
		playerTween = game.add.tween(player).to({x: player.centerX, y: player.centerY-32}, PLAYER_WALKING_DRUATION, Phaser.Easing.Quadratic.InOut, true);
	} else if (directions.down === true) {
		playerTween = game.add.tween(player).to({x: player.centerX, y: player.centerY+32}, PLAYER_WALKING_DRUATION, Phaser.Easing.Quadratic.InOut, true);
	} else if (directions.left === true) {
		playerTween = game.add.tween(player).to({x: player.centerX-32, y: player.centerY}, PLAYER_WALKING_DRUATION, Phaser.Easing.Quadratic.InOut, true);
	} else if (directions.right === true) {
		playerTween = game.add.tween(player).to({x: player.centerX+32, y: player.centerY}, PLAYER_WALKING_DRUATION, Phaser.Easing.Quadratic.InOut, true);
	}
	// player.gridPosition.x += x;  
	// player.gridPosition.y += y; 
	// playerTween = game.add.tween(player).to({x: player.gridPosition.x * GRID_SIZE, y: player.gridPosition.y * GRID_SIZE}, PLAYER_WALKING_DRUATION, Phaser.Easing.Quadratic.InOut, true);
	playerTweenCompleted = false;
	playerTween.onComplete.add(this.playerTweenComplete, this);
}

// // mark when player stop moving:
Player.prototype.checkCollision = function(x, y, directions) {
// function checkCollision(x, y, directions) {
	// frontObject = null;
    var terrainTileX = terrainLayer.getTileX(x);
    var terrainTileY = terrainLayer.getTileY(y);
    var tile = map.getTile(terrainTileX, terrainTileY, terrainLayer, true);

    // currentDataString = tile;
    // console.log(currentDataString);
    // if([1].includes(tile.index))
    // Check if next tile is terrain
    if(tile.index === -1) {
    	var objectTileX = objectLayer.getTileX(x);
	    var objectTileY = objectLayer.getTileY(y);
	    var tile = map.getTile(objectTileX, objectTileY, objectLayer, true);
	    // Check if next tile is objects
    	if(tile.index === -1) {
			this.movePlayer(directions);
    	} else {
    		frontObject = tile;
    		console.log(tile.index);
    		if (tile.index === DOOR_CLOSED_INDEX) {
				console.log('Press E to interact the door');
    		} else if (tile.index === DOOR_OPEN_INDEX) {
    			this.movePlayer(directions);
    		}
    	}
	}
}
Player.prototype.playerTweenComplete = function() {
// function playerTweenComplete() {
	playerTweenCompleted = true;
}
Player.prototype.updateFrontObject = function(directions) {
// function updateFrontObject(directions) {
	if(directions.up === true) {
		game.debug.text('Player Orientation: ' + "Up" , 32, 664);
		frontObject = map.getTile(objectLayer.getTileX(player.centerX), objectLayer.getTileY(player.centerY-32), objectLayer, true);
	} else if (directions.down === true) {
		game.debug.text('Player Orientation: ' + "Down" , 32, 664);
		frontObject = map.getTile(objectLayer.getTileX(player.centerX), objectLayer.getTileY(player.centerY+32), objectLayer, true);
	} else if (directions.left === true) {
		game.debug.text('Player Orientation: ' + "Left" , 32, 664);
		frontObject = map.getTile(objectLayer.getTileX(player.centerX-32), objectLayer.getTileY(player.centerY), objectLayer, true);
	} else if (directions.right === true) {
		game.debug.text('Player Orientation: ' + "Right" , 32, 664);
		frontObject = map.getTile(objectLayer.getTileX(player.centerX+32), objectLayer.getTileY(player.centerY), objectLayer, true);
	}
}