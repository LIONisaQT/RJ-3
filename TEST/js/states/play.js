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
		steam0 = new Steam(game, steamMachine.x + 32, steamMachine.y - 32);
		steam1 = new Steam(game, steamMachine.x + 96, steamMachine.y - 32);

		// leaks
		leak = new Leak(game, 2080, 416);

		gate = new Gate(game, 2080, 800);

		// add enemy
		enemy1 = new Enemy(game, 1952, 864);
		enemy2 = new Enemy(game, 1952, 800);
		enemy3 = new Enemy(game, 1952, 736);

		// add player
		player = new Player(game,400,580, 'player');
		game.camera.follow(player, null, 0.1, 0.1);

		// water bar
		var barConfig = {x: 200, y: 60};
		this.waterBar = new HealthBar(this.game, barConfig);

	},
	leakFix: function(player, leak) {
		leak.kill();
		this.totalLeaks -= 1;
	},

	checkOverlap: function() {
		if (game.physics.arcade.overlap(enemy1, player.vacuum, null, null, this)){
			return false;
		}
	},
	checkOverlap2: function() {
		if (game.physics.arcade.overlap(enemy2, player.vacuum, null, null, this)){
			return false;
		}
	},
	checkOverlap3: function() {
		if (game.physics.arcade.overlap(enemy3, player.vacuum, null, null, this)){
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
	killEnemy2: function(){
		if (player.body.x < enemy2.body.x) {
			enemy2.body.x -= 1;
			if(enemy2.body.x < player.vacuum.body.x + 10) {
				enemy2.kill();
			}
		} else if (player.body.x > enemy2.body.x) {
			enemy2.body.x += 1;
			if(enemy2.body.x + enemy2.body.width > player.vacuum.body.x + 90) {
				enemy2.kill();
			}
		}

		if (player.body.y > enemy2.body.y) {
			enemy2.body.y += 1;
			if(enemy2.body.y + enemy2.body.height > player.vacuum.body.y + 90) {
				enemy2.kill();
			}
		} else if (player.body.y < enemy2.body.y) {
			enemy2.body.y -= 1;
			if(enemy2.body.y < player.vacuum.body.y + 10) {
				enemy2.kill();
			}
		}
	},
	killEnemy3: function(){
		if (player.body.x < enemy3.body.x) {
			enemy3.body.x -= 1;
			if(enemy3.body.x < player.vacuum.body.x + 10) {
				enemy3.kill();
			}
		} else if (player.body.x > enemy3.body.x) {
			enemy3.body.x += 1;
			if(enemy3.body.x + enemy3.body.width > player.vacuum.body.x + 90) {
				enemy3.kill();
			}
		}

		if (player.body.y > enemy3.body.y) {
			enemy3.body.y += 1;
			if(enemy3.body.y + enemy3.body.height > player.vacuum.body.y + 90) {
				enemy3.kill();
			}
		} else if (player.body.y < enemy3.body.y) {
			enemy3.body.y -= 1;
			if(enemy3.body.y < player.vacuum.body.y + 10) {
				enemy3.kill();
			}
		}
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
		// player and map collisions
		game.physics.arcade.collide(player, collideLayer1);
		game.physics.arcade.collide(player, enemy1, knockback, this.checkOverlap, this);
		game.physics.arcade.collide(player, enemy2, knockback, this.checkOverlap2, this);
		game.physics.arcade.collide(player, enemy3, knockback, this.checkOverlap3, this);
		game.physics.arcade.collide(player, pipes);
		game.physics.arcade.collide(player, steam0, knockback, null, this);
		game.physics.arcade.collide(player, steam1, knockback, null, this);
		if (game.physics.arcade.overlap(oozes, player, null, null, this)) {
			player.velocityNormal = 100;
			player.body.velocity.x = 1000; // pushes player (like river), remove later
		} else {
			player.velocityNormal = player.defaultVelocity;
			player.body.velocity.x = 0; // undoes pushing of player, remove later
		}

		// if(this.game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)){
		// 	this.shrine.stop();
		// 	this.start();
		// }

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
		if (game.physics.arcade.overlap(enemy2, player.vacuum, this.killEnemy2, null, this)) {
			if (player.x < enemy2.x) {
				enemy2.x -= 5;
			}
			// console.log('enemy getting pulled');
		} else {
			// enemy1.body.velocity.x = 0;
			// console.log('enemy not getting pulled');
		}

		// enemy3
		if (game.physics.arcade.overlap(enemy3, player.basicAtk, null, null, this)) {
			console.log("hit");
			enemy3.kill();
		}
		if (game.physics.arcade.overlap(enemy3, player.vacuum, this.killEnemy3, null, this)) {
			if (player.x < enemy3.x) {
				enemy3.x -= 5;
			}
			// console.log('enemy getting pulled');
		} else {
			// enemy1.body.velocity.x = 0;
			// console.log('enemy not getting pulled');
		}

		game.physics.arcade.collide(player.basicAtk, leak, this.leakFix, null, this);

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
