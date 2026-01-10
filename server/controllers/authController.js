const asyncHandler = require('express-async-handler');
const generateToken = require('../utils/generateToken');

const User = require('../models/User');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');



// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            // Master Admin Override (Bypass verification)
            if (user.email === process.env.ADMIN_EMAIL) {
                if (!user.isAdmin || !user.isVerified) {
                    user.isAdmin = true;
                    user.isVerified = true;
                    await user.save();
                }
            }

            if (user.isVerified === false && !user.isAdmin) {
                res.status(401);
                throw new Error('Please verify your email address. Check your inbox.');
            }

            return res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
            });
        }
    } catch (error) {
        console.error('Login DB Error:', error.message);
        // Fallback for demo/offline Mode
        if (email === 'admin@example.com' || email === process.env.ADMIN_EMAIL) {
            return res.json({
                _id: 'mock_admin_id',
                name: 'Mock Admin',
                email: email,
                isAdmin: true,
                token: generateToken('mock_admin_id'),
                isMock: true
            });
        }
    }

    res.status(401);
    throw new Error('Invalid email or password');
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    // ID: 111 - Generate verification token
    const verificationToken = crypto.randomBytes(20).toString('hex');

    const user = await User.create({
        name,
        email,
        password, // Hook will hash it
        isAdmin: email === process.env.ADMIN_EMAIL,
        isCustomer: true,
        isVerified: false, // ID: 111 - Set unverified initially
        verificationToken
    });

    if (user) {
        // ID: 111 - Send verification email
        const verificationUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/verify-email/${verificationToken}`;

        const message = `
            Welcome to Zaylo!
            
            Please click the following link to verify your email address:
            ${verificationUrl}
        `;

        try {
            await sendEmail({
                email: user.email,
                subject: 'Zaylo Email Verification',
                message,
                html: `
                    <h3>Welcome to Zaylo!</h3>
                    <p>Please click the button below to verify your email address:</p>
                    <a href="${verificationUrl}" style="background: #000; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Verify Email</a>
                `
            });
        } catch (error) {
            console.error('Verification email failed:', error);
            // Optionally revert user creation or just log it
        }

        res.status(201).json({
            message: 'Registration successful! Please check your email to verify your account.'
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// @desc    Verify user email
// @route   POST /api/users/verify-email
// @access  Public
const verifyEmail = asyncHandler(async (req, res) => {
    const { token } = req.body;

    const user = await User.findOne({ verificationToken: token });

    if (!user) {
        res.status(400);
        throw new Error('Invalid or expired verification token');
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    res.status(200).json({ success: true, message: 'Email verified successfully' });
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

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

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.json(users);
});

module.exports = {
    authUser,
    registerUser,
    verifyEmail,
    getUserProfile,
    updateUserProfile,
    getUsers,
};
