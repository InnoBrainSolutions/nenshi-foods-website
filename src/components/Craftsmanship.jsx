import React from 'react';

export default function Craftsmanship() {
  const pillars = [
    {
      num: "01",
      hindi: "शिला पेषण",
      title: "Stone-Ground Cashews",
      desc: "Unbroken Goan W240 cashews ground dry without added water to 40-micron silken consistency, allowing natural cashew butter to release its fragrance."
    },
    {
      num: "02",
      hindi: "ताम्र कड़ाही",
      title: "18-Hour Slow Uruli Fire",
      desc: "Full-cream A2 milk reduced slowly in heavy brass cauldrons over babool wood embers, achieving a naturally caramelized amber heart without synthetic color."
    },
    {
      num: "03",
      hindi: "शुद्ध वर्क",
      title: "99.9% Pure Silver Leaf",
      desc: "Certified cruelty-free silver leaf beaten exclusively on mechanical vegetable parchment, finished with hand-plucked Pampore Mongra saffron stigmas."
    }
  ];

  return (
    <section id="crafts" className="crafts-clean-section">
      <div className="container">
        
        {/* Clean Editorial Section Header */}
        <div className="clean-section-header text-center">
          <span className="clean-section-eyebrow">THE CRAFTSMANSHIP OF THE HALWAI</span>
          <h2 className="clean-section-title font-royal">Heritage Without Compromise</h2>
          <p className="clean-section-lead font-serif">
            Three ancestral disciplines that separate royal Indian confection from commercial compromise.
          </p>
        </div>

        {/* 3 Spacious Pillars Grid */}
        <div className="crafts-clean-grid">
          {pillars.map((pillar) => (
            <div key={pillar.num} className="craft-clean-col">
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
