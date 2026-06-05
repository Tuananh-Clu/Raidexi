import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { brandApi } from "@/features/Brand/api/brandApi";
import type { Brand } from "@/features/Brand/types";
import { AdminPill } from "./AdminPill";

export function BrandTable() {
  const [brands, setBrands] = useState<Brand[]>([]);

  useEffect(() => {
    let mounted = true;
    brandApi.getBrandProfile().then((data) => {
      if (mounted && Array.isArray(data)) {
        setBrands(data);
      }
    }).catch(console.error);

    return () => { mounted = false; };
  }, []);

  return (
    <section className="raidexi-shell rounded-[2rem] p-1.5 lg:col-span-2">
      <div className="raidexi-core overflow-hidden rounded-[calc(2rem-0.375rem)]">
        <header className="flex flex-col justify-between gap-4 border-b border-[rgba(24,23,20,0.1)] p-6 md:flex-row md:items-center">
          <div>
            <AdminPill>Thương hiệu</AdminPill>
            <h2 className="mt-4 font-serif text-4xl font-light leading-none text-[var(--ink)]">Size logic coverage</h2>
          </div>
          <button
            className="group inline-flex items-center gap-2 rounded-full bg-[var(--ink)] py-1.5 pl-4 pr-1.5 text-xs font-bold text-[var(--surface-paper)] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98]"
            type="button"
          >
            Thêm thương hiệu
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--signal-blue)] transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1 group-hover:-translate-y-[1px]">
              <ArrowUpRight size={14} strokeWidth={1.15} />
            </span>
          </button>
        </header>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-left">
            <thead>
              <tr className="border-b border-[rgba(24,23,20,0.08)] bg-[rgba(24,23,20,0.045)]">
                {["Thương hiệu", "Nhóm hàng", "Phủ dữ liệu", "Lượt gợi ý", "Trạng thái"].map((col) => (
                  <th
                    key={col}
                    className="px-6 py-4 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--ink-muted)]"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {brands.map((row) => (
                <tr key={row.name} className="border-b border-[rgba(24,23,20,0.08)] last:border-b-0">
                  <td className="px-6 py-4 text-sm font-extrabold text-[var(--ink)]">{row.name}</td>
                  <td className="px-6 py-4 text-sm text-[var(--ink-soft)]">{row.category}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-1.5 w-24 overflow-hidden rounded-full bg-[rgba(24,23,20,0.08)]">
                        <div className="h-full rounded-full bg-[var(--signal-blue)]" style={{ width: row.coverage || '0%' }} />
                      </div>
                      <span className="font-mono text-xs font-semibold text-[var(--ink)]">{row.coverage || '0%'}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-mono text-sm font-semibold text-[var(--ink)]">{row.requests || '0'}</td>
                  <td className="px-6 py-4">
                    <span className="rounded-full border border-[rgba(24,23,20,0.1)] bg-[rgba(255,253,247,0.62)] px-3 py-1 text-xs font-bold text-[var(--ink-soft)]">
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
