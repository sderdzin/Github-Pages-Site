// Player.js

import BaseControllerObject from "./BaseControllerObject.js";
import Bullet from "./Bullet.js";
import { Controller } from "../Utils/Controller.js";

export default class Player extends BaseControllerObject {
  constructor(that, x, y, w, h, mass = 1) {
    super(that, x, y, w, h);
    // Additional initialization if needed
    this.gravity = this.game.gravity;
    this.vy = 0;
    this.speed = 5;
    this.keys = [];
    this.objects = [];
    this.bulletTimer = 0;
    this.bulletInterval = 0.1;
    this.fireAvailable = true;
    this.mouse = { x: 0, y: 0 }; // Add mouse position
    this.mass = mass * this.width * this.height;
    this.bounce = -0.7;
    this.friction = 0.89;

    this.turret = {
      x: 0,
      y: 0,
      width: 10,
      height: this.height / 2 + 10,
      rotation: 0,
    };

    this.updateTurretPosition();

    this.maxObjects = 50; // Set the maximum length for the objects array
    this.preloadBullets(this.maxObjects); // Preload 100 bullets

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
    if (this.mouse.down) {
      // console.log("Mouse down...");
      this.fire();
    }
    
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
    if ((this.bulletTimer >= this.bulletInterval) && !this.fireAvailable) {
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
    // Calculate the angle between the player and the mouse and rotate the turret to face the mouse.
    // const angle =
    //   Math.atan2(
    //     this.mouse.y - (this.y + this.height / 2),
    //     this.mouse.x - (this.x + this.width / 2)
    //   ) +
    //   Math.PI / 2;

      this.turret.rotation =
      Math.atan2(
        this.mouse.y - (this.y + this.height / 2),
        this.mouse.x - (this.x + this.width / 2)
      ) +
      Math.PI / 2;

    ctx.save();
    ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
    // ctx.rotate(angle);
    ctx.rotate(this.turret.rotation);

    ctx.fillStyle = "black";
    ctx.fillRect(-this.turret.width / 2, -this.turret.height, this.turret.width, this.turret.height);

    // Testing only
    // ctx.fillStyle = "red";
    // ctx.fillText("Rude", -this.turret.width / 2, -this.turret.height);

    ctx.restore();
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
    // console.log("Fire!");
    if (!this.fireAvailable) return;
    this.fireAvailable = false;

    const angle = Math.atan2(
      this.mouse.y - (this.y + this.height / 2),
      this.mouse.x - (this.x + this.width / 2)
    );

    this.turret.rotation =
      Math.atan2(
        this.mouse.y - (this.y + this.height / 2),
        this.mouse.x - (this.x + this.width / 2)
      ) +
      Math.PI / 2;

    const bulletSpeed = 500; // Adjust the speed as needed

    let bullet = this.objects.find((obj) => obj.active === false);
    if (bullet) {
      // Calculate the offset from the center of the player to the end of the turret
      const turretLength = this.turret.height;
      const offsetX = turretLength * Math.cos(angle);
      const offsetY = turretLength * Math.sin(angle);

      // Set the bullet's initial position to the end of the turret
      bullet.x = this.x + this.width / 2 + offsetX;
      bullet.y = this.y + this.height / 2 + offsetY;
      
      bullet.rotation = this.turret.rotation;
      
       // Normalize the velocity vector
       const vx = Math.cos(angle);
       const vy = Math.sin(angle);
       const magnitude = Math.sqrt(vx * vx + vy * vy);
       bullet.vx = (vx / magnitude) * bulletSpeed;
       bullet.vy = (vy / magnitude) * bulletSpeed;

       bullet.active = true;
    }
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
      let bullet = new Bullet(this, this.x, this.y, 6, 10);
      bullet.turretRef = this.turret;
      this.objects.push(bullet);
    }
  }
}
