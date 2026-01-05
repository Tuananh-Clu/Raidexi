import React from 'react';

export const Privacy: React.FC = () => {
  return (
    <section className="border-b border-border-subtle bg-surface-dark px-6 py-20">
      <div className="mx-auto max-w-4xl border border-primary/30 p-1">
        <div className="border border-primary/30 p-8 md:p-12 text-center bg-background-dark">
          <span className="material-symbols-outlined text-primary mb-6" style={{ fontSize: '32px' }}>shield_lock</span>
          <h2 className="text-2xl font-medium text-white mb-6">Privacy Protocol</h2>
          <p className="text-[#b8b19d] mb-10 max-w-lg mx-auto font-light">
            We process images locally whenever possible. Data is never shared with third parties for marketing. You own your metrics.
          </p>
          <div className="grid md:grid-cols-3 gap-8 font-mono text-xs uppercase tracking-wider text-[#b8b19d]">
            {['No Social Features', 'No Public Profiles', 'User-Controlled Data'].map((item) => (
              <div key={item} className="flex flex-col items-center gap-2">
                <span className="block w-12 h-px bg-border-subtle"></span>
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};