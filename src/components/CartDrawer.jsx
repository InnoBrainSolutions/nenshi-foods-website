import React, { useState, useEffect } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ArrowLeft, ShieldCheck, Check, MessageCircle, MapPin, Phone, User, Send } from 'lucide-react';
import { STORE_CONFIG } from '../config/store';

export default function CartDrawer({ isOpen, onClose, cartItems, currency, onUpdateQuantity, onRemoveItem, onClearCart }) {
  const [step, setStep] = useState('cart'); // 'cart' | 'checkout' | 'success'
  const [includeGiftCard, setIncludeGiftCard] = useState(true);
  
  // Customer details for WhatsApp order notification
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    giftNote: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [lastOrderUrl, setLastOrderUrl] = useState('');

  // Keyboard accessibility: Close on Escape key & lock body scroll
  useEffect(() => {
    if (!isOpen) return;

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
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const total = cartItems.reduce((sum, item) => {
    const unit = currency === "INR" ? item.priceINR : item.priceUSD;
    return sum + unit * item.quantity;
  }, 0);

  const formattedTotal = currency === "INR" ? `₹${total.toLocaleString('en-IN')}` : `$${total}`;

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Please provide your full name';
    if (!formData.phone.trim()) {
      errors.phone = 'Please provide your contact number';
    } else if (formData.phone.trim().length < 8) {
      errors.phone = 'Please enter a valid phone number';
    }
    if (!formData.address.trim()) errors.address = 'Please enter delivery address & city';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleProceedToCheckout = () => {
    setStep('checkout');
  };

  const handleBackToCart = () => {
    setStep('cart');
  };

  const handleSendWhatsAppOrder = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Generate beautifully formatted WhatsApp receipt message
    const orderItemsSummary = cartItems
      .map(
        (item, i) =>
          `${i + 1}. *${item.name}* (${item.weight || 'Artisanal Box'})\n   Qty: ${item.quantity} × ${currency === 'INR' ? '₹' + item.priceINR : '$' + item.priceUSD} = ${currency === 'INR' ? '₹' + (item.priceINR * item.quantity) : '$' + (item.priceUSD * item.quantity)}`
      )
      .join('\n');

    const messageText = `*✦ NEW ORDER — NENSHI FOODS ✦*
────────────────────────
*CUSTOMER DETAILS*
👤 *Name:* ${formData.name.trim()}
📞 *Phone:* ${formData.phone.trim()}
📍 *Delivery Address:* ${formData.address.trim()}
${includeGiftCard && formData.giftNote.trim() ? `💌 *Gift Note:* "${formData.giftNote.trim()}"\n` : ''}
────────────────────────
*ORDER ITEMS (${cartItems.length})*
${orderItemsSummary}
────────────────────────
💰 *TOTAL PAYABLE:* ${formattedTotal}
💳 *Payment Mode:* Cash on Delivery / UPI
✨ *Packing:* Safe Food-Grade Luxury Pack

_Please confirm my order and share estimated dispatch time!_`;

    const encodedMsg = encodeURIComponent(messageText);
    const whatsappUrl = `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodedMsg}`;

    setLastOrderUrl(whatsappUrl);
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    setStep('success');
  };

  const handleFinishCheckout = () => {
    setStep('cart');
    setFormData({ name: '', phone: '', address: '', giftNote: '' });
    onClearCart();
    onClose();
  };

  return (
    <div className="drawer-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="drawer-panel" onClick={(e) => e.stopPropagation()}>
        
        {/* Drawer Header */}
        <div className="drawer-header">
          <div className="drawer-title-block">
            <span className="drawer-pre font-serif">
              {step === 'checkout' ? 'Direct Order' : step === 'success' ? 'Confirmed' : 'Fresh Mithai'}
            </span>
            <h3 className="drawer-title font-royal">
              {step === 'checkout' ? 'Delivery Details' : step === 'success' ? 'Order Dispatched' : 'Your Shopping Bag'}
            </h3>
          </div>
          <button className="drawer-close-btn" onClick={onClose} aria-label="Close Bag">
            <X size={20} />
          </button>
        </div>

        {/* STEP 3: Order Success Overlay */}
        {step === 'success' ? (
          <div className="checkout-success-view">
            <div className="success-crest font-royal">✦ NENSHI FOODS ✦</div>
            <div className="success-icon-wrap">
              <Check size={28} className="success-check" />
            </div>
            <h4 className="success-heading font-royal">Order Sent via WhatsApp!</h4>
            <p className="success-message font-serif">
              Your order message has been generated and sent directly to Nenshi Foods. We will confirm your delivery and share tracking shortly.
            </p>
            <div className="success-manifesto">
              <div className="manifesto-row">
                <span>Customer:</span>
                <strong>{formData.name || 'Valued Guest'}</strong>
              </div>
              <div className="manifesto-row">
                <span>Total Settled:</span>
                <strong>{formattedTotal}</strong>
              </div>
              <div className="manifesto-row">
                <span>Notification:</span>
                <span>Sent to WhatsApp ({STORE_CONFIG.whatsappNumber})</span>
              </div>
            </div>

            {lastOrderUrl && (
              <a
                href={lastOrderUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp btn-full"
                style={{ marginBottom: '0.85rem' }}
              >
                <MessageCircle size={18} />
                <span>Open WhatsApp Chat Again</span>
              </a>
            )}

            <button className="btn-gold btn-full" onClick={handleFinishCheckout}>
              <span>Continue Shopping</span>
            </button>
          </div>
        ) : step === 'checkout' ? (
          /* STEP 2: Customer Contact & Delivery Form */
          <div className="drawer-body checkout-form-view">
            <button type="button" className="btn-back-cart" onClick={handleBackToCart}>
              <ArrowLeft size={16} />
              <span>Back to Bag</span>
            </button>

            <div className="checkout-hero-note font-serif">
              <span>Orders are received instantly by our kitchen team via WhatsApp. No online prepayment required.</span>
            </div>

            <form onSubmit={handleSendWhatsAppOrder} className="checkout-form">
              <div className="checkout-field">
                <label className="checkout-label font-serif" htmlFor="cust-name">
                  <User size={14} />
                  <span>Full Name *</span>
                </label>
                <input
                  id="cust-name"
                  type="text"
                  className={`checkout-input ${formErrors.name ? 'input-error' : ''}`}
                  placeholder="e.g. Anand Varma"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  autoFocus
                />
                {formErrors.name && <span className="field-error-text">{formErrors.name}</span>}
              </div>

              <div className="checkout-field">
                <label className="checkout-label font-serif" htmlFor="cust-phone">
                  <Phone size={14} />
                  <span>WhatsApp / Contact Number *</span>
                </label>
                <input
                  id="cust-phone"
                  type="tel"
                  className={`checkout-input ${formErrors.phone ? 'input-error' : ''}`}
                  placeholder="e.g. +91 98260 XXXXX"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                />
                {formErrors.phone && <span className="field-error-text">{formErrors.phone}</span>}
              </div>

              <div className="checkout-field">
                <label className="checkout-label font-serif" htmlFor="cust-address">
                  <MapPin size={14} />
                  <span>Delivery Address & City *</span>
                </label>
                <textarea
                  id="cust-address"
                  rows={3}
                  className={`checkout-input checkout-textarea ${formErrors.address ? 'input-error' : ''}`}
                  placeholder="Street address, landmark, city, and pin code"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                />
                {formErrors.address && <span className="field-error-text">{formErrors.address}</span>}
              </div>

              {includeGiftCard && (
                <div className="checkout-field">
                  <label className="checkout-label font-serif" htmlFor="cust-note">
                    <span>Complimentary Gift Card Message (Optional)</span>
                  </label>
                  <input
                    id="cust-note"
                    type="text"
                    className="checkout-input"
                    placeholder="e.g. Wishing you warm festivities & joyous celebrations!"
                    value={formData.giftNote}
                    onChange={(e) => handleInputChange('giftNote', e.target.value)}
                  />
                </div>
              )}

              <div className="checkout-order-summary-box">
                <div className="summary-row font-serif">
                  <span>Selected Sweets:</span>
                  <span>{cartItems.reduce((acc, it) => acc + it.quantity, 0)} boxes</span>
                </div>
                <div className="summary-row font-serif">
                  <span>Total Amount:</span>
                  <strong className="summary-total font-royal">{formattedTotal}</strong>
                </div>
              </div>

              <button type="submit" className="btn-whatsapp btn-full">
                <MessageCircle size={19} />
                <span>Place Order via WhatsApp</span>
                <Send size={16} />
              </button>
            </form>
          </div>
        ) : (
          /* STEP 1: Normal Cart Items View */
          <>
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
                  <span>Carefully packed for safe delivery · Direct Kitchen Notification</span>
                </div>

                <div className="drawer-subtotal-row">
                  <span className="subtotal-label font-serif">Subtotal</span>
                  <span className="subtotal-amount font-royal">{formattedTotal}</span>
                </div>

                <button className="btn-gold btn-full" onClick={handleProceedToCheckout}>
                  <span>Proceed to Order</span>
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
