import Vector2 from "./Vector2";

function resolveCollision(objectA, objectB, collision) {
    const normal = collision.normal;

    // Relative velocity
    const relativeVelocity = new Vector2(
        objectB.velocity.x - objectA.velocity.x,
        objectB.velocity.y - objectA.velocity.y
    );

    // Velocity along collision normal
    const velocityAlongNormal =
        relativeVelocity.x * normal.x +
        relativeVelocity.y * normal.y;

    // Objects are already moving apart
    if (velocityAlongNormal > 0) {
        return;
    }

    // Coefficient of restitution
    const restitution = Math.min(
        objectA.restitution,
        objectB.restitution
    );

    // Calculate impulse
    const impulseMagnitude =
        -(1 + restitution) *
        velocityAlongNormal /
        (
            (1 / objectA.mass) +
            (1 / objectB.mass)
        );

    const impulse = new Vector2(
        impulseMagnitude * normal.x,
        impulseMagnitude * normal.y
    );

    // Apply impulse to object A
    objectA.velocity.x -=
        impulse.x / objectA.mass;

    objectA.velocity.y -=
        impulse.y / objectA.mass;

    // Apply impulse to object B
    objectB.velocity.x +=
        impulse.x / objectB.mass;

    objectB.velocity.y +=
        impulse.y / objectB.mass;

    // Push objects apart slightly
    // to prevent them from getting stuck
    const correctionPercent = 0.8;

    const correction =
        collision.penetration *
        correctionPercent /
        (
            (1 / objectA.mass) +
            (1 / objectB.mass)
        );

    objectA.position.x -=
        correction *
        normal.x /
        objectA.mass;

    objectA.position.y -=
        correction *
        normal.y /
        objectA.mass;

    objectB.position.x +=
        correction *
        normal.x /
        objectB.mass;

    objectB.position.y +=
        correction *
        normal.y /
        objectB.mass;
}

export default resolveCollision;