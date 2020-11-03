class Enemy {
  constructor(x,y) {
    this.x: 0,
    this.y: 0,
    this.size: 50,
    this.vx: 0,
    this.vy: 0,
    this.ax: 0,
    this.ay: 0,
    this.accel: 3.5,
    this.MaxV: 14,
    this.active: true
  };

  display() {
    push();
    pop();
  }
}
