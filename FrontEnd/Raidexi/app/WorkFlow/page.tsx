
import Hero from "@/features/WorkFlow/Components/Hero";
import LayerGrid from "@/features/WorkFlow/Components/LayoutGrid";
import { LogicDiagram } from "@/features/WorkFlow/Components/LogicDiagram";
import SpecsTable from "@/features/WorkFlow/Components/SpecsTable";
import { Footer } from "@/Shared/Components/components/Footer";
import { NavBar } from "@/Shared/Components/components/NavBar";

export default function Page() {
  return (
    <div>
      <NavBar />
      <main className="flex flex-col items-center flex-1 w-full">
        <Hero />
        <LogicDiagram />
        <LayerGrid />
        <SpecsTable />
      </main>
      <Footer />
    </div>
  );
}
