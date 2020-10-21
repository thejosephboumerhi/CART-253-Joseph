/******************************************************
E4 - The Age Of Aquarium
Joseph Boumerhi

Simulation of an aquarium, with a user-controlled unit
that has to remain alive
*******************************************************/
let state = `title`;
let user = {
  x: 500,
  y: 500,
  size: 30,
  vx: 0,
  vy: 0,
  ax: 0,
  ay: 0,
  accel: 4,
  MaxV: 5,
  friction: 0.9,
};

let piranhaArray = [];
let piranha = 4;

let piranhaEnd = 0;
let piranhaDuration = 60 * 5;

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
  text(`Extinction By Hunger!`, width / 2, height / 2);
  pop();
}

//Aquarium Stuff
function aquarium() {
  displayUser();
  movementInput();

  for (let p = 0; p < piranhaArray.length; p++) {
    movePiranha(piranhaArray[p]);
    displayPiranha(piranhaArray[p]);
    deathByPiranha(piranhaArray[p]);
  }
  borderBlock();
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
    speed: random(1, 2),
    tx: 0,
    ty: 0,
    size: 20,
    state: "alive",
    lifespan: 100,
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
  let changePiranha = random(); // Generate a random number between 0 and 1

  // Change direction 1% of the time
  if (changePiranha < 0.25) {
    // Choose random velocities within the "speed limit"
    piranha.vx = random(-piranha.speed, piranha.speed);
    piranha.vy = random(-piranha.speed, piranha.speed);
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

function piranhaLifespan(piranha) {
  frameCount - piranha.lifespan;

  if (piranha.lifespan < 0) {
    piranha[p].state = "inactive";
  }
}
function piranhaExtinct(piranha) {
  // check if any of the fish are still alive
  let lastPiranhaStanding = false;
  for (let p = 0; p < piranhaArray.length; p++) {
    if (piranhaArray[p].state === "active") {
      lastPiranhaStanding = true;
    } else if (lastPiranhaStanding === false) {
      state === `ending2`;
    }
  }

  //For things that change states
  function mousePressed() {
    if (state === `title`) {
      startPiranhaArray();

      state = `aquarium`;
    }
  }

  function borderBlock() {
    user.x = constrain(user.x, 0, width);
    user.y = constrain(user.y, 0, height);
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
}
