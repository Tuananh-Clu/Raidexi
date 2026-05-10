import { ArchitectureDiagram } from "@/features/ArchitectureC/components/ArchitectureDiagram";
import { FeaturesFooter } from "@/features/ArchitectureC/components/FeaturesFooter";
import { HeroSection } from "@/features/ArchitectureC/components/HeroSection";
import { StatusTicker } from "@/features/ArchitectureC/components/StatusTicker";
import { NavBar } from "@/Shared/Components/components/NavBar";


export default function Page() {
  return (
    <div className="bg-[#1a1510] min-h-screen text-[#e0dcd5]">
      <NavBar />
      <main className="flex flex-col grow">
      <section className="relative w-full max-w-7xl px-6 pt-16 pb-16 mx-auto grow border-x border-border-subtle bg-surface-dark my-8 rounded-3xl shadow-sm">
        <HeroSection />

        <ArchitectureDiagram />

        <FeaturesFooter />
      </section>

      <StatusTicker />
    </main>
    </div>
   
  );
}
