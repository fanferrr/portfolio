import { getSkills } from "@/content/skills";
import { ScrollReveal } from "@/components/ScrollReveal";
import { MagneticText } from "@/components/MagneticText";

const iconById: Record<string, string> = {
  n8n: "⚙️",
  "ai-workflows": "🤖",
  "ai-image-generation": "🖼️",
  "ai-video-generation": "🎬",
  "video-editing": "✂️",
  "web-development": "💻",
};

export default function SkillsPage() {
  const skills = getSkills();

  return (
    <div className="pt-14">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <ScrollReveal>
          <MagneticText
            as="h1"
            className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl"
          >
            Skills
          </MagneticText>
          <p className="mt-2 text-muted-foreground">
            Herramientas y enfoques con los que trabajo. Sin inventar resultados.
          </p>
        </ScrollReveal>

        <ul className="mt-12 space-y-6">
          {skills.map((skill, i) => (
            <ScrollReveal
              key={skill.id}
              once={false}
              delay={i * 0.04}
              y={18}
              duration={0.5}
            >
              {/* ✅ group en TODA la fila: icon + card */}
              <li className="group flex items-start gap-6">
                {/* Icon OUTSIDE the box, but inside the group */}
                <div className="pt-5">
                  <span
                    className="emoji-float block text-5xl leading-none opacity-85 transition-all duration-300 group-hover:opacity-100 group-hover:scale-[1.12] group-hover:-rotate-6"
                    style={{
                      textShadow:
                        "0 0 56px rgba(124,58,237,0.95), 0 0 24px rgba(124,58,237,0.60)",
                      filter:
                        "drop-shadow(0 0 34px rgba(124,58,237,0.60)) drop-shadow(0 0 16px rgba(124,58,237,0.38))",
                    }}
                  >
                    {iconById[skill.id] ?? "✨"}
                  </span>
                </div>

                {/* Card */}
                <div
                  className="relative block w-full overflow-hidden rounded-xl p-[1px] transition-all duration-300 group-hover:scale-[1.01] group-hover:shadow-[0_0_30px_-6px_hsl(var(--primary)/0.62)]"
                  style={{
                    background:
                      "linear-gradient(135deg, hsl(var(--primary) / 0.48), hsl(var(--primary) / 0.18), hsl(var(--border)))",
                  }}
                >
                  <div className="rounded-[11px] bg-card p-6 transition-colors duration-300 group-hover:bg-purple-600/40">
                    <h2 className="text-lg font-semibold text-foreground transition-colors duration-300 group-hover:text-white">
                      {skill.name}
                    </h2>

                    <p className="mt-2 leading-relaxed text-muted-foreground transition-colors duration-300 group-hover:text-white/80">
                      {skill.description}
                    </p>

                    {skill.example && (
                      <div className="mt-4 rounded-lg bg-muted/50 px-4 py-3 transition-colors duration-300 group-hover:bg-black/20">
                        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground transition-colors duration-300 group-hover:text-white/70">
                          Mini-ejemplo
                        </p>
                        <p className="mt-1 text-sm text-foreground transition-colors duration-300 group-hover:text-white">
                          {skill.example}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </li>
            </ScrollReveal>
          ))}
        </ul>
      </div>
    </div>
  );
}