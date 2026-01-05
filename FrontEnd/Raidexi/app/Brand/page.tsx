"use client";
import Hero from "@/features/Brand/components/Hero";
import { Footer } from "@/Shared/Components/components/Footer";
import { NavBar } from "@/Shared/Components/components/NavBar";
import PartnerGrid from "@/features/Brand/components/PartnerGrid";
import QuoteSection from "@/features/Brand/components/QuoteSection";
import { useContext, useMemo, useState } from "react";
import { BrandStatus, FilterType } from "@/features/Brand/types";
import { BRANDS } from "@/features/Brand/contstants";
import FilterBar from "@/features/Brand/components/FilterBar";
import BrandCard from "@/features/Brand/components/BrandCard";
import Pagination from "@/features/Brand/components/Pagination";
import { useAuthentication } from "@/features/Auth/Hook/Authentication";
import { AuthContext } from "@/provider/AuthProvider";
export default function Page() {
  const [activeFilter, setActiveFilter] = useState<FilterType>(FilterType.ALL);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const context=useContext(AuthContext);
  const isLoggedIn=context?.isLoggedIn;
  const itemsPerPage = 8;

  const filteredBrands = useMemo(() => {
    return BRANDS.filter((brand) => {
      const matchesSearch =
        brand.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        brand.refCode.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      if (activeFilter === FilterType.ALL) return true;
      if (activeFilter === FilterType.OPTIMIZED)
        return brand.status === BrandStatus.OPTIMIZED;
      if (activeFilter === FilterType.PENDING)
        return brand.status === BrandStatus.PENDING;
      if (activeFilter === FilterType.RECALIBRATE)
        return brand.status === BrandStatus.RECALIBRATE;

      return true;
    });
  }, [searchQuery, activeFilter]);

  const totalItems = filteredBrands.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const currentBrands = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredBrands.slice(start, start + itemsPerPage);
  }, [filteredBrands, currentPage]);

  const counts = useMemo(() => {
    return {
      all: BRANDS.length,
      optimized: BRANDS.filter((b) => b.status === BrandStatus.OPTIMIZED)
        .length,
      pending: BRANDS.filter((b) => b.status === BrandStatus.PENDING).length,
      recalibrate: BRANDS.filter((b) => b.status === BrandStatus.RECALIBRATE)
        .length,
    };
  }, []);

  const handleFilterChange = (newFilter: FilterType) => {
    setActiveFilter(newFilter);
    setCurrentPage(1);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };
    return (
      <div>
        <NavBar />
        {isLoggedIn ? (
          <main className="flex flex-col w-full gap-10 px-6 py-10 mx-auto grow max-w-350">
            <section className="flex flex-col items-start justify-between gap-6 pb-6 border-b md:flex-row md:items-end border-border-sepia">
              <div className="max-w-2xl">
                <h2 className="mb-2 text-4xl font-medium tracking-tight text-white md:text-5xl font-display">
                  Brand Directory & Calibration
                </h2>
                <p className="text-lg font-light text-text-muted font-display">
                  Manage your personal sizing profiles across partner
                  infrastructure.
                  <span className="block mt-1 font-mono text-xs tracking-wider uppercase text-primary">
                    System Status: Online // V.2.0.4
                  </span>
                </p>
              </div>
              <div className="flex gap-3">
                <button className="bg-[#2a2620] hover:bg-[#343029] text-text-paper border border-border-sepia h-10 px-4 flex items-center gap-2 text-sm font-mono transition-all">
                  <span className="material-symbols-outlined !text-[18px]">
                    history
                  </span>
                  HISTORY
                </button>
                <button className="flex items-center h-10 gap-2 px-6 font-mono text-sm font-bold tracking-wide uppercase transition-all bg-primary hover:bg-primary-dark text-background-dark">
                  <span className="material-symbols-outlined !text-[18px]">
                    add
                  </span>
                  New Profile
                </button>
              </div>
            </section>

            <FilterBar
              activeFilter={activeFilter}
              onFilterChange={handleFilterChange}
              searchQuery={searchQuery}
              onSearchChange={handleSearchChange}
              counts={counts}
            />

            <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {currentBrands.map((brand) => (
                <BrandCard key={brand.id} brand={brand} />
              ))}
              {currentBrands.length === 0 && (
                <div className="py-12 font-mono text-center border border-dashed col-span-full border-border-sepia text-text-muted">
                  NO BRANDS FOUND MATCHING CRITERIA
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
  };
