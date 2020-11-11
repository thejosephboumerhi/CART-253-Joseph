class Ball {
  constructor(x, y, note) {
    this.x = x;
    this.y = y;
    this.size = undefined;
    this.fill = undefined;
    this.speed = undefined;
    this.vx = undefined;
    this.vy = undefined;

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

  move() {}

  bounce() {
    if (this.x - this.size / 2 < 0 || this.x + this.size / 2 > width) {
      this.vx = -this.vx;
      this.playNote();
    }
    if (this.y - this.size / 2 < 0 || this.y + this.size / 2 > height) {
      this.vy = -this.vy;
    }
  }

  playNote() {
    this.synth.play(this.note, 0.4, 0, 0.1);
  }

  display() {}
}
