export const setupListeners = (that) => {
  let [canvas, ctx] = that;
  // console.log(canvas, ctx);
  // document.addEventListener("keydown", function (event) {
  //   console.log("Key Pressed...", event.key);
  // });

  // document.addEventListener("keyup", function (event) {
  //   console.log("Key Released...", event.key);
  // });

  window.addEventListener("resize", (event) => {
    console.log("Resized...", event);
    // canvas = document.getElementById("can1");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // ctx = canvas.getContext("2d");
    ctx.width = canvas.width;
    ctx.height = canvas.height;
  });
};
