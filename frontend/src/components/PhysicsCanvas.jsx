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
    onObjectCountChange,
    onCollisionCountChange,
    onPerformanceUpdate,
    onObjectSelect
}) {

    const canvasRef = useRef(null);

    const engineRef = useRef(null);

    const animationRef = useRef(null);


    // Keep latest values without recreating physics engine
    const runningRef = useRef(running);

    const gravityRef = useRef(gravity);

    const speedRef = useRef(speed);


    // Keep latest callback functions
    const objectCountCallbackRef =
        useRef(onObjectCountChange);

    const collisionCallbackRef =
        useRef(onCollisionCountChange);

    const performanceCallbackRef =
        useRef(onPerformanceUpdate);

    const objectSelectCallbackRef =
        useRef(onObjectSelect);


    /*
     * Update refs whenever props change
     */

    useEffect(() => {

        runningRef.current = running;

    }, [running]);


    useEffect(() => {

        gravityRef.current = gravity;

    }, [gravity]);


    useEffect(() => {

        speedRef.current = speed;

    }, [speed]);


    useEffect(() => {

        objectCountCallbackRef.current =
            onObjectCountChange;

    }, [onObjectCountChange]);


    useEffect(() => {

        collisionCallbackRef.current =
            onCollisionCountChange;

    }, [onCollisionCountChange]);


    useEffect(() => {

        performanceCallbackRef.current =
            onPerformanceUpdate;

    }, [onPerformanceUpdate]);


    useEffect(() => {

        objectSelectCallbackRef.current =
            onObjectSelect;

    }, [onObjectSelect]);


    /*
     * Initialize physics engine ONLY ONCE
     */

    useEffect(() => {

        const canvas =
            canvasRef.current;

        if (!canvas) {
            return;
        }


        const ctx =
            canvas.getContext("2d");


        canvas.width = 900;

        canvas.height = 500;


        /*
         * Create physics engine
         */

        const engine =
            new PhysicsEngine(
                canvas.width,
                canvas.height
            );


        engine.gravity =
            gravityRef.current;


        engineRef.current =
            engine;


        /*
         * Create first ball
         */

        const ball =
            new PhysicsObject(
                450,
                100,
                30
            );


        engine.addObject(ball);


        /*
         * Update object count
         */

        if (
            objectCountCallbackRef.current
        ) {

            objectCountCallbackRef.current(
                engine.getObjectCount()
            );
        }


        /*
         * Initial collision count
         */

        if (
            collisionCallbackRef.current
        ) {

            collisionCallbackRef.current(0);
        }


        /*
         * Performance variables
         */

        let previousTime =
            performance.now();

        let frameCounter = 0;

        let fpsStartTime =
            performance.now();

        let fps = 0;

        let frameTime = 0;


        /*
         * Animation loop
         */

        function animate(currentTime) {

            /*
             * Calculate delta time
             */

            const deltaTime =
                (currentTime - previousTime) /
                1000;

            previousTime =
                currentTime;


            /*
             * Frame time
             */

            frameTime =
                deltaTime * 1000;


            /*
             * FPS calculation
             */

            frameCounter++;


            const elapsed =
                currentTime -
                fpsStartTime;


            if (elapsed >= 500) {

                fps =
                    (frameCounter * 1000) /
                    elapsed;


                frameCounter = 0;

                fpsStartTime =
                    currentTime;


                if (
                    performanceCallbackRef.current
                ) {

                    performanceCallbackRef.current({
                        fps: Math.round(fps),
                        frameTime: Number(
                            frameTime.toFixed(2)
                        )
                    });
                }
            }


            /*
             * Prevent huge physics jumps
             */

            const dt =
                Math.min(
                    deltaTime,
                    0.02
                );


            /*
             * Update physics
             */

            if (runningRef.current) {

                engine.gravity =
                    gravityRef.current;


                engine.update(
                    dt,
                    speedRef.current
                );
            }


            /*
             * Update collision count
             */

            if (
                collisionCallbackRef.current
            ) {

                collisionCallbackRef.current(
                    engine.getCollisionCount()
                );
            }


            /*
             * Clear canvas
             */

            ctx.clearRect(
                0,
                0,
                canvas.width,
                canvas.height
            );


            /*
             * Background
             */

            ctx.fillStyle =
                "#111827";

            ctx.fillRect(
                0,
                0,
                canvas.width,
                canvas.height
            );


            /*
             * Grid
             */

            drawGrid(
                ctx,
                canvas.width,
                canvas.height
            );


            /*
             * Floor
             */

            ctx.fillStyle =
                "#374151";

            ctx.fillRect(
                0,
                canvas.height - 10,
                canvas.width,
                10
            );


            /*
             * Draw every object
             */

            for (
                let object of engine.objects
            ) {

                drawBall(
                    ctx,
                    object
                );
            }


            /*
             * Continue animation
             */

            animationRef.current =
                requestAnimationFrame(
                    animate
                );
        }


        /*
         * Start animation
         */

        animationRef.current =
            requestAnimationFrame(
                animate
            );


        /*
         * Cleanup ONLY when component unmounts
         */

        return () => {

            if (
                animationRef.current
            ) {

                cancelAnimationFrame(
                    animationRef.current
                );
            }


            engineRef.current =
                null;
        };

    }, []);


    /*
     * Reset simulation
     */

    useEffect(() => {

        if (!reset) {
            return;
        }


        const engine =
            engineRef.current;


        if (!engine) {
            return;
        }


        /*
         * Remove all objects
         */

        engine.reset();


        /*
         * Create fresh initial ball
         */

        const ball =
            new PhysicsObject(
                450,
                100,
                30
            );


        engine.addObject(ball);


        /*
         * Update object count
         */

        if (
            objectCountCallbackRef.current
        ) {

            objectCountCallbackRef.current(
                engine.getObjectCount()
            );
        }


        /*
         * Reset collision count
         */

        if (
            collisionCallbackRef.current
        ) {

            collisionCallbackRef.current(0);
        }


        /*
         * Remove selected object
         */

        if (
            objectSelectCallbackRef.current
        ) {

            objectSelectCallbackRef.current(
                null
            );
        }


        /*
         * Reset performance
         */

        if (
            performanceCallbackRef.current
        ) {

            performanceCallbackRef.current({
                fps: 0,
                frameTime: 0
            });
        }

    }, [reset]);


    /*
     * Create new ball
     */

    const createBall = (
        x,
        y
    ) => {

        const engine =
            engineRef.current;


        if (!engine) {
            return;
        }


        /*
         * Maximum objects
         */

        if (
            engine.getObjectCount() >= 50
        ) {

            return;
        }


        /*
         * Random physical properties
         */

        const radius =
            20 +
            Math.random() * 15;


        const mass =
            0.5 +
            Math.random() * 2;


        const restitution =
            0.5 +
            Math.random() * 0.4;


        const friction =
            0.1 +
            Math.random() * 0.5;


        /*
         * Create object
         */

        const object =
            new PhysicsObject(
                x,
                y,
                radius,
                mass,
                restitution,
                friction
            );


        /*
         * Random velocity
         */

        object.velocity.x =
            (Math.random() - 0.5) *
            200;


        object.velocity.y =
            -50;


        /*
         * Add to engine
         */

        engine.addObject(
            object
        );


        /*
         * Update object count
         */

        if (
            objectCountCallbackRef.current
        ) {

            objectCountCallbackRef.current(
                engine.getObjectCount()
            );
        }


        /*
         * Select new ball
         */

        if (
            objectSelectCallbackRef.current
        ) {

            objectSelectCallbackRef.current(
                object
            );
        }
    };


    /*
     * Canvas click
     */

    const handleCanvasClick = (
        event
    ) => {

        const canvas =
            canvasRef.current;


        const engine =
            engineRef.current;


        if (
            !canvas ||
            !engine
        ) {

            return;
        }


        /*
         * Get canvas position
         */

        const rect =
            canvas.getBoundingClientRect();


        /*
         * Convert browser coordinates
         * to canvas coordinates
         */

        const scaleX =
            canvas.width /
            rect.width;


        const scaleY =
            canvas.height /
            rect.height;


        const x =
            (
                event.clientX -
                rect.left
            ) *
            scaleX;


        const y =
            (
                event.clientY -
                rect.top
            ) *
            scaleY;


        /*
         * Check whether existing
         * ball was clicked
         */

        for (
            let i =
                engine.objects.length - 1;

            i >= 0;

            i--
        ) {

            const object =
                engine.objects[i];


            const dx =
                x -
                object.position.x;


            const dy =
                y -
                object.position.y;


            const distance =
                Math.sqrt(
                    dx * dx +
                    dy * dy
                );


            /*
             * Existing ball selected
             */

            if (
                distance <=
                object.radius
            ) {

                if (
                    objectSelectCallbackRef.current
                ) {

                    objectSelectCallbackRef.current(
                        object
                    );
                }


                return;
            }
        }


        /*
         * Empty area clicked
         * Create new ball
         */

        createBall(
            x,
            y
        );
    };


    /*
     * Add random ball button
     */

    const handleAddBall = () => {

        const canvas =
            canvasRef.current;


        if (!canvas) {
            return;
        }


        /*
         * Random position
         */

        const x =
            50 +
            Math.random() *
            (canvas.width - 100);


        const y =
            50 +
            Math.random() *
            150;


        createBall(
            x,
            y
        );
    };


    /*
     * Render
     */

    return (
        <div className="canvas-container">

            <p className="canvas-hint">

                Click a ball to inspect it.
                Click empty space to create
                a new ball.

            </p>


            <div className="canvas-actions">

                <button
                    type="button"
                    className="add-ball-button"
                    onClick={handleAddBall}
                >
                    + Add Ball
                </button>

            </div>


            <canvas
                ref={canvasRef}
                onClick={handleCanvasClick}
                style={{
                    display: "block",
                    cursor: "crosshair",
                    pointerEvents: "auto"
                }}
            />

        </div>
    );
}


