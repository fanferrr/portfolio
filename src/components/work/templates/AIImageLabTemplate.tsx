import type { WorkItem } from "@/content/work";
import { ScrollReveal } from "@/components/ScrollReveal";
import { MagneticText } from "@/components/MagneticText";

export function AIImageLabTemplate({ item }: { item: WorkItem }) {
  return (
    <div className="pt-14">
      {/* Header */}
      <div className="mx-auto max-w-6xl px-4 pt-16 sm:px-6">
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
      </div>

      {/* Masonry FULL BLEED — NO gaps */}
      <div className="mt-10">
        <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen px-0">
          <div
            className="
              columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 2xl:columns-6
              [column-gap:0px]
            "
          >
            {(item.images ?? []).map((src, idx) => (
              <div key={src + idx} className="mb-0 break-inside-avoid">
                {/* wrapper para que el zoom no desborde */}
                <div className="group relative overflow-hidden">
                  <img
                    src={src}
                    alt=""
                    loading={idx < 6 ? "eager" : "lazy"}
                    decoding="async"
                    className="
                      block w-full h-auto rounded-none select-none
                      transition-transform duration-500 ease-out
                      group-hover:scale-[1.10]
                    "
                    style={{
                      contentVisibility: "auto",
                      containIntrinsicSize: "800px 600px",
                    }}
                    draggable={false}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}