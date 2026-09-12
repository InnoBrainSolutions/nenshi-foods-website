import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import ThreeMithaiBox from './ThreeMithaiBox';

export default function Hero({ onExploreClick, onGiftingClick }) {
  const [activeSweet, setActiveSweet] = useState('kaju'); // 'kaju' | 'milkcake'
  const isKaju = activeSweet === 'kaju';

  return (
    <section className="hero-clean-section">
      <div className="container hero-clean-container">
        
        {/* Editorial Text Column */}
        <div className="hero-editorial-col">
          
          {/* Refined Sweet Switcher */}
          <div className="clean-switcher-capsule">
            <button
              className={`switcher-tab ${isKaju ? 'switcher-active' : ''}`}
              onClick={() => setActiveSweet('kaju')}
            >
              Kaju Katli
            </button>
            <button
              className={`switcher-tab ${!isKaju ? 'switcher-active' : ''}`}
              onClick={() => setActiveSweet('milkcake')}
            >
              Milk Cake
            </button>
          </div>

          <div className="clean-eyebrow">
            <span>NENSHI FOODS · ROYAL ATELIER · EST. 1968</span>
          </div>

          <h1 className="clean-hero-headline font-royal">
            {isKaju ? (
              <>
                The 8-Pointed Star, <br />
                <em>Pure Cashew</em> Jewel.
              </>
            ) : (
              <>
                Caramelized Amber, <br />
                <em>Antique Uruli</em> Craft.
              </>
            )}
          </h1>

          <p className="clean-hero-subhead font-serif">
            {isKaju
              ? "Stone-ground Goan cashews simmered in seasoned brass cauldrons, adorned with certified 99.9% pure silver leaf and Kashmiri saffron threads."
              : "Eighteen hours of unhurried wood-fire reduction in hand-hammered brass urulis. Full-cream A2 milk slow-caramelized to a fragrant golden heart."}
          </p>

          <div className="clean-hero-ctas">
            <a href="#collection" className="btn-clean-primary" onClick={onExploreClick}>
              <span>Explore Collection</span>
              <ArrowRight size={15} />
            </a>
            <a href="#gifting" className="btn-clean-secondary" onClick={onGiftingClick}>
              <span>Bespoke Gifting</span>
            </a>
          </div>

        </div>

        {/* 3D Showcase Column with Generous Breathing Room */}
        <div className="hero-3d-col">
          <ThreeMithaiBox activeMode={activeSweet} />
        </div>

      </div>
    </section>
  );
}
