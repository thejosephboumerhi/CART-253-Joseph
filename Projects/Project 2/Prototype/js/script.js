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

//Projectile array, semi-auto firing
let projectileOut = [];
let projectileShot = 1;

//Projectile array, semi-auto firing
//let enemyProjectileOut = [];
//let enemyProjectileShot = 1;

//Images for the game, made by using Piskel
let playerImg;
let playerRunImg;
let cursorImg;
let playerArmImg;
let playerShotImg;
let backgroundImg;
let titleImg;
//let meleeEnemyImg;
//let rangedEnemyImg;
let enemyShotImg;

//Preloads assets
function preload() {
  playerImg = loadImage("assets/images/PlayerCharacter.png");
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
    enemyGroup.push(enemy);
  }
}

//Starts with title, then gameplay, finally GameOver
function draw() {
  background(175, 150, 150);

  //Different states, and backgrounds running first to be in back layer
  if (state === `title`) {
    background(0);
    title();
    //} else if (state ===`howToPlay`){
    background();
    //htp();
    //}
  } else if (state === `inGame`) {
    background(backgroundImg);
    gameplay();
  } else if (state === `endGame`) {
    background(0);
    gameOver();
  }
}

//The usual text for the states
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

//function menuButtons() {}

//function htp(){
//push();
//textSize(60);
//fill(75, 0, 130);
//stroke(0);
//strokeWeight(5);
//textAlign(CENTER, CENTER);
//text(instructions, width / 2, height / 2);
//pop();
//}

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
      waveSpawn(x, y);
    }

    //Lets each projectile have its properties
    for (let j = 0; j < projectileOut.length; j++) {
      let projectile = projectileOut[j];
      projectile.projectile(enemy);
      projectile.collision(enemy);
    }
  }
}

//Temporary spawn system, progress showing that "a spawn" is working, and will
//be further updated
function waveSpawn(x, y) {
  if (numDead == enemyGroup.length) {
    let x = random(0, width);
    let y = random(0, height);
    let enemy = new Enemy(x, y);
    enemyGroup.push(enemy);
  }
}

//Mouse presses for menu, and left click to fire, dependant on state
//Add buttons here with if-else statements?
function mousePressed() {
  if (state === `title`) {
    state = `inGame`;
  } else if (state === `inGame`) {
    player.weaponAim();
  }
}
