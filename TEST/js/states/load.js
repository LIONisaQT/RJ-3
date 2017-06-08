var loadState = {

	preload: function(){
		game.load.path = '../TEST/assets/img/';
		game.load.images(['pipe', 'steam', 'player', 'heart', 'enemy', 'wall', 'ooze', 'leak', 'instructions'],
		['pipeProto.png', 'steamProto.png', 'playerProto.png', 'heartProto.png', 'enemyProto.png', 'wallProto.png', 'oozeProto.png', 'leakProto.png', 'instructions.png']);
		game.load.tilemap('level', 'flint1.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.spritesheet('player', 'Flint.png', 128, 128, 12);
		game.load.image('tiles', 'wallFloor.png');
		// game.load.image('ground', 'ground.png');
		game.load.image('playbutton', 'playButton.png');
},
	create: function(){
		// go to menu state
		game.state.start('menu');
	},
};
