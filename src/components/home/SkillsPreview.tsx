"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { getSkills } from "@/content/skills";
import { ScrollReveal } from "@/components/ScrollReveal";
import { MagneticText } from "@/components/MagneticText";

export function SkillsPreview() {
  const skills = getSkills().slice(0, 6);

  const iconById: Record<string, string> = {
    n8n: "⚙️",
    "ai-workflows": "🤖",
    "ai-image-generation": "🖼️",
    "ai-video-generation": "🎬",
    "video-editing": "✂️",
    "web-development": "💻",
  };

  // Scroll-driven CTA animation (plays both directions)
  const ctaRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ctaRef,
    offset: ["start 92%", "end 70%"],
  });

  const ctaY = useTransform(scrollYProgress, [0, 0.6, 1], [22, 0, -6]);
  const ctaOpacity = useTransform(scrollYProgress, [0, 0.25, 1], [0, 1, 1]);
  const ctaScale = useTransform(scrollYProgress, [0, 0.6, 1], [0.92, 1.04, 1]);

  return (
    <section className="border-t border-border/40 pt-12 pb-20 lg:pt-14 lg:pb-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <ScrollReveal>
          <MagneticText
            as="h2"
            className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl"
          >
            Skills
          </MagneticText>
          <p className="mt-2 text-muted-foreground">
            Automatización, flujos e IA. Herramientas y enfoques con los que trabajo.
          </p>
        </ScrollReveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {skills.map((skill, i) => (
            <ScrollReveal
              key={skill.id}
              once={false}
              delay={i * 0.08}
              y={22}
              duration={0.5}
            >
              <motion.div
                initial={{ filter: "blur(8px)" }}
                whileInView={{ filter: "blur(0px)" }}
                viewport={{ once: false, margin: "-50px" }}
                transition={{ duration: 0.55, ease: "easeOut", delay: i * 0.08 }}
              >
                <Link
                  href="/skills"
                  className="group relative block overflow-hidden rounded-xl p-[1px] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_28px_-4px_hsl(var(--primary)/0.55)]"
                  style={{
                    background:
                      "linear-gradient(135deg, hsl(var(--primary) / 0.45), hsl(var(--primary) / 0.16), hsl(var(--border)))",
                  }}
                  data-cursor="view"
                >
                  <div className="flex h-full min-h-[180px] flex-col justify-between rounded-[11px] bg-card p-6 transition-colors duration-300 group-hover:bg-purple-600/40">
                    <div className="flex items-start gap-4">
                      {/* emoji */}
                      <div className="mt-0.5 shrink-0">
                        <span
                          className="text-3xl leading-none opacity-80 transition-all duration-300 group-hover:opacity-100 group-hover:scale-[1.08] group-hover:-rotate-3"
                          style={{
                            textShadow:
                              "0 0 40px rgba(124,58,237,0.95), 0 0 18px rgba(124,58,237,0.55)",
                            filter:
                              "drop-shadow(0 0 26px rgba(124,58,237,0.55)) drop-shadow(0 0 12px rgba(124,58,237,0.35))",
                          }}
                        >
                          {iconById[skill.id] ?? "✨"}
                        </span>
                      </div>

                      <div className="min-w-0">
                        <h3 className="font-medium text-foreground transition-colors duration-300 group-hover:text-white">
                          {skill.name}
                        </h3>
                        <p className="mt-2 text-sm text-muted-foreground transition-colors duration-300 group-hover:text-white/80 line-clamp-3">
                          {skill.description}
                        </p>
                      </div>
                    </div>

                    <span className="mt-4 inline-flex text-xs text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:text-white">
                      Ver más en Skills →
                    </span>
                  </div>
                </Link>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* CTA like SelectedWork + scroll animation both directions */}
        <div className="mt-10 flex justify-center">
          <motion.div
            ref={ctaRef}
            style={{ y: ctaY, opacity: ctaOpacity, scale: ctaScale }}
            className="will-change-transform"
          >
            <Link
              href="/skills"
              data-cursor="cta"
              className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-8 py-3 text-base font-semibold border border-border/70 bg-card/40 text-foreground transition hover:border-primary/60 hover:shadow-[0_0_32px_-10px_hsl(var(--primary)/0.6)]"
            >
              {/* shine sweep */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 translate-x-[-120%] bg-[linear-gradient(110deg,transparent_0%,transparent_42%,hsl(0_0%_100%/0.10)_50%,transparent_58%,transparent_100%)] group-hover:translate-x-[120%] transition-transform duration-700"
              />
              {/* subtle inner glow */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  boxShadow:
                    "inset 0 0 0 1px rgba(124,58,237,0.22), inset 0 0 40px rgba(124,58,237,0.10)",
                }}
              />

              <span className="relative">Ver todas las skills</span>
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