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
        this.maxEnemies = 10;
        this.objects = [];
        this.enemies = [];
        this.player = null;
        this.activeEnemies = null;
        // this.create();

        this.colDet = Krazy.CollisionDetection.rectCircleIntersect;
        // console.log(this.colDet);
    }

    create() {
        this.player = new Player(this.game, 100, 100, 50, 50);
        this.objects.push(this.player);
        
        this.initEnemies();

        // this.enemy = new Enemy1(this.game, 200, 200, 50, 50);
        // this.enemies.push(this.enemy);
        
        // this.objects.push(this.enemy);
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

        this.activeEnemies = this.enemies.filter(enemy => enemy.active);
        
        this.activeEnemies.forEach(enemy => {
            enemy.update(dt);
        });

        this.objects.forEach(obj => {
            obj.update(dt);
        });

        let bullets = this.player.objects.filter(obj => obj.active);

        if (bullets.length > 0) {
            this.activeEnemies.forEach(enemy => {
                bullets.forEach(bullet => {
                    if (this.colDet(bullet, enemy)) {
                        // bullet.active = false;
                        this.handleCollision(bullet, enemy);
                        console.log("Number of enemies: ", this.activeEnemies.length, this.activeEnemies);
                        // bullet.setInactive();
                        // this.enemy.active = false;
                        // console.log("Collision detected");
                    }
                });
            });
        };
    }

    render(ctx) {
        // console.log("Rendering");
        this.setBackground(ctx);
        
        this.objects.forEach(obj => {
            obj.render(ctx);
        });

        this.activeEnemies.forEach(enemy => {
            enemy.render(ctx);
        });
    }

    setBackground(ctx) {
        ctx.fillStyle = `rgb(112, 128, 144)`;
        ctx.fillRect(0, 0, this.game.canvas.width, this.game.canvas.height);
    }

    initEnemies() {
        for (let i = 0; i < this.maxEnemies; i++) {
            let x = Math.random() * this.game.canvas.width;
            let y = Math.random() * this.game.canvas.height;
            let enemy = new Enemy1(this.game, x, y, 50, 50).setRadius(50);
            this.enemies.push(enemy);
            // this.objects.push(enemy);
        }
    }

    handleCollision(bullet, enemy) {
        console.log("Enemy Size: ", enemy.r*2);
        const enemySize = enemy.r;

        bullet.setInactive();
        enemy.setInactive();

        console.log(enemySize);

        if (enemySize > 10) {
            let newR = enemySize / 2;

            console.log("New Radius: ", newR);

            let x = enemy.x;
            let y = 10;

            let enemy1 = new Enemy1(this.game, x, y).setRadius(newR);
            this.enemies.push(enemy1);

            // let x1 = enemy.x;
            // let y1 = enemy.y;
            // let x2 = enemy.x + enemySize;
            // let y2 = enemy.y + enemySize;
            // let x3 = enemy.x + newR;
            // let y3 = enemy.y + newR;

            // let enemy1 = new Enemy1(this.game, x1, y1);
            // let enemy2 = new Enemy1(this.game, x2, y1);
            // let enemy3 = new Enemy1(this.game, x1, y2);
            // let enemy4 = new Enemy1(this.game, x2, y2);

            // enemy1.r = newR;
            // enemy2.r = newR;
            // enemy3.r = newR;
            // enemy4.r = newR;

            // this.enemies.push(enemy1, enemy2, enemy3, enemy4);
        }
        
        // bullet.active = false;
        // this.enemy.active = false;
    }   
}