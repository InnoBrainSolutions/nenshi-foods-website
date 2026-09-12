import React, { useState } from 'react';
import { UNBOXING_COMPARTMENTS } from '../data/products';
import { Sparkles, Plus } from 'lucide-react';
import { useParallax } from '../hooks/useParallax';

export default function UnboxingSection({ onQuickAdd }) {
  const [activeTab, setActiveTab] = useState(0);
  const current = UNBOXING_COMPARTMENTS[activeTab];
  const scrollY = useParallax();

  // Subtle floating parallax offset
  const trayParallaxY = Math.sin((scrollY - 500) * 0.002) * 8;

  return (
    <section id="unboxing" className="unboxing-section">
      <div className="container">
        
        {/* Clean Editorial Section Header */}
        <div className="clean-section-header text-center">
          <span className="clean-section-eyebrow">THOUGHTFUL PACKAGING</span>
          <h2 className="clean-section-title font-royal">Freshly made. Beautifully packed.</h2>
          <p className="clean-section-lead font-serif">
            Every box is packed with care so your sweets arrive just as fresh, fragrant, and delicate as they leave our kitchen.
          </p>
        </div>

        {/* The Clean Compartment Showcase */}
        <div className="unboxing-clean-wrapper">
          
          {/* Minimalist Tab Navigation */}
          <div className="clean-compartment-tabs" role="tablist">
            {UNBOXING_COMPARTMENTS.map((item, idx) => (
              <button
                key={item.id}
                role="tab"
                aria-selected={activeTab === idx}
                className={`clean-tab-link ${activeTab === idx ? 'clean-tab-active' : ''}`}
                onClick={() => setActiveTab(idx)}
              >
                <span className="tab-idx">{item.number}</span>
                <span className="tab-label font-royal">{item.name}</span>
              </button>
            ))}
          </div>

          {/* Clean 2-Column Showcase */}
          <div className="clean-showcase-card">
            <div className="clean-showcase-grid">
              
              {/* Left: Text & Sensory Profile */}
              <div className="clean-showcase-text">
                <span className="clean-showcase-tag font-serif">{current.sub}</span>
                <h3 className="clean-showcase-title font-royal">{current.name}</h3>
                <p className="clean-showcase-desc font-serif">{current.desc}</p>

                <div className="clean-showcase-action">
                  <button 
                    className="btn-clean-primary"
                    onClick={() => onQuickAdd({
                      id: current.id,
                      name: current.name,
                      priceINR: current.id === 'milkcake' ? 1350 : 1450,
                      priceUSD: current.id === 'milkcake' ? 22 : 24,
                      weight: "500g Box",
                      image: current.image
                    })}
                  >
                    <Plus size={15} />
                    <span>Add to Bag</span>
                  </button>
                </div>
              </div>

              {/* Right: Crisp Official Packaging Visual */}
              <div className="clean-showcase-media">
                <div className="clean-media-frame">
                  <img 
                    src={current.image} 
                    alt={current.name} 
                    className="clean-showcase-img" 
                  />
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
