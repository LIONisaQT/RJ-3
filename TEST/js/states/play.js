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
		map.addTilesetImage('wall', 'tilesheet');
		mapLayer = map.createLayer('Tile Layer 1');
		map.setCollisionByExclusion([]);
		mapLayer.resizeWorld();

		// world and camera properties
		game.world.setBounds(0, 0, 3200, 640);
		game.camera.deadzone = new Phaser.Rectangle(50, 50, 700, 500);

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
			pipe = new Pipes(game, 'pipe', game.rnd.integerInRange(22, 36) * 40, game.rnd.integerInRange(5, 11) * 40);
			pipes.add(pipe);
		}

		// oozes
		oozes = game.add.group();
		for (let i = 0; i < 14; i++) {
			ooze = new Ooze(game, 'ooze', game.rnd.integerInRange(22, 36) * 40, game.rnd.integerInRange(5, 11) * 40);
			oozes.add(ooze);
		}

		// steam
		steams = game.add.group();
		// for (let i = 0; i < 5; i++) {
		// 	steam = new Steam(game, 'steam', 220 + i * 120, 300);
		// 	steams.add(steam);
		// 	steam = new Steam(game, 'steam', 220 + i * 120, 340);
		// 	steams.add(steam);
		// }

		// leaks
		leaks = game.add.group();
		for (let i = 0; i < this.totalLeaks; i++) {
			leak = new Leak(game, 2200 + i * 80, 300, 'leak');
			leaks.add(leak);
		}

		// add enemy
		enemy = new Enemy(game, 2000, 360, 'enemy');

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
	update: function() {
		// player and map collisions
		game.physics.arcade.collide(player, mapLayer);
		game.physics.arcade.collide(player, enemy, knockback, null, this);
		game.physics.arcade.collide(player, pipes);
		game.physics.arcade.collide(player, steams, knockback, null, this);
		if (game.physics.arcade.overlap(oozes, player, null, null, this)) {
			player.velocityNormal = 100;
			player.body.velocity.x = 1000; // pushes player (like river), remove later
		} else {
			player.velocityNormal = player.defaultVelocity;
			player.body.velocity.x = 0; // undoes pushing of player, remove later
		}

		// player attack collisions
		if (game.physics.arcade.overlap(enemy, player.atkHitboxes, null, null, this)) {
			console.log("hit");
			// enemy.kill();
		}
		game.physics.arcade.collide(player.atkHitboxes, leaks, this.leakFix, null, this);

		// world updates
		this.waterLevel -= 0.05 * this.totalLeaks;
		this.waterBar.setPercent(this.waterLevel);

		// debug
		game.debug.spriteBounds(steams);

		// states change
		if (player.health == 0 || this.waterLevel <= 0) {
			console.log("you lose");
			game.state.start('gameOver');
		}

		if (this.totalLeaks == 0) {
			console.log("you win");
			game.state.start('gameOver');
		}
	},
};
