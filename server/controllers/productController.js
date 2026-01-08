const asyncHandler = require('express-async-handler');
const Product = require('../models/Product');

// @desc    Fetch all products with optional filters
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
    const { category, trending, bestseller, newarrival, limit, search } = req.query;

    let query = {};

    if (category) {
        query.category = { $regex: category, $options: 'i' };
    }

    if (trending === 'true') {
        query.isTrending = true;
    }

    if (bestseller === 'true') {
        query.isBestSeller = true;
    }

    if (newarrival === 'true') {
        query.isNewArrival = true;
    }

    if (search) {
        query.$or = [
            { name: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } },
            { brand: { $regex: search, $options: 'i' } },
            { category: { $regex: search, $options: 'i' } },
        ];
    }

    let productsQuery = Product.find(query);

    if (limit) {
        productsQuery = productsQuery.limit(parseInt(limit));
    }

    const products = await productsQuery;
    res.json(products);
});

// @desc    Fetch trending products
// @route   GET /api/products/trending
// @access  Public
// @desc    Fetch trending products
// @route   GET /api/products/trending
// @access  Public
const getTrending = asyncHandler(async (req, res) => {
    const { limit = 8 } = req.query;
    const products = await Product.find({ isTrending: true }).limit(parseInt(limit));
    res.json(products);
});

// @desc    Fetch best sellers
// @route   GET /api/products/bestsellers
// @access  Public
const getBestSellersProducts = asyncHandler(async (req, res) => {
    const { limit = 8 } = req.query;
    const products = await Product.find({ isBestSeller: true }).limit(parseInt(limit));
    res.json(products);
});

// @desc    Fetch new arrivals
// @route   GET /api/products/newarrivals
// @access  Public
const getNewArrivalsProducts = asyncHandler(async (req, res) => {
    const { limit = 8 } = req.query;
    const products = await Product.find({ isNewArrival: true }).limit(parseInt(limit));
    res.json(products);
});

// @desc    Fetch products by category
// @route   GET /api/products/category/:category
// @access  Public
const getProductsByCategory = asyncHandler(async (req, res) => {
    const { category } = req.params;
    const { limit = 20 } = req.query;
    // Case-insensitive fetch
    const products = await Product.find({ category: { $regex: new RegExp(`^${category}$`, 'i') } }).limit(parseInt(limit));
    res.json(products);
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

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
    const categories = await Product.distinct('category');
    res.json(categories);
});

// ADMIN OPERATIONS

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        await Product.deleteOne({ _id: product._id });
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

    const product = await Product.create({
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
    const product = await Product.findById(req.params.id);

    if (product) {
        product.name = req.body.name || product.name;
        product.price = req.body.price || product.price;
        product.cost = req.body.cost || product.cost;
        product.description = req.body.description || product.description;
        product.image = req.body.image || product.image;
        product.brand = req.body.brand || product.brand;
        product.category = req.body.category || product.category;
        product.countInStock = req.body.countInStock || product.countInStock;
        product.isTrending = req.body.isTrending;
        product.isBestSeller = req.body.isBestSeller;
        product.isNewArrival = req.body.isNewArrival;
        product.images = req.body.images || product.images;
        product.variations = req.body.variations || product.variations;

        const updatedProduct = await product.save();
        res.json(updatedProduct);
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
