import checkCircleCollision from "./Collision";
import resolveCollision from "./CollisionResolver";

class PhysicsEngine {
    constructor(width, height) {
        this.width = width;
        this.height = height;

        this.gravity = 9.8;

        this.objects = [];

        this.collisionCount = 0;
    }

    addObject(object) {
        this.objects.push(object);
    }

    update(deltaTime, speed = 1) {
        const dt = deltaTime * speed;

        // Apply physics to every object
        for (let object of this.objects) {
            object.applyGravity(this.gravity);

            object.update(dt);

            this.checkFloorCollision(object);

            this.checkWallCollision(object);
        }

        // Check object-to-object collisions
        this.handleObjectCollisions();
    }

    handleObjectCollisions() {
        this.collisionCount = 0;

        for (
            let i = 0;
            i < this.objects.length;
            i++
        ) {
            for (
                let j = i + 1;
                j < this.objects.length;
                j++
            ) {
                const objectA = this.objects[i];

                const objectB = this.objects[j];

                const collision =
                    checkCircleCollision(
                        objectA,
                        objectB
                    );

                if (collision) {
                    resolveCollision(
                        objectA,
                        objectB,
                        collision
                    );

                    this.collisionCount++;
                }
            }
        }
    }

    checkFloorCollision(object) {
        const floor = this.height - 10;

        if (
            object.position.y +
                object.radius >=
            floor
        ) {
            object.position.y =
                floor - object.radius;

            object.velocity.y =
                -object.velocity.y *
                object.restitution;
        }
    }

    checkWallCollision(object) {

        // Left wall
        if (
            object.position.x -
                object.radius <=
            0
        ) {
            object.position.x =
                object.radius;

            object.velocity.x =
                -object.velocity.x *
                object.restitution;
        }

        // Right wall
        if (
            object.position.x +
                object.radius >=
            this.width
        ) {
            object.position.x =
                this.width -
                object.radius;

            object.velocity.x =
                -object.velocity.x *
                object.restitution;
        }
    }

    reset() {
        this.objects = [];

        this.collisionCount = 0;
    }

    getObjectCount() {
        return this.objects.length;
    }

    getCollisionCount() {
        return this.collisionCount;
    }
}

export default PhysicsEngine;