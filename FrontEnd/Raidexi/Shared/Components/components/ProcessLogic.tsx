import React from 'react';

export const ProcessLogic: React.FC = () => {
  const steps = [
    { id: '01', title: 'Quét cơ thể', sub: 'Nguồn dữ liệu' },
    { id: '02', title: 'Đo lường', sub: 'Trích xuất số đo' },
    { id: '03', title: 'Fit thương hiệu', sub: 'Đối chiếu bảng size' },
    { id: '04', title: 'Gợi ý', sub: 'Size phù hợp' },
  ];

  return (
    <section className="px-6 py-24 border-b border-border-subtle">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-16 text-3xl font-medium text-center text-[var(--ink)]">Logic quy đổi</h2>
        <div className="relative grid items-stretch gap-4 md:grid-cols-4">
          <div className="absolute left-0 hidden w-full h-px -translate-y-1/2 md:block top-1/2 bg-border-subtle -z-10"></div>
          
          {steps.map((step) => (
            <div key={step.id} className="z-10 flex flex-col items-center justify-center p-6 text-center transition-colors border cursor-default bg-[var(--surface-canvas)] border-border-subtle min-h-45 hover:border-primary group">
              <div className="flex items-center justify-center w-10 h-10 mb-4 transition-colors border border-border-subtle bg-white group-hover:border-primary">
                <span className="font-mono font-bold text-primary">{step.id}</span>
              </div>
              <h4 className="mb-2 font-medium text-[var(--ink)]">{step.title}</h4>
              <p className="text-xs text-[var(--ink-muted)] font-mono uppercase">{step.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
