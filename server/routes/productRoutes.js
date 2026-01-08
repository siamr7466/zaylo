const express = require('express');
const router = express.Router();
const {
    getProducts,
    getProductById,
    getTrending,
    getBestSellersProducts,
    getNewArrivalsProducts,
    getProductsByCategory,
    getCategories,
    createProduct,
    updateProduct,
    deleteProduct,
} = require('../controllers/productController');

const { protect, admin } = require('../middleware/authMiddleware');

// Special routes (must come before :id route)
router.route('/trending').get(getTrending);
router.route('/bestsellers').get(getBestSellersProducts);
router.route('/newarrivals').get(getNewArrivalsProducts);
router.route('/categories').get(getCategories);
router.route('/category/:category').get(getProductsByCategory);

// General routes
router.route('/')
    .get(getProducts)
    .post(protect, admin, createProduct);

router.route('/:id')
    .get(getProductById)
    .delete(protect, admin, deleteProduct)
    .put(protect, admin, updateProduct);

module.exports = router;
