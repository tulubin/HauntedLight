// Player prefab

function Player(game) {
	// call Sprite constructor within this object
	// new Sprite(game, x, y, key, frame)
	Phaser.Sprite.call(this, game, GRID_SIZE * 52 + GRID_SIZE / 2, GRID_SIZE * 77 + GRID_SIZE / 2, 'Player');
	this.anchor.set(0.5);
	this.currentHP = 100;   // for debuging
	this.maxHP = 100;
	this.currentMP = 100;   // for debuging
	this.maxMP = 100;
	this.sprinting = false;
	this.lastX = this.x;
	this.lastY = this.y;
	this.walkingDuration = 500;
	this.tweenCompleted = true;
	this.orientation = { up: false, down: true, left: false, right: false };
	this.lightAngle = Math.PI * 0.4;
	this.numberOfRays = this.lightAngle * 50;
	this.rayLength = 120;
	this.hided = false;
	this.recoverMP = true;
	// Player sounds:
	footstep = game.add.audio('footstep');

	game.camera.follow(this, 0, 1, 1);

	//Add Player animation
	this.animations.add('walkUp', [4, 5, 6, 7], 6, true);
	this.animations.add('walkDown', [0, 1, 2, 3], 6, true);
	this.animations.add('walkLeft', [8, 9, 10, 11], 6, true);
	this.animations.add('walkRight', [12, 13, 14, 15], 6, true);

	timer = game.time.create(false);
	timer.loop(Phaser.Timer.SECOND, function () {
		if ((Phaser.Math.distance(this.x, this.y, shadow.x, shadow.y) < 100) && !this.hided)
			this.currentHP -= 5;
		if (this.currentMP < this.maxHP && this.recoverMP)
			this.currentMP += 15;
		if ((this.hided) && (this.currentHP < this.maxHP))
			this.currentHP += 15;
		if (this.currentHP > this.maxHP)
			this.currentHP = this.maxHP;
		if (this.currentHP < 0)
			this.currentHP = 0;
		if (this.currentMP > this.maxMP)
			this.currentMP = this.maxMP;
		if (this.currentMP < 0)
			this.currentMP = 0;
		if (!game.input.keyboard.upDuration(Phaser.Keyboard.SHIFT, 2000) && !game.input.keyboard.isDown(Phaser.Keyboard.SHIFT)) {
			this.recoverMP = true;
		}
	}, this);
	timer.start();

	shadow = new Shadow(game, this.x + 100, this.y + 100);
	game.add.existing(shadow);

	this.addLight();
}

// inherit prototype from Phaser.Sprite and set constructor to Player
// the Object.create method creates a new object w/ the specified prototype object and properties
Player.prototype = Object.create(Phaser.Sprite.prototype);
// since we used Object.create, we need to explicitly set the constructor
Player.prototype.constructor = Player;

