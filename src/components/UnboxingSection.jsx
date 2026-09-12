import React, { useState } from 'react';
import { UNBOXING_COMPARTMENTS } from '../data/products';
import { Sparkles, Plus } from 'lucide-react';
import { useParallax } from '../hooks/useParallax';

export default function UnboxingSection({ onQuickAdd }) {
  const [activeTab, setActiveTab] = useState(0);
  const current = UNBOXING_COMPARTMENTS[activeTab];
  const scrollY = useParallax();
  const [boxTilt, setBoxTilt] = useState({ x: 0, y: 0 });

  const handleBoxMouseMove = (e) => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setBoxTilt({ x, y });
  };

  const handleBoxMouseLeave = () => {
    setBoxTilt({ x: 0, y: 0 });
  };

  return (
    <section id="unboxing" className="unboxing-section">
      <div className="container">
        
        {/* Clean Editorial Section Header with Scroll Reveal */}
        <div className="clean-section-header text-center reveal-on-scroll">
          <span className="clean-section-eyebrow">PACKAGING</span>
          <h2 className="clean-section-title font-royal">Freshly made. Carefully packed.</h2>
          <p className="clean-section-lead font-serif">
            Every box is packed so your sweets reach you just as fresh and fragrant as they left our kitchen.
          </p>
        </div>

        {/* The Clean Compartment Showcase with Staggered Scroll Reveal */}
        <div className="unboxing-clean-wrapper reveal-on-scroll">
          
          {/* Minimalist Tab Navigation */}
          <div className="clean-compartment-tabs" role="tablist" data-cursor="drag">
            {UNBOXING_COMPARTMENTS.map((item, idx) => (
              <button
                key={item.id}
                role="tab"
                data-magnetic
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
            <div className="clean-showcase-grid" key={current.id}>
              
              {/* Left: Text & Sensory Profile with smooth entrance */}
              <div className="clean-showcase-text">
                <span className="clean-showcase-tag font-serif">{current.sub}</span>
                <h3 className="clean-showcase-title font-royal">{current.name}</h3>
                <p className="clean-showcase-desc font-serif">{current.desc}</p>

                <div className="clean-showcase-action">
                  <button 
                    className="btn-clean-primary"
                    data-magnetic
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

              {/* Right: Crisp Packaging Visual with 3D physical box tilt */}
              <div 
                className="clean-showcase-media"
                onMouseMove={handleBoxMouseMove}
                onMouseLeave={handleBoxMouseLeave}
              >
                <div 
                  className="clean-media-frame"
                  data-cursor="view"
                  style={{
                    transform: `perspective(900px) rotateY(${boxTilt.x * 6}deg) rotateX(${-boxTilt.y * 6}deg)`,
                    transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                >
                  <img 
                    src={current.image} 
                    alt={current.name} 
                    className="clean-showcase-img" 
                  />
                  <div 
                    className="box-specular-sheen" 
                    style={{
                      opacity: Math.abs(boxTilt.x) + Math.abs(boxTilt.y) > 0.05 ? 0.35 : 0,
                      transform: `translate(${boxTilt.x * 30}%, ${boxTilt.y * 30}%)`
                    }}
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
