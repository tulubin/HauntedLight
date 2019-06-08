// Title state
"use strict";
var Title = function (game) { };
Title.prototype = {
	create: function () {

		this.titleBackground = game.add.sprite(0, 0, 'Title_background');
		// this.titleBackground.anchor.set(0.5);
		// this.titleBackground.tint = DARK_TINT;
		this.titleBackground.scale.setTo(600);
		this.titleBackground.tint = DARK_TINT;

		this.titleText = game.add.sprite(game.width / 2, game.height * 5 / 14, 'Title_HL_black');
		this.titleText.anchor.set(0.5);
		this.titleText.scale.setTo(0.3);
		this.titleText.visible = false;

		this.titlekid = game.add.sprite(game.width * 1 / 11, game.height * 9 / 14, 'Titlekid');
		this.titlekid.anchor.set(0.5);
		this.titlekid.tint = DARK_TINT;

		// this.titlekid.tint = DARK_TINT;
		// this.titlekid.scale.setTo(0.5);
		// this.spacebar = game.add.sprite(game.width / 2, game.height - 50, 'Spacebar');
		// this.spacebar.anchor.set(0.5);
		// this.spacebarText_f = game.add.bitmapText(game.width / 2 - 60, game.height - 58, 'bitmapFont', 'Press', 16);
		// this.spacebarText_b = game.add.bitmapText(game.width / 2 + 20, game.height - 58, 'bitmapFont', 'to Restart', 16);
		this.titleInstruction = game.add.sprite(game.width / 2, game.height - 50, 'Title_instruction');
		this.titleInstruction.anchor.set(0.5);
		this.titleInstruction.scale.setTo(0.5);

		this.maskGraphics = this.game.add.graphics(0, 0);
		this.titleBackground.mask = this.maskGraphics;
		this.titleText.mask = this.maskGraphics;

		this.createLight(0);
	},
	update: function () {
		// input to continue
		if (game.input.keyboard.justPressed(Phaser.Keyboard.UP)) {
			cheat = true;
		}
		if (game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR) && !this.titleText.visible) {
			this.titleText.visible = true;
			this.titleInstruction.destroy();
			this.createLight(150);
			// this.spacebarText_f.destroy();
			// this.spacebarText_b.destroy();
			game.time.events.add(Phaser.Timer.SECOND * 2, function () {
				game.state.start('Play');
			}, this);
		}
	},
	createLight: function (diameter) {
		this.maskGraphics.clear();
		this.maskGraphics.beginFill(0xff0000);
		this.maskGraphics.drawEllipse(game.width / 2, game.height * 5 / 14, diameter, diameter / 2);
		this.maskGraphics.endFill();
	}
};