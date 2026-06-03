import React from "react";
import { Edit2, History, MapPin, Ruler, Shirt } from "lucide-react";
import { UserMeasurements } from "../types";

interface BrandSidebarProps {
  measurements: UserMeasurements;
  brandData: any;
}

const measurementRows = [
  { key: "chest", label: "Ngực" },
  { key: "waist", label: "Eo" },
  { key: "shoulderWidth", label: "Vai" },
  { key: "height", label: "Chiều cao" },
] as const;

export const BrandSidebar: React.FC<BrandSidebarProps> = ({ measurements, brandData }) => {
  const iconSrc =
    typeof brandData?.icon === "string" && (brandData.icon.startsWith("/") || brandData.icon.startsWith("http"))
      ? brandData.icon
      : "/logo.png";

  return (
    <aside className="space-y-5">
      <div className="rx-shell">
        <div className="rx-core overflow-hidden">
          <div className="flex h-44 items-center justify-center bg-[rgba(165,109,43,0.12)] p-6">
            <div className="flex h-24 w-24 items-center justify-center rounded-[1.6rem] bg-[var(--surface-paper)] ring-1 ring-[rgba(24,23,20,0.12)]">
              <img className="h-16 w-16 object-contain" src={iconSrc} alt={`${brandData?.name || "Thương hiệu"} logo`} />
            </div>
          </div>
          <div className="p-6">
            <span className="rx-badge rx-badge-blue">Hồ sơ thương hiệu</span>
            <h2 className="mt-3 text-3xl font-extrabold text-[var(--ink)]">{brandData?.name}</h2>
            <div className="mt-5 space-y-3 text-sm text-[var(--ink-soft)]">
              {[
                { icon: MapPin, value: brandData?.origin || "-" },
                { icon: Shirt, value: brandData?.segment || "-" },
                { icon: History, value: brandData?.dataSeason || "-" },
              ].map(({ icon: Icon, value }) => (
                <div key={value} className="flex items-center gap-3">
                  <Icon size={16} strokeWidth={1.35} className="text-[var(--signal-blue)]" />
                  <span>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="rx-shell">
        <div className="rx-core p-6">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <span className="rx-badge">Dữ liệu cơ thể</span>
              <h3 className="mt-3 text-xl font-extrabold text-[var(--ink)]">Số đo của bạn</h3>
            </div>
            <Ruler size={18} strokeWidth={1.35} className="text-[var(--brass)]" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            {measurementRows.map((row) => (
              <div key={row.key} className="rounded-[1.2rem] bg-[rgba(24,23,20,0.04)] p-4 ring-1 ring-[rgba(24,23,20,0.08)]">
                <p className="rx-label">{row.label}</p>
                <p className="mt-2 font-mono text-2xl font-semibold text-[var(--ink)]">
                  {measurements[row.key] ?? "-"} <span className="text-xs text-[var(--ink-muted)]">cm</span>
                </p>
              </div>
            ))}
          </div>

          <button className="rx-btn rx-btn-secondary mt-5 w-full" type="button">
            <Edit2 size={14} strokeWidth={1.35} />
            Cập nhật số đo
          </button>
        </div>
      </div>
    </aside>
  );
};
