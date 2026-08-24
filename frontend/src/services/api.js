const API_URL = "http://localhost:5000/api";


// Save simulation
export const saveSimulation = async (simulationData) => {

    try {

        const response = await fetch(
            `${API_URL}/simulations`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(simulationData)
            }
        );


        if (!response.ok) {

            throw new Error(
                "Failed to save simulation"
            );
        }


        const data =
            await response.json();


        return data;

    } catch (error) {

        console.error(
            "Save simulation error:",
            error
        );

        throw error;
    }
};


// Get all simulations
export const getSimulations = async () => {

    try {

        const response =
            await fetch(
                `${API_URL}/simulations`
            );


        if (!response.ok) {

            throw new Error(
                "Failed to fetch simulations"
            );
        }


        const data =
            await response.json();


        return data;

    } catch (error) {

        console.error(
            "Get simulations error:",
            error
        );

        throw error;
    }
};


// Get one simulation
export const getSimulationById = async (id) => {

    try {

        const response =
            await fetch(
                `${API_URL}/simulations/${id}`
            );


        if (!response.ok) {

            throw new Error(
                "Failed to fetch simulation"
            );
        }


        const data =
            await response.json();


        return data;

    } catch (error) {

        console.error(
            "Get simulation error:",
            error
        );

        throw error;
    }
};


// Delete simulation
export const deleteSimulation = async (id) => {

    try {

        const response =
            await fetch(
                `${API_URL}/simulations/${id}`,
                {
                    method: "DELETE"
                }
            );


        if (!response.ok) {

            throw new Error(
                "Failed to delete simulation"
            );
        }


        const data =
            await response.json();


        return data;

    } catch (error) {

        console.error(
            "Delete simulation error:",
            error
        );

        throw error;
    }
};