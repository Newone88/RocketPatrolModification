/*

Rocket Patrol Modification - Medieval Mayhem
Omar Alkharji

Mechanics Added 
-Implement a simultaneous two-player mode. (30)
     - Versus styled multiplayer, where each player gets own score and see who has highter in the end
- Redesign the game's artwork, UI, and sound to change its theme/aesthetic other than sci-fi (60)
- Implement a new timing/scoring mechanism that adds time to the clock for successful hits (20)
     - Knights add 1 second, Captains add 3 seconds
- Create a new spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (20)
     - The Captain is on a horse in the back who moves faster than knights and scores for 50. 
     - He also adds 3 extra seconds 
- Display the time remaining (in seconds) on the screen (10)
- Implement the 'FIRE' UI text from the original game (5)

Credits and Sources

- Timer Display and Timer Addition are code from the discord code tab (4/19/2022 8:33PM), with credit going to 
     - Denae (Section 1, They didn't list their last name)
     - William Morales (Section 2)
- Simultanous Multiplayer inspired from slides and OH sessions with Jim
- SFX from Freesound.com
- Art created in Pixelart, Animations in Piskel
- Background Music from Soundimage.org by Eric Matyas
      - THE KEY TO THE KINGDOM (Menu Theme)
      - Forward Assault (Battle Theme)

*/

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


