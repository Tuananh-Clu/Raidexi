import { Sparkles } from "lucide-react";

export function QualityPanel() {
  return (
    <section className="raidexi-shell rounded-[2rem] p-1.5">
      <div className="raidexi-core rounded-[calc(2rem-0.375rem)] p-6">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[rgba(154,116,71,0.13)] text-[var(--brass)]">
          <Sparkles size={18} strokeWidth={1.15} />
        </span>
        <h2 className="mt-5 font-serif text-4xl font-light leading-none text-[var(--ink)]">Fit quality</h2>
        <p className="mt-3 text-sm leading-6 text-[var(--ink-soft)]">
          Gợi ý size đang giữ độ nhất quán cao ở nhóm thương hiệu đã chuẩn hóa. Ưu tiên tiếp theo: denim và oversize.
        </p>
        <div className="mt-5 rounded-full bg-[rgba(24,23,20,0.08)] p-1">
          <div className="h-2 w-[86%] rounded-full bg-[var(--signal-blue)]" />
        </div>
        <p className="mt-3 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--ink-muted)]">
          86% quality score
        </p>
      </div>
    </section>
  );
}
