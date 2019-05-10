Phaser.Plugin.HUDPlugin = function(game, parent) {
	Phaser.Plugin.call(this, game, parent);
};


Phaser.Plugin.HUDPlugin.prototype = Object.create(Phaser.Plugin.prototype);
Phaser.Plugin.HUDPlugin.prototype.constructor = Phaser.Plugin.SamplePlugin;

Phaser.Plugin.HUDPlugin.prototype.addHUD = function() {
	// HUD:
	//---------------Mask of Camera---------------
	this.masking = game.add.sprite(0, 0, 'Mask');
	this.masking.fixedToCamera = true;
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
};
Phaser.Plugin.HUDPlugin.prototype.update = function () {
};