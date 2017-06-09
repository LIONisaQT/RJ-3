var gameOver= {
	create: function(){
		this.bg = game.add.sprite(0, 0, 'gameOverScreen');
		this.bg.animations.add('background', [0, 1, 2, 3, 4, 5], 2, false);
		//  Texts on the Menu Screen
		// var gameOverLabel = game.add.text(0, 0, 'Game over!',{font:'25px Comic', fill:'#ffffff'});
		// var startLabel = game.add.text(0, 80, 'Press R to Restart', {font:'25px Comic', fill:'#ffffff'});

		// Listener for R key pressed
		var rkey= game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

		// When player presses R, call start function, which sends me back to menu-screen
		rkey.onDown.addOnce(this.restart,this);
		this.bg.animations.play('background');
	},

	update: function(){

		if (this.bg.animations.frame == 5) {
			this.bg.animations.paused = true;
		}

	},

	restart: function (){
		game.state.start('menu');
	},
};