Player.prototype.update = function () {
	if (Phaser.Math.distance(this.lastX, this.lastY, shadow.x, shadow.y) < shadow.moveDis)
		this.updatePlayerXY();
	this.updateLight();
	// Player Controls:
	if ((game.input.keyboard.isDown(Phaser.Keyboard.SHIFT)) && (this.currentMP > 10)) {
		this.walkingDuration = 250;
		this.sprinting = true;
	} else {
		this.sprinting = false;
		this.walkingDuration = 500;
	}
	if (game.input.keyboard.isDown(Phaser.Keyboard.UP) && this.tweenCompleted) {
		this.animations.play("walkUp");
		this.orientation = { up: true, down: false, left: false, right: false }
		if (!game.input.keyboard.downDuration(Phaser.Keyboard.UP, CONTROL_RESPONSE_DELAY)) {
			this.checkCollision(this.centerX, this.centerY - 32, this.orientation);
		}
	} else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN) && this.tweenCompleted) {
		this.animations.play("walkDown");
		this.orientation = { up: false, down: true, left: false, right: false }
		if (!game.input.keyboard.downDuration(Phaser.Keyboard.DOWN, CONTROL_RESPONSE_DELAY)) {
			this.checkCollision(this.centerX, this.centerY + 32, this.orientation);
		}
	} else if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT) && this.tweenCompleted) {
		this.animations.play("walkLeft");
		this.orientation = { up: false, down: false, left: true, right: false }
		if (!game.input.keyboard.downDuration(Phaser.Keyboard.LEFT, CONTROL_RESPONSE_DELAY)) {
			this.checkCollision(this.centerX - 32, this.centerY, this.orientation);
		}
	} else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) && this.tweenCompleted) {
		this.animations.play("walkRight");
		this.orientation = { up: false, down: false, left: false, right: true }
		if (!game.input.keyboard.downDuration(Phaser.Keyboard.RIGHT, CONTROL_RESPONSE_DELAY)) {
			this.checkCollision(this.centerX + 32, this.centerY, this.orientation);
		}
	}
	if ((frontObject !== null) && (game.input.keyboard.justPressed(Phaser.Keyboard.E))) {
		switch (frontObject.index) {
			case DOOR_CLOSED_INDEX:
				map.replace(DOOR_CLOSED_INDEX, DOOR_OPEN_INDEX, frontObject.x, frontObject.y, 1, 1, objectLayer);
				break;
			case DOOR_OPEN_INDEX:
				map.replace(DOOR_OPEN_INDEX, DOOR_CLOSED_INDEX, frontObject.x, frontObject.y, 1, 1, objectLayer);
				break;
			case CLOSET_1_INDEX:
			case CLOSET_1_INDEX + 1:
				map.replace(CLOSET_1_INDEX, CLOSET_1_INDEX + 2, frontObject.x - 1, frontObject.y, 2, 1, objectLayer);
				map.replace(CLOSET_1_INDEX + 1, CLOSET_1_INDEX + 3, frontObject.x, frontObject.y, 2, 1, objectLayer);
				this.hidePlayer();
				break;
			case CLOSET_1_INDEX + 2:
			case CLOSET_1_INDEX + 3:
				map.replace(CLOSET_1_INDEX + 2, CLOSET_1_INDEX, frontObject.x - 1, frontObject.y, 2, 1, objectLayer);
				map.replace(CLOSET_1_INDEX + 3, CLOSET_1_INDEX + 1, frontObject.x, frontObject.y, 2, 1, objectLayer);
				this.unhidePlayer();
				break;
			case CLOSET_2_INDEX:
			case CLOSET_2_INDEX + 1:
				map.replace(CLOSET_2_INDEX, CLOSET_2_INDEX + 2, frontObject.x - 1, frontObject.y, 2, 1, objectLayer);
				map.replace(CLOSET_2_INDEX + 1, CLOSET_2_INDEX + 3, frontObject.x, frontObject.y, 2, 1, objectLayer);
				this.hidePlayer();
				break;
			case CLOSET_2_INDEX + 2:
			case CLOSET_2_INDEX + 3:
				map.replace(CLOSET_2_INDEX + 2, CLOSET_2_INDEX, frontObject.x - 1, frontObject.y, 2, 1, objectLayer);
				map.replace(CLOSET_2_INDEX + 3, CLOSET_2_INDEX + 1, frontObject.x, frontObject.y, 2, 1, objectLayer);
				this.unhidePlayer();
				break;
			case DESK_1_INDEX:
			case DESK_1_INDEX + 1:
				map.replace(DESK_1_INDEX, DESK_1_INDEX + 2, frontObject.x - 1, frontObject.y, 2, 1, objectLayer);
				map.replace(DESK_1_INDEX + 1, DESK_1_INDEX + 3, frontObject.x, frontObject.y, 2, 1, objectLayer);
				this.hidePlayer();
				break;
			case DESK_1_INDEX + 2:
			case DESK_1_INDEX + 3:
				map.replace(DESK_1_INDEX + 2, DESK_1_INDEX, frontObject.x - 1, frontObject.y, 2, 1, objectLayer);
				map.replace(DESK_1_INDEX + 3, DESK_1_INDEX + 1, frontObject.x, frontObject.y, 2, 1, objectLayer);
				this.unhidePlayer();
				break;
			case DESK_2_INDEX:
			case DESK_2_INDEX + 1:
				map.replace(DESK_2_INDEX, DESK_2_INDEX + 2, frontObject.x - 1, frontObject.y, 2, 1, objectLayer);
				map.replace(DESK_2_INDEX + 1, DESK_2_INDEX + 3, frontObject.x, frontObject.y, 2, 1, objectLayer);
				this.hidePlayer();
				break;
			case DESK_2_INDEX + 2:
			case DESK_2_INDEX + 3:
				map.replace(DESK_2_INDEX + 2, DESK_2_INDEX, frontObject.x - 1, frontObject.y, 2, 1, objectLayer);
				map.replace(DESK_2_INDEX + 3, DESK_2_INDEX + 1, frontObject.x, frontObject.y, 2, 1, objectLayer);
				this.unhidePlayer();
				break;
			case BED_1_INDEX:
			case BED_1_INDEX + 1:
				map.replace(BED_1_INDEX, BED_1_INDEX + 2, frontObject.x - 1, frontObject.y, 2, 1, objectLayer);
				map.replace(BED_1_INDEX + 1, BED_1_INDEX + 3, frontObject.x, frontObject.y, 2, 1, objectLayer);
				this.hidePlayer();
				break;
			case BED_1_INDEX + 2:
			case BED_1_INDEX + 3:
				map.replace(BED_1_INDEX + 2, BED_1_INDEX, frontObject.x - 1, frontObject.y, 2, 1, objectLayer);
				map.replace(BED_1_INDEX + 3, BED_1_INDEX + 1, frontObject.x, frontObject.y, 2, 1, objectLayer);
				this.unhidePlayer();
				break;
			case BED_2_INDEX:
			case BED_2_INDEX + 1:
				map.replace(BED_2_INDEX, BED_2_INDEX + 2, frontObject.x - 1, frontObject.y, 2, 1, objectLayer);
				map.replace(BED_2_INDEX + 1, BED_2_INDEX + 3, frontObject.x, frontObject.y, 2, 1, objectLayer);
				this.hidePlayer();
				break;
			case BED_2_INDEX + 2:
			case BED_2_INDEX + 3:
				map.replace(BED_2_INDEX + 2, BED_2_INDEX, frontObject.x - 1, frontObject.y, 2, 1, objectLayer);
				map.replace(BED_2_INDEX + 3, BED_2_INDEX + 1, frontObject.x, frontObject.y, 2, 1, objectLayer);
				this.unhidePlayer();
				break;
			// default:
		}
	}
	this.updateFrontObject(this.orientation);
	// Play footsetps while moving:
	if (this.tweenCompleted === true) {
		footstep.stop();
		this.animations.stop();
	}
}

