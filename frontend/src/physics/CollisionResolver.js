import Vector2 from "./Vector2";

function resolveCollision(
    objectA,
    objectB,
    collision
) {
    const normal =
        collision.normal;

    // Relative velocity
    const relativeVelocity =
        new Vector2(
            objectB.velocity.x -
                objectA.velocity.x,

            objectB.velocity.y -
                objectA.velocity.y
        );

    // Velocity along collision normal
    const velocityAlongNormal =
        relativeVelocity.x *
            normal.x +
        relativeVelocity.y *
            normal.y;

    // Objects are moving apart
    if (velocityAlongNormal > 0) {
        return;
    }

    // Use the less-bouncy material
    const restitution =
        Math.min(
            objectA.restitution,
            objectB.restitution
        );

    // Calculate impulse
    const inverseMassA =
        1 / objectA.mass;

    const inverseMassB =
        1 / objectB.mass;

    const impulseMagnitude =
        -(1 + restitution) *
        velocityAlongNormal /
        (inverseMassA +
            inverseMassB);

    const impulse =
        new Vector2(
            impulseMagnitude *
                normal.x,

            impulseMagnitude *
                normal.y
        );

    // Apply normal impulse
    objectA.velocity.x -=
        impulse.x * inverseMassA;

    objectA.velocity.y -=
        impulse.y * inverseMassA;

    objectB.velocity.x +=
        impulse.x * inverseMassB;

    objectB.velocity.y +=
        impulse.y * inverseMassB;

    // -----------------------------
    // Friction
    // -----------------------------

    const tangent = new Vector2(
        -normal.y,
        normal.x
    );

    const tangentVelocity =
        relativeVelocity.x *
            tangent.x +
        relativeVelocity.y *
            tangent.y;

    const friction =
        Math.sqrt(
            objectA.friction *
                objectB.friction
        );

    let frictionImpulse =
        -tangentVelocity /
        (inverseMassA +
            inverseMassB);

    const maxFriction =
        Math.abs(
            impulseMagnitude
        ) * friction;

    frictionImpulse =
        Math.max(
            -maxFriction,
            Math.min(
                frictionImpulse,
                maxFriction
            )
        );

    const frictionVector =
        new Vector2(
            frictionImpulse *
                tangent.x,

            frictionImpulse *
                tangent.y
        );

    objectA.velocity.x -=
        frictionVector.x *
        inverseMassA;

    objectA.velocity.y -=
        frictionVector.y *
        inverseMassA;

    objectB.velocity.x +=
        frictionVector.x *
        inverseMassB;

    objectB.velocity.y +=
        frictionVector.y *
        inverseMassB;

    // -----------------------------
    // Positional correction
    // -----------------------------

    const correctionPercent =
        0.8;

    const correction =
        collision.penetration *
        correctionPercent /
        (inverseMassA +
            inverseMassB);

    objectA.position.x -=
        correction *
        normal.x *
        inverseMassA;

    objectA.position.y -=
        correction *
        normal.y *
        inverseMassA;

    objectB.position.x +=
        correction *
        normal.x *
        inverseMassB;

    objectB.position.y +=
        correction *
        normal.y *
        inverseMassB;
}

export default resolveCollision;