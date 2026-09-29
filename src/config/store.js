// Central Store Configuration for Nenshi Foods
// Easily update the owner's WhatsApp number or environment variables here.

export const STORE_CONFIG = {
  name: import.meta.env.VITE_STORE_NAME || "Nenshi Foods",
  tagline: "Traditional Indian Sweets & Luxury Mithai Gift Boxes",
  est: "1968",
  
  // WhatsApp order notification number (include country code without + or spaces)
  // Can be overridden by setting VITE_WHATSAPP_NUMBER in .env or Vercel Environment Variables
  whatsappNumber: import.meta.env.VITE_WHATSAPP_NUMBER || "919039821471",
  formattedPhone: import.meta.env.VITE_FORMATTED_PHONE || "+91 90398 21471",
  
  // Official Store Details
  facebookUrl: import.meta.env.VITE_FACEBOOK_URL || "https://www.facebook.com/share/16Hq412vUyM/?mibextid=wwXIfr",
  fssaiNumber: import.meta.env.VITE_FSSAI_NUMBER || "21426990001615",
  address: import.meta.env.VITE_STORE_ADDRESS || "New Bus Stand, In Front of Sai Mandir, Kukshi, MP - 454331",
  freeShippingThresholdINR: Number(import.meta.env.VITE_FREE_SHIPPING_THRESHOLD) || 999,
  defaultCurrency: "INR"
};
