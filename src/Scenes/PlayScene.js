// PlayScene.js

import BaseScene from "./BaseScene.js";
import Button from "../Layout/Button.js";
import Player from "../Objects/Player.js";
import Enemy1 from "../Objects/Enemies/Enemy1.js";
import { CollisionDetection } from "../Utils/CollisionDetection.js";
import * as Krazy from "../Utils/CollisionDetection.js";
import PlayHUD from "../HUD/PlayHUD.js";
import Platform from "../Objects/Obstacles/Platform.js";

export default class PlayScene extends BaseScene {
  constructor(that) {
    super();
    this.game = that;
    this.maxEnemies = 10;
    this.objects = [];
    this.enemies = [];
    this.player = null;
    this.activeEnemies = null;
    this.score = 0;
    this.autoFireEnabled = false;

    // this.create();

    this.colDet = Krazy.CollisionDetection.rectCircleIntersect;
    this.colDetRectRect = Krazy.CollisionDetection.rectIntersect;
    // console.log(this.colDet);
  }

  create() {
    this.player = new Player(this.game, 100, this.game.height - 75, 50, 50);
    this.objects.push(this.player);

    let floor = new Platform(
      this.game,
      0,
      this.game.height - 50,
      this.game.width,
      50
    );
    this.objects.push(floor);

    this.hud = new PlayHUD(this.game, this.score);
    // this.objects.push(this.hud);

    this.initEnemies();
  }

  setActive() {
    super.setActive();
    this.create();
    console.log(this.game);
    let hud = this.game.scenes.find(
      (scene) => scene.constructor.name === "HUD"
    );
    hud.setText("Play Scene");
    return this;
  }

  update(dt) {
    // console.log("Updating");

    // let objPosZIndex = this.objects.map(obj => obj.zIndex);
    // let sortedObjects = this.objects.sort((a, b) => a.zIndex - b.zIndex);
    // console.log("Sorted Objects: ", sortedObjects);

    if (this.autoFireEnabled) {
      this.player.fire();
    }

    this.activeEnemies = this.enemies.filter(
      (enemy) => enemy.active && enemy.collisionEnabled
    );
    let collidableObjects = this.objects.filter((obj) => obj.collisionEnabled);
    let staticObjects = this.objects.filter((obj) => !obj.collisionEnabled);

    // collidableObjects = collidableObjects.concat(this.activeEnemies);

    // console.log("Collidable Objects: ", collidableObjects);

    this.activeEnemies.forEach((enemy) => {
      enemy.update(dt);
    });

    collidableObjects.forEach((obj) => {
      obj.update(dt);

      if (this.player === obj) {
        return;
      }

      if (this.colDetRectRect(obj, this.player)) {
        // console.log("Collision detected");
        this.hud.x = 100;
        this.hud.y = 100;
        this.hud.setText(
          "Colliding with player" +
            obj.constructor.name +
            collidableObjects.length +
            "\n\n"
        );
        this.player.y = obj.y - this.player.height;
      }
    });

    staticObjects.forEach((obj) => {
      obj.update(dt);
    });

    let bullets = this.player.objects.filter((obj) => obj.active);
    let platforms = this.objects.filter((obj) => obj.constructor.name === "Platform");

    this.activeEnemies.forEach((enemy) => {
      if (bullets.length > 0) {
        bullets.forEach((bullet) => {
          if (this.colDet(bullet, enemy)) {
            this.handleCollision(bullet, enemy);
          }
        });
      }

      // console.log("Enemy Y: ", enemy.y, this.game.height / 2);

      if (enemy.y > this.game.height / 2) {

        if (this.colDet(platforms[0], enemy)) {
          enemy.y = platforms[0].y - enemy.r;
          // enemy.y = this.game.canvas.height - this.r;
          enemy.vy *= enemy.bounce;
          // this.handleCollision(bullet, enemy);
          // this.hud.x = 100;
          // this.hud.y = 100;
          // let text = this.hud.text;
          // text = text + this.game.height + enemy.y;
          // this.hud.setText(text);
        }
      }
    });

    // if (this.colDet(collidableObjects[0], enemy)) {
    //     // this.handleCollision(bullet, enemy);
    //     this.hud.x = 100;
    //     this.hud.y = 100;
    //     let text = this.hud.text;
    //     text = text + enemy.constructor.name;
    //     this.hud.setText(text);
    // }

    this.hud.update(dt);
  }

  render(ctx) {
    // console.log("Rendering");
    this.setBackground(ctx);

    this.activeEnemies.forEach((enemy) => {
      enemy.render(ctx);
    });

    this.objects.forEach((obj) => {
      obj.render(ctx);
    });

    this.hud.render(ctx);
  }

  setBackground(ctx) {
    ctx.fillStyle = `rgb(46, 53, 59)`;
    ctx.fillRect(0, 0, this.game.canvas.width, this.game.canvas.height);
  }

  initEnemies() {
    for (let i = 0; i < this.maxEnemies; i++) {
      let x = Math.random() * this.game.canvas.width;
      let y = -10;
      let enemy = new Enemy1(this.game, x, y, 50, 50).setRadius(50);
      this.enemies.push(enemy);
      // this.objects.push(enemy);
    }
  }

  handleCollision(bullet, enemy) {
    // console.log("Enemy Size: ", enemy.r*2);
    this.score += 10;
    this.hud.score = this.score;
    const enemySize = enemy.r;

    bullet.setInactive();
    enemy.setInactive();

    // console.log(enemySize);

    if (enemySize > 10) {
      let newR = enemySize / 2;

      // console.log("New Radius: ", newR);

      let x = enemy.x;
      let y = enemy.y;
      let vx1 = Math.random() * 50 - 25;
      let vy1 = Math.random() * 20 - 20;
      let vx2 = Math.random() * 50 - 25;
      let vy2 = Math.random() * 20 - 20;

      let enemy1 = new Enemy1(this.game, x, y)
        .setRadius(newR)
        .setXYVelocity(vx1, vy1);
      let enemy2 = new Enemy1(this.game, x, y)
        .setRadius(newR)
        .setXYVelocity(vx2, vy2);

      this.enemies.push(enemy1, enemy2);
    }

    // bullet.active = false;
    // this.enemy.active = false;
  }
}
