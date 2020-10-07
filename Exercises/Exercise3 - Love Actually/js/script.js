/***********************************************************
Activity 5 - Looking For Love
Joseph Boumerhi

Simulates a "Cop and Robber" encounter, used A5 as template
***********************************************************/
let police = {
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

let robber = {
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

let copBarrierXL = 0;
let copBarrierXR = 500;
let copBarrierYU = 0;
let copBarrierYD = 500;

//Could be title, simulation, and the endings (good and bad)
//Remember to set it as the first state of the program as a title or menu
let state = `title`;

//Setups
function setup() {
createCanvas(1000,650);
setupCircles();
}

//Setups the circles and trajectory beforehand
function setupCircles() {
police.x = width/3;
robber.x = 2 * width/3;

//police.vx = random(-police.speed,police.speed);
//police.vy = random(-police.speed,police.speed);

}

//Calls the simulation in draw(), and the various states (start, end)
function draw() {
  background(0);

if (state === `title`) {
  title();
}
else if (state === `simulation`) {
  simulation();
}
else if (state === `capture`) {
  capture();
}
else if (state === `escape`) {
  escape();
//else if (state === `special-conditions`)

  }
}


function title () {
  push();
  textSize(50);
  fill(200,200,100);
  textAlign(CENTER,CENTER);
  text(`Cops and Robbers`, width/2, height/2);
  pop();
}

//Simulation is called, drawn and manages other functions
function simulation () {
  movementInput();
  checkOffScreen();
  overlap();
  display();
}

function capture() {
  push();
  textSize(50);
  fill(150,150,255);
  textAlign(CENTER,CENTER);
  text(`Caught the Robber!`, width/2, height/2);
  pop();
}

function escape() {
  push();
  textSize(50);
  fill(255,150,150);
  textAlign(CENTER,CENTER);
  text(`Robber has escaped!`, width/2, height/2);
  pop();
}

//The movement of the circles, P1 (Cop) = WASD, P2 (Robber)= ARROWS
function movementInput() {
//Movement for Cop

police.x = police.x + police.vx;
police.y = police.y + police.vy;

//Movement for Robber
let friction = 0.89;
if (keyIsDown(65)) {
  robber.ax = -robber.accel;
}
else if (keyIsDown(68)) {
  robber.ax = robber.accel;
}
else {
  robber.ax = 0;
}
if (keyIsDown(87)) {
  robber.ay = -robber.accel;
}
else if (keyIsDown(83)) {
  robber.ay = robber.accel;
}
else {
  robber.ay = 0;
}

// It will reduce over time the movement towards zero, allows for good movement
robber.vx = robber.vx * friction;
robber.vy = robber.vy * friction;


// Change position with velocity
robber.x = robber.vx + robber.x;
robber.y = robber.vy + robber.y;

robber.vx = robber.vx + robber.ax;
robber.vx = constrain(robber.vx,-robber.MaxV,robber.MaxV);
robber.vy = robber.ay + robber.vy;
robber.vy = constrain(robber.vy,-robber.MaxV,robber.MaxV);


}

//Check whether either circle is off-screen
function checkOffScreen() {
if (isOffScreen(robber)) {
  state = `escape`;
  }
}

function isOffScreen(robber) {
  if (robber.x < 0 || robber.x > width || robber.y < 0 || robber.y > height) {
    return true;
  }
    else {
    return false;
  }
}

//Check if circles end up overlapping
function overlap() {
  let d = dist(police.x, police.y, robber.x, robber.y);
  if (d < police.size/2 + robber.size/2) {
      state = `capture`;
  }
}

//Shows visuals for player units
function display() {

//Cop
fill(0,0,255);
ellipse(police.x, police.y, police.size);

//Robber
fill(255,0,0);
ellipse(robber.x, robber.y, robber.size);
}

//Changes the title state to the simulation state
function mousePressed() {
  if (state === `title`) {
    state = `simulation`;
  }
  //function specialCondition(){
    //if robber.x ===
  //}
}
