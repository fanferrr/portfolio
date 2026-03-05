"use client";

import { useEffect, useState } from "react";

type CursorVariant = "default" | "link" | "view" | "cta";

export function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [variant, setVariant] = useState<CursorVariant>("default");
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const mediaQuery = window.matchMedia("(pointer: coarse)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const useCustomCursor = !mediaQuery.matches && !reducedMotion.matches;
    if (!useCustomCursor) return;

    document.body.classList.add("cursor-none");

    const handleMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };
    const handleLeave = () => setIsVisible(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const cursor = target?.closest("[data-cursor]")?.getAttribute("data-cursor");
      if (cursor === "link" || cursor === "view" || cursor === "cta") {
        setVariant(cursor as CursorVariant);
      }
    };
    const handleMouseOut = () => setVariant("default");

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseleave", handleLeave);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);
    return () => {
      document.body.classList.remove("cursor-none");
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseleave", handleLeave);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, [mounted, isVisible]);

  if (!mounted) return null;

  const mediaQuery =
    typeof window !== "undefined" ? window.matchMedia("(pointer: coarse)") : null;
  const reducedMotion =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)")
      : null;
  if (mediaQuery?.matches || reducedMotion?.matches) return null;

  const ringSize =
    variant === "cta" ? 48 : variant === "view" ? 40 : variant === "link" ? 32 : 24;

  return (
    <>
      <div
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block"
        style={{
          transform: `translate(${pos.x}px, ${pos.y}px)`,
          opacity: isVisible ? 1 : 0,
        }}
        aria-hidden
      >
        <div
          className="absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary transition-[width,height] duration-150"
          style={{
            width: variant === "cta" ? 8 : 6,
            height: variant === "cta" ? 8 : 6,
          }}
        />
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-primary/50 transition-[width,height,border-color] duration-200"
          style={{
            width: ringSize,
            height: ringSize,
            borderColor:
              variant === "cta"
                ? "hsl(var(--primary))"
                : "hsl(var(--primary) / 0.5)",
          }}
        />
      </div>
    </>
  );
}
