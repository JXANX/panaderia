'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { TbBell, TbBellOff } from 'react-icons/tb';

const KEY = 'vyc-sound';

// Campanita de la esquina sintetizada con Web Audio (sin archivos).
function chime(ctx: AudioContext, t: number) {
  const master = ctx.createGain();
  master.gain.setValueAtTime(0.0001, t);
  master.gain.exponentialRampToValueAtTime(0.16, t + 0.02);
  master.gain.exponentialRampToValueAtTime(0.0001, t + 1.3);
  master.connect(ctx.destination);

  const notes: Array<[number, number, number]> = [
    [659.25, 0, 1.15],
    [783.99, 0.26, 1.0],
  ];

  for (const [freq, start, dur] of notes) {
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = freq;

    const g = ctx.createGain();
    const at = t + start;
    g.gain.setValueAtTime(0.0001, at);
    g.gain.exponentialRampToValueAtTime(0.2, at + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, at + dur);

    osc.connect(g);
    g.connect(master);
    osc.start(at);
    osc.stop(at + dur);
  }
}

export function SoundToggle({ tone = 'dark' }: { tone?: 'dark' | 'light' }) {
  const ctxRef = useRef<AudioContext | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(localStorage.getItem(KEY) === 'on');
  }, []);

  const play = useCallback((ctx: AudioContext) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (ctx.state === 'suspended') void ctx.resume();
    chime(ctx, ctx.currentTime + 0.05);
  }, []);

  // Si el sonido quedó activo de una sesión anterior, espera el primer gesto
  // para sortear el bloqueo de autoplay del navegador.
  useEffect(() => {
    if (!enabled) return;
    let played = false;

    const attempt = () => {
      if (played) return;
      played = true;
      const ctx = ctxRef.current ?? new AudioContext();
      ctxRef.current = ctx;
      play(ctx);
    };

    const events = ['pointerdown', 'wheel', 'touchstart', 'keydown'] as const;
    const off = () => events.forEach((ev) => window.removeEventListener(ev, attempt));
    events.forEach((ev) => window.addEventListener(ev, attempt, { once: true }));
    return off;
  }, [enabled, play]);

  // Reproduce cuando el sitio dispara el evento (p. ej. al abrir el menú).
  useEffect(() => {
    const onChime = () => {
      if (!enabled) return;
      const ctx = ctxRef.current ?? new AudioContext();
      ctxRef.current = ctx;
      play(ctx);
    };
    window.addEventListener('vyc:chime', onChime);
    return () => window.removeEventListener('vyc:chime', onChime);
  }, [enabled, play]);

  const toggle = () => {
    if (!enabled) {
      const ctx = ctxRef.current ?? new AudioContext();
      ctxRef.current = ctx;
      play(ctx);
    }
    const next = !enabled;
    setEnabled(next);
    localStorage.setItem(KEY, next ? 'on' : 'off');
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={enabled}
      aria-label={enabled ? 'Silenciar la campanita' : 'Activar la campanita'}
      className={
        tone === 'dark'
          ? 'inline-flex items-center gap-2 border border-cream/25 px-3 py-2 text-xs uppercase tracking-widest text-cream transition-colors hover:bg-cream hover:text-cacao'
          : 'inline-flex items-center gap-2 border border-beige px-3 py-2 text-xs uppercase tracking-widest text-cacao transition-colors hover:bg-cacao hover:text-cream'
      }
    >
      {enabled ? <TbBell className="text-sm" /> : <TbBellOff className="text-sm" />}
      {enabled ? 'Con sonido' : 'Sin sonido'}
    </button>
  );
}
