// vim: set ts=2 sw=2:
"use strict";

class LongCat {
  constructor(el, physics) {
    this.el = el;
    this.physics = physics;

    this.head_el = el.querySelector('.longcat__head');
    this.head_base_transform = 'translateY(-100%)';
    this.head_t = 0;
    this.mouth_el = el.querySelector('.longcat__mouth');
  }

  update(dt) {
    this.el.style.transform = `translateY(-${this.physics.y_longcat_mm}mm)`;

    // Make the head wiggle, depending on velocity, by computing a head's own
    // "time" that increases using absolute value of velocity.
    this.head_t += dt*Math.abs(this.physics.vy)*10;
    let head_deg = 15*Math.sin(this.head_t);
    let head_x = Math.cos(this.head_t);
    let head_transform = this.head_base_transform + ` translateX(${head_x}%) rotateZ(${head_deg}deg)`;
    this.head_el.style.transform = head_transform;
    this.mouth_el.style.transform = head_transform;
  }
}
