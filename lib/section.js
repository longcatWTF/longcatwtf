// vim: set ts=2 sw=2:
"use strict";

class Section {
  constructor(el, physics) {
    this.el = el;
    this.physics = physics;
  }

  update(dt) {
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
  }

  update(dt) {
    super.update(dt);

    // gulli
    const gullistart = 7.8, gulliend = 10.0;
    if (gullistart < this.physics.score && this.physics.score < gulliend) {
      const movement = (this.physics.score - gullistart)*100;
      this.elGulli.style.transform = `rotate(-${movement}deg) `
                                   + `translate(${movement * 2}px, -${movement * 4}px)`;
    }

  }
}

class BuildingsSection extends Section {
  constructor(el, physics) {
    super(el, physics);
    this.buildings = this.el.querySelectorAll('.section__element');
  }

  update(dt) {
    super.update(dt);

    const start = 7, end = 15.0;
    if (start < this.physics.score && this.physics.score < end) {
      const movement = this.physics.score - start * 2;

      for(let i = 0, il = this.buildings.length; i < il; i++) {
        const e = this.buildings[i];
        const move = movement * (i * 7);

        e.style.transform = `translateY(${move}mm)`;
      }

    }
  }
}
