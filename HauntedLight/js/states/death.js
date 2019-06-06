// Death state

var Death = function (game) { };
Death.prototype = {
	create: function () {
		this.moveOn = false;
		// reduce difficulty:
		playerMaxHP = playerMaxHP * 1.1;
		playerMaxMP = playerMaxHP * 1.1;
		playerMaxBattery = playerMaxHP * 1.1;
		// add Death screen text
		var endText = game.add.text(game.width / 2, game.height / 2, 'Haunted Light', { font: 'Helvetica', fontSize: '48px', fill: '#0000FF' });
		endText.anchor.set(0.5);

		var playText = game.add.text(game.width / 2, game.height * 0.6, 'You die', { font: 'Helvetica', fontSize: '24px', fill: '#fff' });
		playText.anchor.set(0.5);

		this.tipsText = game.add.bitmapText(game.width / 2, game.height - 80, 'bitmapFont', '', 16);
		this.tipsText.anchor.set(0.5);
		var randomTips = game.rnd.integerInRange(0, 6);
		console.log(randomTips);
		switch (randomTips) {
			case 0:
				this.tipsText.setText('Tips: Spotting on the shadow for too long will drive you crazy!');
				break;
			case 1:
				this.tipsText.setText('Tips: By pressing the SPACEBAR, you can turn off the flashlight to save the battery.');
				break;
			case 2:
				this.tipsText.setText('Tips: You can always hide in some object to avoid shadow and recover the sanity.');
				break;
			case 3:
				this.tipsText.setText('Tips: Press SHIFT to run faster, use it when you are in danger.');
				break;
			case 4:
				this.tipsText.setText('Tips: Mirror is the key to escape, try touch it when find one.');
				break;
			case 5:
				this.tipsText.setText('Tips: Mirror is the key to escape, try touch it when find one.');
				break;
			case 6:
				this.tipsText.setText('Tips: Shadow cannot follow you back to mirror, but the mirror world always terrifies you.');
				break;
			default:
				break;
		}
		game.time.events.add(Phaser.Timer.SECOND * 2, function () {
			this.spacebar = game.add.sprite(game.width / 2, game.height - 50, 'Spacebar');
			this.spacebar.anchor.set(0.5);
			this.spacebarText_f = game.add.bitmapText(game.width / 2 - 60, game.height - 58, 'bitmapFont', 'Press', 16);
			this.spacebarText_b = game.add.bitmapText(game.width / 2 + 20, game.height - 58, 'bitmapFont', 'to Restart', 16);
			this.moveOn = true;
		}, this);
	},
	update: function () {
		// input to continue
		if (game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR) && this.moveOn) {
			game.state.start('Play');
		}
	}
};