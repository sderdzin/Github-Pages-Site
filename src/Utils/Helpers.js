// src/Utils/Helpers.js

// Helper class for resizing the canvas
export class CanvasResizer {
    static resizeCanvas(canvas, width, height) {
        canvas.width = width;
        canvas.height = height;
    }

    static fitToContainer(canvas) {
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }

    static fitToWindow(canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
}

// Helper class for random number generation
export class RandomGenerator {
    static getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static getRandomFloat(min, max) {
        return Math.random() * (max - min) + min;
    }
}

// Helper class for color manipulation
export class ColorHelper {
    static hexToRgb(hex) {
        const bigint = parseInt(hex.slice(1), 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        return `rgb(${r}, ${g}, ${b})`;
    }

    static rgbToHex(r, g, b) {
        return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
    }
}

// Helper class for basic math operations
export class MathHelper {
    static clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }

    static lerp(start, end, t) {
        return start * (1 - t) + end * t;
    }
}