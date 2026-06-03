import { ArchitectureDiagram } from "@/features/ArchitectureC/components/ArchitectureDiagram";
import { FeaturesFooter } from "@/features/ArchitectureC/components/FeaturesFooter";
import { HeroSection } from "@/features/ArchitectureC/components/HeroSection";
import { StatusTicker } from "@/features/ArchitectureC/components/StatusTicker";
import { NavBar } from "@/Shared/Components/components/NavBar";


export default function Page() {
  return (
    <div className="bg-[var(--surface-canvas)] min-h-screen text-[var(--ink-soft)]">
      <NavBar />
      <main className="flex flex-col grow">
      <section className="relative w-full max-w-7xl px-6 pt-16 pb-16 mx-auto grow border-x border-[rgba(24,23,20,0.12)] bg-white my-8 rounded-3xl shadow-sm">
        <HeroSection />

        <ArchitectureDiagram />

        <FeaturesFooter />
      </section>

      <StatusTicker />
    </main>
    </div>
   
  );
}
