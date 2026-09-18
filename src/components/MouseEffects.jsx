import React, { useEffect, useRef } from 'react';

// Pure Gold Center Dot & Smooth Following Circle Cursor with Click Effect
export default function MouseEffects() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (
      !window.matchMedia('(pointer: fine)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    const dotEl = dotRef.current;
    const ringEl = ringRef.current;
    if (!dotEl || !ringEl) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let isVisible = false;
    let isHover = false;
    let isPressed = false;
    let rafId = null;

    let activeMagneticEl = null;

    const findMagneticTarget = (target) => {
      const candidate = target?.closest?.(
        '[data-magnetic], .btn-desserto-primary, .btn-desserto-secondary, .btn-clean-primary, .btn-gold, .btn-acquire, .bag-btn, .brand-crest, .desserto-tab-btn, .orbit-sweet-item'
      );
      return candidate?.classList.contains('orbit-sweet-item') ? null : candidate;
    };

    const resetMagnetic = () => {
      if (activeMagneticEl) {
        activeMagneticEl.style.transform = '';
        activeMagneticEl = null;
      }
    };

    const updateCursorClasses = () => {
      if (isVisible) {
        dotEl.classList.add('cursor-visible');
        ringEl.classList.add('cursor-visible');
      } else {
        dotEl.classList.remove('cursor-visible');
        ringEl.classList.remove('cursor-visible');
      }

      ringEl.classList.toggle('cursor-hover', isHover);
      ringEl.classList.toggle('cursor-pressed', isPressed);
    };

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        ringX = mouseX;
        ringY = mouseY;
        updateCursorClasses();
      }

      // Subtle magnetic pull for buttons
      if (activeMagneticEl) {
        const rect = activeMagneticEl.getBoundingClientRect();
        const distX = mouseX - (rect.left + rect.width / 2);
        const distY = mouseY - (rect.top + rect.height / 2);
        const maxDist = Math.max(rect.width, rect.height) * 0.85;

        if (Math.hypot(distX, distY) >= maxDist) {
          resetMagnetic();
        } else {
          activeMagneticEl.style.transform = `translate3d(${distX * 0.2}px, ${distY * 0.2}px, 0)`;
        }
      }
    };

    const onMouseOver = (e) => {
      const target = e.target;
      if (!target || !(target instanceof Element)) return;

      const interactiveTarget = target.closest(
        'button, a, input, select, textarea, [role="button"], [role="tab"], [data-magnetic], [data-cursor="hover"], .orbit-sweet-item'
      );

      isHover = Boolean(interactiveTarget);

      const magneticTarget = findMagneticTarget(target);
      if (magneticTarget) {
        activeMagneticEl = magneticTarget;
      }

      updateCursorClasses();
    };

    const onMouseOut = (e) => {
      const target = e.target;
      if (target && target === activeMagneticEl && !target.contains(e.relatedTarget)) {
        resetMagnetic();
      }

      if (!e.relatedTarget || !document.contains(e.relatedTarget)) {
        isVisible = false;
        updateCursorClasses();
      }
    };

    const onMouseDown = () => {
      isPressed = true;
      updateCursorClasses();
    };

    const onMouseUp = () => {
      isPressed = false;
      updateCursorClasses();
    };

    const onMouseLeave = () => {
      isVisible = false;
      resetMagnetic();
      updateCursorClasses();
    };

    const onMouseEnter = () => {
      isVisible = true;
      updateCursorClasses();
    };

    // Smooth physics loop for the trailing circle
    const loop = () => {
      // Lerp ring towards mouse with smooth damping factor
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;

      const scale = isPressed ? 0.75 : isHover ? 1.25 : 1;

      dotEl.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      ringEl.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) scale(${scale})`;

      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseover', onMouseOver, { passive: true });
    window.addEventListener('mouseout', onMouseOut, { passive: true });
    window.addEventListener('mousedown', onMouseDown, { passive: true });
    window.addEventListener('mouseup', onMouseUp, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    window.addEventListener('blur', onMouseLeave);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      window.removeEventListener('mouseout', onMouseOut);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      window.removeEventListener('blur', onMouseLeave);
      resetMagnetic();
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="custom-cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="custom-cursor-ring" aria-hidden="true" />
    </>
  );
}
