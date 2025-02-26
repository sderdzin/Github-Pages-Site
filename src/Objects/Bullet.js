// Bullet.js

import BaseObject from '../Utils/BaseObject.js';

export default class Bullet extends BaseObject {
    constructor(that, x, y, w, h) {
        super();
        // Additional initialization if needed
        this.obj = that;
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.vx = 0;
        this.vy = 0;
        this.ax = 0;
        this.ay = 0;
        this.speed = -500;
        this.friction = 0.9;
        this.bounce = -0.7;
        this.create();
    }

    // Add methods and properties specific to ControllerObject
    create() {
    }

    update(dt) {
        // console.log("Bullet Update");
        this.vy = this.speed;
        this.y += this.vy * dt;

        this.checkBounds();
    }

    render(ctx) {
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    checkBounds() {
        if (this.y < 0) {
            this.setInactive();
        }
    }
}