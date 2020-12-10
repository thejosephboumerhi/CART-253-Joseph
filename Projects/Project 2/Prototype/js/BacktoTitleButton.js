//
class BackToTitleButton extends Buttons {
  constructor(x, y) {
    super(x, y);
    this.x = width / 2.3;
    this.y = height / 1.2;
    this.w = 175;
    this.h = 100;
  }

  displayButton() {
    super.displayButton();
    push();
    fill(50, 200, 50);
    rect(this.x, this.y, this.w, this.h);
    textAlign(CENTER, CENTER);
    textSize(25);
    fill(75, 0, 130);
    stroke(0);
    text(`Back To Menu`, this.x, this.y, this.w, this.h);
    pop();
  }
}
