class LongCat {
    constructor(id) {
        this.el = document.getElementById(id);
        this.y = 0
        this.vy = 0
        this.ay = 0
    }

    update(dt) {
        // TODO: Gravity
        //this.ay -= 9.81 * dt;
        this.vy += this.ay * dt;
        this.y += this.vy * dt;

        this.el.style.transform = `translateY(${this.y})`;
    }

    speedup() {
        this.ay += 0.1;
    }

    slowdown() {
        this.ay -= 0.1;
    }
}
