//Jeffrey Hui
//jechui,1395834
//Endless Runner
var loadState = {

	preload: function(){
		game.load.path = '../TEST/assets/img/';
		game.load.images(['pipe', 'steam', 'player', 'enemy', 'wall', 'ooze', 'instructions'],
		['pipeProto.png', 'steamProto.png', 'playerProto.png', 'enemyProto.png', 'wallProto.png', 'oozeProto.png', 'instructions.png']);
		game.load.tilemap('level', 'room.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.spritesheet('tilesheet', 'room.png', 40, 40);
		game.load.image('playbutton', 'playButton.png');

},
	create: function(){
		// go to menu state
		game.state.start('menu');
	},
};
