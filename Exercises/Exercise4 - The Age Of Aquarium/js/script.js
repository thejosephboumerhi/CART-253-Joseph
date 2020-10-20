/******************************************************
E4 - The Age Of Aquarium
Joseph Boumerhi

Simulation of an aquarium, with a user-controlled unit
that has to remain alive
*******************************************************/
let state = `title`;
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

//Text
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

function displayPiranha() {}

function createPiranha() {}

function displayPiranha() {}

function displayUser() {}

function movementInput() {}
