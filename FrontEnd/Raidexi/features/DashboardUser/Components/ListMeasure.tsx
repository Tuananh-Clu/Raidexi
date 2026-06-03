import { AnimatePresence, motion } from "framer-motion";
import { Clock, Eye, Shield, X } from "lucide-react";
import { data, ProfileTag } from "@/features/Camera/types";
import { useContext, useEffect, useState } from "react";
import { BodyMeasureEstimateContext } from "@/provider/BodyMeasureEstimate";
import { AnalysisMeasure } from "./AnalysisMeasure";
import { useProfileTagApi } from "@/features/Camera/hooks/useProfileTagApi";

const selfCols = ["Thời gian", "Vai", "Ngực", "Eo", "Hông", "Cao", ""];
const familyCols = ["Người thân", "Vai", "Ngực", "Eo", "Hông", "Cao", ""];

export const ListMeasure = ({
  isOpen,
  onClose,
  dataMeasured,
}: {
  isOpen: boolean;
  onClose: () => void;
  dataMeasured: data[];
}) => {
  const context = useContext(BodyMeasureEstimateContext);
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
        if (isMounted) setFamilyProfiles(profiles);
      } finally {
        if (isMounted) setIsFamilyLoading(false);
      }
    };

    loadFamilyProfiles();

    return () => {
      isMounted = false;
    };
  }, [activeTab, getCustomProfiles, isOpen]);

  const activeRecordCount = activeTab === "family" ? familyProfiles.length : dataMeasured.length;

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
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="rx-modal-backdrop z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ opacity: 0, y: 42, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 28, scale: 0.97 }}
            transition={{ duration: 0.62, ease: [0.32, 0.72, 0, 1] }}
            className="rx-shell w-full max-w-6xl"
          >
            <div className="rx-core max-h-[90vh] overflow-hidden">
              <header className="flex flex-col justify-between gap-5 border-b border-[rgba(24,23,20,0.1)] p-6 md:flex-row md:items-start md:p-7">
                <div>
                  <div className="mb-3 flex items-center gap-2">
                    <Shield size={15} strokeWidth={1.35} className="text-[var(--signal-blue)]" />
                    <span className="rx-badge rx-badge-blue">Kho số đo</span>
                  </div>
                  <h2 className="text-2xl font-extrabold text-[var(--ink)]">Lịch sử đo lường</h2>
                  <p className="rx-copy mt-2 text-sm">Chọn lại một hồ sơ số đo để dùng cho gợi ý size.</p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="hidden text-right sm:block">
                    <p className="font-mono text-2xl font-semibold text-[var(--signal-blue)]">{activeRecordCount}</p>
                    <p className="font-mono text-[10px] uppercase text-[var(--ink-muted)]">bản ghi</p>
                  </div>
                  <button onClick={onClose} className="rx-icon-btn" aria-label="Đóng">
                    <X size={18} strokeWidth={1.35} />
                  </button>
                </div>
              </header>

              <div className="flex gap-2 border-b border-[rgba(24,23,20,0.1)] p-4 md:px-7">
                {[
                  { key: "self", label: "Bản thân" },
                  { key: "family", label: "Người thân" },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key as "self" | "family")}
                    className={`rx-btn ${activeTab === tab.key ? "rx-btn-primary" : "rx-btn-secondary"}`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="max-h-[44vh] overflow-auto p-4 md:p-7">
                {activeTab === "self" ? (
                  <table className="rx-table">
                    <thead>
                      <tr>{selfCols.map((col) => <th key={col}>{col}</th>)}</tr>
                    </thead>
                    <tbody>
                      {dataMeasured.length > 0 ? (
                        dataMeasured.map((record, index) => (
                          <motion.tr
                            key={`${record.lastUpdate}-${index}`}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.035, duration: 0.36, ease: [0.32, 0.72, 0, 1] }}
                          >
                            <td>
                              <span className="inline-flex items-center gap-2 font-mono text-xs text-[var(--ink-muted)]">
                                <Clock size={13} strokeWidth={1.35} />
                                {record.lastUpdate}
                              </span>
                            </td>
                            {record.dataMeasure ? (
                              [
                                record.dataMeasure.shoulderWidth,
                                record.dataMeasure.chest,
                                record.dataMeasure.waist,
                                record.dataMeasure.hip,
                                record.dataMeasure.height,
                              ].map((value, idx) => (
                                <td key={idx} className="font-mono font-semibold text-[var(--ink)]">
                                  {value ?? "-"}
                                </td>
                              ))
                            ) : (
                              <td colSpan={5} className="text-[var(--ink-muted)]">Chưa có dữ liệu</td>
                            )}
                            <td className="text-right">
                              <button onClick={() => context.setDataMeasured?.([record])} className="rx-btn rx-btn-secondary">
                                <Eye size={13} strokeWidth={1.35} />
                                Dùng
                              </button>
                            </td>
                          </motion.tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={7} className="py-10 text-center text-[var(--ink-muted)]">Chưa có bản ghi đo lường.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                ) : (
                  <table className="rx-table">
                    <thead>
                      <tr>{familyCols.map((col) => <th key={col}>{col}</th>)}</tr>
                    </thead>
                    <tbody>
                      {isFamilyLoading ? (
                        Array.from({ length: 3 }).map((_, index) => (
                          <tr key={index}>
                            <td colSpan={7}><div className="rx-skeleton h-4 w-full" /></td>
                          </tr>
                        ))
                      ) : familyProfiles.length > 0 ? (
                        familyProfiles.map((profile, index) => (
                          <motion.tr
                            key={profile.id}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.035, duration: 0.36, ease: [0.32, 0.72, 0, 1] }}
                          >
                            <td>
                              <span className="inline-flex items-center gap-3">
                                <span className="h-3 w-3 rounded-full" style={{ backgroundColor: profile.color }} />
                                <span className="font-semibold text-[var(--ink)]">{profile.name}</span>
                              </span>
                            </td>
                            {profile.dataMeasure ? (
                              [
                                profile.dataMeasure.shoulderWidth,
                                profile.dataMeasure.chest,
                                profile.dataMeasure.waist,
                                profile.dataMeasure.hip,
                                profile.dataMeasure.height,
                              ].map((value, idx) => (
                                <td key={idx} className="font-mono font-semibold text-[var(--ink)]">
                                  {value ?? "-"}
                                </td>
                              ))
                            ) : (
                              <td colSpan={5} className="text-[var(--ink-muted)]">Chưa có dữ liệu</td>
                            )}
                            <td className="text-right">
                              <button
                                onClick={() => handleUseFamilyMeasure(profile)}
                                disabled={!profile.dataMeasure}
                                className={`rx-btn rx-btn-secondary ${!profile.dataMeasure ? "rx-btn-disabled" : ""}`}
                              >
                                <Eye size={13} strokeWidth={1.35} />
                                Dùng
                              </button>
                            </td>
                          </motion.tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={7} className="py-10 text-center text-[var(--ink-muted)]">Chưa có hồ sơ người thân.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                )}
              </div>

              {activeTab === "self" && (
                <div className="max-h-[230px] overflow-y-auto border-t border-[rgba(24,23,20,0.1)]">
                  <AnalysisMeasure dataMeasurements={dataMeasured} />
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
