import {CanvasResizer, ColorHelper, RandomGenerator, MathHelper} from "./Utils/Helpers.js";
import { setupListeners } from "./Utils/SetupListeners.js";
// import { setupCanvas } from "./Utils/SetupCanvas.js";
import { CollisionDetection } from "./Utils/CollisionDetection.js";

setupListeners();

const payload = {
};

const Library = {
    CanvasResizer,
    ColorHelper,
    RandomGenerator,
    MathHelper,
    CollisionDetection,
};

export default Library;