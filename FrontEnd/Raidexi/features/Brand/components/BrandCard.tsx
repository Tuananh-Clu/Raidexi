"use client";

import React, { useContext } from "react";
import { AlertTriangle, ArrowRight, CheckCircle2, Clock3, Settings2 } from "lucide-react";
import { Brand, BrandStatus } from "../types";
import { BrandContext } from "@/provider/BrandProvider";

interface BrandCardProps {
  brand: Brand;
}

const statusConfig = {
  [BrandStatus.OPTIMIZED]: {
    icon: CheckCircle2,
    label: "Đã tối ưu",
    badge: "rx-badge rx-badge-blue",
    tone: "text-[var(--signal-blue)]",
    action: "Xem hồ sơ",
  },
  [BrandStatus.RECALIBRATE]: {
    icon: AlertTriangle,
    label: "Cần cân chỉnh",
    badge: "rx-badge rx-badge-red",
    tone: "text-[var(--tailor-red)]",
    action: "Cân chỉnh",
  },
  [BrandStatus.PENDING]: {
    icon: Clock3,
    label: "Đang chờ",
    badge: "rx-badge",
    tone: "text-[var(--ink-muted)]",
    action: "Tiếp tục",
  },
};

const BrandCard: React.FC<BrandCardProps> = ({ brand }) => {
  const { name, refCode, status, lastSync, metricLabel, metricValue, icon } = brand;
  const { setPopUpSettings } = useContext(BrandContext);
  const config = statusConfig[status];
  const StatusIcon = config.icon;

  const handleClick = () => {
    setPopUpSettings({ isopened: true, brandrefcode: refCode, gender: "", productType: "", sizeSystem: "" });
  };
  const iconSrc = typeof icon === "string" && (icon.startsWith("/") || icon.startsWith("http")) ? icon : "/logo.png";

  return (
    <article className="rx-card group flex min-h-[270px] flex-col gap-5 p-5 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 hover:border-[rgba(93,116,101,0.28)]">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[1.15rem] bg-[rgba(24,23,20,0.06)] ring-1 ring-[rgba(24,23,20,0.1)]">
            <img src={iconSrc} alt={`${name} biểu tượng`} className="h-8 w-8 object-contain" />
          </div>
          <div className="min-w-0">
            <h3 className="truncate text-lg font-extrabold text-[var(--ink)]">{name}</h3>
            <p className="mt-1 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--ink-muted)]">{refCode}</p>
          </div>
        </div>
        <span className={config.badge} title={config.label}>
          <StatusIcon size={13} strokeWidth={1.35} className={config.tone} />
          {config.label}
        </span>
      </div>

      <div className="grid gap-px overflow-hidden rounded-[1.15rem] bg-[rgba(24,23,20,0.08)]">
        {[
          ["Trạng thái", config.label],
          ["Đồng bộ", lastSync === "--" ? "Chưa có" : lastSync],
          [metricLabel, metricValue],
        ].map(([label, value]) => (
          <div key={label} className="grid grid-cols-[1fr_auto] gap-3 bg-[rgba(255,253,247,0.82)] px-4 py-3 font-mono text-[11px]">
            <span className="uppercase tracking-[0.14em] text-[var(--ink-muted)]">{label}</span>
            <span className="font-bold text-[var(--ink)]">{value}</span>
          </div>
        ))}
      </div>

      <button onClick={handleClick} className="rx-btn rx-btn-secondary mt-auto w-full" type="button">
        <Settings2 size={14} strokeWidth={1.35} />
        {status === BrandStatus.PENDING && metricValue === "0/12" ? "Bắt đầu" : config.action}
        <ArrowRight size={14} strokeWidth={1.35} />
      </button>
    </article>
  );
};

export default BrandCard;
