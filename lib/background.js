// vim: set ts=2 sw=2:
"use strict";

class Background {
  constructor(el, physics) {
    this.el = el;
    this.physics = physics;
  }

  update(dt) {
    let phys_y = this.physics.y_mm;

    // But the physics' y doesn't correspond to where we want to be on-screen.
    // We want to stop in the middle of the screen.

    this.el.style.transform = `translateY(${this.physics.y_bg_mm}mm)`;
  }
}
