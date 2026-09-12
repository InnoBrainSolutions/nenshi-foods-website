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
          <span className="footer-brand-tag font-serif">A Jewel Box of Indian Sweetness · Confectioners to Royal Palaces</span>
        </div>
        <div className="hallmark-divider-line" />
      </div>

      <div className="container footer-content-grid">
        
        {/* Col 1: Brand & Heritage */}
        <div className="footer-col brand-col">
          <div className="footer-hindi-mark font-serif">नेंशी मिठास</div>
          <p className="footer-bio font-serif">
            Founded in 1968, Nenshi Foods preserves the vanishing arts of royal confectionery. We honour the slow simmer, the hand-beaten silver foil, and the purity of unbroken cashews and A2 whole milk.
          </p>
          <div className="footer-veg-inline">
            <span className="veg-stamp" aria-hidden="true" />
            <span>Certified 100% Satvik Pure Vegetarian</span>
          </div>
        </div>

        {/* Col 2: The Ateliers */}
        <div className="footer-col">
          <h4 className="footer-heading font-royal">Heritage Ateliers</h4>
          <ul className="atelier-list font-serif">
            <li>
              <strong>Jaipur</strong>
              <span>Johari Bazaar, Near City Palace</span>
            </li>
            <li>
              <strong>Udaipur</strong>
              <span>Surajpole Heritage Enclave</span>
            </li>
            <li>
              <strong>Mumbai</strong>
              <span>Marine Drive Private Tasting Salon</span>
            </li>
            <li>
              <strong>New Delhi</strong>
              <span>Defence Colony Heritage Quarter</span>
            </li>
            <li>
              <strong>London Concierge</strong>
              <span>Mayfair Private Gifting Suite</span>
            </li>
          </ul>
        </div>

        {/* Col 3: Repertoire Links */}
        <div className="footer-col">
          <h4 className="footer-heading font-royal">Repertoire</h4>
          <ul className="footer-links-list">
            <li><a href="#unboxing">Swarna Kaju Katli</a></li>
            <li><a href="#collection">The Maharaja Presentation Trunk</a></li>
            <li><a href="#collection">The Darbar Grand Hamper</a></li>
            <li><a href="#collection">The Mughal Jali Treasury</a></li>
            <li><a href="#gifting">Destination Wedding Favours</a></li>
            <li><a href="#crafts">The Five Ancestral Crafts</a></li>
            <li><a href="#purity">Silver Vark Laboratory Certifications</a></li>
          </ul>
        </div>

        {/* Col 4: Private Gazette Subscription */}
        <div className="footer-col gazette-col">
          <h4 className="footer-heading font-royal">The Royal Gazette</h4>
          <p className="gazette-desc font-serif">
            Receive private correspondence regarding seasonal small batches: Kashmiri Saffron harvest confections, Ratnagiri Alphonso mango katli, and bespoke festive hampers.
          </p>
          <form className="gazette-form" onSubmit={handleSubscribe}>
            <div className="gazette-input-wrap">
              <input 
                type="email" 
                className="gazette-input font-serif" 
                placeholder="Enter your email coordinates..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="gazette-btn" aria-label="Subscribe to gazette">
                {subscribed ? <Check size={16} /> : <Send size={16} />}
              </button>
            </div>
            {subscribed && (
              <span className="gazette-confirmed font-serif">
                Auspicious correspondence registered. Welcome to the Nanshi circle.
              </span>
            )}
          </form>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom-bar">
        <div className="container bottom-content">
          <span className="copy-text">
            © {new Date().getFullYear()} Nanshi Foods Private Limited. All rights reserved.
          </span>
          <div className="bottom-links">
            <a href="#purity">Food Safety & FSSAI Lic. 1001802100345</a>
            <span>·</span>
            <a href="#gifting">Bespoke Concierge</a>
            <span>·</span>
            <a href="#">Privacy & Terms</a>
          </div>
        </div>
      </div>

    </footer>
  );
}
