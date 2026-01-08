const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    // 1) Create a transporter
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.mailtrap.io', // Default to Mailtrap if not set
        port: process.env.SMTP_PORT || 2525,
        auth: {
            user: process.env.SMTP_EMAIL || 'user',
            pass: process.env.SMTP_PASSWORD || 'pass'
        }
    });

    // 2) Define the email options
    const mailOptions = {
        from: `"${process.env.FROM_NAME || 'Zaylo Support'}" <${process.env.FROM_EMAIL || 'noreply@zaylo.com'}>`,
        to: options.email,
        subject: options.subject,
        text: options.message,
        html: options.html // Optional HTML content
    };

    // 3) Actually send the email
    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
