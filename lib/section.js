// vim: set ts=2 sw=2:
"use strict";

class Section {
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

class WallSection extends Section {
  constructor(el, physics) {
    super(el, physics);
    this.brightness = 0;
  }

  update(dt) {
    super.update(dt);
    this.brightness = this.physics.y_bg_mm / 1000;
    if (this.brightness < 1) {
      this.el.style.filter = `brightness(${this.brightness})`;
    }
  }
}
