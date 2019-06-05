// Player prefab

function Player(game) {
	// call Sprite constructor within this object
	// new Sprite(game, x, y, key, frame)
	Phaser.Sprite.call(this, game, GRID_SIZE * 45 + GRID_SIZE / 2, GRID_SIZE * 77 + GRID_SIZE / 2, 'Player');
	// Phaser.Sprite.call(this, game, GRID_SIZE * 51 + GRID_SIZE / 2, GRID_SIZE * 66 + GRID_SIZE / 2, 'Player');
	this.anchor.set(0.5);
	this.tint = DARK_TINT;
	this.maxHP = playerMaxHP; // horror point
	this.currentHP = this.maxHP;
	this.maxMP = playerMaxMP; // movement point
	this.currentMP = this.maxMP;
	this.maxBattery = playerMaxBattery;
	this.currentBattery = this.maxBattery;
	this.sprinting = false;
	this.lastX = this.x;
	this.lastY = this.y;
	this.walkingDuration = 500;
	this.tweenCompleted = true;
	this.orientation = { up: false, down: true, left: false, right: false };
	this.directionAngle = 270 * Math.PI / 180;
	this.lightAngle = DEFAULT_VISION_ANGLE;
	this.numberOfRays = this.lightAngle * 25;
	this.rayLength = DEFAULT_VISION_LENGTH;
	this.isHided = false;
	this.recoverMP = true;
	this.inMirror = false;
	this.flashLightOn = false;
	this.hasFlashlight = false;
	this.switchToFlashLight = false;
	this.lightSourceX = this.x;
	this.lightSourceY = this.y + 3;
	this.frontObject = map.getTile(objectLayer.getTileX(this.centerX), objectLayer.getTileY(this.centerY + 32), objectLayer, true);
	this.frontObjectIndex = -1;
	this.switchToHUD = false;
	this.endTutorialEvent = false;
	this.inTutorial = true;
	this.colorPuzzleTrigger = false;
	this.nextColorBlock = -1;



	// for debugging:

	// Player sounds:
	footstep = game.add.audio('footstep');

	// game.camera.follow(this, 0, 0.5, 0.5);

	//Add Player animation
	this.animations.add('walkUp', [4, 5, 6, 7], 6, true);
	this.animations.add('walkDown', [0, 1, 2, 3], 6, true);
	this.animations.add('walkLeft', [8, 9, 10, 11], 6, true);
	this.animations.add('walkRight', [12, 13, 14, 15], 6, true);

	timer = game.time.create(false);
	timer.loop(Phaser.Timer.SECOND, function () {
		if ((Phaser.Math.distance(this.x, this.y, shadow.x, shadow.y) < 100) && !this.isHided)
			this.currentHP -= 5;
		if (this.currentMP < this.maxHP && this.recoverMP)
			this.currentMP += 15;
		if ((this.isHided) && (this.currentHP < this.maxHP))
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
		if (this.switchToFlashLight && this.flashLightOn && this.currentBattery >= 0) {
			if (this.currentBattery <= 0) {
				this.toggleFlashLight();
			} else {
				this.currentBattery -= 1;
				this.rayLength = DEFAULT_FLISHLIGHT_LENGTH / 2 * this.currentBattery / this.maxBattery + DEFAULT_FLISHLIGHT_LENGTH / 2;
			}

		}
	}, this);
	timer.start();

	shadow = new Shadow(game);
	game.add.existing(shadow);

	this.addLight();
	// HUD:
	// hud = new HUD(game);
	// hud.fixedToCamera = true;
	// this.toggleHUD();

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
	if (!this.isHided) {
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
			this.updateFrontObject(this.orientation);
			//call mirrorUpdate here
			if (!game.input.keyboard.downDuration(Phaser.Keyboard.UP, CONTROL_RESPONSE_DELAY)) {
				this.checkCollision(this.centerX, this.centerY - 32, this.orientation);
			}
		} else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN) && this.tweenCompleted) {
			this.animations.play("walkDown");
			this.orientation = { up: false, down: true, left: false, right: false }
			this.updateFrontObject(this.orientation);
			//call mirrorUpdate here
			if (!game.input.keyboard.downDuration(Phaser.Keyboard.DOWN, CONTROL_RESPONSE_DELAY)) {
				this.checkCollision(this.centerX, this.centerY + 32, this.orientation);
			}
		} else if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT) && this.tweenCompleted) {
			this.animations.play("walkLeft");
			this.orientation = { up: false, down: false, left: true, right: false }
			this.updateFrontObject(this.orientation);
			//call mirrorUpdate here
			if (!game.input.keyboard.downDuration(Phaser.Keyboard.LEFT, CONTROL_RESPONSE_DELAY)) {
				this.checkCollision(this.centerX - 32, this.centerY, this.orientation);
			}
		} else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) && this.tweenCompleted) {
			this.animations.play("walkRight");
			this.orientation = { up: false, down: false, left: false, right: true }
			this.updateFrontObject(this.orientation);
			//call mirrorUpdate here
			if (!game.input.keyboard.downDuration(Phaser.Keyboard.RIGHT, CONTROL_RESPONSE_DELAY)) {
				this.checkCollision(this.centerX + 32, this.centerY, this.orientation);
			}
		}
		if (game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR) && this.hasFlashlight) {
			// toggle flashlight
			this.switchToFlashLight = !this.switchToFlashLight;
			this.toggleFlashLight();
		}
	}
	// if (game.input.keyboard.justPressed(Phaser.Keyboard.U)) {
	// 	// toggle HUD
	// 	this.toggleHUD();
	// }
	if (game.input.keyboard.justPressed(Phaser.Keyboard.E) && this.tweenCompleted) {
		switch (this.frontObject.index) {
			case MIRROR_1_INDEX:
				this.mirrorParticle();
				this.tweenCompleted = false;
				this.animations.play("walkUp");
				game.camera.follow(this, 0, 0.5, 0.5);
				var newTween = game.add.tween(this).to({ x: this.centerX, y: this.centerY - 32 }, this.walkingDuration, Phaser.Easing.Quadratic.In, true);
				newTween.onComplete.addOnce(this.touchMirror, this);
				break;
			case DOOR_1_INDEX:
				map.replace(DOOR_1_INDEX, DOOR_1_INDEX + 1, this.frontObject.x, this.frontObject.y, 1, 1, objectLayer);
				break;
			case DOOR_1_INDEX + 1:
				map.replace(DOOR_1_INDEX + 1, DOOR_1_INDEX, this.frontObject.x, this.frontObject.y, 1, 1, objectLayer);
				break;
			case HIDDEN_DOOR_INDEX:
				map.replace(HIDDEN_DOOR_INDEX, HIDDEN_DOOR_INDEX + 1, this.frontObject.x, this.frontObject.y, 1, 1, objectLayer);
				break;
			case HIDDEN_DOOR_INDEX + 1:
				map.replace(HIDDEN_DOOR_INDEX + 1, HIDDEN_DOOR_INDEX, this.frontObject.x, this.frontObject.y, 1, 1, objectLayer);
				break;
			case PUZZLE_TRIGGER_1_INDEX:
				map.replace(PUZZLE_TRIGGER_1_INDEX, PUZZLE_TRIGGER_1_INDEX + 1, this.frontObject.x, this.frontObject.y, 1, 1, objectLayer);
				map.replace(PRISON_DOOR_INDEX, PRISON_DOOR_INDEX + 1, 35, 38, 1, 1, objectLayer);
				this.colorPuzzleTrigger = true;
				break;
			case PUZZLE_TRIGGER_1_INDEX + 1:
				map.replace(PUZZLE_TRIGGER_1_INDEX + 1, PUZZLE_TRIGGER_1_INDEX, this.frontObject.x, this.frontObject.y, 1, 1, objectLayer);
				map.replace(PRISON_DOOR_INDEX + 1, PRISON_DOOR_INDEX, 35, 38, 1, 1, objectLayer);
				this.colorPuzzleTrigger = false;
				break;
			case CLOSET_1_INDEX:
			case CLOSET_1_INDEX + 1:
				map.replace(CLOSET_1_INDEX, CLOSET_1_INDEX + 2, this.frontObject.x - 1, this.frontObject.y, 2, 1, objectLayer);
				map.replace(CLOSET_1_INDEX + 1, CLOSET_1_INDEX + 3, this.frontObject.x, this.frontObject.y, 2, 1, objectLayer);
				this.toggleHide();
				break;
			case CLOSET_1_INDEX + 2:
			case CLOSET_1_INDEX + 3:
				map.replace(CLOSET_1_INDEX + 2, CLOSET_1_INDEX, this.frontObject.x - 1, this.frontObject.y, 2, 1, objectLayer);
				map.replace(CLOSET_1_INDEX + 3, CLOSET_1_INDEX + 1, this.frontObject.x, this.frontObject.y, 2, 1, objectLayer);
				this.toggleHide();
				break;
			case CLOSET_2_INDEX:
			case CLOSET_2_INDEX + 1:
				map.replace(CLOSET_2_INDEX, CLOSET_2_INDEX + 2, this.frontObject.x - 1, this.frontObject.y, 2, 1, objectLayer);
				map.replace(CLOSET_2_INDEX + 1, CLOSET_2_INDEX + 3, this.frontObject.x, this.frontObject.y, 2, 1, objectLayer);
				this.toggleHide();
				break;
			case CLOSET_2_INDEX + 2:
			case CLOSET_2_INDEX + 3:
				map.replace(CLOSET_2_INDEX + 2, CLOSET_2_INDEX, this.frontObject.x - 1, this.frontObject.y, 2, 1, objectLayer);
				map.replace(CLOSET_2_INDEX + 3, CLOSET_2_INDEX + 1, this.frontObject.x, this.frontObject.y, 2, 1, objectLayer);
				this.toggleHide();
				break;
			case DESK_1_INDEX:
			case DESK_1_INDEX + 1:
				map.replace(DESK_1_INDEX, DESK_1_INDEX + 2, this.frontObject.x - 1, this.frontObject.y, 2, 1, objectLayer);
				map.replace(DESK_1_INDEX + 1, DESK_1_INDEX + 3, this.frontObject.x, this.frontObject.y, 2, 1, objectLayer);
				this.toggleHide();
				break;
			case DESK_1_INDEX + 2:
			case DESK_1_INDEX + 3:
				map.replace(DESK_1_INDEX + 2, DESK_1_INDEX, this.frontObject.x - 1, this.frontObject.y, 2, 1, objectLayer);
				map.replace(DESK_1_INDEX + 3, DESK_1_INDEX + 1, this.frontObject.x, this.frontObject.y, 2, 1, objectLayer);
				this.toggleHide();
				break;
			case DESK_2_INDEX:
			case DESK_2_INDEX + 1:
				map.replace(DESK_2_INDEX, DESK_2_INDEX + 2, this.frontObject.x - 1, this.frontObject.y, 2, 1, objectLayer);
				map.replace(DESK_2_INDEX + 1, DESK_2_INDEX + 3, this.frontObject.x, this.frontObject.y, 2, 1, objectLayer);
				this.toggleHide();
				break;
			case DESK_2_INDEX + 2:
			case DESK_2_INDEX + 3:
				map.replace(DESK_2_INDEX + 2, DESK_2_INDEX, this.frontObject.x - 1, this.frontObject.y, 2, 1, objectLayer);
				map.replace(DESK_2_INDEX + 3, DESK_2_INDEX + 1, this.frontObject.x, this.frontObject.y, 2, 1, objectLayer);
				this.toggleHide();
				break;
			case BED_1_INDEX:
			case BED_1_INDEX + 1:
				map.replace(BED_1_INDEX, BED_1_INDEX + 2, this.frontObject.x - 1, this.frontObject.y, 2, 1, objectLayer);
				map.replace(BED_1_INDEX + 1, BED_1_INDEX + 3, this.frontObject.x, this.frontObject.y, 2, 1, objectLayer);
				this.toggleHide();
				break;
			case BED_1_INDEX + 2:
			case BED_1_INDEX + 3:
				map.replace(BED_1_INDEX + 2, BED_1_INDEX, this.frontObject.x - 1, this.frontObject.y, 2, 1, objectLayer);
				map.replace(BED_1_INDEX + 3, BED_1_INDEX + 1, this.frontObject.x, this.frontObject.y, 2, 1, objectLayer);
				this.toggleHide();
				break;
			case BED_2_INDEX:
			case BED_2_INDEX + 1:
				map.replace(BED_2_INDEX, BED_2_INDEX + 2, this.frontObject.x - 1, this.frontObject.y, 2, 1, objectLayer);
				map.replace(BED_2_INDEX + 1, BED_2_INDEX + 3, this.frontObject.x, this.frontObject.y, 2, 1, objectLayer);
				this.toggleHide();
				break;
			case BED_2_INDEX + 2:
			case BED_2_INDEX + 3:
				map.replace(BED_2_INDEX + 2, BED_2_INDEX, this.frontObject.x - 1, this.frontObject.y, 2, 1, objectLayer);
				map.replace(BED_2_INDEX + 3, BED_2_INDEX + 1, this.frontObject.x, this.frontObject.y, 2, 1, objectLayer);
				this.toggleHide();
				break;
			// default:
		}
		this.updateFrontObject(this.orientation);
	}

	// Play footsetps while moving:
	if (this.tweenCompleted === true) {
		footstep.stop();
		this.animations.stop();
	}
}

