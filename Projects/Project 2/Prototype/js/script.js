/**************************************************
Project 2: Prototype
Joseph Boumerhi

Prototyping of a TDP shooter
**************************************************/
let state = `any`;
let enemyGroup = [];
let enemyNum = 2;
//
function setup() {
  createCanvas(windowWidth, windowHeight);
}

//
function draw() {
  background(175, 150, 150);

  if (state === `titleMenu`) {
    titleMenu();
  } else if (state === `inGame`) {
    gameplay();
  } else if (state === `endGame`) {
    gameOver();
  }
}
//
function title() {
  push();
  pop();
}
function gameOver() {
  push();
  pop();
}
//
function gameplay() {}
//
//function reset() {;}
