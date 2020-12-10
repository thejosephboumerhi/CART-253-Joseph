class Player {
  constructor(x, y) {
    this.x = 0;
    this.y = 0;
    this.size = 80;
    this.vx = 0;
    this.vy = 0;
    this.ax = 0;
    this.ay = 0;
    this.accel = 3;
    this.MaxV = 9;
    this.friction = 0.9;
    this.healthPercent = 100;
    this.healthRegen = 20;
    this.invinciTime = 0;
    this.dashTime = 0;
  }

  //Lets player move efficiently
  movementInput() {
    //Reusing good old movement inputs, since I find it's been fairly effective
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

    //Allows player to be more evasive by dashing, has orange gauge display
    if (keyIsDown(32) && this.dashTime < 60) {
      this.maxV = 30;
      this.dashTime++;
    } else if (keyIsDown(32) == false && this.dashTime != 0) {
      this.maxV = 9;
      this.dashTime++;

      if (this.dashTime > 60) {
        this.dashTime = 0;
      }
    }

    push();
    let w = abs(this.dashTime - 30);
    fill(150, 150, 75);
    rectMode(CENTER);
    rect(width / 2, 50, w * 2, 25);
    pop();

    //Allows for smoother WASD movement.
    this.vx = this.vx * this.friction;
    this.vy = this.vy * this.friction;

    this.x = this.x + this.vx;
    this.y = this.y + this.vy;

    this.vx = this.ax + this.vx;
    this.vx = constrain(this.vx, -this.MaxV, this.MaxV);
    this.vy = this.ay + this.vy;
    this.vy = constrain(this.vy, -this.MaxV, this.MaxV);
  }

  //Shows player image, and makes them face in the direction of the mouse
  display() {
    push();
    imageMode(CENTER);
    translate(this.x, this.y);

    //Faces the "Standing" and "Running" playerImgs in direction of mouseX, new playerImg,
    //thanks to Samuel's assistance
    if (this.x > mouseX) {
      scale(-1, 1);
    }

    //Lets running animation play while the player is moving, if otherwise, idle
    if (keyIsDown(65) || keyIsDown(68) || keyIsDown(87) || keyIsDown(83)) {
      image(playerRunImg, 0, 0, this.size, this.size);
    } else {
      image(playerImg, 0, 0, this.size, this.size);
    }

    pop();

    push();
    imageMode(CENTER);
    if (this.x > mouseX) {
      scale(-1, 1);
    } else {
      image(playerArmImg, this.x, this.y, this.size, this.size);
    }
    pop();
  }

  //Shows custom cursor, hides
  cursor() {
    push();
    noCursor();
    imageMode(CENTER);
    image(cursorImg, mouseX, mouseY);
    pop();
  }

  //Health system, game overs when it reaches 0%, has green gauge display
  //the *4 doesn't affect the percent, but enlarges the gauge
  health() {
    if (this.healthPercent <= 0) {
      state = `endGame`;
    }

    if (this.healthPercent < 100) {
      this.healthPercent++;
    }
    push();
    fill(100, 200, 100);
    rectMode(CENTER);
    rect(width / 2, 25, this.healthPercent * 4, 25);
    pop();
  }

  //Pushes and lets you shoot bullets, it now works, thanks to Pippin's help
  //Will introduce frameCount to not allow the player to spam shots.
  weaponAim() {
    //Shoots from player position
    let x = this.x;
    let y = this.y;

    //Takes mouseX and mouseY values, and lets it be used for angle/degrees, so
    //you can shoot where the mouse is pointed at (towards cursor).
    let dx = x - mouseX;
    let dy = y - mouseY;
    let angle = atan(dy / dx);

    if (dx > 0) {
      angle += PI;
    }

    //if ((rateOfFire = 45)) {
    //}
    let projectile = new PlayerProjectile(x, y, angle);

    projectile.speed = 10;
    projectileOut.push(projectile);
  }

  //Usual border block, simulates an arena
  border() {
    this.x = constrain(this.x, 0, width);
    this.y = constrain(this.y, 0, height);
  }
}
