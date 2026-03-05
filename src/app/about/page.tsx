import Image from "next/image";
import { ScrollReveal } from "@/components/ScrollReveal";
import { MagneticText } from "@/components/MagneticText";
import { SpotlightText } from "@/components/SpotlightText";

export default function AboutPage() {
  return (
    <div className="pt-14">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:py-28">
        <ScrollReveal>
          <MagneticText
            as="h1"
            className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl"
          >
            About Juan Fernando M. B.
          </MagneticText>
        </ScrollReveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          {/* Text */}
          <div className="space-y-6">
            <ScrollReveal once={false} y={18} duration={0.5}>
              <SpotlightText
                radius={160}
                className="text-base leading-relaxed text-muted-foreground sm:text-xl lg:text-2xl lg:leading-9"
              >
                Estudié Marketing y Publicidad, lo que me dio una base sobre
                comunicación, marcas y campañas. Pero la curiosidad me fue
                llevando por otros caminos: la IA, la automatización, la
                creación visual.
              </SpotlightText>
            </ScrollReveal>

            <ScrollReveal once={false} y={18} duration={0.5} delay={0.05}>
              <SpotlightText
                radius={160}
                className="text-base leading-relaxed text-muted-foreground sm:text-xl lg:text-2xl lg:leading-9"
              >
                Algunos conectan con el marketing, otros no, y está bien así.
                Hoy automatizo procesos con n8n, genero imágenes y vídeos con
                IA, edito contenido y construyo webs. Me gusta construir cosas
                reales, cosas que funcionan.
              </SpotlightText>
            </ScrollReveal>

            <ScrollReveal once={false} y={18} duration={0.5} delay={0.1}>
              <SpotlightText
                radius={160}
                className="text-base leading-relaxed text-muted-foreground sm:text-xl lg:text-2xl lg:leading-9"
              >
                Soy persistente, aprendo rápido y me tomo en serio lo que hago.
                Si algo se puede crear, lo creo. Si se puede simplificar, lo
                simplifico.
              </SpotlightText>
            </ScrollReveal>
          </div>

          {/* Portrait (NO filters) */}
          <ScrollReveal once={false} y={18} duration={0.5}>
            <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-none lg:justify-self-end lg:-mt-8">
              <div className="relative aspect-square w-full overflow-hidden rounded-full border border-border/70 bg-card/30">
                <Image
                  src="/about/me.jpeg"
                  alt="Juan"
                  fill
                  sizes="(max-width: 1024px) 360px, 420px"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}