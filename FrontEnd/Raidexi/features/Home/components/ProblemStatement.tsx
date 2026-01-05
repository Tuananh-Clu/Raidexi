import React from 'react';

export const ProblemStatement: React.FC = () => {
  const problems = [
    {
      id: '01',
      icon: 'straighten',
      title: 'Sizes Differ',
      desc: 'A Medium in one brand is a Large in another. Labels are arbitrary marketing tools, not standards of measurement.'
    },
    {
      id: '02',
      icon: 'close',
      title: 'Guessing Fails',
      desc: 'Subjective fitting leads to returns and dissatisfaction. "True to size" is a myth when the size itself is variable.'
    },
    {
      id: '03',
      icon: 'check_circle',
      title: 'Precision Matters',
      desc: 'Millimeters matter. RAIDEXI measures key dimensions with high confidence, replacing subjective labels with objective data.'
    }
  ];

  return (
    <section className="border-b border-border-subtle bg-background-dark">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="border-l-2 border-primary pl-6 max-w-2xl">
            <h2 className="text-3xl font-medium text-white mb-2">Why This Exists</h2>
            <p className="text-[#b8b19d] text-lg font-light">The fashion industry lacks a standard. We provide the constant in a variable world.</p>
          </div>
          <div className="font-mono text-xs text-[#534d3c] uppercase tracking-widest text-right">
            Problem Statement <br /> v1.0
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-0 border border-border-subtle divide-y md:divide-y-0 md:divide-x divide-border-subtle bg-surface-dark">
          {problems.map((p) => (
            <div key={p.id} className="p-8 group hover:bg-[#2c261e] transition-colors relative">
              <div className="absolute top-4 right-4 text-[#383429] font-mono text-xs">{p.id}</div>
              <span className="material-symbols-outlined text-primary mb-6 text-3xl">{p.icon}</span>
              <h3 className="text-xl font-medium text-white mb-3">{p.title}</h3>
              <p className="text-[#b8b19d] text-sm leading-relaxed font-light">
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};