import { notFound } from "next/navigation";
import { getWorkBySlug, getWorkItems } from "@/content/work";
import { ConciergeTemplate } from "@/components/work/templates/ConciergeTemplate";
import { AIImageLabTemplate } from "@/components/work/templates/AIImageLabTemplate";
import { AIVideoLabTemplate } from "@/components/work/templates/AIVideoLabTemplate";
import { LabTemplate } from "@/components/work/templates/LabTemplate";

export function generateStaticParams() {
  return getWorkItems().map((item) => ({ slug: item.slug }));
}

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const item = getWorkBySlug(slug);
  if (!item) return notFound();

  if (item.slug === "my-concierge-marbella") return <ConciergeTemplate item={item} />;

  // ✅ tus slugs reales (según work.ts)
  if (item.slug === "ai-fashion-lab") return <AIImageLabTemplate item={item} />;
  if (item.slug === "ai-ads-lab") return <AIVideoLabTemplate item={item} />;

  return <LabTemplate item={item} />;
}