// BaseObject.js

export default class BaseObject {
    constructor() {
    }

    destroy() {
        // Destroy the object, including event listeners
        this.active = false;
        this.zIndex = -1;
    }
}