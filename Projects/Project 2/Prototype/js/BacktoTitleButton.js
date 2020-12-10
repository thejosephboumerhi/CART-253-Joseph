//
class BackToTitleButton extends Buttons {
  constructor(x, y) {
    super(x, y);
    this.x = width / 2;
    this.y = height / 1.5;
    this.w = 175;
    this.h = 100;
  }

  displayButton() {
    super.displayButton();
    push();
    fill(50, 200, 50);
    rect(this.x, this.y, this.w, this.h);
    pop();
  }
}
