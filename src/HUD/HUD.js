// HUD.js

import BaseScene from "../Scenes/BaseScene.js";

export default class HUD extends BaseScene {
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
    ctx.fillStyle = "white";
    ctx.font = "30px Arial";
    ctx.fillText(this.text, 10, 50);
  }

  setText(text) {
    this.text = text;
    return this;
  } 
}
