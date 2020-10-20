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
  MaxV: 10,
  friction: 0.9,
  //health:10
};

let catfishArray = [];
let catfish = 2;
let piranhaArray = [];
let piranha = 4;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0, 9, 107);
  if (state === `title`) {
    title();
  } else if (state === `aquarium`) {
    aquarium();
  } else if (state === `ending1`) {
    ending1();
  } else if (state === `ending2`) {
    ending2();
  }
}

//Text Stuff
function title() {
  push();
  textSize(45);
  fill(50, 125, 50);
  stroke(0);
  strokeWeight(5);
  textAlign(CENTER, CENTER);
  text(`The Age Of The Aquarium`, width / 2, height / 2);
  pop();
}

function ending1() {
  push();
  textSize(50);
  fill(250, 100, 100);
  stroke(0);
  strokeWeight(5);
  textAlign(CENTER, CENTER);
  text(`You Got Eaten Up`, width / 2, height / 2);
  pop();
}

function ending2() {
  push();
  textSize(40);
  fill(175, 100, 100);
  stroke(0);
  strokeWeight(5);
  textAlign(CENTER, CENTER);
  text(`They ate each other to extinction?`, width / 2, height / 2);
  pop();
}

//Aquarium Stuff
function aquarium() {
  displayUser();
  movementInput();
  for (let c = 0; c < catfishArray.length; c++) {
    moveCatfish(catfishArray[c]);
    displayCatfish(catfishArray[c]);
    deathByCatfish(catfishArray[c]);
  }
  for (let p = 0; p < piranhaArray.length; p++) {
    movePiranha(piranhaArray[p]);
    displayPiranha(piranhaArray[p]);
    deathByPiranha(piranhaArray[p]);
  }
  borderBlock();
}

function startCatfishArray() {
  for (let c = 0; c < catfish; c++) {
    let catfish = createCatfish();
    catfishArray.push(catfish);
  }

  for (let c = 1; c < catfishArray.length; c++) {
    moveCatfish(catfishArray[c]);
    displayCatfish(catfishArray[c]);
  }
}

function createCatfish() {
  let catfish = {
    x: random(0, width),
    y: random(0, height),
    vx: 0,
    vy: 0,
    speed: random(2, 4),
    tx: 0,
    ty: 0,
    size: 35,
    //health:5
  };
  return catfish;
}

function moveCatfish(catfish) {
  let cTx = catfish.x - user.x;

  let cTy = catfish.y - user.y;

  if (cTx < 0) {
    catfish.vx = catfish.speed;
  } else if (cTx > 0) {
    catfish.vx = -catfish.speed;
  }

  if (cTy < 0) {
    catfish.vy = catfish.speed;
  } else if (cTy > 0) {
    catfish.vy = -catfish.speed;
  }

  catfish.x = catfish.x + catfish.vx;
  catfish.y = catfish.y + catfish.vy;
}

function displayCatfish(catfish) {
  push();
  fill(175, 175, 50);
  ellipse(catfish.x, catfish.y, catfish.size);
  pop();
}
function deathByCatfish(catfish) {
  //Checking for either catfish
  let pd = dist(user.x, user.y, catfish.x, catfish.y);
  if (pd < catfish.size / 2 + user.size / 2) {
    state = `ending1`;
  }
}

function startPiranhaArray() {
  for (let p = 0; p < piranha; p++) {
    let piranha = createPiranha();
    piranhaArray.push(piranha);
  }

  for (let p = 1; p < piranhaArray.length; p++) {
    movePiranha(piranhaArray[p]);
    displayPiranha(piranhaArray[p]);
  }
}

function createPiranha() {
  let piranha = {
    x: random(0, width),
    y: random(0, height),
    vx: 0,
    vy: 0,
    speed: random(4, 6),
    tx: 0,
    ty: 0,
    size: 20,
    //health:2
  };
  return piranha;
}

function movePiranha(piranha) {
  let pIx = piranha.x - user.x;

  let pIy = piranha.y - user.y;

  if (pIx < 0) {
    piranha.vx = piranha.speed;
  } else if (pIx > 0) {
    piranha.vx = -piranha.speed;
  }

  if (pIy < 0) {
    piranha.vy = piranha.speed;
  } else if (pIy > 0) {
    piranha.vy = -piranha.speed;
  }

  piranha.x = piranha.x + piranha.vx;
  piranha.y = piranha.y + piranha.vy;
}

function displayPiranha(piranha) {
  push();
  fill(50, 175, 175);
  ellipse(piranha.x, piranha.y, piranha.size);
  pop();
}

function deathByPiranha(piranha) {
  //Checking for piranha
  let pd = dist(user.x, user.y, piranha.x, piranha.y);
  if (pd < piranha.size / 2 + user.size / 2) {
    state = `ending1`;
  }
}

//For things that change states
function mousePressed() {
  if (state === `title`) {
    startCatfishArray();
    startPiranhaArray();
    state = `aquarium`;
  }
}

//Collision Stuff

function overlapTrigger() {}

function borderBlock() {
  user.x = constrain(user.x, 0, width);
  user.y = constrain(user.y, 0, height);
  catfish.x = constrain(catfish.x, 0, width);
  catfish.y = constrain(catfish.y, 0, height);
  piranha.x = constrain(piranha.x, 0, width);
  piranha.y = constrain(piranha.y, 0, height);
}

//Player Stuff
function displayUser() {
  push();
  fill(100, 250, 100);
  square(user.x, user.y, user.size, user.size);
  pop();
}

//The usual likeable movement
function movementInput() {
  if (keyIsDown(65)) {
    user.ax = -user.accel;
  } else if (keyIsDown(68)) {
    user.ax = user.accel;
  } else {
    user.ax = 0;
  }
  if (keyIsDown(87)) {
    user.ay = -user.accel;
  } else if (keyIsDown(83)) {
    user.ay = user.accel;
  } else {
    user.ay = 0;
  }

  user.vx = user.vx * user.friction;
  user.vy = user.vy * user.friction;

  user.x = user.x + user.vx;
  user.y = user.y + user.vy;

  user.vx = user.ax + user.vx;
  user.vx = constrain(user.vx, -user.MaxV, user.MaxV);
  user.vy = user.ay + user.vy;
  user.vy = constrain(user.vy, -user.MaxV, user.MaxV);
}
