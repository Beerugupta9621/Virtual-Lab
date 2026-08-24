import React, { useState } from "react";

import PhysicsCanvas from "./components/PhysicsCanvas";
import ControlPanel from "./components/ControlPanel";
import SimulationStats from "./components/SimulationStats";
import PerformanceMonitor from "./components/PerformanceMonitor";
import ObjectInspector from "./components/ObjectInspector";
import SaveSimulation
from "./components/SaveSimulation";
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

    const [clear, setClear] =
        useState(false);

    const [objectCount, setObjectCount] =
        useState(1);

    const [collisionCount, setCollisionCount] =
        useState(0);

    const [fps, setFps] =
        useState(0);

    const [frameTime, setFrameTime] =
        useState(0);

    const [selectedObject, setSelectedObject] =
        useState(null);


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

        setSelectedObject(null);
    };


    // Clear all objects
    const clearObjects = () => {

        setClear(
            previous => !previous
        );

        setObjectCount(0);

        setCollisionCount(0);

        setFps(0);

        setFrameTime(0);

        setSelectedObject(null);
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
                 <SaveSimulation
    gravity={gravity}
    speed={speed}
    objectCount={objectCount}
    collisionCount={collisionCount}
/>
                <ControlPanel
                    running={running}
                    gravity={gravity}
                    speed={speed}
                    objectCount={objectCount}

                    onStart={
                        startSimulation
                    }

                    onPause={
                        pauseSimulation
                    }

                    onReset={
                        resetSimulation
                    }

                    onClear={
                        clearObjects
                    }

                    onGravityChange={
                        setGravity
                    }

                    onSpeedChange={
                        setSpeed
                    }
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


                {/* Object Inspector */}

                <ObjectInspector
                    selectedObject={
                        selectedObject
                    }
                />


                {/* Physics Canvas */}

                <PhysicsCanvas
                    running={running}
                    gravity={gravity}
                    speed={speed}
                    reset={reset}
                    clear={clear}

                    onObjectCountChange={
                        setObjectCount
                    }

                    onCollisionCountChange={
                        setCollisionCount
                    }

                    onPerformanceUpdate={
                        updatePerformance
                    }

                    onObjectSelect={
                        setSelectedObject
                    }
                />

            </main>

        </div>
    );
}

export default App;