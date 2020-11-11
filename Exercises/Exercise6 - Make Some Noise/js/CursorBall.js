class CursorBall extends Ball {
  constructor(x, y, note) {
    super(x, y, note);
    this.x = x;
    this.y = y;
    this.size = 50;
    this.fill = 255;
    this.speed = 0;
    this.vx = 0;
    this.vy = 0;

    //For oscillation
    this.oscillator = new p5.Oscillator();
    this.nearFreq = 220;
    this.farFreq = 440;
    this.oscillator.amp(0.025);
    this.oscillator.start();

    //For Synth
    this.note = note;
    this.synth = new p5.PolySynth();
  }

  move() {
    this.x = mouseX;
    this.y = mouseY;
    if (mouseIsPressed) {
      fill(255, 0, 0);
    } else {
      fill(this.fill);
    }
  }

  display() {
    pop();
    fill(this.fill);
    ellipse(mouseX, mouseY, this.size);
    push();
  }
}
