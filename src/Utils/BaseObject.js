// BaseObject.js

export default class BaseObject {
    constructor() {
        this.active = false;
        this.collisionEnabled = true;
    }

    setActive() {
        // Set the object to active
        this.active = true;
    }

    setInactive() {
        // Set the object to inactive
        this.active = false;
    }  
    
    destroy() {
        // Destroy the object, including event listeners
        this.active = false;
        this.zIndex = -1;
    }
}