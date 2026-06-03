"use client";

import { useContext } from "react";
import { Calendar, Edit3, Mail, MapPin, Phone, Ruler } from "lucide-react";
import { AuthContext } from "@/provider/AuthProvider";
import { BodyMeasureEstimateContext } from "@/provider/BodyMeasureEstimate";

const Sidebar = ({
  setIsOpenProfile,
}: {
  setIsOpenProfile: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const context = useContext(AuthContext);
  const dataMeasure = useContext(BodyMeasureEstimateContext);

  if (!context || !context.isLoggedIn || !context.userData) {
    return (
      <aside className="lg:col-span-3">
        <div className="rx-card p-6">
          <div className="rx-skeleton mx-auto mb-5 h-20 w-20 rounded-full" />
          <div className="rx-skeleton mx-auto mb-3 h-4 w-3/4" />
          <div className="rx-skeleton mx-auto h-3 w-1/2" />
        </div>
      </aside>
    );
  }

  const profile = {
    id: context.userData?.id ?? "",
    name: context.userData?.username ?? "Người dùng",
    fullName: context.userData?.fullName ?? "",
    email: context.userData?.email ?? "",
    createdAt: context.userData?.createdAt ?? "",
    phone: context.userData?.phone ?? "Chưa cập nhật",
    address: context.userData?.address ?? "Chưa cập nhật",
    imageUrl: context.userData?.imageUrl ?? "",
  };

  const totalMeasurements = dataMeasure?.dataMeasured?.length ?? 0;
  const latest = dataMeasure?.dataMeasured?.[0]?.dataMeasure;
  const filledFields = latest
    ? Object.values(latest).filter((value) => value !== null && value !== undefined && value !== 0).length
    : 0;
  const completeness = latest ? Math.round((filledFields / 13) * 100) : 0;

  const rows = [
    { icon: Mail, label: "Email", value: profile.email },
    { icon: Phone, label: "Điện thoại", value: profile.phone },
    { icon: MapPin, label: "Khu vực", value: profile.address },
    {
      icon: Calendar,
      label: "Tham gia",
      value: profile.createdAt ? new Date(profile.createdAt).toLocaleDateString("vi-VN") : "—",
    },
  ];

  return (
    <aside className="flex flex-col gap-5 lg:col-span-3">
      <section className="rx-shell">
        <div className="rx-core overflow-hidden">
          <div className="p-6 text-center">
            <div className="relative mx-auto mb-5 h-20 w-20">
              <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-[1.35rem] bg-[rgba(24,23,20,0.06)] ring-1 ring-[rgba(24,23,20,0.1)]">
                {profile.imageUrl ? (
                  <img alt="Avatar" className="h-full w-full object-cover" src={profile.imageUrl} />
                ) : (
                  <span className="font-serif text-5xl text-[var(--ink)]">
                    {(profile.fullName || profile.name)?.[0]?.toUpperCase() || "U"}
                  </span>
                )}
              </div>
              <span className="absolute -bottom-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-[var(--sage)] text-[10px] font-bold text-white ring-4 ring-[var(--surface-paper)]">
                ✓
              </span>
            </div>
            <h2 className="text-base font-extrabold text-[var(--ink)]">{profile.fullName || profile.name}</h2>
            <p className="mt-1 font-mono text-[10px] uppercase text-[var(--ink-muted)]">
              #{profile.id?.slice(-6) || "------"}
            </p>
          </div>

          <div className="space-y-3 border-y border-[rgba(24,23,20,0.08)] p-5">
            {rows.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-start gap-3">
                <div className="rx-icon-btn h-8 w-8 shrink-0">
                  <Icon size={13} strokeWidth={1.35} />
                </div>
                <div className="min-w-0">
                  <p className="font-mono text-[10px] uppercase text-[var(--ink-muted)]">{label}</p>
                  <p className="truncate text-xs font-semibold text-[var(--ink-soft)]">{value || "—"}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-5">
            <button onClick={() => setIsOpenProfile(true)} className="rx-btn rx-btn-secondary w-full">
              <Edit3 size={14} strokeWidth={1.35} />
              Chỉnh sửa hồ sơ
            </button>
          </div>
        </div>
      </section>

      <section className="rx-card p-5">
        <div className="mb-4 flex items-center gap-2">
          <Ruler size={16} strokeWidth={1.35} className="text-[var(--signal-blue)]" />
          <h3 className="font-extrabold text-[var(--ink)]">Tổng quan</h3>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-[rgba(93,116,101,0.08)] p-4 text-center">
            <p className="font-mono text-2xl font-semibold text-[var(--signal-blue)]">{totalMeasurements}</p>
            <p className="mt-1 font-mono text-[10px] uppercase text-[var(--ink-muted)]">Lần đo</p>
          </div>
          <div className="rounded-2xl bg-[rgba(101,114,98,0.1)] p-4 text-center">
            <p className="font-mono text-2xl font-semibold text-[var(--sage)]">{completeness}%</p>
            <p className="mt-1 font-mono text-[10px] uppercase text-[var(--ink-muted)]">Hoàn thiện</p>
          </div>
        </div>
        {totalMeasurements > 0 && (
          <div className="mt-5">
            <div className="mb-2 flex justify-between font-mono text-[10px] uppercase text-[var(--ink-muted)]">
              <span>Hồ sơ</span>
              <span>{completeness}%</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-[rgba(24,23,20,0.08)]">
              <div
                className="h-full rounded-full bg-[var(--signal-blue)] transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]"
                style={{ width: `${completeness}%` }}
              />
            </div>
          </div>
        )}
      </section>
    </aside>
  );
};

export default Sidebar;
