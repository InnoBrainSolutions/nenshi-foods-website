import React, { useState } from 'react';
import { CONFECTIONS } from '../data/products';
import { Eye, Plus, Check } from 'lucide-react';

export default function Collection({ currency, onSelectProduct, onAddToCart }) {
  const [addedId, setAddedId] = useState(null);
  const [cardViews, setCardViews] = useState({});
  const [cardSizes, setCardSizes] = useState({});

  // Focus strictly on the 4 Crown Jewel masterworks for an uncluttered gallery experience
  const premierItems = CONFECTIONS.slice(0, 4);

  const handleAdd = (product, e) => {
    e.stopPropagation();
    const activeSizeKey = cardSizes[product.id] || '250g';
    const sizeObj = product.sizes?.find(s => s.size === activeSizeKey);
    const pINR = sizeObj ? sizeObj.priceINR : (activeSizeKey === '500g' && product.price500INR ? product.price500INR : product.priceINR);
    const pUSD = sizeObj ? sizeObj.priceUSD : (activeSizeKey === '500g' && product.price500USD ? product.price500USD : product.priceUSD);
    const isBox = cardViews[product.id] === 'box';

    onAddToCart({
      ...product,
      id: `${product.id}-${activeSizeKey}`,
      name: `${product.name} (${activeSizeKey} Box)`,
      weight: sizeObj?.weight || `${activeSizeKey} Box`,
      priceINR: pINR,
      priceUSD: pUSD,
      image: isBox && product.packagingImage ? product.packagingImage : product.image
    });
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1600);
  };

  const handleCardMouseMove = (e) => {
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
            const activeSizeKey = cardSizes[product.id] || '250g';
            const sizeObj = product.sizes?.find(s => s.size === activeSizeKey);
            const currentPriceINR = sizeObj ? sizeObj.priceINR : (activeSizeKey === '500g' && product.price500INR ? product.price500INR : product.priceINR);
            const currentPriceUSD = sizeObj ? sizeObj.priceUSD : (activeSizeKey === '500g' && product.price500USD ? product.price500USD : product.priceUSD);
            const price = currency === "INR" 
              ? `₹${currentPriceINR.toLocaleString('en-IN')}` 
              : `$${currentPriceUSD}`;

            const isBoxView = cardViews[product.id] === 'box';
            const displayImage = isBoxView && product.packagingImage ? product.packagingImage : product.image;

            return (
              <article 
                key={product.id}
                data-cursor="view"
                className={`product-card ${idx === 0 ? 'product-card-spotlight' : ''}`}
                style={{ 
                  transform: `perspective(800px) rotateX(var(--card-rot-x, 0deg)) rotateY(var(--card-rot-y, 0deg))`
                }}
                onMouseMove={(e) => handleCardMouseMove(e, product.id)}
                onMouseLeave={handleCardMouseLeave}
                onClick={() => onSelectProduct(product)}
              >
                {/* Product Image Frame */}
                <div className="product-image-container">
                  <img 
                    src={displayImage} 
                    alt={product.name}
                    className={`product-image ${isBoxView ? 'product-image-box' : ''}`}
                    style={{
                      transform: `translate3d(var(--card-img-x, 0px), var(--card-img-y, 0px), 0) scale(var(--card-img-scale, 1))`
                    }}
                    loading="lazy"
                  />
                  
                  {/* Badge */}
                  {product.badge && (
                    <div className="product-badge font-royal">
                      <span>{isBoxView ? 'Official Gift Box' : product.badge}</span>
                    </div>
                  )}

                  {/* Veg mark */}
                  <div className="product-veg-mark">
                    <span className="veg-stamp" aria-label="100% Pure Vegetarian" />
                  </div>

                  {/* Card View Switcher Pill: Sweet vs Box */}
                  {product.packagingImage && (
                    <div className="card-view-toggle" onClick={(e) => e.stopPropagation()}>
                      <button
                        type="button"
                        className={`card-view-btn ${!isBoxView ? 'active' : ''}`}
                        onClick={() => setCardViews(prev => ({ ...prev, [product.id]: 'sweet' }))}
                        title="View Fresh Sweet"
                      >
                        Sweet
                      </button>
                      <button
                        type="button"
                        className={`card-view-btn ${isBoxView ? 'active' : ''}`}
                        onClick={() => setCardViews(prev => ({ ...prev, [product.id]: 'box' }))}
                        title="View Box Packaging"
                      >
                        Box
                      </button>
                    </div>
                  )}

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
                    <span className="product-weight">{sizeObj?.weight || (activeSizeKey + " Box")}</span>
                  </div>

                  <h3 className="product-name font-royal">{product.name}</h3>
                  <p className="product-desc font-serif">{product.tagline || product.description}</p>

                  {/* Size Selector for 250g / 500g */}
                  {product.sizes && (
                    <div className="product-size-row" onClick={(e) => e.stopPropagation()}>
                      <span className="size-row-label">Box Size:</span>
                      <div className="size-row-chips">
                        {product.sizes.map((s) => {
                          const sPrice = currency === "INR" ? `₹${s.priceINR}` : `$${s.priceUSD}`;
                          return (
                            <button
                              key={s.size}
                              type="button"
                              className={`size-mini-chip ${activeSizeKey === s.size ? 'active' : ''}`}
                              onClick={() => setCardSizes(prev => ({ ...prev, [product.id]: s.size }))}
                            >
                              <span>{s.size}</span>
                              <span className="mini-chip-price">{sPrice}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  <div className="product-footer-row">
                    <div className="product-pricing">
                      <span className="price-label">Price ({activeSizeKey})</span>
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
