// Title state

var Title = function (game) { };
Title.prototype = {
	create: function () {
		
		// add title screen text
		this.titleText = game.add.text(game.width / 2, game.height / 2, 'Haunted Light', { font: 'Helvetica', fontSize: '48px', fill: '#0000FF' });
		this.titleText.anchor.set(0.5);
		this.titleText.visible = false;

		this.spacebar = game.add.sprite(game.width / 2, game.height - 50, 'Spacebar');
		this.spacebar.anchor.set(0.5);
		this.spacebarText_f = game.add.bitmapText(game.width / 2 - 60, game.height - 58, 'bitmapFont', 'Press', 16);
		this.spacebarText_b = game.add.bitmapText(game.width / 2 + 20, game.height - 58, 'bitmapFont', 'to Restart', 16);
	},
	update: function () {
		// input to continue
		if (game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR) && !this.titleText.visible) {
			this.titleText.visible = true;
			this.spacebar.destroy();
			this.spacebarText_f.destroy();
			this.spacebarText_b.destroy();
			game.time.events.add(Phaser.Timer.SECOND * 1, function() {
				game.state.start('Play');
			}, this);
		}
	}
};