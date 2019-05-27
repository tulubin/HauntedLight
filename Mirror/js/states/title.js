// Title state

var Title = function(game) {};
Title.prototype = {
	preload: function() {
		// load tilemap
		game.load.tilemap('level', 'assets/level/map.json', null, Phaser.Tilemap.TILED_JSON);
		// game.load.spritesheet('tilesheet', 'assets/tilesheet/colorblock.png', 32, 32);
		// game.load.spritesheet('floorwall', 'assets/tilesheet/floor-wall.png', 32, 32);
		game.load.spritesheet('objects', 'assets/tilesheet/objects.png', 32, 32);
		game.load.spritesheet('wall', 'assets/tilesheet/wall.png', 32, 32);
		game.load.spritesheet('floor', 'assets/tilesheet/floor.png', 32, 32);
		// game.load.spritesheet('puzzle_1', 'assets/tilesheet/puzzle-1-test-export.png', 32, 32);
		// game.load.spritesheet('objects', 'assets/img/objects.png', 32, 32);
		// Loading assets:
		// game.load.image('Background', 'assets/img/background.png');
		game.load.image('Temp', 'assets/img/temp.png');
		game.load.image('Temp_HP', 'assets/img/HP_icon.png');
		game.load.image('Temp_MP', 'assets/img/MP_icon.png');
		game.load.image('e_key', 'assets/img/e_key.png');
		game.load.image('arrow_key', 'assets/img/arrow_keys.png');
		game.load.image('wasd_key', 'assets/img/wasd.png');
		// game.load.image('Mask', 'assets/img/mask.png');
		
		//preload texture atlas for player
		game.load.atlas('player_atlas', "assets/img/kid_flash.png", "assets/img/kid_flash.json");
		//preload texture atlas for objects
		// game.load.atlas('objects_atlas', "assets/img/objects.png", "assets/img/objects.json");
		game.load.audio('footstep', 'assets/audio/footstep.wav');
	},
	create: function() {
		// add title screen text
		var titleText = game.add.text(game.width/2, game.height/2, 'Mirror', {font: 'Helvetica', fontSize: '48px', fill: '#0000FF'});
		titleText.anchor.set(0.5);

		var playText = game.add.text(game.width/2, game.height*0.6, 'Escape the room!', {font: 'Helvetica', fontSize: '24px', fill: '#fff'});
		playText.anchor.set(0.5);

		var playText = game.add.text(game.width/2, game.height*.8, 'Press SPACEBAR to Start', {font: 'Helvetica', fontSize: '24px', fill: '#fff'});
		playText.anchor.set(0.5);


	},
	update: function() {
		// input to continue
		if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)) {
			game.state.start('Play');
		}
	}
};