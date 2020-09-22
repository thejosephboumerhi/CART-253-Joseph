/**************************************************
Exercise 1 - I Like To Move It, Move It
Joseph Boumerhi

It does...
**************************************************/
//Variables associated with shapes

let rectan = {
  x: 250,
  y: 250,
  w: 175,
  h: 175

};

let circle1 = {
  x: 500,
  y: 250,
  size:50

};

let circle2 = {
  x: 0,
  y: 250,
  size:50

};

let bg = {
  r: 255,
  g:0,
  b:0

};


//Sets up canvas
function setup() {
createCanvas (500,500);
frameRate (60);
}

//For every frame,
function draw() {
background(bg.r,bg.g,bg.b);
fill(255);

//The rectangle moves along the Y axis
rect(rectan.x,rectan.y,rectan.w,rectan.h);
rectan.y = constrain(mouseY,0,500);
rectMode(CENTER);

//Left ellipse
ellipse(circle1.x,circle1.y,circle1.size);

//Right ellipse
ellipse(circle2.x,circle2.y,circle2.size);


console.log ("mouseX"+mouseX,"mouseY"+mouseY);
}
