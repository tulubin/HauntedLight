// HUD Group:
"use strict";
function HUD(game) {
	Phaser.Group.call(this, game);
	// HUD:
	// --------------------hpIcon---------------------
	this.hpIcon = game.add.sprite(game.width - 90, 7, 'HP');
	this.add(this.hpIcon);
	this.hpIcon.scale.setTo(1);
	// --------------back HP bar------------------
	this.hpBar_b = game.add.graphics(0, 0);
	this.add(this.hpBar_b);
	this.hpBar_b.beginFill(0x1a0000, 0.8);
	this.hpBar_b.drawRoundedRect(100, 32, 360, 7, RADIUS_ROUNDED_RECT);
	this.hpBar_b.endFill();
	// --------------front HP bar-----------------
	this.hpBar_f = game.add.graphics(0, 0);
	this.add(this.hpBar_f);
	this.hpBar_ff = game.add.graphics(0, 0);
	this.add(this.hpBar_ff);
	this.hpBar_fff = game.add.graphics(0, 0);
	this.add(this.hpBar_fff);
	this.hpBar_ffff = game.add.graphics(0, 0);
	this.add(this.hpBar_ffff);
	// --------------------mpIcon---------------------
	this.mpIcon = game.add.sprite(70, 35, 'MP');
	this.add(this.mpIcon);
	this.mpIcon.scale.setTo(1);
	// --------------back MP bar------------------
	this.mpBar_b = game.add.graphics(0, 0);
	this.add(this.mpBar_b);
	this.mpBar_b.beginFill(0x001a1a, 0.8);
	this.mpBar_b.drawRoundedRect(100, 39, 360, 7, RADIUS_ROUNDED_RECT);
	this.mpBar_b.endFill();
	// --------------front MP bar-----------------
	this.mpBar_f = game.add.graphics(0, 0);
	this.add(this.mpBar_f);
	// --------------flashlight icon-----------------
	this.flashlight_icon = game.add.sprite(game.width - 100, game.height - 100, 'Flashlight_icon');
	this.flashlight_icon.anchor.set(0.5);
	this.flashlight_icon.visible = false;
	this.add(this.flashlight_icon);
	// --------------Battery level-----------------
	this.battery_level = game.add.sprite(game.width - 100, game.height - 60, 'Battery_level');
	this.battery_level.anchor.set(0.5);
	this.battery_level.visible = false;
	this.add(this.battery_level);
	this.batteryStockText = game.add.text(game.width - 70, game.height - 60, 'X 0', { fontSize: '16px', fill: '#FFF' });
	this.batteryStockText.anchor.set(0.5);
	this.batteryStockText.visible = false;
	this.add(this.batteryStockText);
	// --------------interaction HUD-----------------
	this.eKey = game.add.sprite(game.width / 2 + 16, game.height / 2 - 32, 'E_key');
	this.eKey.anchor.set(0.5);
	this.eKey.alpha = 0.3;
	this.eKey.visible = false;
	this.crossEKey = game.add.sprite(game.width / 2 + 16, game.height / 2 - 32, 'Cross_E_key');
	this.crossEKey.anchor.set(0.5);
	this.crossEKey.alpha = 0.3;
	this.crossEKey.visible = false;
	// --------------tutorial HUD-----------------
	this.upKey = game.add.sprite(60, game.height - 140, 'ArrowKey');
	this.downKey = game.add.sprite(60, game.height - 120, 'ArrowKey');
	this.leftKey = game.add.sprite(40, game.height - 120, 'ArrowKey');
	this.rightKey = game.add.sprite(80, game.height - 120, 'ArrowKey');
	this.sprintKey = game.add.sprite(40, game.height - 80, 'SprintKey');
	this.sprintText = game.add.bitmapText(60, game.height - 85, 'bitmapFont', 'Hold to Sprint', 14);
	this.spacebar = game.add.sprite(40, game.height - 40, 'Spacebar');
	this.spacebarText = game.add.bitmapText(60, game.height - 45, 'bitmapFont', 'Toggle Flash Light', 14);
	this.upKey.anchor.set(0.5);
	this.downKey.anchor.set(0.5);
	this.leftKey.anchor.set(0.5);
	this.rightKey.anchor.set(0.5);
	this.sprintKey.anchor.set(0.5);
	this.spacebar.anchor.set(0.5);
	this.downKey.rotation = Math.PI;
	this.leftKey.rotation = Math.PI / 2 * 3;
	this.rightKey.rotation = Math.PI / 2;
	this.add(this.upKey);
	this.add(this.downKey);
	this.add(this.leftKey);
	this.add(this.rightKey);
	this.add(this.sprintKey);
	this.add(this.sprintText);
	this.add(this.spacebar);
	this.add(this.spacebarText);
	//  --------------Text HUD-----------------
	this.warningHPText = game.add.bitmapText(game.width / 2, game.height - 120, 'bitmapFont', 'Hide into some objects to recover your sanity', 16);
	this.warningHPText.anchor.set(0.5);
	this.warningHPText.visible = false;
	this.add(this.warningHPText);
	this.warningBatteryText = game.add.bitmapText(game.width / 2, game.height - 100, 'bitmapFont', 'Turn off your light to save batter', 16);
	this.warningBatteryText.anchor.set(0.5);
	this.warningBatteryText.visible = false;
	this.add(this.warningBatteryText);
};

