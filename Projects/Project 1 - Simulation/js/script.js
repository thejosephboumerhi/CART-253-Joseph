/***********************************************************************
Exercise 02 - Dodge-Em
Joseph Boumerhi

!Glide! past the EnemyShip
!Idea through serendipity, glide towards the obstacles, but not into it,
will be an idea for my project!

************************************************************************/

let enemyShip = {
  x: 0,
  y: 250,
  size: 400,
  vx: 0,
  vy: 0,
  speed: 5,
  fill: {
    r: 255,
    g: 0,
    b: 0
  }
};

let player = {
  x: 250,
  y: 250,
  vx: 0,
  vy: 0,
  ax: 0,
  ay: 0,
  Accel: 1,
  MaxV: 10,
  friction: 0.80,
  size: 100,
  fill: 255
};

//Allows for various states to be used, starting with title
let state = `title`;

//Background effect limit, bigger and lesser particles in BG
let numClouds = 50;

//Allows my images to be loaded in
let playerimg;
let cursorimg;
let enemyimg;

function preload() {
playerimg = loadImage('assets/images/Ship.png');
cursorimg = loadImage('assets/images/Usercursor.png');
enemyimg = loadImage('assets/images/EnemyShip.png');
}

//Starts simulation
function setup() {

createCanvas (windowWidth, windowHeight);
enemyShip.y = random (0, height);
enemyShip.vx = enemyShip.speed;
}

//Skull and User drawn
function draw() {
  background(0,0,255);

  if (state === `title`) {
  title();
}
else if (state === `simulation`) {
  simulation();
}
else if (state === `death`) {
  death();
}


function simulation() {
movementInput();
charDisplay();
ai_Enemy();
visualFX();
enemyEffect();
enemyCrash();
mousePressed();
}

function title () {
  push();
  textSize(50);
  fill(200,200,100);
  textAlign(CENTER,CENTER);
  text(`Aerial-Luster`, width/2, height/2);
  pop();
}

function death() {
  push();
  textSize(50);
  fill(150,150,255);
  textAlign(CENTER,CENTER);
  text(`Defeat!`, width/2, height/2);
  pop();
}

function visualFX () {
//Display visual effects (clouds)
for (let i = 0; i < numClouds; i++) {
  let x = random(0,width);
  let y = random(0,height);
  strokeWeight(15);
  stroke(155);
  point(x,y);
  }
}

function ai_Enemy() {
//Skull movement
  enemyShip.x = enemyShip.x + enemyShip.vx;
  enemyShip.y = enemyShip.y + enemyShip.vy;

//Skull reset location
if (enemyShip.x > width) {
  enemyShip.x = 0;
  enemyShip.y = random (0, height);
  }
}

//The movement for the User, uses WASD.
function movementInput() {

//Movement for Robber
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

function enemyCrash() {
//Checking for Skull
let d = dist(player.x, player.y, enemyShip.x, enemyShip.y);
if (d < enemyShip.size/2 + player.size/2) {
  state = `death`;
  }
}

function enemyEffect() {
//Checking for distance between Skull and User, for size enhancement
let proximity = int(dist(player.x, player.y, enemyShip.x, enemyShip.y));
let proximityInv = map(proximity, enemyShip.x, windowWidth, enemyShip.y, windowHeight);
proximityInv = constrain(proximityInv, 0, 600);

//When far, grow. When closer, shrink (+ it's going an idea for the project).
if (proximityInv > 300) {
enemyShip.size = 500;
} else (proximityInv < 300)
{
enemyShip.size = 100;
}
image (enemyimg, enemyShip.x, enemyShip.y, proximityInv, proximityInv);
  }
}
//Display PNG for character, and custom cursor
function charDisplay() {
  imageMode(CENTER);
  image(playerimg,player.x,player.y);
  imageMode(CENTER);
  //image(cursorimg,(mouseX),(mouseY + 50));
}

function mousePressed () {
  if (state === `title`) {
    state = `simulation`;
  }
}
