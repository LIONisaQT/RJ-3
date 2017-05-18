var game;
var map;
var layer;
var mapLayer;
var cursors;
var scrollTrigger = false;

window.onload = function() {
	game = new Phaser.Game(800, 640, Phaser.AUTO);
	game.state.add('Load', Load);
	game.state.add('Play', Play);
	game.state.start('Load');
}

var Load = function(game) {};
Load.prototype = {
	preload: function() {
		console.log('Load: preload');
		game.load.path = '../TEST/assets/img/';
		game.load.images(['pipe', 'steam', 'player', 'enemy', 'wall', 'ooze', 'instructions'],
		['pipeProto.png', 'steamProto.png', 'playerProto.png', 'enemyProto.png', 'wallProto.png', 'oozeProto.png', 'instructions.png']);
		game.load.tilemap('level', 'room.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.spritesheet('tilesheet', 'room.png', 40, 40);
	},
	create: function() {
		console.log('Load: create');
		game.state.start('Play');
	}
};

var Menu = function(game) {};
Menu.prototype = {
	preload: function() {
		console.log('Menu: preload');
	},
	create: function() {

	},
	update: function() {

	}
}

var Play = function(game) {};
Play.prototype = {
	preload: function() {
		console.log('Play: preload');
	},
	create: function() {
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

		// game.add.sprite(0, 560, 'pipe');
		// game.add.sprite(400, 140, 'pipe');
		// game.add.sprite(400, 180, 'pipe');
		// game.add.sprite(400, 220, 'pipe');
		// game.add.sprite(400, 260, 'pipe');
		// game.add.sprite(360, 260, 'pipe');
		// game.add.sprite(360, 300, 'pipe');
		// game.add.sprite(440,140, 'steam');
		// game.add.sprite(400,400, 'player');

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

	},
	update: function() {
		game.physics.arcade.collide(player, mapLayer);
		game.physics.arcade.collide(player, enemy, knockback, null, this);
		game.physics.arcade.collide(player, pipes);
		// game.physics.arcade.collide(player, steams, knockback, null, this);

		if (game.physics.arcade.overlap(oozes, player, null, null, this)) {
			player.velocityNormal = 100;
		} else {
			player.velocityNormal = 200;
		}
	},
}
