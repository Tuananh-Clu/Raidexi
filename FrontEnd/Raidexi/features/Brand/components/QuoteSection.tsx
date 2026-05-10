import React from 'react';

const QuoteSection: React.FC = () => {
  return (
    <section className="w-full border-t border-border-subtle py-24 bg-surface-dark font-sans">
      <div className=" mx-auto px-6 text-center max-w-4xl">
        <span className="mb-6 text-4xl material-symbols-outlined text-primary opacity-80">
          format_quote
        </span>
        <blockquote className="mb-8 text-2xl italic leading-relaxed md:text-3xl text-text-muted">
          "Hạ tầng của RAIDEXI cho phép chúng tôi duy trì di sản thủ công trong khi vận hành ở quy mô kỹ thuật số. Đây là sự chính xác mà thời trang cao cấp yêu cầu."
        </blockquote>
        <cite className="flex flex-col items-center gap-1 not-italic">
          <span className="text-sm font-bold tracking-widest text-white uppercase">
            Giám đốc Vận hành
          </span>
          <span className="text-xs font-semibold tracking-wide uppercase text-text-dim">
            Tập đoàn Thời trang Quốc tế
          </span>
        </cite>
      </div>
    </section>
  );
};

export default QuoteSection;