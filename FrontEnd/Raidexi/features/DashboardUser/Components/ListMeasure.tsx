import { AnimatePresence, motion } from "framer-motion";
import { X, Shield, Clock, Eye, Printer, ChevronRight } from "lucide-react";
import { data, ProfileTag } from "@/features/Camera/types";
import { useContext, useEffect, useState } from "react";
import { BodyMeasureEstimateContext } from "@/provider/BodyMeasureEstimate";
import { AnalysisMeasure } from "./AnalysisMeasure";
import { useProfileTagApi } from "@/features/Camera/hooks/useProfileTagApi";

export const ListMeasure = ({
  isOpen,
  onClose,
  dataMeasured,
}: {
  isOpen: boolean;
  onClose: () => void;
  dataMeasured: data[];
}) => {
  const COLS = [
    "Thời gian",
    "Vai", "Ngực", "Eo", "Hông", "Cao",
  ];
  const FAMILY_COLS = ["Nguoi than", "Vai", "Nguc", "Eo", "Hong", "Cao"];
  const context=useContext(BodyMeasureEstimateContext);
  const { getCustomProfiles } = useProfileTagApi();
  const [activeTab, setActiveTab] = useState<"self" | "family">("self");
  const [familyProfiles, setFamilyProfiles] = useState<ProfileTag[]>([]);
  const [isFamilyLoading, setIsFamilyLoading] = useState(false);

  useEffect(() => {
    if (!isOpen || activeTab !== "family") return;

    let isMounted = true;

    const loadFamilyProfiles = async () => {
      setIsFamilyLoading(true);
      try {
        const profiles = await getCustomProfiles();
        if (isMounted) {
          setFamilyProfiles(profiles);
        }
      } finally {
        if (isMounted) {
          setIsFamilyLoading(false);
        }
      }
    };

    loadFamilyProfiles();

    return () => {
      isMounted = false;
    };
  }, [activeTab, getCustomProfiles, isOpen]);

  const activeRecordCount =
    activeTab === "family" ? familyProfiles.length : dataMeasured.length;

  const handleUseFamilyMeasure = (profile: ProfileTag) => {
    if (!profile.dataMeasure) return;

    context.setDataMeasured?.([
      {
        dataMeasure: profile.dataMeasure,
        lastUpdate: new Date().toISOString(),
      },
    ]);
  };
  

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
          />

          {/* Panel wrapper */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 28, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
              className="relative pointer-events-auto w-full max-w-5xl flex flex-col bg-white border border-border-subtle shadow-2xl rounded-2xl overflow-hidden font-sans"
            >
              {/* Close button */}
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="absolute top-4 right-4 z-[60] w-8 h-8 rounded-full flex items-center justify-center bg-[#e2e8f0] text-[#94a3b8] hover:bg-[#f1f5f9] hover:text-[#0f172a] transition-colors focus-visible:ring-2 focus-visible:ring-primary outline-none"
              >
                <X size={18} strokeWidth={2.5} />
              </motion.button>

              {/* ── Header ── */}
              <header className="px-7 pt-6 pb-5 border-b border-border-subtle flex-shrink-0 bg-[#f1f5f9]">
                <div className="flex items-start justify-between">
                  {/* Left: title */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Shield size={14} className="text-primary" strokeWidth={2} />
                      <span className="font-mono text-[10px] tracking-[0.2em] font-semibold text-[#94a3b8] uppercase">
                        Hồ sơ đo lường cá nhân
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    </div>
                    <h1
                      className="font-bold text-[#0f172a] text-2xl tracking-tight"
                    >
                      Lịch sử đo lường{" "}
                      <span className="text-primary font-light">Archive</span>
                    </h1>
                  </div>

                  {/* Right: stats */}
                  <div className="hidden sm:flex items-center gap-8 mr-12">
                    {[
                      { label: "Bản ghi", value: activeRecordCount },
                      { label: "Độ chính xác", value: "100%" },
                    ].map(({ label, value }) => (
                      <div key={label} className="text-right">
                        <div className="text-xl font-bold text-primary leading-none">
                          {value}
                        </div>
                        <div className="text-[10px] font-semibold text-[#94a3b8] tracking-wider mt-1.5 uppercase">
                          {label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 mt-6">
                  {[
                    { key: "self", label: "Bản thân" },
                    { key: "family", label: "Người thân" },
                  ].map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTab(tab.key as "self" | "family")}
                      className={`px-5 py-2 text-xs font-bold tracking-wide uppercase rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-primary outline-none ${
                        activeTab === tab.key
                          ? "bg-primary text-background-dark shadow-sm"
                          : "bg-white border border-border-subtle text-text-muted hover:border-primary/30 hover:text-primary"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </header>

              {/* ── Table ── */}
              <div className={`overflow-x-auto overflow-y-auto max-h-80 flex-1 scrollbar-thin scrollbar-thumb-border-subtle scrollbar-track-transparent ${activeTab === "self" ? "" : "hidden"}`}>
                <table className="w-full border-collapse table-fixed text-sm">
                  <colgroup>
                    <col className="w-[23%]" />
                    <col className="w-[11%]" />
                    <col className="w-[11%]" />
                    <col className="w-[11%]" />
                    <col className="w-[11%]" />
                    <col className="w-[13%]" />
                    <col className="w-[20%]" />
                  </colgroup>

                  <thead>
                    <tr className="bg-[#f1f5f9]">
                      {COLS.map((col, i) => (
                        <th
                          key={col + i}
                          className={`px-5 py-3 text-[11px] font-semibold tracking-wider text-[#94a3b8] uppercase border-b border-border-subtle whitespace-nowrap ${
                            i === COLS.length - 1 ? "text-right" : "text-left"
                          }`}
                        >
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {dataMeasured.map((record, idx) => (
                      <motion.tr
                        key={record.lastUpdate}
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05, duration: 0.28, ease: "easeOut" }}
                        className="border-b border-border-subtle hover:bg-[#f1f5f9] transition-colors"
                      >
                        {/* Timestamp */}
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2.5">
                            <Clock size={14} className="text-[#94a3b8]" strokeWidth={2} />
                            <span className="font-mono text-xs font-medium text-text-muted">
                              {record.lastUpdate}
                            </span>
                          </div>
                        </td>

                        {record.dataMeasure ? (
                          <>
                            {([
                              record.dataMeasure.shoulderWidth,
                              record.dataMeasure.chest,
                              record.dataMeasure.waist,
                              record.dataMeasure.hip,
                              record.dataMeasure.height,
                            ] as (number | undefined)[]).map((val, vi) => (
                              <td key={vi} className="px-5 py-4">
                                <span className="font-mono text-[13px] font-semibold text-[#0f172a]">
                                  {val ?? "—"}
                                </span>
                              </td>
                            ))}
                          </>
                        ) : (
                          <td colSpan={5} className="px-5 py-4">
                            <span className="text-xs font-medium text-[#94a3b8] italic">
                              Chưa có dữ liệu
                            </span>
                          </td>
                        )}

                        {/* Actions */}
                        <td className="px-5 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            {[
                              { label: "Xem", icon: <Eye size={12} /> },
                            ].map(({ label, icon }) => (
                              <button
                                onClick={() => context.setDataMeasured?.([record])}
                                key={label}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold uppercase rounded-md border border-border-subtle text-text-muted hover:border-primary/40 hover:bg-primary/5 hover:text-primary transition-all duration-150 focus-visible:ring-2 focus-visible:ring-primary outline-none"
                              >
                                {icon}
                                {label}
                              </button>
                            ))}
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {activeTab === "family" && (
                <div className="overflow-x-auto overflow-y-auto max-h-80 flex-1 scrollbar-thin scrollbar-thumb-border-subtle scrollbar-track-transparent">
                  <table className="w-full border-collapse table-fixed text-sm">
                    <colgroup>
                      <col className="w-[23%]" />
                      <col className="w-[11%]" />
                      <col className="w-[11%]" />
                      <col className="w-[11%]" />
                      <col className="w-[11%]" />
                      <col className="w-[13%]" />
                      <col className="w-[20%]" />
                    </colgroup>

                    <thead>
                      <tr className="bg-[#f1f5f9]">
                        {FAMILY_COLS.map((col, i) => (
                          <th
                            key={col + i}
                            className={`px-5 py-3 text-[11px] font-semibold tracking-wider text-[#94a3b8] uppercase border-b border-border-subtle whitespace-nowrap ${
                              i === FAMILY_COLS.length - 1 ? "text-right" : "text-left"
                            }`}
                          >
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>

                    <tbody>
                      {isFamilyLoading ? (
                        Array.from({ length: 3 }).map((_, idx) => (
                          <tr key={idx} className="border-b border-border-subtle">
                            <td colSpan={7} className="px-5 py-5">
                              <div className="h-4 w-full animate-pulse bg-[#f1f5f9] rounded" />
                            </td>
                          </tr>
                        ))
                      ) : familyProfiles.length > 0 ? (
                        familyProfiles.map((profile, idx) => (
                          <motion.tr
                            key={profile.id}
                            initial={{ opacity: 0, x: -6 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05, duration: 0.28, ease: "easeOut" }}
                            className="border-b border-border-subtle hover:bg-[#f1f5f9] transition-colors"
                          >
                            <td className="px-5 py-4">
                              <div className="flex items-center gap-3">
                                <span
                                  className="h-3 w-3 rounded-full shadow-sm"
                                  style={{ backgroundColor: profile.color }}
                                />
                                <div className="min-w-0">
                                  <span className="block text-sm font-semibold text-[#0f172a] truncate">
                                    {profile.name}
                                  </span>
                                  <span className="text-[10px] font-medium text-[#94a3b8] uppercase mt-0.5 block">
                                    {profile.dataMeasure ? "Có dữ liệu" : "Chưa có dữ liệu"}
                                  </span>
                                </div>
                              </div>
                            </td>

                            {profile.dataMeasure ? (
                              <>
                                {([
                                  profile.dataMeasure.shoulderWidth,
                                  profile.dataMeasure.chest,
                                  profile.dataMeasure.waist,
                                  profile.dataMeasure.hip,
                                  profile.dataMeasure.height,
                                ] as (number | undefined)[]).map((val, vi) => (
                                  <td key={vi} className="px-5 py-4">
                                    <span className="font-mono text-[13px] font-semibold text-[#0f172a]">
                                      {val ?? "--"}
                                    </span>
                                  </td>
                                ))}
                              </>
                            ) : (
                              <td colSpan={5} className="px-5 py-4">
                                <span className="text-xs font-medium text-[#94a3b8] italic">
                                  Chưa có dữ liệu
                                </span>
                              </td>
                            )}

                            <td className="px-5 py-4 text-right">
                              <button
                                onClick={() => handleUseFamilyMeasure(profile)}
                                disabled={!profile.dataMeasure}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold uppercase rounded-md border border-border-subtle text-text-muted hover:border-primary/40 hover:bg-primary/5 hover:text-primary transition-all duration-150 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-primary outline-none"
                              >
                                <Eye size={12} />
                                Xem
                              </button>
                            </td>
                          </motion.tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={7} className="px-5 py-10 text-center">
                            <span className="text-sm text-[#94a3b8]">
                              Chưa có hồ sơ người thân nào.
                            </span>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === "self" && (
                <div className="overflow-y-auto max-h-[420px] scrollbar-thin scrollbar-thumb-border-subtle scrollbar-track-transparent">
                  <AnalysisMeasure dataMeasurements={dataMeasured} />
                </div>
              )}

              <footer className="px-7 py-4 border-t border-border-subtle bg-[#f1f5f9] flex items-center justify-between flex-shrink-0">
                <div className="flex gap-7">
                  {[
                    { k: "PHIÊN BẢN", v: "1.0.0" },
                    { k: "BẢO MẬT", v: "Tiêu chuẩn" },
                  ].map(({ k, v }) => (
                    <div key={k} className="flex items-center gap-2">
                      <span className="text-[10px] font-semibold text-[#94a3b8] uppercase tracking-wider">
                        {k}:
                      </span>
                      <span className="text-[10px] font-medium text-text-muted">
                        {v}
                      </span>
                    </div>
                  ))}
                </div>
              </footer>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
