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
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [viewMode, setViewMode] = useState('sweet'); // 'sweet' | 'box'
  const [selectedSize, setSelectedSize] = useState('250g'); // '250g' | '500g'
  const isTransitioningRef = useRef(false);
  const wheelDrivenRef = useRef(false);
  const activeIndexRef = useRef(activeIndex);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  // Smooth mouse-driven physical tilt
  const handleStageMouseMove = (e) => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const normX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const normY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMouseOffset({ x: normX, y: normY });
  };

  const handleStageMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
  };

  // Monitor scroll position through the 160vh track
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sParam = params.get('sweet');
    const vParam = params.get('view');
    if (sParam !== null && !isNaN(parseInt(sParam))) {
      const idx = Math.max(0, Math.min(SCROLL_SHOWCASE_SWEETS.length - 1, parseInt(sParam)));
      setActiveIndex(idx);
    }
    if (vParam === 'box') {
      setViewMode('box');
    }

    const handleScroll = () => {
      if (!trackRef.current) return;
      // Skip scroll-based index updates while the wheel handler is driving
      if (wheelDrivenRef.current) return;

      const rect = trackRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;
      const totalDist = trackRef.current.offsetHeight - windowH;

      if (totalDist <= 0) return;

      const scrolled = -rect.top;
      if (scrolled <= 0 && sParam !== null) {
        return;
      }

      const progress = Math.max(0, Math.min(1, scrolled / totalDist));
      const numSweets = SCROLL_SHOWCASE_SWEETS.length;
      const rawIdx = Math.min(numSweets - 1, Math.floor(progress * numSweets));
      setScrollProgress(progress);
      if (rawIdx !== activeIndexRef.current) {
        activeIndexRef.current = rawIdx;
        setActiveIndex(rawIdx);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // On desktop, wheel gestures step through sweets one at a time.
  // When the user reaches the last sweet and scrolls down (or first and scrolls up),
  // we programmatically scroll past the track so the rest of the page continues.
  useEffect(() => {
    const handleWheel = (event) => {
      if (!trackRef.current || !window.matchMedia('(pointer: fine)').matches) return;

      const rect = trackRef.current.getBoundingClientRect();
      const isPinnedStory = rect.top <= 1 && rect.bottom > window.innerHeight + 1;
      if (!isPinnedStory || Math.abs(event.deltaY) < 4) return;

      const direction = event.deltaY > 0 ? 1 : -1;
      const currentIndex = activeIndexRef.current;
      const nextIndex = currentIndex + direction;
      const isAtEnd = direction > 0 && currentIndex === SCROLL_SHOWCASE_SWEETS.length - 1;
      const isAtStart = direction < 0 && currentIndex === 0;

      if (isAtEnd) {
        // Scroll past the track so the rest of the page takes over
        const trackBottom = trackRef.current.offsetTop + trackRef.current.offsetHeight - window.innerHeight;
        window.scrollTo({ top: trackBottom + 2, behavior: 'smooth' });
        return;
      }

      if (isAtStart) {
        // Scroll above the track so the user can go back up
        window.scrollTo({ top: Math.max(0, trackRef.current.offsetTop - 2), behavior: 'smooth' });
        return;
      }

      event.preventDefault();
      if (isTransitioningRef.current) return;

      // Mark that the wheel handler is driving so the scroll handler doesn't interfere
      wheelDrivenRef.current = true;
      isTransitioningRef.current = true;
      activeIndexRef.current = nextIndex;
      setActiveIndex(nextIndex);
      setScrollProgress(nextIndex / (SCROLL_SHOWCASE_SWEETS.length - 1));

      window.setTimeout(() => {
        isTransitioningRef.current = false;
        wheelDrivenRef.current = false;
      }, 620);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, []);

  // Programmatic jump to sweet on tab click
  const handleSelectSweet = (index) => {
    if (!trackRef.current) return;
    const totalDist = trackRef.current.offsetHeight - window.innerHeight;
    const targetScroll = trackRef.current.offsetTop + (index / (SCROLL_SHOWCASE_SWEETS.length - 1)) * totalDist;
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    activeIndexRef.current = index;
    setActiveIndex(index);
  };

  const currentSweet = SCROLL_SHOWCASE_SWEETS[activeIndex];

  // Calculate local sub-progress within active sweet for orbital parallax
  const segment = 1 / SCROLL_SHOWCASE_SWEETS.length;
  const localProgress = (scrollProgress % segment) / segment;
  const orbitAngle = scrollProgress * Math.PI * 2;

  return (
    <section ref={trackRef} className="desserto-track" id="sweet-showcase">
      {/* Pinned 100vh Sticky Viewport with mousemove physical interaction */}
      <div 
        className="desserto-sticky-stage"
        onMouseMove={handleStageMouseMove}
        onMouseLeave={handleStageMouseLeave}
      >
        
        {/* Architectural Background Line Arches with subtle counter-depth */}
        <div 
          className="desserto-arch-canvas" 
          aria-hidden="true"
          style={{
            transform: `translate3d(${-mouseOffset.x * 12}px, ${-mouseOffset.y * 8}px, 0) rotate(${scrollProgress * 2.5 - 1.25}deg)`,
            transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
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

        {/* Master Halwai Artisan Badge with subtle parallax */}
        <div 
          className="desserto-chef-badge"
          data-magnetic
          style={{
            transform: `translate3d(${mouseOffset.x * 6}px, ${mouseOffset.y * 5}px, 0)`,
            transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
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

            // Subtle orbital float driven by scroll progress + mouse inertia
            const offsetX = Math.cos(orbitAngle + idx * (Math.PI / 2)) * 3 + mouseOffset.x * 1.5;
            const offsetY = Math.sin(orbitAngle + idx * (Math.PI / 2)) * 4 + mouseOffset.y * 1.5;

            return (
              <button
                key={sweet.id}
                type="button"
                data-magnetic
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
            <span className="desserto-eyebrow">NENSHI FOODS · EST. 1968</span>
            <h1 className="desserto-headline">
              Made slow, <em>made right.</em>
            </h1>
            <p className="desserto-subhead">
              Real milk. Pure ghee. Traditional recipes.
            </p>
          </div>

          {/* Centerpiece Active Sweet Showcase Card */}
          <div className="desserto-sweet-stage" key={`${currentSweet.id}-${viewMode}`}>
            
            {/* View Mode & Size Toggle Capsules */}
            <div className="desserto-toggles-row">
              {currentSweet.boxImage && (
                <div className="desserto-view-capsule" data-cursor="hover">
                  <button
                    type="button"
                    className={`desserto-view-btn ${viewMode === 'sweet' ? 'view-btn-active' : ''}`}
                    onClick={() => setViewMode('sweet')}
                    data-magnetic
                  >
                    Fresh Mithai
                  </button>
                  <button
                    type="button"
                    className={`desserto-view-btn ${viewMode === 'box' ? 'view-btn-active' : ''}`}
                    onClick={() => setViewMode('box')}
                    data-magnetic
                  >
                    Gift Box
                  </button>
                </div>
              )}

              {/* 250g / 500g Size Capsule */}
              <div className="desserto-size-capsule" data-cursor="hover">
                <button
                  type="button"
                  className={`desserto-view-btn ${selectedSize === '250g' ? 'view-btn-active' : ''}`}
                  onClick={() => setSelectedSize('250g')}
                  data-magnetic
                >
                  250g (₹{currentSweet.priceINR})
                </button>
                <button
                  type="button"
                  className={`desserto-view-btn ${selectedSize === '500g' ? 'view-btn-active' : ''}`}
                  onClick={() => setSelectedSize('500g')}
                  data-magnetic
                >
                  500g (₹{currentSweet.price500INR || 300})
                </button>
              </div>
            </div>

            <div 
              className={`desserto-sweet-visual ${viewMode === 'box' && currentSweet.boxImage ? 'visual-is-box' : ''}`}
              data-cursor="view"
              style={{
                transform: `perspective(1000px) rotateY(${mouseOffset.x * 5.5}deg) rotateX(${-mouseOffset.y * 5.5}deg) scale(${1 + Math.sin(localProgress * Math.PI) * 0.04}) rotate(${Math.sin(scrollProgress * Math.PI * 2) * 2}deg)`,
                transition: 'transform 0.22s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              <div className="sweet-halo-glow" />
              <img 
                src={viewMode === 'box' && currentSweet.boxImage ? currentSweet.boxImage : currentSweet.image} 
                alt={currentSweet.name} 
                className={`desserto-hero-img ${viewMode === 'box' && currentSweet.boxImage ? 'desserto-box-img' : ''}`}
              />
              <div 
                className="sweet-shadow-soft" 
                style={{
                  transform: `translate3d(${-mouseOffset.x * 12}px, ${-mouseOffset.y * 8}px, 0)`,
                  transition: 'transform 0.22s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              />
            </div>

            {/* Active Sweet Descriptor */}
            <div className="desserto-sweet-descriptor">
              <div className="descriptor-header">
                <span className="descriptor-hindi">{currentSweet.hindi}</span>
                <span className="descriptor-price">
                  ₹{selectedSize === '500g' ? (currentSweet.price500INR || 300) : currentSweet.priceINR} / ${selectedSize === '500g' ? (currentSweet.price500USD || 5) : currentSweet.priceUSD} · {selectedSize}
                </span>
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
              data-magnetic
              onClick={() => onQuickAdd({
                id: `${currentSweet.id}-${selectedSize}`,
                name: `${currentSweet.name} (${selectedSize} Box)`,
                priceINR: selectedSize === '500g' ? (currentSweet.price500INR || 300) : currentSweet.priceINR,
                priceUSD: selectedSize === '500g' ? (currentSweet.price500USD || 5) : currentSweet.priceUSD,
                weight: `${selectedSize} Box`,
                image: viewMode === 'box' && currentSweet.boxImage ? currentSweet.boxImage : currentSweet.image
              })}
            >
              <Plus size={14} />
              <span>
                Order {currentSweet.name} ({selectedSize}) · ₹{selectedSize === '500g' ? (currentSweet.price500INR || 300) : currentSweet.priceINR}
              </span>
            </button>

            <a href="#collection" className="btn-desserto-secondary" data-magnetic onClick={onExploreClick}>
              <span>View All Sweets</span>
              <ArrowRight size={14} />
            </a>
          </div>

          {/* 4 Sweets Tab Selector Capsule */}
          <div className="desserto-bottom-tabs" role="tablist" data-cursor="drag">
            {SCROLL_SHOWCASE_SWEETS.map((sweet, idx) => (
              <button
                key={sweet.id}
                role="tab"
                data-magnetic
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
