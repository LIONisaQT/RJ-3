function Player(game, key) {
	// call to Phaser.Sprite
	Phaser.Sprite.call(this, game, 1800, 320, key);

	game.add.existing(this);

	// add properties
	this.anchor.set(0.5, 0.5);
	game.physics.enable(this);
    this.velocityNormal = 200;
    // this.velocityFriction = 100;
	this.body.collideWorldBounds = true;
	this.lastKeyPressed;
	this.hp = 3;
	this.gotHit = false;
	this.isStunned = false;
	this.knockbackTimer = 60;
	this.knockbackDistance = 0.5;
}

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function() {
    console.log(this.hp);
	this.body.velocity.x = 0;
	this.body.velocity.y = 0;

	if (this.gotHit) {
		console.log(this.hp);
		stunned();
		damaged();
		this.gotHit = false;

	}

	if (this.isStunned == false) {
		if (cursors.up.isDown) {
	    	this.body.velocity.y = -this.velocityNormal;      // up
			this.lastKeyPressed = 'up';
		} else if(cursors.down.isDown) {
	    	this.body.velocity.y = this.velocityNormal;       // down
			this.lastKeyPressed = 'down';
		}

		if (cursors.left.isDown) {
	    	this.body.velocity.x = -this.velocityNormal;      // left
			this.lastKeyPressed = 'left';
		} else if (cursors.right.isDown) {
	    	this.body.velocity.x = this.velocityNormal;       // right
			this.lastKeyPressed = 'right';
		}
	}

	if (game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)) {
        if (this.lastKeyPressed == 'right') {
			if (this.body.position.x + this.width * 2 >= enemy.body.position.x
				&& this.body.position.y >= enemy.body.position.y - 20
				&& this.body.position.y <= enemy.body.position.y + 20) {
				console.log('get rekt');
				enemy.kill();
			}
		} else if (this.lastKeyPressed == 'left') {
			if (this.body.position.x - this.width * 2 <= enemy.body.position.x
				&& this.body.position.y >= enemy.body.position.y - 20
				&& this.body.position.y <= enemy.body.position.y + 20) {
				console.log('get rekt');
				enemy.kill();
			}
		} else if (this.lastKeyPressed == 'up') {
			if (this.body.position.y - this.width * 2 <= enemy.body.position.y
				&& this.body.position.x >= enemy.body.position.x - 20
				&& this.body.position.x <= enemy.body.position.x + 20) {
				console.log('get rekt');
				enemy.kill();
			}
		} else if (this.lastKeyPressed == 'down') {
			if (this.body.position.x + this.width * 2 >= enemy.body.position.y
				&& this.body.position.x >= enemy.body.position.x - 20
				&& this.body.position.x <= enemy.body.position.x + 20) {
				console.log('good d given');
				enemy.kill();
			}
		}
    }
}

function stunned() {
	console.log('stunned!');
	player.isStunned = true;
	game.time.events.add(1000, notStunned, this);
}

function notStunned() {
	console.log("hi");
	player.isStunned = false;

}

function damaged(){
	player.hp -= 1;
}

function knockback() {
	player.gotHit = true;
	console.log('knockback');

	// if (player.lastKeyPressed == 'up') {
	// 	for (let i = 0; i < player.knockbackTimer; i++) {
	// 		player.body.position.y += player.knockbackDistance;
	// 	}
	// } else if(player.lastKeyPressed == 'down') {
	// 	for (let i = 0; i < player.knockbackTimer; i++) {
	// 		player.body.position.y -= player.knockbackDistance;
	// 	}
	// }
	if (player.lastKeyPressed == 'left') {
		for (let i = 0; i < player.knockbackTimer; i++) {
			player.body.position.x += player.knockbackDistance;
		}
	} else if (player.lastKeyPressed == 'right') {
		for (let i = 0; i < player.knockbackTimer; i++) {
			player.body.position.x -= player.knockbackDistance;
		}
	}
}
