import { HeroTabs } from "@/components/home/HeroTabs";
import { SelectedWork } from "@/components/home/SelectedWork";
import { SkillsPreview } from "@/components/home/SkillsPreview";
import { CTAFinal } from "@/components/home/CTAFinal";

export default function HomePage() {
  return (
    <div>
      <HeroTabs />
      <SelectedWork />
      <SkillsPreview />
      <CTAFinal />
    </div>
  );
}