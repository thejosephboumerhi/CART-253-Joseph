//Used a chunk of "bullet" example from the class Discord
class PlayerProjectile {
  constructor(x, y, angle) {
    this.x = x;
    this.y = y;
    this.vx = 2;
    this.vy = 2;
    this.speed = 2;
    this.size = 30;
    this.angle = angle;
    this.fired = true;
    this.active = true;
  }

  //Checks for bullet collision onto the enemy, if so, kill enemy
  collision(enemy) {
    let subdue = dist(this.x, this.y, enemy.x, enemy.y);
    if (this.fired && enemy.active && subdue < this.size / 2 + enemy.size / 2) {
      // Kill the enemy that said bullet hit
      enemy.active = false;
      this.active = false;
      this.fired = false;
      numDead++;
    }
  }

  //Lets the projectile take shape, and fly, now functions with weaponAim();
  projectile(enemy) {
    this.vx = this.speed * cos(this.angle);
    this.vy = this.speed * sin(this.angle);

    this.x += this.vx;
    this.y += this.vy;

    if (this.x > width) {
      this.active = false;
    } else if (this.y > height) {
      this.active = false;
    }

    //Gray round projectile
    image(playerShotImg, this.x, this.y, this.size, this.size);

    if (this.fired) {
      image(playerShotImg, this.x, this.y, this.size, this.size);
    }
  }
}
