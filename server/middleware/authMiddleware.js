const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const { usersDb } = require('../config/jsonDb');

const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            if (decoded.id === 'mock_admin_id') {
                req.user = {
                    _id: 'mock_admin_id',
                    name: 'Mock Admin',
                    email: process.env.ADMIN_EMAIL || 'admin@example.com',
                    isAdmin: true
                };
                return next();
            }

            const user = await usersDb.findById(decoded.id);

            if (user) {
                // Remove password from user object
                const { password, ...userWithoutPassword } = user;
                req.user = userWithoutPassword;
                next();
            } else {
                res.status(401);
                throw new Error('Not authorized, user not found');
            }
        } catch (error) {
            console.error(error);
            res.status(401);
            throw new Error('Not authorized, token failed');
        }
    }

    if (!token) {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
});

const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401);
        throw new Error('Not authorized as an admin');
    }
};

module.exports = { protect, admin };
