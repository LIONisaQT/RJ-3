var playState= {
	preload: function() {
		console.log('Play: preload');
	},
	create: function() {
		console.log('Play: create');
		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.stage.setBackgroundColor('#87CEEB');

		// add map
		map = game.add.tilemap('level');
		map.addTilesetImage('tile1', 'tiles');
		bgLayer1 = map.createLayer('bgLayer');
		collideLayer1 = map.createLayer('collideLayer');
		map.setCollisionByExclusion([]);
		collideLayer1.resizeWorld();

		// world and camera properties
		game.world.setBounds(0, -150, 5120, 1024);
		game.camera.deadzone = new Phaser.Rectangle(100, 100, 700, 500);

		// stage properties
		this.totalLeaks = 3;
		this.waterLevel = 100;

		cursors = game.input.keyboard.createCursorKeys();

		// image of controls
		var tutorial = game.add.image(100, 500, 'instructions');
		tutorial.scale.setTo(4);

		// pipes
		pipes = game.add.group();
		for (let i = 0; i < 14; i++) {
			// pipe = new Pipes(game, 'pipe', game.rnd.integerInRange(22, 36) * 40, game.rnd.integerInRange(5, 11) * 40);
			// pipes.add(pipe);
		}

		// oozes
		oozes = game.add.group();
		for (let i = 0; i < 14; i++) {
			// ooze = new Ooze(game, 'ooze', game.rnd.integerInRange(22, 36) * 40, game.rnd.integerInRange(5, 11) * 40);
			// oozes.add(ooze);
		}

		// steam
		// steams = game.add.group();
		// for (let i = 0; i < 1; i++) {
		// 	steam = new Steam(game, 'steam', 220 + i * 120, 300);
		// 	steams.add(steam);
		// 	// steam = new Steam(game, 'steam', 220 + i * 120, 340);
		// 	// steams.add(steam);
		// }

		steam0 = new Steam(game, 'steam', 2200, 300);
		steam1 = new Steam(game, 'steam', 3000, 300);
		steam2 = new Steam(game, 'steam', 3800, 300);
		steam3 = new Steam(game, 'steam', 4600, 300);
		steam4 = new Steam(game, 'steam', 5400, 300);

		// leaks
		leaks = game.add.group();
		for (let i = 0; i < this.totalLeaks; i++) {
			leak = new Leak(game, 2200 + i * 80, 300, 'leak');
			leaks.add(leak);
		}

		// add enemy
		enemy1 = new Enemy(game, 2000, 360, 'enemy');
		enemy2 = new Enemy(game, 2080, 400, 'enemy');

		this.numKills = 0;
		ghosts = game.add.group();

		// add player
		player = new Player(game, 'player');
		game.camera.follow(player, null, 0.1, 0.1);

		// water bar
		var barConfig = {x: 200, y: 60};
		this.waterBar = new HealthBar(this.game, barConfig);

	},
	leakFix: function(player, leak) {
		leak.kill();
		this.totalLeaks-=1;
	},
	checkGhostOverlap: function(ghost) {
		game.physics.arcade.overlap(player, ghost, vacuumedEnemy, null, this);
	},
	checkOverlap: function() {
		if (game.physics.arcade.overlap(enemy1, player.vacuum, null, null, this)){
			return false;
		}
	},
	killEnemy1: function(){
		if (player.body.x < enemy1.body.x) {
			enemy1.body.x -= 1;
			if(enemy1.body.x < player.vacuum.body.x + 10) {
				enemy1.kill();
			}
		} else if (player.body.x > enemy1.body.x) {
			enemy1.body.x += 1;
			if(enemy1.body.x + enemy1.body.width > player.vacuum.body.x + 90) {
				enemy1.kill();
			}
		}

		if (player.body.y > enemy1.body.y) {
			enemy1.body.y += 1;
			if(enemy1.body.y + enemy1.body.height > player.vacuum.body.y + 90) {
				enemy1.kill();
			}
		} else if (player.body.y < enemy1.body.y) {
			enemy1.body.y -= 1;
			if(enemy1.body.y < player.vacuum.body.y + 10) {
				enemy1.kill();
			}
		}
	},
	update: function() {
		// player and map collisions
		game.physics.arcade.collide(player, collideLayer1);
		game.physics.arcade.collide(player, enemy1, knockback, this.checkOverlap , this);
		game.physics.arcade.collide(player, enemy2, knockback, null, this);
		game.physics.arcade.collide(player, pipes);
		game.physics.arcade.collide(player, steam0, knockback, null, this);
		game.physics.arcade.collide(player, steam1, knockback, null, this);
		game.physics.arcade.collide(player, steam2, knockback, null, this);
		game.physics.arcade.collide(player, steam3, knockback, null, this);
		game.physics.arcade.collide(player, steam4, knockback, null, this);
		if (game.physics.arcade.overlap(oozes, player, null, null, this)) {
			player.velocityNormal = 100;
			player.body.velocity.x = 1000; // pushes player (like river), remove later
		} else {
			player.velocityNormal = player.defaultVelocity;
			player.body.velocity.x = 0; // undoes pushing of player, remove later
		}

		// player attack collisions
		// enemy1
		if (game.physics.arcade.overlap(enemy1, player.basicAtk, null, null, this)) {
			console.log("hit");
			enemy1.kill();
		}
		if (game.physics.arcade.overlap(enemy1, player.vacuum, this.killEnemy1, null, this)) {
			if (player.x < enemy1.x) {
				enemy1.x -= 5;
			}
			// console.log('enemy getting pulled');
		} else {
			// enemy1.body.velocity.x = 0;
			// console.log('enemy not getting pulled');
		}

		// enemy2
		if (game.physics.arcade.overlap(enemy2, player.basicAtk, null, null, this)) {
			console.log("hit");
			enemy2.kill();
		}
		if (game.physics.arcade.overlap(enemy2, player.vacuum, null, null, this)) {
			console.log("hit");
			var name = "ghost2";
			enemy2.damage(1);
			enemy2.body.velocity.x = -150;
		} else {
			enemy2.body.velocity.x = 0;
		}

		ghosts.forEach(this.checkGhostOverlap, this, true);
		game.physics.arcade.collide(player.atkHitboxes, leaks, this.leakFix, null, this);

		// world updates
		this.waterLevel -= 0.05 * this.totalLeaks;
		this.waterBar.setPercent(this.waterLevel);

		// debug
		game.debug.body(player);
		game.debug.spriteBounds(steam0);
		game.debug.spriteBounds(steam1);
		game.debug.spriteBounds(steam2);
		game.debug.spriteBounds(steam3);
		game.debug.spriteBounds(steam4);

		// states change
		// if (player.health == 0 || this.waterLevel <= 0) {
		// 	console.log("you lose");
		// 	game.state.start('gameOver');
		// }

		if (this.totalLeaks == 0) {
			console.log("you win");
			game.state.start('gameOver');
		}
	},
};
