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
                    Click a ball to inspect
                    its properties.
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

                <div className="property">
                    <span>ID</span>
                    <strong>
                        {selectedObject.id}
                    </strong>
                </div>


                <div className="property">
                    <span>Mass</span>
                    <strong>
                        {selectedObject.mass.toFixed(2)}
                        {" "}kg
                    </strong>
                </div>


                <div className="property">
                    <span>Radius</span>
                    <strong>
                        {selectedObject.radius.toFixed(2)}
                        {" "}px
                    </strong>
                </div>


                <div className="property">
                    <span>Restitution</span>
                    <strong>
                        {selectedObject.restitution.toFixed(2)}
                    </strong>
                </div>


                <div className="property">
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

                <div className="property">

                    <span>X</span>

                    <strong>
                        {selectedObject.position.x.toFixed(2)}
                    </strong>

                </div>


                <div className="property">

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

                <div className="property">

                    <span>X</span>

                    <strong>
                        {selectedObject.velocity.x.toFixed(2)}
                    </strong>

                </div>


                <div className="property">

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