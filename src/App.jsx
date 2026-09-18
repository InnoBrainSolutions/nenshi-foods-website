import React, { useState } from 'react';
import Header from './components/Header';
import ScrollSweetShowcase from './components/ScrollSweetShowcase';
import UnboxingSection from './components/UnboxingSection';
import Collection from './components/Collection';
import Craftsmanship from './components/Craftsmanship';
import PurityPromise from './components/PurityPromise';
import Footer from './components/Footer';
import ProductModal from './components/ProductModal';
import CartDrawer from './components/CartDrawer';
import MouseEffects from './components/MouseEffects';
import { useScrollReveal } from './hooks/useScrollReveal';
import './App.css';

const INITIAL_CART = [
  {
    id: "nenshi-kaju-katli-500g",
    name: "Kaju Katli (500g Box)",
    weight: "500g · 24 Pieces",
    priceINR: 550,
    priceUSD: 9,
    quantity: 1,
    image: "/images/kaju_katli_luxury.webp"
  }
];

export default function App() {
  useScrollReveal();
  const [currency, setCurrency] = useState("INR");
  const [cartItems, setCartItems] = useState(INITIAL_CART);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  React.useEffect(() => {
    if (!window.location.hash) return;
    const target = document.querySelector(window.location.hash);
    if (!target) return;

    const timer = setTimeout(() => {
      target.scrollIntoView({ behavior: 'smooth' });
    }, 150);

    return () => clearTimeout(timer);
  }, []);

  const toggleCurrency = () => {
    setCurrency(prev => prev === "INR" ? "USD" : "INR");
  };

  const handleAddToCart = (product, qty = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          weight: product.weight || "Artisanal Box",
          priceINR: product.priceINR,
          priceUSD: product.priceUSD,
          quantity: qty,
          image: product.image,
          customDetails: product.customDetails || null
        }
      ];
    });
  };

  const handleUpdateQuantity = (id, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(id);
    } else {
      setCartItems(prev =>
        prev.map(item => item.id === id ? { ...item, quantity: newQty } : item)
      );
    }
  };

  const handleRemoveItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="app-shell">
      {/* Subtle Custom Interaction Cursor & Magnetic Field */}
      <MouseEffects />

      {/* Royal Navigation */}
      <Header 
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        currency={currency}
        onToggleCurrency={toggleCurrency}
      />

      <main id="main-content">
        {/* Pinned Scrollytelling Sweet Showcase (Desserto Inspired) */}
        <ScrollSweetShowcase 
          onQuickAdd={handleAddToCart}
          onExploreClick={() => {
            const el = document.getElementById('collection');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* The Unboxing Ritual */}
        <UnboxingSection 
          onQuickAdd={handleAddToCart}
        />

        {/* Signature Mithai Collection */}
        <Collection 
          currency={currency}
          onSelectProduct={(product) => setSelectedProduct(product)}
          onAddToCart={handleAddToCart}
        />

        {/* How We Make It - Made with Patience */}
        <Craftsmanship />

        {/* Our Purity Promise */}
        <PurityPromise />
      </main>

      {/* Hallmark Resolving Footer */}
      <Footer />

      {/* Tasting Notes & Sensory Modal */}
      <ProductModal 
        product={selectedProduct}
        currency={currency}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Luxury Cart & Checkout Drawer */}
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        currency={currency}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />
    </div>
  );
}
