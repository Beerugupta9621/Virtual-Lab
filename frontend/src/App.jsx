import React, { useState } from "react";

import PhysicsCanvas from "./components/PhysicsCanvas";

import ControlPanel from "./components/ControlPanel";

import SimulationStats from "./components/SimulationStats";

import "./App.css";

function App() {

    const [running, setRunning] =
        useState(false);

    const [gravity, setGravity] =
        useState(9.8);

    const [speed, setSpeed] =
        useState(1);

    const [reset, setReset] =
        useState(false);

    const [objectCount, setObjectCount] =
        useState(1);

    const [collisionCount, setCollisionCount] =
        useState(0);


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

        setObjectCount(1);

        setCollisionCount(0);
    };


    return (
        <div className="app">

            {/* Header */}

            <header className="header">

                <div>

                    <h1>
                        Virtual Lab
                    </h1>

                    <p>
                        Interactive 2D Physics
                        Simulation Platform
                    </p>

                </div>

                <div className="status">

                    <span
                        className={
                            running
                                ? "status-dot active"
                                : "status-dot"
                        }
                    />

                    {running
                        ? "Simulation Running"
                        : "Simulation Paused"
                    }

                </div>

            </header>


            {/* Main */}

            <main className="main-content">

                {/* Controls */}

                <ControlPanel
                    running={running}
                    gravity={gravity}
                    speed={speed}
                    objectCount={objectCount}
                    onStart={startSimulation}
                    onPause={pauseSimulation}
                    onReset={resetSimulation}
                    onGravityChange={setGravity}
                    onSpeedChange={setSpeed}
                />


                {/* Statistics */}

                <SimulationStats
                    objectCount={objectCount}
                    collisionCount={collisionCount}
                    gravity={gravity}
                    speed={speed}
                />


                {/* Physics Canvas */}

                <PhysicsCanvas
                    running={running}
                    gravity={gravity}
                    speed={speed}
                    reset={reset}
                    onObjectCountChange={
                        setObjectCount
                    }
                    onCollisionCountChange={
                        setCollisionCount
                    }
                />

            </main>

        </div>
    );
}

export default App;