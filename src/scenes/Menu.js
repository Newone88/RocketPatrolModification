class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene");
    }
    preload() {
       //Load Audio
       this.load.audio('menu_music', './assets/menuMusic.mp3');
       this.load.audio('battle_music', './assets/BackgroundMusic.mp3');

       this.load.audio('sfx_select', './assets/menuSelect.mp3');
       this.load.audio('sfx_explosion', './assets/enemyDestoried.wav');
       this.load.audio('sfx_rocket', './assets/shooting.mp3');
    }
    
    create(){
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        
        mnMusic = this.sound.add('menu_music');
        mnMusic.loop = true; // This is what you are looking for
        mnMusic.play();

        this.add.text(game.config.width/2, game.config.height/2 - borderUISize
        -borderPadding, 'ROCKET PATROL', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, 'Use ←→ arrows to move & (F) to fire'
        , menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#000';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize +
        borderPadding, 'Press ← for Novice or → for Expert', menuConfig).setOrigin(0.5);

        //Key Binding
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)){
            //Easy mode
            game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 60000
            }
            mnMusic.stop();
            this.sound.play('sfx_select');
            this.scene.start('PlayScene');
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)){
            // Hard Mode
            game.settings = {
                spaceshipSpeed: 4,
                gameTimer: 45000
            }
            mnMusic.stop();
            this.sound.play('sfx_select');
            this.scene.start('PlayScene');
        }
    }
}