// move Player:
Player.prototype.movePlayer = function (directions) {
	if (!this.isHided) {
		footstep.play('', 0, 1, false, true);
		if (directions.up === true) {
			this.playerTween = game.add.tween(this).to({ x: this.centerX, y: this.centerY - 32 }, this.walkingDuration, Phaser.Easing.Linear.None, true);
		} else if (directions.down === true) {
			this.playerTween = game.add.tween(this).to({ x: this.centerX, y: this.centerY + 32 }, this.walkingDuration, Phaser.Easing.Linear.None, true);
		} else if (directions.left === true) {
			this.playerTween = game.add.tween(this).to({ x: this.centerX - 32, y: this.centerY }, this.walkingDuration, Phaser.Easing.Linear.None, true);
		} else if (directions.right === true) {
			this.playerTween = game.add.tween(this).to({ x: this.centerX + 32, y: this.centerY }, this.walkingDuration, Phaser.Easing.Linear.None, true);
		}
		this.tweenCompleted = false;
		this.playerTween.onComplete.add(this.playerTweenComplete, this);
		if (this.sprinting) {
			this.currentMP -= 5;
			this.recoverMP = false;
		}
	}
}

// check if player can move forward:
Player.prototype.checkCollision = function (x, y, directions) {
	var frontTileX = floorLayer.getTileX(x);
	var frontTileY = floorLayer.getTileY(y);
	var wallTile = map.getTile(frontTileX, frontTileY, wallLayer, true);
	if (wallTile.index === -1) { // check if it's not a wall
		var objectTile = map.getTile(frontTileX, frontTileY, objectLayer, true);
		switch (objectTile.index) { // check certain object for collision
			case DOOR_1_INDEX + 1:	// open door pass through
			case PRISON_DOOR_INDEX + 1:
			case HIDDEN_DOOR_INDEX + 1:
				this.movePlayer(directions);
				break;
			case CHEST_FLASHLIGHT_INDEX: // collect chest flashlight
				this.animations.play("walkUp");
				footstep.play('', 0, 1, false, true);
				var newTween = game.add.tween(this).to({ x: this.centerX, y: this.centerY - 32 }, this.walkingDuration, Phaser.Easing.Linear.None, true);
				this.tweenCompleted = false;
				newTween.onComplete.addOnce(this.flashlightPickupEvent, this);
				break;
			case -1: // no object infront
				this.movePlayer(directions);
				break;
			default:
		}
	}
}
Player.prototype.playerTweenComplete = function () {
	this.tweenCompleted = true;
	this.updateFrontObject(this.orientation);
	if (this.colorPuzzleTrigger)
		this.colorPuzzle();
}
Player.prototype.updateFrontObject = function (directions) {
	if (directions.up === true) {
		this.frontObject = map.getTile(objectLayer.getTileX(this.centerX), objectLayer.getTileY(this.centerY - 32), objectLayer, true);
		this.directionAngle = 90 * Math.PI / 180;
	} else if (directions.down === true) {
		this.frontObject = map.getTile(objectLayer.getTileX(this.centerX), objectLayer.getTileY(this.centerY + 32), objectLayer, true);
		this.directionAngle = 270 * Math.PI / 180;
	} else if (directions.left === true) {
		this.frontObject = map.getTile(objectLayer.getTileX(this.centerX - 32), objectLayer.getTileY(this.centerY), objectLayer, true);
		this.directionAngle = 0 * Math.PI / 180;
	} else if (directions.right === true) {
		this.frontObject = map.getTile(objectLayer.getTileX(this.centerX + 32), objectLayer.getTileY(this.centerY), objectLayer, true);
		this.directionAngle = 180 * Math.PI / 180;
	}
	if (this.frontObject !== null)
		this.frontObjectIndex = this.frontObject.index;
	else
		this.frontObjectIndex = -1;
}
Player.prototype.updatePlayerXY = function () {
	this.lastX = this.x;
	this.lastY = this.y;
}
Player.prototype.toggleHide = function () {
	this.isHided = !this.isHided;
	this.visible = !this.visible;
	this.toggleFlashLight();
}
Player.prototype.addLight = function () {
	maskGraphics = this.game.add.graphics(0, 0);
	floorLayer.mask = maskGraphics;
	wallLayer.mask = maskGraphics;
	objectLayer.mask = maskGraphics;
	decorations.mask = maskGraphics;
	shadow.mask = maskGraphics;
}
Player.prototype.updateLight = function () {
	maskGraphics.clear();
	maskGraphics.lineStyle(2, RESET_TINT, 1);
	maskGraphics.beginFill(RESET_TINT);
	this.lightSourceX = this.x;
	this.lightSourceY = this.y + 3;
	maskGraphics.moveTo(this.lightSourceX, this.lightSourceY);
	for (var i = 0; i < this.numberOfRays; i++) {
		var rayAngle = this.directionAngle - (this.lightAngle / 2) + (this.lightAngle / this.numberOfRays) * i;
		var lastX = this.lightSourceX;
		var lastY = this.lightSourceY;
		var lightThrough = false;
		var k = 0;
		for (var j = 1; j <= this.rayLength; j++) {
			var wallTile = map.getTile(wallLayer.getTileX(lastX), wallLayer.getTileY(lastY), wallLayer, true);
			var objectTile = map.getTile(objectLayer.getTileX(lastX), objectLayer.getTileY(lastY), objectLayer, true);
			if ((Phaser.Math.distance(lastX, lastY, shadow.x, shadow.y) < 8) && (this.currentHP > 0) && !this.isHided) {
				this.currentHP -= 0.3 / game.time.fps;
				if (!shadow.startMove) {
					this.endTutorialEvent = true;
					if (!this.inTutorial) {
						shadow.startMove = true;
					}
				}
			}
			if (lightThrough && (k >= 12 || (wallTile.index === -1 && objectTile.index !== DOOR_1_INDEX && objectTile.index !== HIDDEN_DOOR_INDEX))) {
				maskGraphics.lineTo(lastX, lastY);
				break;
			} else {
				if (wallTile.index !== -1 || objectTile.index === DOOR_1_INDEX || objectTile.index === HIDDEN_DOOR_INDEX) {
					lightThrough = true;
				}
				if (lightThrough)
					k++;
				var landingX = Math.round(this.lightSourceX - (2 * j) * Math.cos(rayAngle));
				var landingY = Math.round(this.lightSourceY - (2 * j) * Math.sin(rayAngle));
				lastX = landingX;
				lastY = landingY;
			}
		}
		maskGraphics.lineTo(lastX, lastY);
	}
	maskGraphics.lineTo(this.lightSourceX, this.lightSourceY);
	maskGraphics.endFill();
	if (this.switchToFlashLight && this.flashLightOn) {
		var ran = Math.random();
		floorLayer.tint = (ran < 0.5) ? RESET_TINT : LIGHT_TINT;
		wallLayer.tint = (ran < 0.5) ? RESET_TINT : LIGHT_TINT;
		objectLayer.tint = (ran < 0.5) ? RESET_TINT : LIGHT_TINT;
		decorations.tint = (ran < 0.5) ? RESET_TINT : LIGHT_TINT;
		// floorLayer.alpha = 0.5 + Math.random() * 0.5;
	}
}
Player.prototype.toggleFlashLight = function () {
	if (this.currentBattery > 0) {
		if (!this.flashLightOn && this.hasFlashlight && !this.isHided && this.switchToFlashLight) {
			this.lightAngle = DEFAULT_FLASHLIGHT_ANGLE;
			this.rayLength = DEFAULT_FLISHLIGHT_LENGTH / 2 * this.currentBattery / this.maxBattery + DEFAULT_FLISHLIGHT_LENGTH / 2;
		} else {
			this.lightAngle = DEFAULT_VISION_ANGLE;
			this.rayLength = DEFAULT_VISION_LENGTH;
			this.tint = DARK_TINT;
			floorLayer.tint = DARK_TINT;
			wallLayer.tint = DARK_TINT;
			objectLayer.tint = DARK_TINT;
			decorations.tint = DARK_TINT;
		}
		this.flashLightOn = !this.flashLightOn;
		hud.flashlight_icon.visible = this.switchToFlashLight && this.flashLightOn;
		hud.battery_level.visible = this.switchToFlashLight && this.flashLightOn;
	} else {
		console.log('Zero Battery!');
		this.lightAngle = DEFAULT_VISION_ANGLE;
		this.rayLength = DEFAULT_VISION_LENGTH;
		this.tint = DARK_TINT;
		floorLayer.tint = DARK_TINT;
		wallLayer.tint = DARK_TINT;
		objectLayer.tint = DARK_TINT;
		decorations.tint = DARK_TINT;
		this.flashLightOn = false;
		hud.flashlight_icon.visible = false;
		hud.battery_level.visible = false;
	}
}