// move Player:
Player.prototype.movePlayer = function (directions) {
	// function movePlayer(directions) {
	footstep.play('', 0, 1, false, true);
	if (directions.up === true) {
		playerTween = game.add.tween(this).to({ x: this.centerX, y: this.centerY - 32 }, this.walkingDuration, Phaser.Easing.Linear.None, true);
	} else if (directions.down === true) {
		playerTween = game.add.tween(this).to({ x: this.centerX, y: this.centerY + 32 }, this.walkingDuration, Phaser.Easing.Linear.None, true);
	} else if (directions.left === true) {
		playerTween = game.add.tween(this).to({ x: this.centerX - 32, y: this.centerY }, this.walkingDuration, Phaser.Easing.Linear.None, true);
	} else if (directions.right === true) {
		playerTween = game.add.tween(this).to({ x: this.centerX + 32, y: this.centerY }, this.walkingDuration, Phaser.Easing.Linear.None, true);
	}
	// this.gridPosition.x += x;  
	// this.gridPosition.y += y; 
	// playerTween = game.add.tween(this).to({x: this.gridPosition.x * GRID_SIZE, y: this.gridPosition.y * GRID_SIZE}, this.walkingDuration, Phaser.Easing.Quadratic.InOut, true);
	this.tweenCompleted = false;
	playerTween.onComplete.add(this.playerTweenComplete, this);
	if (this.sprinting) {
		this.currentMP -= 10;
		this.recoverMP = false;
	}
}

