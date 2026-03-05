"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type SpotlightTextProps = {
  children: string;
  className?: string;
  radius?: number; // px
};

export function SpotlightText({
  children,
  className,
  radius = 110,
}: SpotlightTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);

  const rectRef = useRef<DOMRect | null>(null);
  const rafRef = useRef<number | null>(null);
  const lastRef = useRef<{ xPct: number; yPct: number } | null>(null);

  const [reducedMotion, setReducedMotion] = useState(false);
  const [disabled, setDisabled] = useState(false);

  // prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReducedMotion(mq.matches);
    onChange();
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  // disable on touch / coarse pointers
  useEffect(() => {
    const isCoarse = window.matchMedia?.("(pointer: coarse)")?.matches;
    setDisabled(!!isCoarse);
  }, []);

  // keep rect fresh (resize/scroll)
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const updateRect = () => {
      rectRef.current = el.getBoundingClientRect();
    };

    updateRect();

    // ResizeObserver catches layout changes
    const ro = new ResizeObserver(updateRect);
    ro.observe(el);

    // scroll can shift rect relative to viewport
    const onScroll = () => updateRect();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // helper: schedule css var updates
  const scheduleUpdate = (xPct: number, yPct: number) => {
    lastRef.current = { xPct, yPct };

    if (rafRef.current != null) return;
    rafRef.current = window.requestAnimationFrame(() => {
      rafRef.current = null;
      const el = ref.current;
      const last = lastRef.current;
      if (!el || !last) return;

      // only 2 vars per frame (cheap)
      el.style.setProperty("--spot-x", `${last.xPct}%`);
      el.style.setProperty("--spot-y", `${last.yPct}%`);
    });
  };

  const onEnter = () => {
    if (reducedMotion || disabled) return;
    const el = ref.current;
    if (!el) return;

    rectRef.current = el.getBoundingClientRect();

    // set stable vars once
    el.style.setProperty("--spot-opacity", "1");
    el.style.setProperty("--spot-r", `${radius}px`);
  };

  const onMove = (e: React.PointerEvent) => {
    if (reducedMotion || disabled) return;

    const el = ref.current;
    const r = rectRef.current;
    if (!el || !r) return;

    // compute in % (no layout reads)
    const xPct = ((e.clientX - r.left) / r.width) * 100;
    const yPct = ((e.clientY - r.top) / r.height) * 100;

    scheduleUpdate(xPct, yPct);
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;

    el.style.setProperty("--spot-opacity", "0");

    // cancel pending RAF
    if (rafRef.current != null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  };

  // if disabled, ensure it's off
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (disabled) el.style.setProperty("--spot-opacity", "0");
  }, [disabled]);

  return (
    <p
      ref={ref}
      className={cn("spotlight-text", className)}
      data-text={children}
      onPointerEnter={onEnter}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      {children}
    </p>
  );
}