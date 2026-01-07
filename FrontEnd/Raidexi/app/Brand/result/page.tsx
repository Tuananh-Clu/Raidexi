import { BrandSidebar } from "@/features/Brand/components/BrandSideBar";
import { MainContent } from "@/features/Brand/components/MainContextResult";
import { UserMeasurements } from "@/features/Brand/types";
import { Footer } from "@/Shared/Components/components/Footer";
import { NavBar } from "@/Shared/Components/components/NavBar";

export default function Page() {
     const measurements:UserMeasurements= {
    chest: 98,
    waist: 82,
    hips: 95,
    height: 175
  };
  return (
    <div>
      <NavBar />
      <main className="flex-1 w-full px-4 py-8 mx-auto max-w-7xl sm:px-6">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <aside className="lg:col-span-4">
            <div className="sticky top-24">
              <BrandSidebar measurements={measurements} />
            </div>
          </aside>
          <section className="lg:col-span-8">
            <MainContent />
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
