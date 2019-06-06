// Title state

var Title = function (game) { };
Title.prototype = {
	create: function () {

		this.titleBackground = game.add.sprite(game.width / 2, game.height * 5 / 14 - 10, 'Title_background');
		this.titleBackground.anchor.set(0.5);
		this.titleBackground.scale.setTo(0.5);

		this.titleText = game.add.sprite(game.width / 2, game.height * 5 / 14, 'Title_HL');
		this.titleText.anchor.set(0.5);
		this.titleText.scale.setTo(0.5);
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
	},
	update: function () {
		// input to continue
		if (game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR) && !this.titleText.visible) {
			this.titleText.visible = true;
			this.titleInstruction.destroy();
			// this.spacebarText_f.destroy();
			// this.spacebarText_b.destroy();
			game.time.events.add(Phaser.Timer.SECOND * 1, function () {
				game.state.start('Play');
			}, this);
		}
	}
};