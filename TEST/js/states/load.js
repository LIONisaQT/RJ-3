var loadState = {

	preload: function(){
		game.load.path = '../TEST/assets/img/';
		game.load.images(['pipe', 'steam', 'player', 'heart', 'enemy', 'wall', 'ooze', 'leak', 'instructions'],
		['pipeProto.png', 'steamProto.png', 'playerProto.png', 'heartProto.png', 'enemyProto.png', 'wallProto.png', 'oozeProto.png', 'leakProto.png', 'instructions.png']);
		game.load.tilemap('level', 'level1.json', null, Phaser.Tilemap.TILED_JSON);
		// game.load.spritesheet('tilesheet', 'level1.png', 40, 40);
		game.load.image('tiles', 'brickwall.png');
		game.load.image('playbutton', 'playButton.png');

},
	create: function(){
		// go to menu state
		game.state.start('menu');
	},
};
