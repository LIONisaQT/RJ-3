//Jeffrey Hui
//jechui,1395834
//Endless Runner

var game;
var map;
var layer;
var mapLayer;
var cursors;
var scrollTrigger = false;

// Create my Phaser.Game object
game = new Phaser.Game(800, 640, Phaser.AUTO);

// Add all states using key value pairs
game.state.add('load',loadState);
game.state.add('menu',menuState);
game.state.add('play',playState);
game.state.add('gameOver',gameOver);

// start game by first starting w/ the bootState
game.state.start('load');