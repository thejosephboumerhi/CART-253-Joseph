/**************************************************
Activity 08 - Inheritance Activity
Joseph Boumerhi

Inheritance stuff, Pedestrian Palaver
**************************************************/
let state = `simulation`;

let pedestrian;

let vehicles = [];
let numCars = 10;
let numTrucks = 10;
let numMotorcycles = 5;

function setup() {
  createCanvas(windowWidth, windowHeight);

  let x = width / 2;
  let y = height;
  pedestrian = new Pedestrian(x, y);

  for (let i = 0; i < numCars; i++) {
    let x = random(0, width);
    let y = random(0, height);
    let car = new Car(x, y);
    vehicles.push(car);
  }
  for (let i = 0; i < numTrucks; i++) {
    let x = random(0, width);
    let y = random(0, height);
    let truck = new Truck(x, y);
    vehicles.push(truck);
  }
  for (let i = 0; i < numMotorcycles; i++) {
    let x = random(0, width);
    let y = random(0, height);
    let motorcycle = new Motorcycle(x, y);
    vehicles.push(motorcycle);
  }

  for (let i = 0; i < vehicles.length; i++) {
    let r = random(0, 1);
    let vehicle = vehicles[i];
    if (r < 0.5) {
      vehicle.vx = -vehicle.speed;
    } else {
      vehicle.vx = vehicle.speed;
    }
  }
}

function draw() {
  background(0);
  if (state === `title`) {
    title();
  } else if (state === `simulation`) {
    simulation();
  } else if (state === `success`) {
    success();
  } else if (state === `dead`) {
    dead();
  }
}

function simulation() {
  pedestrian.handleInput();
  pedestrian.move();
  pedestrian.display();

  if (!pedestrian.alive) {
    state = `dead`;
  }
  if (pedestrian.y < 0) {
    state = `success`;
  }

  for (let i = 0; i < vehicles.length; i++) {
    let vehicle = vehicles[i];
    vehicle.move();
    vehicle.wrap();
    vehicle.display();
    pedestrian.chechHit(vehicle);
  }
}

function title() {
  displayText(`Pedestrian Palaver`);
}

function success() {
  displayText(`You Made It!`);
}

function dead() {
  displayText(`You Are Dead!`);
}

function displayText(string) {
  pop();
  textAlign(CENTER, CENTER);
  textSize(32);
  fill(255);
  text(string, width / 2, height / 2);
  push();
}

function keyPressed() {
  if (state === `title`) {
    state = `simulation`;
  }
}
