"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const MAGNETIC_MAX_PX = 8;

type MagneticButtonProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary";
  dataCursor?: "cta" | "link";
  target?: React.HTMLAttributeAnchorTarget;
  rel?: string;
};

export function MagneticButton({
  href,
  children,
  className,
  variant = "primary",
  dataCursor = "cta",
  target,
  rel,
}: MagneticButtonProps) {
  const wrapperRef = useRef<HTMLAnchorElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [useMagnetic, setUseMagnetic] = useState(true);

  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setUseMagnetic(!coarse && !reduced);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (!wrapperRef.current || !useMagnetic) return;
      const rect = wrapperRef.current.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / rect.height - 0.5;
      const x = Math.max(-MAGNETIC_MAX_PX, Math.min(MAGNETIC_MAX_PX, relX * MAGNETIC_MAX_PX * 2));
      const y = Math.max(-MAGNETIC_MAX_PX, Math.min(MAGNETIC_MAX_PX, relY * MAGNETIC_MAX_PX * 2));
      setOffset({ x, y });
    },
    [useMagnetic]
  );

  const handleMouseLeave = useCallback(() => {
    setOffset({ x: 0, y: 0 });
  }, []);

  if (variant === "primary") {
    return (
      <Link
        ref={wrapperRef}
        href={href}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={cn(
          "btn-primary-magnetic relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-lg px-6 py-3 text-sm font-medium text-primary-foreground transition-colors sm:px-8 sm:py-4 sm:text-base",
          className
        )}
        data-cursor={dataCursor}
        target={target}
        rel={rel}
      >
        <motion.span
          className="relative z-10"
          animate={{ x: useMagnetic ? offset.x : 0, y: useMagnetic ? offset.y : 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          {children}
        </motion.span>
        <span className="btn-shine absolute inset-0 pointer-events-none" aria-hidden />
      </Link>
    );
  }

  return (
    <Link
      ref={wrapperRef}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "btn-secondary inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-background px-6 py-3 text-sm font-medium transition-all sm:px-8 sm:py-4 sm:text-base",
        className
      )}
      data-cursor={dataCursor}
      target={target}
      rel={rel}
    >
      <motion.span
        animate={{ x: useMagnetic ? offset.x : 0, y: useMagnetic ? offset.y : 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        {children}
      </motion.span>
    </Link>
  );
}
