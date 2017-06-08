function Player(game, key) {
	// call to Phaser.Sprite
	Phaser.Sprite.call(this, game, 360, 420, key);
	game.add.existing(this);

	// add animations
	this.animations.add('walkDown', [0, 1, 2, 3], 5, true);
	this.animations.add('walkUp', [4, 5, 6, 7], 5, true);
	this.animations.add('walkSide', [8, 9, 10, 11], 5, true);

	// physics properties
	game.physics.enable(this);
	this.scaleVal = 0.5;
	this.scale.setTo(this.scaleVal, this.scaleVal);
	this.body.setSize(80, 50, 20, 60);
	this.anchor.set(0.5, 0.5);
	this.defaultVelocity = 500;
    this.velocityNormal = this.defaultVelocity;
	this.body.collideWorldBounds = true;

	// other properties
	this.lastKeyPressed;
	this.maxHealth = 3;
	this.health = this.maxHealth;
	this.gotHit = false;
	this.isStunned = false;
	this.knockbackTimer = 60;
	this.knockbackDistance = 0.5;
	this.vacuumAmmo = 0;

	// health bar
	var barConfig = {x: 200, y: 20};
	this.myHealthBar = new HealthBar(this.game, barConfig);

	// create group for player's atkHitboxes
	this.atkHitboxes = game.add.group();
	// give all atkHitboxes physics body
	this.atkHitboxes.enableBody = true;
	// make atkHitboxes children of the player so they will move with the player
	this.addChild(this.atkHitboxes);

	// create a hitbox (empty sprite)
	this.basicAtk = this.atkHitboxes.create(this.body.x, this.body.y, null);
	// set size of hitbox and positiong relative to player
	this.basicAtk.body.setSize(40, 40, this.width, 0);
	// properties of the hitbox
	this.basicAtk.name = "basicAtk";
	this.basicAtk.damage = 1;
	this.basicAtk.knockbackDirection = 0.5;
	this.basicAtk.knockbackAmt = 600;

	this.vacuum = this.atkHitboxes.create(this.body.x, this.body.y, null);
	this.vacuum.body.setSize(100, 60, this.width, -20);
	this.vacuum.name = "vacuum";
	this.basicAtk.damage = 1;
}

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function() {
	disableAllHitboxes();
	this.body.velocity.y = 0;
	// game.debug.body(this.basicAtk);
	// game.debug.body(this.vacuum);

	// player gets hit by damaging element
	if (this.gotHit) {
		// console.log(this.hp);
		stunned();
		damaged();
		this.gotHit = false;
		this.health -= 1;
		console.log(this.health / this.maxHealth * 100);
		this.myHealthBar.setPercent(this.health / this.maxHealth * 100);
	}

	// player mechanics enabled when not stunned
	if (this.isStunned == false) {
		if (game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)) {
			enableHitbox("basicAtk");
		}
		if (game.input.keyboard.isDown(Phaser.Keyboard.Z)) {
			player.velocityNormal = 100;
			enableHitbox("vacuum");
		}
		if (cursors.up.isDown) {
			this.animations.play('walkUp');
	    	this.body.velocity.y = -this.velocityNormal;      // up
			this.lastKeyPressed = 'up';
		} else if(cursors.down.isDown) {
			this.animations.play('walkDown');
	    	this.body.velocity.y = this.velocityNormal;       // down
			this.lastKeyPressed = 'down';
		} else if (cursors.left.isDown) {
			this.scale.setTo(-player.scaleVal, player.scaleVal);
			this.animations.play('walkSide');
	    	this.body.velocity.x = -this.velocityNormal;      // left
			this.lastKeyPressed = 'left';
		} else if (cursors.right.isDown) {
			this.scale.setTo(player.scaleVal, player.scaleVal);
			this.animations.play('walkSide');
	    	this.body.velocity.x = this.velocityNormal;       // right
			this.lastKeyPressed = 'right';
		} else {
			this.animations.stop();
		}
	}
}

function enableHitbox(hitboxName) {
	for (var i = 0; i < player.atkHitboxes.children.length; i++) {
		if (player.atkHitboxes.children[i].name === hitboxName) {
			switch (player.atkHitboxes.children[i].name) {
				case 'basicAtk':
					switch (player.lastKeyPressed) {
						case 'right':
							player.atkHitboxes.children[i].reset(player.body.x - 25, player.body.y - 10);
							break;
						case 'left':
							player.atkHitboxes.children[i].reset(player.body.x - 100, player.body.y - 10);
							break;
						case 'up':
							player.atkHitboxes.children[i].reset(player.body.x - 64, player.body.y - 50);
							break;
						case 'down':
							player.atkHitboxes.children[i].reset(player.body.x - 64, player.body.y + 20);
							break;
						default:
					}
					break;
				case 'vacuum':
					switch (player.lastKeyPressed) {
						case 'right':
							player.vacuum.body.setSize(100, 60, this.width, -20);
							player.atkHitboxes.children[i].reset(player.body.x - 25, player.body.y - 10);
							break;
						case 'left':
							player.vacuum.body.setSize(100, 60, this.width, -20);
							player.atkHitboxes.children[i].reset(player.body.x - 160, player.body.y - 10);
							break;
						case 'up':
							player.vacuum.body.setSize(60, 100, this.width, -20);
							player.atkHitboxes.children[i].reset(player.body.x - 75, player.body.y - 90);
							break;
						case 'down':
							player.vacuum.body.setSize(60, 100, this.width, -20);
							player.atkHitboxes.children[i].reset(player.body.x - 75, player.body.y + 40);
							break;
						default:
					}
				default:
			}
		}
	}

	// will call disableAllatkHitboxes after a delay (letting the animation complete)
	game.time.events.add(Phaser.Timer.SECOND / 2, disableAllHitboxes, this);
}

function disableAllHitboxes() {
	player.atkHitboxes.forEachExists(function(hitbox) {hitbox.kill();});
}

function stunned() {
	console.log('stunned!');
	player.isStunned = true;
	game.time.events.add(1000, notStunned, this);
}

function notStunned() {
	console.log("un-stunned!");
	player.isStunned = false;
}

function damaged() {
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
