// Title state
"use strict";
var Title = function (game) { };
Title.prototype = {
	create: function () {
		
		/* *****************************************
		this.lightOn = false; // if toggle light
		this.flashed = 0; // time of light flashed
		this.flashlight = game.add.audio('Flashlight');
		this.flashlight.allowMultiple = true;		
		*********************************************/
		
		this.titleBackground = game.add.sprite(0, 0, 'Title_background');
		// this.titleBackground.anchor.set(0.5); //diff:not in master
		// this.titleBackground.tint = DARK_TINT; //diff:not in master
		this.titleBackground.scale.setTo(600);
		this.titleBackground.tint = DARK_TINT;
		// "Haunted light" text sprite
		this.titleText = game.add.sprite(game.width / 2, game.height * 5 / 14, 'Title_HL_black');
		this.titleText.anchor.set(0.5);
		this.titleText.scale.setTo(0.3);
		this.titleText.visible = false;
		
		// title draw of character
		/* *****************************************
		// this.titlekid = game.add.sprite(game.width * 1 / 11, game.height * 9 / 14, 'Titlekid');
		*********************************************/	
		this.titlekid = game.add.sprite(game.width * 9 / 20, game.height * 31 / 60, 'Titlekid');
		this.titlekid.anchor.set(0.5);
		this.titlekid.tint = DARK_TINT;

		// this.titlekid.tint = DARK_TINT; //diff:not in master
		// this.titlekid.scale.setTo(0.5); //diff:not in master
		// this.spacebar = game.add.sprite(game.width / 2, game.height - 50, 'Spacebar'); //diff:not in master
		// this.spacebar.anchor.set(0.5); //diff:not in master
		// this.spacebarText_f = game.add.bitmapText(game.width / 2 - 60, game.height - 58, 'bitmapFont', 'Press', 16); //diff:not in master
		// this.spacebarText_b = game.add.bitmapText(game.width / 2 + 20, game.height - 58, 'bitmapFont', 'to Restart', 16); //diff:not in master
		// "press space to toggle the flashlight" text spirte
		this.titleInstruction = game.add.sprite(game.width / 2, game.height - 50, 'Title_instruction');
		this.titleInstruction.anchor.set(0.5);
		this.titleInstruction.scale.setTo(0.5);
		// masking for highlighting
		this.maskGraphics = this.game.add.graphics(0, 0);
		this.titleBackground.mask = this.maskGraphics;
		this.titleText.mask = this.maskGraphics;
		this.createLight(0);
	},
	update: function () {
		// input to continue
		// if (game.input.keyboard.justPressed(Phaser.Keyboard.P)) {
		// 	cheat = true;
		// }
		if (game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR) && !this.titleText.visible) {
			this.titleText.visible = true;
			this.titleInstruction.destroy();
			this.createLight(150); //diff: this is placed one line above "game.state.start('Play');"(line67) in master
			// this.spacebarText_f.destroy(); //diff:not in master
			// this.spacebarText_b.destroy(); //diff:not in master
			/****************************
			flashlightTimer = game.time.events.loop(Phaser.Timer.SECOND * 0.1, this.toggleLight, this);
			******************************/
			game.time.events.add(Phaser.Timer.SECOND * 2, function () { //diff:Phaser.Timer.SECOND * 3
				/***********************
				game.time.events.stop();
				***********************/
				game.state.start('Play');
			}, this);
		}
	},
	
	/****************************************************
	toggleLight: function () {
		if (this.lightOn) {
			this.createLight(0);
			this.titlekid.frame = 0;
		} else {
			this.flashlight.play();
			this.createLight(150);
			this.titlekid.frame = 1;
		}
		this.lightOn = !this.lightOn;
		switch (this.flashed) {
			case 1:
				flashlightTimer.delay += Phaser.Timer.SECOND * 0.01;
				break;
			case 2:
				flashlightTimer.delay += Phaser.Timer.SECOND * 0.2;
				break;
			case 3:
				flashlightTimer.delay += Phaser.Timer.SECOND * 2.5;
				break;
			case 4:
				flashlightTimer.delay += Phaser.Timer.SECOND * 3;
				break;
			default:
				break;
		}
		this.flashed++;	
	*****************************************************/
	
	createLight: function (diameter) {
		this.maskGraphics.clear();
		this.maskGraphics.beginFill(0xff0000);
		this.maskGraphics.drawEllipse(game.width / 2, game.height * 5 / 14, diameter, diameter / 2);
		this.maskGraphics.endFill();
	}
};