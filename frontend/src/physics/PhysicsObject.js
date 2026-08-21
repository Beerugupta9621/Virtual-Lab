import Vector2 from "./Vector2";

let nextObjectId = 1;

class PhysicsObject {
    constructor(
        x,
        y,
        radius = 20,
        mass = 1,
        restitution = 0.75,
        friction = 0.2
    ) {

        // Unique object ID
        this.id = `Ball ${nextObjectId++}`;

        this.position =
            new Vector2(x, y);

        this.velocity =
            new Vector2(0, 0);

        this.radius = radius;

        // Physical properties
        this.mass = mass;

        this.restitution =
            restitution;

        this.friction =
            friction;
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