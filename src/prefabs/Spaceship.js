//Spaceship's PreFabs
class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue,isCap) {
        super(scene,x,y, texture, frame);

        if(isCap == 1){
            this.anims.play('cap');
        }
        else{
            this.anims.play('test'); 
        }
        scene.add.existing(this);                         // Add to Existing Scene
        this.captain = isCap;
        this.points = pointValue;                         // Store PointValue
        if(isCap == 1){
            this.moveSpeed = game.settings.spaceshipSpeed+3;
        }
        else{
            this.moveSpeed = game.settings.spaceshipSpeed;    // Movement in Pixels per Frame
        }
    }

    update() {
        //Moves Knight left
        this.x -= this.moveSpeed;
        //If knight goes off screen 
        //Wrap Around From left edge to right edge
        if(this.x <= 0 - this.width){
            this.x = game.config.width;
        }
    }

    reset() {
        this.x = game.config.width;
    }
}