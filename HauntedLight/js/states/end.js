// End state

var End = function (game) { };
End.prototype = {
	create: function () {
		// add End screen text
		var endText = game.add.text(game.width / 2, game.height / 2, 'Mirror', { font: 'Helvetica', fontSize: '48px', fill: '#0000FF' });
		endText.anchor.set(0.5);

		var playText = game.add.text(game.width / 2, game.height * 0.6, 'You die', { font: 'Helvetica', fontSize: '24px', fill: '#fff' });
		playText.anchor.set(0.5);

		this.spacebar = game.add.sprite(game.width / 2, game.height - 50, 'Spacebar');
		this.spacebarText_f = game.add.text(game.width / 2 - 35, game.height - 50, 'Press', { font: 'Helvetica', fontSize: '12px', fill: '#FFFFFF' });
		this.spacebarText_b = game.add.text(game.width / 2 + 35, game.height - 50, 'to Restart', { font: 'Helvetica', fontSize: '12px', fill: '#FFFFFF' });


	},
	update: function () {
		// input to continue
		if (game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)) {
			game.state.start('Title');
		}
	}
};