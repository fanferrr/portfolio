export type WorkTag = "real" | "spec" | "automation" | "ai" | "n8n";

export type WorkProcess = {
  title: string;
  description: string;
};

export type WorkItem = {
  slug: string;
  title: string;
  client?: string;
  description: string;
  year?: string;
  tags: WorkTag[];
  type: "real" | "spec";
  thumbnail?: string;
  problem?: string;
  processes?: WorkProcess[];
  images?: string[];
  role?: string;
};

const work: WorkItem[] = [
  {
    slug: "my-concierge-marbella",
    title: "My Concierge Marbella",
    client: "My Concierge Marbella",
    description:
      "Automatización operativa para un servicio de concierge en Marbella: flujos que conectan reservas, proveedores y clientes para reducir trabajo manual y errores.",
    year: "2026",
    tags: ["real", "automation", "n8n"],
    type: "real",
    role: "Automatización y flujos",
    problem:
      "La operativa dependía completamente de procesos manuales: correos gestionados a mano, sin base de datos, sin sistema de seguimiento. Cada cliente, cada contrato y cada informe dependían de que alguien lo recordara y lo ejecutara. No había estructura digital, yo la construí desde cero.",
    processes: [
      {
        title: "Respuesta y clasificación de correos",
        description:
          "Cada correo entrante recibe una respuesta automática inmediata y se clasifica según su tipo, sin intervención manual. El cliente siente atención desde el primer segundo.",
      },
      {
        title: "Generación automática de documentos",
        description:
          "El sistema extrae los datos relevantes, genera un PDF personalizado y rellena contratos automáticamente. Solo hay que introducir la información, el resto lo hace solo.",
      },
      {
        title: "Gestión y seguimiento de clientes",
        description:
          "Base de datos creada desde cero que centraliza toda la información. Informes periódicos por cliente, checklists de revisión y comunicación recurrente automatizada, sin depender de que nadie lo recuerde.",
      },
    ],
    // 👇 My Concierge: dejamos sin galería (solo header/thumbnail)
    images: [],
    thumbnail: "/work/my-concierge.jpg",
  },

  {
    slug: "ai-ads-lab",
    title: "AI Video Lab",
    client: "Proyectos personales",
    description:
      "Vídeos generados con IA, editados con criterio. Sin producción, sin equipo, sin presupuesto. Solo una idea, las herramientas y ver hasta dónde se puede llegar. Moda, producto, automóviles y lo que venga.",
    // 👇 si NO quieres que salga el año en la caja, déjalo undefined
    year: undefined,
    tags: ["spec", "ai"],
    type: "spec",
    role: "Proyectos personales",
    thumbnail: "/work/ai-ads.jpg",
    // 👇 carpeta real: /public/work/ai-video-lab/
    images: [
      "/work/ai-video-lab/01.mp4",
      "/work/ai-video-lab/02.mp4",
      "/work/ai-video-lab/03.mp4",
      "/work/ai-video-lab/04.mp4",
      "/work/ai-video-lab/05.mp4",
      "/work/ai-video-lab/06.mp4",
      "/work/ai-video-lab/07.mp4",
      "/work/ai-video-lab/08.mp4",
      "/work/ai-video-lab/09.mp4",
      "/work/ai-video-lab/10.mp4",
      "/work/ai-video-lab/11.mp4",
      "/work/ai-video-lab/12.mp4",
      "/work/ai-video-lab/13.mp4",
      "/work/ai-video-lab/14.mp4",
    ],
  },

  {
    slug: "ai-fashion-lab",
    title: "AI Image Lab",
    client: "Proyectos personales",
    description:
      "Imágenes generadas con IA, sin brief ni cliente. Cada una es un experimento: probar estilos, romper límites y ver hasta dónde llega la herramienta. Moda, producto, automóviles, gastronomía. Sin restricciones, solo criterio.",
    // 👇 si NO quieres que salga el año en la caja, déjalo undefined
    year: undefined,
    tags: ["spec", "ai"],
    type: "spec",
    role: "Proyectos personales",
    thumbnail: "/work/ai-fashion.jpg",
    // 👇 carpeta real: /public/work/ai-image-lab/
    images: [
      "/work/ai-image-lab/01.avif",
      "/work/ai-image-lab/02.avif",
      "/work/ai-image-lab/03.avif",
      "/work/ai-image-lab/04.avif",
      "/work/ai-image-lab/05.avif",
      "/work/ai-image-lab/06.avif",
      "/work/ai-image-lab/07.avif",
      "/work/ai-image-lab/08.avif",
      "/work/ai-image-lab/09.avif",
      "/work/ai-image-lab/10.avif",
      "/work/ai-image-lab/11.avif",
      "/work/ai-image-lab/12.avif",
      "/work/ai-image-lab/13.avif",
      "/work/ai-image-lab/14.avif",
      "/work/ai-image-lab/15.avif",
      "/work/ai-image-lab/16.avif",
      "/work/ai-image-lab/17.avif",
      "/work/ai-image-lab/18.avif",
      "/work/ai-image-lab/19.avif",
      "/work/ai-image-lab/20.avif",
      "/work/ai-image-lab/21.avif",
      "/work/ai-image-lab/22.avif",
      "/work/ai-image-lab/23.avif",
      "/work/ai-image-lab/24.avif",
      "/work/ai-image-lab/25.avif",
      "/work/ai-image-lab/26.avif",
      "/work/ai-image-lab/27.avif",
      "/work/ai-image-lab/28.avif",
      "/work/ai-image-lab/29.avif",
      "/work/ai-image-lab/30.avif",
      "/work/ai-image-lab/31.avif",
    ],
  },
];

export function getWorkItems(): WorkItem[] {
  return work;
}

export function getWorkBySlug(slug: string): WorkItem | undefined {
  return work.find((item) => item.slug === slug);
}

export function getWorkItemsByTag(tag: WorkTag | "all"): WorkItem[] {
  if (tag === "all") return work;
  return work.filter((item) => item.tags.includes(tag));
}

export function getWorkTags(): WorkTag[] {
  const set = new Set<WorkTag>();
  work.forEach((item) => item.tags.forEach((t) => set.add(t)));
  return Array.from(set);
}