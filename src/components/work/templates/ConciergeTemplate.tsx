import Image from "next/image";
import type { WorkItem } from "@/content/work";
import { ScrollReveal } from "@/components/ScrollReveal";
import { MagneticText } from "@/components/MagneticText";
import { SpotlightText } from "@/components/SpotlightText";

export function ConciergeTemplate({ item }: { item: WorkItem }) {
  return (
    <div className="pt-14">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:py-28">
        {/* Header */}
        <ScrollReveal>
          <MagneticText
            as="h1"
            className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl"
          >
            {item.title}
          </MagneticText>

          <p className="mt-2 max-w-3xl text-muted-foreground">
            {item.description}
          </p>

          <div className="mt-5 flex flex-wrap gap-2 text-sm text-muted-foreground">
            {item.client && (
              <span className="rounded-full border border-border bg-card/40 px-3 py-1">
                {item.client}
              </span>
            )}
            {item.role && (
              <span className="rounded-full border border-border bg-card/40 px-3 py-1">
                {item.role}
              </span>
            )}
            <span className="rounded-full border border-border bg-card/40 px-3 py-1">
              Real
            </span>
          </div>
        </ScrollReveal>

        {/* Body: 2 columns (text + ONE image only) */}
        <div className="mt-14 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          {/* Left */}
          <div className="space-y-10">
            {item.problem && (
              <ScrollReveal once={false} y={18} duration={0.5}>
                <section>
                  <h2 className="text-lg font-semibold text-foreground">
                    Contexto
                  </h2>

                  {/* Spotlight hover purple */}
                  <SpotlightText
                    radius={200}
                    className="mt-3 leading-relaxed text-muted-foreground"
                  >
                    {item.problem}
                  </SpotlightText>
                </section>
              </ScrollReveal>
            )}

            {item.processes?.length ? (
              <ScrollReveal once={false} y={18} duration={0.5} delay={0.05}>
                <section>
                  <h2 className="text-lg font-semibold text-foreground">
                    Qué automatizé
                  </h2>

                  <div className="mt-4 space-y-4">
                    {item.processes.map((p) => (
                      <div
                        key={p.title}
                        className="rounded-xl border border-border bg-card/40 p-5 transition-colors duration-300 hover:bg-purple-600/20"
                      >
                        <h3 className="font-medium text-foreground">
                          {p.title}
                        </h3>

                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                          {p.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              </ScrollReveal>
            ) : null}
          </div>

          {/* Right: ONLY thumbnail */}
          <ScrollReveal once={false} y={18} duration={0.5}>
            <aside className="lg:sticky lg:top-20">
              {item.thumbnail ? (
                <div
                  className="overflow-hidden rounded-2xl p-[1px]"
                  style={{
                    background:
                      "linear-gradient(135deg, hsl(var(--primary) / 0.45), hsl(var(--primary) / 0.16), hsl(var(--border)))",
                  }}
                >
                  <div className="relative overflow-hidden rounded-[15px] bg-card/40">
                    <div className="relative aspect-[16/10] w-full">
                      <Image
                        src={item.thumbnail}
                        alt=""
                        fill
                        className="object-contain bg-black/20"
                        sizes="(max-width: 1024px) 100vw, 520px"
                        priority
                      />
                      <div className="absolute inset-0 bg-black/15" />
                    </div>
                  </div>
                </div>
              ) : null}
            </aside>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}