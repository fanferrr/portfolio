"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { heroContent, type HeroAudience } from "@/content/hero";
import { ScrollReveal } from "@/components/ScrollReveal";
import { MagneticText } from "@/components/MagneticText";
import { MagneticButton } from "@/components/MagneticButton";
import { HeroSpotlight } from "@/components/home/HeroSpotlight";
import { cn } from "@/lib/utils";

const audiences: { id: HeroAudience; label: string }[] = [
  { id: "forAnyone", label: "For anyone" },
  { id: "automation", label: "Automation" },
  { id: "aiCreative", label: "AI Creative" },
];

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    onChange();
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  return reduced;
}

export function HeroTabs() {
  const [audience, setAudience] = useState<HeroAudience>("forAnyone");
  const content = heroContent[audience];

  const reducedMotion = usePrefersReducedMotion();
  const headline = content.headline;

  const splineIframeSrc =
    "https://my.spline.design/animatedbackgroundgradientforweb-yIddEv3lf1Z9kPf5oxTDwubu/?embed=1";

  // Scroll effect
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 300], [0, 120]);
  const overlayOpacity = useTransform(scrollY, [0, 300], [1, 0.72]);

  const controlsY = useTransform(scrollY, [0, 300], [0, 0]);
  const contentY = useTransform(scrollY, [0, 300], [0, 0]);
  const contentOpacity = useTransform(scrollY, [0, 300], [1, 0.9]);

  return (
    <section className="relative min-h-[85vh] w-full overflow-hidden rounded-b-2xl">
      {/* Background */}
      {!reducedMotion && (
        <>
          <motion.div
            className="absolute inset-0 will-change-transform"
            style={{ y: bgY }}
          >
            <iframe
              src={splineIframeSrc}
              title="Spline background"
              loading="lazy"
              className="absolute inset-0 h-full w-full opacity-60 sm:opacity-70 lg:opacity-80"
              style={{ border: 0 }}
              allow="fullscreen"
            />
          </motion.div>

          <motion.div
            className="absolute inset-0 bg-black/75 sm:bg-black/65 lg:bg-black/55"
            style={{ opacity: overlayOpacity }}
          />

          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              opacity: overlayOpacity,
              background:
                "radial-gradient(520px 340px at 94% 90%, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0) 72%)",
            }}
          />
        </>
      )}

      {reducedMotion && <div className="hero-poster-bg absolute inset-0" />}

      <HeroSpotlight className="rounded-b-2xl" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-6xl px-4 pt-20 pb-24 sm:px-6 lg:pt-24 lg:pb-32">
        <ScrollReveal>
          {/* Tabs row */}
          {reducedMotion ? (
            <div className="flex items-center">
              <div className="flex max-w-full items-center gap-1 rounded-full border border-border/80 bg-card/40 p-0.5 overflow-x-auto whitespace-nowrap [scrollbar-width:none] [-ms-overflow-style:none]">
                {audiences.map(({ id, label }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setAudience(id)}
                    className={cn(
                      "shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                      audience === id
                        ? "bg-primary/90 text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                    data-cursor={audience === id ? "default" : "link"}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <motion.div className="will-change-transform" style={{ y: controlsY }}>
              <div className="flex items-center">
                <div className="flex max-w-full items-center gap-1 rounded-full border border-border/80 bg-card/40 p-0.5 overflow-x-auto whitespace-nowrap [scrollbar-width:none] [-ms-overflow-style:none]">
                  {audiences.map(({ id, label }) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setAudience(id)}
                      className={cn(
                        "shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                        audience === id
                          ? "bg-primary/90 text-primary-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                      data-cursor={audience === id ? "default" : "link"}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Headline + CTAs */}
          {reducedMotion ? (
            <>
              <MagneticText
                as="h1"
                className="mt-6 max-w-4xl text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:mt-8 lg:text-6xl xl:text-7xl"
              >
                {headline}
              </MagneticText>

              <div className="mt-16 flex flex-wrap items-center gap-4">
                <MagneticButton href="/book" variant="primary" dataCursor="cta">
                  Book a Call
                </MagneticButton>
                <MagneticButton href="/work" variant="secondary" dataCursor="link">
                  View work
                </MagneticButton>
              </div>
            </>
          ) : (
            <motion.div
              className="will-change-transform"
              style={{ y: contentY, opacity: contentOpacity }}
            >
              <MagneticText
                as="h1"
                className="mt-6 max-w-4xl text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:mt-8 lg:text-6xl xl:text-7xl"
              >
                {headline}
              </MagneticText>

              <div className="mt-16 flex flex-wrap items-center gap-4">
                <MagneticButton href="/book" variant="primary" dataCursor="cta">
                  Book a Call
                </MagneticButton>
                <MagneticButton href="/work" variant="secondary" dataCursor="link">
                  View work
                </MagneticButton>
              </div>
            </motion.div>
          )}
        </ScrollReveal>
      </div>
    </section>
  );
}