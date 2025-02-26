// BaseControllerObject.js is a class that extends BaseObject and is used to create objects that are controlled by the user.

import BaseObject from '../Utils/BaseObject.js';
import { Controller } from '../Utils/Controller.js';

export default class BaseControllerObject extends BaseObject {
    constructor(that, x, y, w, h) {
        super();
        // Additional initialization if needed
        this.game = that;
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.vx = 0;
        this.vy = 0;
        this.ax = 0;
        this.ay = 0;
        this.speed = 100;
        this.friction = 0.9;
        this.bounce = -0.7;
        this.create();
    }

    // Add methods and properties specific to ControllerObject
    create() {
    }

    update(dt) {}

    render(ctx) {}
}