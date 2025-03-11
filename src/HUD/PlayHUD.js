// PlayHUD.js

import BaseHUD from "./BaseHUD.js";

export default class PlayHUD extends BaseHUD {
  constructor(that, score) {
    super();
    this.game = that;
    this.score = score;
    this.active = true;
    this.zIndex = 5;
    this.text = "SCORE:";
    this.width = this.game.width;
    this.height = this.game.height;
    this.x = this.width - 250;
    this.y = 50;
    console.log(this);
    this.create();
  }

  create() {
    // this.active = true;
    // this.zIndex = 5;
  }

  update(dt) {

  }

  render(ctx) {
    ctx.strokeStyle = "red";
    ctx.strokeRect(0, 0, this.width, this.height);
    ctx.fillStyle = "white";
    ctx.font = this.font;
    ctx.fillText(this.text + `${this.score}`, this.x, this.y);
  }

  setText(text) {
    this.text = text;
    return this;
  } 
}
