const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
}, { timestamps: true });

const productSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    images: [{
        type: String // Additional images
    }],
    brand: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true, // Perfumes, Gadgets, Accessories, Watches
    },
    description: {
        type: String,
        required: true,
    },
    reviews: [reviewSchema],
    rating: {
        type: Number,
        required: true,
        default: 0,
    },
    numReviews: {
        type: Number,
        required: true,
        default: 0,
    },
    price: {
        type: Number,
        required: true,
        default: 0,
    },
    cost: {
        type: Number,
        required: true,
        default: 0,
    },
    discount: {
        type: Number,
        default: 0, // Percentage
    },
    countInStock: {
        type: Number,
        required: true,
        default: 0,
    },
    isTrending: {
        type: Boolean,
        default: false,
    },
    isBestSeller: {
        type: Boolean,
        default: false,
    },
    isNewArrival: {
        type: Boolean,
        default: false,
    },
    variations: [{
        type: { type: String }, // e.g. 'Size', 'Color'
        value: { type: String }, // e.g. '100ml', 'Black'
        stock: { type: Number }
    }]
}, {
    timestamps: true,
});

module.exports = mongoose.model('Product', productSchema);
