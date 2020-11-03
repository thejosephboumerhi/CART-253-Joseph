class Player {
  constructor(x, y) {
    this.x = 0;
    this.y = 0;
    this.size = 40;
    this.vx = 0;
    this.vy = 0;
    this.ax = 0;
    this.ay = 0;
    this.accel = 3;
    this.MaxV = 12;
    this.friction = 0.9;
    this.active = true;
  }

  //
  movementInput() {
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

    //Pippin proposed the variable "friction" from previous assignment,
    //which allows for smoother WASD movement.
    this.vx = this.vx * this.friction;
    this.vy = this.vy * this.friction;

    this.x = this.x + this.vx;
    this.y = this.y + this.vy;

    this.vx = this.ax + this.vx;
    this.vx = constrain(this.vx, -this.MaxV, this.MaxV);
    this.vy = this.ay + this.vy;
    this.vy = constrain(this.vy, -this.MaxV, this.MaxV);
  }

  display() {
    push();
    imageMode(CENTER);
    image(playerImg, this.x, this.y);
    pop();
  }

  cursor() {
    push();
    imageMode(CENTER);
    image(cursorImg, mouseX, mouseY);
    pop();
  }

  weapon() {}

  border() {
    this.x = constrain(this.x, 0, width);
    this.y = constrain(this.y, 0, height);
  }
}
