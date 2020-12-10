//
class PlayButton extends Buttons {
  constructor(x, y) {
    super(x, y);
    this.x = width / 1.5;
    this.y = height / 3;
    this.w = 175;
    this.h = 100;
  }

  displayButton() {
    super.displayButton();
    push();
    fill(200, 200, 0);
    rect(this.x, this.y, this.w, this.h);
    textAlign(CENTER, CENTER);
    textSize(30);
    fill(75, 0, 130);
    stroke(0);
    text(`Play`, this.x, this.y, this.w, this.h);
    pop();
  }
}
