class PhysicsEngine {
    constructor(width, height) {
        this.width = width;
        this.height = height;

        this.gravity = 9.8;

        this.objects = [];
    }

    addObject(object) {
        this.objects.push(object);
    }

    update(deltaTime, speed = 1) {
        const dt = deltaTime * speed;

        for (let object of this.objects) {
            object.applyGravity(this.gravity);

            object.update(dt);

            this.checkFloorCollision(object);
            this.checkWallCollision(object);
        }
    }

    checkFloorCollision(object) {
        const floor = this.height - 10;

        if (
            object.position.y + object.radius >= floor
        ) {
            object.position.y =
                floor - object.radius;

            object.velocity.y =
                -object.velocity.y * object.restitution;
        }
    }

    checkWallCollision(object) {
        // Left wall
        if (object.position.x - object.radius <= 0) {
            object.position.x = object.radius;

            object.velocity.x =
                -object.velocity.x * object.restitution;
        }

        // Right wall
        if (object.position.x + object.radius >= this.width) {
            object.position.x =
                this.width - object.radius;

            object.velocity.x =
                -object.velocity.x * object.restitution;
        }
    }

    reset() {
        this.objects = [];
    }

    getObjectCount() {
        return this.objects.length;
    }
}

export default PhysicsEngine;