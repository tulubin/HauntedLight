// End state
"use strict";
var End = function (game) { };
End.prototype = {
    create: function () {
        this.moveOn = false;

        this.endText = game.add.bitmapText(game.width / 2, game.height - 80, 'bitmapFont', 'You escaped', 16);
        this.endText.anchor.set(0.5);
        game.time.events.add(Phaser.Timer.SECOND * 2, function () {
            this.spacebar = game.add.sprite(game.width / 2, game.height - 50, 'Spacebar');
            this.spacebar.anchor.set(0.5);
            this.spacebarText_f = game.add.bitmapText(game.width / 2 - 60, game.height - 58, 'bitmapFont', 'Press', 16);
            this.spacebarText_b = game.add.bitmapText(game.width / 2 + 20, game.height - 58, 'bitmapFont', 'to Restart', 16);
            this.moveOn = true;
        }, this);
    },
    update: function () {
        // input to continue
        if (this.moveOn) {
            if (game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)) {
                game.state.start('Play');
            }
        }
    }
};