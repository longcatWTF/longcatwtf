// vim: set ts=2 sw=2:
"use strict";

function clip(x, min, max) { return Math.max(Math.min(x, max), min); }

class Physics {
  constructor() {
    this.py = 0;  // position
    this.vy = 0;  // velocity (speed)
    this.ay = 0;  // acceleration

    //this.g = 9.81;
    this.g = 1;
    this.v_max = 2;
    this.contact_time = 0;

    // For debugging only
    this.t = 0;
  }

  update(dt) {
    // dt = delta time (elapsed time since last update)

    // Update velocity according to acceleration.
    this.vy += (this.ay - this.g) * dt;

    // Limit the speed to v_max!
    this.vy = clip(this.vy, -this.v_max, this.v_max)

    // Update position according to velocity.
    this.py += this.vy * dt;

    // Only touch for some time.
    this.contact_time -= dt;
    if (this.contact_time < 0) {
      this.contact_time = this.ay = 0;
    }

    // Stop when we hit the floor.
    if (this.py < 0) {
      this.py = this.vy = this.ay = 0;
    }

    // All the rest is for debugging.
    this.t += dt;

    document.getElementById("dbg_y").innerHTML = this.py.toFixed(5);
    document.getElementById("dbg_v").innerHTML = this.vy.toFixed(5);
    document.getElementById("dbg_a").innerHTML = this.ay.toFixed(5);
    document.getElementById("dbg_t").innerHTML = this.t.toFixed(5);
  }

  speedup() {
    this.ay = 5.0;
    this.contact_time = 0.1;
  }

  get y_mm() { return this.py*1000; }
}
