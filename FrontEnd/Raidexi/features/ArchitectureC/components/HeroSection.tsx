import React from 'react';

export const HeroSection: React.FC = () => {
  return (
    <div className="flex flex-col items-start justify-between gap-6 pb-8 mb-12 border-b md:flex-row md:items-end border-border-brass/50">
      <div className="max-w-2xl">
        <div className="mb-2 font-mono text-xs tracking-widest uppercase text-primary">
          Design Specification 084-B
        </div>
        <h2 className="mb-4 text-4xl font-bold leading-tight text-white md:text-5xl font-display">
          Solution Architecture
        </h2>
        <p className="max-w-xl font-sans text-lg font-light leading-relaxed text-text-muted">
          A decoupled dual-layer infrastructure ensuring data integrity and brand autonomy.
          From raw human topology to executable sizing logic.
        </p>
      </div>
      <div className="flex flex-col items-end gap-2 text-right">
        <div className="font-mono text-xs text-border-brass">REVISION 1.0.4</div>
        <div className="font-mono text-xs text-border-brass">STATUS: ONLINE</div>
      </div>
    </div>
  );
};