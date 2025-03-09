// Enemy1.js

import Bullet from "../Bullet.js";
import BaseEntityObject from "../BaseEntityObject.js";

export default class Enemy1 extends BaseEntityObject {
  constructor(that, x, y, w, h, mass = 1) {
    super(that, x, y, w, h);
    // Additional initialization if needed
    this.gravity = this.game.gravity;
    // this.gravity = 0.1;
    this.vy = 0;
    this.speed = 5;
    this.keys = [];
    this.objects = [];
    this.bulletTimer = 0;
    this.bulletInterval = 0.1;
    this.fireAvailable = true;
    this.mouse = { x: 0, y: 0 }; // Add mouse position
    this.r = 40;
    this.mass = mass;
    this.bounce = -0.7;
    this.friction = 0.99;

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

    this.active = true;

    // console.log(this);
  }

  // Add methods and properties specific to EntityObject
  create() {
  }

  update(dt) {
    // console.log("Enemy1 Update");
    this.objects.forEach((obj) => {
      if (obj.active) obj.update(dt);
    });

    this.applyForces();
    this.move();
    this.applyFriction();
    this.checkBounds();
    
    
    // this.bulletTimer += dt;
    // if (this.bulletTimer >= this.bulletInterval) {
    //   this.bulletTimer = 0;
    //   this.fireAvailable = true;
    // }
    // console.log(this);

    // this.updateTurretPosition();
  }

  render(ctx) {
    this.objects.forEach((obj) => {
      if (obj.active) obj.render(ctx);
    });

    // ctx.fillStyle = "blue";
    // ctx.fillRect(this.x, this.y, this.width, this.height);
    // console.log("New R Value:", this.r);
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    ctx.fillStyle = "blue";
    ctx.fill();

    // this.renderTurret(ctx);
  }

  renderTurret(ctx) {
    // Calculate the angle between the Enemy1 and the mouse and rotate the turret to face the mouse.
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
    ctx.fillRect(
      -this.turret.width / 2,
      -this.turret.height,
      this.turret.width,
      this.turret.height
    );

    // Testing only
    // ctx.fillStyle = "red";
    // ctx.fillText("Rude", -this.turret.width / 2, -this.turret.height);

    ctx.restore();
  }

  updateTurretPosition() {
    this.turret.x = this.x + this.width / 2 - 5;
    this.turret.y = this.y - 10;
  }

  applyForces() {
    this.vx += this.ax / this.mass;
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
      bullet.x = this.x + this.width / 2 - bullet.width / 2;
      bullet.y = this.y + this.height / 2;
      // bullet.y = this.y;

      // bullet.x = this.turret.x + this.turret.width / 2 - bullet.width / 2;
      bullet.x = this.turret.x + bullet.width;
      // bullet.y = this.turret.y + this.height / 2;
      bullet.y = this.turret.y;

      
      bullet.rotation = this.turret.rotation;
      // bullet.rotation = angle;
      // bullet.rotation = 250;
      // console.log("Bullet rotation...", this.turret.rotation, angle);
      
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
    if (this.y + this.r > this.game.canvas.height) {
      this.y = this.game.canvas.height - this.r;
      this.vy *= this.bounce;
    }
    if (this.y < 0) {
      this.y = 0;
      this.vy *= this.bounce;
    }
    if (this.x + this.r > this.game.canvas.width) {
      this.x = this.game.canvas.width - this.r;
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

  setRadius(r) {
    this.r = r;
    this.mass = r * r;
    return this;
  }

  setXYVelocity(vx, vy) {
    this.vx = vx;
    this.vy = vy;
    return this;
  }
}
