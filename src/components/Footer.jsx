import React, { useState } from 'react';
import { Send, Check } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="footer-root">
      
      {/* Top Ornamental Transition Resolving Into The Hallmark */}
      <div className="footer-hallmark-banner">
        <div className="hallmark-divider-line" />
        <div className="hallmark-emblem">
          <svg viewBox="0 0 100 100" className="footer-star-svg" aria-hidden="true">
            <defs>
              <linearGradient id="footerGold" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#DFC07A" />
                <stop offset="50%" stopColor="#C59A45" />
                <stop offset="100%" stopColor="#704313" />
              </linearGradient>
            </defs>
            <g transform="translate(50, 50)">
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                <polygon
                  key={i}
                  points="0,0 8,-18 0,-42 -8,-18"
                  transform={`rotate(${angle})`}
                  fill="url(#footerGold)"
                  opacity="0.85"
                />
              ))}
              <circle r="8" fill="#FBF8F2" stroke="url(#footerGold)" strokeWidth="1.5" />
              <text x="0" y="3" textAnchor="middle" fill="#704313" fontSize="6" fontFamily="serif" fontWeight="bold">N</text>
            </g>
          </svg>
          <span className="footer-brand-title font-swash">Nenshi Foods</span>
          <span className="footer-brand-tag font-serif">Traditional Indian Sweets · Since 1968</span>
        </div>
        <div className="hallmark-divider-line" />
      </div>

      <div className="container footer-content-grid">
        
        {/* Col 1: Brand & Heritage */}
        <div className="footer-col brand-col">
          <div className="footer-hindi-mark font-serif">नेंशी मिठास</div>
          <p className="footer-bio font-serif">
            Since 1968, Nenshi Foods has been making traditional Indian sweets with real milk, pure desi ghee, whole nuts, and time-tested recipes. Freshly made in small batches every day.
          </p>
          <div className="footer-veg-inline">
            <span className="veg-stamp" aria-hidden="true" />
            <span>100% Pure Vegetarian</span>
          </div>
        </div>

        {/* Col 2: Store & Kitchen */}
        <div className="footer-col">
          <h4 className="footer-heading font-royal">Visit & Contact</h4>
          <div className="atelier-list font-serif">
            <div className="footer-address-block">
              <strong className="footer-location-title">Sweet Shop & Kitchen</strong>
              <address className="footer-location-address">
                New Bus Stand, In Front of Sai Mandir,<br />
                Kukshi, District Dhar,<br />
                Madhya Pradesh — 454331
              </address>
            </div>
            <div className="footer-fssai-box">
              <span className="fssai-tag">Govt. Food Safety License</span>
              <span className="fssai-number">
                FSSAI Lic. No: <strong>21426990001615</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Col 3: Sweets Links */}
        <div className="footer-col">
          <h4 className="footer-heading font-royal">Our Sweets</h4>
          <ul className="footer-links-list">
            <li><a href="#sweet-showcase">Kaju Katli</a></li>
            <li><a href="#sweet-showcase">Milk Cake</a></li>
            <li><a href="#sweet-showcase">Mathura Peda</a></li>
            <li><a href="#sweet-showcase">Besan Laddu</a></li>
            <li><a href="#unboxing">Gift Boxes</a></li>
            <li><a href="#crafts">How We Make It</a></li>
            <li><a href="#purity">Our Purity Promise</a></li>
          </ul>
        </div>

        {/* Col 4: Newsletter Subscription */}
        <div className="footer-col gazette-col">
          <h4 className="footer-heading font-royal">Stay in Touch</h4>
          <p className="gazette-desc font-serif">
            Get updates on new sweets, festive collections, and seasonal specials.
          </p>
          <form className="gazette-form" onSubmit={handleSubscribe}>
            <div className="gazette-input-wrap">
              <input 
                type="email" 
                className="gazette-input font-serif" 
                placeholder="Enter your email address..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="gazette-btn" aria-label="Subscribe to updates">
                {subscribed ? <Check size={16} /> : <Send size={16} />}
              </button>
            </div>
            {subscribed && (
              <span className="gazette-confirmed font-serif">
                Thank you for subscribing to Nenshi Foods.
              </span>
            )}
          </form>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom-bar">
        <div className="container bottom-content">
          <span className="copy-text">
            © {new Date().getFullYear()} Nenshi Foods Private Limited. All rights reserved.
          </span>
          <div className="bottom-links">
            <a href="#purity">FSSAI Lic. No: 21426990001615</a>
            <span>·</span>
            <a href="#gifting">Gifting Inquiries</a>
            <span>·</span>
            <a href="#">Privacy & Terms</a>
          </div>
        </div>
      </div>

    </footer>
  );
}
