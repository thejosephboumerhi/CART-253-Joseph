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
  ax: 0,
  ay: 0,
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


let numStatic = 1000;
let userimg;
let cursorimg;

function preload() {
userimg = loadImage('assets/images/Blueuser.png');
cursorimg = loadImage('assets/images/Usercursor.png')
}



//Starts simulation
function setup() {

createCanvas (windowWidth, windowHeight);
covid19.y = random (0, height);
covid19.vx = covid19.speed;
noCursor();
}

//Covid19 and User drawn
function draw() {
  background(0);

//Display visual effects (static)
for (let i = 0; i < numStatic; i++) {
  let x = random(0,width);
  let y = random(0,height);
  stroke(255,0,0);
  point(x,y);
}

//Covid19 movement
  covid19.x = covid19.x + covid19.vx;
  covid19.y = covid19.y + covid19.vy;


if (covid19.x > width) {
  covid19.x = 0;
  covid19.y = random (0, height);
}

//User movement, added acceleration to User (can't teleport)


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

//Checking for Covid19
let d = dist(user.x, user.y, covid19.x, covid19.y);
if (d < covid19.size/2 + user.size/2) {
  noLoop();
}

//Display Covid19
  fill (covid19.fill.r, covid19.fill.g, covid19.fill.b);
  ellipse (covid19.x, covid19.y, covid19.size);

//Display User and custom cursor
  imageMode(CENTER);
  image(userimg,user.x,user.y);
  imageMode(CENTER);
  image(cursorimg,mouseX,mouseY);

}
