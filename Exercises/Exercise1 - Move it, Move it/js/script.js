/**************************************************
Exercise 1 - I Like To Move It, Move It
Joseph Boumerhi

Responds to mouseX and Y, has vertical movement based on mouseY,size change based on the distance of mouseX,
**************************************************/
//Variables associated with shapes

//Middle rectangle
let rectan = {
  x: 250,
  y: 250,
  w: 150,
  h: 175

};

//Left circle
let circle1 = {
  x: 500,
  y: 250,
  size:50

};

//Right circle
let circle2 = {
  x: 0,
  y: 250,
  size:50

};

//Just a black background
let bg = {
  r: 0,
  g: 0,
  b: 0

};

//Sets up canvas, and Frame Rate to 60.
function setup() {
createCanvas (500,500);
frameRate (60);
}

//Runs the program, draws and alters shapes.
function draw() {
background(bg.r,bg.g,bg.b);

//Random flikering foreground
fill(random(0,225));
square(width/2,height/2,450);

//The rectangle moves along the Y axis with mouseY.
//Changes into different shades of green, up is darker, down is lighter.
fill(0,mouseY,0);
rectMode(CENTER);
rectan.y = constrain(mouseY,0,500);
rect(rectan.x,rectan.y,rectan.w,rectan.h);

//Ellipses that get bigger when mouseX is closer, and vice-versa.
//Also, the closer, the more darker red, and the further, the lighter the red.
//Left ellipse
fill(width-mouseX,0,0);
circle1.size = map(width - mouseX,0,width,50,175);
circle1.size = constrain(circle1.size,50,175);
ellipse(circle1.x,circle1.y,circle1.size);

//Right ellipse
fill(mouseX,0,0);
circle2.size = map(mouseX,0,width,50,175);
circle2.size = constrain(circle2.size,50,175);
ellipse(circle2.x,circle2.y,circle2.size);

}
