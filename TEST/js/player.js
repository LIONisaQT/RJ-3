function Player(game, key) {
	// call to Phaser.Sprite
	Phaser.Sprite.call(this, game, 140, 320, key);
	game.add.existing(this);

	// add properties
	this.anchor.set(0.5, 0.5);
	game.physics.enable(this);
	this.defaultVelocity = 500;
    this.velocityNormal = this.defaultVelocity;
    // this.velocityFriction = 100;
	this.body.collideWorldBounds = true;
	this.lastKeyPressed;
	this.maxHealth = 3;
	this.health = this.maxHealth;
	this.gotHit = false;
	this.isStunned = false;
	this.knockbackTimer = 60;
	this.knockbackDistance = 0.5;

	// health bar
	var barConfig = {x: 200, y: 20};
	this.myHealthBar = new HealthBar(this.game, barConfig);

	// create group for player's atkHitboxes
	this.atksatkHitboxes = game.add.group();
	// give all atkHitboxes physics body
	this.atkHitboxes.enableBody = true;
	// make atkHitboxes children of the player so they will move with the player
	this.addChild(this.atkHitboxes);

	// create a hitbox (empty sprite)
	this.basicAtk = this.atkHitboxes.create(this.body.x, this.body.y, null);
	// set size of hitbox and positiong relative to player
	this.basicAtk.body.setSize(50, 40, this.width, 0);
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
	disableAllatkHitboxes();
	this.body.velocity.y = 0;
	game.debug.body(this.basicAtk);
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
		// if (game.input.keyboard.justPressed(Phaser.Keyboard.Z)) {
		// 	enableHitbox("vacuum");
		// }
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
}

function enableHitbox(hitboxName) {
	for (var i = 0; i < player.atkHitboxes.children.length; i++) {
		if (player.atkHitboxes.children[i].name === hitboxName) {
			player.atkHitboxes.children[i].reset(player.body.x, player.body.y);
		}
	}

	// will call disableAllatkHitboxes after a delay (letting the animation complete)
	game.time.events.add(Phaser.Timer.SECOND / 2, disableAllatkHitboxes, this);
}

function disableAllatkHitboxes() {
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
