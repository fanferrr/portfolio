export type SkillItem = {
  id: string;
  name: string;
  description: string;
  example?: string;
};

const skills: SkillItem[] = [
  {
    id: "n8n",
    name: "n8n",
    description:
      "Diseño flujos que ahorran horas. Triggers, condiciones, APIs: todo conectado para que los procesos corran solos.",
  },
  {
    id: "ai-workflows",
    name: "AI Workflows",
    description:
      "Integro modelos de IA donde más duele: tareas repetitivas, clasificación, generación de contenido. Automático y sin fricciones.",
  },
  {
    id: "ai-image-generation",
    name: "AI Image Generation",
    description:
      "Creo imágenes con IA que parecen de producción real. Del prompt al resultado final, rápido y con criterio.",
  },
  {
    id: "ai-video-generation",
    name: "AI Video Generation",
    description:
      "Genero vídeo con IA. Del concepto a la pieza visual, sin cámara ni equipo de producción.",
  },
  {
    id: "video-editing",
    name: "Video Editing",
    description:
      "Edito vídeo con criterio. Ritmo, cortes, música: que el resultado final enganche de principio a fin.",
  },
  {
    id: "web-development",
    name: "Web Development",
    description:
      "Construyo webs limpias y funcionales. Sin complicarlo más de lo necesario.",
  },
];

export function getSkills(): SkillItem[] {
  return skills;
}

export function getSkillById(id: string): SkillItem | undefined {
  return skills.find((s) => s.id === id);
}