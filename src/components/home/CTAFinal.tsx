"use client";

import { ScrollReveal } from "@/components/ScrollReveal";
import { contact } from "@/content/contact";
import { MagneticButton } from "@/components/MagneticButton";
import { MagneticText } from "@/components/MagneticText";

const { email, linkedInUrl } = contact;

export function CTAFinal() {
  return (
    <section className="border-t border-border/40 bg-card/20 py-24 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
        <ScrollReveal>
          <MagneticText
            as="h2"
            className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl"
          >
            ¿Hablamos?
          </MagneticText>

          <p className="mt-4 mx-auto max-w-xl text-muted-foreground">
            Agenda una llamada o escríbeme por email o LinkedIn. Sin compromiso.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <MagneticButton href="/book" variant="primary" dataCursor="cta">
              Book a Call
            </MagneticButton>

            <MagneticButton
              href={`mailto:${email}`}
              variant="secondary"
              dataCursor="cta"
            >
              Email
            </MagneticButton>

            <MagneticButton
              href={linkedInUrl}
              variant="secondary"
              dataCursor="cta"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </MagneticButton>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}