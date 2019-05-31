// Title state

var Title = function (game) { };
Title.prototype = {
	preload: function () {
		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		game.scale.pageAlignHorizontally = true;
		game.scale.pageAlignVertically = true;
		game.scale.refresh();
		// game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
		// game.scale.setUserScale(0, 0);
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
		game.load.image('HP_1', 'assets/img/sanity00.png');
		game.load.image('MP', 'assets/img/MP.png'); 
		game.load.image('Shadow', 'assets/img/ghost0.png'); 
		game.load.image('Flashlight_icon', 'assets/img/flashlight_icon.png'); 
		
		game.load.image('ArrowKey', 'assets/img/arrow_up.png');
		game.load.image('E_key', 'assets/img/e_key.png');
		game.load.image('SprintKey', 'assets/img/sprintKey.png');
		game.load.image('Spacebar', 'assets/img/spacebar.png');
		
		//preload texture atlas for player
		game.load.atlas('Player', "assets/img/kid.png", "assets/img/kid.json");
		game.load.atlas('Player_f', "assets/img/kid_flash.png", "assets/img/kid_flash.json");
		game.load.atlas('Battery_level', 'assets/img/battery_level.png', "assets/img/battery_level.json");
		//preload texture atlas for objects
		// game.load.atlas('objects_atlas', "assets/img/objects.png", "assets/img/objects.json");
		game.load.audio('footstep', 'assets/audio/footstep.wav');
	},
	create: function () {
		
		// add title screen text
		var titleText = game.add.text(game.width / 2, game.height / 2, 'Mirror', { font: 'Helvetica', fontSize: '48px', fill: '#0000FF' });
		titleText.anchor.set(0.5);

		var playText = game.add.text(game.width / 2, game.height * 0.6, 'Explore and survive', { font: 'Helvetica', fontSize: '24px', fill: '#fff' });
		playText.anchor.set(0.5);

		var playText = game.add.text(game.width / 2, game.height * .8, 'Press SPACEBAR to Start', { font: 'Helvetica', fontSize: '24px', fill: '#fff' });
		playText.anchor.set(0.5);


	},
	update: function () {
		// input to continue
		if (game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)) {
			game.state.start('Play');
		}
	}
};