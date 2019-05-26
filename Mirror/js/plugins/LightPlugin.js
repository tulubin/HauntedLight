// Debug Plugin:
// Light Algorithm inspired from: https://www.emanueleferonato.com/2014/10/21/phaser-tutorial-how-to-create-an-html5-survival-horror-game-in-6-easy-steps/
function LightPlugin(game) {
	Phaser.Plugin.call(this, game);
};

LightPlugin.prototype = Object.create(Phaser.Plugin.prototype);
LightPlugin.prototype.constructor = LightPlugin;

LightPlugin.prototype.addLight = function() {
	maskGraphics = this.game.add.graphics(0, 0);
	floorLayer.mask = maskGraphics;
	wallLayer.mask = maskGraphics;
	objectLayer.mask = maskGraphics;
	decorations.mask = maskGraphics;
	// shadow.mask = maskGraphics;
	// wallLayer.mask = null; // disable mask
	// wallLayer.alpha = 0.02;
	player.alpha = 0.5;
};
LightPlugin.prototype.updateLight = function() {
	maskGraphics.clear();
	maskGraphics.lineStyle(2, 0xffffff, 1);
	maskGraphics.beginFill(0xff0000);
	var playerX = player.x;
	var playerY = player.y;
	maskGraphics.moveTo(playerX, playerY);	
	for(var i = 0; i < NUMBER_OF_RAYS; i++){	
		var rayAngle = directionAngle-(LIGHT_ANGLE/2)+(LIGHT_ANGLE/NUMBER_OF_RAYS)*i;
		var lastX = playerX;
		var lastY = playerY;
		var lightThrough = false;
		var k = 0;
		for(var j = 1; j <= RAY_LENGTH; j++){
	  		var wallTile = map.getTile(wallLayer.getTileX(lastX), wallLayer.getTileY(lastY), wallLayer, true);
	  		var objectTile = map.getTile(objectLayer.getTileX(lastX), objectLayer.getTileY(lastY), objectLayer, true);
	  		if(Phaser.Math.distance(lastX, lastY, shadow.x, shadow.y) < 1) {
	  			player.currentHP -= 1;
	  		}
	  		if(lightThrough && (k >= GRID_SIZE/2 || (wallTile.index === -1 && objectTile.index !== DOOR_CLOSED_INDEX))){
				maskGraphics.lineTo(lastX, lastY);
				break;
	  		} else {
	  			if(wallTile.index !== -1 || objectTile.index === DOOR_CLOSED_INDEX) {
	  				lightThrough = true;
	  			}
	  			if(lightThrough)
	  				k++;
		  		var landingX = Math.round(playerX-(2*j)*Math.cos(rayAngle));
		  		var landingY = Math.round(playerY-(2*j)*Math.sin(rayAngle));
				lastX = landingX;
				lastY = landingY;
	  		}
		}
		maskGraphics.lineTo(lastX, lastY);
	}
	maskGraphics.lineTo(playerX,playerY);
	maskGraphics.endFill();
	floorLayer.alpha = 0.5+Math.random()*0.5;
};