const mongoose = require('mongoose');

const settingsSchema = mongoose.Schema({
    siteName: { type: String, default: 'Zaylo' },
    siteDescription: { type: String, default: 'Elevating your lifestyle with premium modern fashion.' },
    supportEmail: { type: String, default: 'support@zaylo.com' },
    shippingFee: { type: Number, default: 0 },
    freeShippingThreshold: { type: Number, default: 100 },
    contact: {
        address: { type: String, default: '123 Fashion Avenue, New York, NY 10012' },
        email: { type: String, default: 'support@zaylo.com' },
        phone: { type: String, default: '+1 (555) 123-4567' },
        hours: { type: String, default: 'Monday - Friday: 9am - 8pm' }
    },
    socials: {
        facebook: { type: String, default: 'https://facebook.com' },
        twitter: { type: String, default: 'https://twitter.com' },
        instagram: { type: String, default: 'https://instagram.com' },
        linkedin: { type: String, default: 'https://linkedin.com' }
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Settings', settingsSchema);
