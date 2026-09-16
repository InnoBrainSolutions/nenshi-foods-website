import React from 'react';
import { ShieldCheck, Leaf, Sparkles } from 'lucide-react';

export default function PurityPromise() {
  const pillars = [
    {
      title: "100% Pure Vegetarian",
      hindi: "शुद्ध शाकाहारी",
      desc: "All our sweets are made in a dedicated vegetarian kitchen with real milk, whole nuts, and no chemicals.",
      badge: "100% Veg"
    },
    {
      title: "Real Silver Vark",
      hindi: "चांदी वर्क",
      desc: "Our silver vark is 100% vegetarian, lab tested, and certified safe.",
      badge: "Lab Tested"
    },
    {
      title: "No Artificial Colours or Flavours",
      hindi: "प्राकृतिक रंग",
      desc: "We never use synthetic dyes or chemical essences. Colour comes from Kashmiri saffron, aroma from green cardamom.",
      badge: "Natural"
    },
    {
      title: "Freshly Made Every Day",
      hindi: "रोज़ ताज़ा",
      desc: "Our halwais cook fresh sweets every morning in small batches — so you always get them at their best.",
      badge: "Fresh Daily"
    }
  ];

  return (
    <section id="purity" className="purity-section">
      <div className="container">
        
        <div className="purity-inner-card reveal-on-scroll">
          <div className="purity-header-row">
            <div className="purity-title-col">
              <div className="veg-badge-large" data-cursor="hover">
                <span className="veg-stamp" aria-hidden="true" />
                <span className="veg-text font-royal">OUR PURITY PROMISE</span>
              </div>
              <h2 className="purity-title font-royal">
                Real ingredients. <span className="text-gold-foil">No shortcuts.</span>
              </h2>
            </div>
            
            <p className="purity-lead font-serif">
              In India, mithai is part of every celebration — festivals, weddings, family gatherings. That's why we use only real ingredients, pure desi ghee, and traditional recipes.
            </p>
          </div>

          <div className="purity-pillars-grid reveal-stagger">
            {pillars.map((pillar, idx) => (
              <div key={idx} className="purity-pillar-item" data-cursor="hover">
                <div className="pillar-top">
                  <span className="pillar-hindi font-serif">{pillar.hindi}</span>
                  <span className="pillar-badge">{pillar.badge}</span>
                </div>
                <h3 className="pillar-title font-royal">{pillar.title}</h3>
                <p className="pillar-desc font-serif">{pillar.desc}</p>
              </div>
            ))}
          </div>

          {/* Guarantee Footer Strip */}
          <div className="purity-seal-strip">
            <div className="strip-item">
              <ShieldCheck size={18} className="strip-icon" />
              <span>FSSAI Licensed & Food Safety Tested</span>
            </div>
            <div className="strip-divider">✦</div>
            <div className="strip-item">
              <Sparkles size={18} className="strip-icon" />
              <span>Carefully Packed for Fresh Delivery</span>
            </div>
            <div className="strip-divider">✦</div>
            <div className="strip-item">
              <Leaf size={18} className="strip-icon" />
              <span>100% Recyclable Packaging</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
