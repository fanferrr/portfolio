"use client";

import { useRef, useState, useEffect, useCallback } from "react";

type HeroSpotlightProps = {
  className?: string;
};

/** Subtle purple spotlight that follows the cursor inside the hero. Disabled on coarse pointer and prefers-reduced-motion. */
export function HeroSpotlight({ className = "" }: HeroSpotlightProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [active, setActive] = useState(false);

  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (coarse || reduced) setActive(false);
    else setActive(true);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current || !active) return;
      const rect = ref.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setPos({ x, y });
    },
    [active]
  );

  const handleMouseLeave = useCallback(() => {
    setPos({ x: 50, y: 50 });
  }, []);

  if (!active) return null;

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`pointer-events-none absolute inset-0 overflow-hidden rounded-b-2xl ${className}`}
      aria-hidden
    >
      <div
        className="absolute h-[min(80vw,400px)] w-[min(80vw,400px)] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.07] transition-[opacity] duration-300"
        style={{
          left: `${pos.x}%`,
          top: `${pos.y}%`,
          background: "radial-gradient(circle, hsl(270 70% 55%) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}
