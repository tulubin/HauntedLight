// Player prefab
"use strict";
function Player(game) {
	Phaser.Sprite.call(this, game, GRID_SIZE * 47 + GRID_SIZE / 2, GRID_SIZE * 77 + GRID_SIZE / 2, 'Player');
	this.anchor.set(0.5);
	game.camera.follow(this, 0, 1, 1);
	// initiallize the variables:
	// for player properities:
	this.maxFPS = 60;
	this.tint = DARK_TINT; // tint the character so it fits the darkness
	this.maxHP = playerMaxHP; // horror point
	this.currentHP = this.maxHP;
	this.maxMP = playerMaxMP; // movement point
	this.currentMP = this.maxMP;
	this.maxBattery = playerMaxBattery; // battery level of flashlight
	this.currentBattery = this.maxBattery;
	this.walkingDuration = 500; // time spend for one grid movement
	this.batteryStock = 0; // remaining battery
	this.hpLevel = 1; // extended HP
	this.trapBotton = 0; // trap puzzle floor botton
	this.orientation = { up: false, down: true, left: false, right: false }; // playerd irection
	// for boolean switches:
	this.recoverMP = true; // is recovering MP
	this.recoverHP = false; // is recovering HP
	this.sprinting = false; // is sprinting
	this.actionCompleted = true; // if player is finished doing any action
	this.isHided = false; // is hidden
	this.inMirror = false; // if player is in mirror world
	this.flashLightOn = false; // if player's flashlight has battery
	this.hasFlashlight = false; // if player picked up flashlight
	this.switchToFlashLight = false; // if player turns flashlight on
	this.endTutorialEvent = false; // trigger event once when end tutorial
	this.inTutorial = true; // if in tutorial
	this.colorPuzzleTrigger = false; // color puzzle trigger
	this.trapTriggered = false; // trap puzzle trigger
	this.jumpscared = false; // if spot on shadow and not yet walk far from it.
	// for flashlight method:
	this.lastX = this.x; // variable for light method
	this.lastY = this.y; // variable for light method
	this.directionAngle = 270 * Math.PI / 180;
	this.lightAngle = DEFAULT_VISION_ANGLE;
	this.numberOfRays = this.lightAngle * 25;
	this.rayLength = DEFAULT_VISION_LENGTH;
	this.lightSourceX = this.x;
	this.lightSourceY = this.y + 3;
	// for tile properities:
	this.frontObject = map.getTile(objectLayer.getTileX(this.centerX), objectLayer.getTileY(this.centerY + 32), objectLayer, true); // the object tile that player facing
	this.frontObjectIndex = -1; // index of front object tile
	this.nextColorBlock = -1; // next color block that player should move to, in color puzzle
	// Add Player animation
	this.animations.add('walkUp', [4, 5, 6, 7], 8, true);
	this.animations.add('walkDown', [0, 1, 2, 3], 8, true);
	this.animations.add('walkLeft', [8, 9, 10, 11], 8, true);
	this.animations.add('walkRight', [12, 13, 14, 15], 8, true);
	// update loop with 1 per second for HP, MP and battery
	timer = game.time.create(false);
	timer.loop(Phaser.Timer.SECOND, function () {
		if ((Phaser.Math.distance(this.x, this.y, shadow.x, shadow.y) < 200) && !this.isHided) {
			this.currentHP -= (200 - Phaser.Math.distance(this.x, this.y, shadow.x, shadow.y)) / 20;
			if (huanted.isPlaying) {
			} else {
				huanted.play();
			}
		} else {
			huanted.stop();
		}
		if (Phaser.Math.distance(this.x, this.y, shadow.x, shadow.y) > 200)
			this.jumpscared = false;
		if (this.currentHP > this.maxHP * this.hpLevel)
			this.currentHP = this.maxHP * this.hpLevel;
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
				flashlight.play('', 0, 0.05, false, true);
				this.switchToFlashLight = !this.switchToFlashLight;
				this.toggleFlashLight();
			} else {
				this.currentBattery -= 1;
				this.rayLength = DEFAULT_FLISHLIGHT_LENGTH / 2 * this.currentBattery / this.maxBattery + DEFAULT_FLISHLIGHT_LENGTH / 2;
			}

		}
	}, this);
	timer.start();
	// spawn shadow
	shadow = new Shadow(game);
	game.add.existing(shadow);
	if (!cheat) {
		this.addLight();
	}
}

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function () {
	if (this.maxFPS < game.time.fps)
		this.maxFPS = game.time.fps;
	// light update
	if (!cheat) {
		this.maskGraphics.moveTo(this.x, this.y + 3);
		this.updateLight();
	}
	if (Phaser.Math.distance(this.lastX, this.lastY, shadow.x, shadow.y) < shadow.moveDis)
		this.updatePlayerXY();
	// Player Controls:
	if (!this.isHided)
		this.playerControls();
	if (game.input.keyboard.justPressed(Phaser.Keyboard.E) && this.actionCompleted)
		this.interactObjects();

	// stop animations:
	if (this.actionCompleted === true) {
		this.animations.stop();
	}
	// recovering HP&MP
	if ((this.recoverHP || this.isHided) && (this.currentHP < this.maxHP * this.hpLevel)) {
		this.currentHP += (20 / (game.time.fps || 60)) * this.hpLevel;
	}
	if (this.currentMP < this.maxMP && this.recoverMP) {
		this.currentMP += 20 / (game.time.fps || 60);
	}
}
Player.prototype.movePlayer = function (directions) {
	if (!this.isHided) {
		footstep.play();
		if (directions.up === true) {
			this.playerTween = game.add.tween(this).to({ x: this.centerX, y: this.centerY - 32 }, this.walkingDuration, Phaser.Easing.Linear.None, true);
		} else if (directions.down === true) {
			this.playerTween = game.add.tween(this).to({ x: this.centerX, y: this.centerY + 32 }, this.walkingDuration, Phaser.Easing.Linear.None, true);
		} else if (directions.left === true) {
			this.playerTween = game.add.tween(this).to({ x: this.centerX - 32, y: this.centerY }, this.walkingDuration, Phaser.Easing.Linear.None, true);
		} else if (directions.right === true) {
			this.playerTween = game.add.tween(this).to({ x: this.centerX + 32, y: this.centerY }, this.walkingDuration, Phaser.Easing.Linear.None, true);
		}
		this.actionCompleted = false;
		this.playerTween.onComplete.add(this.playerTweenComplete, this);
		if (this.sprinting && !cheat) {
			this.currentMP -= 5;
			this.recoverMP = false;
		}
	}
}
// check if player can move forward:
Player.prototype.checkCollision = function (x, y, directions) {
	let frontTileX = floorLayer.getTileX(x);
	let frontTileY = floorLayer.getTileY(y);
	let wallTile = map.getTile(frontTileX, frontTileY, wallLayer, true);
	if (wallTile.index === -1) { // check if it's not a wall
		let objectTile = map.getTile(frontTileX, frontTileY, objectLayer, true);
		switch (objectTile.index) { // check certain object for collision
			case DOOR_1_INDEX + 1:	// open door pass through
			case DOOR_2_R_INDEX + 1:
			case PRISONDOOR_1_INDEX + 1:
			case HIDDEN_DOOR_INDEX + 1:
			case PRISONDOOR_2_INDEX + 1:
			case PRISONDOOR_2_R_INDEX + 1:
				this.movePlayer(directions);
				break;
			case CHEST_FLASHLIGHT_INDEX: // collect chest flashlight
				this.animations.play("walkUp");
				footstep.play();
				let newTween = game.add.tween(this).to({ x: this.centerX, y: this.centerY - 32 }, this.walkingDuration, Phaser.Easing.Linear.None, true);
				this.actionCompleted = false;
				newTween.onComplete.addOnce(this.flashlightPickupEvent, this);
				break;
			case BATTERY_INDEX:
				game.time.events.add(Phaser.Timer.SECOND * 0.5, function () {
					map.replace(BATTERY_INDEX, -1, objectTile.x, objectTile.y, 1, 1, objectLayer);
				}, this);
				this.movePlayer(directions);
				this.batteryStock++;
				break;
			case PILL_INDEX:
				game.time.events.add(Phaser.Timer.SECOND * 0.5, function () {
					map.replace(PILL_INDEX, -1, objectTile.x, objectTile.y, 1, 1, objectLayer);
				}, this);
				this.movePlayer(directions);
				this.hpLevel++;
				this.recoverHP = true;
				game.time.events.add(Phaser.Timer.SECOND * 20, function () {
					this.recoverHP = false;
				}, this);
				break;
			case -1: // no object infront
				this.movePlayer(directions);
				break;
			default:
		}
	}
}
Player.prototype.playerTweenComplete = function () {
	this.animations.stop();
	this.actionCompleted = true;
	this.updateFrontObject(this.orientation);
	if (this.colorPuzzleTrigger)
		this.colorPuzzle();
	if (!this.trapTriggered) {
		if ((this.x > 61 * GRID_SIZE) && (this.x < 67 * GRID_SIZE) && (this.y > 51 * GRID_SIZE) && (this.y < 63 * GRID_SIZE)) {
			this.trapTriggers();
		}
	} else {
		this.trapPuzzle();
	}
	if (this.orientation.up) {
		this.frame = 4;
	} else if (this.orientation.down) {
		this.frame = 0;
	} else if (this.orientation.left) {
		this.frame = 8;
	} else if (this.orientation.right) {
		this.frame = 12;
	}
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
	this.maskGraphics = game.add.graphics(0, 0);
	floorLayer.mask = this.maskGraphics;
	wallLayer.mask = this.maskGraphics;
	objectLayer.mask = this.maskGraphics;
	decorations.mask = this.maskGraphics;
	shadow.mask = this.maskGraphics;
}
Player.prototype.updateLight = function () {
	this.maskGraphics.clear();
	this.maskGraphics.lineStyle(2, RESET_TINT, 1);
	this.maskGraphics.beginFill(RESET_TINT);
	this.lightSourceX = this.x;
	this.lightSourceY = this.y + 3;

	for (let i = 0; i < this.numberOfRays; i++) {
		let rayAngle = this.directionAngle - (this.lightAngle / 2) + (this.lightAngle / this.numberOfRays) * i;
		let lastX = this.lightSourceX;
		let lastY = this.lightSourceY;
		let lightThrough = false;
		let k = 0;
		for (let j = 1; j <= this.rayLength; j++) {
			let wallTile = map.getTile(wallLayer.getTileX(lastX), wallLayer.getTileY(lastY), wallLayer, true);
			let objectTile = map.getTile(objectLayer.getTileX(lastX), objectLayer.getTileY(lastY), objectLayer, true);
			if ((Phaser.Math.distance(lastX, lastY, shadow.x, shadow.y) < 8) && (this.currentHP >= 0) && !this.isHided) {
				if (!this.jumpscared) {
					this.jumpscared = true;
					jumpscare.play();
				}
				if (this.switchToFlashLight)
					this.currentHP -= 0.3 / (game.time.fps || 60);
				else
					this.currentHP -= 1 / (game.time.fps || 60);
				if (!shadow.startMove) {
					this.endTutorialEvent = true;
					if (!this.inTutorial) {
						shadow.startMove = true;
					}
				}
			}
			if (lightThrough && (k >= 12 || (wallTile.index === -1 && objectTile.index !== DOOR_1_INDEX && objectTile.index !== HIDDEN_DOOR_INDEX && objectTile.index !== DOOR_2_INDEX && objectTile.index !== DOOR_2_R_INDEX))) {
				this.maskGraphics.lineTo(lastX, lastY);
				break;
			} else {
				if (wallTile.index !== -1 || objectTile.index === DOOR_1_INDEX || objectTile.index === HIDDEN_DOOR_INDEX || objectTile.index === DOOR_2_INDEX || objectTile.index === DOOR_2_R_INDEX) {
					lightThrough = true;
				}
				if (lightThrough)
					k++;
				let landingX = Math.round(this.lightSourceX - (2 * j) * Math.cos(rayAngle));
				let landingY = Math.round(this.lightSourceY - (2 * j) * Math.sin(rayAngle));
				lastX = landingX;
				lastY = landingY;
			}
		}
		this.maskGraphics.lineTo(lastX, lastY);
	}
	this.maskGraphics.lineTo(this.lightSourceX, this.lightSourceY);
	this.maskGraphics.endFill();
	if (this.switchToFlashLight && this.flashLightOn) {
		let ran = Math.random();
		floorLayer.tint = (ran < 0.5) ? RESET_TINT : LIGHT_TINT;
		wallLayer.tint = (ran < 0.5) ? RESET_TINT : LIGHT_TINT;
		objectLayer.tint = (ran < 0.5) ? RESET_TINT : LIGHT_TINT;
		decorations.tint = (ran < 0.5) ? RESET_TINT : LIGHT_TINT;
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
Player.prototype.flashlightPickupEvent = function () {
	this.hasFlashlight = true;
	this.switchToFlashLight = true;
	this.loadTexture('Player_f', 4);
	let tile = map.getTile(wallLayer.getTileX(player.centerX), wallLayer.getTileY(player.centerY), objectLayer, true);
	map.replace(CHEST_FLASHLIGHT_INDEX, -1, tile.x, tile.y, 1, 1, objectLayer);
	this.toggleFlashLight();
	this.actionCompleted = true;
	this.updateFrontObject(this.orientation);
	hud.warningBatteryText.visible = true;
	game.time.events.add(Phaser.Timer.SECOND * 10, function () {
		hud.warningBatteryText.destroy();
	}, this);
}
Player.prototype.colorPuzzle = function () {
	let tileX = floorLayer.getTileX(player.centerX);
	let tileY = floorLayer.getTileY(player.centerY);
	let tile = map.getTile(tileX, tileY, floorLayer, true);
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
	map.replace(PUZZLE_TRIGGER_1_INDEX + 1, PUZZLE_TRIGGER_1_INDEX, 54, 37, 1, 1, objectLayer);
	map.replace(PRISONDOOR_1_INDEX + 1, PRISONDOOR_1_INDEX, 35, 38, 1, 1, objectLayer);
	closePrisonDoor.play();
}
Player.prototype.mirrorParticle = function () {
	this.mirrorEmitter = game.add.emitter(this.frontObject.worldX + 16, this.frontObject.worldY + 16, 100);
	this.mirrorEmitter.mask = this.maskGraphics;
	this.mirrorEmitter.width = 16;
	this.mirrorEmitter.height = 24;
	this.mirrorEmitter.makeParticles('Particle');
	this.mirrorEmitter.setRotation(0, 0);
	this.mirrorEmitter.setAlpha(0.2, 0.4);
	this.mirrorEmitter.start(true, 1000, null, 100);
	this.mirrorEmitter.forEach(this.mirrorParticleSetUp, this);
}
Player.prototype.mirrorParticleSetUp = function (particle) {
	if (!particle.exists) {
		particle.alpha = 1;
	}
	game.add.tween(particle).to({ alpha: 0 }, 1000, Phaser.Easing.Cubic.Out, true);
	game.add.tween(particle.scale).to({ x: 4, y: 4 }, 1000, Phaser.Easing.Cubic.Out, true);
}
Player.prototype.touchMirror = function () {
	if (this.inMirror) {
		this.x -= 100 * GRID_SIZE;
		if (this.endTutorialEvent && this.inTutorial) {
			shadow.x -= 100 * GRID_SIZE;
			shadow.y += 3 * GRID_SIZE;
			this.inTutorial = false;
			this.endTutorialEvent = false;
			map.replace(PRISONDOOR_1_INDEX, PRISONDOOR_1_INDEX + 1, 48, 75, 1, 1, objectLayer);
			openPrisonDoor.play();
			hud.warningHPText.visible = true;
			game.time.events.add(Phaser.Timer.SECOND * 10, function () {
				hud.upKey.destroy();
				hud.downKey.destroy();
				hud.leftKey.destroy();
				hud.rightKey.destroy();
				hud.sprintKey.destroy();
				hud.sprintText.destroy();
				hud.spacebar.destroy();
				hud.spacebarText.destroy();
				hud.warningHPText.destroy();
			}, this);
		}
	}
	else {
		this.x += 100 * GRID_SIZE;
	}
	this.inMirror = !this.inMirror;
	this.animations.play("walkDown");
	this.orientation = { up: false, down: true, left: false, right: false };
	this.updateFrontObject(this.orientation);
	let newTween = game.add.tween(this).to({ x: this.centerX, y: this.centerY + 32 }, this.walkingDuration, Phaser.Easing.Quadratic.Out, true);
	newTween.onComplete.addOnce(this.playerTweenComplete, this);
}

Player.prototype.playerControls = function () {
	if ((game.input.keyboard.isDown(Phaser.Keyboard.SHIFT)) && (this.currentMP > 10)) {
		this.walkingDuration = 250 / (this.maxFPS / 60);
		this.sprinting = true;
	}
	else {
		this.sprinting = false;
		this.walkingDuration = 500 / (this.maxFPS / 60);
	}
	if (game.input.keyboard.isDown(Phaser.Keyboard.UP) && this.actionCompleted) {
		this.animations.play("walkUp");
		this.orientation = { up: true, down: false, left: false, right: false };
		this.updateFrontObject(this.orientation);
		if (!game.input.keyboard.downDuration(Phaser.Keyboard.UP, CONTROL_RESPONSE_DELAY)) {
			this.checkCollision(this.centerX, this.centerY - 32, this.orientation);
		}
	}
	else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN) && this.actionCompleted) {
		this.animations.play("walkDown");
		this.orientation = { up: false, down: true, left: false, right: false };
		this.updateFrontObject(this.orientation);
		if (!game.input.keyboard.downDuration(Phaser.Keyboard.DOWN, CONTROL_RESPONSE_DELAY)) {
			this.checkCollision(this.centerX, this.centerY + 32, this.orientation);
		}
	}
	else if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT) && this.actionCompleted) {
		this.animations.play("walkLeft");
		this.orientation = { up: false, down: false, left: true, right: false };
		this.updateFrontObject(this.orientation);
		if (!game.input.keyboard.downDuration(Phaser.Keyboard.LEFT, CONTROL_RESPONSE_DELAY)) {
			this.checkCollision(this.centerX - 32, this.centerY, this.orientation);
		}
	}
	else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) && this.actionCompleted) {
		this.animations.play("walkRight");
		this.orientation = { up: false, down: false, left: false, right: true };
		this.updateFrontObject(this.orientation);
		if (!game.input.keyboard.downDuration(Phaser.Keyboard.RIGHT, CONTROL_RESPONSE_DELAY)) {
			this.checkCollision(this.centerX + 32, this.centerY, this.orientation);
		}
	}
	if (game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR) && this.hasFlashlight) {
		// toggle flashlight
		flashlight.play('', 0, 0.05, false, true);
		this.switchToFlashLight = !this.switchToFlashLight;
		if (this.currentBattery <= 0 && this.batteryStock > 0) {
			this.batteryStock--;
			this.currentBattery = this.maxBattery;
		}
		this.toggleFlashLight();
	}
}
Player.prototype.interactObjects = function () {
	switch (this.frontObject.index) {
		case PRISONDOOR_1_INDEX:
		case PRISONDOOR_1_INDEX + 1:
		case DOOR_2_R_INDEX:
		case DOOR_2_R_INDEX + 1:
		case PRISONDOOR_2_INDEX:
		case PRISONDOOR_2_INDEX + 1:
		case PRISONDOOR_2_R_INDEX:
		case PRISONDOOR_2_R_INDEX + 1:
			interact.play('', 0, 0.03, false, true);
			break;
		case MIRROR_1_INDEX:
			mirror.play('', 0, 0.2, false, true);
			this.mirrorParticle();
			this.actionCompleted = false;
			this.animations.play("walkUp");
			let newTween = game.add.tween(this).to({ x: this.centerX, y: this.centerY - 32 }, this.walkingDuration, Phaser.Easing.Quadratic.In, true);
			newTween.onComplete.addOnce(this.touchMirror, this);
			break;
		case DOOR_1_INDEX:
			this.actionCompleted = false;
			openDoor.play();
			game.time.events.add(Phaser.Timer.SECOND * 1, function () {
				map.replace(DOOR_1_INDEX, DOOR_1_INDEX + DOOR_OPENING_TIME, this.frontObject.x, this.frontObject.y, 1, 1, objectLayer);
				this.actionCompleted = true;
			}, this);
			break;
		case DOOR_1_INDEX + 1:
			closeDoor.play();
			map.replace(DOOR_1_INDEX + 1, DOOR_1_INDEX, this.frontObject.x, this.frontObject.y, 1, 1, objectLayer);
			break;
		case DOOR_2_INDEX:
			openDoor.play();
			game.state.start('End');
			break;
		case HIDDEN_DOOR_INDEX:
			this.actionCompleted = false;
			openDoor.play();
			game.time.events.add(Phaser.Timer.SECOND * 1, function () {
				map.replace(HIDDEN_DOOR_INDEX, HIDDEN_DOOR_INDEX + 1, this.frontObject.x, this.frontObject.y, 1, 1, objectLayer);
				this.actionCompleted = true;
			}, this);
			break;
		case HIDDEN_DOOR_INDEX + 1:
			closeDoor.play();
			map.replace(HIDDEN_DOOR_INDEX + 1, HIDDEN_DOOR_INDEX, this.frontObject.x, this.frontObject.y, 1, 1, objectLayer);
			break;
		case PUZZLE_TRIGGER_1_INDEX:
			trigger.play('', 0, 0.1, false, true);
			map.replace(PUZZLE_TRIGGER_1_INDEX, PUZZLE_TRIGGER_1_INDEX + 1, this.frontObject.x, this.frontObject.y, 1, 1, objectLayer);
			game.time.events.add(Phaser.Timer.SECOND * 1, function () {
				openPrisonDoor.play('', 0, 0.1, false, true);
			}, this);
			map.replace(PRISONDOOR_1_INDEX, PRISONDOOR_1_INDEX + 1, 35, 38, 1, 1, objectLayer);
			this.colorPuzzleTrigger = true;
			break;
		case PUZZLE_TRIGGER_1_INDEX + 1:
			trigger.play('', 0, 0.1, false, true);
			map.replace(PUZZLE_TRIGGER_1_INDEX + 1, PUZZLE_TRIGGER_1_INDEX, this.frontObject.x, this.frontObject.y, 1, 1, objectLayer);
			game.time.events.add(Phaser.Timer.SECOND * 1, function () {
				closePrisonDoor.play('', 0, 0.1, false, true);
			}, this);
			map.replace(PRISONDOOR_1_INDEX + 1, PRISONDOOR_1_INDEX, 35, 38, 1, 1, objectLayer);
			this.colorPuzzleTrigger = false;
			break;
		case CLOSET_1_INDEX:
		case CLOSET_1_INDEX + 2:
			this.replaceHidingSpot(CLOSET_1_INDEX, this.frontObject.x, this.frontObject.y);
			break;
		case CLOSET_1_INDEX + 1:
		case CLOSET_1_INDEX + 3:
			this.replaceHidingSpot(CLOSET_1_INDEX, this.frontObject.x - 1, this.frontObject.y);
			break;
		case CLOSET_2_INDEX:
		case CLOSET_2_INDEX + 2:
			this.replaceHidingSpot(CLOSET_2_INDEX, this.frontObject.x, this.frontObject.y);
			break;
		case CLOSET_2_INDEX + 1:
		case CLOSET_2_INDEX + 3:
			this.replaceHidingSpot(CLOSET_2_INDEX, this.frontObject.x - 1, this.frontObject.y);
			break;
		case DESK_1_INDEX:
		case DESK_1_INDEX + 2:
			this.replaceHidingSpot(DESK_1_INDEX, this.frontObject.x, this.frontObject.y);
			break;
		case DESK_1_INDEX + 1:
		case DESK_1_INDEX + 3:
			this.replaceHidingSpot(DESK_1_INDEX, this.frontObject.x - 1, this.frontObject.y);
			break;
		case DESK_2_INDEX:
		case DESK_2_INDEX + 2:
			this.replaceHidingSpot(DESK_2_INDEX, this.frontObject.x, this.frontObject.y);
			break;
		case DESK_2_INDEX + 1:
		case DESK_2_INDEX + 3:
			this.replaceHidingSpot(DESK_2_INDEX, this.frontObject.x - 1, this.frontObject.y);
			break;
		case DESK_2_INDEX - 8:
		case DESK_2_INDEX - 6:
			this.replaceHidingSpot(DESK_2_INDEX, this.frontObject.x, this.frontObject.y + 1);
			break;
		case DESK_2_INDEX - 7:
		case DESK_2_INDEX - 5:
			this.replaceHidingSpot(DESK_2_INDEX, this.frontObject.x - 1, this.frontObject.y + 1);
			break;
		case BED_1_INDEX:
		case BED_1_INDEX + 2:
			this.replaceHidingSpot(BED_1_INDEX, this.frontObject.x, this.frontObject.y);
			break;
		case BED_1_INDEX + 1:
		case BED_1_INDEX + 3:
			this.replaceHidingSpot(BED_1_INDEX, this.frontObject.x - 1, this.frontObject.y);
			break;
		case BED_2_INDEX:
		case BED_2_INDEX + 2:
			this.replaceHidingSpot(BED_2_INDEX, this.frontObject.x, this.frontObject.y);
			break;
		case BED_2_INDEX + 1:
		case BED_2_INDEX + 3:
			this.replaceHidingSpot(BED_2_INDEX, this.frontObject.x - 1, this.frontObject.y);
			break;
		case BED_2_INDEX - 8:
		case BED_2_INDEX - 6:
			this.replaceHidingSpot(BED_2_INDEX, this.frontObject.x, this.frontObject.y + 1);
			break;
		case BED_2_INDEX - 7:
		case BED_2_INDEX - 5:
			this.replaceHidingSpot(BED_2_INDEX, this.frontObject.x - 1, this.frontObject.y + 1);
			break;
		// default:
	}
	this.updateFrontObject(this.orientation);
}
Player.prototype.replaceHidingSpot = function (index, x, y) {
	if (this.isHided) {
		hidingR.play();
		map.replace(index + 2, index, x, y, 2, 1, objectLayer);
		map.replace(index + 3, index + 1, x, y, 2, 1, objectLayer);
	} else {
		hiding.play();
		map.replace(index, index + 2, x, y, 2, 1, objectLayer);
		map.replace(index + 1, index + 3, x, y, 2, 1, objectLayer);
	}
	this.toggleHide();
}
Player.prototype.trapTriggers = function () {
	this.trapTriggered = true;
	closePrisonDoor.play();
	map.replace(PRISONDOOR_1_INDEX + 1, PRISONDOOR_1_INDEX, 64, 51, 1, 1, objectLayer);
	map.replace(PRISONDOOR_1_INDEX + 1, PRISONDOOR_1_INDEX, 64, 64, 1, 1, objectLayer);
}
Player.prototype.trapPuzzle = function () {
	let tileX = floorLayer.getTileX(this.centerX);
	let tileY = floorLayer.getTileY(this.centerY);
	let tile = map.getTile(tileX, tileY, floorLayer, true);
	if (tile.index === TRAP_BUTTON_INDEX) {
		this.trapBotton++;
		trapButton.play();
		map.replace(TRAP_BUTTON_INDEX, TRAP_BUTTON_INDEX + 1, tile.x, tile.y, 1, 1, floorLayer);
		if (this.trapBotton === 4) {
			openPrisonDoor.play();
			map.replace(PRISONDOOR_1_INDEX, PRISONDOOR_1_INDEX + 1, 64, 51, 1, 1, objectLayer);
			map.replace(PRISONDOOR_1_INDEX, PRISONDOOR_1_INDEX + 1, 64, 64, 1, 1, objectLayer);
		}
	}
}