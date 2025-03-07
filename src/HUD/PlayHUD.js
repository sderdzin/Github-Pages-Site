// PlayHUD.js

import BaseScene from "../Scenes/BaseScene.js";

export default class PlayHUD extends BaseScene {
  constructor(that, score) {
    super();
    this.game = that;
    this.score = score;
    this.active = true;
    this.zIndex = 5;
    this.text = "SCORE:";
    this.width = this.game.width;
    this.height = this.game.height;
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
    ctx.font = "30px Arial";
    ctx.fillText(this.text + `${this.score}`, this.width - 250, 50);
  }

  setText(text) {
    this.text = text;
    return this;
  } 
}
