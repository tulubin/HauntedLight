// Death state
"use strict";
var Death = function (game) { };
Death.prototype = {
	create: function () {
		// player death sounds
		death.play();
		// draw lines
		this.line_1 = game.add.graphics(0, 0);
		this.line_2 = game.add.graphics(0, 0);
		this.line_3 = game.add.graphics(0, 0);
		this.line_4 = game.add.graphics(0, 0);

		this.moveOn = false;
		this.diffReduced = false;

		// add Death screen text
		this.titleText = game.add.sprite(game.width / 2, game.height / 4, 'Title_HL');
		this.titleText.anchor.set(0.5);
		this.titleText.scale.setTo(0.5);

		this.playText = game.add.bitmapText(game.width / 2, game.height / 4 + 35, 'bitmapFont', 'You died, do not look at the shadow', 16);
		this.playText.anchor.set(0.5);

		this.tipsText = game.add.bitmapText(game.width / 2, game.height / 2 - 10, 'bitmapFont', '', 16);
		this.tipsText.anchor.set(0.5);
		this.randomTips();
		// set timer for delay messages		
		game.time.events.add(Phaser.Timer.SECOND * 2, function () {
			this.moveOn = true;
			this.nextTipsText = game.add.sprite(game.width / 2 - 90, game.height / 2 + 35, 'Enter');
			this.nextTipsText_f = game.add.bitmapText(game.width / 2 - 140, game.height / 2 + 35, 'bitmapFont', 'Press', 16);
			this.nextTipsText_b = game.add.bitmapText(game.width / 2 - 45, game.height / 2 + 35, 'bitmapFont', 'to Show the Next Tips', 16);

			this.spacebar = game.add.sprite(game.width / 2 - 90, game.height / 2 + 55, 'Spacebar');
			this.spacebarText_f = game.add.bitmapText(game.width / 2 - 140, game.height / 2 + 55, 'bitmapFont', 'Press', 16);
			this.spacebarText_b = game.add.bitmapText(game.width / 2 - 45, game.height / 2 + 55, 'bitmapFont', 'to Restart', 16);
			
			this.reduceDiffText = game.add.sprite(game.width / 2 - 90, game.height / 2 + 75, 'SprintKey');
			this.reduceDiffText_f = game.add.bitmapText(game.width / 2 - 140, game.height / 2 + 75, 'bitmapFont', 'Press', 16);
			this.reduceDiffText_b = game.add.bitmapText(game.width / 2 - 45, game.height / 2 + 75, 'bitmapFont', 'to Reduce the Difficulty', 16);
			
			this.cheatText_f = game.add.bitmapText(game.width / 2 - 140, game.height / 2 + 95, 'bitmapFont', 'Press', 16);
			this.cheatText = game.add.bitmapText(game.width / 2 - 90, game.height / 2 + 95, 'bitmapFont', 'P', 16);
			this.cheatText_b = game.add.bitmapText(game.width / 2 - 45, game.height / 2 + 95, 'bitmapFont', 'to CHEAT (Only if too hard)', 16);

			death.fadeOut();
		}, this);

		this.tutorialText = game.add.bitmapText(game.width / 2, game.height - 30, 'bitmapFont', '', 10);
		this.tutorialText.anchor.set(0.5);
		tutorialOn = !tutorialOn;
		this.toggleTutorial();
	},
	update: function () {
		this.drawLine();
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
				this.reduceDiffText_f.setText('* Difficulty reduced.');
				this.reduceDiffText.destroy();
				this.reduceDiffText_b.destroy();
				this.diffReduced = true;
			}
			if (game.input.keyboard.justPressed(Phaser.Keyboard.ENTER)) {
				// chage tips:
				this.randomTips();
			}
			if (game.input.keyboard.justPressed(Phaser.Keyboard.P) || cheat) {
				this.cheatText_f.setText('* Cheated.');
				this.cheatText.destroy();
				this.cheatText_b.destroy();
				cheat = true;
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
			this.tutorialText.setText('* Tutorial On - press T to toggle the opening tutorial');
		} else {
			this.tutorialText.setText('* Tutorial Off - press T to toggle the opening tutorial');
		}
	},
	drawLine: function () {
		this.ratio = 1 - (game.time.events.duration / 2000);
		// top
		this.line_1.clear();
		this.line_1.beginFill(0xff4000, 0.5);
		this.line_1.drawRect(game.width / 2 - 150, game.height / 2 + 25, 300 * this.ratio, 2);
		this.line_1.endFill();
		// down
		this.line_3.clear();
		this.line_3.beginFill(0xff4000, 0.5);
		this.line_3.drawRect(game.width / 2 + 150, game.height / 2 + 125, -300 * this.ratio, 2);
		this.line_3.endFill();
		// left
		this.line_2.clear();
		this.line_2.beginFill(0xff4000, 0.5);
		this.line_2.drawRect(game.width / 2 - 150, game.height / 2 + 25, 2, 100 * this.ratio);
		this.line_2.endFill();
		// right
		this.line_4.clear();
		this.line_4.beginFill(0xff4000, 0.5);
		this.line_4.drawRect(game.width / 2 + 150, game.height / 2 + 125, 2, -100 * this.ratio);
		this.line_4.endFill();
	}
};