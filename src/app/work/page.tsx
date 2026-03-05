"use client";

import { useState } from "react";
import { getWorkItemsByTag, type WorkTag } from "@/content/work";
import { WorkTile } from "@/components/work/WorkTile";
import { ScrollReveal } from "@/components/ScrollReveal";
import { MagneticText } from "@/components/MagneticText";
import { cn } from "@/lib/utils";

const filterOptions: { value: "all" | WorkTag; label: string }[] = [
  { value: "all", label: "All" },
  { value: "real", label: "Real" },
  { value: "spec", label: "Lab" },
];

export default function WorkPage() {
  const [filter, setFilter] = useState<"all" | WorkTag>("all");
  const items = getWorkItemsByTag(filter);

  return (
    <div className="pt-14">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:py-28">
        <ScrollReveal>
          <MagneticText
            as="h1"
            className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl"
          >
            Work
          </MagneticText>
          <p className="mt-2 text-muted-foreground">
            Proyectos seleccionados y casos de estudio.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.05}>
          <div className="mt-8 flex flex-wrap gap-2">
            {filterOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setFilter(opt.value)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                  filter === opt.value
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                )}
                data-cursor="link"
              >
                {opt.label}
              </button>
            ))}
          </div>
        </ScrollReveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <ScrollReveal
              key={item.slug}
              once={false}
              delay={i * 0.06}
              y={22}
              duration={0.5}
            >
              <WorkTile item={item} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}