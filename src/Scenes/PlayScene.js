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

    this.hud = new PlayHUD(this.game, this.score).setFontSize(16).setY(15);
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
        this.player.y = obj.y - this.player.height;
        this.player.isJumping = false;
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
            this.handleProjectileCollision(bullet, enemy);
          }
        });
      }

      if (enemy.y > this.game.height / 2) {
        if (this.colDet(platforms[0], enemy)) {
          this.handleBoundaryCollision(platforms[0], enemy);
        }

        if (this.colDet(this.player, enemy)) {
          this.handleObj2ObjCollision(this.player, enemy);
        }
      }
    });

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
    this.maxEnemies = 1;
    for (let i = 0; i < this.maxEnemies; i++) {
      let x = Math.random() * this.game.canvas.width;
      let y = Math.random() * 425 - 450;
      let r = Math.random() * 50 + 25;
      // console.log(y);
      let enemy = new Enemy1(this.game, x, y, 50, 50).setRadius(r);
      this.enemies.push(enemy);
      // this.objects.push(enemy);
    }
  }

  handleProjectileCollision(bullet, enemy) {
    // console.log("Enemy Size: ", enemy.r*2);
    this.score += 10;
    this.hud.score = this.score;
    const enemySize = enemy.r;

    bullet.setInactive();
    enemy.setInactive();

    // console.log(enemySize);

    if (enemySize > 10) {
      let newR = enemySize / 1.5;

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

  handleBoundaryCollision(obj1, obj2) {
    // console.log("Checking Boundary Collision...");
    obj2.y = obj1.y - obj2.r;
    // enemy.y = this.game.canvas.height - this.r;
    obj2.vy *= obj2.bounce;
  }

  handleObj2ObjCollision(obj1, obj2) {
    // console.log("Checking Object Collision...");
    console.log("Checking Object Collision (UP, DOWN, LEFT, RIGHT)...");
   
    // Define boundaries for the rectangle (obj1)
    let obj1Top = obj1.y;
    let obj1Bottom = obj1.y + obj1.height;
    let obj1Left = obj1.x;
    let obj1Right = obj1.x + obj1.width;

    // Define boundaries for the circle (obj2)
    let obj2Top = obj2.y - obj2.r;
    let obj2Bottom = obj2.y + obj2.r;
    let obj2Left = obj2.x - obj2.r;
    let obj2Right = obj2.x + obj2.r;

    const epsilon = 0.001; // Small buffer for stability

    // Determine the depth of overlap for each side
    // let overlapTop = obj1Bottom - obj2Top;
    // let overlapBottom = obj2Bottom - obj1Top;
    // let overlapLeft = obj1Right - obj2Left;
    // let overlapRight = obj2Right - obj1Left;

    let overlapBottom = obj1Bottom - obj2Top;
    let overlapTop = obj2Bottom - obj1Top;
    let overlapRight = obj1Right - obj2Left;
    let overlapLeft = obj2Right - obj1Left;

    // Find the side with the smallest overlap
    let minOverlap = Math.min(overlapTop, overlapBottom, overlapLeft, overlapRight);

    console.log(minOverlap, ":", overlapTop, overlapBottom, overlapLeft, overlapRight);
    // Handle the collision based on the side of smallest overlap
    if (minOverlap === overlapTop && obj2.vy > 0) {
        // Top collision
        obj2.y = obj1.y - obj2.r - epsilon; // Push circle above rectangle
        obj2.vy *= obj2.bounce; // Reverse vertical velocity
    } 
    else if (minOverlap === overlapBottom && obj2.vy < 0) {
        // Bottom collision
        obj2.y = obj1.y + obj1.height + obj2.r + epsilon; // Push circle below rectangle
        obj2.vy *= obj2.bounce; // Reverse vertical velocity
    } else if (minOverlap === overlapLeft && obj2.vx > 0) {
        // Left collision
        obj2.x = obj1.x - obj2.r - epsilon; // Push circle to the left of rectangle
        obj2.vx *= obj2.bounce; // Reverse horizontal velocity
    // } else if (minOverlap === overlapRight && obj2.vx < 0) {
    } else if (minOverlap === overlapRight) {
        // Right collision
        console.log("Right Collision...");
        obj2.x = obj1.x + obj1.width + obj2.r + epsilon; // Push circle to the right of rectangle
        obj2.vx *= obj2.bounce; // Reverse horizontal velocity
    }


    // obj2.y = obj1.y - obj2.r;
    // obj2.vy *= obj2.bounce;
  }
}
