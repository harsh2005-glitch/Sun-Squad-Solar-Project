const jwt = require('jsonwebtoken');
const User = require('../models/user');

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get user from the token and attach to request object
            // CRITICAL: Ensure this 'await' completes before moving on
            req.user = await User.findById(decoded.id).select('-password');
            
            if (!req.user) {
                // This handles the case where the user has been deleted but the token is still valid
                return res.status(401).json({ message: 'Not authorized, user not found' });
            }

            next(); // Proceed to the next middleware/controller
        } catch (error) {
            console.error(error);
            return res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }
};

// ... (the 'admin' middleware is unchanged) ...
const admin = (req, res, next) => {
    // This middleware should run AFTER protect()
    if (req.user && req.user.role === 'admin') {
        next(); // User is an admin, proceed
    } else {
        res.status(403).json({ message: 'Not authorized as an admin' }); // 403 Forbidden
    }
};


module.exports = { protect, admin };