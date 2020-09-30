/**************************************************
Exercise 02 - Dodge-Em
Joseph Boumerhi

Dodge the skull
**************************************************/

let skull = {
  x: 0,
  y: 250,
  size: 100,
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
  size: 100,
  fill: 255
};


let numStatic = 750;
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
  background(0);

//Display visual effects (static)
for (let i = 0; i < numStatic; i++) {
  let x = random(0,width);
  let y = random(0,height);
  strokeWeight(5);
  stroke(217, 0, 255);
  point(x,y);
}

//Skull movement
  skull.x = skull.x + skull.vx;
  skull.y = skull.y + skull.vy;


if (skull.x > width) {
  skull.x = 0;
  skull.y = random (0, height);

}


//User movement, added acceleration to User (won't teleport, follows instead)
  if (mouseX < user.x){
    user.ax = -user.Accel;
  }
  else {
    user.ax = user.Accel;
  }


  if (mouseY < user.y){
    user.ay = -user.Accel;
  }
  else {
    user.ay = user.Accel;
  }

  user.vx = user.vx + user.ax;
  user.vx = constrain(user.vx,-user.MaxV,user.MaxV);
  user.vy = user.ay + user.vy;
  user.vy = constrain(user.vy,-user.MaxV,user.MaxV);

  user.x = user.x + user.vx;
  user.y = user.y + user.vy;

//Checking for Skull
let d = dist(user.x, user.y, skull.x, skull.y);
if (d < skull.size/2 + user.size/2) {
  noLoop();

//Display Skull
//Checking for distance between Skull and User, for size enhance
let proximity = int(dist(user.x, user.y, skull.x, skull.y));
let danger = map(proximity, skull.x, 200, skull.y, 200);
if (proximity < skull.size/2 + user.size/2) {
  image (enemyimg, skull.x, skull.y, danger, danger);
}
//Display User and custom cursor
  imageMode(CENTER);
  image(userimg,user.x,user.y);
  imageMode(CENTER);
  image(cursorimg,mouseX,mouseY);

}
