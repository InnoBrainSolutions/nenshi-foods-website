import React, { useState } from 'react';
import { CONFECTIONS } from '../data/products';
import { Sparkles, Eye, Plus, Check } from 'lucide-react';
import { useParallax } from '../hooks/useParallax';

export default function Collection({ currency, onSelectProduct, onAddToCart }) {
  const [addedId, setAddedId] = useState(null);

  // Focus strictly on the 4 Crown Jewel masterworks for an uncluttered gallery experience
  const premierItems = CONFECTIONS.slice(0, 4);

  const handleAdd = (product, e) => {
    e.stopPropagation();
    onAddToCart(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1600);
  };

  return (
    <section id="collection" className="collection-section">
      <div className="container">
        
        {/* Clean Editorial Section Header */}
        <div className="clean-section-header text-center">
          <span className="clean-section-eyebrow">HAUTE CONFISERIE REPERTOIRE</span>
          <h2 className="clean-section-title font-royal">The Signature Confections</h2>
          <p className="clean-section-lead font-serif">
            Each creation is prepared in limited daily batches using royal court formulas, stone-ground nuts, and Vedic A2 ghee.
          </p>
        </div>

        {/* Spacious Product Grid */}
        <div className="collection-grid">
          {premierItems.map((product, idx) => {
            const price = currency === "INR" 
              ? `₹${product.priceINR.toLocaleString('en-IN')}` 
              : `$${product.priceUSD}`;

            // Subtle alternating parallax float for magazine-like editorial rhythm
            const cardParallaxY = (idx % 2 === 1 && idx !== 0) 
              ? Math.sin((scrollY - 1100 + idx * 100) * 0.0016) * 10 
              : 0;

            return (
              <article 
                key={product.id}
                className={`product-card ${idx === 0 ? 'product-card-spotlight' : ''}`}
                style={{ transform: `translateY(${cardParallaxY}px)` }}
                onClick={() => onSelectProduct(product)}
              >
                {/* Product Image Frame */}
                <div className="product-image-container">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="product-image"
                    loading="lazy"
                  />
                  
                  {/* Badge */}
                  {product.badge && (
                    <div className="product-badge font-royal">
                      <span>{product.badge}</span>
                    </div>
                  )}

                  {/* Veg mark */}
                  <div className="product-veg-mark">
                    <span className="veg-stamp" aria-label="100% Pure Vegetarian" />
                  </div>

                  {/* Quick inspect overlay button */}
                  <div className="image-hover-action">
                    <button 
                      className="inspect-btn font-sans"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectProduct(product);
                      }}
                    >
                      <Eye size={15} />
                      <span>Inspect Tasting Notes</span>
                    </button>
                  </div>
                </div>

                {/* Product Information */}
                <div className="product-details">
                  <div className="product-meta-row">
                    <span className="product-hindi font-serif">{product.titleHindi}</span>
                    <span className="product-weight">{product.weight}</span>
                  </div>

                  <h3 className="product-name font-royal">{product.name}</h3>
                  <p className="product-desc font-serif">{product.tagline || product.description}</p>

                  <div className="product-footer-row">
                    <div className="product-pricing">
                      <span className="price-label">Price per casket</span>
                      <span className="price-value font-royal">{price}</span>
                    </div>

                    <button
                      className={`btn-acquire ${addedId === product.id ? 'btn-acquired' : ''}`}
                      onClick={(e) => handleAdd(product, e)}
                      aria-label={`Add ${product.name} to bag`}
                    >
                      {addedId === product.id ? (
                        <>
                          <Check size={16} />
                          <span>Acquired</span>
                        </>
                      ) : (
                        <>
                          <Plus size={16} />
                          <span>Acquire Box</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
}
