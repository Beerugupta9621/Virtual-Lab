import React from "react";

function ControlPanel({
    running,
    gravity,
    speed,
    objectCount,
    onStart,
    onPause,
    onReset,
    onClear,
    onGravityChange,
    onSpeedChange
}) {

    // Physics presets
    const applyPreset = (value) => {
        onGravityChange(value);
    };

    return (
        <div className="control-panel">

            {/* Gravity */}
            <div className="control-group">

                <label>
                    Gravity
                    <span>
                        {gravity.toFixed(1)}
                    </span>
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


            {/* Simulation Speed */}
            <div className="control-group">

                <label>
                    Simulation Speed
                    <span>
                        {speed.toFixed(1)}x
                    </span>
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


            {/* Physics Presets */}
            <div className="preset-section">

                <h3>
                    Physics Presets
                </h3>

                <div className="preset-buttons">

                    <button
                        onClick={() =>
                            applyPreset(9.8)
                        }
                    >
                        Earth
                    </button>

                    <button
                        onClick={() =>
                            applyPreset(1.62)
                        }
                    >
                        Moon
                    </button>

                    <button
                        onClick={() =>
                            applyPreset(3.71)
                        }
                    >
                        Mars
                    </button>

                    <button
                        onClick={() =>
                            applyPreset(0)
                        }
                    >
                        Zero Gravity
                    </button>

                </div>

            </div>


            {/* Main Buttons */}
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


                <button
                    className="clear-button"
                    onClick={onClear}
                >
                    🗑 Clear
                </button>

            </div>


            {/* Object Counter */}
            <div className="object-counter">

                Objects:
                <strong>
                    {objectCount}
                </strong>

                <span>
                    / 50
                </span>

            </div>

        </div>
    );
}

export default ControlPanel;