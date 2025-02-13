// main.js
// import "/Utils/SetupListeners.js";

import { setupListeners } from "./Utils/SetupListeners.js";
import { CanvasResizer } from "./Utils/Helpers.js";

let canvas = document.getElementById("can1");
let ctx = canvas.getContext("2d");

setupListeners([canvas, ctx]);

CanvasResizer.fitToWindow(canvas);


function main() {
  let deltaTime = 0;
  let lastTime = 0;

  let colorR = 0;
  let colorG = 100;
  let colorB = 200;
  
  function loop(timestamp) {
    deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    update(deltaTime);
    render();
    window.requestAnimationFrame(loop);
  }
  window.requestAnimationFrame(loop);

  function update(dt) {
    // Update game state
    console.log("Update");
    colorR = (colorR + 1) % 256;
    colorG = (colorG + 1) % 256;
    colorB = (colorB + 1) % 256;
  }

  function render() {
    ctx.fillStyle = `rgb(${colorR}, ${colorG}, ${colorB})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "black";
    ctx.font = "30px Arial";
    ctx.fillText("Color in RGB Value:" + `R:${colorR}, G:${colorG}, B:${colorB}`, 10, 50);
  }
}

main();
