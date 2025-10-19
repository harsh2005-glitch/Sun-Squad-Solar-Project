const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');
const admin = require('firebase-admin');

// Load environment variables at the very top
dotenv.config();

// --- Import Routes ---
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const adminRoutes = require('./routes/admin');
const settingsRoutes = require('./routes/settings');

// --- Initialize External Services ---
// Firebase
const serviceAccount = require('./config/serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
console.log("Firebase Admin SDK Initialized.");

// Cloudinary
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
console.log("Cloudinary configured successfully.");

// --- Database Connection ---
connectDB();

// --- Initialize Express App ---
const app = express();

// --- CORS Configuration ---
const allowedOrigins = [
  'http://localhost:3000',
  'https://sunsquadsolar.vercel.app',
  'https://sun-squad-solar.vercel.app',
  'https://www.sunsquadsolar.in' // Your custom domain
];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
};

// --- Core Middlewares ---
app.use(cors(corsOptions));
app.use(express.json()); // To parse JSON bodies

// --- API Routes ---
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/settings', settingsRoutes);

// --- Default Test Route ---
app.get('/', (req, res) => {
    res.json({ message: "Welcome to the Sun Squad Solar API!" });
});

// --- Server Listening ---
// This part runs on local development but is ignored by Vercel
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// --- Export the app for Vercel ---
module.exports = app;