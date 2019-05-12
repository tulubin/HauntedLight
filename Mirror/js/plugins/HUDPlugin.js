// HUD plugin:
function HUDPlugin(game) {
	Phaser.Plugin.call(this, game);
};


HUDPlugin.prototype = Object.create(Phaser.Plugin.prototype);
HUDPlugin.prototype.constructor = HUDPlugin;

HUDPlugin.prototype.addHUD = function() {
	// HUD:
	// --------------------HP---------------------
	this.HP = game.add.sprite(game.width-64, 32, 'Temp');
	this.HP.fixedToCamera = true;
	// --------------back MP bar------------------
	this.HPbar_b = game.add.sprite(game.width-248, 40, 'Temp');
	this.HPbar_b.scale.setTo(5, 0.5);
	this.HPbar_b.fixedToCamera = true;
	this.HPbar_b.tint = 0x000000;
	// --------------front HP bar-----------------
	this.HPbar_f = game.add.sprite(game.width-248, 40, 'Temp');
	this.HPbar_f.scale.setTo(4.8, 0.5);
	this.HPbar_f.fixedToCamera = true;
	this.HPbar_f.tint = 0xE8000C;
	// --------------------MP---------------------
	this.MP = game.add.sprite(game.width-64, 96, 'Temp');
	this.MP.fixedToCamera = true;
	// --------------back MP bar------------------
	this.MPbar_b = game.add.sprite(game.width-248, 104, 'Temp');
	this.MPbar_b.scale.setTo(5, 0.5);
	this.MPbar_b.fixedToCamera = true;
	this.MPbar_b.tint = 0x000000;
	// --------------front MP bar-----------------
	this.MPbar_f = game.add.sprite(game.width-248, 104, 'Temp');
	this.MPbar_f.scale.setTo(4.8, 0.5);
	this.MPbar_f.fixedToCamera = true;
	this.MPbar_f.tint = 0x141BFF;
	// --------------interaction HUD-----------------
	this.interactionHUD = game.add.sprite(game.width/2+32, game.height/2, 'Temp');
	this.interactionHUD.anchor.set(0.5);
	this.interactionHUD.fixedToCamera = true;
	this.interactionHUD.visible = false;
	// default:
	this.HP.visible = false;
	this.HPbar_b.visible = false;
	this.HPbar_f.visible = false;
	this.MP.visible = false;
	this.MPbar_b.visible = false;
	this.MPbar_f.visible = false;
};
HUDPlugin.prototype.triggerHUD = function() {
	// HUD:
	this.HP.visible = !(this.HP.visible);
	this.HPbar_b.visible = !(this.HPbar_b.visible);
	this.HPbar_f.visible = !(this.HPbar_f.visible);
	this.MP.visible = !(this.MP.visible);
	this.MPbar_b.visible = !(this.MPbar_b.visible);
	this.MPbar_f.visible = !(this.MPbar_f.visible);
};
HUDPlugin.prototype.updateHUD = function () {
	if(game.input.keyboard.justPressed(Phaser.Keyboard.P)) {
		this.triggerHUD();
	}
	if(frontObjectIndex === DOOR_CLOSED_INDEX) {
		this.interactionHUD.visible = true;
	} else {
		this.interactionHUD.visible = false;
	}
};