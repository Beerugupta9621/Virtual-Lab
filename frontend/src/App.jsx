import React, { useState } from "react";

import PhysicsCanvas from "./components/PhysicsCanvas";

import "./App.css";

function App() {

    const [running, setRunning] =
        useState(false);

    const [reset, setReset] =
        useState(false);

    const startSimulation = () => {

        setRunning(true);
    };

    const pauseSimulation = () => {

        setRunning(false);
    };

    const resetSimulation = () => {

        setRunning(false);

        setReset(
            previous => !previous
        );
    };

    return (

        <div className="app">

            <h1>
                Virtual Lab
            </h1>

            <p className="subtitle">
                Interactive 2D Physics Simulation
            </p>

            <div className="controls">

                <button
                    onClick={startSimulation}
                >
                    ▶ Start
                </button>

                <button
                    onClick={pauseSimulation}
                >
                    ⏸ Pause
                </button>

                <button
                    onClick={resetSimulation}
                >
                    ↻ Reset
                </button>

            </div>

            <PhysicsCanvas
                running={running}
                reset={reset}
            />

        </div>
    );
}

export default App;