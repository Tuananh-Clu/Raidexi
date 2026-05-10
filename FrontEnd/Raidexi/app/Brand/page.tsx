"use client";
import Hero from "@/features/Brand/components/Hero";
import { Footer } from "@/Shared/Components/components/Footer";
import { NavBar } from "@/Shared/Components/components/NavBar";
import PartnerGrid from "@/features/Brand/components/PartnerGrid";
import QuoteSection from "@/features/Brand/components/QuoteSection";
import { useContext, useMemo, useState } from "react";
import { FilterType } from "@/features/Brand/types";
import FilterBar from "@/features/Brand/components/FilterBar";
import BrandCard from "@/features/Brand/components/BrandCard";
import Pagination from "@/features/Brand/components/Pagination";

import { AuthContext } from "@/provider/AuthProvider";
import { BrandContext } from "@/provider/BrandProvider";
import { SizeCustomizer } from "@/features/Brand/components/SizeCustomizer";

export default function Page() {
  const [activeFilter, setActiveFilter] = useState<FilterType>(FilterType.ALL);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const context = useContext(AuthContext);
  const BrandContexts = useContext(BrandContext);
  const isLoggedIn = context?.isLoggedIn;
  const itemsPerPage = 8;
  const allBrands = useMemo(() => BrandContexts?.dataBrand ?? [], [BrandContexts?.dataBrand]);

  const filteredBrands = useMemo(() => {
    return allBrands.filter((brand) => {
      const matchesSearch =
        brand.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        brand.refCode.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      if (activeFilter === FilterType.ALL) return true;
      if (activeFilter === FilterType.International)
        return brand.category === "International";
      if (activeFilter === FilterType.VietNam)
        return brand.category === "Vietnam";

      return true;
    });
  }, [allBrands, searchQuery, activeFilter]);

  const totalItems = filteredBrands.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const currentBrands = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredBrands.slice(start, start + itemsPerPage);
  }, [filteredBrands, currentPage]);

  const counts = useMemo(() => {
    return {
      all: allBrands.length,
      international: allBrands.filter((b) => b.category === "International").length,
      VietNam: allBrands.filter((b) => b.category === "Vietnam").length,
    };
  }, [allBrands]);

  const handleFilterChange = (newFilter: FilterType) => {
    setActiveFilter(newFilter);
    setCurrentPage(1);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };
  return (
    <div className="bg-[#1a1510] min-h-screen font-sans">
      {BrandContexts.popUpSettings.isopened == true && (
        <div className="fixed flex items-center justify-center w-full h-full pointer-events-none inset-1 z-[400] backdrop-blur-sm bg-black/40">
          <div className="pointer-events-auto">
            <SizeCustomizer type="brand" />
          </div>
        </div>
      )}
      <NavBar />
      {isLoggedIn ? (
        <main className="flex flex-col w-full gap-8 px-4 sm:px-6 lg:px-8 py-8 mx-auto grow max-w-7xl">
          <section className="flex flex-col items-start justify-between gap-6 pb-6 border-b md:flex-row md:items-end border-border-subtle">
            <div className="max-w-2xl">
              <h2 className="mb-2 text-3xl font-bold tracking-tight text-white md:text-4xl">
                Brand Estimate
              </h2>
              <p className="text-base text-text-muted leading-relaxed">
                Manage your personal sizing profiles across partner
                infrastructure.
                <span className="block mt-2 font-mono text-xs font-semibold tracking-wider uppercase text-primary">
                  System Status: Online // V.2.0.4
                </span>
              </p>
            </div>
          </section>

          <FilterBar
            activeFilter={activeFilter}
            onFilterChange={handleFilterChange}
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            counts={counts}
          />

          <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {currentBrands.map((brand) => (
              <BrandCard key={brand.id} brand={brand} />
            ))}
            {filteredBrands.length === 0 && (
              <div className="py-16 text-sm font-semibold text-center bg-surface-dark border border-dashed rounded-2xl col-span-full border-border-subtle text-text-muted">
                Không tìm thấy thương hiệu phù hợp.
              </div>
            )}
          </section>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
          />
        </main>
      ) : (
        <main className="flex flex-col items-center w-full grow">
          <Hero />
          <PartnerGrid />
          <QuoteSection />
        </main>
      )}
      <Footer />
    </div>
  );
}
