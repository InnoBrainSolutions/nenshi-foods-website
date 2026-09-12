import React from 'react';

export default function Craftsmanship() {
  const pillars = [
    {
      num: "01",
      hindi: "शिला पेषण",
      title: "Stone-ground nuts",
      desc: "We grind our nuts slowly to preserve their natural richness and pure flavour, without adding water."
    },
    {
      num: "02",
      hindi: "धीमी आंच",
      title: "Slow-cooked milk",
      desc: "Our milk sweets are cooked patiently in heavy brass pans for hours for deeper, natural caramelisation."
    },
    {
      num: "03",
      hindi: "शुद्ध वर्क",
      title: "Pure silver vark",
      desc: "Finished with delicate, 100% vegetarian edible silver leaf, certified pure and safe."
    }
  ];

  return (
    <section id="crafts" className="crafts-clean-section">
      <div className="container">
        
        {/* Clean Editorial Section Header */}
        <div className="clean-section-header text-center">
          <span className="clean-section-eyebrow">OUR PROCESS</span>
          <h2 className="clean-section-title font-royal">Made with patience.</h2>
          <p className="clean-section-lead font-serif">
            Some things shouldn't be rushed.
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
