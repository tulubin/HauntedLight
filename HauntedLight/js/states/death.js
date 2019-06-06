// Death state

var Death = function (game) { };
Death.prototype = {
	create: function () {
		this.moveOn = false;
		this.diffReduced = false;
		// add Death screen text
		var endText = game.add.text(game.width / 2, game.height / 2, 'Haunted Light', { font: 'Helvetica', fontSize: '48px', fill: '#0000FF' });
		endText.anchor.set(0.5);

		var playText = game.add.text(game.width / 2, game.height * 0.6, 'You die', { font: 'Helvetica', fontSize: '24px', fill: '#fff' });
		playText.anchor.set(0.5);

		this.nextTipsText = game.add.bitmapText(game.width / 2, game.height - 100, 'bitmapFont', 'Press Enter to show the next tips', 10);
		this.nextTipsText.anchor.set(0.5);
		this.tipsText = game.add.bitmapText(game.width / 2, game.height - 80, 'bitmapFont', '', 16);
		this.tipsText.anchor.set(0.5);
		this.randomTips();
		game.time.events.add(Phaser.Timer.SECOND * 2, function () {
			this.spacebar = game.add.sprite(game.width / 2, game.height - 50, 'Spacebar');
			this.spacebar.anchor.set(0.5);
			this.spacebarText_f = game.add.bitmapText(game.width / 2 - 60, game.height - 58, 'bitmapFont', 'Press', 16);
			this.spacebarText_b = game.add.bitmapText(game.width / 2 + 20, game.height - 58, 'bitmapFont', 'to Restart', 16);
			this.moveOn = true;
			this.reduceDiffText = game.add.bitmapText(game.width / 2, game.height - 30, 'bitmapFont', 'Press Shift key to reduce the difficulty', 10);
			this.reduceDiffText.anchor.set(0.5);
		}, this);

		this.tutorialText = game.add.bitmapText(game.width / 2, game.height - 10, 'bitmapFont', '', 10);
		this.tutorialText.anchor.set(0.5);
		tutorialOn = !tutorialOn;
		this.toggleTutorial();
	},
	update: function () {
		// input to continue
		if (this.moveOn) {
			if (game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)) {
				game.state.start('Play');
			}
			if (game.input.keyboard.justPressed(Phaser.Keyboard.SHIFT) && !this.diffReduced) {
				// reduce difficulty:
				playerMaxHP = playerMaxHP * 1.2;
				playerMaxMP = playerMaxHP * 1.2;
				playerMaxBattery = playerMaxHP * 1.2;
				this.reduceDiffText.setText('Difficulty reduced.');
				this.diffReduced = true;
			}
			if (game.input.keyboard.justPressed(Phaser.Keyboard.ENTER)) {
				// chage tips:
				this.randomTips();
			}
		}
		if (game.input.keyboard.justPressed(Phaser.Keyboard.T)) {
			// chage tips:
			this.toggleTutorial();
		}
	},
	randomTips: function () {
		var randomInt = game.rnd.integerInRange(0, 5);
		switch (randomInt) {
			case 0:
				this.tipsText.setText('Tips: Spotting on the shadow for too long will drive you crazy!');
				break;
			case 1:
				this.tipsText.setText('Tips: Turn off the flashlight to save the battery, but it makes you vulnerable.');
				break;
			case 2:
				this.tipsText.setText('Tips: Hide in some objects to avoid shadow and recover the sanity.');
				break;
			case 3:
				this.tipsText.setText('Tips: Press SHIFT to run when you are in danger.');
				break;
			case 4:
				this.tipsText.setText('Tips: Mirror is the key to escape, try touch it when find one.');
				break;
			case 5:
				this.tipsText.setText('Tips: You will be safe in the mirror world.');
				break;
			default:
				break;
		}
	},
	toggleTutorial: function () {
		tutorialOn = !tutorialOn;
		if (tutorialOn) {
			this.tutorialText.setText('Tutorial On - press T to toggle the opening tutorial');
		} else {
			this.tutorialText.setText('Tutorial Off - press T to toggle the opening tutorial');
		}
	}
};