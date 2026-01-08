const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
    credentials: true
}));

// Routes
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes');

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

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
