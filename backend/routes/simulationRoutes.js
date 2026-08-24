const express = require("express");

const Simulation =
    require("../models/Simulation");

const router =
    express.Router();


// GET all simulations
router.get("/", async (req, res) => {

    try {

        const simulations =
            await Simulation
                .find()
                .sort({
                    createdAt: -1
                });

        res.json({
            success: true,
            count: simulations.length,
            simulations: simulations
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message:
                "Failed to fetch simulations"
        });
    }
});


// GET simulation by ID
router.get("/:id", async (req, res) => {

    try {

        const simulation =
            await Simulation.findById(
                req.params.id
            );

        if (!simulation) {

            return res.status(404).json({
                success: false,
                message:
                    "Simulation not found"
            });
        }

        res.json({
            success: true,
            simulation: simulation
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message:
                "Failed to fetch simulation"
        });
    }
});


// CREATE simulation
router.post("/", async (req, res) => {

    try {

        const {
            name,
            gravity,
            speed,
            objectCount,
            collisionCount,
            objects
        } = req.body;


        const simulation =
            new Simulation({

                name:
                    name ||
                    "Untitled Simulation",

                gravity:
                    gravity ?? 9.8,

                speed:
                    speed ?? 1,

                objectCount:
                    objectCount ?? 1,

                collisionCount:
                    collisionCount ?? 0,

                objects:
                    objects || []

            });


        const savedSimulation =
            await simulation.save();


        res.status(201).json({

            success: true,

            message:
                "Simulation saved successfully",

            simulation:
                savedSimulation

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message:
                "Failed to save simulation"

        });
    }
});


// DELETE simulation
router.delete("/:id", async (req, res) => {

    try {

        const simulation =
            await Simulation.findByIdAndDelete(
                req.params.id
            );


        if (!simulation) {

            return res.status(404).json({

                success: false,

                message:
                    "Simulation not found"

            });
        }


        res.json({

            success: true,

            message:
                "Simulation deleted successfully"

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message:
                "Failed to delete simulation"

        });
    }
});


module.exports = router;