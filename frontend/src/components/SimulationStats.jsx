import React from "react";

function SimulationStats({
    objectCount,
    collisionCount,
    gravity,
    speed
}) {
    return (
        <div className="simulation-stats">

            <h3>Simulation Stats</h3>

            <div className="stat-row">
                <span>Objects</span>
                <strong>
                    {objectCount}
                </strong>
            </div>

            <div className="stat-row">
                <span>Collisions</span>
                <strong>
                    {collisionCount}
                </strong>
            </div>

            <div className="stat-row">
                <span>Gravity</span>
                <strong>
                    {gravity.toFixed(1)}
                </strong>
            </div>

            <div className="stat-row">
                <span>Speed</span>
                <strong>
                    {speed.toFixed(1)}x
                </strong>
            </div>

        </div>
    );
}

export default SimulationStats;