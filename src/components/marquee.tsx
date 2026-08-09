'use client';

import { useRef } from 'react';

interface MarqueeProps {
  items: React.ReactNode[];
  className?: string;
  speed?: string;
  separator?: React.ReactNode;
}

export function Marquee({ items, className = '', speed = '36s', separator }: MarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  const row = (key: string) => (
    <div key={key} className="flex shrink-0 items-center" aria-hidden={key === 'b'}>
      {items.map((item, i) => (
        <span key={i} className="flex shrink-0 items-center">
          {item}
          {separator}
        </span>
      ))}
    </div>
  );

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <div
        ref={trackRef}
        className="marquee-track"
        style={{ animationDuration: speed }}
      >
        {row('a')}
        {row('b')}
      </div>
    </div>
  );
}
