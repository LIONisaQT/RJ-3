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

		steams = game.add.group();
		enemies = game.add.group();
		leaks = game.add.group();

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
		ooze1 = new Ooze(game, 'ooze', 160, 670);
		ooze2 = new Ooze(game, 'ooze', 160, 570);
		ooze3 = new Ooze(game, 'ooze', 160, 470);
		oozes.add(ooze1);
		oozes.add(ooze2);
		oozes.add(ooze3);
	

		// steam
		// steams = game.add.group();
		// for (let i = 0; i < 1; i++) {
		// 	steam = new Steam(game, 'steam', 220 + i * 120, 300);
		// 	steams.add(steam);
		// 	// steam = new Steam(game, 'steam', 220 + i * 120, 340);
		// 	// steams.add(steam);
		// }

		steamMachine = game.add.sprite(960, 1024, 'steamMachine');
		steams = game.add.group();

		steam0 = new Steam(game, steamMachine.x + 32, steamMachine.y +96, 'steam00');		// bot left steam
		steam0.rotation = 9.5;
		steams.add(steam0);	

		steam00 = new Steam(game, steamMachine.x + 32, steamMachine.y -32, 'steam01');		// top left steam
		steams.add(steam00);

		// steam1 = new Steam(game, steamMachine.x + 96, steamMachine.y +96, 'steam01');		// bot right steam
		// steam1.rotation = 9.5;
		// steams.add(steam1);

		// steam11 = new Steam(game, steamMachine.x + 96, steamMachine.y -32, 'steam00');		//  top right steam
		// steams.add(steam11);


		steamMachine1 = game.add.sprite(1152, 1024, 'steamMachine');
		steam2 = new Steam(game, steamMachine1.x + 32, steamMachine1.y +96, 'steam00');		// bot left steam
		steam2.rotation = 9.5;
		steams.add(steam2);	

		steam22 = new Steam(game, steamMachine1.x + 32, steamMachine1.y -32, 'steam01');		// top left steam
		steams.add(steam22);

		steam3 = new Steam(game, steamMachine1.x + 96, steamMachine1.y +96, 'steam01');		// bot right steam
		steam3.rotation = 9.5;
		steams.add(steam3);

		// steam33 = new Steam(game, steamMachine1.x + 96, steamMachine1.y -32, 'steam00');		//  top right steam
		// steams.add(steam33);

		game.physics.enable(steamMachine);
		steamMachine.body.immovable = true;

		game.physics.enable(steamMachine1);
		steamMachine1.body.immovable = true;


		steamMachine2 = game.add.sprite(1344, 1024, 'steamMachine');
		steam4 = new Steam(game, steamMachine2.x + 32, steamMachine2.y +96, 'steam00');		// bot left steam
		steam4.rotation = 9.5;
		steams.add(steam4);	

		steam44 = new Steam(game, steamMachine2.x + 32, steamMachine2.y -32, 'steam01');		// top left steam
		steams.add(steam44);

		steam5 = new Steam(game, steamMachine2.x + 96, steamMachine2.y +96, 'steam01');		// bot right steam
		steam5.rotation = 9.5;
		steams.add(steam5);

		steam55 = new Steam(game, steamMachine2.x + 96, steamMachine2.y -32, 'steam00');		//  top right steam
		steams.add(steam55);

		game.physics.enable(steamMachine);
		steamMachine.body.immovable = true;

		game.physics.enable(steamMachine1);
		steamMachine1.body.immovable = true;

		game.physics.enable(steamMachine2);
		steamMachine2.body.immovable = true;


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
		var barConfig = {x: 250, y: 60};
		this.waterBar = new HealthBar(this.game, barConfig);
		barConfig = {x: this.waterBar.x, y: this.waterBar.y - 4, height: 8, bar: {color: '#75aaff'}};
		this.waterBarHighlight = new HealthBar(this.game, barConfig);
		waterIcon = game.add.sprite(this.waterBar.x - 245, this.waterBar.y - 15, 'water');
		waterIcon.scale.setTo(0.75);
		waterIcon.fixedToCamera = true;

	},

	fadeCompleteWin: function() {
		console.log("you win");
		this.mc.stop();
		game.state.start('level4');

	},

	fadeCompleteLose: function() {
		console.log("you lose");
		this.mc.stop();
		game.state.start('gameOver');
	},

	update: function() {
			// this.camera.fade('#000000');
			// this.camera.onFadeComplete.add(this.fadeComplete, this);

		game.physics.arcade.collide(player, steamMachine);
		game.physics.arcade.collide(player, steamMachine1);
		game.physics.arcade.collide(player, steamMachine2);
		// world updates
		this.waterLevel -= 0.02 * this.totalLeaks;
		this.waterBar.setPercent(this.waterLevel);
		this.waterBarHighlight.setPercent(this.waterLevel);

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
