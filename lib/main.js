// vim: set ts=2 sw=2:
"use strict";

let the_physics = new Physics();
let the_longcat = new LongCat(document.querySelector('.longcat'), the_physics);
let sections = setupSections();

function setupSections() {
  const allSections = document.querySelectorAll('.section');
  let sections = [];

  sections[0] = new WallSection(allSections[0], the_physics);
  sections[1] = new EarthSection(allSections[1], the_physics);
  sections[2] = new Section(allSections[2], the_physics);

  return sections;
}

window.requestAnimationFrame = window.requestAnimationFrame
                            || window.mozRequestAnimationFrame
                            || window.webkitRequestAnimationFrame
                            || window.msRequestAnimationFrame
                            || function(cb) { window.setTimeout(cb, 1000/60); };

// Rather use window.performance if it's available.
// It has sub-millisecond precision, while Date.now only has milliseconds.
let rtc = window.performance || Date;
let t0 = rtc.now();

function mainloop() {
  let t = rtc.now();
  let dt = 0.001*(t - t0);  // from milliseconds to seconds

  // When the tab gets hidden, this animate loop is not called, which is good
  // as it pauses the game. But when the tab gets visible again, the dt is huge:
  // as large as the tab was hidden. We don't want this, as it undoes the pause.
  // so we only update on small dt.
  if (dt < 0.5) {
    the_physics.update(dt);
    the_longcat.update(dt);

    sections.forEach(section => {
      section.update(dt);
    });
  }

  // For the next timestep.
  t0 = t;
  window.requestAnimationFrame(mainloop);
}
window.requestAnimationFrame(mainloop);


function raise_longcat(ev) {
  // Avoid stuff like drag/drop selection etc.
  ev.preventDefault();

  the_physics.speedup();
}

// A click raises the longcat!
window.addEventListener('mousedown', raise_longcat);
window.addEventListener('touchstart', raise_longcat);

// Some cheats for testing
window.addEventListener('keyup', (ev) => {
  ev.preventDefault();
  if (ev.key == 'ArrowUp') {
    the_physics.g = 0;
    the_physics.vy += 0.01;
  } else if (ev.key == 'ArrowDown') {
    the_physics.g = 0;
    the_physics.vy -= 0.01;
  } else if (ev.key == ' ') {
    the_physics.g = 0;
    the_physics.vy = 0;
    the_physics.a = 0;
  }
  console.log(ev.key)
})

window.addEventListener('keydown', (ev) => { ev.preventDefault(); });
