// HUD Group:

var arrows;

function HUD(game) {
	Phaser.Group.call(this, game);
	// HUD:
	// --------------------hpIcon---------------------
	this.hpIcon = game.add.sprite(game.width - 30, 26, 'HP_1');
	this.add(this.hpIcon);
	this.hpIcon.scale.setTo(0.7);
	// --------------back HP bar------------------
	this.hpBar_b = game.add.graphics(0, 0);
	this.add(this.hpBar_b);
	this.hpBar_b.beginFill(0x222222, 0.8);
	this.hpBar_b.drawRect(game.width - 150, 30, 104, 14);
	this.hpBar_b.endFill();
	// --------------front HP bar-----------------
	this.hpBar_f = game.add.graphics(0, 0);
	this.add(this.hpBar_f);
	// --------------------mpIcon---------------------
	this.mpIcon = game.add.sprite(game.width - 30, 52, 'MP');
	this.add(this.mpIcon);
	this.mpIcon.scale.setTo(0.7);
	// --------------back MP bar------------------
	this.mpBar_b = game.add.graphics(0, 0);
	this.add(this.mpBar_b);
	this.mpBar_b.beginFill(0x222222, 0.8);
	this.mpBar_b.drawRect(game.width - 150, 60, 104, 14);
	this.mpBar_b.endFill();
	// --------------front MP bar-----------------
	this.mpBar_f = game.add.graphics(0, 0);
	this.add(this.mpBar_f);
	// --------------flashlight icon-----------------
	this.flashlight_icon = game.add.sprite(game.width - 100, game.height - 100, 'Flashlight_icon');
	this.flashlight_icon.anchor.set(0.5);
	this.flashlight_icon.scale.setTo(1);
	this.flashlight_icon.visible = false;
	this.add(this.flashlight_icon);
	// --------------interaction HUD-----------------
	this.interactionHUD = game.add.sprite(game.width / 2 + 32, game.height / 2 - 64, 'e_key');
	this.interactionHUD.anchor.set(0.5);
	this.add(this.interactionHUD);
	this.interactionHUD.visible = false;
	// --------------tutorial HUD-----------------
	this.upKey = game.add.sprite(64, game.height - 128, 'ArrowKey');
	this.downKey = game.add.sprite(64, game.height - 96, 'ArrowKey');
	this.leftKey = game.add.sprite(32, game.height - 96, 'ArrowKey');
	this.rightKey = game.add.sprite(96, game.height - 96, 'ArrowKey');
	this.sprintKey = game.add.sprite(32, game.height - 32, 'SprintKey');
	this.upKey.anchor.set(0.5);
	this.downKey.anchor.set(0.5);
	this.leftKey.anchor.set(0.5);
	this.rightKey.anchor.set(0.5);
	this.sprintKey.anchor.set(0.5);
	this.downKey.rotation = Math.PI;
	this.leftKey.rotation = Math.PI / 2 * 3;
	this.rightKey.rotation = Math.PI / 2;
	this.add(this.upKey);
	this.add(this.downKey);
	this.add(this.leftKey);
	this.add(this.rightKey);
	this.add(this.sprintKey);
	// arrows = game.add.sprite(game.width / 4, game.height / 4, 'arrow_key');
	// arrows.anchor.set(0.5);
	// arrows.visible = true;
	// game.time.events.add(8000, function () { arrows.destroy(); });
	// default:
	// this.hpIcon.visible = false;
	// this.hpBar_b.visible = false;
	// this.hpBar_f.visible = false;
	// this.mpIcon.visible = false;
	// this.mpBar_b.visible = false;
	// this.mpBar_f.visible = false;
	// this.flashlight_icon.visible = false;
	// this.interactionHUD.visible = false;
	// this.toggleHUD();
};

HUD.prototype = Object.create(Phaser.Group.prototype);
HUD.prototype.constructor = HUD;

HUD.prototype.update = function () {
	this.hpBar_f.clear();
	this.hpBar_f.beginFill(0xE8000C, 0.5);
	this.hpBar_f.drawRect(game.width - 148, 32, 100 * (player.currentHP / player.maxHP), 10);
	this.hpBar_f.endFill();

	this.mpBar_f.clear();
	this.mpBar_f.beginFill(0x141BFF, 0.5);
	this.mpBar_f.drawRect(game.width - 148, 62, 100 * (player.currentMP / player.maxMP), 10);
	this.mpBar_f.endFill();

	if ((player.frontObjectIndex === DOOR_1_INDEX) || (player.frontObjectIndex === MIRROR_1_INDEX)) {
		this.interactionHUD.visible = true;
	} else {
		this.interactionHUD.visible = false;
	}
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
};

// HUD.prototype.toggleHUD = function () {
// 	// HUD:
// 	this.hpIcon.visible = !(this.hpIcon.visible);
// 	this.hpBar_b.visible = !(this.hpBar_b.visible);
// 	this.hpBar_f.visible = !(this.hpBar_f.visible);
// 	this.mpIcon.visible = !(this.mpIcon.visible);
// 	this.mpBar_b.visible = !(this.mpBar_b.visible);
// 	this.mpBar_f.visible = !(this.mpBar_f.visible);
// };