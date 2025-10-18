// Main server entry point 
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const adminRoutes = require('./routes/admin');
const configureCloudinary = require('./config/cloudinaryConfig'); 
const settingsRoutes = require('./routes/settings');

const admin = require('firebase-admin'); // <-- IMPORT
const serviceAccount = require('./config/serviceAccountKey.json');



admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
console.log("Firebase Admin SDK Initialized.");


// Load environment variables
dotenv.config();
// --- NEW: Configure Cloudinary at the start ---
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
console.log("Cloudinary configured successfully."); // Confirmation message

// Connect to the database
connectDB();

// Initialize the app
const app = express();

const allowedOrigins = [
  'http://localhost:3000',
  'https://sunsquadsolar.vercel.app',
  'https://sun-squad-solar.vercel.app',
  'https://www.sunsquadsolar.in'
];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  optionsSuccessStatus: 200,
  preflightContinue: false,
  maxAge: 86400 // 24 hours
};

// Middlewares
app.use(cors(corsOptions)); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Allow the server to accept JSON data


app.use('/api/auth', authRoutes); // Use the authentication routes
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/settings', settingsRoutes);

// A simple test route to make sure the server is running
app.get('/', (req, res) => {
    res.json({ message: "Welcome to the Sun Squad Solar API!" });
});

// This makes the 'uploads' folder publicly accessible
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// API Routes
app.use('/api/auth', authRoutes);

// For local development
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

// Export the app for Vercel
module.exports = app;