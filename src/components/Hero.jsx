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
            <span>NENSHI FOODS · SINCE 1968</span>
          </div>

          <h1 className="clean-hero-headline font-royal">
            {isKaju ? (
              <>
                Pure Cashew <br />
                <em>Katli</em>, Done Right.
              </>
            ) : (
              <>
                Alwar's Famous <br />
                <em>Milk Cake</em>, Made Fresh.
              </>
            )}
          </h1>

          <p className="clean-hero-subhead font-serif">
            {isKaju
              ? "Whole Goan cashews, slow-ground and cooked in desi ghee. Topped with real silver vark and Kashmiri saffron."
              : "Full-cream milk simmered for hours on a slow flame until it turns into golden mawa. Finished with cardamom and pistachios."}
          </p>

          <div className="clean-hero-ctas">
            <a href="#collection" className="btn-clean-primary" onClick={onExploreClick}>
              <span>Explore Sweets</span>
              <ArrowRight size={15} />
            </a>
            <a href="#unboxing" className="btn-clean-secondary" onClick={onGiftingClick}>
              <span>Gift Boxes</span>
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
