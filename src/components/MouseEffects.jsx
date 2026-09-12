import React, { useEffect, useState, useRef } from 'react';

export default function MouseEffects() {
  const cursorDotRef = useRef(null);
  const cursorRingRef = useRef(null);
  const [cursorState, setCursorState] = useState('default'); // 'default' | 'hover' | 'view' | 'drag'
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on non-touch devices with fine pointers and no reduced motion preference
    if (
      window.matchMedia('(pointer: coarse)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let animationFrameId;

    // Track active magnetic element
    let activeMagneticEl = null;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) setIsVisible(true);

      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }

      // Handle magnetic attraction for hover target
      if (activeMagneticEl) {
        const rect = activeMagneticEl.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distX = mouseX - centerX;
        const distY = mouseY - centerY;
        const maxDist = Math.max(rect.width, rect.height) * 0.8;
        const distance = Math.hypot(distX, distY);

        if (distance < maxDist) {
          const pull = 0.28;
          activeMagneticEl.style.transform = `translate3d(${distX * pull}px, ${distY * pull}px, 0)`;
        } else {
          activeMagneticEl.style.transform = 'translate3d(0, 0, 0)';
          activeMagneticEl = null;
        }
      }
    };

    const onMouseOver = (e) => {
      const target = e.target;
      if (!target) return;

      // Magnetic detection
      const magneticTarget = target.closest(
        '[data-magnetic], .btn-desserto-primary, .btn-desserto-secondary, .btn-clean-primary, .btn-gold, .btn-acquire, .bag-btn, .brand-crest, .orbit-sweet-item'
      );
      if (magneticTarget) {
        activeMagneticEl = magneticTarget;
      }

      // Contextual cursor state
      if (target.closest('[data-cursor="view"], .product-card, .clean-media-frame, .desserto-sweet-visual')) {
        setCursorState('view');
      } else if (target.closest('[data-cursor="drag"], .desserto-bottom-tabs, .clean-compartment-tabs')) {
        setCursorState('drag');
      } else if (
        target.closest('button') ||
        target.closest('a') ||
        target.closest('.box-select-card') ||
        target.closest('.ribbon-swatch-btn') ||
        target.closest('.seal-letter-btn') ||
        target.closest('.custom-radio')
      ) {
        setCursorState('hover');
      } else {
        setCursorState('default');
      }
    };

    const onMouseOut = (e) => {
      const fromEl = e.target;
      const magneticTarget = fromEl?.closest?.(
        '[data-magnetic], .btn-desserto-primary, .btn-desserto-secondary, .btn-clean-primary, .btn-gold, .btn-acquire, .bag-btn, .brand-crest, .orbit-sweet-item'
      );
      if (magneticTarget && magneticTarget === activeMagneticEl) {
        magneticTarget.style.transform = 'translate3d(0, 0, 0)';
        activeMagneticEl = null;
      }
    };

    const onMouseDown = () => setIsMouseDown(true);
    const onMouseUp = () => setIsMouseDown(false);
    const onMouseLeave = () => {
      setIsVisible(false);
      if (activeMagneticEl) {
        activeMagneticEl.style.transform = 'translate3d(0, 0, 0)';
        activeMagneticEl = null;
      }
    };
    const onMouseEnter = () => setIsVisible(true);

    const render = () => {
      // Smooth physical lerp with spring damping for cursor follower ring
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;

      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseover', onMouseOver, { passive: true });
    window.addEventListener('mouseout', onMouseOut, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      window.removeEventListener('mouseout', onMouseOut);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      if (activeMagneticEl) {
        activeMagneticEl.style.transform = 'translate3d(0, 0, 0)';
      }
    };
  }, [isVisible]);

  return (
    <>
      <div
        ref={cursorDotRef}
        className={`custom-cursor-dot ${isVisible ? 'cursor-visible' : ''} ${
          cursorState !== 'default' ? 'dot-subtle' : ''
        }`}
        aria-hidden="true"
      />
      <div
        ref={cursorRingRef}
        className={`custom-cursor-ring ${isVisible ? 'cursor-visible' : ''} cursor-${cursorState} ${
          isMouseDown ? 'cursor-pressed' : ''
        }`}
        aria-hidden="true"
      >
        {cursorState === 'view' && <span className="cursor-label-view">VIEW</span>}
        {cursorState === 'drag' && <span className="cursor-label-drag">‹ ›</span>}
      </div>
    </>
  );
}
