import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="w-full px-6 lg:px-12 py-16 lg:py-24 max-w-[1400px] border-b border-border-subtle">
      <div className="flex flex-col max-w-4xl gap-6">
        <div className="flex items-center gap-2 mb-2 font-mono text-xs tracking-widest uppercase text-primary">
          <span className="w-2 h-2 bg-primary"></span>
          <span>System Documentation v2.4</span>
        </div>
        
        <h1 className="text-5xl font-bold leading-none tracking-tight text-white lg:text-7xl">
          How It Works
        </h1>
        
        <p className="max-w-2xl pl-6 mt-4 font-sans text-lg font-normal leading-relaxed border-l-2 text-text-muted lg:text-xl border-primary/30">
          RAIDEXI functions on a dual-layer architecture designed to standardize disparate sizing inputs into a unified enterprise standard. No estimation, just calculation.
        </p>
      </div>
    </section>
  );
};

export default Hero;