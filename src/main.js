let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
}

let game = new Phaser.Game(config);

//Reserve KeyBindings for Rocket Controls
let keyA,keyD,keyF,keyR,keyLEFT,keyRIGHT;

let bkMusic, mnMusic;

// Set UI size
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize/3;