/**************************************************
Project 2: Prototype
Joseph Boumerhi

Prototyping of a TDP shooter
**************************************************/
`use strict`;
let state = `title`;

let player;

//Enemy array, two spawn
let enemyGroup = [];
let enemyNum = 2;
//For spawning
let numDead = 0;

//Projectile array, semi-auto firing
let projectileOut = [];
let projectileShot = 1;

let playerImg;
let cursorImg;
let backgroundImg;

//Preloads assets
function preload() {
  playerImg = loadImage("assets/images/PlayerCharacter.png");
  cursorImg = loadImage("assets/images/CursorV2.png");
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

  if (state === `title`) {
    title();
    //} else if (state ===`howToPlay`){
    //htp();
    //}
  } else if (state === `inGame`) {
    gameplay();
  } else if (state === `endGame`) {
    gameOver();
  }
}

//The usual text for the states
function title() {
  push();
  textSize(60);
  fill(75, 0, 130);
  stroke(0);
  strokeWeight(5);
  textAlign(CENTER, CENTER);
  text(`Neo-Tenebris`, width / 2, height / 2);
  pop();
}

//function htp(){}, will be a tab in the main menu(?) to show instrucs.

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

//Begins game, afterward, you click to shoot
function mousePressed() {
  if (state === `title`) {
    state = `inGame`;
  } else if (state === `inGame`) {
    player.weaponAim();
  }
}
