export const Controller = (that) => {
  // let [canvas, ctx] = that;
  let game = that;
  console.log(game);

  document.addEventListener("keydown", function (event) {
    if (!game.keys.includes(event.key)) {
      game.keys.push(event.key);
    }
  });

  document.addEventListener("keyup", function (event) {
    const index = game.keys.indexOf(event.key);
    if (index > -1) {
      game.keys.splice(index, 1);
    }
  });
};
