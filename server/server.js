// Main server entry point 
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const adminRoutes = require('./routes/admin');
// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

// Initialize the app
const app = express();

// Middlewares
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Allow the server to accept JSON data


app.use('/api/auth', authRoutes); // Use the authentication routes
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);

// A simple test route to make sure the server is running
app.get('/', (req, res) => {
    res.json({ message: "Welcome to the A.K. Infradream API!" });
});

// Define the port and start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});