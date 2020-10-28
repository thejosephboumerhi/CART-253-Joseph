/**************************************************
Exercise 5 - Juggle Garden
Joseph Boumerhi

Simulates juggling via paddle
**************************************************/
"use strict";

let state = "title";

let gravityForce = 0.0025;
let paddle;

let balls = [];
let numBalls = 3;

function setup() {
  createCanvas(windowWidth, windowHeight);
  paddle = new Paddle(300, 20);
  let i = 0;
  for (i = 0; i < numBalls; i++) {
    let x = random(0, width);
    let y = random(-400, -100);
    let ball = new Ball(x, y);
    balls.push(ball);
  }
}

function draw() {
  background(0);

  if (state === `title`) {
    title();
  } else if (state === `juggling`) {
    juggling();
  } else if (state === `ending1`) {
    ending1();
  } else if (state === `ending2`) {
    ending2();
  }
}

function title() {
  push();
  textSize(50);
  fill(50, 200, 50);
  stroke(0);
  strokeWeight(5);
  textAlign(CENTER, CENTER);
  text(`Game Of Juggles`, width / 2, height / 2);
  pop();
}

//Runs things during the "juggling" state
function juggling() {
  paddle.move();
  paddle.display();

  for (let i = 0; i < balls.length; i++) {
    let ball = balls[i];
    if (ball.active) {
      ball.gravity(gravityForce);
      ball.move();
      ball.bounce(paddle);
      ball.display();
      ball.border();
    }
  }
}

function ending1() {
  push();
  textSize(50);
  fill(200, 50, 50);
  stroke(0);
  strokeWeight(5);
  textAlign(CENTER, CENTER);
  text(`All Balls Lost`, width / 2, height / 2);
  pop();
}

function ending2() {
  push();
  textSize(35);
  fill(255, 25, 25);
  stroke(0);
  strokeWeight(5);
  textAlign(CENTER, CENTER);
  text(`Juggled Enough Times, You Win`, width / 2, height / 2);
  pop();
}

function mousePressed() {
  if (state === `title`) {
    state = `juggling`;
  }
}
