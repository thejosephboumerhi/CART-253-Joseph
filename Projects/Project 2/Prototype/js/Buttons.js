//
class Buttons {
  constructor(x, y) {
    this.x = 0;
    this.y = 0;
    this.w = 175;
    this.h = 100;
  }

  //Press this to play the game
  playButton() {
    push();
    fill(200, 200, 0);
    rect(width / 1.5, height / 3, this.w, this.h);
    pop();
  }

  //Press this to read the instructions
  howToPlayButton() {
    push();
    fill(50, 200, 50);
    rect(width / 1.5, height / 1.5, this.w, this.h);
    pop();
  }

  //Press this to go back to title
  backToTitleButton() {
    push();
    fill(200);
    rect(width / 1.5, height / 1.5, this.w, this.h);
    pop();
  }
}
