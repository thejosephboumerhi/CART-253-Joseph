//Reused PlayerProjectile, adjusted values and
class EnemyProjectile {
  constructor(x, y, angle) {
    this.x = x;
    this.y = y;
    this.vx = 2;
    this.vy = 2;
    this.speed = 3;
    this.size = 20;
    this.angle = angle;
    this.fired = true;
    this.active = true;
  }

  //Checks for bullet collision onto the player, if so, damage the player
  collision(player) {
    let damage = dist(this.x, this.y, player.x, player.y);
    if (this.fired && damage < this.size / 2 + enemy.size / 2) {
      //Hurt the player
      player.healthPercent - 30;
    }
  }

  //Lets the projectile fly,
  projectile(player) {
    this.vx = this.speed * cos(this.angle);
    this.vy = this.speed * sin(this.angle);

    this.x += this.vx;
    this.y += this.vy;

    if (this.x > width) {
      this.active = false;
    } else if (this.y > height) {
      this.active = false;
    }

    //Red electric projectile
    image(enemyShotImg, this.x, this.y, this.size, this.size);

    if (this.fired) {
      image(enemyShotImg, this.x, this.y, this.size, this.size);
    }
  }
}
