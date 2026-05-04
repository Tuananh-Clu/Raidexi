import { AnimatePresence, motion } from "framer-motion";
import { X, Shield, Clock, Eye, Printer, ChevronRight } from "lucide-react";
import { data } from "@/features/Camera/types";
import { useContext } from "react";
import { BodyMeasureEstimateContext } from "@/provider/BodyMeasureEstimate";

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
  const context=useContext(BodyMeasureEstimateContext);
  

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
            className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm"
          />

          {/* Panel wrapper */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 28, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
              className="relative pointer-events-auto w-full max-w-5xl flex flex-col bg-[#0d0a08] border border-[#2e1f14] shadow-[0_0_0_1px_#1a0e07,0_40px_100px_rgba(0,0,0,0.9)]"
            >
              {/* Corner ornaments */}
              <span className="absolute -top-px -left-px w-5 h-5 border-t-2 border-l-2 border-[#c87832] pointer-events-none" />
              <span className="absolute -top-px -right-px w-5 h-5 border-t-2 border-r-2 border-[#c87832] pointer-events-none" />
              <span className="absolute -bottom-px -left-px w-5 h-5 border-b-2 border-l-2 border-[#c87832] pointer-events-none" />
              <span className="absolute -bottom-px -right-px w-5 h-5 border-b-2 border-r-2 border-[#c87832] pointer-events-none" />

              {/* Close button */}
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="absolute -top-11 right-0 md:top-0 md:-right-11 z-[60] w-10 h-10 flex items-center justify-center bg-[#c87832] text-[#0d0a08] hover:bg-[#e09040] transition-colors"
              >
                <X size={18} strokeWidth={2.5} />
              </motion.button>

              {/* ── Header ── */}
              <header className="px-7 pt-6 pb-5 border-b border-[#1e140c] flex-shrink-0">
                <div className="flex items-start justify-between">
                  {/* Left: title */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Shield size={10} className="text-[#c87832]" strokeWidth={1.5} />
                      <span className="font-mono text-[9px] tracking-[0.22em] text-[#4a3325] uppercase">
                        RAIDEXI_SYSTEM // SECURE_ACCESS_GRANTED
                      </span>
                      <span className="w-[5px] h-[5px] rounded-full bg-[#c87832] animate-pulse" />
                    </div>
                    <h1
                      className="font-bold italic text-[#f0e0c8] text-2xl leading-none tracking-tight"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      Measurement History{" "}
                      <em className="text-[#c87832]">Archive</em>
                    </h1>
                  </div>

                  {/* Right: stats */}
                  <div className="flex items-center gap-6">
                    {[
                      { label: "RECORDS", value: dataMeasured.length },
                      { label: "INTEGRITY", value: "100%" },
                    ].map(({ label, value }) => (
                      <div key={label} className="text-right">
                        <div className="font-mono text-xl font-semibold text-[#c87832] leading-none">
                          {value}
                        </div>
                        <div className="font-mono text-[8px] text-[#4a3325] tracking-[0.2em] mt-1 uppercase">
                          {label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Gradient divider */}
                <div className="mt-4 h-px bg-gradient-to-r from-[#c87832] via-[#2e1f14] to-transparent" />
              </header>

              {/* ── Table ── */}
              <div className="overflow-x-auto overflow-y-auto max-h-80 flex-1 [&::-webkit-scrollbar]:w-[3px] [&::-webkit-scrollbar-track]:bg-[#0a0705] [&::-webkit-scrollbar-thumb]:bg-[#2e1f14]">
                <table className="w-full border-collapse table-fixed">
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
                    <tr className="bg-[#0a0705]">
                      {COLS.map((col, i) => (
                        <th
                          key={col + i}
                          className={`px-3.5 py-2.5 font-mono text-[8.5px] tracking-[0.18em] text-[#4a3325] uppercase border-b border-[#1a100a] font-normal whitespace-nowrap ${
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
                        className="border-b border-[#150e09] hover:bg-[#1a0e08] transition-colors"
                      >
                        {/* Timestamp */}
                        <td className="px-3.5 py-3.5">
                          <div className="flex items-center gap-2">
                            <Clock size={9} className="text-[#3a2518]" strokeWidth={1.5} />
                            <span className="font-mono text-[11px] text-[#7a5440] tracking-[0.06em]">
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
                              <td key={vi} className="px-3.5 py-3.5">
                                <span className="font-mono text-[13px] font-semibold text-[#f0e0c8] tracking-[0.04em]">
                                  {val ?? "—"}
                                </span>
                              </td>
                            ))}
                          </>
                        ) : (
                          <td colSpan={13} className="px-3.5 py-3.5">
                            <span className="font-mono text-[9px] text-[#2e1f14] tracking-[0.2em] uppercase">
                              — no_data_available —
                            </span>
                          </td>
                        )}

                        {/* Actions */}
                        <td className="px-3.5 py-3.5 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {[
                              { label: "GET", icon: <Eye size={9} /> },
                              { label: "PRINT", icon: <Printer size={9} /> },
                            ].map(({ label, icon }) => (
                              <button
                              onClick={() => context.setDataMeasured([record])}
                                key={label}
                                className="inline-flex items-center gap-1 px-2.5 py-1 font-mono text-[8.5px] tracking-[0.14em] font-semibold uppercase border border-[#1e140c] text-[#4a3325] hover:border-[#c87832] hover:bg-[#c87832] hover:text-[#0d0a08] transition-all duration-150 cursor-pointer"
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

              {/* ── Footer ── */}
              <footer className="px-7 py-3 border-t border-[#1a100a] bg-[#0a0705] flex items-center justify-between flex-shrink-0">
                <div className="flex gap-7">
                  {[
                    { k: "SESSION", v: "0XBF812" },
                    { k: "ENCRYPTION", v: "AES-256" },
                  ].map(({ k, v }) => (
                    <div key={k} className="flex items-center gap-2">
                      <span className="font-mono text-[8px] text-[#3a2518] tracking-[0.15em] uppercase">
                        {k}:
                      </span>
                      <span className="font-mono text-[8px] text-[#7a5440] tracking-[0.1em]">
                        {v}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-mono text-[8px] text-[#3a2518] tracking-[0.15em]">
                    PAGE 01 / 44
                  </span>
                  <div className="flex gap-1">
                    <span className="w-1.5 h-0.5 bg-[#c87832]" />
                    <span className="w-1.5 h-0.5 bg-[#1e140c]" />
                    <span className="w-1.5 h-0.5 bg-[#1e140c]" />
                  </div>
                  <ChevronRight size={10} className="text-[#2e1f14]" />
                </div>
              </footer>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};