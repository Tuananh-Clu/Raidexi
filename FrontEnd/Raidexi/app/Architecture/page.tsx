import { ArchitectureDiagram } from "@/features/ArchitectureC/components/ArchitectureDiagram";
import { FeaturesFooter } from "@/features/ArchitectureC/components/FeaturesFooter";
import { HeroSection } from "@/features/ArchitectureC/components/HeroSection";
import { StatusTicker } from "@/features/ArchitectureC/components/StatusTicker";
import { NavBar } from "@/Shared/Components/components/NavBar";


export default function Page() {
  return (
    <div>
      <NavBar />
       <main className="flex flex-col grow">
      <section className="relative w-full px-6 pt-16 pb-16 mx-auto grow border-x border-border-brass/30">
        <HeroSection />

        <ArchitectureDiagram />

        <FeaturesFooter />
      </section>

      <StatusTicker />
    </main>
    </div>
   
  );
}
