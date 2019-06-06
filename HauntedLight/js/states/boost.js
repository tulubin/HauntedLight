// Boost state

var text;

var Boost = function (game) { };
Boost.prototype = {
	preload: function () {
		// scale the game:
		// game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		game.scale.pageAlignHorizontally = true;
		game.scale.pageAlignVertically = true;
		game.scale.refresh();

		// game.stage.backgroundColor = '#182d3b';

		// Loading bar
		this.loadingBar_b = game.add.graphics(0, 0);
		this.loadingBar_f = game.add.graphics(0, 0);
		this.loadingBar_b.beginFill(0x222222, 0.8);
		this.loadingBar_b.drawRect(32, game.height - 50, 104, 14);
		this.loadingBar_b.endFill();

		// Loading necassary assets:
		game.load.bitmapFont('bitmapFont', 'assets/font/font.png', 'assets/font/font.fnt');
	},
	create: function() {
		//	Listen to loading progress
		game.load.onLoadStart.add(this.loadStart, this);
		game.load.onFileComplete.add(this.fileComplete, this);
		game.load.onLoadComplete.add(this.loadComplete, this);

		// Loading other assets:
		game.load.tilemap('level', 'assets/level/map.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.spritesheet('objects', 'assets/tilesheet/objects.png', 32, 32);
		game.load.spritesheet('wall', 'assets/tilesheet/wall.png', 32, 32);
		game.load.spritesheet('floor', 'assets/tilesheet/floor.png', 32, 32);
		game.load.image('Temp', 'assets/img/temp.png');
		game.load.image('Camera', 'assets/img/camera.png');
		game.load.image('Title_instruction', 'assets/img/title_instruction.png');
		game.load.image('Title_HL', 'assets/img/title_HL.png');
		game.load.image('CrossParticle', 'assets/img/crossParticle.png');
		game.load.image('Particle', 'assets/img/particle.png');
		game.load.image('HP_1', 'assets/img/sanity00.png');
		game.load.image('MP', 'assets/img/MP.png');
		game.load.image('Shadow', 'assets/img/ghost0.png');
		game.load.image('Flashlight_icon', 'assets/img/flashlight_icon.png');
		game.load.image('ArrowKey', 'assets/img/arrow_up.png');
		game.load.image('E_key', 'assets/img/e_key.png');
		game.load.image('Cross_E_key', 'assets/img/e_key.png');
		game.load.image('SprintKey', 'assets/img/sprintKey.png');
		game.load.image('Spacebar', 'assets/img/spacebar.png');
		game.load.atlas('Player', 'assets/img/kid.png', 'assets/img/kid.json');
		game.load.atlas('Player_f', 'assets/img/kid_flash.png', "assets/img/kid_flash.json");
		game.load.atlas('Battery_level', 'assets/img/battery_level.png', "assets/img/battery_level.json");
		game.load.audio('Footstep', 'assets/audio/footstep.wav');
		game.load.audio('Huanted', 'assets/audio/huanted_No_slime.wav');
		game.load.start();
	},
	loadStart: function () {
		text = game.add.bitmapText(32, game.height - 32, 'bitmapFont', 'Loading...', 12);
	},
	fileComplete: function (progress) {
		this.loadingBar_f.clear();
		this.loadingBar_f.beginFill(0xE8000C, 0.5);
		this.loadingBar_f.drawRect(34, game.height - 48, progress, 10);
		this.loadingBar_f.endFill();
	},
	loadComplete: function () {
		game.state.start('Title');
	}
};