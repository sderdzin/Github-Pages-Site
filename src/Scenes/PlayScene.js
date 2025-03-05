// PlayScene.js

import BaseScene from "./BaseScene.js";
import Button from "../Layout/Button.js";
import Player from "../Objects/Player.js";
import Enemy1 from "../Objects/Enemies/Enemy1.js";
import { CollisionDetection } from "../Utils/CollisionDetection.js";
import * as Krazy from "../Utils/CollisionDetection.js";

export default class PlayScene extends BaseScene {
    constructor(that) {
        super();
        this.game = that;
        this.objects = [];
        this.player = null;
        // this.create();

        this.colDet = Krazy.CollisionDetection.rectCircleIntersect;
        // console.log(this.colDet);
    }

    create() {
        this.player = new Player(this.game, 100, 100, 50, 50);
        this.enemy = new Enemy1(this.game, 200, 200, 50, 50);
        this.objects.push(this.player);
        this.objects.push(this.enemy);
        // let x = window.innerWidth / 2;
        // let y = (window.innerHeight / 8) * 3;
        // this.objects.push(new Button(this.game, x - 100, y, 300, 80).setText("PLAY"));
    }

    setActive() {
        super.setActive();
        this.create();
        console.log(this.game);
        let hud = this.game.scenes.find(scene => scene.constructor.name === "HUD");
        hud.setText("Play Scene");
        return this;
    }

    update(dt) {
        // console.log("Updating");

        this.objects.forEach(obj => {
            obj.update(dt);
        });

        let bullets = this.player.objects.filter(obj => obj.active);

        if (bullets.length > 0) {
            bullets.forEach(bullet => {
                if (this.colDet(bullet, this.enemy)) {
                    // bullet.active = false;
                    bullet.setInactive();
                    this.enemy.active = false;
                    console.log("Collision detected");
                }
            });
        };
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