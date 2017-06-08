function Enemy(game, distX, distY, key) {
    Phaser.Sprite.call(this, game, distX, distY, key);

    game.add.existing(this);

	// add properties
	this.anchor.set(0.5, 0.5);
	game.physics.enable(this);
    this.body.collideWorldBounds = true;
    this.body.immovable = true;
    this.body.enable = true;
    this.maxHealth = 20;
    this.health = this.maxHealth;

    // this.scale.setTo(3);
    // this.velocityNormal = 200;
}

Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

function vacuumed(enemy) {
    console.log("hit");
    ghost = new Ghost(game, enemy.x, enemy.y);
    ghosts.add(ghost);
    enemy.kill();
}

function gettingPulled(enemy) {
    console.log("pulling!");
    enemy.body.velocity.x = -100;
}

Enemy.prototype.update = function() {
    if (this.health == 0) {
        ghost = new Ghost(game, this.x, this.y);
    }
}
