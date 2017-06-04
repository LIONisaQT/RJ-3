function Steam(game, key, x, y) {

	var enableCollision = true;

	this.localX = x;
	this.localY = y;

	// call to Phaser.Sprite

	console.log('function Steam');
	Phaser.Sprite.call(this, game, x, y, key);

	game.add.existing(this);

	// add properties
	this.anchor.set(0.5, 0.5);
	game.physics.enable(this, Phaser.Physics.ARCADE, true);
	this.body.immovable = true;
	this.body.enable = true;
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

}
function steamInt() {
	// console.log('steamInt');
	// this.visible = !this.visible;
	this.body.enable = !this.body.enable;
	// this.destroy();
}
