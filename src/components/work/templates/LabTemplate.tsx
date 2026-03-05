"use client";

import Image from "next/image";
import type { WorkItem } from "@/content/work";
import { ScrollReveal } from "@/components/ScrollReveal";
import { MagneticText } from "@/components/MagneticText";

export function LabTemplate({ item }: { item: WorkItem }) {
  return (
    <div className="pt-14">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:py-28">
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
        </ScrollReveal>

        {/* Full gallery, no gaps, no "nota" */}
        <ScrollReveal once={false} y={18} duration={0.5}>
          <div className="mt-10 overflow-hidden rounded-2xl border border-border bg-card/30">
            <div className="grid grid-cols-2 md:grid-cols-3">
              {(item.images ?? []).map((src, idx) => (
                <div key={src + idx} className="relative aspect-square">
                  <Image
                    src={src}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 320px"
                  />
                </div>
              ))}

              {!item.images?.length && (
                <div className="col-span-2 md:col-span-3 p-10 text-center text-sm text-muted-foreground">
                  No hay imágenes todavía. Añade rutas en <span className="text-foreground">work.ts</span> → <span className="text-foreground">images</span>.
                </div>
              )}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}