function Steam(game, x, y) {

	var enableCollision = true;

	this.localX = x;
	this.localY = y;

	// call to Phaser.Sprite
	console.log('function Steam');
	Phaser.Sprite.call(this, game, x, y, 'steam');
	game.add.existing(this);

	this.animations.add('blow', [0, 1, 2, 4], 1, true);

	// add properties
	game.physics.enable(this);
	this.anchor.set(0.5, 0.5);
	this.body.immovable = true;
	this.body.enable = true;
	this.body.setSize(20, 64, 4, 0);

	//this.body.moves = false;

	game.time.events.loop(1000, steamInt, this);
	game.time.events.start();
}

Steam.prototype = Object.create(Phaser.Sprite.prototype);
Steam.prototype.constructor = Steam;

Steam.prototype.create = function() {
	console.log('Steam create');
},

Steam.prototype.update = function() {
	this.animations.play('blow');
}
function steamInt() {
	// console.log('steamInt');
	// this.visible = !this.visible;
	this.body.enable = !this.body.enable;
	// this.destroy();
}
