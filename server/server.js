const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const cors = require('cors');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors()); // Allow all origins for easier deployment

// Routes
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes');
const settingsRoutes = require('./routes/settingsRoutes'); // Added settingsRoutes import
const newsletterRoutes = require('./routes/newsletterRoutes');

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/contact', require('./routes/contactRoutes'));

// Health check endpoint
app.get('/', (req, res) => {
    res.json({
        message: 'Zaylo API is running...',
        version: '1.0.0',
        endpoints: {
            products: '/api/products',
            trending: '/api/products/trending',
            bestsellers: '/api/products/bestsellers',
            newarrivals: '/api/products/newarrivals',
            categories: '/api/products/categories',
        }
    });
});

// Error Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`✅ Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
    console.log(`📦 API Endpoints:`);
    console.log(`   - GET /api/products`);
    console.log(`   - GET /api/products/trending`);
    console.log(`   - GET /api/products/bestsellers`);
    console.log(`   - GET /api/products/newarrivals`);
    console.log(`   - GET /api/products/:id`);
});
