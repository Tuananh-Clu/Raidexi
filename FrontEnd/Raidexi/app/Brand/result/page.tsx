"use client";
import { BrandSidebar } from "@/features/Brand/components/BrandSideBar";
import { Brand } from "@/features/Brand/types";
import { MainContent } from "@/features/Brand/components/MainContextResult";
import { BodyMeasureEstimateContext } from "@/provider/BodyMeasureEstimate";
import { Footer } from "@/Shared/Components/components/Footer";
import { NavBar } from "@/Shared/Components/components/NavBar";
import { useSearchParams } from "next/navigation";
import { Suspense, useContext, useState } from "react";

function BrandResultPage() {
  const context = useContext(BodyMeasureEstimateContext);
  const [brandData] = useState<Brand[]>(() => {
    if (typeof window === "undefined") {
      return [];
    }

    const storedBrandData = localStorage.getItem("brandData");
    return storedBrandData ? JSON.parse(storedBrandData) : [];
  });

  // dataMeasured is data[] — measurements live under dataMeasured[0].dataMeasure
  const latestMeasure = context?.dataMeasured?.[0]?.dataMeasure;
  const measurements = {
    chest: latestMeasure?.chest,
    waist: latestMeasure?.waist,
    height: latestMeasure?.height,
    shoulderWidth: latestMeasure?.shoulderWidth,
  };

  const searchParams = useSearchParams();
  const brand = searchParams.get("brand");
  const brandResult = brandData.find((b) => b.name === brand);

  return (
    <div className="bg-[#1a1510] min-h-screen font-sans">
      <NavBar />
      <main className="flex-1 w-full px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
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

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#1a1510] animate-pulse" />}>
      <BrandResultPage />
    </Suspense>
  );
}
