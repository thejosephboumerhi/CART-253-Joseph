/**************************************************
Exercise 1 - I Like To Move It, Move It
Joseph Boumerhi

It does...
**************************************************/
//Variables associated with shapes

let rectan = {
  x: 250,
  y: 250,
  w: 150,
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
  g: 0,
  b: 0

};

let fg = {
  r:0,
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

square(width/2,height/2,450);



//The rectangle moves along the Y axis with mouseY
fill(0,mouseY,0);
rect(rectan.x,rectan.y,rectan.w,rectan.h);
rectan.y = constrain(mouseY,0,500);
rectMode(CENTER);

//Ellipses that get bigger the higher mouseX is, and vice-versa
//Left ellipse
fill(mouseX,0,0);
circle1.size = map(width - mouseX,0,width,50,175);
ellipse(circle1.x,circle1.y,circle1.size);
circle1.size = constrain(mouseX,50,175);

//Right ellipse
fill(50);
circle2.size = map(mouseX,0,width,50,175);
ellipse(circle2.x,circle2.y,circle2.size);
circle2.size = constrain(mouseX,50,175);


console.log ("mouseX"+mouseX,"mouseY"+mouseY);
}
