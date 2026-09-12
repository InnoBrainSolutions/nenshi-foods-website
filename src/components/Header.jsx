import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, Sparkles } from 'lucide-react';

export default function Header({ cartCount, onOpenCart, currency, onToggleCurrency }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header-root ${scrolled ? 'header-scrolled' : ''}`}>
      {/* Royal Announcement Ribbon */}
      <div className="announcement-bar">
        <div className="container announcement-content">
          <span className="announcement-text">
            ROYAL CONFECTIONERY · COMPLIMENTARY INSURED AIR DISPATCH
          </span>
          <div className="announcement-right">
            <button 
              className="currency-toggle-btn"
              onClick={onToggleCurrency}
              title="Switch currency"
              aria-label="Toggle currency"
            >
              {currency}
            </button>
            <div className="veg-badge-inline" title="100% Pure Vegetarian Confectionery">
              <span className="veg-stamp" aria-hidden="true" />
              <span>100% SATVIK</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className="main-nav" aria-label="Main Navigation">
        <div className="container nav-container">
          
          {/* Mobile Menu Button */}
          <button 
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Left Nav Links */}
          <div className="nav-links nav-left">
            <a href="#unboxing" className="nav-item">The Jewel Box</a>
            <a href="#collection" className="nav-item">Collection</a>
          </div>

          {/* Center Brand Crest */}
          <a href="#" className="brand-crest" aria-label="Nenshi Foods Home">
            <div className="crest-emblem">
              <span className="crest-title font-swash">Nenshi</span>
              <span className="crest-tag font-sans">FOODS</span>
            </div>
            <span className="crest-sub">मिठास · EST. 1968</span>
          </a>

          {/* Right Nav Links */}
          <div className="nav-links nav-right">
            <a href="#crafts" className="nav-item">Craftsmanship</a>
            <a href="#gifting" className="nav-item">Bespoke Gifting</a>
            
            {/* Bag Button */}
            <button 
              className="bag-btn"
              onClick={onOpenCart}
              aria-label={`View Shopping Bag, ${cartCount} items`}
            >
              <ShoppingBag size={17} />
              <span className="bag-label">Bag</span>
              <span className="bag-count">{cartCount}</span>
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-drawer">
          <div className="mobile-drawer-links">
            <a href="#unboxing" onClick={() => setMobileMenuOpen(false)}>The Jewel Box</a>
            <a href="#collection" onClick={() => setMobileMenuOpen(false)}>Artisanal Repertoire</a>
            <a href="#crafts" onClick={() => setMobileMenuOpen(false)}>The Five Crafts</a>
            <a href="#gifting" onClick={() => setMobileMenuOpen(false)}>Royal Gifting Concierge</a>
            <a href="#purity" onClick={() => setMobileMenuOpen(false)}>Our Purity Promise</a>
            <div className="mobile-drawer-footer">
              <button className="btn-outline-gold" onClick={onToggleCurrency}>
                Currency: {currency}
              </button>
              <div className="veg-badge-inline">
                <span className="veg-stamp" />
                <span>Certified 100% Pure Vegetarian</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
