const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDatabase =
    require("./config/database");

const simulationRoutes =
    require("./routes/simulationRoutes");

const app = express();

const PORT =
    process.env.PORT || 5000;


// Connect MongoDB
connectDatabase();


// Middleware
app.use(cors());

app.use(express.json());


// Simulation API
app.use(
    "/api/simulations",
    simulationRoutes
);


// Root route
app.get("/", (req, res) => {

    res.json({
        message:
            "Virtual Lab Backend is running",

        status: "success"
    });

});


// Health check
app.get("/api/health", (req, res) => {

    res.json({
        status: "OK",

        message:
            "Backend is healthy"
    });

});


// Start server
app.listen(
    PORT,
    () => {

        console.log(
            `🚀 Virtual Lab Backend running on port ${PORT}`
        );

    }
);