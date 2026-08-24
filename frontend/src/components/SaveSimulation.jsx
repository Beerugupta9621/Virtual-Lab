import React, { useState } from "react";

import { saveSimulation } from "../services/api";


function SaveSimulation({
    gravity,
    speed,
    objectCount
}) {

    const [name, setName] =
        useState("");

    const [saving, setSaving] =
        useState(false);

    const [message, setMessage] =
        useState("");


    const handleSave = async () => {

        if (!name.trim()) {

            setMessage(
                "Please enter a simulation name."
            );

            return;
        }


        setSaving(true);

        setMessage("");


        try {

            const simulationData = {

                name: name.trim(),

                gravity: gravity,

                speed: speed,

                objectCount: objectCount

            };


            await saveSimulation(
                simulationData
            );


            setMessage(
                "Simulation saved successfully!"
            );


            setName("");


        } catch (error) {

            console.error(error);

            setMessage(
                "Failed to save simulation."
            );

        } finally {

            setSaving(false);
        }
    };


    return (
        <div className="save-simulation">

            <h3>
                Save Simulation
            </h3>


            <input
                type="text"
                placeholder="Simulation name"
                value={name}
                onChange={(event) =>
                    setName(event.target.value)
                }
            />


            <button
                onClick={handleSave}
                disabled={saving}
            >

                {saving
                    ? "Saving..."
                    : "Save Simulation"}

            </button>


            {message && (

                <p>
                    {message}
                </p>

            )}

        </div>
    );
}


export default SaveSimulation;