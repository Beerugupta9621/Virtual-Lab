import Vector2 from "./Vector2";

function checkCircleCollision(objectA, objectB) {
    const dx =
        objectB.position.x -
        objectA.position.x;

    const dy =
        objectB.position.y -
        objectA.position.y;

    const distance =
        Math.sqrt(
            dx * dx +
            dy * dy
        );

    const minimumDistance =
        objectA.radius +
        objectB.radius;

    if (distance >= minimumDistance) {
        return null;
    }

    // Avoid division by zero
    if (distance === 0) {
        return {
            normal: new Vector2(1, 0),
            penetration: minimumDistance
        };
    }

    const normal =
        new Vector2(
            dx / distance,
            dy / distance
        );

    const penetration =
        minimumDistance - distance;

    return {
        normal,
        penetration
    };
}

export default checkCircleCollision;