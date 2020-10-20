/******************************************************
E4 - The Age Of Aquarium
Joseph Boumerhi

Simulation of an aquarium, with a user-controlled unit
that has to remain alive
*******************************************************/
let state = `title`;
let user = {
  x: 0,
  y: 0,
  size: 50,
  vx: 0,
  vy: 0,
  ax: 0,
  ay: 0,
  accel: 4,
  speed: 10,
  friction: 0.9,
};

let catfishArray = [];
let catfish;
let piranhaArray = [];
let piranha;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0, 9, 107);
  if (state === `title`) {
    title();
  }
  if (state === `aquarium`) {
    aquarium();
  }
  if (state === `ending1`) {
    ending1();
  }
  if (state === `ending2`) {
    ending2();
  }
}

//Text Stuff
function title() {
  push();
  pop();
}

function ending1() {
  push();
  pop();
}

function ending2() {
  push();
  pop();
}

//Aquarium Stuff
function aquarium() {}

function createCatfish() {}

function moveCatfish() {}

function displayPiranha() {
  push();
  pop();
}

function createPiranha() {}

function movePiranha() {}

function displayPiranha() {
  push();
  pop();
}

//Collision Stuff

function overlapTrigger() {}

function borderBlock() {}

//Player Stuff
function displayUser() {
  push();
  pop();
}

function movementInput() {}
