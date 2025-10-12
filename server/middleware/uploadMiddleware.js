const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2; // We still need this

// The middleware now assumes Cloudinary is already configured
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'sunsquad_profiles',
    format: async (req, file) => 'jpg',
    public_id: (req, file) => `profile-${req.user.id}-${Date.now()}`, // Add timestamp for uniqueness
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb({ message: 'Images Only!' }, false);
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 } // 5MB limit
});

module.exports = upload;


// const multer = require('multer');
// const { CloudinaryStorage } = require('multer-storage-cloudinary');
// const cloudinary = require('cloudinary').v2;
// const dotenv = require('dotenv');
// // Configure Cloudinary
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// // Configure Cloudinary storage for Multer
// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: 'sunsquad_profiles', // A folder name in your Cloudinary account
//     format: async (req, file) => 'jpg', // supports promises as well
//     public_id: (req, file) => `profile-${req.user.id}`, // Use user ID for a unique, stable name
//   },
// });

// // File filter to allow only images
// const fileFilter = (req, file, cb) => {
//   const filetypes = /jpeg|jpg|png|gif/;
//   const mimetype = filetypes.test(file.mimetype);
//   const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

//   if (mimetype && extname) {
//     return cb(null, true);
//   }
//   cb('Error: Images Only!');
// };

// const upload = multer({ storage: storage });

// module.exports = upload;