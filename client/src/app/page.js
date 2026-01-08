"use client";
import { motion } from 'framer-motion';
import Footer from '../components/layout/Footer';
import Hero from '../components/home/Hero';
import CategoryShowcase from '../components/home/CategoryShowcase';
import ProductSection from '../components/home/ProductSection';
import TopCustomers from '../components/home/TopCustomers';

const revealVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

export default function Home() {
  return (
    <main>
      <Hero />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.1 }}
        variants={revealVariants}
      >
        <CategoryShowcase />
      </motion.div>

      {/* Featured Products */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.1 }}
        variants={revealVariants}
      >
        <ProductSection title="Our Products" apiEndpoint="/products" />
      </motion.div>

      {/* Trending Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.1 }}
        variants={revealVariants}
      >
        <ProductSection title="Trending Products" apiEndpoint="/products/trending" />
      </motion.div>

      {/* New Arrivals */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.1 }}
        variants={revealVariants}
      >
        <ProductSection title="New Arrivals" apiEndpoint="/products/newarrivals" />
      </motion.div>

      {/* Top Selling */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.1 }}
        variants={revealVariants}
      >
        <ProductSection title="Top Selling Products" apiEndpoint="/products/bestsellers" />
      </motion.div>

      {/* Just For You */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.1 }}
        variants={revealVariants}
      >
        <ProductSection title="Just For You" apiEndpoint="/products" />
      </motion.div>

      {/* Top Customers Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.1 }}
        variants={revealVariants}
      >
        <TopCustomers />
      </motion.div>

      <Footer />
    </main>
  );
}
