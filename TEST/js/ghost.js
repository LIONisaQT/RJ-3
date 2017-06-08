var Ghost = function(game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'steam');
    game.add.existing(this);
    this.anchor.setTo(0.5, 0.5);
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.SPEED = 200; // ghost speed
    this.TURN_RATE = 500; // turn rate in degrees/frame
}

Ghost.prototype = Object.create(Phaser.Sprite.prototype);
Ghost.prototype.constructor = Ghost;

function absorbed(g) {
    console.log('absorbed');
    g.kill();
}

Ghost.prototype.update = function() {
    this.playerX = player.x;
    this.playerY = player.y;

    // calculate angle from ghost to player
    var targetAngle = this.game.math.angleBetween(
        this.x, this.y,
        this.playerX, this.playerY
    );

    // turn the ghost towards the target angle
    if (this.rotation !== targetAngle) {
        // calculate difference between current angle and target angle
        var delta = targetAngle - this.rotation;

        // chooses most efficient direction for turning
        if (delta > Math.PI) delta -= Math.PI * 2;
        if (delta < -Math.PI) delta += Math.PI * 2;

        // turning
        if (delta > 0) {
            this.angle += this.TURN_RATE; // clockwise
        } else {
            this.angle -= this.TURN_RATE; // counter-clockwise
        }

        // set angle to target angle if they are close
        if (Math.abs(delta) < this.game.math.degToRad(this.TURN_RATE)) {
            this.rotation = targetAngle;
        }
    }

    // calculate velocity based on rotation and speed
    this.body.velocity.x = Math.cos(this.rotation) * this.SPEED;
    this.body.velocity.y = Math.sin(this.rotation) * this.SPEED;
}
