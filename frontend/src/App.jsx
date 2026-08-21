import React, { useState } from "react";

import PhysicsCanvas from "./components/PhysicsCanvas";
import ControlPanel from "./components/ControlPanel";
import SimulationStats from "./components/SimulationStats";
import PerformanceMonitor from "./components/PerformanceMonitor";

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

    const [fps, setFps] =
        useState(0);

    const [frameTime, setFrameTime] =
        useState(0);


    // Start simulation
    const startSimulation = () => {
        setRunning(true);
    };


    // Pause simulation
    const pauseSimulation = () => {
        setRunning(false);
    };


    // Reset simulation
    const resetSimulation = () => {

        setRunning(false);

        setReset(
            previous => !previous
        );

        setObjectCount(1);

        setCollisionCount(0);

        setFps(0);

        setFrameTime(0);
    };


    // Receive performance data
    const updatePerformance = ({
        fps,
        frameTime
    }) => {

        setFps(fps);

        setFrameTime(frameTime);
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


                {/* Simulation Statistics */}

                <SimulationStats
                    objectCount={objectCount}
                    collisionCount={collisionCount}
                    gravity={gravity}
                    speed={speed}
                />


                {/* Performance Monitor */}

                <PerformanceMonitor
                    fps={fps}
                    frameTime={frameTime}
                    objectCount={objectCount}
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

                    onPerformanceUpdate={
                        updatePerformance
                    }
                />

            </main>

        </div>
    );
}

export default App;