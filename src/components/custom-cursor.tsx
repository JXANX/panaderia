'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    // Check for coarse pointer (touch devices) or reduced motion preference
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isTouch || prefersReducedMotion) {
      setIsDisabled(true);
      return;
    }

    document.body.classList.add('custom-cursor-active');

    const mousePos = { x: -100, y: -100 };
    const ringPos = { x: -100, y: -100 };
    let isVisible = false;
    let isHovered = false;

    if (!dotRef.current || !ringRef.current) return;

    // Set initial centering transforms with GSAP
    gsap.set(dotRef.current, { xPercent: -50, yPercent: -50, opacity: 0 });
    gsap.set(ringRef.current, { xPercent: -50, yPercent: -50, opacity: 0 });

    const setDotX = gsap.quickSetter(dotRef.current, 'x', 'px');
    const setDotY = gsap.quickSetter(dotRef.current, 'y', 'px');
    const setRingX = gsap.quickSetter(ringRef.current, 'x', 'px');
    const setRingY = gsap.quickSetter(ringRef.current, 'y', 'px');

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;

      if (!isVisible) {
        isVisible = true;
        ringPos.x = e.clientX;
        ringPos.y = e.clientY;
        gsap.to([dotRef.current, ringRef.current], { opacity: 1, duration: 0.2 });
      }
    };

    const handleMouseLeave = () => {
      isVisible = false;
      gsap.to([dotRef.current, ringRef.current], { opacity: 0, duration: 0.2 });
    };

    const handleMouseEnter = () => {
      isVisible = true;
      gsap.to([dotRef.current, ringRef.current], { opacity: 1, duration: 0.2 });
    };

    // Smooth ticker loop
    const render = () => {
      if (!isVisible) return;

      ringPos.x += (mousePos.x - ringPos.x) * 0.2;
      ringPos.y += (mousePos.y - ringPos.y) * 0.2;

      setDotX(mousePos.x);
      setDotY(mousePos.y);
      setRingX(ringPos.x);
      setRingY(ringPos.y);
    };

    gsap.ticker.add(render);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Hover handler for interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const interactiveEl = target?.closest(
        'a, button, input, textarea, select, [role="button"], [data-cursor="hover"]'
      );

      if (interactiveEl && !isHovered) {
        isHovered = true;
        gsap.to(dotRef.current, { scale: 0, duration: 0.2 });
        gsap.to(ringRef.current, {
          width: 52,
          height: 52,
          borderColor: 'rgba(79, 136, 83, 0.95)',
          backgroundColor: 'rgba(79, 136, 83, 0.14)',
          duration: 0.25,
          ease: 'power2.out',
        });
      } else if (!interactiveEl && isHovered) {
        isHovered = false;
        gsap.to(dotRef.current, { scale: 1, duration: 0.2 });
        gsap.to(ringRef.current, {
          width: 32,
          height: 32,
          borderColor: 'rgba(29, 25, 14, 0.45)',
          backgroundColor: 'transparent',
          duration: 0.25,
          ease: 'power2.out',
        });
      }
    };

    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      gsap.ticker.remove(render);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  if (isDisabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]">
      {/* Inner Dot */}
      <div
        ref={dotRef}
        className="fixed left-0 top-0 h-2 w-2 bg-green"
      />

      {/* Outer Ring */}
      <div
        ref={ringRef}
        className="fixed left-0 top-0 h-8 w-8 border border-green/60 bg-transparent"
      />
    </div>
  );
}
