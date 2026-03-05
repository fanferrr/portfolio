"use client";

import { ScrollReveal } from "@/components/ScrollReveal";
import { MagneticText } from "@/components/MagneticText";
import { MagneticButton } from "@/components/MagneticButton";
import { contact } from "@/content/contact";

const { email, linkedInUrl } = contact;

// ⚠️ Cambia esta URL por tu Calendly real
const calendlyUrl = "https://calendly.com/juanferf133";

export default function BookPage() {
  return (
    <div className="pt-14">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:py-28">
        <ScrollReveal>
          <MagneticText
            as="h1"
            className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl"
          >
            Book a Call
          </MagneticText>

          <p className="mt-2 max-w-2xl text-muted-foreground">
            Una llamada corta para entender tu caso. Si encaja, te digo cómo lo haría y
            qué necesitaría.
          </p>
        </ScrollReveal>

        {/* Calendly embed */}
        <ScrollReveal once={false} y={18} duration={0.5} delay={0.05}>
          <div className="mt-10 overflow-hidden rounded-2xl border border-border bg-card/30">
          <div className="relative h-[520px] sm:h-[560px] lg:h-[620px] w-full">
              <iframe
                title="Calendly"
                src={`${calendlyUrl}?hide_landing_page_details=1&hide_gdpr_banner=1`}
                className="absolute inset-0 h-full w-full"
                style={{ border: 0 }}
                loading="lazy"
              />
            </div>
          </div>
        </ScrollReveal>

        {/* Alternatives */}
        <ScrollReveal once={false} y={18} duration={0.5} delay={0.1}>
          <div className="mt-10 flex flex-wrap items-center gap-4">
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

          <p className="mt-4 text-sm text-muted-foreground">
            Si el embed no carga, abre el calendario aquí:{" "}
            <a
              href={calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:opacity-90"
              data-cursor="link"
            >
              {calendlyUrl}
            </a>
          </p>
        </ScrollReveal>
      </div>
    </div>
  );
}