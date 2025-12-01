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
const galleryRoutes = require('./routes/gallery');
const publicGalleryRoutes = require('./routes/publicGallery');
const contactRoutes = require('./routes/contact');
const publicAnnouncementsRoutes = require('./routes/publicAnnouncements'); 

// Load environment variables
dotenv.config();

// --- Configure Cloudinary at the start ---
const cloudinary = require('cloudinary').v2;
if (process.env.CLOUDINARY_CLOUD_NAME) {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    console.log("Cloudinary configured successfully."); 
} else {
    console.warn("Cloudinary credentials missing.");
}

// Connect to the database
if (!process.env.MONGO_URI) {
    console.error("FATAL ERROR: MONGO_URI is not defined.");
}
// Wrap connectDB in a try-catch to prevent startup crash
try {
    connectDB();
} catch (err) {
    console.error("Failed to initiate DB connection:", err);
}

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
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Check if the origin is in the allowed list
    if (allowedOrigins.indexOf(origin) !== -1) {
      return callback(null, true);
    }
    
    // Allow any Vercel preview/production deployment
    if (origin.endsWith('.vercel.app')) {
        return callback(null, true);
    }

    // Allow localhost for development
    if (origin.startsWith('http://localhost:')) {
        return callback(null, true);
    }

    const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
    return callback(new Error(msg), false);
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
// app.options('/*', cors(corsOptions)); // Removed to fix PathError in Express 5

app.use(express.json()); // Allow the server to accept JSON data


app.use('/api/auth', authRoutes); // Use the authentication routes
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/gallery', publicGalleryRoutes); 
app.use('/api/contact', contactRoutes);
app.use('/api/announcements', publicAnnouncementsRoutes);

// A simple test route to make sure the server is running
app.get('/', (req, res) => {
    res.json({ message: "Welcome to the Sun Squad Solar API!" });
});

// This makes the 'uploads' folder publicly accessible
if (process.env.NODE_ENV !== 'production') {
    app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
}

// API Routes
// app.use('/api/auth', authRoutes); // Removed duplicate

// For local development
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

// Export the app for Vercel
module.exports = app;