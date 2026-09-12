import { useEffect } from 'react';

// A small, desktop-only magnetic response for controls. Deliberately no custom
// cursor: it avoids fixed-layer glitches and keeps the native cursor familiar.
export default function MouseEffects() {
  useEffect(() => {
    if (
      !window.matchMedia('(pointer: fine)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    let activeMagneticEl = null;

    const findMagneticTarget = (target) => {
      const candidate = target?.closest?.(
        '[data-magnetic], .btn-desserto-primary, .btn-desserto-secondary, .btn-clean-primary, .btn-gold, .btn-acquire, .bag-btn, .brand-crest'
      );

      // Orbit items own their transform for scroll/parallax, so never let the
      // magnetic system overwrite it.
      return candidate?.classList.contains('orbit-sweet-item') ? null : candidate;
    };

    const resetActive = () => {
      if (activeMagneticEl) {
        activeMagneticEl.style.transform = '';
        activeMagneticEl = null;
      }
    };

    const onMouseMove = (event) => {
      if (!activeMagneticEl) return;

      const rect = activeMagneticEl.getBoundingClientRect();
      const distX = event.clientX - (rect.left + rect.width / 2);
      const distY = event.clientY - (rect.top + rect.height / 2);
      const maxDist = Math.max(rect.width, rect.height) * 0.8;

      if (Math.hypot(distX, distY) >= maxDist) {
        resetActive();
        return;
      }

      activeMagneticEl.style.transform = `translate3d(${distX * 0.2}px, ${distY * 0.2}px, 0)`;
    };

    const onMouseOver = (event) => {
      const target = findMagneticTarget(event.target);
      if (target) activeMagneticEl = target;
    };

    const onMouseOut = (event) => {
      const target = findMagneticTarget(event.target);
      if (target && target === activeMagneticEl && !target.contains(event.relatedTarget)) {
        resetActive();
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseover', onMouseOver, { passive: true });
    window.addEventListener('mouseout', onMouseOut, { passive: true });
    window.addEventListener('blur', resetActive);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      window.removeEventListener('mouseout', onMouseOut);
      window.removeEventListener('blur', resetActive);
      resetActive();
    };
  }, []);

  return null;
}
