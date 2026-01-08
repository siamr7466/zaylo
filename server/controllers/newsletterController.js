const asyncHandler = require('express-async-handler');
const Newsletter = require('../models/Newsletter');
const sendEmail = require('../utils/sendEmail');

// @desc    Subscribe to newsletter
// @route   POST /api/newsletter
// @access  Public
const subscribe = asyncHandler(async (req, res) => {
    const { email } = req.body;

    if (!email) {
        res.status(400);
        throw new Error('Email is required');
    }

    // Check if already subscribed
    const existing = await Newsletter.findOne({ email });
    if (existing) {
        res.status(400);
        throw new Error('You are already subscribed!');
    }

    const subscriber = await Newsletter.create({
        email,
        subscribedAt: new Date().toISOString()
    });

    // Send Welcome Email
    try {
        await sendEmail({
            email,
            subject: 'Welcome to the Zaylo Newsletter!',
            message: 'Thank you for subscribing to our newsletter. We will verify you updated with the latest fashion trends and offers.',
            html: `
                <h3>Welcome to Zaylo!</h3>
                <p>Thank you for subscribing to our newsletter.</p>
                <p>You'll be the first to know about our:</p>
                <ul>
                    <li>New Arrivals</li>
                    <li>Exclusive Offers</li>
                    <li>Fashion Trends</li>
                </ul>
                <p>Stay tuned!</p>
            `
        });
    } catch (error) {
        console.error('Newsletter welcome email failed:', error);
    }

    res.status(201).json({ message: 'Subscribed successfully!' });
});

// @desc    Get all subscribers
// @route   GET /api/newsletter
// @access  Private/Admin
const getSubscribers = asyncHandler(async (req, res) => {
    const subscribers = await Newsletter.find({});
    res.json(subscribers);
});

// @desc    Send email to all subscribers
// @route   POST /api/newsletter/send
// @access  Private/Admin
const sendNewsletter = asyncHandler(async (req, res) => {
    const { subject, message, html } = req.body;

    if (!subject || !message) {
        res.status(400);
        throw new Error('Subject and message are required');
    }

    const subscribers = await Newsletter.find({});
    let successCount = 0;
    let failCount = 0;

    // Send emails in "parallel" but don't block the response too long
    // Ideally use a queue (Bull/Agenda) but for this project prompt we do it directly
    const emailPromises = subscribers.map(async (sub) => {
        try {
            await sendEmail({
                email: sub.email,
                subject,
                message,
                html: html || `<p>${message.replace(/\n/g, '<br>')}</p>` // Simple fallback HTML
            });
            successCount++;
        } catch (error) {
            console.error(`Failed to send to ${sub.email}:`, error);
            failCount++;
        }
    });

    await Promise.all(emailPromises);

    res.json({
        message: `Newsletter sent! Success: ${successCount}, Failed: ${failCount}`,
        successCount,
        failCount
    });
});

module.exports = {
    subscribe,
    getSubscribers,
    sendNewsletter
};
