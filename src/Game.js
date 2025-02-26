// Game.js

import HUD from "./HUD/HUD.js";
import PlayScene from "./Scenes/PlayScene.js";
import StartScene from "./Scenes/StartScene.js";

export default class Game {
  constructor(props) {
    [this.canvas, this.ctx] = [...props];
    this.scenes = [];
    this.activeScenes;
    this.gravity = 0.5;
    this.create();
  }

  create() {
    this.scenes = [
      new HUD(this).setText("Start Scene"),
      new StartScene(this).setActive(),
      new PlayScene(this)
    ];
    this.findActiveScenes();
  }

  update(dt) {
    this.findActiveScenes();
    this.activeScenes.forEach(scene => scene.update(dt));
  }

  render(ctx) {
    this.activeScenes.forEach(scene => scene.render(ctx));
  }

  findActiveScenes () {
    this.activeScenes = this.scenes.filter(scene => scene.active === true);
    this.activeScenes = this.activeScenes.sort((a, b) => a.zIndex - b.zIndex);
    // console.log("Finding Active Scenes", this.activeScenes);
  }

  changeScene(sceneName, previousScene) {
    previousScene.setInactive();
    this.scenes.find(scene => {
      if (scene.constructor.name === sceneName) {
        scene.setActive();
      }
    });
    this.findActiveScenes();
  }
}
