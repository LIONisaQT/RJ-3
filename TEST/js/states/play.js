var playState= {
	preload: function() {
		console.log('Play: preload');
		game.physics.startSystem(Phaser.Physics.ARCADE);
	},
	create: function() {
		console.log('Play: create');
		game.stage.setBackgroundColor('#4f2412');

		this.transition = game.plugins.add(new Phaser.Plugin.StateTransition);

		this.snow = game.add.audio('Snowland',0.6);
		this.snow.loopFull();

		// add map
		map = game.add.tilemap('level');
		map.addTilesetImage('wallFloor', 'tiles');
		bgLayer1 = map.createLayer('bgLayer');
		collideLayer1 = map.createLayer('collideLayer');
		map.setCollisionByExclusion([]);
		collideLayer1.resizeWorld();

		// world and camera properties
		game.world.setBounds(0, 0, 2176, 1024);
		game.camera.deadzone = new Phaser.Rectangle(100, 100, 700, 500);

		// stage properties
		this.totalLeaks = 1;
		this.waterLevel = 100;

		cursors = game.input.keyboard.createCursorKeys();

		// image of controls
		// var tutorial = game.add.image(100, 500, 'instructions');
		// tutorial.scale.setTo(4);

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

		steamMachine = game.add.sprite(704, 640, 'steamMachine');
		steams = game.add.group();
		steam0 = new Steam(game, steamMachine.x + 32, steamMachine.y - 32, 'steam00');
		steams.add(steam0);
		steam1 = new Steam(game, steamMachine.x + 96, steamMachine.y - 32, 'steam01');
		steams.add(steam1);

		// leaks
		leaks = game.add.group();
		leak = new Leak(game, 2080, 416, this);
		leaks.add(leak);

		gate = new Gate(game, 2080, 800);

		// add enemy
		enemies = game.add.group();
		enemy1 = new Enemy(game, 1952, 864);
		enemies.add(enemy1);
		enemy2 = new Enemy(game, 1952, 800);
		enemies.add(enemy2);
		enemy3 = new Enemy(game, 1952, 736);
		enemies.add(enemy3);

		// add player
		player = new Player(game, 400, 580);
		game.camera.follow(player, null, 0.1, 0.1);

		// water bar
		var barConfig = {x: 250, y: 60};
		this.waterBar = new HealthBar(this.game, barConfig);
		barConfig = {x: this.waterBar.x, y: this.waterBar.y - 4, height: 8, bar: {color: '#75aaff'}};
		this.waterBarHighlight = new HealthBar(this.game, barConfig);
		waterIcon = game.add.sprite(this.waterBar.x - 245, this.waterBar.y - 15, 'water');
		waterIcon.scale.setTo(0.75);
		waterIcon.fixedToCamera = true;
	},

	fadeCompleteWin: function() {
		console.log("level2");
		this.snow.stop();
		game.state.start('level2');
	},

	fadeCompleteLose: function() {
		console.log("you lose");
		this.snow.stop();
		game.state.start('gameOver');
	},

	update: function() {
		// world updates
		this.waterLevel -= 0.05 * this.totalLeaks;
		this.waterBar.setPercent(this.waterLevel);
		this.waterBarHighlight.setPercent(this.waterLevel);

		// debug
		// game.debug.body(player);
		game.debug.body(steam0);
		game.debug.body(steam1);

		// states change
		if (player.health == 0 || this.waterLevel <= 0) {
			this.camera.fade('#000000');
			this.camera.onFadeComplete.add(this.fadeCompleteLose, this);
			console.log("you lose");
		}

		if (this.totalLeaks == 0 && game.physics.arcade.overlap(player, gate, null, null, this)) {
			this.camera.fade('#000000');
			this.camera.onFadeComplete.add(this.fadeCompleteWin, this);
			console.log("you win");
			// this.transition.to('level2');
			// game.state.start('level2');
		}
	},
};