// // mark when Player stop moving:
Player.prototype.checkCollision = function (x, y, directions) {
	// function checkCollision(x, y, directions) {
	// frontObject = null;
	var wallTileX = wallLayer.getTileX(x);
	var wallTileY = wallLayer.getTileY(y);
	var tile = map.getTile(wallTileX, wallTileY, wallLayer, true);

	// currentDataString = tile;
	// console.log(currentDataString);
	// if([1].includes(tile.index))
	// Check if next tile is wall
	if (tile.index === -1) {
		var objectTileX = objectLayer.getTileX(x);
		var objectTileY = objectLayer.getTileY(y);
		var tile = map.getTile(objectTileX, objectTileY, objectLayer, true);
		// Check if next tile is objects
		if (tile.index === -1) {
			this.movePlayer(directions);
		} else {
			frontObject = tile;
			// console.log(tile.index);
			if (tile.index === DOOR_CLOSED_INDEX) {
				// console.log('Press E to interact the door');
			} else if (tile.index === DOOR_OPEN_INDEX) {
				this.movePlayer(directions);
			}
		}
	}
}
Player.prototype.playerTweenComplete = function () {
	// function playerTweenComplete() {
	this.tweenCompleted = true;
	// this.updatePlayerXY();
}
Player.prototype.updateFrontObject = function (directions) {
	// function updateFrontObject(directions) {
	if (directions.up === true) {
		frontObject = map.getTile(objectLayer.getTileX(this.centerX), objectLayer.getTileY(this.centerY - 32), objectLayer, true);
		directionAngle = 90 * Math.PI / 180;
	} else if (directions.down === true) {
		frontObject = map.getTile(objectLayer.getTileX(this.centerX), objectLayer.getTileY(this.centerY + 32), objectLayer, true);
		directionAngle = 270 * Math.PI / 180;
	} else if (directions.left === true) {
		frontObject = map.getTile(objectLayer.getTileX(this.centerX - 32), objectLayer.getTileY(this.centerY), objectLayer, true);
		directionAngle = 0 * Math.PI / 180;
	} else if (directions.right === true) {
		frontObject = map.getTile(objectLayer.getTileX(this.centerX + 32), objectLayer.getTileY(this.centerY), objectLayer, true);
		directionAngle = 180 * Math.PI / 180;
	}
	if (frontObject !== null)
		frontObjectIndex = frontObject.index;
	else
		frontObjectIndex = -1;
}
Player.prototype.updatePlayerXY = function () {
	this.lastX = this.x;
	this.lastY = this.y;
}
Player.prototype.hidePlayer = function () {
	this.hided = true;
	this.visible = false;
	this.tweenCompleted = false;
	this.lightAngle = Math.PI * 2;
	this.numberOfRays = this.lightAngle * 50;
	this.rayLength = 40;
}
Player.prototype.unhidePlayer = function () {
	this.hided = false;
	this.visible = true;
	this.tweenCompleted = true;
	this.lightAngle = Math.PI * 0.4;
	this.numberOfRays = this.lightAngle * 50;
	this.rayLength = 120;
}
Player.prototype.addLight = function () {
	maskGraphics = this.game.add.graphics(0, 0);
	floorLayer.mask = maskGraphics;
	wallLayer.mask = maskGraphics;
	objectLayer.mask = maskGraphics;
	decorations.mask = maskGraphics;
	shadow.mask = maskGraphics;
	// wallLayer.mask = null; // disable mask
	// wallLayer.alpha = 0.02;
	this.alpha = 0.5;
}
Player.prototype.updateLight = function () {
	maskGraphics.clear();
	maskGraphics.lineStyle(2, 0xffffff, 1);
	maskGraphics.beginFill(0xff0000);
	var playerX = this.x;
	var playerY = this.y + 3;
	maskGraphics.moveTo(playerX, playerY);
	for (var i = 0; i < this.numberOfRays; i++) {
		var rayAngle = directionAngle - (this.lightAngle / 2) + (this.lightAngle / this.numberOfRays) * i;
		var lastX = playerX;
		var lastY = playerY;
		var lightThrough = false;
		var k = 0;
		for (var j = 1; j <= this.rayLength; j++) {
			var wallTile = map.getTile(wallLayer.getTileX(lastX), wallLayer.getTileY(lastY), wallLayer, true);
			var objectTile = map.getTile(objectLayer.getTileX(lastX), objectLayer.getTileY(lastY), objectLayer, true);
			if ((Phaser.Math.distance(lastX, lastY, shadow.x, shadow.y) < 1) && (this.currentHP > 0) && !this.hided) {
				this.currentHP -= 60 / game.time.fps;
			}
			if (lightThrough && (k >= GRID_SIZE / 2 || (wallTile.index === -1 && objectTile.index !== DOOR_CLOSED_INDEX))) {
				maskGraphics.lineTo(lastX, lastY);
				break;
			} else {
				if (wallTile.index !== -1 || objectTile.index === DOOR_CLOSED_INDEX) {
					lightThrough = true;
				}
				if (lightThrough)
					k++;
				var landingX = Math.round(playerX - (2 * j) * Math.cos(rayAngle));
				var landingY = Math.round(playerY - (2 * j) * Math.sin(rayAngle));
				lastX = landingX;
				lastY = landingY;
			}
		}
		maskGraphics.lineTo(lastX, lastY);
	}
	maskGraphics.lineTo(playerX, playerY);
	maskGraphics.endFill();
	if (!this.hided)
		floorLayer.alpha = 0.5 + Math.random() * 0.5;
};