// Player.prototype.toggleHUD = function () {
// 	if (!this.switchToHUD) {
// 		hud = new HUD(game);
// 		hud.fixedToCamera = true;
// 	} else {
// 		hud.destroy(true);
// 	}
// 	this.switchToHUD = !this.switchToHUD;
// }
Player.prototype.flashlightPickupEvent = function () {
	if (!this.hasFlashlight) {
		console.log('you picked up a flashlight!');
		this.hasFlashlight = true;
		this.switchToFlashLight = true;
		this.loadTexture('Player_f', 4);
		var tile = map.getTile(wallLayer.getTileX(player.centerX), wallLayer.getTileY(player.centerY), objectLayer, true);
		map.replace(CHEST_FLASHLIGHT_INDEX, -1, tile.x, tile.y, 1, 1, objectLayer);
		this.toggleFlashLight();
	}
	this.tweenCompleted = true;
	this.updateFrontObject(this.orientation);
}

// Player.prototype.mirrorUpdate = function () {
// 	//update mirror for approching
// 	if (!this.switchToFlashLight) {
// 		if ((this.frontObject.index == MIRROR_1_INDEX)) {
// 			map.replace(MIRROR_1_INDEX, MIRROR_1_INDEX + 1, this.frontObject.x, this.frontObject.y, 1, 1, objectLayer);
// 		}
// 	}
// 	else {
// 		if ((this.frontObject.index == MIRROR_1_INDEX)) {
// 			map.replace(MIRROR_1_INDEX, MIRROR_1_INDEX + 5, this.frontObject.x, this.frontObject.y, 1, 1, objectLayer);
// 		}
// 	}
// 	//update mirror for leaving

