class Play extends Phaser.Scene{
    constructor(){
        super("PlayScene");
    }
    preload() {
        //Load Images
        this.load.image('p2Rocket', './assets/arrowred.png');
        this.load.image('p1Ballista', './assets/p1Ballista.png');
        this.load.image('p2Ballista', './assets/p2Ballista.png');
        this.load.image('walls', './assets/FinalWall.png');
        this.load.image('border', './assets/BorderTop.png');
        this.load.image('leftborder', './assets/BorderSide1.png');
        //Sprite Sheets for Animations
        this.load.spritesheet('knight', './assets/EvelNite.png', 
        {frameWidth: 48, frameHeight: 48, startFrame: 0, endFrame: 4});
        this.load.spritesheet('captain', './assets/captainknight.png', 
        {frameWidth: 32, frameHeight: 32, startFrame: 0, endFrame: 1});
        this.load.spritesheet('defeat', './assets/enemyboom.png', 
        {frameWidth: 32, frameHeight: 32, startFrame: 0, endFrame: 6});
    }

    create(){
        //Create Instance of Background Music
        bkMusic = this.sound.add('battle_music');
        bkMusic.loop = true; // Sets Loop
        bkMusic.play();

        //Scrolling Background Battlefield sprite
        this.battlefield = this.add.tileSprite(0, 0, 640, 480, 'battlefield').setOrigin(0,0);
        //UI Borders
        this.wall = this.add.tileSprite(0,config.height - borderUISize * 2,640,64, 'walls').setOrigin(0,0);
        
       
    
        //Add Controls for the Rockets
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        //Add Rocket for Player 1
        this.p1Ballista = this.add.sprite(game.config.width/2,game.config.height - borderUISize - borderPadding + 12, 'p1Ballista');
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'p1Rocket',0,keyLEFT, keyRIGHT, keyF).setOrigin(0.5 , 0);
       
        //Create Animations of the Knight
        this.anims.create({
            key: 'test',
            frames: this.anims.generateFrameNumbers('knight', {start: 0, end: 3, first: 0}),
            frameRate: 9,
            repeat: -1
        });

        //Create Animations of the Captian
        this.anims.create({
            key: 'cap',
            frames: this.anims.generateFrameNumbers('captain', {start: 0, end: 1, first: 0}),
            repeat: -1
        });

        //Add the Captain Knight in the scene that has higher speed
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'temp', 0, 50,1).setOrigin(0,0); 
        //Add the Knights in the scene. 
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*4 + borderPadding*2, 'temp', 0, 30,0).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width + borderUISize*1.5, borderUISize*5 + borderPadding*3.5, 'temp', 0, 20).setOrigin(0,0);
        this.ship04 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*5, 'temp', 0, 10).setOrigin(0,0);
       
        //Animation for when enemies are destoried
        this.anims.create({
            key: 'destroy',
            frames: this.anims.generateFrameNumbers('defeat', { start: 0, end:6, first: 0}),
            frameRate: 19
        });

        // Add the borders by using the border images
        this.borderleft = this.add.tileSprite(-26,64, 64,640,'leftborder').setOrigin(0,0);
        this.borderright = this.add.tileSprite(game.config.width - borderUISize * 1.5 + 10, 64, 64,640,'leftborder').setOrigin(0,0);
        this.borderright.flipX = true;
        this.border = this.add.tileSprite(0,64, 640,64,'border').setOrigin(0,0);
        this.borderReflect = this.add.tileSprite(0,0, 640,64,'border').setOrigin(0,0);
        this.borderReflect.flipY = true;


        //Score Initialization
        this.p1Score = 0;

        //Display Score
        let scoreConfig = {
            fontFamily: 'Times',
            fontSize: '28px',
            backgroundColor: '#543c24',
            color: '#FFFFFF',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        //Score Displays
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);
        this.scoretext = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2 - 30, "SCORE", scoreConfig);
  
        //Create Config for Timers
        let timerConfig = {
            fontFamily: 'Times',
            fontSize: '28px',
            backgroundColor: '#543c24',
            color: '#FFFFFF',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
        }

        //Add Counter and Timer
        this.counter;
        this.timer = this.add.text(370, borderUISize + borderPadding*2 - 20, 'Remaining Time :' + this.counter, timerConfig);

        //FireText Preloading
        this.firetext = this.add.text(200, game.config.height/2, 'FIRE', scoreConfig).setOrigin(0,5);

        //GAME OVER Flags
        this.gameOver = false;
        //60 Second Play Clock       
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            bkMusic.stop();
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0,5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart',scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);    
    }

    update() {
        //If GameOver & R is pressed, it will return to the menu
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)){
            this.scene.start("menuScene");
        }
        //Displays Remaining Time on screen
        this.timer.text = 'Remaining Time :' + this.clock.getRemainingSeconds().toFixed(0);
        //Scroll Battlefield to Left
        this.battlefield.tilePositionX -= 4;
        if(!this.gameOver){
            this.p1Rocket.update();             //Updates Position of Rocket
            this.ship01.update();               //Updates Spaceship 1
            this.ship02.update();               //Updates Spaceship 2
            this.ship03.update();               //Updates Spaceship 3
            this.ship04.update();               //Updates Spaceship 4
            this.updateBallista(this.p1Ballista,this.p1Rocket);
        }
        //If any arrow is fired, make the FIRE text visible
        if(this.p1Rocket.isFiring){
            this.firetext.alpha = 1;
        }
        //Else don't display
        else if(!this.p1Rocket.isFiring){
            this.firetext.alpha = 0;
        }

        //Collision Checks to reset Rockets, play explosion and add time
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
            this.clock.delay += 1000;
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
            this.clock.delay += 1000; 
        }
        if(this.checkCollision(this.p1Rocket, this.ship04)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship04);
            this.clock.delay += 1000;
        }
        //Collison stuff for Captain
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
            this.clock.delay += 3000;
        }
       
    }

    //Collision Check for Arrow and Knight (It still says rocket and ship tho lol)
    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width && 
            rocket.x + rocket.width - 8 > ship.x && 
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y -6 > ship. y) {
            return true;
        } 
        else {
            return false;
        }
    }

    //Moves ballista with Rocket.X
    //This is so the ballista will move while aiming but it won't move up while firing
    updateBallista(ballista,rocket){
        ballista.x = rocket.x;
    }

    //Explosion Functions
    shipExplode(ship){
        // Temporarly hide Ship
        ship.alpha = 0;
        // Create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x - 10, ship.y + 5, 'defeat').setOrigin(0,0);
        boom.anims.play('destroy');         // Play Explosion Animation
        boom.on('animationcomplete', () => {// Callback after anim completes
            ship.reset();                   // Reset Ship Position
            ship.alpha = 1;                 // Make Ship Visible Again
            boom.destroy();                 // Remove Explosion Sprite
        });
        //Add Score and Update the scene
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;
        this.sound.play('sfx_explosion');
    }

   
}