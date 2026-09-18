// Central Store Configuration for Nenshi Foods
// Easily update the owner's WhatsApp number or environment variables here.

export const STORE_CONFIG = {
  name: "Nenshi Foods",
  tagline: "Traditional Indian Sweets & Luxury Mithai Gift Boxes",
  est: "1968",
  
  // WhatsApp order notification number (include country code without + or spaces)
  // Can be overridden by setting VITE_WHATSAPP_NUMBER in .env or Vercel Environment Variables
  whatsappNumber: import.meta.env.VITE_WHATSAPP_NUMBER || "919876543210",
  
  // Official Store Details
  fssaiNumber: "21426990001615",
  address: "New Bus Stand, In Front of Sai Mandir, Kukshi, MP - 454331",
  freeShippingThresholdINR: 999,
  defaultCurrency: "INR"
};