// }

Player.prototype.colorPuzzle = function () {
	var tileX = floorLayer.getTileX(player.centerX);
	var tileY = floorLayer.getTileY(player.centerY);
	var tile = map.getTile(tileX, tileY, floorLayer, true);
	if (this.nextColorBlock === -1 && tile.index === PUZZLE_COLOR_BLOCK_YELLOW_INDEX)
		this.nextColorBlock = PUZZLE_COLOR_BLOCK_YELLOW_INDEX;
	switch (tile.index) {
		case PUZZLE_COLOR_BLOCK_YELLOW_INDEX:
			if (this.nextColorBlock === PUZZLE_COLOR_BLOCK_YELLOW_INDEX) {
				this.nextColorBlock = PUZZLE_COLOR_BLOCK_BLUE_INDEX;
			} else {
				this.resetColorPuzzleTrigger();
			}
			break;
		case PUZZLE_COLOR_BLOCK_BLUE_INDEX:
			if (this.nextColorBlock === PUZZLE_COLOR_BLOCK_BLUE_INDEX) {
				this.nextColorBlock = PUZZLE_COLOR_BLOCK_GREEN_INDEX;
			} else {
				this.resetColorPuzzleTrigger();
			}
			break;
		case PUZZLE_COLOR_BLOCK_GREEN_INDEX:
			if (this.nextColorBlock === PUZZLE_COLOR_BLOCK_GREEN_INDEX) {
				this.nextColorBlock = PUZZLE_COLOR_BLOCK_RED_INDEX;
			} else {
				this.resetColorPuzzleTrigger();
			}
			break;
		case PUZZLE_COLOR_BLOCK_RED_INDEX:
			if (this.nextColorBlock === PUZZLE_COLOR_BLOCK_RED_INDEX) {
				this.nextColorBlock = PUZZLE_COLOR_BLOCK_YELLOW_INDEX;
			} else {
				this.resetColorPuzzleTrigger();
			}
			break;
		default:
			break;
	}
}
Player.prototype.resetColorPuzzleTrigger = function () {
	this.nextColorBlock = -1;
	this.colorPuzzleTrigger = false;
	map.replace(PUZZLE_TRIGGER_1_INDEX + 1, PUZZLE_TRIGGER_1_INDEX, 54, 39, 1, 1, objectLayer);
	map.replace(PRISON_DOOR_INDEX + 1, PRISON_DOOR_INDEX, 35, 38, 1, 1, objectLayer);
	console.log('trigger reseted.');
}
Player.prototype.mirrorParticle = function () {
	this.mirrorEmitter = game.add.emitter(this.frontObject.worldX + 16, this.frontObject.worldY + 16, 100);
	this.mirrorEmitter.width = 16;
	this.mirrorEmitter.height = 24;
	this.mirrorEmitter.makeParticles('Particle');
	this.mirrorEmitter.setRotation(0, 0);
	// this.mirrorEmitter.setAlpha(0.1, 0.2);
	// this.mirrorEmitter.setScale(0.02, 0.1, 0.02, 0.1);
	// this.mirrorEmitter.gravity = -300;
	// this.mirrorEmitter.setXSpeed(0, 0);
	// this.mirrorEmitter.setYSpeed(0, 0);
	// this.mirrorEmitter.x = ;
	// this.mirrorEmitter.y = ;
	// this.mirrorEmitter.start(false, 500, null);
	this.mirrorEmitter.start(true, 1000, null, 100);
	this.mirrorEmitter.forEach(this.mirrorSetUp, this);
}
Player.prototype.mirrorSetUp = function (particle) {
	if (!particle.exists) {
		particle.alpha = 1;
	}
	game.add.tween(particle).to({ alpha: 0 }, 1000, Phaser.Easing.Cubic.Out, true);
	game.add.tween(particle.scale).to({ x: 4, y: 4 }, 1000, Phaser.Easing.Cubic.Out, true);
	// var tween = game.add.tween(particle).to({ x: this.x + game.rnd.integerInRange(-8, 8), y: this.y + game.rnd.integerInRange(-8, 8) }, game.rnd.integerInRange(1000, 2000), Phaser.Easing.Linear.None, true);
	// var tween = game.add.tween(particle).to({ x: this.x + game.rnd.integerInRange(-8, 8), y: this.y + game.rnd.integerInRange(-8, 8) }, 1000, Phaser.Easing.Linear.None, true);
	// tween.onComplete.add(function (particle) {
	// 	particle.destroy();
	// }, this);
}
Player.prototype.touchMirror = function () {
	if (this.inMirror) {
		this.x -= 100 * GRID_SIZE;
		if (this.endTutorialEvent) {
			shadow.x -= 100 * GRID_SIZE;
			shadow.y += 3 * GRID_SIZE;
			this.inTutorial = false;
			this.endTutorialEvent = false;
			hud.upKey.destroy();
			hud.downKey.destroy();
			hud.leftKey.destroy();
			hud.rightKey.destroy();
			hud.sprintKey.destroy();
			hud.sprintText.destroy();
			hud.spacebar.destroy();
			hud.spacebarText.destroy();
			map.replace(PRISON_DOOR_INDEX, PRISON_DOOR_INDEX + 1, 48, 75, 1, 1, objectLayer);
		}
	}
	else {
		this.x += 100 * GRID_SIZE;
	}
	this.inMirror = !this.inMirror;
	this.animations.play("walkDown");
	this.orientation = { up: false, down: true, left: false, right: false };
	this.updateFrontObject(this.orientation);
	var newTween = game.add.tween(this).to({ x: this.centerX, y: this.centerY + 32 }, this.walkingDuration, Phaser.Easing.Quadratic.Out, true);
	newTween.onComplete.addOnce(this.playerTweenComplete, this);
	game.time.events.add(Phaser.Timer.SECOND * 1, function () {
		game.camera.follow(this, 0, 0.2, 0.2);
	}, this);
}

