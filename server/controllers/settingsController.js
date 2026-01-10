const asyncHandler = require('express-async-handler');
const Settings = require('../models/Settings');

// @desc    Get site settings
// @route   GET /api/settings
// @access  Public
const getSettings = asyncHandler(async (req, res) => {
    try {
        let settings = await Settings.findOne({});

        if (!settings) {
            // Default settings if none exist
            settings = {
                siteName: 'Zaylo',
                siteDescription: 'Elevating your lifestyle with premium modern fashion.',
                contact: {
                    address: '123 Fashion Avenue, New York, NY 10012',
                    email: 'support@zaylo.com',
                    phone: '+1 (555) 123-4567',
                    hours: 'Monday - Friday: 9am - 8pm'
                },
                socials: {
                    facebook: 'https://facebook.com',
                    twitter: 'https://twitter.com',
                    instagram: 'https://instagram.com',
                    linkedin: 'https://linkedin.com'
                }
            };
        }
        res.json(settings);
    } catch (error) {
        // Mock data if DB is disconnected
        res.json({
            siteName: 'Zaylo (Offline Mode)',
            siteDescription: 'Elevating your lifestyle with premium modern fashion.',
            contact: {
                address: '123 Fashion Avenue, New York, NY 10012',
                email: 'support@zaylo.com',
                phone: '+1 (555) 123-4567',
                hours: 'Monday - Friday: 9am - 8pm'
            },
            socials: {
                facebook: 'https://facebook.com',
                twitter: 'https://twitter.com',
                instagram: 'https://instagram.com',
                linkedin: 'https://linkedin.com'
            }
        });
    }
});

// @desc    Update site settings
// @route   PUT /api/settings
// @access  Private/Admin
const updateSettings = asyncHandler(async (req, res) => {
    let settings = await Settings.findOne({});

    if (settings) {
        const updatedSettings = await Settings.findByIdAndUpdate(settings._id, req.body, { new: true });
        res.json(updatedSettings);
    } else {
        // Should not happen as getSettings creates default, but safe fallback
        const newSettings = await Settings.create(req.body);
        res.status(201).json(newSettings);
    }
});

module.exports = {
    getSettings,
    updateSettings
};
