const asyncHandler = require('express-async-handler');
const { productsDb } = require('../config/jsonDb');

// @desc    Fetch all products with optional filters
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
    const { category, trending, bestseller, newarrival, limit, search } = req.query;

    let products = await productsDb.find();

    // Apply filters
    if (category) {
        products = products.filter(p => p.category.toLowerCase().includes(category.toLowerCase()));
    }

    if (trending === 'true') {
        products = products.filter(p => p.isTrending);
    }

    if (bestseller === 'true') {
        products = products.filter(p => p.isBestSeller);
    }

    if (newarrival === 'true') {
        products = products.filter(p => p.isNewArrival);
    }

    if (search) {
        const s = search.toLowerCase();
        products = products.filter(p =>
            p.name.toLowerCase().includes(s) ||
            p.description.toLowerCase().includes(s) ||
            p.brand.toLowerCase().includes(s) ||
            p.category.toLowerCase().includes(s)
        );
    }

    // Apply limit
    if (limit) {
        products = products.slice(0, parseInt(limit));
    }

    res.json(products);
});

// @desc    Fetch trending products
// @route   GET /api/products/trending
// @access  Public
const getTrending = asyncHandler(async (req, res) => {
    const { limit = 8 } = req.query;
    let products = await productsDb.find({ isTrending: true });
    res.json(products.slice(0, parseInt(limit)));
});

// @desc    Fetch best sellers
// @route   GET /api/products/bestsellers
// @access  Public
const getBestSellersProducts = asyncHandler(async (req, res) => {
    const { limit = 8 } = req.query;
    let products = await productsDb.find({ isBestSeller: true });
    res.json(products.slice(0, parseInt(limit)));
});

// @desc    Fetch new arrivals
// @route   GET /api/products/newarrivals
// @access  Public
const getNewArrivalsProducts = asyncHandler(async (req, res) => {
    const { limit = 8 } = req.query;
    let products = await productsDb.find({ isNewArrival: true });
    res.json(products.slice(0, parseInt(limit)));
});

// @desc    Fetch products by category
// @route   GET /api/products/category/:category
// @access  Public
const getProductsByCategory = asyncHandler(async (req, res) => {
    const { category } = req.params;
    const { limit = 20 } = req.query;
    let products = await productsDb.find({ category: category });
    res.json(products.slice(0, parseInt(limit)));
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
    const product = await productsDb.findById(req.params.id);

    if (product) {
        res.json(product);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

// @desc    Get product categories
// @route   GET /api/products/categories
// @access  Public
const getCategories = asyncHandler(async (req, res) => {
    const categories = await productsDb.distinct('category');
    res.json(categories);
});

// ADMIN OPERATIONS

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
    const deleted = await productsDb.findByIdAndDelete(req.params.id);

    if (deleted) {
        res.json({ message: 'Product removed' });
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
    const {
        name,
        price,
        cost,
        description,
        image,
        images,
        brand,
        category,
        countInStock,
        isTrending,
        isBestSeller,
        isNewArrival,
        variations
    } = req.body;

    const product = await productsDb.create({
        name,
        price,
        cost,
        user: req.user._id,
        image,
        images,
        brand,
        category,
        countInStock,
        numReviews: 0,
        description,
        isTrending,
        isBestSeller,
        isNewArrival,
        variations
    });

    res.status(201).json(product);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
    const updated = await productsDb.findByIdAndUpdate(req.params.id, req.body);

    if (updated) {
        res.json(updated);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

module.exports = {
    getProducts,
    getProductById,
    getTrending,
    getBestSellersProducts,
    getNewArrivalsProducts,
    getProductsByCategory,
    getCategories,
    deleteProduct,
    createProduct,
    updateProduct,
};
