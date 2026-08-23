import React from "react";

function ObjectInspector({
    selectedObject
}) {

    if (!selectedObject) {

        return (
            <div className="object-inspector">

                <h3>
                    Object Inspector
                </h3>

                <p className="inspector-empty">
                    Click a ball to inspect its properties.
                </p>

            </div>
        );
    }


    return (
        <div className="object-inspector">

            <h3>
                Object Inspector
            </h3>


            <div className="inspector-section">

                <h4>
                    Physical Properties
                </h4>


                <div className="inspector-row">

                    <span>ID</span>

                    <strong>
                        Ball
                    </strong>

                </div>


                <div className="inspector-row">

                    <span>Mass</span>

                    <strong>
                        {selectedObject.mass.toFixed(2)}
                    </strong>

                </div>


                <div className="inspector-row">

                    <span>Radius</span>

                    <strong>
                        {selectedObject.radius.toFixed(2)} px
                    </strong>

                </div>


                <div className="inspector-row">

                    <span>Restitution</span>

                    <strong>
                        {selectedObject.restitution.toFixed(2)}
                    </strong>

                </div>


                <div className="inspector-row">

                    <span>Friction</span>

                    <strong>
                        {selectedObject.friction.toFixed(2)}
                    </strong>

                </div>

            </div>


            <div className="inspector-section">

                <h4>
                    Position
                </h4>


                <div className="inspector-row">

                    <span>X</span>

                    <strong>
                        {selectedObject.position.x.toFixed(2)}
                    </strong>

                </div>


                <div className="inspector-row">

                    <span>Y</span>

                    <strong>
                        {selectedObject.position.y.toFixed(2)}
                    </strong>

                </div>

            </div>


            <div className="inspector-section">

                <h4>
                    Velocity
                </h4>


                <div className="inspector-row">

                    <span>X</span>

                    <strong>
                        {selectedObject.velocity.x.toFixed(2)}
                    </strong>

                </div>


                <div className="inspector-row">

                    <span>Y</span>

                    <strong>
                        {selectedObject.velocity.y.toFixed(2)}
                    </strong>

                </div>

            </div>

        </div>
    );
}

export default ObjectInspector;