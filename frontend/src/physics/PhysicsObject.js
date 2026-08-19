import Vector2 from "./Vector2";

class PhysicsObject {
    constructor(x, y, radius = 20) {
        this.position =
            new Vector2(x, y);

        this.velocity =
            new Vector2(0, 0);

        this.radius = radius;

        this.mass = 1;

        this.restitution = 0.75;

        this.friction = 0.2;
    }

    applyGravity(gravity) {
        this.velocity.y +=
            gravity * 100;
    }

    update(deltaTime) {
        this.position.x +=
            this.velocity.x *
            deltaTime;

        this.position.y +=
            this.velocity.y *
            deltaTime;
    }
}

export default PhysicsObject;