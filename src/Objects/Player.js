// Player.js

import BaseControllerObject from "./BaseControllerObject.js";
import Bullet from "./Bullet.js";
import { Controller } from "../Utils/Controller.js";

export default class Player extends BaseControllerObject {
  constructor(that, x, y, w, h) {
    super(that, x, y, w, h);
    // Additional initialization if needed
    this.gravity = this.game.gravity;
    this.vy = -10;
    this.speed = 5;
    this.keys = [];
    this.objects = [];
    this.maxObjects = 50; // Set the maximum length for the objects array
    this.preloadBullets(this.maxObjects); // Preload 100 bullets
    this.bulletTimer = 0;
    this.bulletInterval = 0.1;
    this.fireAvailable = true;
    this.mouse = { x: 0, y: 0 }; // Add mouse position
    // this.create();

    this.turret = {
      x: 0,
      y: 0,
      width: 10,
      height: this.height / 2 + 10,
    };

    this.updateTurretPosition();

    console.log(this);
  }

  // Add methods and properties specific to ControllerObject
  create() {
    // let controller = Controller(this);
    Controller(this);
    // let num = this.keys.length;
    // console.log(num);
    // console.log(this.keys);
  }

  update(dt) {
    // console.log("Player Update");
    this.objects.forEach((obj) => {
      if (obj.active) obj.update(dt);
      });

    this.handleInput();
    this.applyForces();
    this.move();
    this.applyFriction();
    this.checkBounds();
    this.bulletTimer += dt;
    if (this.bulletTimer >= this.bulletInterval) {
      this.bulletTimer = 0;
      this.fireAvailable = true;
    }
    // console.log(this);
    this.updateTurretPosition();
  }

  render(ctx) {
    this.objects.forEach((obj) => {
      if (obj.active) obj.render(ctx);
    });

    ctx.fillStyle = "orange";
    ctx.fillRect(this.x, this.y, this.width, this.height);

    this.renderTurret(ctx);
  }

  renderTurret(ctx) {
    

    const angle = Math.atan2(this.mouse.y - (this.y + this.height / 2), this.mouse.x - (this.x + this.width / 2));
    ctx.save();
    ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
    ctx.rotate(angle);

    // ctx.strokeStyle = "red";
    // ctx.strokeRect(this.turret.x, this.turret.y, this.turret.width, this.turret.height);

    ctx.fillStyle = "black";
    ctx.fillRect(-this.turret.width / 2, -this.turret.height, this.turret.width, this.turret.height);
    ctx.restore();
    
    // const angle1 = Math.atan2(this.mouse.y - this.y, this.mouse.x - this.x);
    // ctx.save();
    // ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
    // ctx.rotate(angle1);
    // ctx.fillStyle = "black";
    // ctx.fillRect(-this.turret.width / 2, -this.turret.height / 2, this.turret.width, this.turret.height);
    // ctx.restore();
  }

  updateTurretPosition() {
    this.turret.x = this.x + this.width / 2 - 5;
    this.turret.y = this.y - 10;
  }

  handleInput() {
    if (this.keys.includes("ArrowUp") || this.keys.includes("w")) {
      // this.vy = -5;
    }
    if (this.keys.includes("ArrowDown") || this.keys.includes("s")) {
      // this.vy = 5;
    }
    if (this.keys.includes("ArrowLeft") || this.keys.includes("a")) {
      this.vx = -5;
    }
    if (this.keys.includes("ArrowRight") || this.keys.includes("d")) {
      this.vx = 5;
    }
    if (this.keys.includes(" ") && this.fireAvailable) {
      this.fire();
    }
  }

  applyForces() {
    this.vx += this.ax;
    this.vy += this.gravity;
  }

  move() {
    this.x += this.vx;
    this.y += this.vy;
  }

  applyFriction() {
    this.vx *= this.friction;
    this.vy *= this.friction;
  }

  fire() {
    console.log("Fire!");
    // if (!this.fireAvailable) return;
    this.fireAvailable = false;
    let bullet = this.objects.find((obj) => obj.active === false);
    if (bullet) {
      bullet.x = this.x + this.width / 2 - bullet.width / 2;
      bullet.y = this.y;
      bullet.active = true;
    };
    // this.objects.push(new Bullet(this.game, this.x, this.y, 10, 10));
  }

  checkBounds() {
    if (this.y + this.height > this.game.canvas.height) {
      this.y = this.game.canvas.height - this.height;
      this.vy *= this.bounce;
    }
    if (this.y < 0) {
      this.y = 0;
      this.vy *= this.bounce;
    }
    if (this.x + this.width > this.game.canvas.width) {
      this.x = this.game.canvas.width - this.width;
      this.vx *= this.bounce;
    }
    if (this.x < 0) {
      this.x = 0;
      this.vx *= this.bounce;
    }
  }

  preloadBullets(count) {
    for (let i = 0; i < count; i++) {
      this.objects.push(new Bullet(this, this.x, this.y, 6, 10));
    }
  }
}
