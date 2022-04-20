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

       //Load Some Images for Title Preset
       this.load.image('battlefield', './assets/battleground.png');
       this.load.image('p1Rocket', './assets/arrowblue.png');
       this.load.image('cap', './assets/horze.png');
       this.load.image('temp', './assets/frame1.png');
    }
    
    create(){

        let menuConfig = {
            fontFamily: 'Brush Script MT',
            fontSize: '32px',
            backgroundColor: '#8B0000',
            color: '#FFFFFF',
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


        
        this.background = this.add.tileSprite(0, 0, 640, 480, 'battlefield').setOrigin(0,0);
        this.background.setScale(2);
        this.knightrow = this.add.tileSprite(0,game.config.height/2 - 130, 640, 31, 'temp').setOrigin(0,0);
        this.knightrow.setScale(2);
        this.cap = this.add.tileSprite(game.config.width/2 - 32,game.config.height/2 - 220, 31, 31, 'cap').setOrigin(0,0);
        this.cap.setScale(2);
        this.knightrow2 = this.add.tileSprite(160,game.config.height/2 - 190, 160, 32, 'temp').setOrigin(0,0);
        this.knightrow2.setScale(2);
        
        this.arrows = this.add.tileSprite(50,game.config.height/2 + 100, 540, 29, 'p1Rocket').setOrigin(0,0);
        this.arrows.setScale(1);

        this.add.text(game.config.width/2, game.config.height/2 - borderUISize
        -borderPadding, 'MEDIVAL MAYHEM', menuConfig).setOrigin(0.5);
        

        this.add.text(game.config.width/2, game.config.height/2, 'A Rocket Patrol Clone By Omar Alkharji'
        , menuConfig).setOrigin(0.5);

        menuConfig.fontSize = '22px';
        menuConfig.fontFamily = 'Palatino';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize +
        borderPadding + 30, 'SINGLE PLAYER : FOR EASY PRESS ← FOR HARD PRESS ↑', menuConfig).setOrigin(0.5);

        this.add.text(game.config.width/2, game.config.height/2 + borderUISize +
        borderPadding + 120, 'TWO PLAYER : FOR EASY PRESS → FOR HARD PRESS ↓', menuConfig).setOrigin(0.5);
        //Key Binding
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)){
            //Single Player Easy mode
            game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 60000
            }
            mnMusic.stop();
            this.sound.play('sfx_select');
            this.scene.start('PlayScene');
        }
        if (Phaser.Input.Keyboard.JustDown(keyUP)){
            //Single Player Hard Mode
            game.settings = {
                spaceshipSpeed: 4,
                gameTimer: 45000
            }
            mnMusic.stop();
            this.sound.play('sfx_select');
            this.scene.start('PlayScene');
        }

        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)){
            // 2P Easy Mode
            game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 60000
            }
            mnMusic.stop();
            this.sound.play('sfx_select');
            this.scene.start('PlayScene');
        }
    }
}