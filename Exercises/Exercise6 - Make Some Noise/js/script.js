/*****************************************************************
Exercise 06 - Make Some Noise
Joseph Boumerhi

Simple Sound Activity, plays sound(s), could be used for music(?)
*****************************************************************/
let balls = [];
let gravBall = [];

//For Music Notes
let notes = [`F3`, `G3`, `Ab4`, `Bb4`, `C4`, `Dd4`, `Eb4`, `F4`];

// Puts up the canvas
function setup() {
  createCanvas(windowWidth, windowHeight);
  userStartAudio();

  cursorball = new CursorBall(x, y, note);
}

function draw() {
  background(30);

  cursorball.move();
  cursorball.display();

  for (let i = 0; i < balls.length; i++) {
    let ball = balls[i];
    ball.move();
    ball.bounce();
    ball.display();
  }
}

function mousePressed() {
  createBall(mouseX, mouseY);
}

function createBall(x, y) {
  let note = random(notes);
  let ball = new Ball(x, y, note);
  balls.push(ball);
}
