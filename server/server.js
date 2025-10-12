// Main server entry point 
const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const adminRoutes = require('./routes/admin');
const configureCloudinary = require('./config/cloudinaryConfig'); 
// Load environment variables
dotenv.config();
configureCloudinary();
// Connect to the database
connectDB();

// Initialize the app
const app = express();

const allowedOrigins = ['http://localhost:3000', 'https://sunsquadsolar.vercel.app/'];
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200
};

// Middlewares
app.use(cors(corsOptions)); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Allow the server to accept JSON data


app.use('/api/auth', authRoutes); // Use the authentication routes
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);

// A simple test route to make sure the server is running
app.get('/', (req, res) => {
    res.json({ message: "Welcome to the A.K. Infradream API!" });
});

// This makes the 'uploads' folder publicly accessible
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// API Routes
app.use('/api/auth', authRoutes);

// Define the port and start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});