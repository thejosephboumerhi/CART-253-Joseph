/***********************************************************
Activity 5 - Looking For Love
Joseph Boumerhi

Simulates the fate of an encounter between potential lovers
***********************************************************/
let circle1 = {
  x: undefined,
  y: 250,
  size: 100,
  vx: 0,
  vy: 0,
  speed: 3
};

let circle2 = {
  x: undefined,
  y: 250,
  size: 100,
  vx: 0,
  vy: 0,
  speed: 3
};

//Could be title, simulation, and the endings (good and bad)
//Remember to set it as the first state of the program as a title or menu
let state = `title`;

//Setups
function setup() {
createCanvas(500,500);
setupCircles();
}

//Setups the circles and trajectory beforehand
function setupCircles() {
circle1.x = width/3;
circle2.x = 2 * width/3;

circle1.vx = random(-circle1.speed,circle1.speed);
circle2.vx = random(-circle2.speed,circle2.speed);
circle1.vy = random(-circle1.speed,circle1.speed);
circle2.vy = random(-circle2.speed,circle2.speed);
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
else if (state === `love`) {
  love();
}
else if (state === `sadness`) {
  sadness();
  }
}


function title () {
  push();
  textSize(64);
  fill(200,100,100);
  textAlign(CENTER,CENTER);
  text(`LOVE?`, width/2, height/2);
  pop();
}

//Simulation is called, drawn and manages other functions
function simulation () {
  move();
  checkOffScreen();
  overlap();
  display();
}

function love() {
  push();
  textSize(64);
  fill(255,150,150);
  textAlign(CENTER,CENTER);
  text(`LOVE!`, width/2, height/2);
  pop();
}

function sadness() {
  push();
  textSize(64);
  fill(150,150,255);
  textAlign(CENTER,CENTER);
  text(`;(`, width/2, height/2);
  pop();
}

//The movement of the circles
function move() {
  circle1.x = circle1.x + circle1.vx;
  circle1.y = circle1.y + circle1.vy;

  circle2.x = circle2.x + circle2.vx;
  circle2.y = circle2.y + circle2.vy;
}

//Check whether either circle is off-screen
function checkOffScreen() {
if (isOffScreen(circle1) || isOffScreen(circle2)) {
  state = `sadness`;
  }
}

function isOffScreen(circle) {
  if (circle.x < 0 || circle.x > width || circle.y < 0 || circle.y > height) {
    return true;
  }
    else {
    return false;
  }
}

//Check if circles end up overlapping
function overlap() {
  let d = dist(circle1.x, circle1.y, circle2.x, circle2.y);
  if (d < circle1.size/2 + circle2.size/2) {
      state = `love`;
  }
}

//Shows visuals
function display() {

ellipse(circle1.x, circle1.y, circle1.size);
ellipse(circle2.x, circle2.y, circle2.size);
}

//Changes the title state to the simulation state
function mousePressed() {
  if (state === `title`) {
    state = `simulation`;
  }
}
