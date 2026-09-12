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

  const handleCardMouseMove = (e, id) => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.setProperty('--card-rot-x', `${-y * 6}deg`);
    card.style.setProperty('--card-rot-y', `${x * 6}deg`);
    card.style.setProperty('--card-img-x', `${x * 8}px`);
    card.style.setProperty('--card-img-y', `${y * 8}px`);
  };

  const handleCardMouseLeave = (e) => {
    const card = e.currentTarget;
    card.style.removeProperty('--card-rot-x');
    card.style.removeProperty('--card-rot-y');
    card.style.removeProperty('--card-img-x');
    card.style.removeProperty('--card-img-y');
  };

  return (
    <section id="collection" className="collection-section">
      <div className="container">
        
        {/* Clean Editorial Section Header with Scroll Reveal */}
        <div className="clean-section-header text-center reveal-on-scroll">
          <span className="clean-section-eyebrow">OUR SWEETS</span>
          <h2 className="clean-section-title font-royal">Signature Mithai</h2>
          <p className="clean-section-lead font-serif">
            Made with pure desi ghee, whole nuts, and time-tested recipes. Freshly prepared in small batches every day.
          </p>
        </div>

        {/* Spacious Product Grid with Staggered Scroll Reveal */}
        <div className="collection-grid reveal-stagger">
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
                data-cursor="view"
                className={`product-card ${idx === 0 ? 'product-card-spotlight' : ''}`}
                style={{ 
                  transform: `translateY(${cardParallaxY}px) perspective(800px) rotateX(var(--card-rot-x, 0deg)) rotateY(var(--card-rot-y, 0deg))`
                }}
                onMouseMove={(e) => handleCardMouseMove(e, product.id)}
                onMouseLeave={handleCardMouseLeave}
                onClick={() => onSelectProduct(product)}
              >
                {/* Product Image Frame */}
                <div className="product-image-container">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="product-image"
                    style={{
                      transform: `translate3d(var(--card-img-x, 0px), var(--card-img-y, 0px), 0) scale(var(--card-img-scale, 1))`
                    }}
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
                      data-magnetic
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectProduct(product);
                      }}
                    >
                      <Eye size={15} />
                      <span>Quick View</span>
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
                      <span className="price-label">Per box</span>
                      <span className="price-value font-royal">{price}</span>
                    </div>

                    <button
                      className={`btn-acquire ${addedId === product.id ? 'btn-acquired' : ''}`}
                      data-magnetic
                      onClick={(e) => handleAdd(product, e)}
                      aria-label={`Add ${product.name} to bag`}
                    >
                      {addedId === product.id ? (
                        <>
                          <Check size={16} />
                          <span>Added to Bag</span>
                        </>
                      ) : (
                        <>
                          <Plus size={16} />
                          <span>Add to Bag</span>
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
