const products = [
    {
        _id: 'prod_1',
        name: 'Royal Oud Essence',
        image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1000&auto=format&fit=crop',
        description: 'A rich, woody fragrance for the modern gentleman. Notes of agarwood, sandalwood, and musk.',
        brand: 'Imperial Scents',
        category: 'Perfumes',
        price: 129.99,
        cost: 65.00,
        countInStock: 15,
        rating: 4.8,
        numReviews: 12,
        isTrending: true,
        variations: [
            { type: 'Size', value: '50ml', stock: 5 },
            { type: 'Size', value: '100ml', stock: 10 }
        ]
    },
    {
        _id: 'prod_2',
        name: 'Chronos Elite',
        image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=1000&auto=format&fit=crop',
        description: 'Swiss-engineered minimalist watch with a sapphire crystal face and genuine leather strap.',
        brand: 'Chronos',
        category: 'Watches',
        price: 299.99,
        cost: 150.00,
        countInStock: 8,
        rating: 4.9,
        numReviews: 5,
        isBestSeller: true,
    },
    {
        _id: 'prod_3',
        name: 'Quantum X Headphones',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop',
        description: 'Noise-cancelling wireless headphones with 40-hour battery life and studio-quality sound.',
        brand: 'TechSonic',
        category: 'Gadgets',
        price: 199.99,
        cost: 100.00,
        countInStock: 20,
        rating: 4.5,
        numReviews: 30,
        isNewArrival: true,
    },
    {
        _id: 'prod_4',
        name: 'Golden Aviators',
        image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=1000&auto=format&fit=crop',
        description: 'Classic aviator sunglasses with gold frames and polarized lenses.',
        brand: 'SunStyle',
        category: 'Accessories',
        price: 89.99,
        cost: 45.00,
        countInStock: 0,
        rating: 4.2,
        numReviews: 8,
    }
];

module.exports = products;
