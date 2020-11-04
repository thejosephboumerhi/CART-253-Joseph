//Used "bullet" example from Discord
class PlayerProjectile {
  constructor(x, y) {
    this.x = -75;
    this.y = -75;
    this.vx = 0;
    this.vy = 0;
    this.speed = 20;
    this.size = 20;
    this.fired = false;
  }

  projectile() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x > width) {
      this.fired = false;
    }

    let d = dist(this.x, this.y, enemy.x, enemy.y);
    if (this.fired && enemy.active && d < this.size / 2 + enemy.size / 2) {
      // Stop the this
      this.fired = false;
      // Kill the enemy
      enemy.active = false;
    }

    fill(255);
    ellipse(this.x, this.y, this.size);

    if (this.fired) {
      ellipse(this.x, this.y, this.size);
    }

    if (enemy.active) {
      fill(255, 0, 0);
      ellipse(enemy.x, enemy.y, enemy.size);
    }
  }

  mousePressed() {
    if (this.fired) {
      return;
    }

    this.fired = true;
    this.x = this.x;
    this.y = this.y;
    this.vx = this.speed;
  }
}
