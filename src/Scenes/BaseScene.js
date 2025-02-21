// BaseScene.js

export default class BaseScene {
    constructor() {
        this.active = false;
        this.zIndex = -1;
        return this;
    }

    create() {}

    update(dt) {}

    render(ctx) {}

    setActive() {
        this.active = true;
        return this;
    }

    setInactive() {
        this.active = false;
    }

    destroy() {
        this.active = false;
        this.zIndex = -1;
    }
}