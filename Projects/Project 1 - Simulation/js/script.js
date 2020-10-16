/***********************************************************************
Project 01 - Simulation
Joseph Boumerhi

Evade the Enemy Ships
Uses WASD for movement
On "Defeat!", press Spacebar to reset the game.
************************************************************************/
"use strict";

//Player values
let player = {
  x: 500,
  y: 500,
  vx: 0,
  vy: 0,
  ax: 0,
  ay: 0,
  accel: 2,
  MaxV: 16,
  friction: 0.9,
  size: 75,
};

//Allows for various states to be used, starting with title
let state = `title`;

//Background effect limit, bigger and lesser particles in BG
let numClouds = 50;

//Allows my assets to be loaded in
//Font for dafont.com (https://www.dafont.com/gameplay.font)
let font1;
//Custom pixel art using Piskel, online pixel editor
let playerimg;
let cursorimg;
let enemyimg;

//For Array and enemyShips spawns
let enemyFleet = [];
let fleetLimit = 1;
let resetsDone = 0;

function preload() {
  font1 = loadFont("assets/fonts/Gameplay.ttf");
  playerimg = loadImage("assets/images/Ship.png");
  cursorimg = loadImage("assets/images/Usercursor.png");
  enemyimg = loadImage("assets/images/EnemyShip.png");
}

//Starts simulation
function setup() {
  createCanvas(windowWidth, windowHeight);
}

//Begins game
function draw() {
  background(0, 0, 255);

  if (state === `title`) {
    title();
  } else if (state === `simulation`) {
    simulation();
  } else if (state === `death`) {
    death();
    resetGame();
  }
}

//Runs functions
function simulation() {
  movementInput();
  charDisplay();
  visualFX();
  for (let e = 0; e < enemyFleet.length; e++) {
    enemyEffect(enemyFleet[e]);
    ai_Enemy(enemyFleet[e]);
    enemyDisplay(enemyFleet[e]);
    enemyCrash(enemyFleet[e]);
  }
  borderBlock();
}

function title() {
  push();
  textFont(font1);
  textSize(50);
  fill(200, 200, 100);
  stroke(0);
  strokeWeight(5);
  textAlign(CENTER, CENTER);
  text(`Aerial-Luster`, width / 2, height / 2);
  pop();
}

function death() {
  push();
  textFont(font1);
  textSize(50);
  fill(255, 0, 0);
  stroke(0);
  strokeWeight(5);
  textAlign(CENTER, CENTER);
  text(`Defeat!`, width / 2, height / 2);
  pop();
}

function startArray() {
  for (let e = 0; e < fleetLimit; e++) {
    let enemyShip = createEnemyShip();
    enemyFleet.push(enemyShip);
  }

  for (let e = 1; e < enemyFleet.length; e++) {
    ai_Enemy(enemyFleet[e]);
    enemyDisplay(enemyFleet[e]);
  }
}

function createEnemyShip() {
  let enemyShip = {
    x: random(0, width),
    y: 0,
    vx: 0,
    vy: 0,
    speed: random(4, 6),
    tx: 0,
    ty: 0,
    size: random(50, 200),
  };
  return enemyShip;
}

function visualFX() {
  //Display visual effects (clouds)
  for (let c = 0; c < numClouds; c++) {
    let x = random(0, width);
    let y = random(0, height);
    push();
    strokeWeight(50);
    stroke(155);
    point(x, y);
    pop();
  }
}

function ai_Enemy(enemyShip) {
  //Enemy movement, pasted and slapped in from the automated movement page,
  //i'll explain in my words, so it's like I can understand what the lines
  //do too, in my words (changed the "d"s to "p"s, cause I like P for Proximity)

  //Whenever player is out of line of sight of enemy, the AI will steer
  //towards the player.
  //Calculates how far left and right
  let px = enemyShip.x - player.x;

  //Calculates how far up and down
  let py = enemyShip.y - player.y;

  //Detects X positions of the player
  if (px < 0) {
    // So move right, if the player px is negative
    enemyShip.vx = enemyShip.speed;
  } else if (px > 0) {
    // So move left, if the player px is postive
    enemyShip.vx = -enemyShip.speed;
  }

  //Detects a Y position of the player
  if (py < 0) {
    enemyShip.vy = enemyShip.speed;
    //removed the -enemyShip.speed segment else-if, so it doesn't backpedal
    //towards the player, only moves forward now, essential
    //for the game mechanics to work properly.
  }

  enemyShip.x = enemyShip.x + enemyShip.vx;
  enemyShip.y = enemyShip.y + enemyShip.vy;

  //Enemy reset location
  if (enemyShip.y > height) {
    enemyShip.y = 0;
    enemyShip.x = random(0, width);
  }
}

//The movement for the player, uses WASD.
function movementInput() {
  //Movement for Player
  //Accel allows for fluid movement, instead of stiffness without it.
  if (keyIsDown(65)) {
    player.ax = -player.accel;
  } else if (keyIsDown(68)) {
    player.ax = player.accel;
  } else {
    player.ax = 0;
  }
  if (keyIsDown(87)) {
    player.ay = -player.accel;
  } else if (keyIsDown(83)) {
    player.ay = player.accel;
  } else {
    player.ay = 0;
  }

  //Pippin proposed the variable "friction" from previous assignment,
  //which allows for smoother WASD movement.
  player.vx = player.vx * player.friction;
  player.vy = player.vy * player.friction;

  player.x = player.x + player.vx;
  player.y = player.y + player.vy;

  player.vx = player.ax + player.vx;
  player.vx = constrain(player.vx, -player.MaxV, player.MaxV);
  player.vy = player.ay + player.vy;
  player.vy = constrain(player.vy, -player.MaxV, player.MaxV);
}

//Simple collision detection
function enemyCrash(enemyShip) {
  //Checking for EnemyShip
  let d = dist(player.x, player.y, enemyShip.x, enemyShip.y);
  if (d < enemyShip.size / 2 + player.size / 2) {
    state = `death`;
  }
}

//For each time the enemyShip touches the bottom, it'll add to values,
//and once those values are fulfilled, add another enemy.
//**resetsDone adjusts to # of enemyShips present,
//so no crazy fast spawning, it's proportionate to # of enemyShips.
function enemyEffect(enemyShip) {
  if (enemyShip.y > height - 10) {
    resetsDone++;
  }
  if (resetsDone > 3 * enemyFleet.length) {
    resetsDone = 0;
    enemyFleet.push(createEnemyShip());
  }
}

//Simply constricts the player in the canvas (can't just leave canvas)
function borderBlock() {
  player.x = constrain(player.x, 0, width);
  player.y = constrain(player.y, 0, height);
}

//Display PNG for player
function charDisplay() {
  imageMode(CENTER);
  image(playerimg, player.x, player.y, player.size, player.size);
}

//Display PNG for enemies
function enemyDisplay(enemyShip) {
  imageMode(CENTER);
  image(enemyimg, enemyShip.x, enemyShip.y, enemyShip.size, enemyShip.size);
}

//Title into game, while also starting up the array
function mousePressed() {
  if (state === `title`) {
    startArray();
    state = `simulation`;
  }
}

//Acts as a soft reset for the game
function resetGame() {
  //Has to be "death" state to be able to reset
  //Resets everything
  if (state === `death`) {
    player.x = width / 2;
    player.y = height / 2;
    enemyFleet = [];
    fleetLimit = 1;
    resetsDone = 0;
  }
  if (keyIsDown(32)) {
    state = `title`;
  }
}
