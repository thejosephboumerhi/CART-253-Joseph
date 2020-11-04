//Used a chunk of "bullet" example from the class Discord
class PlayerProjectile {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = 2;
    this.vy = 2;
    this.speed = 2;
    this.size = 20;
    this.angle = 0;
    this.fired = true;
    this.active = true;
  }

  //Checks for bullet collision onto the enemy, if so, kill enemy
  collision(enemy) {
    let subdue = dist(this.x, this.y, enemy.x, enemy.y);
    if (this.fired && enemy.active && subdue < this.size / 2 + enemy.size / 2) {
      // Kill the enemy that said bullet hit
      enemy.active = false;
    }
  }

  //Lets the projectile take shape, and fly (albeit not towards cursor yet)
  projectile(enemy) {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x > width) {
      this.active = false;
    } else if (this.y > height) {
      this.active = false;
    }

    //Gray round projectile
    fill(75);
    ellipse(this.x, this.y, this.size);

    if (this.fired) {
      ellipse(this.x, this.y, this.size);
    }
  }
}
