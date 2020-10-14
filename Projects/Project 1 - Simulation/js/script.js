/***********************************************************************
Exercise 02 - Dodge-Em
Joseph Boumerhi

!Glide! past the EnemyShip
!Idea through serendipity, glide towards the obstacles, but not into it,
will be an idea for my project!

************************************************************************/

let enemyShip = {
  x: 0,
  y: 0,
  size: 100,
  vx: 0,
  vy: 0,
  speed: 1,
  tx: 0,
  ty: 10,
  pursuit: 0,
  flee: 0
};

let player = {
  x: 250,
  y: 250,
  vx: 0,
  vy: 0,
  ax: 0,
  ay: 0,
  accel: 2,
  MaxV: 12,
  friction: 0.90,
  size: 100
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
enemyShip.x = random (0, width);
enemyShip.vy = enemyShip.speed;
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
for (let c = 0; c < numClouds; c++) {
  let x = random(0,width);
  let y = random(0,height);
  push();
  strokeWeight(50);
  stroke(155);
  point(x,y);
  pop();
  }
}

function ai_Enemy() {
//Enemy movement, slapped together the automated movement page
  let perlinX = (enemyShip.tx);
  let perlinY = (enemyShip.ty);

  enemyShip.tx = enemyShip.tx + 0.025;
  enemyShip.ty = enemyShip.ty + 0.025;

  enemyShip.vx = map(perlinX,0,1,-enemyShip.speed,enemyShip.speed);
  enemyShip.vy = map(perlinY,0,1,-enemyShip.speed,enemyShip.speed);

  enemyShip.x = enemyShip.x + enemyShip.vx;
  enemyShip.y = enemyShip.y + enemyShip.vy;

//Enemy reset location
if (enemyShip.y > height) {
  enemyShip.y = 0;
  enemyShip.x = random (0, width);
  }
}

//The movement for the User, uses WASD.
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

function enemyCrash() {
//Checking for Skull
let d = dist(player.x, player.y, enemyShip.x, enemyShip.y);
if (d < enemyShip.size/2 + player.size/2) {
  state = `death`;
  }
}

function enemyEffect() {
image (enemyimg, enemyShip.x, enemyShip.y);
}

//Display PNG for character, and custom cursor
function charDisplay() {
  imageMode(CENTER);
  image(playerimg,player.x,player.y);
  //imageMode(CENTER);
  //image(cursorimg,(mouseX),(mouseY + 50));
}

function mousePressed () {
  if (state === `title`) {
    state = `simulation`;
  }
}
