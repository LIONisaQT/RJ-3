var loadState = {

	preload: function(){
		game.load.path = '../TEST/assets/music/';
		game.load.audio('shrine', ['Shrine.mp3']);
		game.load.path = '../TEST/assets/img/';
		game.load.images(['pipe', 'steam', 'player', 'heart', 'enemy', 'wall', 'ooze', 'leak', 'text3','text2','text4','text5'],
		['pipeProto.png', 'steamProto.png', 'playerProto.png', 'heartProto.png', 'enemyProto.png', 'wallProto.png', 'oozeProto.png', 'leakProto.png', 'text3.png', 'text22.png','text44.png','text55.png']);
		game.load.tilemap('level', 'flint1.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.spritesheet('player', 'Flint.png', 128, 128, 12);
		game.load.image('tiles', 'wallFloor.png');
		// game.load.image('ground', 'ground.png');
		game.load.image('playbutton', 'playButton.png');

		game.load.spritesheet('text1', 'text1.png',800,118);
		game.load.image('City', 'shitty.png');
},
	create: function(){
		// go to menu state
		game.state.start('menu');
	},
};
