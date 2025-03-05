// filepath: /workspaces/Github-Pages-Site/src/Utils/CollisionDetection.js
// CollisionDetection.js

export class CollisionDetection {
    static rectIntersect(rect1, rect2) {
        return (
            rect1.x < rect2.x + rect2.width &&
            rect1.x + rect1.width > rect2.x &&
            rect1.y < rect2.y + rect2.height &&
            rect1.y + rect1.height > rect2.y
        );
    }

    static circleIntersect(circle1, circle2) {
        const dx = circle1.x - circle2.x;
        const dy = circle1.y - circle2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        return distance < circle1.r + circle2.r;
    }

    static rectCircleIntersect(rect, circle) {
        const distX = Math.abs(circle.x - rect.x - rect.width / 2);
        const distY = Math.abs(circle.y - rect.y - rect.height / 2);

        if (distX > rect.width / 2 + circle.r || distY > rect.height / 2 + circle.r) {
            return false;
        }

        if (distX <= rect.width / 2 || distY <= rect.height / 2) {
            return true;
        }

        const dx = distX - rect.width / 2;
        const dy = distY - rect.height / 2;
        return dx * dx + dy * dy <= circle.r * circle.r;
    }
}