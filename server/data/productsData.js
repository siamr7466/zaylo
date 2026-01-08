// Extended product catalog for Zaylo E-Commerce

const products = [
    // ===== PERFUMES =====
    {
        _id: 'prod_001',
        name: 'Royal Oud Essence',
        slug: 'royal-oud-essence',
        images: [
            'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1000&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?q=80&w=1000&auto=format&fit=crop'
        ],
        description: 'A rich, woody fragrance for the modern gentleman. Notes of agarwood, sandalwood, and musk. Perfect for evening occasions and special events.',
        brand: 'Imperial Scents',
        category: 'Perfumes',
        price: 129.99,
        discount: 0,
        stock: 15,
        rating: { average: 4.8, count: 12 },
        tags: ['Trending', 'Premium'],
        isTrending: true,
        variations: [
            { type: 'Size', value: '50ml', stock: 5, priceModifier: 0 },
            { type: 'Size', value: '100ml', stock: 10, priceModifier: 40 }
        ]
    },
    {
        _id: 'prod_002',
        name: 'Noir Mystique',
        slug: 'noir-mystique',
        images: [
            'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1000&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1590736704728-f4730bb30770?q=80&w=1000&auto=format&fit=crop'
        ],
        description: 'An enchanting blend of dark florals and smoky undertones. This mysterious fragrance captivates with notes of black orchid, dark amber, and vanilla.',
        brand: 'Eclipse Parfums',
        category: 'Perfumes',
        price: 159.99,
        discount: 15,
        stock: 22,
        rating: { average: 4.9, count: 28 },
        tags: ['Best Seller', 'Premium'],
        isBestSeller: true,
        variations: [
            { type: 'Size', value: '30ml', stock: 7, priceModifier: -40 },
            { type: 'Size', value: '50ml', stock: 8, priceModifier: 0 },
            { type: 'Size', value: '100ml', stock: 7, priceModifier: 50 }
        ]
    },
    {
        _id: 'prod_003',
        name: 'Velvet Rose',
        slug: 'velvet-rose',
        images: [
            'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=1000&auto=format&fit=crop'
        ],
        description: 'A feminine, romantic fragrance with Bulgarian rose, jasmine, and notes of soft musk. Perfect for the elegant woman.',
        brand: 'Floral Essence',
        category: 'Perfumes',
        price: 119.99,
        discount: 0,
        stock: 18,
        rating: { average: 4.7, count: 15 },
        tags: ['New Arrival'],
        isNewArrival: true,
        variations: [
            { type: 'Size', value: '50ml', stock: 10, priceModifier: 0 },
            { type: 'Size', value: '100ml', stock: 8, priceModifier: 35 }
        ]
    },
    {
        _id: 'prod_004',
        name: 'Ocean Breeze',
        slug: 'ocean-breeze',
        images: [
            'https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=1000&auto=format&fit=crop'
        ],
        description: 'Fresh aquatic notes with hints of sea salt, citrus, and clean white musk. A refreshing scent for everyday wear.',
        brand: 'Coastal',
        category: 'Perfumes',
        price: 89.99,
        discount: 10,
        stock: 30,
        rating: { average: 4.5, count: 42 },
        tags: ['Popular'],
        variations: [
            { type: 'Size', value: '50ml', stock: 15, priceModifier: 0 },
            { type: 'Size', value: '100ml', stock: 15, priceModifier: 30 }
        ]
    },

    // ===== WATCHES =====
    {
        _id: 'prod_005',
        name: 'Chronos Elite',
        slug: 'chronos-elite',
        images: [
            'https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=1000&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=1000&auto=format&fit=crop'
        ],
        description: 'Swiss-engineered minimalist watch with a sapphire crystal face and genuine leather strap. Water resistant to 50 meters.',
        brand: 'Chronos',
        category: 'Watches',
        price: 299.99,
        discount: 0,
        stock: 8,
        rating: { average: 4.9, count: 5 },
        tags: ['Best Seller', 'Premium'],
        isBestSeller: true,
        variations: [
            { type: 'Color', value: 'Black', stock: 4, priceModifier: 0 },
            { type: 'Color', value: 'Brown', stock: 4, priceModifier: 0 }
        ]
    },
    {
        _id: 'prod_006',
        name: 'Titanium Sport Pro',
        slug: 'titanium-sport-pro',
        images: [
            'https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1000&auto=format&fit=crop'
        ],
        description: 'Rugged sports watch with titanium casing, chronograph functions, and 100m water resistance. Built for adventure.',
        brand: 'SportX',
        category: 'Watches',
        price: 449.99,
        discount: 20,
        stock: 12,
        rating: { average: 4.6, count: 18 },
        tags: ['Trending'],
        isTrending: true,
        variations: [
            { type: 'Color', value: 'Silver', stock: 6, priceModifier: 0 },
            { type: 'Color', value: 'Black', stock: 6, priceModifier: 0 }
        ]
    },
    {
        _id: 'prod_007',
        name: 'Rose Gold Classic',
        slug: 'rose-gold-classic',
        images: [
            'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?q=80&w=1000&auto=format&fit=crop'
        ],
        description: 'Elegant rose gold timepiece with diamond hour markers and a mesh bracelet. The epitome of sophistication.',
        brand: 'Elegance',
        category: 'Watches',
        price: 599.99,
        discount: 0,
        stock: 5,
        rating: { average: 5.0, count: 8 },
        tags: ['Premium', 'New Arrival'],
        isNewArrival: true,
    },
    {
        _id: 'prod_008',
        name: 'Digital Smartwatch X',
        slug: 'digital-smartwatch-x',
        images: [
            'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=1000&auto=format&fit=crop'
        ],
        description: 'Advanced smartwatch with health monitoring, GPS tracking, and 7-day battery life. Stay connected in style.',
        brand: 'TechWear',
        category: 'Watches',
        price: 379.99,
        discount: 10,
        stock: 25,
        rating: { average: 4.4, count: 56 },
        tags: ['Popular'],
    },

    // ===== GADGETS =====
    {
        _id: 'prod_009',
        name: 'Quantum X Headphones',
        slug: 'quantum-x-headphones',
        images: [
            'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=1000&auto=format&fit=crop'
        ],
        description: 'Noise-cancelling wireless headphones with 40-hour battery life and studio-quality sound. Premium comfort with memory foam ear cushions.',
        brand: 'TechSonic',
        category: 'Gadgets',
        price: 199.99,
        discount: 0,
        stock: 20,
        rating: { average: 4.5, count: 30 },
        tags: ['New Arrival', 'Popular'],
        isNewArrival: true,
        variations: [
            { type: 'Color', value: 'Matte Black', stock: 10, priceModifier: 0 },
            { type: 'Color', value: 'Silver', stock: 5, priceModifier: 0 },
            { type: 'Color', value: 'Midnight Blue', stock: 5, priceModifier: 10 }
        ]
    },
    {
        _id: 'prod_010',
        name: 'ProPods Ultra',
        slug: 'propods-ultra',
        images: [
            'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=1000&auto=format&fit=crop'
        ],
        description: 'True wireless earbuds with spatial audio, active noise cancellation, and 30-hour total battery life with charging case.',
        brand: 'TechSonic',
        category: 'Gadgets',
        price: 149.99,
        discount: 15,
        stock: 35,
        rating: { average: 4.7, count: 89 },
        tags: ['Best Seller'],
        isBestSeller: true,
    },
    {
        _id: 'prod_011',
        name: 'Portable Power Bank',
        slug: 'portable-power-bank',
        images: [
            'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?q=80&w=1000&auto=format&fit=crop'
        ],
        description: '20000mAh fast-charging power bank with multiple USB ports. Sleek aluminum design with LED indicator.',
        brand: 'ChargePlus',
        category: 'Gadgets',
        price: 59.99,
        discount: 0,
        stock: 50,
        rating: { average: 4.3, count: 120 },
        tags: ['Popular'],
    },
    {
        _id: 'prod_012',
        name: 'Mini Bluetooth Speaker',
        slug: 'mini-bluetooth-speaker',
        images: [
            'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=1000&auto=format&fit=crop'
        ],
        description: 'Compact waterproof speaker with 360° sound and 12-hour battery. Perfect for outdoor adventures.',
        brand: 'SoundWave',
        category: 'Gadgets',
        price: 79.99,
        discount: 25,
        stock: 40,
        rating: { average: 4.4, count: 67 },
        tags: ['Trending'],
        isTrending: true,
    },

    // ===== ACCESSORIES =====
    {
        _id: 'prod_013',
        name: 'Golden Aviators',
        slug: 'golden-aviators',
        images: [
            'https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=1000&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1000&auto=format&fit=crop'
        ],
        description: 'Classic aviator sunglasses with gold frames and polarized lenses. UV400 protection with premium case included.',
        brand: 'SunStyle',
        category: 'Accessories',
        price: 89.99,
        discount: 0,
        stock: 25,
        rating: { average: 4.2, count: 8 },
        tags: ['Popular'],
    },
    {
        _id: 'prod_014',
        name: 'Leather Card Holder',
        slug: 'leather-card-holder',
        images: [
            'https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=1000&auto=format&fit=crop'
        ],
        description: 'Minimalist genuine leather card holder with RFID blocking. Holds up to 6 cards plus cash.',
        brand: 'Artisan',
        category: 'Accessories',
        price: 49.99,
        discount: 0,
        stock: 45,
        rating: { average: 4.6, count: 34 },
        tags: ['New Arrival'],
        isNewArrival: true,
        variations: [
            { type: 'Color', value: 'Black', stock: 15, priceModifier: 0 },
            { type: 'Color', value: 'Brown', stock: 15, priceModifier: 0 },
            { type: 'Color', value: 'Navy', stock: 15, priceModifier: 0 }
        ]
    },
    {
        _id: 'prod_015',
        name: 'Premium Belt',
        slug: 'premium-belt',
        images: [
            'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1000&auto=format&fit=crop'
        ],
        description: 'Full-grain Italian leather belt with brushed steel buckle. Crafted for durability and style.',
        brand: 'Artisan',
        category: 'Accessories',
        price: 79.99,
        discount: 10,
        stock: 30,
        rating: { average: 4.8, count: 22 },
        tags: ['Best Seller'],
        isBestSeller: true,
    },
    {
        _id: 'prod_016',
        name: 'Silk Pocket Square Set',
        slug: 'silk-pocket-square-set',
        images: [
            'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=1000&auto=format&fit=crop'
        ],
        description: 'Set of 4 premium silk pocket squares in classic patterns. Essential for the modern gentleman.',
        brand: 'Sartorial',
        category: 'Accessories',
        price: 69.99,
        discount: 0,
        stock: 20,
        rating: { average: 4.5, count: 11 },
        tags: ['Premium'],
    },

    // ===== MORE PRODUCTS (For Just For You section) =====
    {
        _id: 'prod_017',
        name: 'Wireless Charging Pad',
        slug: 'wireless-charging-pad',
        images: [
            'https://images.unsplash.com/photo-1586816879360-004f5b0c51e5?q=80&w=1000&auto=format&fit=crop'
        ],
        description: 'Fast wireless charger with sleek design. Compatible with all Qi-enabled devices.',
        brand: 'ChargePlus',
        category: 'Gadgets',
        price: 39.99,
        discount: 0,
        stock: 60,
        rating: { average: 4.1, count: 45 },
        tags: ['Popular'],
    },
    {
        _id: 'prod_018',
        name: 'Amber Evening',
        slug: 'amber-evening',
        images: [
            'https://images.unsplash.com/photo-1587017539504-67cfbddac569?q=80&w=1000&auto=format&fit=crop'
        ],
        description: 'Warm, sensual fragrance with amber, vanilla, and sandalwood. Perfect for romantic evenings.',
        brand: 'Imperial Scents',
        category: 'Perfumes',
        price: 139.99,
        discount: 20,
        stock: 14,
        rating: { average: 4.7, count: 19 },
        tags: ['Trending'],
        isTrending: true,
    },
    {
        _id: 'prod_019',
        name: 'Vintage Automatic',
        slug: 'vintage-automatic',
        images: [
            'https://images.unsplash.com/photo-1585123334904-845d60e97b29?q=80&w=1000&auto=format&fit=crop'
        ],
        description: 'Automatic mechanical watch with exhibition caseback. Classic design meets modern craftsmanship.',
        brand: 'Heritage',
        category: 'Watches',
        price: 799.99,
        discount: 0,
        stock: 3,
        rating: { average: 5.0, count: 4 },
        tags: ['Premium', 'Limited'],
    },
    {
        _id: 'prod_020',
        name: 'Travel Duffel Bag',
        slug: 'travel-duffel-bag',
        images: [
            'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1000&auto=format&fit=crop'
        ],
        description: 'Premium canvas and leather duffel bag with multiple compartments. Perfect for weekend getaways.',
        brand: 'Artisan',
        category: 'Accessories',
        price: 189.99,
        discount: 15,
        stock: 18,
        rating: { average: 4.6, count: 27 },
        tags: ['New Arrival'],
        isNewArrival: true,
    },
];

// Helper functions to filter products
const getTrendingProducts = () => products.filter(p => p.isTrending);
const getBestSellers = () => products.filter(p => p.isBestSeller);
const getNewArrivals = () => products.filter(p => p.isNewArrival);
const getByCategory = (category) => products.filter(p => p.category === category);
const getProductById = (id) => products.find(p => p._id === id || p.slug === id);

module.exports = {
    products,
    getTrendingProducts,
    getBestSellers,
    getNewArrivals,
    getByCategory,
    getProductById
};
