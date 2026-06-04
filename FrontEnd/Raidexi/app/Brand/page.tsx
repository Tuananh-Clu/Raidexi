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
import { BrandProfileRequestForm } from "@/features/Brand/components/BrandProfileRequestForm";

export default function Page() {
  const [activeFilter, setActiveFilter] = useState<FilterType>(FilterType.ALL);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [brandRequestOpen, setBrandRequestOpen] = useState(false);
  const [brandRequestName, setBrandRequestName] = useState("Yêu cầu thương hiệu mới");
  const authContext = useContext(AuthContext);
  const brandContext = useContext(BrandContext);
  const isLoggedIn = authContext?.isLoggedIn;
  const itemsPerPage = 8;
  const brandData = brandContext.dataBrand;
  const allBrands = useMemo(() => brandData ?? [], [brandData]);

  const filteredBrands = useMemo(() => {
    return allBrands.filter((brand) => {
      const matchesSearch =
        brand.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        brand.refCode.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;
      if (activeFilter === FilterType.ALL) return true;
      if (activeFilter === FilterType.International) return brand.category === "International";
      if (activeFilter === FilterType.VietNam) return brand.category === "Vietnam";
      return true;
    });
  }, [activeFilter, allBrands, searchQuery]);

  const totalItems = filteredBrands.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const currentBrands = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredBrands.slice(start, start + itemsPerPage);
  }, [currentPage, filteredBrands]);

  const counts = useMemo(() => ({
    all: allBrands.length,
    international: allBrands.filter((brand) => brand.category === "International").length,
    VietNam: allBrands.filter((brand) => brand.category === "Vietnam").length,
  }), [allBrands]);

  const handleFilterChange = (newFilter: FilterType) => {
    setActiveFilter(newFilter);
    setCurrentPage(1);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleOpenCustomizer = () => {
    const requestedBrand = searchQuery.trim() || "Yêu cầu thương hiệu mới";
    setBrandRequestName(requestedBrand);
    setBrandRequestOpen(true);
  };

  return (
    <div className="rx-page min-h-screen">
      {brandContext.popUpSettings.isopened && (
        <div className="rx-modal-backdrop fixed z-50 flex items-center justify-center p-4">
          <div className="pointer-events-auto">
            <SizeCustomizer type="brand" />
          </div>
        </div>
      )}
      {brandRequestOpen && (
        <div className="rx-modal-backdrop fixed z-50 grid place-items-center overflow-y-auto p-4">
          <div className="pointer-events-auto w-full max-w-3xl">
            <BrandProfileRequestForm initialBrandName={brandRequestName} onClose={() => setBrandRequestOpen(false)} />
          </div>
        </div>
      )}

      <NavBar />
      {isLoggedIn ? (
        <main className="rx-container flex flex-col gap-8 px-4 pb-16 pt-32 sm:px-6 lg:px-8">
          <section className="rx-shell">
            <div className="rx-core flex flex-col items-start justify-between gap-6 p-6 md:flex-row md:items-end md:p-8">
              <div className="max-w-2xl">
                <span className="rx-badge rx-badge-blue">Ước lượng theo thương hiệu</span>
                <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-[var(--ink)] md:text-5xl">
                  Chọn thương hiệu, nhận size theo cơ thể của bạn.
                </h1>
                <p className="rx-copy mt-4">
                  Quản lý hồ sơ định cỡ cá nhân trên mạng lưới thương hiệu đã hiệu chuẩn.
                </p>
              </div>
              <span className="rx-badge">Hệ thống sẵn sàng · v2.0.4</span>
            </div>
          </section>

          <FilterBar
            activeFilter={activeFilter}
            onFilterChange={handleFilterChange}
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            onOpenCustomizer={handleOpenCustomizer}
            counts={counts}
          />

          <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {currentBrands.map((brand) => <BrandCard key={brand.id} brand={brand} />)}
            {filteredBrands.length === 0 && (
              <div className="rx-card col-span-full py-16 text-center text-sm font-semibold text-[var(--ink-muted)]">
                Không tìm thấy thương hiệu phù hợp.
              </div>
            )}
          </section>

          <Pagination currentPage={currentPage} totalPages={totalPages} totalItems={totalItems} itemsPerPage={itemsPerPage} onPageChange={setCurrentPage} />
        </main>
      ) : (
        <main className="flex w-full grow flex-col items-center">
          <Hero />
          <PartnerGrid />
          <QuoteSection />
        </main>
      )}
      <Footer />
    </div>
  );
}
