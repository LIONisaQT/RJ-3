var transitionState = {
    preload: function() {

    },

    create: function() {
        game.stage.setBackgroundColor('#000000');

        this.transition = game.plugins.add(new Phaser.Plugin.StateTransition);

     

        // world and camera properties
		game.world.setBounds(0, -150, 5120, 1024);
		game.camera.deadzone = new Phaser.Rectangle(100, 100, 700, 500);
    },

    update: function() {
       
        this.transition.to('level2');
    }
};
