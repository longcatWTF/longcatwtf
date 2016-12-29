// vim: set ts=2 sw=2:
"use strict";

let preloader = document.querySelector('.preloader');
let preloaderText = preloader.querySelector('.preloader__text');
let the_physics = new Physics();
let the_longcat = new LongCat(document.querySelector('.longcat'), the_physics);
let sections = setupSections();

function setupSections() {
  const allSections = document.querySelectorAll('.section');
  let sections = [];

  sections[0] = new WallSection(allSections[0], the_physics);
  sections[1] = new EarthSection(allSections[1], the_physics);
  sections[2] = new Section(allSections[2], the_physics);  // street
  sections[3] = new BuildingsSection(allSections[3], the_physics);
  sections[4] = new Section(allSections[4], the_physics); // clouds
  sections[5] = new Section(allSections[5], the_physics); // aerspace one
  sections[6] = new InfiniteStartSection(allSections[6], the_physics); // infinite start

  return sections;
}

window.requestAnimationFrame = window.requestAnimationFrame
                            || window.mozRequestAnimationFrame
                            || window.webkitRequestAnimationFrame
                            || window.msRequestAnimationFrame
                            || function(cb) { window.setTimeout(cb, 1000/60); };

const score_el = document.querySelector('.score__number');
const highs_el = document.querySelector('.score__number--high');

// Rather use window.performance if it's available.
// It has sub-millisecond precision, while Date.now only has milliseconds.
const rtc = window.performance || Date;
let t0 = rtc.now();
let high_score = 0;

function mainloop() {
  let t = rtc.now();
  let dt = 0.001*(t - t0);  // from milliseconds to seconds

  // When the tab gets hidden, this animate loop is not called, which is good
  // as it pauses the game. But when the tab gets visible again, the dt is huge:
  // as large as the tab was hidden. We don't want this, as it undoes the pause.
  // so we only update on small dt.
  if (dt < 0.5) {
    dt = the_physics.update(dt);
    the_longcat.update(dt);

    sections.forEach(section => {
      section.update(dt);
    });

    // Update the titlebar according to the score.
    document.title = `Longcat is lo${'o'.repeat(the_physics.score)}ng!`

    // Update the score itself and the high-score.
    high_score = Math.max(high_score, the_physics.score);
    score_el.innerHTML = the_physics.score.toFixed(1);
    highs_el.innerHTML = high_score.toFixed(1);
  }

  // For the next timestep.
  t0 = t;
  window.requestAnimationFrame(mainloop);
}
window.requestAnimationFrame(mainloop);


function raise_longcat(ev) {
  // remove preloader
  if(preloader) {
    document.body.removeChild(preloader);
    preloader = false;
  }
  // Avoid stuff like drag/drop selection etc.
  ev.preventDefault();

  // Meow when we get starteeeed!
  if (the_physics.score == 0) {
      the_longcat.meow();
  }

  the_physics.speedup();
}

function init() {
  // preloader to instructions
  preloader.classList.add('preloader--loaded');
  preloaderText.classList.add('preloader__text--loaded');
  preloaderText.innerHTML = 'click or tap as fast as you can !!!!';

  // A click raises the longcat!
  // Using the end events because many things aren't permitted during start,
  // and because touch_click combos are complicated (http://stackoverflow.com/q/14486804).
  window.addEventListener('mouseup', raise_longcat);
  window.addEventListener('touchend', raise_longcat);

  // Tweet score.
  document.querySelector('.tweet').addEventListener('click', ev => {
    ev.preventDefault();
    window.open(
      `http://twitter.com/intent/tweet?text=Beat my highscore of ${high_score.toFixed(2)}km` +
      `&url=${encodeURIComponent("http://longcat.wtf")}` +
      `&hashtags=longcat,longcatwtf`,
      '_blank'
    );
  });
}

// Some cheats for testing
window.addEventListener('keyup', (ev) => {
  ev.preventDefault();
  if (ev.key == 'ArrowUp' || ev.key == 'Up') {
    the_physics.g = 0;
    the_physics.vy += 0.01;
  } else if (ev.key == 'ArrowDown' || ev.key == 'Down') {
    the_physics.g = 0;
    the_physics.vy -= 0.01;
  } else if (ev.key == '+' || ev.key == 'Add') {
    the_physics.vy = 1;
  } else if (ev.key == ' ') {
    the_physics.g = 0;
    the_physics.vy = 0;
    the_physics.a = 0;
  }
  console.log(ev.key)
})

window.addEventListener('keydown', (ev) => { ev.preventDefault(); });

window.onload = function() {
  init();
};
