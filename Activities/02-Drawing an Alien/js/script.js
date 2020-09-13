/**************************************************
Activity 2: Drawing an Alien
Joseph Boumerhi

Drawing of an alien
**************************************************/

function setup() {
createCanvas (640,480);

background (30);
noStroke ();

//Draws the alien's torso
fill (232, 0, 0);
ellipse (320,480,300,200);

//Draws the alien's head
fill (189, 0, 0);
ellipse (320,240,220,400);

//Draws its eyes
fill (0);
ellipse (250,240,80,150);
ellipse (390,240,80,150);

//Draws the caruncles of its eyes
fill (0);
ellipse (280,300,20,20);
ellipse (360,300,20,20);

//Draws its mouth
stroke (215,0,0);
strokeWeight (3);
rectMode (CENTER);
rect (320,390,100,5);

//Draws its nostrils
fill (0);
ellipse (300,330,10,25);
ellipse (340,330,10,25);
fill (232, 143, 0);
ellipse (300,330,20,35);
ellipse (340,330,20,35);

//Draws the pupils
fill (232, 143, 0);
arc (250,230,70,140,50,PI + QUARTER_PI, CHORD);
arc (390,230,70,140,50,PI + QUARTER_PI, CHORD);

}

function draw() {

}
