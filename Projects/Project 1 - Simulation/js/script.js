/***********************************************************
Project 1 - Simulation
Joseph Boumerhi

, used E3 as template
***********************************************************/
"use strict";

let ai_enemy = {
  x: 0,
  y: 250,
  size: 100,
  vx: 0,
  vy: 0,
  ax: 0,
  ay: 0,
  accel: 0.45,
  MaxV: 5,
  speed: 5
};

let player = {
  x: 0,
  y: 250,
  size: 100,
  vx: 0,
  vy: 0,
  ax: 0,
  ay: 0,
  accel: 0.45,
  MaxV: 5,
  speed: 5,
  friction: 0.89
};

//Could be title, game_mode, and the endings (good and bad)
//Remember to set it as the first state of the program as a title or menu
let state = `title`;

//Setups
function setup() {
createCanvas(1000,600);
setupCircles();
}

//Setups police, player at center
function setupCircles() {
ai_enemy.x = width/3;
player.x = 2 * width/3;

}

//Calls the game_mode in draw(), and the various states (start, end)
function draw() {
  background(0);

if (state === `title`) {
  title();
}
else if (state === `game_mode`) {
  game_mode();
}
else if (state === `death`) {
  death();
  }
}


function title () {
  push();
  textSize(50);
  fill(200,200,100);
  textAlign(CENTER,CENTER);
  text(`Eldrich Arisen`, width/2, height/2);
  pop();
}

//Simulation is called, drawn and manages other functions
function game_mode () {
  movementInput();
  aiming();
  //criticalState();
  ai_enemy();
  checkBorders();
  overlap();
  display();
}

function capture() {
  push();
  textSize(50);
  fill(150,150,255);
  textAlign(CENTER,CENTER);
  text(`Death!`, width/2, height/2);
  pop();
}

function ai_enemy() {

  let change = random();
  if (change < 0.1) {
    ai_enemy.vx = random(-ai_enemy.speed,ai_enemy.speed);
    ai_enemy.vy = random(-ai_enemy.speed,ai_enemy.speed);
  }

  ai_enemy.x = ai_enemy.x + ai_enemy.vx;
  ai_enemy.y = ai_enemy.y + ai_enemy.vy;

  ai_enemy.vx = ai_enemy.ax + ai_enemy.vx;
  ai_enemy.vx = constrain(ai_enemy.vx,-ai_enemy.MaxV,ai_enemy.MaxV);
  ai_enemy.vy = ai_enemy.ay + ai_enemy.vy;
  ai_enemy.vy = constrain(ai_enemy.vy,-ai_enemy.MaxV,ai_enemy.MaxV);
}

//The movement for the player, uses WASD.
function movementInput() {

//Movement for Player
if (keyIsDown(65)) {
  player.ax = -player.accel;
}
else if (keyIsDown(68)) {
  player.ax = player.accel;
}
else {
  player.ax = 0;
}
if (keyIsDown(87)) {
  player.ay = -player.accel;
}
else if (keyIsDown(83)) {
  player.ay = player.accel;
}
else {
  player.ay = 0;
}

//Pippin proposed the variable "friction", which allows for smooth WASD movement
player.vx = player.vx * player.friction;
player.vy = player.vy * player.friction;

player.x = player.x + player.vx;
player.y = player.y + player.vy;

player.vx = player.ax + player.vx;
player.vx = constrain(player.vx,-player.MaxV,player.MaxV);
player.vy = player.ay + player.vy;
player.vy = constrain(player.vy,-player.MaxV,player.MaxV);
}


//Penalizes the player's movement for having critical health
function criticalState() {
}

//Check whether either circle is off-screen
function checkBorders() {
if  {

  }
}

function isOffScreen(player) {
  if (player.x < 0 || player.x > width || player.y < 0 || player.y > height) {
    return true;
  }
    else {
    return false;
  }
}

//Check if circles end up overlapping
//function overlapdamage() {
  //let d = dist(ai_enemy.x, ai_enemy.y, player.x, player.y);
//  if (d < ai_enemy.size/2 + player.size/2) {
      }
//}

//Shows visuals for player units
function display() {

//Enemy
fill(0,0,255);
ellipse(ai_enemy.x, ai_enemy.y, ai_enemy.size);

//Player
fill(255,0,0);
sqaure(player.x, player.y, player.size);
rotate(mouseX);
}

//Changes the title state to the game_mode state
function mousePressed() {
  if (state === `title`) {
    state = `game_mode`;
  }
}
}
