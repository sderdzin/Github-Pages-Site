// StartScene.js

import BaseScene from "./BaseScene.js";
import Button from "../Layout/Button.js";

export default class StartScene extends BaseScene {
  constructor(that) {
    super();
    this.game = that;
    this.objects = [];
    this.create();
    // console.log(this);
  }

  create() {
    let x = window.innerWidth / 2;
    let y = (window.innerHeight / 8) * 3;
    this.objects.push(
      new Button(this.game, x - 100, y, 300, 80).setText("PLAY").setEventFunction(this.createPlayFunction.bind(this))
    );
  }

  update(dt) {}

  render(ctx) {
    // console.log("Rendering");
    ctx.fillStyle = `rgb(112, 128, 144)`;
    ctx.fillRect(0, 0, this.game.canvas.width, this.game.canvas.height);

    this.objects.forEach((obj) => {
      obj.render(ctx);
    });
  }

  createPlayFunction() {
    console.log("Play", this);
    // this.setInactive();
    // console.log(this);
    this.objects.forEach(obj => {
        if(obj.constructor.name === "Button") {
            obj.destroyEventListener();
            // obj.game.canvas.removeEventListener('click', obj.eventFunction);
        }
    });
    this.game.changeScene("PlayScene", this);
  }
}
