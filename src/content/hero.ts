export type HeroAudience = "forAnyone" | "automation" | "aiCreative";

export type HeroContent = {
  headline: string;
  accentWord: string;
};

export const heroContent: Record<HeroAudience, HeroContent> = {
  forAnyone: {
    headline:
      "Soy un curioso de la IA. Aprendo rápido, experimento siempre y convierto semanas en horas.",
    accentWord: "curioso",
  },

  automation: {
    headline:
      "El tiempo es lo más valioso. Automatizo procesos para que tu equipo se enfoque en lo que importa.",
    accentWord: "automatizo",
  },

  aiCreative: {
    headline:
      "Creo campañas visuales con IA. Imágenes y vídeos del concepto al resultado final, con calidad que se ve.",
    accentWord: "campañas",
  },
};