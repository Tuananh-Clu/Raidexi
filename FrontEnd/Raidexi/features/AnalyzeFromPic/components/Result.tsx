import { sizeTransferFromPic } from "@/Shared/store/sizeTransferFromPic";
import { motion } from "framer-motion";
import { Ruler, Info, X, RulerDimensionLine } from "lucide-react";

export default function ResultAnalyzePic({ CLosed,showResult ,showCustomizer }: { CLosed: () => void, showResult: React.Dispatch<React.SetStateAction<boolean>>, showCustomizer: React.Dispatch<React.SetStateAction<boolean>>  }) {
  const { sizes } = sizeTransferFromPic();
  return (
    <div>
      <div className="relative flex flex-col w-full min-h-screen overflow-x-hidden selection:bg-primary selection:text-bg-dark">
        <div className="flex flex-col h-full layout-container grow">
          <header className="flex items-center justify-between px-6 py-6 border-b border-primary/20 md:px-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4 text-primary"
            >
              <Ruler className="size-6" strokeWidth={1.5} />
              <h2 className="text-2xl font-light tracking-widest uppercase font-display">
                RAIDEXI
              </h2>
            </motion.div>
          </header>

          <main className="flex flex-col items-center flex-1 px-6 py-12 md:px-20">
            <div className="w-full max-w-6xl">
              {/* Title Section */}
              <div className="flex items-start justify-between gap-4 mt-20">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="py-2 pl-6 mb-12 border-l-2 border-primary"
                >
                  <h1 className="mb-2 text-5xl italic tracking-tight text-primary md:text-6xl font-display font-extralight">
                    Size Guide
                  </h1>
                  <p className="text-primary/60 text-sm tracking-[0.15em] uppercase font-mono">
                    Professional Sizing Chart — Technical Specifications
                  </p>
                </motion.div>
                <button
                  onClick={CLosed}
                  className="flex items-center justify-center w-8 h-8 transition-colors rounded-full text-primary hover:bg-primary/10"
                >
                  <X className="size-15" strokeWidth={1.5} />
                </button>
              </div>

              {/* Table Container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="w-full overflow-x-auto border border-primary/20 bg-primary/[0.02]"
              >
                <table className="w-full text-left min-w-[800px]">
                  <thead>
                    <tr className="bg-primary/5">
                      <th className="px-6 py-5 text-xs font-semibold tracking-widest uppercase text-primary">
                        US Size
                      </th>
                      <th className="px-6 py-5 text-xs font-semibold tracking-widest uppercase text-primary">
                        UK
                      </th>
                      <th className="px-6 py-5 text-xs font-semibold tracking-widest uppercase text-primary">
                        EU
                      </th>
                      <th className="px-6 py-5 text-xs font-semibold tracking-widest uppercase text-primary">
                        Chest (cm)
                      </th>
                      <th className="px-6 py-5 text-xs font-semibold tracking-widest uppercase text-primary">
                        Waist (cm)
                      </th>
                      <th className="px-6 py-5 text-xs font-semibold tracking-widest uppercase text-primary">
                        Hip (cm)
                      </th>
                      <th className="px-6 py-5 text-xs font-semibold tracking-widest uppercase text-primary">
                        Height (cm)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="font-mono">
                    {sizes?.map((row, idx) => (
                      <motion.tr
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + idx * 0.1 }}
                        className="transition-colors border-t border-primary/10 hover:bg-primary/5 group"
                      >
                        <td className="px-6 py-6 text-sm font-medium transition-colors text-slate-100 group-hover:text-primary">
                          {row.size_us}
                        </td>
                        <td className="px-6 py-6 text-sm text-slate-400">
                          {row.size_uk}
                        </td>
                        <td className="px-6 py-6 text-sm text-slate-400">
                          {row.size_eu}
                        </td>
                        <td className="px-6 py-6 text-sm text-slate-400">
                          {row.chest_max_cm}- {row.chest_min_cm}{" "}
                        </td>
                        <td className="px-6 py-6 text-sm text-slate-400">
                          {row.waist_max_cm} - {row.waist_min_cm}
                        </td>
                        <td className="px-6 py-6 text-sm text-slate-400">
                          {row.hip_max_cm} - {row.hip_min_cm}
                        </td>
                        <td className="px-6 py-6 text-sm text-slate-400">
                          {row.height_max_cm} - {row.height_min_cm}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>

              {/* Footer Content */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="flex flex-col items-start justify-between gap-6 mt-8 md:flex-row md:items-center"
              >
                <div className="flex items-center gap-2 text-primary/40">
                  <Info className="size-4" />
                  <p className="font-mono text-xs tracking-widest uppercase">
                    Units measured in Centimeters (cm). For precise fit, measure
                    against skin.
                  </p>
                </div>
                <button
                  onClick={() =>{
                    showCustomizer(true);
                    showResult(false);
                  }}
                  className="flex cursor-pointer items-center gap-2 px-4 py-2 text-sm font-medium tracking-[0.15em] uppercase text-primary border border-primary/20 hover:bg-primary/10 transition-colors"
                >
                  <RulerDimensionLine className="size-4" />
                  Estimate Size With Your Measurements
                </button>
              </motion.div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
