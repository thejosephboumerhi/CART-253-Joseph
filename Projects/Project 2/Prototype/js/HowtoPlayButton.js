//
class HowToPlayButton extends Buttons {
  constructor(x, y) {
    super(x, y);
    this.x = width / 1.5;
    this.y = height / 1.5;
    this.w = 175;
    this.h = 100;
  }

  displayButton() {
    super.displayButton();
    push();
    fill(200, 50, 50);
    rect(this.x, this.y, this.w, this.h);
    textAlign(CENTER, CENTER);
    textSize(25);
    fill(75, 0, 130);
    stroke(0);
    text(`How To Play`, this.x, this.y, this.w, this.h);
    pop();
  }
}