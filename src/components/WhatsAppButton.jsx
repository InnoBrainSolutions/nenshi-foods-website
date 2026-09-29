import React from 'react';
import { MessageCircle } from 'lucide-react';
import { STORE_CONFIG } from '../config/store';

export default function WhatsAppButton() {
  const handleOpenWhatsApp = () => {
    const url = `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
      'Hello Nenshi Foods! I would like to inquire about your sweets and gift boxes.'
    )}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <button
      onClick={handleOpenWhatsApp}
      className="floating-whatsapp-btn"
      aria-label={`Chat with Nenshi Foods on WhatsApp (${STORE_CONFIG.formattedPhone})`}
      title="Direct Order & Support on WhatsApp"
      data-magnetic
    >
      <MessageCircle className="whatsapp-icon" size={24} />
      <span className="whatsapp-tooltip">Chat with us on WhatsApp</span>
    </button>
  );
}
