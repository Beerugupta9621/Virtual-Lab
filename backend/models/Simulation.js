const mongoose = require("mongoose");

const simulationSchema =
    new mongoose.Schema(
        {
            name: {
                type: String,
                default: "Untitled Simulation"
            },

            gravity: {
                type: Number,
                default: 9.8
            },

            speed: {
                type: Number,
                default: 1
            },

            objectCount: {
                type: Number,
                default: 1
            },

            collisionCount: {
                type: Number,
                default: 0
            },

            objects: {
                type: Array,
                default: []
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