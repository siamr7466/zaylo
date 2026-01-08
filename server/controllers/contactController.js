const asyncHandler = require('express-async-handler');
const sendEmail = require('../utils/sendEmail');
const { settingsDb } = require('../config/jsonDb');

// @desc    Send contact email
// @route   POST /api/contact
// @access  Public
const sendContactEmail = asyncHandler(async (req, res) => {
    const { name, email, subject, message } = req.body;

    // Get Admin/Contact email from settings or env
    const settings = await settingsDb.findOne({});
    const adminEmail = settings?.contact?.email || process.env.CONTACT_EMAIL || 'admin@zaylo.com';

    const emailMessage = `
        You have a new message from Zaylo Contact Form:
        
        Name: ${name}
        Email: ${email}
        Subject: ${subject}
        
        Message:
        ${message}
    `;

    try {
        await sendEmail({
            email: adminEmail,
            subject: `Contact Form: ${subject}`,
            message: emailMessage,
            html: `
                <h3>New Contact Message</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Subject:</strong> ${subject}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
            `
        });

        res.status(200).json({ success: true, data: 'Email sent successfully' });
    } catch (err) {
        console.error(err);
        res.status(500);
        throw new Error('Email could not be sent');
    }
});

module.exports = { sendContactEmail };
