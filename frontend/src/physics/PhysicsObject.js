import Vector2 from "./Vector2";

class PhysicsObject {

    constructor(x, y, radius = 30) {

        this.position = new Vector2(x, y);

        this.velocity = new Vector2(0, 0);

        this.acceleration = new Vector2(0, 9.8);

        this.radius = radius;

        this.mass = 1;

        this.restitution = 0.75;
    }

    applyGravity(gravity) {
        this.acceleration.y = gravity;
    }

    update(deltaTime) {

        this.velocity.x +=
            this.acceleration.x * deltaTime;

        this.velocity.y +=
            this.acceleration.y * deltaTime;

        this.position.x +=
            this.velocity.x * deltaTime;

        this.position.y +=
            this.velocity.y * deltaTime;
    }
}

export default PhysicsObject;