import React from 'react';
import { ShieldCheck, Leaf, HeartHandshake, Sparkles } from 'lucide-react';

export default function PurityPromise() {
  const pillars = [
    {
      title: "100% Pure Vegetarian Certified",
      hindi: "शुद्ध शाकाहारी",
      desc: "Our kitchens operate under strict Satvik protocols. Absolutely zero contact with animal gelatin, bone-char sugars, or non-vegetarian processing agents.",
      badge: "Pure Green Dot Stamp"
    },
    {
      title: "Certified 99.9% Silver Foil",
      hindi: "प्रमाणित चांदी वर्क",
      desc: "Historically, silver foil was beaten using archaic leather methods. Nanshi pioneered cruelty-free mechanical parchment beating, verified by ISO-accredited food safety laboratories.",
      badge: "Laboratory Certified"
    },
    {
      title: "Zero Preservatives or Synthetic Dye",
      hindi: "प्राकृतिक रंग व सुगंध",
      desc: "We never use tartrazine, artificial cardamom essence, or chemical shelf-life enhancers. Color comes exclusively from Kashmir saffron; fragrance comes from crushed green cardamoms.",
      badge: "Pure Botanicals"
    },
    {
      title: "Small-Batch Handcrafted Integrity",
      hindi: "सीमित उत्पादन",
      desc: "Every batch is capped at 40 boxes per day per Halwai station to ensure temperature precision, uniform diamond geometry, and unhurried packaging.",
      badge: "Artisan Signed"
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
                <span className="veg-text font-royal">THE HALLMARK OF SACRED PURITY</span>
              </div>
              <h2 className="purity-title font-royal">
                Food as an <span className="text-gold-foil">Auspicious Offering</span>
              </h2>
            </div>
            
            <p className="purity-lead font-serif">
              In Indian culinary tradition, sweets are not mere desserts—they are <em>Prasad</em>, an offering to the divine and a token of unconditional goodwill. We hold ourselves to an uncompromising standard of sacred reverence.
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
              <span>FSSAI Licensed & Rigorously Tested</span>
            </div>
            <div className="strip-divider">✦</div>
            <div className="strip-item">
              <Sparkles size={18} className="strip-icon" />
              <span>Chilled Inert Gas Nitrogen Freshness Pack</span>
            </div>
            <div className="strip-divider">✦</div>
            <div className="strip-item">
              <Leaf size={18} className="strip-icon" />
              <span>100% Recyclable Handmade Cotton Rag Paper</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
