class Enemy {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 50;
    this.vx = 0;
    this.vy = 0;
    this.ax = 0;
    this.ay = 0;
    this.accel = 2;
    this.MaxV = 6;
    this.friction = 0.95;
    this.active = true;
    this.numDead = 2;
    //Perhaps I will need to make a class for various enemies
  }

  //Shows "bright red" enemies
  display() {
    push();
    fill(255, 0, 0);
    ellipse(this.x, this.y, this.size);
    pop();
  }

  //Lets enemy chase player, decided to give accel and friction too
  chase() {
    let cx = this.x - player.x;
    let cy = this.y - player.y;

    if (cx < 0) {
      this.ax = this.accel;
    } else if (cx > 0) {
      this.ax = -this.accel;
    }

    if (cy < 0) {
      this.ay = this.accel;
    } else if (cy > 0) {
      this.ay = -this.accel;
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

  //Get hit, game over (will likely be modified when I work on health later)
  attackOverlap() {
    let a = dist(player.x, player.y, this.x, this.y);
    if (a < this.size / 2 + player.size / 2) {
      state = `endGame`;
    }
  }

  waveSpawn() {
    if (this.numDead >= 2 * enemyGroup.length) {
      let x = random(0, width);
      let y = random(0, height);
      let enemy = new Enemy(x, y);
      enemyGroup.push(enemy);
    }
  }
}
