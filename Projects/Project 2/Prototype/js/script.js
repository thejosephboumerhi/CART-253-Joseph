/**************************************************
Project 2: Prototype --- Neo-Tenebris
Joseph Boumerhi

Prototyping of a TDP shooter
**************************************************/
`use strict`;
//Starting state, the main menu
let state = `title`;

//Player Variable
let player;

//Font Variable
let startEndFont;
let buttonFont;
let howToPlayFont;

//Instructions for htp() function
let instructions = `Press [WASD] to move around

Press [Spacebar] to dash

Use Mouse to look around, and left click to shoot`;

//Enemy array, two spawn
let enemyGroup = [];
let enemyNum = 2;
//For spawning

//Player projectile array, semi-auto firing
let projectileOut = [];
let projectileShot = 1;

//Enemy projectile array, slow firing
let enemyProjectileOut = [];
let enemyProjectileShot = 1;

//Images for the game, made by me using Piskel, an online pixel editor
let playerImg;
let playerRunImg;
let cursorImg;
let playerArmImg;
let playerShotImg;
let backgroundImg;
let titleImg;
let meleeEnemyImg;
let rangedEnemyImg;
let enemyShotImg;

//Preloads assets
function preload() {
  //All fonts from daFont
  //https://www.dafont.com/vanishing.font
  startEndFont = loadFont("assets/fonts/Vanishing.ttf");
  //https://www.dafont.com/karmatic-arcade.font
  buttonFont = loadFont("assets/fonts/ka1.ttf");
  //https://www.dafont.com/vcr-osd-mono.font
  howToPlayFont = loadFont("assets/fonts/VCR_OSD_MONO_1.001.ttf");

  //Pixel Sprites
  //For the player
  playerImg = loadImage("assets/images/PlayerCharacterStanding.png");
  playerRunImg = loadImage("assets/images/PlayerCharacterRunning.gif");
  playerArmImg = loadImage("assets/images/WeaponArm.png");
  playerShotImg = loadImage("assets/images/UserBullet.gif");
  cursorImg = loadImage("assets/images/CursorV2.png");
  //For aesthetic
  titleImg = loadImage("assets/images/Neo-Tenebris.png");
  backgroundImg = loadImage("assets/images/Arena.gif");
  //For the enemy/enemies
  meleeEnemyImg = loadImage("assets/images/MeleeEnemy.gif");
  rangedEnemyImg = loadImage("assets/images/RangedEnemy.gif");
  enemyShotImg = loadImage("assets/images/EnemyBullet.gif");
}

//One-Time Setup
function setup() {
  createCanvas(windowWidth, windowHeight);
  player = new Player();
  let i = 0;
  for (i = 0; i < enemyNum; i++) {
    let x = random(0, width);
    let y = random(0, height);
    let enemy = new HybridEnemy(x, y);
    enemyGroup.push(enemy);
  }
  //Setups the buttons once, to save resources (Dana I think told me this)
  button = new Buttons();
  play = new PlayButton();
  howToPlay = new HowToPlayButton();
  backToMenu = new BackToTitleButton();
}

//Starts with title, then gameplay, finally GameOver
function draw() {
  background(175, 150, 150);

  //Different states, and backgrounds running first to be in back layer,
  //otherwise it would overlap and you wouldn't see anything
  if (state === `title`) {
    background(0);
    cursor();
    title();
    play.displayButton();
    howToPlay.displayButton();
  } else if (state === `howToPlay`) {
    background(0);
    htp();
    backToMenu.displayButton();
  } else if (state === `inGame`) {
    background(backgroundImg);
    gameplay();
  } else if (state === `endGame`) {
    background(0);
    gameOver();
  }
}

//The usual text for the states
//Displays the title name, and a icon of the OC (the player character) for this
//game, the titleImg was also done for a graphic design, and that teacher really
//like the look of it
function title() {
  push();
  imageMode(LEFT, CENTER);
  image(titleImg, 0, 0);
  textSize(40);
  textFont(startEndFont);
  fill(200, 0, 0);
  stroke(0);
  strokeWeight(5);
  textAlign(CENTER, CENTER);
  text(`Neo/Tenebris`, width / 2, height / 2);
  pop();
}

//Display the instructions on how to play
function htp() {
  push();
  textSize(30);
  textFont(howToPlayFont);
  fill(200);
  stroke(0);
  strokeWeight(5);
  textAlign(CENTER, CENTER);
  text(instructions, width / 2, height / 2);
  pop();
}

//Displays the GameOver text
function gameOver() {
  push();
  textSize(40);
  textFont(startEndFont);
  fill(225, 25, 25);
  stroke(0);
  strokeWeight(5);
  textAlign(CENTER, CENTER);
  text(`You Died`, width / 2, height / 2);
  pop();
}

//Game starts in "inGame" state, player could now play, enemy spawns over
//and attack.
function gameplay() {
  player.movementInput();
  player.health();
  player.display();
  player.cursor();
  player.border();
  waveSpawn();

  //Lets the spawned enemy have their properties, and at least an ability of
  //continuing to spawn
  for (let i = 0; i < enemyGroup.length; i++) {
    let enemy = enemyGroup[i];
    if (enemy.active) {
      let x = random(0, width);
      let y = random(0, height);
      enemy.display();
      enemy.chase();
      enemy.attackOverlap();
      enemy.enemyTargeting();
    }

    //Lets the projectile have its properties when it's being fired
    for (let j = projectileOut.length - 1; j >= 0; j--) {
      let projectile = projectileOut[j];
      projectile.projectile(enemy);
      projectile.collision(enemy);
      if (projectile.active === false) {
        projectileOut.splice(j, 1);
      }
    }

    for (let e = enemyProjectileOut.length - 1; e >= 0; e--) {
      let enemyProjectile = enemyProjectileOut[e];
      enemyProjectile.projectile(player);
      enemyProjectile.collision(player);
      if (enemyProjectile.active === false) {
        enemyProjectileOut.splice(e, 1);
      }
    }
  }
}

//Spawn system
function waveSpawn() {
  for (let i = enemyGroup.length - 1; i > 0; i--) {
    let enemy = enemyGroup[i];
    if (enemy.active === false) {
      enemyGroup.splice(i, 1);
      let x = random(0, width);
      let y = random(0, height);
      let enemy = new HybridEnemy(x, y);
      enemyGroup.push(enemy);
    }
  }
}

//Mouse presses for menu buttons, and to fire in game state, dependant on states
function mousePressed() {
  //Allows for the buttons to be used, alongside the state they change to when
  //pressed on.

  //The play button to start the game
  if (
    mouseX > play.x &&
    mouseX < play.x + play.w &&
    mouseY > play.y &&
    mouseY < play.y + play.h &&
    state === `title`
  ) {
    state = `inGame`;
  }

  //The button to look at the instructions
  if (
    mouseX > howToPlay.x &&
    mouseX < howToPlay.x + howToPlay.w &&
    mouseY > howToPlay.y &&
    mouseY < howToPlay.y + howToPlay.h &&
    state === `title`
  ) {
    state = `howToPlay`;
  }

  //A "back" button, so you can move back to the menu and play
  if (
    mouseX > backToMenu.x &&
    mouseX < backToMenu.x + backToMenu.w &&
    mouseY > backToMenu.y &&
    mouseY < backToMenu.y + backToMenu.h &&
    state === `howToPlay`
  ) {
    state = `title`;
  } else if (state === `inGame`) {
    //Allows the player to shoot when it is the "inGame" state
    player.weaponAim();
  }
}
