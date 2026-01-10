const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000,
            bufferCommands: false,
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
    } catch (error) {
        console.error(`MongoDB Connection Error: ${error.message}`.red);
        console.log('Server continuing without MongoDB (some features may fail)'.yellow);
    }
};

module.exports = connectDB;
