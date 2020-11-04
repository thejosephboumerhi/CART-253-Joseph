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

//Projectile array, semi-auto firing
let projectileOut = [];
let projectileShot = 1;

let playerImg;
let cursorImg;

//Preloads assets
function preload() {
  playerImg = loadImage("assets/images/StockPlayer.png");
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
  fill(50, 200, 50);
  stroke(0);
  strokeWeight(5);
  textAlign(CENTER, CENTER);
  text(`StockholderTitle`, width / 2, height / 2);
  pop();
}

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
  player.display();
  player.cursor();
  player.border();

  for (let i = 0; i < enemyGroup.length; i++) {
    let enemy = enemyGroup[i];
    if (enemy.active) {
      enemy.display();
      enemy.chase();
      enemy.attackOverlap();
    }
    for (let j = 0; j < projectileOut.length; j++) {
      let projectile = projectileOut[j];
      projectile.projectile();
      projectile.collision(enemy);
    }
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
