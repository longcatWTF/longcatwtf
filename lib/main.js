var the_long_cat = new LongCat('the_long_cat');

window.requestAnimationFrame = window.requestAnimationFrame
                            || window.mozRequestAnimationFrame
                            || window.webkitRequestAnimationFrame
                            || window.msRequestAnimationFrame
                            || function(cb) { window.setTimeout(cb, 1000/60); };

// Rather use window.performance if it's available.
// It has sub-millisecond precision, while Date.now only has milliseconds.
var rtc = window.performance || Date;
var t0 = rtc.now();

function mainloop() {
    var t = rtc.now();
    var dt = 0.001*(t - t0);

    // When the tab gets hidden, this animate loop is not called, which is good
    // as it pauses the game. But when the tab gets visible again, the dt is huge:
    // as large as the tab was hidden. We don't want this, as it undoes the pause.
    // so we only update on small dt.
    if (dt < 0.5) {
        the_long_cat.update(dt)

        // TODO: More updates (background)
    }

    // For the next timestep.
    t0 = t;
    window.requestAnimationFrame(mainloop);
}
window.requestAnimationFrame(mainloop);
