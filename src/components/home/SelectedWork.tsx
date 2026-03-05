"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { getWorkItems } from "@/content/work";
import { WorkTile } from "@/components/work/WorkTile";
import { ScrollReveal } from "@/components/ScrollReveal";
import { MagneticText } from "@/components/MagneticText";

export function SelectedWork() {
  const items = getWorkItems().slice(0, 3);

  const ctaRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ctaRef,
    offset: ["start 90%", "end 70%"],
  });

  const ctaY = useTransform(scrollYProgress, [0, 0.6, 1], [22, 0, -6]);
  const ctaOpacity = useTransform(scrollYProgress, [0, 0.25, 1], [0, 1, 1]);
  const ctaScale = useTransform(scrollYProgress, [0, 0.6, 1], [0.92, 1.04, 1]);

  return (
    <section className="border-t border-border/40 pt-12 pb-10 lg:pt-14 lg:pb-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <ScrollReveal>
          <MagneticText
            as="h2"
            className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl"
          >
            Selected work
          </MagneticText>
          <p className="mt-2 text-muted-foreground">
            Proyectos recientes y casos de estudio.
          </p>
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3 items-stretch">
          {items[0] && (
            <ScrollReveal once={false} delay={0}>
              <div className="h-[440px]">
                <WorkTile item={items[0]} />
              </div>
            </ScrollReveal>
          )}

          {items[1] && (
            <ScrollReveal once={false} delay={0.1}>
              <div className="h-[440px]">
                <WorkTile item={items[1]} />
              </div>
            </ScrollReveal>
          )}

          {items[2] && (
            <ScrollReveal once={false} delay={0.2}>
              <div className="h-[440px]">
                <WorkTile item={items[2]} />
              </div>
            </ScrollReveal>
          )}
        </div>

        <div className="mt-0 flex justify-center">
          <motion.div
            ref={ctaRef}
            style={{ y: ctaY, opacity: ctaOpacity, scale: ctaScale }}
            className="will-change-transform"
          >
            <Link
              href="/work"
              data-cursor="cta"
              className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-8 py-3 text-base font-semibold border border-border/70 bg-card/40 text-foreground transition hover:border-primary/60 hover:shadow-[0_0_32px_-10px_hsl(var(--primary)/0.6)]"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 translate-x-[-120%] bg-[linear-gradient(110deg,transparent_0%,transparent_42%,hsl(0_0%_100%/0.10)_50%,transparent_58%,transparent_100%)] group-hover:translate-x-[120%] transition-transform duration-700"
              />

              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  boxShadow:
                    "inset 0 0 0 1px rgba(124,58,237,0.22), inset 0 0 40px rgba(124,58,237,0.10)",
                }}
              />

              <span className="relative">Ver todo el trabajo</span>
              <span className="relative transition-transform duration-300 group-hover:translate-x-1 group-hover:-rotate-6">
                →
              </span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}