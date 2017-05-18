//Jeffrey Hui
//jechui,1395834
//Endless Runner
//game.sound.stopAll();
// var obstacleSpeed;
var playState= {
	preload: function() {
		console.log('Play: preload');
	},
	create: function() {
		this.totalLeaks = 1;
		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.stage.setBackgroundColor('#87CEEB');

		map = game.add.tilemap('level');
		map.addTilesetImage('wall', 'tilesheet');

		mapLayer = map.createLayer('Tile Layer 1');
		map.setCollisionByExclusion([]);
		mapLayer.resizeWorld();

		var pipeDistX = 20;
		var pipeDistY = 20;
		game.world.setBounds(0, 0, 3200, 640);
		game.camera.deadzone = new Phaser.Rectangle(50, 50, 700, 500);

		console.log('Play: create');

		cursors = game.input.keyboard.createCursorKeys();

		var tutorial = game.add.image(100, 500, 'instructions');
		tutorial.scale.setTo(4);

		pipes = game.add.group();
		for (let i = 0; i < 14; i++) {
			pipe = new Pipes(game, 'pipe', game.rnd.integerInRange(22, 36) * 40, game.rnd.integerInRange(5, 11) * 40);
			pipes.add(pipe);
		}

		oozes = game.add.group();
		for (let i = 0; i < 14; i++) {
			ooze = new Ooze(game, 'ooze', game.rnd.integerInRange(22, 36) * 40, game.rnd.integerInRange(5, 11) * 40);
			oozes.add(ooze);
		}

		// steams = game.add.group();
		// for (let i = 0; i < 5; i++) {
		// 	steam = new Steam(game, 'steam', 220 + i * 120, 300);
		// 	steams.add(steam);
		// 	steam = new Steam(game, 'steam', 220 + i * 120, 340);
		// 	steams.add(steam);
		// }

		player = new Player(game, 'player');
		game.camera.follow(player, null, 0.1, 0.1);

		enemy = new Enemy(game, 2000, 360, 'enemy');
		leak = new Leak(game, 2200, 300, 'leak');

	},
	leakFix: function(leak, player) {
		leak.kill();
		this.totalLeaks-=1;
	},
	update: function() {
		game.physics.arcade.collide(player, mapLayer);
		game.physics.arcade.collide(player, enemy, knockback, null, this);
		game.physics.arcade.collide(leak, player, this.leakFix, null, this);
		game.physics.arcade.collide(player, pipes);
		// game.physics.arcade.collide(player, steams, knockback, null, this);

		if (game.physics.arcade.overlap(oozes, player, null, null, this)) {
			player.velocityNormal = 100;
		} else {
			player.velocityNormal = 200;
		}

		console.log(this.totalLeaks);

		// if (player.body.position.x > 2080) {
		// 	game.state.start('gameOver');
		// }

		if (this.totalLeaks == 0) {
			console.log("you lose");
			game.state.start('gameOver');
		}
	},


};
