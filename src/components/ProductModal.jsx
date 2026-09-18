import React, { useState, useEffect } from 'react';
import { X, Plus, Minus, Check } from 'lucide-react';

export default function ProductModal({ product, currency, onClose, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeView, setActiveView] = useState('sweet'); // 'sweet' | 'box'
  const [selectedSize, setSelectedSize] = useState('250g'); // '250g' | '500g'

  useEffect(() => {
    if (!product) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [product, onClose]);

  if (!product) return null;

  const activeSize = product.sizes?.find(s => s.size === selectedSize) || product.sizes?.[0];
  const unitPrice = activeSize 
    ? (currency === "INR" ? activeSize.priceINR : activeSize.priceUSD)
    : (currency === "INR" ? product.priceINR : product.priceUSD);
  const totalPrice = unitPrice * quantity;
  const formattedPrice = currency === "INR" ? `₹${totalPrice.toLocaleString('en-IN')}` : `$${totalPrice}`;

  const handleAdd = () => {
    onAddToCart({
      ...product,
      id: `${product.id}-${selectedSize}`,
      name: `${product.name} (${selectedSize} Box)`,
      weight: activeSize?.weight || `${selectedSize} Box`,
      priceINR: activeSize ? activeSize.priceINR : product.priceINR,
      priceUSD: activeSize ? activeSize.priceUSD : product.priceUSD,
      image: currentDisplayImage
    }, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1200);
  };

  const currentDisplayImage = activeView === 'box' && product.packagingImage ? product.packagingImage : product.image;

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        
        {/* Close Button */}
        <button className="modal-close-btn" onClick={onClose} aria-label="Close detail modal">
          <X size={20} />
        </button>

        <div className="modal-inner-grid">
          
          {/* Left Column: Product Visual */}
          <div className="modal-visual-pane">
            <div className="modal-image-wrapper">
              <img src={currentDisplayImage} alt={product.name} className="modal-image" />
              {product.badge && (
                <div className="modal-badge font-royal">
                  <span>{activeView === 'box' ? 'Official Gift Box' : product.badge}</span>
                </div>
              )}
            </div>

            {/* Packaging / Sweet View Switcher if Box Image exists */}
            {product.packagingImage && (
              <div className="modal-view-switcher">
                <button 
                  type="button"
                  className={`modal-switch-btn ${activeView === 'sweet' ? 'active' : ''}`}
                  onClick={() => setActiveView('sweet')}
                  data-magnetic
                >
                  Fresh Mithai
                </button>
                <button 
                  type="button"
                  className={`modal-switch-btn ${activeView === 'box' ? 'active' : ''}`}
                  onClick={() => setActiveView('box')}
                  data-magnetic
                >
                  Gift Box Packaging
                </button>
              </div>
            )}

            <div className="modal-veg-row">
              <span className="veg-stamp" aria-hidden="true" />
              <span className="modal-veg-text font-serif">100% Pure Vegetarian</span>
            </div>
          </div>

          {/* Right Column: Tasting Notes & Confection Anatomy */}
          <div className="modal-content-pane">
            
            <div className="modal-header">
              <span className="modal-hindi font-serif">{product.titleHindi}</span>
              <h2 className="modal-title font-royal">{product.name}</h2>
              <span className="modal-weight">{activeSize ? activeSize.weight : product.weight}</span>
            </div>

            {/* Size Selector: 250g & 500g */}
            {product.sizes && (
              <div className="modal-size-picker">
                <span className="size-picker-label font-royal">Select Box Size:</span>
                <div className="size-picker-options">
                  {product.sizes.map((s) => {
                    const sPrice = currency === "INR" ? `₹${s.priceINR}` : `$${s.priceUSD}`;
                    const isSelected = selectedSize === s.size;
                    return (
                      <button
                        key={s.size}
                        type="button"
                        className={`size-picker-chip ${isSelected ? 'active' : ''}`}
                        onClick={() => setSelectedSize(s.size)}
                        data-magnetic
                      >
                        <span className="size-chip-weight font-royal">{s.size} Box</span>
                        <span className="size-chip-price font-serif">{sPrice}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <p className="modal-description font-serif">{product.description}</p>

            {/* Tasting Notes */}
            {product.tastingNotes && (
              <div className="modal-tasting-grid">
                <div className="tasting-item">
                  <span className="tasting-key">Aroma</span>
                  <span className="tasting-val font-serif">{product.tastingNotes.aroma}</span>
                </div>
                <div className="tasting-item">
                  <span className="tasting-key">Palate Texture</span>
                  <span className="tasting-val font-serif">{product.tastingNotes.texture}</span>
                </div>
                <div className="tasting-item">
                  <span className="tasting-key">Sweetness Balance</span>
                  <span className="tasting-val font-serif">{product.tastingNotes.sweetness}</span>
                </div>
                <div className="tasting-item">
                  <span className="tasting-key">Best Enjoyed With</span>
                  <span className="tasting-val font-serif">{product.tastingNotes.pairing}</span>
                </div>
              </div>
            )}

            {/* Ingredients & Dietary */}
            <div className="modal-ingredients-block">
              <h4 className="block-label font-royal">KEY INGREDIENTS</h4>
              <p className="ingredients-list font-serif">
                {product.ingredients?.join(' · ') || "Goan Cashews, Cane Sugar, Pure Cow Ghee, Silver Leaf."}
              </p>
            </div>

            {/* Shelf Life Note */}
            {product.shelfLife && (
              <div className="modal-shelflife">
                <span className="shelflife-label">Shelf Life:</span>
                <span className="shelflife-text font-serif">{product.shelfLife}</span>
              </div>
            )}

            {/* Purchase Row */}
            <div className="modal-action-row">
              <div className="quantity-stepper">
                <button 
                  className="step-btn" 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  aria-label="Decrease quantity"
                >
                  <Minus size={14} />
                </button>
                <span className="qty-number font-royal">{quantity}</span>
                <button 
                  className="step-btn" 
                  onClick={() => setQuantity(quantity + 1)}
                  aria-label="Increase quantity"
                >
                  <Plus size={14} />
                </button>
              </div>

              <button 
                className={`btn-gold modal-add-btn ${added ? 'btn-acquired' : ''}`}
                onClick={handleAdd}
              >
                {added ? (
                  <>
                    <Check size={16} />
                    <span>Added to Bag</span>
                  </>
                ) : (
                  <>
                    <span>Add to Bag · {formattedPrice}</span>
                  </>
                )}
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
