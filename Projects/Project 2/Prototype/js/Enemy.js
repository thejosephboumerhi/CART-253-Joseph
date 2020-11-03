class Enemy {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 50;
    this.vx = 0;
    this.vy = 0;
    this.ax = 0;
    this.ay = 0;
    this.accel = 3.5;
    this.MaxV = 14;
    this.active = true;
  }

  display() {
    push();
    fill(255, 0, 0);
    ellipse(this.x, this.y, this.size);
    pop();
  }
}
