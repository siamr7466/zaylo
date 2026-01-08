"use client";
import { useState, useContext, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { LuStar, LuShoppingCart, LuHeart, LuShare2, LuMinus, LuPlus, LuTruck, LuShield, LuRefreshCw } from 'react-icons/lu';
import styles from './ProductDetail.module.css';
import CartContext from '../../context/CartContext';
import api from '../../lib/api';
import { productData } from '../../data/products';

// Helper to get rating value from either object or number
const getRating = (rating) => {
    if (typeof rating === 'object' && rating !== null) {
        return rating.average || 0;
    }
    return rating || 0;
};

// Helper to get review count from either rating object or numReviews
const getReviewCount = (product) => {
    if (typeof product.rating === 'object' && product.rating !== null) {
        return product.rating.count || 0;
    }
    return product.numReviews || 0;
};

const ProductDetail = () => {
    const params = useParams();
    const { addToCart } = useContext(CartContext);
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);
    const [activeTab, setActiveTab] = useState('description');
    const [userRating, setUserRating] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const [questionText, setQuestionText] = useState('');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await api.get(`/products/${params.id}`);
                setProduct(data);
            } catch (error) {
                console.error('Error fetching product:', error);

                // Find product in mock data
                const allProducts = Object.values(productData).flat();
                const foundProduct = allProducts.find(p => p._id === params.id);

                if (foundProduct) {
                    setProduct({
                        ...foundProduct,
                        description: `${foundProduct.name} - A premium ${foundProduct.category.toLowerCase()} item that embodies sophistication and quality. Crafted with attention to detail and designed for those who appreciate the finer things in life.`,
                        images: [foundProduct.image, foundProduct.image],
                        reviews: [
                            { user: 'Sarah M.', rating: 5, comment: 'Absolutely love this product! Exceeded my expectations.', date: '2026-01-05' },
                            { user: 'James K.', rating: 4, comment: 'Great quality, highly recommend.', date: '2026-01-03' }
                        ],
                        questions: [
                            { user: 'Emily R.', question: 'Is this authentic?', answer: 'Yes, all our products are 100% authentic and come with a certificate of authenticity.', date: '2026-01-04' }
                        ]
                    });
                }
            }
        };
        fetchProduct();
    }, [params.id]);

    const handleAddToCart = () => {
        addToCart({ ...product, qty: quantity });
    };

    const handleSubmitReview = (e) => {
        e.preventDefault();
        // TODO: Submit review to backend
        console.log('Review submitted:', { rating: userRating, text: reviewText });
        setReviewText('');
        setUserRating(0);
    };

    const handleSubmitQuestion = (e) => {
        e.preventDefault();
        // TODO: Submit question to backend
        console.log('Question submitted:', questionText);
        setQuestionText('');
    };

    if (!product) return <div className={styles.loading}>Loading...</div>;

    return (
        <div className={styles.container}>
            <div className="container">
                {/* Breadcrumb */}
                <div className={styles.breadcrumb}>
                    <Link href="/">Home</Link>
                    <span>/</span>
                    <Link href="/shop">Shop</Link>
                    <span>/</span>
                    <span>{product.category}</span>
                    <span>/</span>
                    <span>{product.name}</span>
                </div>

                {/* Product Main Section */}
                <div className={styles.productMain}>
                    {/* Image Gallery */}
                    <div className={styles.gallery}>
                        <div className={styles.mainImage}>
                            <img src={product.images?.[selectedImage] || product.image} alt={product.name} />
                        </div>
                        {product.images && product.images.length > 1 && (
                            <div className={styles.thumbnails}>
                                {product.images.map((img, idx) => (
                                    <div
                                        key={idx}
                                        className={`${styles.thumbnail} ${selectedImage === idx ? styles.activeThumbnail : ''}`}
                                        onClick={() => setSelectedImage(idx)}
                                    >
                                        <img src={img} alt={`${product.name} ${idx + 1}`} />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div className={styles.productInfo}>
                        <div className={styles.category}>{product.category}</div>
                        <h1 className={styles.title}>{product.name}</h1>

                        {/* Rating */}
                        <div className={styles.ratingSection}>
                            <div className={styles.stars}>
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <LuStar
                                        key={star}
                                        className={star <= Math.floor(getRating(product.rating)) ? styles.starFilled : styles.starEmpty}
                                    />
                                ))}
                            </div>
                            <span className={styles.ratingText}>{getRating(product.rating)} ({getReviewCount(product)} reviews)</span>
                        </div>

                        <div className={styles.price}>${product.price}</div>

                        <p className={styles.description}>{product.description}</p>

                        {/* Quantity Selector */}
                        <div className={styles.quantitySection}>
                            <label>Quantity:</label>
                            <div className={styles.quantityControl}>
                                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} disabled={quantity <= 1}>
                                    <LuMinus />
                                </button>
                                <span>{quantity}</span>
                                <button onClick={() => setQuantity(Math.min(product.stock || product.countInStock || 99, quantity + 1))} disabled={quantity >= (product.stock || product.countInStock || 99)}>
                                    <LuPlus />
                                </button>
                            </div>
                            <span className={styles.stock}>{product.stock || product.countInStock || 'Available'} in stock</span>
                        </div>

                        {/* Action Buttons */}
                        <div className={styles.actions}>
                            <button className={styles.addToCartBtn} onClick={handleAddToCart}>
                                <LuShoppingCart /> Add to Cart
                            </button>
                            <button className={styles.iconAction}>
                                <LuHeart />
                            </button>
                            <button className={styles.iconAction}>
                                <LuShare2 />
                            </button>
                        </div>

                        {/* Features */}
                        <div className={styles.features}>
                            <div className={styles.feature}>
                                <LuTruck />
                                <div>
                                    <strong>Free Shipping</strong>
                                    <p>On orders over $100</p>
                                </div>
                            </div>
                            <div className={styles.feature}>
                                <LuShield />
                                <div>
                                    <strong>Secure Payment</strong>
                                    <p>100% secure transactions</p>
                                </div>
                            </div>
                            <div className={styles.feature}>
                                <LuRefreshCw />
                                <div>
                                    <strong>Easy Returns</strong>
                                    <p>30-day return policy</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs Section */}
                <div className={styles.tabs}>
                    <div className={styles.tabHeaders}>
                        <button
                            className={activeTab === 'description' ? styles.activeTab : ''}
                            onClick={() => setActiveTab('description')}
                        >
                            Description
                        </button>
                        <button
                            className={activeTab === 'reviews' ? styles.activeTab : ''}
                            onClick={() => setActiveTab('reviews')}
                        >
                            Reviews ({getReviewCount(product)})
                        </button>
                        <button
                            className={activeTab === 'questions' ? styles.activeTab : ''}
                            onClick={() => setActiveTab('questions')}
                        >
                            Q&A ({product.questions?.length || 0})
                        </button>
                    </div>

                    <div className={styles.tabContent}>
                        {activeTab === 'description' && (
                            <div className={styles.descriptionTab}>
                                <h3>Product Details</h3>
                                <p>{product.description}</p>
                                <h4>Features:</h4>
                                <ul>
                                    <li>Premium quality materials</li>
                                    <li>Handcrafted with attention to detail</li>
                                    <li>Sustainable and eco-friendly</li>
                                    <li>Designed for longevity</li>
                                </ul>
                            </div>
                        )}

                        {activeTab === 'reviews' && (
                            <div className={styles.reviewsTab}>
                                <div className={styles.reviewSummary}>
                                    <div className={styles.overallRating}>
                                        <div className={styles.bigRating}>{getRating(product.rating)}</div>
                                        <div className={styles.stars}>
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <LuStar key={star} className={star <= Math.floor(getRating(product.rating)) ? styles.starFilled : styles.starEmpty} />
                                            ))}
                                        </div>
                                        <div>{getReviewCount(product)} reviews</div>
                                    </div>
                                </div>

                                {/* Write Review Form */}
                                <form className={styles.reviewForm} onSubmit={handleSubmitReview}>
                                    <h4>Write a Review</h4>
                                    <div className={styles.ratingInput}>
                                        <label>Your Rating:</label>
                                        <div className={styles.stars}>
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <LuStar
                                                    key={star}
                                                    className={star <= userRating ? styles.starFilled : styles.starEmpty}
                                                    onClick={() => setUserRating(star)}
                                                    style={{ cursor: 'pointer' }}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <textarea
                                        placeholder="Share your experience with this product..."
                                        value={reviewText}
                                        onChange={(e) => setReviewText(e.target.value)}
                                        rows={4}
                                    />
                                    <button type="submit" className={styles.submitBtn}>Submit Review</button>
                                </form>

                                {/* Reviews List */}
                                <div className={styles.reviewsList}>
                                    {product.reviews?.map((review, idx) => (
                                        <div key={idx} className={styles.review}>
                                            <div className={styles.reviewHeader}>
                                                <strong>{review.user}</strong>
                                                <div className={styles.stars}>
                                                    {[1, 2, 3, 4, 5].map((star) => (
                                                        <LuStar key={star} className={star <= review.rating ? styles.starFilled : styles.starEmpty} />
                                                    ))}
                                                </div>
                                            </div>
                                            <p>{review.comment}</p>
                                            <span className={styles.reviewDate}>{new Date(review.date).toLocaleDateString()}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'questions' && (
                            <div className={styles.questionsTab}>
                                {/* Ask Question Form */}
                                <form className={styles.questionForm} onSubmit={handleSubmitQuestion}>
                                    <h4>Ask a Question</h4>
                                    <textarea
                                        placeholder="What would you like to know about this product?"
                                        value={questionText}
                                        onChange={(e) => setQuestionText(e.target.value)}
                                        rows={3}
                                    />
                                    <button type="submit" className={styles.submitBtn}>Submit Question</button>
                                </form>

                                {/* Questions List */}
                                <div className={styles.questionsList}>
                                    {product.questions?.map((qa, idx) => (
                                        <div key={idx} className={styles.question}>
                                            <div className={styles.questionText}>
                                                <strong>Q:</strong> {qa.question}
                                                <span className={styles.questionUser}>- {qa.user}</span>
                                            </div>
                                            {qa.answer && (
                                                <div className={styles.answerText}>
                                                    <strong>A:</strong> {qa.answer}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
