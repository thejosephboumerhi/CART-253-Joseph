//Now fulfills both the roles of a melee and ranged enemy, and is very
//threating, even if there is only one of them. (Used to be MeleeEnemy).
class HybridEnemy {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 80;
    this.vx = 0;
    this.vy = 0;
    this.ax = 0;
    this.ay = 0;
    this.accel = 2;
    this.MaxV = 6;
    this.friction = 0.95;
    this.active = true;
    this.gattlingSpeed = 0;
  }

  //Shows orb-like enemies, instead of the supposed meleeEnemyImg
  //I put the rangedEnemyImg, since it just looks better in comparison
  display() {
    push();
    imageMode(CENTER);
    image(rangedEnemyImg, this.x, this.y, this.size, this.size);
    pop();
  }

  //Lets the enemy chase the player, decided to just give it
  //accel and friction too
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

  enemyTargeting() {
    //The same as the player, but it targets them instead
    //Shoots from enemy position
    let x = this.x;
    let y = this.y;

    //Takes player.x and player.y values, and lets it be used for angle/degrees,
    //exactly like weaponAim(), except it targets the player
    let tx = x - player.x;
    let ty = y - player.y;
    let angle = atan(ty / tx);

    if (tx > 0) {
      angle += PI;
    }

    //Instead of the enemy spraying bullets every frame, it shoots
    //every 3 frames, it sprays a wall of them, so it makes you
    //want to move out of the way. Dana helped me discover %, and showed me how
    //it works.

    if (this.gattlingSpeed % 3 === 0) {
      let enemyProjectile = new EnemyProjectile(x, y, angle);
      enemyProjectile.speed;
      enemyProjectileOut.push(enemyProjectile);
    }
    this.gattlingSpeed++;
  }

  //Hurts the player when overlaping, does high instant damage
  attackOverlap() {
    let a = dist(player.x, player.y, this.x, this.y);
    if (
      a < this.size / 2 + player.size / 2 &&
      player.invinciTime < frameCount
    ) {
      player.healthPercent -= 40;
      player.invinciTime = frameCount + 30;
    }
  }
}
