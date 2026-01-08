const express = require('express');
const router = express.Router();
const {
    authUser,
    registerUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    verifyEmail
} = require('../controllers/authController');
const { protect, admin } = require('../middleware/authMiddleware');

router.post('/', registerUser);
router.post('/login', authUser);
router.post('/verify-email', verifyEmail);

router.route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);

module.exports = router;