/*
 * Draw ball
 */

function drawBall(
    ctx,
    object
) {

    ctx.beginPath();


    ctx.arc(
        object.position.x,
        object.position.y,
        object.radius,
        0,
        Math.PI * 2
    );


    /*
     * Ball gradient
     */

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


    ctx.fillStyle =
        gradient;


    ctx.fill();


    ctx.closePath();


    /*
     * Ball border
     */

    ctx.beginPath();


    ctx.arc(
        object.position.x,
        object.position.y,
        object.radius,
        0,
        Math.PI * 2
    );


    ctx.strokeStyle =
        "#bbf7d0";


    ctx.lineWidth =
        2;


    ctx.stroke();


    ctx.closePath();
}


/*
 * Draw grid
 */

function drawGrid(
    ctx,
    width,
    height
) {

    ctx.strokeStyle =
        "rgba(255,255,255,0.05)";


    ctx.lineWidth =
        1;


    const gridSize =
        50;


    /*
     * Vertical lines
     */

    for (
        let x = 0;
        x <= width;
        x += gridSize
    ) {

        ctx.beginPath();

        ctx.moveTo(
            x,
            0
        );

        ctx.lineTo(
            x,
            height
        );

        ctx.stroke();
    }


    /*
     * Horizontal lines
     */

    for (
        let y = 0;
        y <= height;
        y += gridSize
    ) {

        ctx.beginPath();

        ctx.moveTo(
            0,
            y
        );

        ctx.lineTo(
            width,
            y
        );

        ctx.stroke();
    }
}


export default PhysicsCanvas;