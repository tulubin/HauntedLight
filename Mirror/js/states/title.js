// Title state

var Title = function(game) {};
Title.prototype = {
	preload: function() {
		// load tilemap
		// game.load.tilemap('level', 'assets/level/mainroom.json', null, Phaser.Tilemap.TILED_JSON);
		// game.load.spritesheet('tilesheet', 'assets/tilesheet/colorblock.png', 96, 128);

		// Loading assets:
		game.load.image('Background', 'assets/img/background.png');
		
		
		game.load.image('Player', 'assets/img/player.png');
		
		
		//preload texture atlas for player
        game.load.atlas('player_atlas', "assets/img/Child with hat.png", "assets/img/Child with hat.json");
        //preload texture atlas for objects
        game.load.atlas('objects_atlas', "assets/img/objects.png", "assets/img/objects.json");
		game.load.audio('Footstep', 'assets/audio/footstep.wav');
	},
	create: function() {
		// add title screen text
		var titleText = game.add.text(game.width/2, game.height/2, 'Mirror', {font: 'Helvetica', fontSize: '48px', fill: '#0000FF'});
		titleText.anchor.set(0.5);

		var playText = game.add.text(game.width/2, game.height*.8, 'Press W to Start', {font: 'Helvetica', fontSize: '24px', fill: '#fff'});
		playText.anchor.set(0.5);

		// add plugins:
		game.plugin = game.plugins.add(Phaser.Plugin.HUDPlugin);
	},
	update: function() {
		// input to continue
		if(game.input.keyboard.justPressed(Phaser.Keyboard.W)) {
			game.state.start('Play');
		}
	}
};