function Enemy(game, distX, distY) {
    Phaser.Sprite.call(this, game, distX, distY, 'enemy');

    game.add.existing(this);

    this.animations.add('rawr', [0, 1], 5, true);

	// add properties
	this.anchor.set(0.5, 0.5);
	game.physics.enable(this);
    this.body.collideWorldBounds = true;
    this.body.immovable = true;
    this.body.enable = true;
    this.maxHealth = 20;
    this.health = this.maxHealth;

    this.scale.setTo(1/8);
    // this.velocityNormal = 200;
}

Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.update = function() {
    this.animations.play('rawr');
}
