const express = require('express');
const router = express.Router();
const {
    subscribe,
    getSubscribers,
    sendNewsletter
} = require('../controllers/newsletterController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
    .post(subscribe)
    .get(protect, admin, getSubscribers);

router.route('/send')
    .post(protect, admin, sendNewsletter);

module.exports = router;
