"use client";

import { ArrowUpRight, FileUp, Inbox, Plus, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import { brandApi } from "@/features/Brand/api/brandApi";
import type { Brand, BrandProfileRequest } from "@/features/Brand/types";
import { AdminPill } from "./AdminPill";

const sizeRules = [
  { rule: "Chest tolerance", value: "2.4 cm", note: "Áo basic và shirt" },
  { rule: "Waist comfort", value: "3.1 cm", note: "Denim, trouser" },
  { rule: "Oversize bias", value: "+1 size", note: "Streetwear, sport" },
  { rule: "Return risk", value: "Low", note: "Dựa trên lịch sử fit" },
];

const fallbackRequests: BrandProfileRequest[] = [
  {
    brandName: "YODY",
    refCode: "YODY",
    category: "Vietnam",
    origin: "Việt Nam",
    segment: "Basic apparel",
    productType: "top",
    sizeSystem: "VN",
    requesterNote: "Người dùng yêu cầu thêm brand nội địa.",
    status: "PENDING",
  },
];

export function BrandLogicWorkspace() {
  const [selectedBrandId, setSelectedBrandId] = useState<string>("");
  const [brands, setBrands] = useState<Brand[]>([]);
  const [requests, setRequests] = useState<BrandProfileRequest[]>([]);
  
  const selectedBrand = brands.find((item) => item.name === selectedBrandId) || brands[0];

  useEffect(() => {
    let mounted = true;

    const loadData = async () => {
      try {
        const [brandData, requestData] = await Promise.all([
          brandApi.getBrandProfile(),
          brandApi.getBrandProfileRequests()
        ]);
        
        if (mounted) {
          if (Array.isArray(brandData)) {
             setBrands(brandData);
             if (brandData.length > 0) setSelectedBrandId(brandData[0].name);
          }
          if (Array.isArray(requestData)) {
             setRequests(requestData);
          }
        }
      } catch {
        if (mounted) {
          setRequests(fallbackRequests);
        }
      }
    };

    loadData();

    return () => {
      mounted = false;
    };
  }, []);

  const visibleRequests = requests.length > 0 ? requests : fallbackRequests;

  return (
    <section className="grid gap-5 xl:grid-cols-[1fr_22rem]">
      <div className="raidexi-shell rounded-[2rem] p-1.5">
        <div className="raidexi-core overflow-hidden rounded-[calc(2rem-0.375rem)]">
          <header className="flex flex-col justify-between gap-5 border-b border-[rgba(24,23,20,0.1)] p-6 md:flex-row md:items-start">
            <div>
              <AdminPill>Brand logic studio</AdminPill>
              <h2 className="mt-4 font-serif text-4xl font-light leading-none text-[var(--ink)]">
                Chuẩn hóa hồ sơ fit theo thương hiệu
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--ink-soft)]">
                Quản lý brand profile, rule chuyển đổi và request từ người dùng trước khi đưa thương hiệu vào hệ gợi ý.
              </p>
            </div>
            <button className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[var(--ink)] px-5 text-sm font-bold text-[var(--surface-paper)]" type="button">
              <Plus size={16} strokeWidth={1.15} />
              Thêm thương hiệu
            </button>
          </header>

          <div className="grid gap-0 lg:grid-cols-[16rem_1fr]">
            <div className="border-b border-[rgba(24,23,20,0.08)] p-4 lg:border-b-0 lg:border-r">
              <div className="space-y-2">
                {brands.map((item) => (
                  <button
                    key={item.name}
                    className={`w-full rounded-[1.2rem] px-4 py-3 text-left transition-all ${
                      selectedBrandId === item.name
                        ? "bg-[var(--ink)] text-[var(--surface-paper)]"
                        : "text-[var(--ink-soft)] hover:bg-[rgba(24,23,20,0.055)] hover:text-[var(--ink)]"
                    }`}
                    onClick={() => setSelectedBrandId(item.name)}
                    type="button"
                  >
                    <span className="block text-sm font-extrabold">{item.name}</span>
                    <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.12em] opacity-65">{item.category}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="p-6">
              <div className="grid gap-4 md:grid-cols-3">
                <article className="rounded-[1.4rem] bg-[rgba(93,116,101,0.1)] p-4">
                  <p className="text-xs font-bold text-[var(--ink-muted)]">Mức phủ</p>
                  <p className="mt-3 font-serif text-5xl font-light text-[var(--signal-blue)]">{selectedBrand?.coverage || "0%"}</p>
                </article>
                <article className="rounded-[1.4rem] bg-[rgba(154,116,71,0.11)] p-4">
                  <p className="text-xs font-bold text-[var(--ink-muted)]">Lượt gợi ý</p>
                  <p className="mt-3 font-serif text-5xl font-light text-[var(--brass)]">{selectedBrand?.requests || "0"}</p>
                </article>
                <article className="rounded-[1.4rem] bg-[rgba(24,23,20,0.055)] p-4">
                  <p className="text-xs font-bold text-[var(--ink-muted)]">Trạng thái</p>
                  <p className="mt-4 text-sm font-extrabold text-[var(--ink)]">{selectedBrand?.status || "UNKNOWN"}</p>
                </article>
              </div>

              <div className="mt-6 rounded-[1.5rem] border border-dashed border-[rgba(24,23,20,0.18)] bg-[rgba(255,253,247,0.48)] p-6">
                <FileUp size={24} strokeWidth={1.15} className="text-[var(--signal-blue)]" />
                <h3 className="mt-4 text-sm font-extrabold text-[var(--ink)]">Upload bảng size khi có dữ liệu thật</h3>
                <p className="mt-2 max-w-lg text-xs leading-5 text-[var(--ink-muted)]">
                  Hiện tại hệ thống dùng universal size + brand bias. Khi có CSV/XLSX thật, admin có thể chuyển brand sang bảng size riêng.
                </p>
                <button className="mt-5 rounded-full bg-[rgba(24,23,20,0.075)] px-4 py-2 text-xs font-bold text-[var(--ink)]" type="button">
                  Chọn file
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <aside className="space-y-5">
        <section className="raidexi-shell rounded-[2rem] p-1.5">
          <div className="raidexi-core rounded-[calc(2rem-0.375rem)] p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <AdminPill>Yêu cầu brand mới</AdminPill>
                <h3 className="mt-4 font-serif text-3xl font-light leading-none text-[var(--ink)]">Inbox admin</h3>
              </div>
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[rgba(93,116,101,0.12)] text-[var(--signal-blue)]">
                <Inbox size={17} strokeWidth={1.15} />
              </span>
            </div>
            <div className="mt-5 space-y-3">
              {visibleRequests.map((request) => (
                <article key={`${request.brandName}-${request.refCode}`} className="rounded-[1.2rem] border border-[rgba(24,23,20,0.08)] bg-[rgba(255,253,247,0.52)] p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-extrabold text-[var(--ink)]">{request.brandName}</p>
                    <span className="rounded-full bg-[rgba(93,116,101,0.11)] px-2.5 py-1 text-[10px] font-bold text-[var(--signal-blue)]">
                      {request.status || "PENDING"}
                    </span>
                  </div>
                  <p className="mt-2 text-xs leading-5 text-[var(--ink-muted)]">
                    {request.productType || "mixed"} · hệ {request.sizeSystem || "VN"} · {request.category || "Vietnam"}
                  </p>
                  {request.requesterNote && (
                    <p className="mt-2 line-clamp-2 text-xs leading-5 text-[var(--ink-soft)]">{request.requesterNote}</p>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="raidexi-shell rounded-[2rem] p-1.5">
          <div className="raidexi-core rounded-[calc(2rem-0.375rem)] p-5">
            <AdminPill>Rule engine</AdminPill>
            <div className="mt-5 space-y-3">
              {sizeRules.map((rule) => (
                <div key={rule.rule} className="rounded-[1.2rem] border border-[rgba(24,23,20,0.08)] bg-[rgba(255,253,247,0.52)] p-4">
                  <p className="text-xs font-bold text-[var(--ink-muted)]">{rule.rule}</p>
                  <p className="mt-2 font-serif text-3xl font-light text-[var(--ink)]">{rule.value}</p>
                  <p className="mt-1 text-xs text-[var(--ink-muted)]">{rule.note}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid grid-cols-2 gap-2">
          <button className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[var(--signal-blue)] px-4 text-xs font-bold text-white" type="button">
            <RefreshCw size={14} strokeWidth={1.15} />
            Đồng bộ
          </button>
          <button className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[var(--ink)] px-4 text-xs font-bold text-[var(--surface-paper)]" type="button">
            Xuất rule
            <ArrowUpRight size={14} strokeWidth={1.15} />
          </button>
        </section>
      </aside>
    </section>
  );
}
