// Debug Plugin:
// Light Algorithm credits to: https://www.emanueleferonato.com/2014/10/21/phaser-tutorial-how-to-create-an-html5-survival-horror-game-in-6-easy-steps/
function LightPlugin(game) {
	Phaser.Plugin.call(this, game);
};

LightPlugin.prototype = Object.create(Phaser.Plugin.prototype);
LightPlugin.prototype.constructor = LightPlugin;

var shadowTexture;

LightPlugin.prototype.addLight = function() {
	shadowTexture = game.add.bitmapData(game.width, game.height);
	shadowTexture.anchor.set(0.5);
	var maskGraphics = game.add.image(game.camera.width/2, game.camera.height/2, shadowTexture);
	// maskGraphics = this.game.add.graphics(0, 0);
	maskGraphics.blendMode = Phaser.blendModes.MULTIPLY;
	// maskGraphics.alpha = 0.1;
	floorLayer.mask = maskGraphics;
	terrainLayer.mask = maskGraphics;
	objectLayer.mask = maskGraphics;
	// terrainLayer.alpha = 0.02;
};
LightPlugin.prototype.updateLight = function() {
	maskGraphics.clear();
	maskGraphics.lineStyle(2, 0xffffff, 1);
	maskGraphics.beginFill(0xffffff);
	var playerX = player.x;
	var playerY = player.y+6;
	maskGraphics.moveTo(playerX, playerY);	
	for(var i = 0; i < NUMBER_OF_RAYS; i++){	
		var rayAngle = directionAngle-(LIGHT_ANGLE/2)+(LIGHT_ANGLE/NUMBER_OF_RAYS)*i;
		var lastX = playerX;
		var lastY = playerY;
		for(var j = 1; j <= RAY_LENGTH; j++){
	  		var landingX = Math.round(playerX-(2*j)*Math.cos(rayAngle));
	  		var landingY = Math.round(playerY-(2*j)*Math.sin(rayAngle));
	  		var tile = map.getTile(terrainLayer.getTileX(landingX), terrainLayer.getTileY(landingY), terrainLayer, true);
	  		if(tile.index == -1){
				lastX = landingX;
				lastY = landingY;
			}
			else{
				maskGraphics.lineTo(lastX,lastY);
				break;
			}
		}
		maskGraphics.lineTo(lastX,lastY);
	}
	maskGraphics.lineTo(playerX,playerY);
	maskGraphics.worldAlpha = 0;
	maskGraphics.endFill();
	floorLayer.alpha = 0.5+Math.random()*0.5;
	updateShadowTexture();
};
LightPlugin.prototype.updateShadowTexture = function() {
	// Draw shadow
	shadowTexture.context.fillStyle = 'rgb(10, 10, 10)';
	shadowTexture.context.fillRect(0, 0, game.width, game.height);

	// Draw circle of light with a soft edge
	gradient = shadowTexture.context.createRadialGradient(game.camera.width/2, game.camera.height/2, LIGHT_RADIUS * 0.75, game.camera.width/2, game.camera.height/2, LIGHT_RADIUS);
	gradient.addColorStop(0, 'rgba(175, 175, 175, 1.0)');
	gradient.addColorStop(1, 'rgba(255, 255, 255, 0.0)');
	gradient.fixedToCamera = true;

	// Draw circle of light
	shadowTexture.context.beginPath();
	shadowTexture.context.fillStyle = gradient;
	// shadowTexture.context.fillStyle = 'rgb(255, 255, 255)';
	shadowTexture.context.arc(game.camera.width/2, game.camera.height/2, LIGHT_RADIUS, 0, Math.PI*2);
	// shadowTexture.polygon([Phaser.Point(game.camera.width/2, game.camera.height/2), Phaser.Point(game.camera.width/2, game.camera.height/2), Phaser.Point(game.camera.width/2+100, game.camera.height/2+100), Phaser.Point(game.camera.width/2+100, game.camera.height/2-100)]);
	shadowTexture.fixedToCamera = true;
	shadowTexture.context.fill();

	// This just tells the engine it should update the texture cache
	shadowTexture.dirty = true;

	// Torch: https://gamemechanicexplorer.com/#lighting-3
	// FlashLight: http://www.html5gamedevs.com/topic/12805-flashlight-effect-and-masking/
};