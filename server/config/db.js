// MongoDB connection logic 
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        // process.exit(1); // Do not exit process in serverless environment
        throw error; // Throw error so the caller can handle it
    }
};

module.exports = connectDB;