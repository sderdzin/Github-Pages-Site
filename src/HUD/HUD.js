// HUD.js

import BaseHUD from "./BaseHUD.js";

export default class HUD extends BaseHUD {
  constructor(that) {
    super();
    this.game = that;
    this.active = true;
    this.zIndex = 5;
    this.text = "Color in RGB Value:" + `R:112, G:128, B:144`;
    this.create();
  }

  create() {
    // this.active = true;
    // this.zIndex = 5;
  }

  update(dt) {

  }

  render(ctx) {
    ctx.fillStyle = this.color;
    ctx.font = this.font;
    ctx.fillText(this.text, this.x, this.y);
  }

  setText(text) {
    this.text = text;
    return this;
  } 
}
