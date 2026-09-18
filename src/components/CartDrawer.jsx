import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Check } from 'lucide-react';

export default function CartDrawer({ isOpen, onClose, cartItems, currency, onUpdateQuantity, onRemoveItem, onClearCart }) {
  const [checkoutComplete, setCheckoutComplete] = useState(false);
  const [includeGiftCard, setIncludeGiftCard] = useState(true);

  if (!isOpen) return null;

  const total = cartItems.reduce((sum, item) => {
    const unit = currency === "INR" ? item.priceINR : item.priceUSD;
    return sum + unit * item.quantity;
  }, 0);

  const formattedTotal = currency === "INR" ? `₹${total.toLocaleString('en-IN')}` : `$${total}`;

  const handleCheckout = () => {
    setCheckoutComplete(true);
  };

  const handleFinishCheckout = () => {
    setCheckoutComplete(false);
    onClearCart();
    onClose();
  };

  return (
    <div className="drawer-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="drawer-panel" onClick={(e) => e.stopPropagation()}>
        
        {/* Drawer Header */}
        <div className="drawer-header">
          <div className="drawer-title-block">
            <span className="drawer-pre font-serif">Fresh Mithai</span>
            <h3 className="drawer-title font-royal">Your Shopping Bag</h3>
          </div>
          <button className="drawer-close-btn" onClick={onClose} aria-label="Close Bag">
            <X size={20} />
          </button>
        </div>

        {/* Modal Overlay for Completed Checkout */}
        {checkoutComplete ? (
          <div className="checkout-success-view">
            <div className="success-crest font-royal">✦ NENSHI FOODS ✦</div>
            <div className="success-icon-wrap">
              <Check size={28} className="success-check" />
            </div>
            <h4 className="success-heading font-royal">Order Placed Successfully</h4>
            <p className="success-message font-serif">
              Your order is being freshly prepared and packed with care. You will receive an SMS and email with order tracking details shortly.
            </p>
            <div className="success-manifesto">
              <div className="manifesto-row">
                <span>Total Settled:</span>
                <strong>{formattedTotal}</strong>
              </div>
              <div className="manifesto-row">
                <span>Delivery Mode:</span>
                <span>Carefully Packed Safe Delivery</span>
              </div>
            </div>
            <button className="btn-gold btn-full" onClick={handleFinishCheckout}>
              <span>Continue Shopping</span>
            </button>
          </div>
        ) : (
          <>
            {/* Items List */}
            <div className="drawer-body">
              {cartItems.length === 0 ? (
                <div className="drawer-empty-state">
                  <div className="empty-star font-royal">✦</div>
                  <h4 className="empty-title font-royal">Your Bag Is Empty</h4>
                  <p className="empty-desc font-serif">
                    Explore our signature Kaju Katli, Milk Cake, Mathura Peda, and festive gift boxes.
                  </p>
                  <button className="btn-outline-gold" onClick={onClose}>
                    <span>Explore Sweets</span>
                  </button>
                </div>
              ) : (
                <div className="drawer-items-list">
                  {cartItems.map((item) => {
                    const unitPrice = currency === "INR" ? item.priceINR : item.priceUSD;
                    const itemTotal = unitPrice * item.quantity;
                    const formattedItemTotal = currency === "INR" 
                      ? `₹${itemTotal.toLocaleString('en-IN')}` 
                      : `$${itemTotal}`;

                    return (
                      <div key={item.id} className="drawer-item-row">
                        <img src={item.image} alt={item.name} className="drawer-item-thumb" />
                        
                        <div className="drawer-item-info">
                          <h4 className="drawer-item-title font-royal">{item.name}</h4>
                          <span className="drawer-item-weight">{item.weight}</span>
                          
                          {item.customDetails && (
                            <div className="drawer-custom-tags">
                              <span>Ribbon: {item.customDetails.ribbon}</span>
                              <span>Seal: {item.customDetails.seal}</span>
                            </div>
                          )}

                          <div className="drawer-item-qty-row">
                            <div className="quantity-stepper small-stepper">
                              <button 
                                className="step-btn" 
                                onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                aria-label="Decrease"
                              >
                                <Minus size={12} />
                              </button>
                              <span className="qty-number font-royal">{item.quantity}</span>
                              <button 
                                className="step-btn" 
                                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                aria-label="Increase"
                              >
                                <Plus size={12} />
                              </button>
                            </div>

                            <span className="drawer-item-price font-royal">{formattedItemTotal}</span>
                          </div>
                        </div>

                        <button 
                          className="drawer-remove-btn" 
                          onClick={() => onRemoveItem(item.id)}
                          aria-label="Remove item"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    );
                  })}

                  {/* Complimentary Gift Note Card Option */}
                  <div className="gift-card-toggle-block">
                    <label className="checkbox-container">
                      <input 
                        type="checkbox" 
                        checked={includeGiftCard} 
                        onChange={() => setIncludeGiftCard(!includeGiftCard)} 
                      />
                      <span className="checkbox-custom" />
                      <span className="checkbox-label font-serif">
                        Include complimentary gift note & ribbon
                      </span>
                    </label>
                  </div>
                </div>
              )}
            </div>

            {/* Drawer Footer */}
            {cartItems.length > 0 && (
              <div className="drawer-footer">
                <div className="shipping-badge font-serif">
                  <ShieldCheck size={15} className="shipping-icon" />
                  <span>Carefully packed for safe delivery · Free above ₹999</span>
                </div>

                <div className="drawer-subtotal-row">
                  <span className="subtotal-label font-serif">Subtotal</span>
                  <span className="subtotal-amount font-royal">{formattedTotal}</span>
                </div>

                <button className="btn-gold btn-full" onClick={handleCheckout}>
                  <span>Proceed to Checkout</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
}
