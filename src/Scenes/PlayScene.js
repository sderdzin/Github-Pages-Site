// PlayScene.js

import BaseScene from "./BaseScene.js";
import Button from "../Layout/Button.js";

export default class PlayScene extends BaseScene {
    constructor(that) {
        super();
        this.game = that;
        this.objects = [];
        this.create();
        // console.log(this);
    }

    create() {
        // let x = window.innerWidth / 2;
        // let y = (window.innerHeight / 8) * 3;
        // this.objects.push(new Button(this.game, x - 100, y, 300, 80).setText("PLAY"));
    }

    setActive() {
        super.setActive();
        console.log(this.game);
        let hud = this.game.scenes.find(scene => scene.constructor.name === "HUD");
        hud.setText("Play Scene");
        return this;
    }

    update(dt) {
        this.objects.forEach(obj => {
            obj.update(dt);
        });
    }

    render(ctx) {
        // console.log("Rendering");
        this.setBackground(ctx);
        this.objects.forEach(obj => {
            obj.render(ctx);
        });
    }

    setBackground(ctx) {
        ctx.fillStyle = `rgb(112, 128, 144)`;
        ctx.fillRect(0, 0, this.game.canvas.width, this.game.canvas.height);
    }
}