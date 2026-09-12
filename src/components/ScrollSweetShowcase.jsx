import React, { useRef, useState, useEffect } from 'react';
import { SCROLL_SHOWCASE_SWEETS } from '../data/products';
import { ArrowRight, Plus, Award, ChevronDown } from 'lucide-react';

export default function ScrollSweetShowcase({ onQuickAdd, onExploreClick }) {
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const sParam = params.get('sweet');
      if (sParam !== null && !isNaN(parseInt(sParam))) {
        return Math.max(0, Math.min(SCROLL_SHOWCASE_SWEETS.length - 1, parseInt(sParam)));
      }
    }
    return 0;
  });
  const [scrollProgress, setScrollProgress] = useState(0);
  const isTransitioningRef = useRef(false);

  // Monitor scroll position through the 340vh track
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sParam = params.get('sweet');
    if (sParam !== null && !isNaN(parseInt(sParam))) {
      const idx = Math.max(0, Math.min(SCROLL_SHOWCASE_SWEETS.length - 1, parseInt(sParam)));
      setActiveIndex(idx);
    }

    const handleScroll = () => {
      if (!trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;
      const totalDist = trackRef.current.offsetHeight - windowH;

      if (totalDist <= 0) return;

      const scrolled = -rect.top;
      if (scrolled <= 0 && sParam !== null) {
        return; // Preserve tested initial sweet when at top of page
      }

      const progress = Math.max(0, Math.min(1, scrolled / totalDist));
      setScrollProgress(progress);

      // Map progress to sweet index 0..3
      const numSweets = SCROLL_SHOWCASE_SWEETS.length;
      const rawIdx = Math.min(numSweets - 1, Math.floor(progress * numSweets));
      setActiveIndex(rawIdx);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Programmatic jump to sweet on tab click
  const handleSelectSweet = (index) => {
    if (!trackRef.current) return;
    const totalDist = trackRef.current.offsetHeight - window.innerHeight;
    const targetScroll = trackRef.current.offsetTop + (index / (SCROLL_SHOWCASE_SWEETS.length - 1)) * totalDist;
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    setActiveIndex(index);
  };

  const currentSweet = SCROLL_SHOWCASE_SWEETS[activeIndex];

  // Calculate local sub-progress within active sweet for orbital parallax
  const segment = 1 / SCROLL_SHOWCASE_SWEETS.length;
  const localProgress = (scrollProgress % segment) / segment;
  const orbitAngle = scrollProgress * Math.PI * 2;

  return (
    <section ref={trackRef} className="desserto-track" id="sweet-showcase">
      {/* Pinned 100vh Sticky Viewport */}
      <div className="desserto-sticky-stage">
        
        {/* Architectural Background Line Arches (Desserto Style) */}
        <div className="desserto-arch-canvas" aria-hidden="true">
          <svg className="desserto-arch-svg" viewBox="0 0 1200 900" fill="none" preserveAspectRatio="xMidYMid slice">
            {/* Concentric Golden Arches */}
            <path
              d="M 280,900 L 280,480 C 280,240 920,240 920,480 L 920,900"
              stroke="#C59A45"
              strokeWidth="1.2"
              strokeOpacity="0.35"
            />
            <path
              d="M 360,900 L 360,500 C 360,300 840,300 840,500 L 840,900"
              stroke="#C59A45"
              strokeWidth="1"
              strokeOpacity="0.48"
            />
            <path
              d="M 440,900 L 440,520 C 440,360 760,360 760,520 L 760,900"
              stroke="#C59A45"
              strokeWidth="0.8"
              strokeOpacity="0.25"
            />
            {/* Inner Radiating Astronomical Rings */}
            <circle cx="600" cy="460" r="320" stroke="#C59A45" strokeWidth="0.8" strokeDasharray="4 6" strokeOpacity="0.24" />
            <circle cx="600" cy="460" r="220" stroke="#C59A45" strokeWidth="1" strokeOpacity="0.30" />
          </svg>

          {/* Golden Celestial Moon at Arch Apex */}
          <div className="desserto-arch-moon">
            <div className="moon-crescent-icon" />
          </div>
        </div>

        {/* Master Halwai Artisan Badge (Upper Right Profile, as in Reference) */}
        <div className="desserto-chef-badge">
          <div className="chef-avatar-frame">
            <img src="/images/master_halwai.jpg" alt="Ramkishan Nenshi" className="chef-avatar-img" />
            <div className="chef-badge-sparkle">
              <Award size={10} color="#9E742A" />
            </div>
          </div>
          <div className="chef-info">
            <span className="chef-name">Ramkishan Nenshi</span>
            <span className="chef-role">Master Halwai · Est. 1968</span>
          </div>
        </div>

        {/* Progress Step Counter (01 / 04) */}
        <div className="desserto-step-counter">
          <span className="step-current">{currentSweet.number}</span>
          <span className="step-sep">/</span>
          <span className="step-total">{currentSweet.total}</span>
          <span className="step-title">{currentSweet.name}</span>
        </div>

        {/* Dynamic Floating Sweets Orbiting Around The Arch (4 Sweets Orbiting) */}
        <div className="desserto-floating-orbit" aria-hidden="true">
          {SCROLL_SHOWCASE_SWEETS.map((sweet, idx) => {
            // Orbital base stations (top-left, mid-left, top-right, bottom-right)
            const baseStations = [
              { baseX: -36, baseY: -22, size: 84, rot: -10 },
              { baseX: -42, baseY: 16, size: 76, rot: 15 },
              { baseX: 36, baseY: -20, size: 82, rot: 12 },
              { baseX: 40, baseY: 18, size: 80, rot: -14 }
            ];
            const station = baseStations[idx];
            const isActive = idx === activeIndex;

            // Subtle orbital float driven by scroll progress
            const offsetX = Math.cos(orbitAngle + idx * (Math.PI / 2)) * 3;
            const offsetY = Math.sin(orbitAngle + idx * (Math.PI / 2)) * 4;

            return (
              <button
                key={sweet.id}
                type="button"
                className={`orbit-sweet-item ${isActive ? 'orbit-sweet-active' : ''}`}
                style={{
                  transform: `translate(${station.baseX + offsetX}vw, ${station.baseY + offsetY}vh) rotate(${station.rot + (scrollProgress * 25)}deg)`,
                  width: `${station.size}px`,
                  height: `${station.size}px`
                }}
                onClick={() => handleSelectSweet(idx)}
                title={`Explore ${sweet.name}`}
              >
                <img src={sweet.image} alt={sweet.name} className="orbit-sweet-img" />
              </button>
            );
          })}
        </div>

        {/* Centerpiece Hero Content & Main Active Sweet */}
        <div className="desserto-center-container">
          
          {/* Poetic Central Headline */}
          <div className="desserto-headline-wrap">
            <span className="desserto-eyebrow">ROYAL ATELIER CONFECTIONERY</span>
            <h1 className="desserto-headline">
              We are obsessed with <em>true sweets</em>
            </h1>
            <p className="desserto-subhead">
              {currentSweet.tagline}
            </p>
          </div>

          {/* Centerpiece Active Sweet Showcase Card */}
          <div className="desserto-sweet-stage">
            <div 
              className="desserto-sweet-visual"
              style={{
                transform: `scale(${1 + Math.sin(localProgress * Math.PI) * 0.04}) rotate(${Math.sin(scrollProgress * Math.PI * 2) * 3}deg)`
              }}
            >
              <div className="sweet-halo-glow" />
              <img 
                src={currentSweet.image} 
                alt={currentSweet.name} 
                className="desserto-hero-img"
              />
              <div className="sweet-shadow-soft" />
            </div>

            {/* Active Sweet Descriptor */}
            <div className="desserto-sweet-descriptor">
              <div className="descriptor-header">
                <span className="descriptor-hindi">{currentSweet.hindi}</span>
                <span className="descriptor-price">₹{currentSweet.priceINR} / ${currentSweet.priceUSD}</span>
              </div>
              <p className="descriptor-desc">{currentSweet.desc}</p>

              {/* Tasting Note Badges */}
              <div className="descriptor-notes">
                {currentSweet.tastingNotes.map((note, i) => (
                  <span key={i} className="descriptor-note-badge">
                    {note}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons (Desserto Pill Style) */}
          <div className="desserto-actions">
            <button 
              className="btn-desserto-primary"
              onClick={() => onQuickAdd({
                id: currentSweet.id,
                name: currentSweet.name,
                priceINR: currentSweet.priceINR,
                priceUSD: currentSweet.priceUSD,
                weight: currentSweet.weight,
                image: currentSweet.image
              })}
            >
              <Plus size={14} />
              <span>Acquire This Casket · ₹{currentSweet.priceINR}</span>
            </button>

            <a href="#collection" className="btn-desserto-secondary" onClick={onExploreClick}>
              <span>Explore Collection</span>
              <ArrowRight size={14} />
            </a>
          </div>

          {/* 4 Sweets Tab Selector Capsule */}
          <div className="desserto-bottom-tabs" role="tablist">
            {SCROLL_SHOWCASE_SWEETS.map((sweet, idx) => (
              <button
                key={sweet.id}
                role="tab"
                aria-selected={activeIndex === idx}
                className={`desserto-tab-btn ${activeIndex === idx ? 'desserto-tab-active' : ''}`}
                onClick={() => handleSelectSweet(idx)}
              >
                <span className="tab-num">{sweet.number}</span>
                <span className="tab-name">{sweet.name}</span>
              </button>
            ))}
          </div>

        </div>

        {/* Scroll Interaction Indicator Hint */}
        <div className="desserto-scroll-hint">
          <span>Scroll to cycle sweets ({currentSweet.number} / 04)</span>
          <ChevronDown size={14} className="scroll-hint-arrow" />
        </div>

      </div>
    </section>
  );
}
