// Sounds Group:
"use strict";
// sounds:
var footstep;
var huanted;
var openDoor;
var closeDoor;
var openPrisonDoor;
var closePrisonDoor;
var interact;
var mirror;
var jumpscare;
var trigger;
var trapButton;
var flashlight;
var death;
var hiding;
var hidingR;

function Sounds(game) {
    Phaser.Group.call(this, game);
    // add aduio
    footstep = game.add.audio('Footstep');
    huanted = game.add.audio('Huanted');
    openDoor = game.add.audio('OpenDoor');
    closeDoor = game.add.audio('CloseDoor');
    openPrisonDoor = game.add.audio('OpenPrisonDoor');
    closePrisonDoor = game.add.audio('ClosePrisonDoor');
    interact = game.add.audio('Interact');
    mirror = game.add.audio('Mirror');
    jumpscare = game.add.audio('Jumpscare');
    trigger = game.add.audio('Trigger');
    trapButton = game.add.audio('TrapButton');
    flashlight = game.add.audio('Flashlight');
    death = game.add.audio('Death');
    hiding = game.add.audio('Hiding');
    hidingR = game.add.audio('HidingR');
    


    footstep.allowMultiple = true;
    huanted.allowMultiple = true;
    openDoor.allowMultiple = true;
    closeDoor.allowMultiple = true;
    openPrisonDoor.allowMultiple = true;
    closePrisonDoor.allowMultiple = true;
    interact.allowMultiple = true;
    mirror.allowMultiple = true;
    jumpscare.allowMultiple = true;
    trigger.allowMultiple = true;
    trapButton.allowMultiple = true;
    flashlight.allowMultiple = true;
    death.allowMultiple = true;
    hiding.allowMultiple = true;
    hidingR.allowMultiple = true;
};

Sounds.prototype = Object.create(Phaser.Group.prototype);
Sounds.prototype.constructor = Sounds;

Sounds.prototype.update = function () {

}
