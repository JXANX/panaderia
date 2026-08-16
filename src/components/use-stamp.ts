'use client';

import { useEffect, useRef } from 'react';

// Micro-interacción de mostrador: un sello de luz caramel que sigue al cursor
// dentro del botón. Se consume vía CSS (.stamp-btn) con las variables --sx/--sy.
export function useStamp<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const move = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty('--sx', `${e.clientX - rect.left}px`);
      el.style.setProperty('--sy', `${e.clientY - rect.top}px`);
    };

    el.addEventListener('mousemove', move);
    return () => el.removeEventListener('mousemove', move);
  }, []);

  return ref;
}