HUD.prototype = Object.create(Phaser.Group.prototype);
HUD.prototype.constructor = HUD;

HUD.prototype.update = function () {
	game.debug.text(game.time.fps || '--', 10, 20, "#00ff00");
	this.hpRatio_1 = Math.min(player.currentHP, player.maxHP) / player.maxHP;
	this.hpBar_f.clear();
	this.hpBar_f.beginFill(HP_LEVEL_1_TINT, 0.5);
	this.hpBar_f.drawRoundedRect(100 + 360 * (1 - this.hpRatio_1), 32, 360 * this.hpRatio_1, 7, RADIUS_ROUNDED_RECT);
	this.hpBar_f.endFill();

	if (player.hpLevel >= 2 && player.currentHP > (player.maxHP)) {
		this.hpRatio_2 = Math.max(Math.min((player.currentHP - player.maxHP), player.maxHP), 0) / player.maxHP;
		this.hpBar_ff.clear();
		this.hpBar_ff.beginFill(HP_LEVEL_2_TINT, 0.5);
		this.hpBar_ff.drawRoundedRect(100 + 360 * (1 - this.hpRatio_2), 32, 360 * this.hpRatio_2, 7, RADIUS_ROUNDED_RECT);
		this.hpBar_ff.endFill();
		if (player.hpLevel >= 3 && player.currentHP > (player.maxHP * 2)) {
			this.hpRatio_3 = Math.max(Math.min((player.currentHP - player.maxHP * 2), player.maxHP), 0) / player.maxHP;
			this.hpBar_fff.clear();
			this.hpBar_fff.beginFill(HP_LEVEL_3_TINT, 0.5);
			this.hpBar_fff.drawRoundedRect(100 + 360 * (1 - this.hpRatio_3), 32, 360 * this.hpRatio_3, 7, RADIUS_ROUNDED_RECT);
			this.hpBar_fff.endFill();
			if (player.hpLevel >= 4 && player.currentHP > (player.maxHP * 3)) {
				this.hpRatio_4 = Math.max(Math.min((player.currentHP - player.maxHP * 3), player.maxHP), 0) / player.maxHP;
				this.hpBar_ffff.clear();
				this.hpBar_ffff.beginFill(HP_LEVEL_4_TINT, 0.5);
				this.hpBar_ffff.drawRoundedRect(100 + 360 * (1 - this.hpRatio_4), 32, 360 * this.hpRatio_4, 7, RADIUS_ROUNDED_RECT);
				this.hpBar_ffff.endFill();
			} else {
				this.hpBar_ffff.clear();
			}
		} else {
			this.hpBar_fff.clear();
		}
	} else {
		this.hpBar_ff.clear();
	}

	this.mpBar_f.clear();
	this.mpBar_f.beginFill(0x40C26D, 0.5);
	this.mpBar_f.drawRoundedRect(100, 39, 360 * (player.currentMP / player.maxMP), 7, RADIUS_ROUNDED_RECT);
	this.mpBar_f.endFill();

	if (player.frontObject !== null) {
		switch (player.frontObject.index) {
			case DOOR_1_INDEX:
			case DOOR_1_INDEX + 1:
			case DOOR_2_INDEX:
			case DOOR_2_INDEX + 1:
			case PUZZLE_TRIGGER_1_INDEX:
			case PUZZLE_TRIGGER_1_INDEX + 1:
			case CLOSET_1_INDEX:
			case CLOSET_1_INDEX + 1:
			case CLOSET_1_INDEX + 2:
			case CLOSET_1_INDEX + 3:
			case CLOSET_2_INDEX:
			case CLOSET_2_INDEX + 1:
			case CLOSET_2_INDEX + 2:
			case CLOSET_2_INDEX + 3:
			case DESK_1_INDEX:
			case DESK_1_INDEX + 1:
			case DESK_1_INDEX + 2:
			case DESK_1_INDEX + 3:
			case DESK_2_INDEX:
			case DESK_2_INDEX + 1:
			case DESK_2_INDEX + 2:
			case DESK_2_INDEX + 3:
			case DESK_2_INDEX - 8:
			case DESK_2_INDEX - 7:
			case DESK_2_INDEX - 6:
			case DESK_2_INDEX - 5:
			case BED_1_INDEX:
			case BED_1_INDEX + 1:
			case BED_1_INDEX + 2:
			case BED_1_INDEX + 3:
			case BED_2_INDEX:
			case BED_2_INDEX + 1:
			case BED_2_INDEX + 2:
			case BED_2_INDEX + 3:
			case BED_2_INDEX - 8:
			case BED_2_INDEX - 7:
			case BED_2_INDEX - 6:
			case BED_2_INDEX - 5:
			case MIRROR_1_INDEX:
				this.crossEKey.visible = false;
				this.eKey.visible = true;
				if (player.orientation.up) {
					this.eKey.x = player.x;
					this.eKey.y = player.y - 32 + 8;
				} else if (player.orientation.down) {
					this.eKey.x = player.x;
					this.eKey.y = player.y + 32 - 8;
				} else if (player.orientation.left) {
					this.eKey.x = player.x - 32 + 16;
					this.eKey.y = player.y - 16;
				} else if (player.orientation.right) {
					this.eKey.x = player.x + 32 - 16;
					this.eKey.y = player.y - 16;
				}
				break;
			case -1:
			case CHEST_FLASHLIGHT_INDEX:
			case HIDDEN_DOOR_INDEX:
			case HIDDEN_DOOR_INDEX + 1:
			case BATTERY_INDEX:
			case BATTERY_INDEX:
			case PILL_INDEX:
				this.eKey.visible = false;
				this.crossEKey.visible = false;
				break;
			default:
				this.eKey.visible = false;
				this.crossEKey.visible = true;
				if (player.orientation.up) {
					this.crossEKey.x = player.x;
					this.crossEKey.y = player.y - 32 + 8;
				} else if (player.orientation.down) {
					this.crossEKey.x = player.x;
					this.crossEKey.y = player.y + 32 - 8;
				} else if (player.orientation.left) {
					this.crossEKey.x = player.x - 32 + 16;
					this.crossEKey.y = player.y - 16;
				} else if (player.orientation.right) {
					this.crossEKey.x = player.x + 32 - 16;
					this.crossEKey.y = player.y - 16;
				}
				break;
		}
	} else {
		this.eKey.visible = false;
		this.crossEKey.visible = false;
	}
	if (player.inTutorial) {
		if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
			this.upKey.tint = PRESS_TINT;
			this.downKey.tint = RESET_TINT;
			this.leftKey.tint = RESET_TINT;
			this.rightKey.tint = RESET_TINT;
		} else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
			this.downKey.tint = PRESS_TINT;
			this.upKey.tint = RESET_TINT;
			this.leftKey.tint = RESET_TINT;
			this.rightKey.tint = RESET_TINT;
		} else if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
			this.leftKey.tint = PRESS_TINT;
			this.upKey.tint = RESET_TINT;
			this.downKey.tint = RESET_TINT;
			this.rightKey.tint = RESET_TINT;
		} else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
			this.rightKey.tint = PRESS_TINT;
			this.upKey.tint = RESET_TINT;
			this.downKey.tint = RESET_TINT;
			this.leftKey.tint = RESET_TINT;
		} else {
			this.upKey.tint = RESET_TINT;
			this.downKey.tint = RESET_TINT;
			this.leftKey.tint = RESET_TINT;
			this.rightKey.tint = RESET_TINT;
		}
		if (game.input.keyboard.isDown(Phaser.Keyboard.SHIFT)) {
			this.sprintKey.tint = PRESS_TINT;
		} else {
			this.sprintKey.tint = RESET_TINT;
		}
		if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			if (player.hasFlashlight) {
				this.spacebar.tint = PRESS_TINT;
			} else {
				this.spacebar.tint = RED_TINT;
			}
		} else {
			this.spacebar.tint = RESET_TINT;
		}
	}
	if (game.input.keyboard.isDown(Phaser.Keyboard.E)) {
		this.eKey.tint = PRESS_TINT;
		this.crossEKey.tint = RED_TINT;
	} else {
		this.eKey.tint = RESET_TINT;
		this.crossEKey.tint = RESET_TINT;
	}
	switch (true) {
		case (player.currentBattery > 66):
			this.battery_level.frame = 0;
			break;
		case (player.currentBattery >= 33 && player.currentBattery <= 66):
			this.battery_level.frame = 1;
			break;
		case (player.currentBattery < 33):
			this.battery_level.frame = 2;
			break;
		default:
			break;
	}
	if (this.battery_level.visible) {
		this.batteryStockText.visible = true;
		this.batteryStockText.setText('X ' + player.batteryStock);
	} else {
		this.batteryStockText.visible = false;
	}
	switch (true) {
		case (player.jumpscared):
			this.hpIcon.frame = 2;
			break;
		case (huanted.isPlaying):
			this.hpIcon.frame = 1;
			break;
		default:
			this.hpIcon.frame = 0;
			break;
	}
}