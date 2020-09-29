/**************************************************
04 - Dodging COVID-19
Joseph Boumerhi

Interactive COVID-19 simulation, fun too!
**************************************************/

let covid19 = {
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

let playeruser = {
  x: 250,
  y: 250,
  size: 100,
  fill: 255
};

// setup()
//
// Description of setup() goes here.
function setup() {

createCanvas (windowWidth,windowHeight);
covid19.y = random (0, height);
covid19.vx = covid19.speed;
noCursor();
}

//Covid19 and Player drawn
function draw() {
  background(0);

//Display visual effects (static)
for (let i = 0; 1 < 1000; i++) {
  let x = random(0,width);
  let y = random(0,height);
  stroke(255);
  point(x,y);
}

//Covid19 movement
  covid19.x = covid19.x + covid19.vx;
  covid19.y = covid19.y + covid19.vy;

if (covid19.x > width) {
  covid19.x = 0;
  covid19.y = random (0, height);
}

//Player movement
  playeruser.x = mouseX;
  playeruser.y = mouseY;

//Checking for Covid19
let d = dist(playeruser.x, playeruser.y, covid19.x, covid19.y);
if (d < covid19.size/2 + playeruser.size/2) {
  noLoop();
}

//Display Covid19
  fill (covid19.fill.r, covid19.fill.g, covid19.fill.b);
  ellipse (covid19.x, covid19.y, covid19.size);

//Display Player
  fill (playeruser.fill);
  ellipse (playeruser.x, playeruser.y, playeruser.size);
}
