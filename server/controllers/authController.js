const asyncHandler = require('express-async-handler');
const generateToken = require('../utils/generateToken');
const { usersDb } = require('../config/jsonDb');
const bcrypt = require('bcryptjs');

// Helper to check password
const matchPassword = async (enteredPassword, storedPassword) => {
    return await bcrypt.compare(enteredPassword, storedPassword);
};

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await usersDb.findOne({ email });

    if (user && (await matchPassword(password, user.password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await usersDb.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await usersDb.create({
        name,
        email,
        password: hashedPassword,
        isAdmin: false,
        isCustomer: true,
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await usersDb.findById(req.user._id);

    if (user) {
        const update = {
            name: req.body.name || user.name,
            email: req.body.email || user.email,
        };

        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            update.password = await bcrypt.hash(req.body.password, salt);
        }

        const updatedUser = await usersDb.findByIdAndUpdate(req.user._id, update);

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id),
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

module.exports = {
    authUser,
    registerUser,
    getUserProfile,
    updateUserProfile,
};
