// vim: set ts=2 sw=2:
class LongCat {
  constructor(id) {
    this.el = document.getElementById(id);
    this.y = 0;
    this.vy = 0;  // velocity (speed)
    this.ay = 0;  // acceleration
  }

  update(dt) {
    // dt = delta time (elapsed time since last update)

    // TODO: Gravity
    //this.ay -= 9.81 * dt;
    this.vy += this.ay * dt;
    this.y += this.vy * dt;

    this.el.style.transform = `translateY(${this.y})`;
  }

  speedup() {
    this.ay += 0.1;
  }

  slowdown() {
    this.ay -= 0.1;
  }
}
