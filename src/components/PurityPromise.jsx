import React from 'react';
import { ShieldCheck, Leaf, HeartHandshake, Sparkles } from 'lucide-react';

export default function PurityPromise() {
  const pillars = [
    {
      title: "100% Pure Vegetarian",
      hindi: "शुद्ध शाकाहारी",
      desc: "Every sweet is prepared in a dedicated vegetarian kitchen with pure milk, whole nuts, and zero artificial processing agents.",
      badge: "100% Veg"
    },
    {
      title: "Certified Pure Silver Vark",
      hindi: "प्रमाणित चांदी वर्क",
      desc: "Nenshi uses 100% vegetarian, edible silver foil, laboratory tested and certified pure and safe for everyday enjoyment.",
      badge: "Lab Tested"
    },
    {
      title: "No Artificial Flavours or Colours",
      hindi: "प्राकृतिक रंग व सुगंध",
      desc: "We never use synthetic dyes or chemical essences. Color comes from Kashmiri saffron; aroma comes from freshly ground green cardamoms.",
      badge: "Natural"
    },
    {
      title: "Small-Batch Daily Cooking",
      hindi: "रोज़ाना ताज़ा",
      desc: "Cooked fresh every day in small batches by our experienced halwais so you always receive sweets at their peak flavour and texture.",
      badge: "Fresh Daily"
    }
  ];

  return (
    <section id="purity" className="purity-section">
      <div className="container">
        
        <div className="purity-inner-card">
          <div className="purity-header-row">
            <div className="purity-title-col">
              <div className="veg-badge-large">
                <span className="veg-stamp" aria-hidden="true" />
                <span className="veg-text font-royal">OUR PURITY PROMISE</span>
              </div>
              <h2 className="purity-title font-royal">
                Real ingredients. <span className="text-gold-foil">No shortcuts.</span>
              </h2>
            </div>
            
            <p className="purity-lead font-serif">
              In India, mithai is shared during moments that matter most—festivals, weddings, and family celebrations. That is why we use only wholesome ingredients, pure cow ghee, and traditional methods.
            </p>
          </div>

          <div className="purity-pillars-grid">
            {pillars.map((pillar, idx) => (
              <div key={idx} className="purity-pillar-item">
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
