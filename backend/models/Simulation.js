const mongoose = require("mongoose");

const simulationSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },

        gravity: {
            type: Number,
            default: 9.8
        },

        speed: {
            type: Number,
            default: 1
        },

        objects: {
            type: Array,
            default: []
        },

        objectCount: {
            type: Number,
            default: 0
        },

        collisionCount: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
    }
);

module.exports =
    mongoose.model(
        "Simulation",
        simulationSchema
    );