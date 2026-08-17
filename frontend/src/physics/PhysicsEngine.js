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

    update(deltaTime) {

        for (let object of this.objects) {

            object.applyGravity(
                this.gravity
            );

            object.update(
                deltaTime
            );

            this.checkFloorCollision(
                object
            );
        }
    }

    checkFloorCollision(object) {

        const floor = this.height - 10;

        if (
            object.position.y +
            object.radius >= floor
        ) {

            object.position.y =
                floor - object.radius;

            object.velocity.y =
                -object.velocity.y *
                object.restitution;
        }
    }

    reset() {

        this.objects = [];
    }
}

export default PhysicsEngine;