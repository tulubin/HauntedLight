// Debug Plugin:
function LightPlugin(game) {
	Phaser.Plugin.call(this, game);
};

LightPlugin.prototype = Object.create(Phaser.Plugin.prototype);
LightPlugin.prototype.constructor = LightPlugin;

var wallsBitmap;
var floor;
var lightAngle = Math.PI/4;
var numberOfRays = 20;
var rayLength = 100;

LightPlugin.prototype.addLight = function() {
	floor = game.add.sprite(0,0,"floor");
	wallsBitmap = game.make.bitmapData(640,480);
	wallsBitmap.draw("walls");
	wallsBitmap.update();
	game.add.sprite(0,0,wallsBitmap);
	cursors = game.input.keyboard.createCursorKeys();
	maskGraphics = this.game.add.graphics(0, 0);
	floor.mask=maskGraphics
};
LightPlugin.prototype.updateLight = function() {
	var mouseAngle = Math.atan2(player.y-game.input.y,player.x-game.input.x);
	maskGraphics.clear();
	maskGraphics.lineStyle(2, 0xffffff, 1);
	maskGraphics.beginFill(0xffff00);
	maskGraphics.moveTo(player.x,player.y);	
	for(var i = 0; i<numberOfRays; i++){	
		var rayAngle = mouseAngle-(lightAngle/2)+(lightAngle/numberOfRays)*i
		var lastX = player.x;
		var lastY = player.y;
		for(var j= 1; j<=rayLength;j+=1){
      		var landingX = Math.round(player.x-(2*j)*Math.cos(rayAngle));
      		var landingY = Math.round(player.y-(2*j)*Math.sin(rayAngle));
      		if(wallsBitmap.getPixel32(landingX,landingY)==0){
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
	maskGraphics.lineTo(player.x,player.y); 
 	maskGraphics.endFill();
	floor.alpha = 0.5+Math.random()*0.5;	
};