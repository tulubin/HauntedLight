// Title state

var Title = function(game) {};
Title.prototype = {
	preload: function() {
		// load tilemap data (key, url, data, format)
		game.load.tilemap('level', 'assets/level/mainroom.json', null, Phaser.Tilemap.TILED_JSON);
		// load tilemap spritesheet (key, url, frameWidth, frameHeight)
		game.load.spritesheet('tilesheet', 'assets/tilesheet/colorblock.png', 96, 128);

		// Loading assets:
		game.load.image('Background', 'assets/img/background.png');
		game.load.image('Player', 'assets/img/player.png');
		game.load.audio('Footstep', 'assets/audio/footstep.wav');
	},
	create: function() {
		// add title screen text
		var titleText = game.add.text(game.width/2, game.height/2, 'Mirror', {font: 'Helvetica', fontSize: '48px', fill: '#0000FF'});
		titleText.anchor.set(0.5);

		var playText = game.add.text(game.width/2, game.height*.8, 'Press W to Start', {font: 'Helvetica', fontSize: '24px', fill: '#fff'});
		playText.anchor.set(0.5);

	},
	update: function() {
		// input to continue
		if(game.input.keyboard.justPressed(Phaser.Keyboard.W)) {
			game.state.start('Play');
		}
	}
};