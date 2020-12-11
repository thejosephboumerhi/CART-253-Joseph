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

//Instructions for htp() function
let instructions = `Press [WASD] to move around

Press [Spacebar] to dash

Use Mouse to look around, and left click to shoot`;

//Enemy array, two spawn
let enemyGroup = [];
let enemyNum = 2;
//For spawning
let numDead = 0;

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
  playerImg = loadImage("assets/images/PlayerCharacterStanding.png");
  playerRunImg = loadImage("assets/images/PlayerCharacterRunning.gif");
  playerArmImg = loadImage("assets/images/WeaponArm.png");
  playerShotImg = loadImage("assets/images/UserBullet.gif");
  cursorImg = loadImage("assets/images/CursorV2.png");
  titleImg = loadImage("assets/images/Neo-Tenebris.png");
  backgroundImg = loadImage("assets/images/Arena.gif");
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
    let enemy = new Enemy(x, y);
    let rangedEnemy = new RangedEnemy(x, y);
    enemyGroup.push(enemy);
    enemyGroup.push(rangedEnemy);
  }

  button = new Buttons();
  play = new PlayButton();
  howToPlay = new HowToPlayButton();
  backToMenu = new BackToTitleButton();
}

//Starts with title, then gameplay, finally GameOver
function draw() {
  background(175, 150, 150);

  //Different states, and backgrounds running first to be in back layer
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
//
function title() {
  push();
  imageMode(LEFT, CENTER);
  image(titleImg, 0, 0);
  textSize(60);
  fill(75, 0, 130);
  stroke(0);
  strokeWeight(5);
  textAlign(CENTER, CENTER);
  text(`Neo-Tenebris`, width / 2, height / 2);
  pop();
}

//
function htp() {
  push();
  textSize(30);
  fill(75, 0, 130);
  stroke(0);
  strokeWeight(5);
  textAlign(CENTER, CENTER);
  text(instructions, width / 2, height / 2);
  pop();
}

//Displays the GameOver text
function gameOver() {
  push();
  textSize(60);
  fill(225, 25, 25);
  stroke(0);
  strokeWeight(5);
  textAlign(CENTER, CENTER);
  text(`You Died`, width / 2, height / 2);
  pop();
}

//Game starts, player could now play, enemies spawn, shots could be fired
function gameplay() {
  player.movementInput();
  player.health();
  player.display();
  player.cursor();
  player.border();
  waveSpawn();

  //Lets each enemy have their properties, and at least an ability of continuing
  //to spawn
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

    //Lets each projectile have its properties
    for (let j = projectileOut.length - 1; j >= 0; j--) {
      let projectile = projectileOut[j];
      projectile.projectile(enemy);
      projectile.collision(enemy);
      if (projectile.active === false) {
        projectileOut.splice(j, 1);
      }
    }

    for (let e = enemyProjectileOut.length - 1; e >= 0; e--) {
      let enemyProjectile = enemyProjectileOut[j];
      enemyProjectile.projectile(player);
      enemyProjectile.collision(player);
      if (enemyProjectile.active === false) {
        enemyProjectileOut.splice(j, 1);
      }
    }
  }
}
//}

//Temporary spawn system, progress showing that "a spawn" is working, and will
//be further updated
function waveSpawn() {
  for (let i = enemyGroup.length - 1; i > 0; i--) {
    let enemy = enemyGroup[i];
    if (enemy.active === false) {
      enemyGroup.splice(i, 1);

      let x = random(0, width);
      let y = random(0, height);
      let enemy = new Enemy(x, y);
      let rangedEnemy = new RangedEnemy(x, y);
      enemyGroup.push(enemy);
      enemyGroup.push(rangedEnemy);
    }
    //Splice is necessary, since the game seemed to start slowing after "killing"
    //a couple of enemies using the temporary spawn system.
  }
}

//Mouse presses for menu buttons, and to fire in game state, dependant on states
function mousePressed() {
  //Allows for the buttons to be used, alongside the state they change to when
  //pressed on.

  if (
    mouseX > play.x &&
    mouseX < play.x + play.w &&
    mouseY > play.y &&
    mouseY < play.y + play.h &&
    state === `title`
  ) {
    state = `inGame`;
    console.log("PLAYING!");
  }

  if (
    mouseX > howToPlay.x &&
    mouseX < howToPlay.x + howToPlay.w &&
    mouseY > howToPlay.y &&
    mouseY < howToPlay.y + howToPlay.h &&
    state === `title`
  ) {
    state = `howToPlay`;
    console.log("Learning!");
  }
  if (
    mouseX > backToMenu.x &&
    mouseX < backToMenu.x + backToMenu.w &&
    mouseY > backToMenu.y &&
    mouseY < backToMenu.y + backToMenu.h &&
    state === `howToPlay`
  ) {
    state = `title`;
    console.log("Back to menu!");
  } else if (state === `inGame`) {
    player.weaponAim();
  }
}
