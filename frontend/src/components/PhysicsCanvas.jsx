import React, {
    useEffect,
    useRef
} from "react";

import PhysicsEngine from "../physics/PhysicsEngine";
import PhysicsObject from "../physics/PhysicsObject";

function PhysicsCanvas({
    running,
    gravity,
    speed,
    reset,
    onObjectCountChange
}) {
    const canvasRef = useRef(null);

    const engineRef = useRef(null);

    const animationRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;

        const ctx = canvas.getContext("2d");

        canvas.width = 900;
        canvas.height = 500;

        const engine =
            new PhysicsEngine(
                canvas.width,
                canvas.height
            );

        engine.gravity = gravity;

        engineRef.current = engine;

        // Initial ball
        const ball =
            new PhysicsObject(
                450,
                100,
                30
            );

        engine.addObject(ball);

        onObjectCountChange(
            engine.getObjectCount()
        );

        let previousTime =
            performance.now();

        function animate(currentTime) {

            const deltaTime =
                (currentTime - previousTime) / 1000;

            previousTime = currentTime;

            const dt =
                Math.min(deltaTime, 0.02);

            // Update physics
            if (running) {
                engine.gravity = gravity;

                engine.update(
                    dt,
                    speed
                );
            }

            // Clear canvas
            ctx.clearRect(
                0,
                0,
                canvas.width,
                canvas.height
            );

            // Background
            ctx.fillStyle = "#111827";

            ctx.fillRect(
                0,
                0,
                canvas.width,
                canvas.height
            );

            // Grid
            drawGrid(
                ctx,
                canvas.width,
                canvas.height
            );

            // Floor
            ctx.fillStyle = "#374151";

            ctx.fillRect(
                0,
                canvas.height - 10,
                canvas.width,
                10
            );

            // Draw objects
            for (let object of engine.objects) {

                drawBall(
                    ctx,
                    object
                );
            }

            animationRef.current =
                requestAnimationFrame(
                    animate
                );
        }

        animationRef.current =
            requestAnimationFrame(
                animate
            );

        return () => {
            cancelAnimationFrame(
                animationRef.current
            );
        };

    }, [running, gravity, speed]);


    // Reset simulation
    useEffect(() => {

        if (
            reset &&
            engineRef.current
        ) {
            engineRef.current.reset();

            const ball =
                new PhysicsObject(
                    450,
                    100,
                    30
                );

            engineRef.current.addObject(
                ball
            );

            onObjectCountChange(
                engineRef.current.getObjectCount()
            );
        }

    }, [reset]);


    // Mouse click
    const handleCanvasClick = (event) => {

        const canvas =
            canvasRef.current;

        const rect =
            canvas.getBoundingClientRect();

        const scaleX =
            canvas.width / rect.width;

        const scaleY =
            canvas.height / rect.height;

        const x =
            (event.clientX - rect.left) *
            scaleX;

        const y =
            (event.clientY - rect.top) *
            scaleY;

        const radius = 20 + Math.random() * 15;

        const object =
            new PhysicsObject(
                x,
                y,
                radius
            );

        // Give new balls random horizontal velocity
        object.velocity.x =
            (Math.random() - 0.5) * 200;

        object.velocity.y =
            -50;

        engineRef.current.addObject(
            object
        );

        onObjectCountChange(
            engineRef.current.getObjectCount()
        );
    };


    return (
        <div className="canvas-container">

            <p className="canvas-hint">
                Click anywhere inside the simulation
                to create a new ball
            </p>

            <canvas
                ref={canvasRef}
                onClick={handleCanvasClick}
            />

        </div>
    );
}


// Draw ball
function drawBall(ctx, object) {

    ctx.beginPath();

    ctx.arc(
        object.position.x,
        object.position.y,
        object.radius,
        0,
        Math.PI * 2
    );

    const gradient =
        ctx.createRadialGradient(
            object.position.x - 8,
            object.position.y - 8,
            2,
            object.position.x,
            object.position.y,
            object.radius
        );

    gradient.addColorStop(
        0,
        "#86efac"
    );

    gradient.addColorStop(
        1,
        "#16a34a"
    );

    ctx.fillStyle = gradient;

    ctx.fill();

    ctx.closePath();

    // Border
    ctx.beginPath();

    ctx.arc(
        object.position.x,
        object.position.y,
        object.radius,
        0,
        Math.PI * 2
    );

    ctx.strokeStyle = "#bbf7d0";

    ctx.lineWidth = 2;

    ctx.stroke();

    ctx.closePath();
}


// Draw grid
function drawGrid(
    ctx,
    width,
    height
) {
    ctx.strokeStyle =
        "rgba(255,255,255,0.05)";

    ctx.lineWidth = 1;

    const gridSize = 50;

    for (
        let x = 0;
        x <= width;
        x += gridSize
    ) {
        ctx.beginPath();

        ctx.moveTo(x, 0);

        ctx.lineTo(x, height);

        ctx.stroke();
    }

    for (
        let y = 0;
        y <= height;
        y += gridSize
    ) {
        ctx.beginPath();

        ctx.moveTo(0, y);

        ctx.lineTo(width, y);

        ctx.stroke();
    }
}

export default PhysicsCanvas;