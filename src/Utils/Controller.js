export const Controller = (that) => {
  // let [canvas, ctx] = that;
  let parent = that;
  console.log(parent);

  document.addEventListener("keydown", function (event) {
    // console.log("Key down...");
    event.preventDefault();

    if (!parent.keys.includes(event.key)) {
      parent.keys.push(event.key);
    }
  });

  document.addEventListener("keyup", function (event) {
    event.preventDefault();
    const index = parent.keys.indexOf(event.key);
    if (index > -1) {
      parent.keys.splice(index, 1);
    }
  });

  document.addEventListener("mousemove", function (event) {
    let rect = parent.game.canvas.getBoundingClientRect();
    // let x = event.clientX - rect.left;
    // let y = event.clientY - rect.top;
    // console.log("Mouse moved...", x, y);
    parent.mouse.x = event.clientX - rect.left;
    parent.mouse.y = event.clientY - rect.top;
    // console.log("Mouse moved...", parent.mouse);
    
    // parent.mouse.x = event.clientX;
    // parent.mouse.y = event.clientY;
  }
  );
  
  document.addEventListener("mousedown", function (event) {
    event.preventDefault();
    parent.mouse.down = true;
  });
  
  document.addEventListener("mouseup", function (event) {
    event.preventDefault();
    parent.mouse.down = false;
  });

};
