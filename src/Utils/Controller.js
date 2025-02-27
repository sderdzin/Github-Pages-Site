export const Controller = (that) => {
  // let [canvas, ctx] = that;
  let parent = that;
  console.log(parent);

  document.addEventListener("keydown", function (event) {
    if (!parent.keys.includes(event.key)) {
      parent.keys.push(event.key);
    }
  });

  document.addEventListener("keyup", function (event) {
    const index = parent.keys.indexOf(event.key);
    if (index > -1) {
      parent.keys.splice(index, 1);
    }
  });
};
