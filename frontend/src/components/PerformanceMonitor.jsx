import React from "react";

function PerformanceMonitor({
    fps,
    frameTime,
    objectCount
}) {
    return (
        <div className="performance-monitor">

            <h3>Performance</h3>

            <div className="performance-grid">

                <div className="performance-item">
                    <span>FPS</span>

                    <strong>
                        {fps}
                    </strong>
                </div>

                <div className="performance-item">
                    <span>Frame Time</span>

                    <strong>
                        {frameTime.toFixed(2)} ms
                    </strong>
                </div>

                <div className="performance-item">
                    <span>Objects</span>

                    <strong>
                        {objectCount}
                    </strong>
                </div>

            </div>

        </div>
    );
}

export default PerformanceMonitor;