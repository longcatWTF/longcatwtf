// vim: set ts=2 sw=2:
"use strict";

function clip(x, min, max) {
  if (max !== undefined) {
    x = Math.min(x, max);
  }
  return Math.max(x, min);
}

class Physics {
  constructor() {
    this.py = 0;  // position
    this.vy = 0;  // velocity (speed)
    this.ay = 0;  // acceleration

    //this.g = 9.81;
    this.g = 1;  // downwards acceleration (G-force)
    this.v_max = 20;
    this.contact_time = 0;

    this.mid_screen = 100;  // In mm for now.

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
    //this.ay = 14.0;
    //this.ay = 5.0;
    this.vy = 0.4;  // Flappy-birds like physics.
    //this.contact_time = 0.1;

    // Just because of debug, reset this too!
    this.g = 1;  // downwards acceleration (G-force)
  }

  get y_longcat_mm() {
    return clip(this.py*1000, 0, this.mid_screen);
  }

  get y_bg_mm() {
    return clip(this.py*1000 - this.mid_screen, 0);
  }
}
