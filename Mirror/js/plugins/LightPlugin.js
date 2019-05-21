// Debug Plugin:
// Light Algorithm credits to: https://www.emanueleferonato.com/2014/10/21/phaser-tutorial-how-to-create-an-html5-survival-horror-game-in-6-easy-steps/
function LightPlugin(game) {
	Phaser.Plugin.call(this, game);
};

LightPlugin.prototype = Object.create(Phaser.Plugin.prototype);
LightPlugin.prototype.constructor = LightPlugin;

LightPlugin.prototype.addLight = function() {
	maskGraphics = this.game.add.graphics(0, 0);
	floorLayer.mask = maskGraphics;
	terrainLayer.mask = maskGraphics;
	objectLayer.mask = maskGraphics;
	// terrainLayer.mask = null; // disable mask
	// terrainLayer.alpha = 0.02;
	player.alpha = 0.5;
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
		var k = 0;
		for(var j = 1; j <= RAY_LENGTH; j++){
	  		var terrainTile = map.getTile(terrainLayer.getTileX(lastX), terrainLayer.getTileY(lastY), terrainLayer, true);
	  		var objectTile = map.getTile(objectLayer.getTileX(lastX), objectLayer.getTileY(lastY), objectLayer, true);
	  		if(k < 16){
	  			if(terrainTile.index !== -1 || objectTile.index === DOOR_CLOSED_INDEX) {
	  				k++;
	  			}
		  		var landingX = Math.round(playerX-(2*j)*Math.cos(rayAngle));
		  		var landingY = Math.round(playerY-(2*j)*Math.sin(rayAngle));
				lastX = landingX;
				lastY = landingY;
			}
			else{
				maskGraphics.lineTo(lastX, lastY);
				break;
			}
		}
		maskGraphics.lineTo(lastX, lastY);
	}
	maskGraphics.lineTo(playerX,playerY);
	maskGraphics.worldAlpha = 0;
	maskGraphics.endFill();
	floorLayer.alpha = 0.5+Math.random()*0.5;
};