var loadState = {

	preload: function(){
		game.load.path = '../TEST/assets/music/';
		game.load.audio('shrine', ['Shrine.mp3']);
		game.load.path = '../TEST/assets/img/';
		game.load.images(['pipe', 'steamOld', 'player', 'heart', 'enemyOld', 'wall', 'ooze', 'leakOld', 'instructions', 'steamMachine', 'text3','text2','text4','text5', 'startScreen'],
		['pipeProto.png', 'steamProto.png', 'playerProto.png', 'heartProto.png', 'enemyProto.png', 'wallProto.png', 'oozeProto.png', 'leakProto.png', 'instructions.png', 'steammachine.png',  'text3.png', 'text22.png','text44.png','text55.png', 'startscreen.png']);
		game.load.tilemap('level', 'flint1.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.spritesheet('player', 'Flint.png', 128, 128, 12);
		game.load.spritesheet('steam', 'steam_animation.png', 32, 64, 4);
		game.load.spritesheet('leak', 'waterSheet.png', 64, 64, 6);
		game.load.spritesheet('enemy', 'enemy.png', 496, 392, 2);
		game.load.spritesheet('gameOverScreen', 'gameOver.png', 800, 640, 6);
		game.load.image('tiles', 'wallFloor.png');
		// game.load.image('ground', 'ground.png');
		game.load.image('playbutton', 'playButton2.png');

		game.load.spritesheet('text1', 'text1.png',800,118);
		game.load.image('City', 'shitty.png');
},
	create: function(){
		// go to menu state
		game.state.start('menu');
	},
};
