import React from "react";

const QuoteSection: React.FC = () => {
  return (
    <section className="rx-section pt-0">
      <div className="rx-container">
        <div className="rx-shell">
          <div className="rx-core px-6 py-16 text-center md:px-12 md:py-24">
            <span className="rx-badge rx-badge-brass mx-auto">Bằng chứng đối tác</span>
            <blockquote className="mx-auto mt-6 max-w-4xl text-3xl font-extrabold leading-tight text-[var(--ink)] md:text-5xl">
              “Raidexi giúp chúng tôi giữ logic fit riêng của thương hiệu, nhưng biến nó thành một trải nghiệm chọn size rõ ràng cho khách hàng.”
            </blockquote>
            <cite className="mt-8 flex flex-col items-center gap-1 not-italic">
              <span className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-[var(--ink)]">Giám đốc vận hành</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--ink-muted)]">Tập đoàn thời trang quốc tế</span>
            </cite>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuoteSection;
