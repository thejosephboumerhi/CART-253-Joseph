/***********************************************************
Activity 5 - Looking For Love
Joseph Boumerhi

Simulates a "multi-player" encounter between a
officer of justice and a criminal
***********************************************************/
let police = {
  x: 0,
  y: 250,
  size: 100,
  vx: 0,
  vy: 0,
  ax: 0,
  ay: 0,
  accel: 0.25,
  MaxV: 2,
  speed: 2
};

let robber = {
  x: 0,
  y: 250,
  size: 100,
  vx: 0,
  vy: 0,
  ax: 0,
  ay: 0,
  accel: 0.25,
  MaxV: 2,
  speed: 2
};

//Could be title, simulation, and the endings (good and bad)
//Remember to set it as the first state of the program as a title or menu
let state = `title`;

//Setups
function setup() {
createCanvas(windowWidth,windowHeight);
setupCircles();
}

//Setups the circles and trajectory beforehand
function setupCircles() {
police.x = width/3;
robber.x = 2 * width/3;

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

  }
}


function title () {
  push();
  textSize(50);
  fill(200,100,100);
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
if (keyIsDown(LEFT_ARROW)) {
  police.ax = -police.accel;
}
else if (keyIsDown(RIGHT_ARROW)) {
  police.ax = police.accel;
}
else {
  police.ax = 0;
}
if (keyIsDown(UP_ARROW)){
  police.ay = -police.accel;
}
else if (keyIsDown(DOWN_ARROW)) {
  police.ay = police.accel;
}
else {
  police.ay = 0;
}

police.vx = police.vx + police.ax;
police.vx = constrain(police.vx,-police.MaxV,police.MaxV);
police.vy = police.ay + police.vy;
police.vy = constrain(police.vy,-police.MaxV,police.MaxV);

police.x = police.x + police.vx;
police.y = police.y + police.vy;

//Movement for Robber
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

robber.vx = robber.vx + robber.ax;
robber.vx = constrain(robber.vx,-robber.MaxV,robber.MaxV);
robber.vy = robber.ay + robber.vy;
robber.vy = constrain(robber.vy,-robber.MaxV,robber.MaxV);

robber.x = robber.x + robber.vx;
robber.y = robber.y + robber.vy;
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
fill(0,255,0);
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
}
