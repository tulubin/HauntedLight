// HUD Group:

var arrows;

function HUD(game) {
	Phaser.Group.call(this, game);
	// HUD:
	// --------------------hpIcon---------------------
	this.hpIcon = game.add.sprite(game.width - 30, 26, 'HP_1');
	this.hpIcon.fixedToCamera = true;
	this.hpIcon.scale.setTo(0.7);
	// --------------back HP bar------------------
	this.hpBar_b = game.add.graphics(0, 0);
	this.hpBar_b.fixedToCamera = true;
	this.hpBar_b.beginFill(0x222222, 0.8);
	this.hpBar_b.drawRect(game.width - 150, 30, 104, 14);
	this.hpBar_b.endFill();
	// --------------front HP bar-----------------
	this.hpBar_f = game.add.graphics(0, 0);
	this.hpBar_f.fixedToCamera = true;
	// --------------------mpIcon---------------------
	this.mpIcon = game.add.sprite(game.width - 30, 52, 'MP');
	this.mpIcon.fixedToCamera = true;
	this.mpIcon.scale.setTo(0.7);
	// --------------back MP bar------------------
	this.mpBar_b = game.add.graphics(0, 0);
	this.mpBar_b.fixedToCamera = true;
	this.mpBar_b.beginFill(0x222222, 0.8);
	this.mpBar_b.drawRect(game.width - 150, 60, 104, 14);
	this.mpBar_b.endFill();
	// --------------front MP bar-----------------
	this.mpBar_f = game.add.graphics(0, 0);
	this.mpBar_f.fixedToCamera = true;
	// --------------interaction HUD-----------------
	this.interactionHUD = game.add.sprite(game.width / 2 + 32, game.height / 2 - 64, 'e_key');
	this.interactionHUD.anchor.set(0.5);
	this.interactionHUD.fixedToCamera = true;
	this.interactionHUD.visible = false;
	// --------------tutorial HUD-----------------
	arrows = game.add.sprite(game.width / 4, game.height / 4, 'arrow_key');
	arrows.anchor.set(0.5);
	arrows.fixedToCamera = true;
	arrows.visible = true;
	game.time.events.add(8000, function () { arrows.destroy(); });
	// default:
	this.hpIcon.visible = false;
	this.hpBar_b.visible = false;
	this.hpBar_f.visible = false;
	this.mpIcon.visible = false;
	this.mpBar_b.visible = false;
	this.mpBar_f.visible = false;
	this.toggleHUD();
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



	if (game.input.keyboard.justPressed(Phaser.Keyboard.P)) {
		this.toggleHUD();
	}
	if ((player.frontObjectIndex === DOOR_1_INDEX) || (player.frontObjectIndex === MIRROR_1_INDEX)) {
		this.interactionHUD.visible = true;
	} else {
		this.interactionHUD.visible = false;
	}
};

HUD.prototype.toggleHUD = function () {
	// HUD:
	this.hpIcon.visible = !(this.hpIcon.visible);
	this.hpBar_b.visible = !(this.hpBar_b.visible);
	this.hpBar_f.visible = !(this.hpBar_f.visible);
	this.mpIcon.visible = !(this.mpIcon.visible);
	this.mpBar_b.visible = !(this.mpBar_b.visible);
	this.mpBar_f.visible = !(this.mpBar_f.visible);
};