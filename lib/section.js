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

    // brightness
    this.brightness = this.physics.y_bg_mm / 1000;
    if (this.brightness < 1) {
      this.el.style.filter = `brightness(${this.brightness})`;
    }

  }
}

class EarthSection extends Section {
  constructor(el, physics) {
    super(el, physics);
    this.elGulli = this.el.querySelector('.section-earth__gulli');
    console.log(this.elGulli);
  }

  update(dt) {
    super.update(dt);

    // gulli
    const gullipos = 680;
    if (this.physics.y_bg_mm > gullipos) {
      const movement = this.physics.y_bg_mm - gullipos;
       this.elGulli.style.transform = `rotate(-${movement}deg)
                                       translate(${movement * 2}px, -${movement * 4}px)`;
    }

  }
}
