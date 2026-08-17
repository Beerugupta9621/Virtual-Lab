import React, { useEffect, useRef } from "react";

import PhysicsEngine from "../physics/PhysicsEngine";
import PhysicsObject from "../physics/PhysicsObject";

function PhysicsCanvas({ running, reset }) {

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

        engineRef.current = engine;

        const ball =
            new PhysicsObject(
                450,
                100,
                30
            );

        engine.addObject(ball);

        let previousTime =
            performance.now();

        function animate(currentTime) {

            const deltaTime =
                (currentTime - previousTime) /
                1000;

            previousTime = currentTime;

            const dt =
                Math.min(deltaTime, 0.02);

            if (running) {

                engine.update(dt);
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

            // Floor

            ctx.fillStyle = "#374151";

            ctx.fillRect(
                0,
                canvas.height - 10,
                canvas.width,
                10
            );

            // Objects

            for (
                let object of engine.objects
            ) {

                ctx.beginPath();

                ctx.arc(
                    object.position.x,
                    object.position.y,
                    object.radius,
                    0,
                    Math.PI * 2
                );

                ctx.fillStyle = "#22c55e";

                ctx.fill();

                ctx.closePath();
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

    }, [running]);

    useEffect(() => {

        if (
            reset &&
            engineRef.current
        ) {

            engineRef.current.objects = [];

            const ball =
                new PhysicsObject(
                    450,
                    100,
                    30
                );

            engineRef.current.addObject(
                ball
            );
        }

    }, [reset]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                border: "2px solid #374151",
                borderRadius: "10px",
                display: "block",
                margin: "20px auto"
            }}
        />
    );
}

export default PhysicsCanvas;