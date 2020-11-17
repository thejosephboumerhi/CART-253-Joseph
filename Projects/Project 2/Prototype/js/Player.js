class Player {
  constructor(x, y) {
    this.x = 0;
    this.y = 0;
    this.size = 60;
    this.vx = 0;
    this.vy = 0;
    this.ax = 0;
    this.ay = 0;
    this.accel = 3;
    this.MaxV = 12;
    this.friction = 0.9;
    //this.health = 100; To use later
    //this.attacked = true; To use later
  }

  //Lets player move efficiently
  movementInput() {
    //Reusing good old movement inputs, since I find it's been fairly effective
    if (keyIsDown(65)) {
      this.ax = -this.accel;
    } else if (keyIsDown(68)) {
      this.ax = this.accel;
    } else {
      this.ax = 0;
    }
    if (keyIsDown(87)) {
      this.ay = -this.accel;
    } else if (keyIsDown(83)) {
      this.ay = this.accel;
    } else {
      this.ay = 0;
    }

    //Allows for smoother WASD movement.
    this.vx = this.vx * this.friction;
    this.vy = this.vy * this.friction;

    this.x = this.x + this.vx;
    this.y = this.y + this.vy;

    this.vx = this.ax + this.vx;
    this.vx = constrain(this.vx, -this.MaxV, this.MaxV);
    this.vy = this.ay + this.vy;
    this.vy = constrain(this.vy, -this.MaxV, this.MaxV);
  }

  //Shows player image, and makes them face in the direction of the mouse
  display() {
    pop();
    imageMode(CENTER);
    image(playerImg, this.x, this.y, this.size, this.size);

    //Faces in the direction (although current shape form won't show it)
    if (this.x > mouseX) {
      image(playerImg, this.x, this.y, this.size, this.size);
    } else if (this.x < mouseX) {
      image(playerImg, this.x, this.y, -this.size, this.size);
    }
    push();
  }

  //Shows custom cursor
  cursor() {
    push();
    noCursor();
    imageMode(CENTER);
    image(cursorImg, mouseX, mouseY);
    pop();
  }

  //Pushes and lets you shoot bullets
  weaponAim() {
    let x = this.x;
    let y = this.y;
    let dx = x - mouseX;
    let dy = y - mouseY;
    let angle = atan(dy / dx);

    if (dx > 0) {
      angle += PI;
    }

    let projectile = new PlayerProjectile(x, y, angle);

    projectile.speed = 10;
    projectileOut.push(projectile);
    console.log(angle);

    //if () {}
  }

  //Usual border block
  border() {
    this.x = constrain(this.x, 0, width);
    this.y = constrain(this.y, 0, height);
  }
}
