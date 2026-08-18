import React from "react";

function ControlPanel({
    running,
    gravity,
    speed,
    objectCount,
    onStart,
    onPause,
    onReset,
    onGravityChange,
    onSpeedChange
}) {
    return (
        <div className="control-panel">

            <div className="control-group">

                <label>
                    Gravity
                    <span>{gravity.toFixed(1)}</span>
                </label>

                <input
                    type="range"
                    min="0"
                    max="20"
                    step="0.1"
                    value={gravity}
                    onChange={(event) =>
                        onGravityChange(
                            Number(event.target.value)
                        )
                    }
                />

            </div>


            <div className="control-group">

                <label>
                    Simulation Speed
                    <span>{speed.toFixed(1)}x</span>
                </label>

                <input
                    type="range"
                    min="0.1"
                    max="2"
                    step="0.1"
                    value={speed}
                    onChange={(event) =>
                        onSpeedChange(
                            Number(event.target.value)
                        )
                    }
                />

            </div>


            <div className="buttons">

                <button
                    className="start-button"
                    onClick={onStart}
                    disabled={running}
                >
                    ▶ Start
                </button>

                <button
                    className="pause-button"
                    onClick={onPause}
                    disabled={!running}
                >
                    ⏸ Pause
                </button>

                <button
                    className="reset-button"
                    onClick={onReset}
                >
                    ↻ Reset
                </button>

            </div>


            <div className="object-counter">

                Objects:
                <strong>{objectCount}</strong>

            </div>

        </div>
    );
}

export default ControlPanel;