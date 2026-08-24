const mongoose = require("mongoose");

const connectDatabase = async () => {
    try {
        const mongoURI =
            process.env.MONGO_URI ||
            "mongodb://127.0.0.1:27017/virtual_lab";

        await mongoose.connect(mongoURI);

        console.log("✅ MongoDB Connected: 127.0.0.1");
    } catch (error) {
        console.error(
            "❌ MongoDB Connection Failed:",
            error.message
        );

        process.exit(1);
    }
};

module.exports = connectDatabase;