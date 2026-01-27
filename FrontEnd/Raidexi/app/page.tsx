"use client";
import { NavBar } from "@/Shared/Components/components/NavBar";
import { ProblemStatement } from "@/features/Home/components/ProblemStatement";
import { CalibrationSection } from "@/features/Home/components/CalibrationSection";
import { BrandIntegration } from "@/features/Home/components/BrandIntegration";
import { SystemCapabilities } from "@/features/Home/components/SystemCapabilities";
import { ProcessLogic } from "@/features/Home/components/ProcessLogic";
import { Privacy } from "@/features/Home/components/Privacy";
import { Footer } from "@/Shared/Components/components/Footer";
import { HeroSection } from "@/features/Home/components/HeroSection";
import { useEffect, useState } from "react";
import { ArrowBigUpDashIcon } from "lucide-react";
import { MobileMenu } from "@/Shared/Components/components/mobileMenu";




function page() {
  const [scrollButtonVisible, setScrollButtonVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      setScrollButtonVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
     return <div className="flex min-h-screen w-full flex-col font-display antialiased selection:bg-[#e9be49] selection:text-[#1a1510]">
      <MobileMenu />
      <NavBar />
      {
        scrollButtonVisible && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 p-3 bg-[#e9be49] text-[#1a1510] rounded-full shadow-lg hover:bg-[#d4a737] transition"
            aria-label="Scroll to top"
          >
            <ArrowBigUpDashIcon size={24} />
          </button>
        )
      }
      <main className="flex flex-col flex-1">
        <HeroSection />
        <ProblemStatement />
        <CalibrationSection />
        <BrandIntegration />
        <SystemCapabilities />
        <ProcessLogic />
        <Privacy />
      </main>
      <Footer />
    </div>
};

export default page;
