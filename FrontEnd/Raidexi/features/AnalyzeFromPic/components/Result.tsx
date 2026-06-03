import { sizeTransferFromPic } from "@/Shared/store/sizeTransferFromPic";
import { motion } from "framer-motion";
import { Ruler, Info, X, RulerDimensionLine } from "lucide-react";

export default function ResultAnalyzePic({
  CLosed,
  showResult,
  showCustomizer,
}: {
  CLosed: () => void;
  showResult: React.Dispatch<React.SetStateAction<boolean>>;
  showCustomizer: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { sizes } = sizeTransferFromPic();
  return (
    <div>
      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden selection:bg-primary selection:text-bg-dark">
        <div className="layout-container flex h-full grow flex-col">
          <header className="flex items-center justify-between border-b border-primary/20 px-6 py-6 md:px-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4 text-primary"
            >
              <Ruler className="size-6" strokeWidth={1.5} />
              <h2 className="font-display text-2xl font-light uppercase tracking-widest">
                RAIDEXI
              </h2>
            </motion.div>
          </header>

          <main className="flex flex-1 flex-col items-center px-6 py-12 md:px-20">
            <div className="w-full max-w-6xl">
              <div className="mt-20 flex items-start justify-between gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mb-12 border-l-2 border-primary py-2 pl-6"
                >
                  <h1 className="font-display mb-2 text-5xl font-extralight italic tracking-tight text-primary md:text-6xl">
                    Bảng size
                  </h1>
                  <p className="font-mono text-sm uppercase tracking-[0.15em] text-primary/60">
                    Bảng thông số kỹ thuật đã trích xuất
                  </p>
                </motion.div>
                <button
                  onClick={CLosed}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-primary transition-colors hover:bg-primary/10"
                  aria-label="Đóng kết quả"
                  type="button"
                >
                  <X className="size-5" strokeWidth={1.5} />
                </button>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="w-full overflow-x-auto border border-primary/20 bg-primary/[0.02]"
              >
                <table className="w-full min-w-[800px] text-left">
                  <thead>
                    <tr className="bg-primary/5">
                      <th className="px-6 py-5 text-xs font-semibold uppercase tracking-widest text-primary">
                        Size US
                      </th>
                      <th className="px-6 py-5 text-xs font-semibold uppercase tracking-widest text-primary">
                        UK
                      </th>
                      <th className="px-6 py-5 text-xs font-semibold uppercase tracking-widest text-primary">
                        EU
                      </th>
                      <th className="px-6 py-5 text-xs font-semibold uppercase tracking-widest text-primary">
                        Ngực (cm)
                      </th>
                      <th className="px-6 py-5 text-xs font-semibold uppercase tracking-widest text-primary">
                        Eo (cm)
                      </th>
                      <th className="px-6 py-5 text-xs font-semibold uppercase tracking-widest text-primary">
                        Hông (cm)
                      </th>
                      <th className="px-6 py-5 text-xs font-semibold uppercase tracking-widest text-primary">
                        Chiều cao (cm)
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
                        className="group border-t border-primary/10 transition-colors hover:bg-primary/5"
                      >
                        <td className="px-6 py-6 text-sm font-medium text-slate-100 transition-colors group-hover:text-primary">
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

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-8 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center"
              >
                <div className="flex items-center gap-2 text-primary/40">
                  <Info className="size-4" />
                  <p className="font-mono text-xs uppercase tracking-widest">
                    Đơn vị tính bằng centimet (cm). Để fit chính xác hơn, hãy đo sát cơ thể.
                  </p>
                </div>
                <button
                  onClick={() => {
                    showCustomizer(true);
                    showResult(false);
                  }}
                  className="flex cursor-pointer items-center gap-2 border border-primary/20 px-4 py-2 text-sm font-medium uppercase tracking-[0.15em] text-primary transition-colors hover:bg-primary/10"
                  type="button"
                >
                  <RulerDimensionLine className="size-4" />
                  Ước lượng size từ số đo của bạn
                </button>
              </motion.div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
