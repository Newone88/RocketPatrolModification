let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [ Menu, Play, Multi ]
}

let game = new Phaser.Game(config);

//Reserve KeyBindings for Rocket Controls
let keyA,keyD,keyS,keyF,keyR,keyLEFT,keyRIGHT,keyUP,keyDOWN;

let bkMusic, mnMusic;

// Set UI size
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize/3;