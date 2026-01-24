"use client";
import { BrandSidebar } from "@/features/Brand/components/BrandSideBar";
import { MainContent } from "@/features/Brand/components/MainContextResult";
import { BodyMeasureEstimateContext } from "@/provider/BodyMeasureEstimate";
import { Footer } from "@/Shared/Components/components/Footer";
import { NavBar } from "@/Shared/Components/components/NavBar";
import { useParams, useSearchParams } from "next/navigation";
import { useContext } from "react";

export default function Page() {
  const context = useContext(BodyMeasureEstimateContext);
  const measurements = {
    chest: context?.dataMeasured?.chest,
    waist: context?.dataMeasured?.waist,
    height: context?.dataMeasured?.height,
    shoulderWidth: context?.dataMeasured?.shoulderWidth,
  };
  const brandData = JSON.parse(localStorage.getItem("brandData") || "[]");

  const searchParams = useSearchParams();
  const brand = searchParams.get("brand");
  const brandResult:any = brandData.find((b: any) => b.name === brand);
  return (
    <div>
      <NavBar />
      <main className="flex-1 w-full px-4 py-8 mx-auto max-w-7xl sm:px-6">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <aside className="lg:col-span-4">
            <div className="sticky top-24">
              <BrandSidebar
                measurements={measurements}
                brandData={brandResult}
              />
            </div>
          </aside>
          <section className="lg:col-span-8">
            <MainContent brandData={brandResult} />
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
