function Enemy(game, distX, distY, key) {
    Phaser.Sprite.call(this, game, distX, distY, key);

    game.add.existing(this);

	// add properties
	this.anchor.set(0.5, 0.5);
	game.physics.enable(this);
    this.body.collideWorldBounds = true;
    this.body.immovable = true;
    this.body.enable = true;
    // this.scale.setTo(3);
    // this.velocityNormal = 200;
}

Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.update = function() {

}
