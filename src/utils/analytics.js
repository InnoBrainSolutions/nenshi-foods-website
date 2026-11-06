import { STORE_CONFIG } from '../config/store';

export const META_PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID || '2059509864735192';

/**
 * Safely invokes Meta Pixel (window.fbq) without throwing if blocked by ad-blockers.
 */
export function trackMetaEvent(eventName, params = {}, isCustom = false) {
  if (typeof window === 'undefined' || typeof window.fbq !== 'function') {
    return;
  }
  try {
    const command = isCustom ? 'trackCustom' : 'track';
    window.fbq(command, eventName, params);
  } catch {
    // Silently ignore blocked or third-party script errors
  }
}

/**
 * Standard Meta Event: ViewContent
 * Fired when a visitor inspects a sweet's details/modal or packaging box.
 */
export function trackViewContent(product, currency = 'INR') {
  if (!product) return;
  const unitPrice = Number(currency === 'INR' ? product.priceINR : product.priceUSD) || 0;

  trackMetaEvent('ViewContent', {
    content_ids: [String(product.id)],
    contents: [
      {
        id: String(product.id),
        quantity: 1,
        item_price: unitPrice
      }
    ],
    content_name: product.name,
    content_category: product.category || 'Traditional Indian Mithai',
    content_type: 'product',
    value: unitPrice,
    currency
  });
}

/**
 * Standard Meta Event: AddToCart
 * Fired when a customer adds any sweet or gift box to their shopping bag.
 */
export function trackAddToCart(product, quantity = 1, currency = 'INR') {
  if (!product) return;
  const unitPrice = Number(currency === 'INR' ? product.priceINR : product.priceUSD) || 0;
  const qty = Number(quantity) || 1;

  trackMetaEvent('AddToCart', {
    content_ids: [String(product.id)],
    contents: [
      {
        id: String(product.id),
        quantity: qty,
        item_price: unitPrice
      }
    ],
    content_name: product.name,
    content_category: product.category || 'Traditional Indian Mithai',
    content_type: 'product',
    num_items: qty,
    value: unitPrice * qty,
    currency
  });
}

/**
 * Standard Meta Event: InitiateCheckout
 * Fired when a customer clicks "Proceed to Order" inside the shopping bag.
 */
export function trackInitiateCheckout(cartItems = [], totalValue = 0, currency = 'INR') {
  if (!cartItems.length) return;

  const contents = cartItems.map((item) => ({
    id: String(item.id),
    quantity: Number(item.quantity) || 1,
    item_price: Number(currency === 'INR' ? item.priceINR : item.priceUSD) || 0
  }));

  const numItems = cartItems.reduce((sum, item) => sum + (Number(item.quantity) || 1), 0);

  trackMetaEvent('InitiateCheckout', {
    content_ids: cartItems.map((item) => String(item.id)),
    contents,
    content_name: `${STORE_CONFIG.name} Order Bag`,
    content_category: 'Traditional Indian Mithai',
    content_type: 'product',
    num_items: numItems,
    value: Number(totalValue) || 0,
    currency
  });
}

/**
 * Standard Meta Event: Purchase & Lead
 * Fired when a customer completes the delivery form and dispatches a WhatsApp order.
 */
export function trackWhatsAppPurchase(cartItems = [], totalValue = 0, currency = 'INR', customerInfo = {}) {
  if (!cartItems.length) return;

  const contents = cartItems.map((item) => ({
    id: String(item.id),
    quantity: Number(item.quantity) || 1,
    item_price: Number(currency === 'INR' ? item.priceINR : item.priceUSD) || 0
  }));

  const numItems = cartItems.reduce((sum, item) => sum + (Number(item.quantity) || 1), 0);

  trackMetaEvent('Purchase', {
    content_ids: cartItems.map((item) => String(item.id)),
    contents,
    content_name: 'WhatsApp Direct Mithai Order',
    content_category: 'Traditional Indian Mithai',
    content_type: 'product',
    num_items: numItems,
    value: Number(totalValue) || 0,
    currency,
    delivery_city: customerInfo.address ? customerInfo.address.slice(0, 60) : undefined
  });
}

/**
 * Standard Meta Event: Contact
 * Fired when a visitor clicks a direct WhatsApp chat button or link.
 */
export function trackWhatsAppContact(source = 'floating_widget') {
  trackMetaEvent('Contact', {
    content_name: 'WhatsApp Direct Inquiry',
    content_category: source
  });
}

/**
 * Standard Meta Event: Lead
 * Fired when a visitor subscribes to the newsletter in the footer.
 */
export function trackNewsletterLead() {
  trackMetaEvent('Lead', {
    content_name: 'Newsletter Subscription',
    content_category: 'Footer Gazette'
  });
}

