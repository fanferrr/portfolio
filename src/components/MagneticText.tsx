"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const MAGNETIC_MAX_PX = 4;
const MAGNETIC_FACTOR = 8;

type MagneticTextProps = {
  children: React.ReactNode;
  as?: "h1" | "h2";
  className?: string;
};

export function MagneticText({
  children,
  as: Tag = "h1",
  className,
}: MagneticTextProps) {
  const wrapperRef = useRef<HTMLHeadingElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [useMagnetic, setUseMagnetic] = useState(true);

  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setUseMagnetic(!coarse && !reduced);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLHeadingElement>) => {
      if (!wrapperRef.current) return;
      const rect = wrapperRef.current.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width;
      const relY = (e.clientY - rect.top) / rect.height;
      if (!useMagnetic) {
        setOffset({ x: 0, y: 0 });
        setIsHovered(true);
        return;
      }
      const x = Math.max(-MAGNETIC_MAX_PX, Math.min(MAGNETIC_MAX_PX, (relX - 0.5) * MAGNETIC_FACTOR));
      const y = Math.max(-MAGNETIC_MAX_PX, Math.min(MAGNETIC_MAX_PX, (relY - 0.5) * MAGNETIC_FACTOR));
      setOffset({ x, y });
      setIsHovered(true);
    },
    [useMagnetic]
  );

  const handleMouseLeave = useCallback(() => {
    setOffset({ x: 0, y: 0 });
    setIsHovered(false);
  }, []);

  return (
    <Tag
      ref={wrapperRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn("inline-block cursor-default", className)}
    >
      <motion.span
        className={cn(
          "inline-block text-gradient-animate",
          isHovered && "text-gradient-animate-hover"
        )}
        animate={{
          x: useMagnetic ? offset.x : 0,
          y: useMagnetic ? offset.y : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
        }}
      >
        {children}
      </motion.span>
    </Tag>
  );
}
