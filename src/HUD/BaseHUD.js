// BaseHUD.js

export default class BaseHUD {
    constructor() {
        this.x = 10;
        this.y = 10;
        this.active = false;
        this.zIndex = -1;
        this.fontSize = 30;
        this.fontFamily = "Arial";
        this.font = `${this.fontSize}px ${this.fontFamily}`;
        this.color = "white";

        return this;
    }

    create() {
        this.active = true;
    }

    update(dt) {}

    render(ctx) {}

    setX(x) {
        this.x = x;
        return this;
    }

    setY(y) {
        this.y = y;
        return this;
    }

    setXY(x, y) {
        this.x = x;
        this.y = y;
        return this;
    }

    setText(text) {
        this.text = text;
        return this;
    }

    setFontFamily(fontFamily) {
        this.fontFamily = fontFamily;
        this.font = `${this.fontSize}px ${this.fontFamily}`;
        return this;
    }

    setFontSize(fontSize) {
        this.fontSize = fontSize;
        this.font = `${this.fontSize}px ${this.fontFamily}`;
        return this;
    }

    setFont(fontFamily, fontSize) {
        this.fontFamily = fontFamily;
        this.fontSize = fontSize;
        this.font = `${this.fontSize}px ${this.fontFamily}`;
        return this;
    }

    setZIndex(zIndex) {
        this.zIndex = zIndex;
        return this;
    }

    setActive() {
        // this.create();
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