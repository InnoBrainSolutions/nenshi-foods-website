import React from 'react';

const CRAFTSMANSHIP_PILLARS = [
  {
    num: "01",
    hindi: "पिसाई",
    title: "Slow-ground nuts",
    desc: "We grind our cashews and almonds slowly to keep their natural oils and flavour intact. No water added."
  },
  {
    num: "02",
    hindi: "धीमी आंच",
    title: "Slow-cooked milk",
    desc: "Our milk sweets are cooked for hours in heavy brass pans on a low flame — no shortcuts."
  },
  {
    num: "03",
    hindi: "चांदी वर्क",
    title: "Pure silver vark",
    desc: "Topped with 100% vegetarian silver leaf — lab tested and certified safe."
  }
];

export default function Craftsmanship() {
  return (
    <section id="crafts" className="crafts-clean-section">
      <div className="container">
        
        {/* Clean Editorial Section Header with Scroll Reveal */}
        <div className="clean-section-header text-center reveal-on-scroll">
          <span className="clean-section-eyebrow">OUR PROCESS</span>
          <h2 className="clean-section-title font-royal">Made with patience.</h2>
          <p className="clean-section-lead font-serif">
            Some things shouldn't be rushed.
          </p>
        </div>

        {/* 3 Spacious Pillars Grid with Staggered Scroll Reveal */}
        <div className="crafts-clean-grid reveal-stagger">
          {CRAFTSMANSHIP_PILLARS.map((pillar) => (
            <div key={pillar.num} className="craft-clean-col" data-cursor="hover">
              <div className="craft-clean-num font-royal">{pillar.num}</div>
              <span className="craft-clean-hindi font-serif">{pillar.hindi}</span>
              <h3 className="craft-clean-title font-royal">{pillar.title}</h3>
              <p className="craft-clean-desc font-serif">{pillar.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
