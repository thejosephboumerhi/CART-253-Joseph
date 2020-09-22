/**************************************************
Exercise 1 - I Like To Move It, Move It
Joseph Boumerhi

It does...
**************************************************/
//Variables associated with shapes

let square = {
  x: 250,
  y: 250,
  w: 175,
  h: 175,

};

let circle1 = {
  x: 500,
  y: 250,
  size:250

};

let circle2 = {
  x: 0,
  y: 250,
  size:250

};



//Sets up canvas
function setup() {
createCanvas (500,500);
}

// draw()
//
// Description of draw() goes here.
function draw() {
background(0);
fill(255);


rect(square.x,square.y,square.w,square.h);
rectMode(CENTER);

ellipse(circle1.x,circle1.y,circle1.size);

ellipse(circle2.x,circle2.y,circle2.size);

}
