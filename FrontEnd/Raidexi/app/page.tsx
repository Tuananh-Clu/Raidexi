"use client";

import { NavBar } from "@/Shared/Components/components/NavBar";
import { Footer } from "@/Shared/Components/components/Footer";
import { HomeExperience } from "@/features/Home/components/HomeExperience";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[var(--surface-canvas)] text-[var(--ink)]">
      <NavBar />
      <HomeExperience />
      <Footer />
    </div>
  );
}
