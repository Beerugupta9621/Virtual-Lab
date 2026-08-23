const express = require("express");

const Simulation =
    require("../models/Simulation");

const router = express.Router();


// CREATE SIMULATION
router.post("/", async (req, res) => {

    try {

        const simulation =
            new Simulation(req.body);

        const savedSimulation =
            await simulation.save();

        res.status(201).json({
            success: true,
            simulation: savedSimulation
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

});


// GET ALL SIMULATIONS
router.get("/", async (req, res) => {

    try {

        const simulations =
            await Simulation
                .find()
                .sort({ createdAt: -1 });

        res.json({
            success: true,
            simulations
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

});


// GET ONE SIMULATION
router.get("/:id", async (req, res) => {

    try {

        const simulation =
            await Simulation.findById(
                req.params.id
            );

        if (!simulation) {

            return res.status(404).json({
                success: false,
                message: "Simulation not found"
            });

        }

        res.json({
            success: true,
            simulation
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

});


// DELETE SIMULATION
router.delete("/:id", async (req, res) => {

    try {

        await Simulation.findByIdAndDelete(
            req.params.id
        );

        res.json({
            success: true,
            message: "Simulation deleted"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

});


module.exports = router;