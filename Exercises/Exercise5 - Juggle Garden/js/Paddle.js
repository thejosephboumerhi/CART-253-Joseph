class Paddle {
  constructor(w, h) {
    this.width = w;
    this.height = h;
    this.x = 0;
    this.y = height - this.height / 2;
    this.controllerState = `mouse`;
    this.vx = 0;
    this.vy = 0;
    this.ax = 0;
    this.ay = 0;
    this.accel = 3;
    this.MaxV = 12;
    this.friction = 0.9;
  }

  move() {
    if ((this.controllerState = `mouse`)) {
      this.x = mouseX;
    } else if ((this.controllerState = `keyboard`))
      if (keyIsDown(65)) {
        this.ax = -this.accel;
      } else if (keyIsDown(68)) {
        this.ax = this.accel;
      } else {
        this.ax = 0;
      }

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
    fill(255);
    noStroke();
    rectMode(CENTER);
    rect(this.x, this.y, this.width, this.height);
    pop();
  }
  border() {
    this.x = constrain(this.x, 0, width);
  }
}
