// Title state

var Title = function (game) { };
Title.prototype = {
	create: function () {
		
		// add title screen text
		this.titleText = game.add.text(game.width / 2, game.height / 2, 'Haunted Light', { font: 'Helvetica', fontSize: '48px', fill: '#0000FF' });
		this.titleText.anchor.set(0.5);
		this.titleText.visible = false;

		this.spacebar = game.add.sprite(game.width / 2, game.height - 50, 'Spacebar');
		this.spacebarText_f = game.add.text(game.width / 2 - 35, game.height - 50, 'Press', { font: 'Helvetica', fontSize: '12px', fill: '#FFFFFF' });
		this.spacebarText_b = game.add.text(game.width / 2 + 35, game.height - 50, 'to Toggle Flash Light', { font: 'Helvetica', fontSize: '12px', fill: '#FFFFFF' });
	},
	update: function () {
		// input to continue
		if (game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR) && !this.titleText.visible) {
			this.titleText.visible = true;
			game.time.events.add(Phaser.Timer.SECOND * 1, function() {
				game.state.start('Play');
			}, this);
		}
	}
};