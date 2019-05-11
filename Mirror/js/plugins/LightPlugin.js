// Debug Plugin:
function LightPlugin(game) {
	Phaser.Plugin.call(this, game);
};

LightPlugin.prototype = Object.create(Phaser.Plugin.prototype);
LightPlugin.prototype.constructor = LightPlugin;

LightPlugin.prototype.addLight = function() {
	game.stage.backgroundColor = 0x4488cc;
	shadowTexture = game.add.bitmapData(game.width, game.height);
	var lightSprite = game.add.image(game.camera.width/2, game.camera.height/2, shadowTexture);
	lightSprite.anchor.set(0.5);
	lightSprite.fixedToCamera = true;
	lightSprite.blendMode = Phaser.blendModes.MULTIPLY;
};
LightPlugin.prototype.updateLight = function() {
	this.updateShadowTexture();
}
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
};