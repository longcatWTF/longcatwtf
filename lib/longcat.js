// vim: set ts=2 sw=2:
"use strict";

class LongCat {
  constructor(el, physics) {
    this.el = el;
    this.physics = physics;
  }

  update(dt) {
    this.el.style.transform = `translateY(-${this.physics.y_mm}mm)`;
  }
}
