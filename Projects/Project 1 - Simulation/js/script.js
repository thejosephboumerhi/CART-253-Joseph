/***********************************************************************
Exercise 02 - Dodge-Em
Joseph Boumerhi

!Glide! past the skull
!Idea through serendipity, glide towards the obstacles, but not into it,
will be an idea for my project!

************************************************************************/

let skull = {
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

let user = {
  x: 250,
  y: 250,
  vx: 0,
  vy: 0,
  ax: 0,
  ay: 0,
  Accel: 1,
  MaxV: 10,
  friction:
  size: 100,
  fill: 255
};
//Allows for various states to be used, starting with title
let state = `title`;

//Background effect limit, bigger and lesser particles in BG
let numClouds = 50;

//Allows my images to be loaded in
let userimg;
let cursorimg;
let enemyimg;

function preload() {
userimg = loadImage('assets/images/Blueuser.png');
cursorimg = loadImage('assets/images/Usercursor.png');
enemyimg = loadImage('assets/images/SkullEnemy.gif');
}

//Starts simulation
function setup() {

createCanvas (windowWidth, windowHeight);
skull.y = random (0, height);
skull.vx = skull.speed;
noCursor();
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
//Display visual effects (static)
for (let i = 0; i < numStatic; i++) {
  let x = random(0,width);
  let y = random(0,height);
  strokeWeight(15);
  stroke(155);
  point(x,y);
  }
}

//Skull movement
  skull.x = skull.x + skull.vx;
  skull.y = skull.y + skull.vy;

//Skull reset location
if (skull.x > width) {
  skull.x = 0;
  skull.y = random (0, height);

}

//The movement for the User, uses WASD.
function movementInput() {

//Movement for Robber
if (keyIsDown(65)) {
user.ax = -user.accel;
}
else if (keyIsDown(68)) {
user.ax = user.accel;
}
else {
user.ax = 0;
}
if (keyIsDown(87)) {
user.ay = -user.accel;
}
else if (keyIsDown(83)) {
user.ay = user.accel;
}
else {
user.ay = 0;
}

//Pippin proposed the variable "friction", which allows for smooth WASD movement
user.vx = user.vx * user.friction;
user.vy = user.vy * user.friction;

user.x = user.x + user.vx;
user.y = user.y + user.vy;

user.vx = user.ax + user.vx;
user.vx = constrain(user.vx,-user.MaxV,user.MaxV);
user.vy = user.ay + user.vy;
user.vy = constrain(user.vy,-user.MaxV,user.MaxV);
}

//Checking for Skull
let d = dist(user.x, user.y, skull.x, skull.y);
if (d < skull.size/2 + user.size/2) {
  noLoop();
}

//Display Skull
//Checking for distance between Skull and User, for size enhancement
let proximity = int(dist(user.x, user.y, skull.x, skull.y));
let proximityInv = map(proximity, skull.x, windowWidth, skull.y, windowHeight);
proximityInv = constrain(proximityInv, 0, 600);

//When far, grow. When closer, shrink (+ it's going an idea for the project).
if (proximityInv > 300) {
skull.size = 500;
} else (proximityInv < 300)
{
skull.size = 100;
}
image (enemyimg, skull.x, skull.y, proximityInv, proximityInv);

//Display User and custom cursor
  imageMode(CENTER);
  image(userimg,user.x,user.y);
  imageMode(CENTER);
  image(cursorimg,(mouseX),(mouseY + 50));

}
