var lvl3= {
	preload: function() {
		console.log('Play: preload');
		game.physics.startSystem(Phaser.Physics.ARCADE);
	},
	create: function() {
		console.log('Play: create');
		game.stage.setBackgroundColor('#4f2412');

		this.transition = game.plugins.add(new Phaser.Plugin.StateTransition);

	    this.mc = game.add.audio('MC',0.6);
        this.mc.loopFull();

		// add map
		map = game.add.tilemap('level33');
		map.addTilesetImage('wallFloor', 'tiles');
		bgLayer1 = map.createLayer('bgLayer');
		collideLayer1 = map.createLayer('collideLayer');
		map.setCollisionByExclusion([]);
		collideLayer1.resizeWorld();

		// world and camera properties
		//game.world.setBounds(0, 0, 1538, 1538);
		game.camera.deadzone = new Phaser.Rectangle(100, 100, 700, 500);

		// stage properties
		this.totalLeaks = 2;
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
		steam0 = new Steam(game, steamMachine.x + 32, steamMachine.y - 32);
		steam1 = new Steam(game, steamMachine.x + 96, steamMachine.y - 32);

		// leaks
		 leak = new Leak(game, 352, 480, this);
		 leak1 = new Leak(game, 928, 992, this);
		 //console.log(player.body.x);
		 //console.log(player.body.y);
		// leak2 = new Leak(game, 768, 1440);

		gate = new Gate(game, 1664, 800);

		// add enemy
		// enemy1 = new Enemy(game, 1952, 864);
		// enemy2 = new Enemy(game, 1952, 800);
		// enemy3 = new Enemy(game, 1952, 736);

		// add player
		player = new Player(game,448,1088, 'player');

		game.camera.follow(player, null, 0.1, 0.1);

		// water bar
		var barConfig = {x: 200, y: 60};
		this.waterBar = new HealthBar(this.game, barConfig);

	},

	fadeCompleteWin: function() {
		console.log("you win");
		this.mc.stop();
		//game.state.start('win');
	},

	fadeCompleteLose: function() {
		console.log("you lose");
		this.mc.stop();
		game.state.start('gameOver');
	},

	update: function() {
		// world updates
		this.waterLevel -= 0.05 * this.totalLeaks;
		this.waterBar.setPercent(this.waterLevel);

		// debug
		// game.debug.body(player);
		// game.debug.body(steam0);
		// game.debug.body(steam1);
		// game.debug.spriteBounds(steam2);
		// game.debug.spriteBounds(steam3);
		// game.debug.spriteBounds(steam4);

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
