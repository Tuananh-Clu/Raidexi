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
import { ArrowUp } from "lucide-react";
import { MobileMenu } from "@/Shared/Components/components/mobileMenu";

function HomePage() {
  const [scrollButtonVisible, setScrollButtonVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrollButtonVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="flex min-h-screen w-full flex-col font-sans antialiased bg-[#f8fafc]">
      <MobileMenu />
      <NavBar />

      {/* Scroll-to-top */}
      {scrollButtonVisible && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 z-50 w-11 h-11 flex items-center justify-center bg-gradient-to-r from-[#2563eb] to-[#06b6d4] text-white rounded-2xl shadow-lg shadow-[#2563eb]/25 hover:shadow-xl hover:shadow-[#2563eb]/35 hover:scale-110 transition-all duration-300"
          aria-label="Cuộn lên đầu trang"
        >
          <ArrowUp size={18} strokeWidth={2.5} />
        </button>
      )}

      <main className="flex flex-col flex-1">
        {/* 1. Hero — Raidexi là gì, dùng để làm gì */}
        <HeroSection />

        {/* 2. Problem — Tại sao bạn cần nó */}
        <ProblemStatement />

        {/* 3. How it works — 3 bước đơn giản */}
        <ProcessLogic />

        {/* 4. What you get — 13 số đo cơ thể */}
        <CalibrationSection />

        {/* 5. Brands — Áp dụng cho thương hiệu nào */}
        <BrandIntegration />

        {/* 6. Features — Tại sao tin tưởng */}
        <SystemCapabilities />

        {/* 7. Privacy + Final CTA — Bảo mật & kêu gọi hành động */}
        <Privacy />
      </main>

      <Footer />
    </div>
  );
}

export default HomePage;
