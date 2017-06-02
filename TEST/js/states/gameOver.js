var gameOver= {
	create: function(){
		//  Texts on the Menu Screen
		var gameOverLabel = game.add.text(0,0, 'GameOver!',{font:'25px Comic', fill:'#ffffff'});
		var startLabel = game.add.text(80, game.world.height-80, 'Press R to Restart', {font:'25px Comic', fill:'#ffffff'});

		// Listener for R key pressed
		var rkey= game.input.keyboard.addKey(Phaser.Keyboard.R);

		// When player presses R, call start function, which sends me back to menu-screen
		rkey.onDown.addOnce(this.restart,this);
	},

	update: function(){

	},

	restart: function (){
		game.state.start('menu');
	},
};
