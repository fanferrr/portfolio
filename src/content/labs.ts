export type LabItem = {
  slug: string;
  title: string;
  description: string;
  url: string;
};

const labs: LabItem[] = [
  {
    slug: "ai-ads-lab",
    title: "AI Ads Lab",
    description: "Spec: uso de IA para ideación y variaciones de creativos para ads.",
    url: "/work/ai-ads-lab",
  },
  {
    slug: "ai-fashion-lab",
    title: "AI Fashion Lab",
    description: "Spec: IA para looks, paletas y contenidos visuales en contexto moda.",
    url: "/work/ai-fashion-lab",
  },
];

export function getLabsItems(): LabItem[] {
  return labs;
}
