import React from 'react';

export const BrandIntegration: React.FC = () => {
  const brands = [
    { id: 'REF-01', name: 'Uniqlo', desc: 'Global Sizing Data' },
    { id: 'REF-02', name: "Arc'teryx", desc: 'Technical Shell Fit' },
    { id: 'REF-03', name: "Levi's", desc: 'Denim Shrinkage Calib.' },
    { id: 'REF-04', name: 'Nike', desc: 'Performance Wear' }
  ];

  return (
    <section className="border-b border-border-subtle bg-background-dark">
      <div className="px-6 py-24 mx-auto max-w-7xl">
        <div className="flex flex-col items-end justify-between gap-8 mb-12 md:flex-row">
          <div className="max-w-2xl pl-6 border-l-2 border-primary">
            <h2 className="mb-2 text-3xl font-medium text-white">Brand Integration</h2>
            <p className="text-[#b8b19d] text-lg font-light">Direct data mapping with manufacturing specifications from verified partners.</p>
          </div>
          <div className="font-mono text-xs text-[#534d3c] uppercase tracking-widest text-right">
            Partnerships <br /> IDX-2024
          </div>
        </div>

        <div className="grid grid-cols-2 border md:grid-cols-4 border-border-subtle bg-surface-dark">
          {brands.map((brand, idx) => (
            <div 
              key={brand.id} 
              className={`p-8 flex flex-col justify-between min-h-[160px] group hover:bg-[#2c261e] transition-colors
                ${idx !== brands.length - 1 ? 'border-r border-border-subtle' : ''}
                ${idx < 2 ? 'border-b md:border-b-0' : 'border-b md:border-b-0'}
              `}
            >
              <div className="flex items-start justify-between mb-4">
                <span className="font-mono text-xs text-primary">{brand.id}</span>
                <span className="material-symbols-outlined text-[#383429] text-lg group-hover:text-primary transition-colors">verified</span>
              </div>
              <div>
                <h4 className="mb-1 text-lg font-medium text-white">{brand.name}</h4>
                <p className="text-xs text-[#b8b19d] font-mono">{brand.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-between gap-6 p-6 mt-8 border border-border-subtle md:flex-row bg-surface-dark">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-10 h-10 border border-border-subtle bg-background-dark text-primary">
              <span className="material-symbols-outlined">dataset_linked</span>
            </div>
            <div>
              <h5 className="text-sm font-medium text-white">Direct Manufacturer API Access</h5>
              <p className="text-[#b8b19d] text-xs font-mono mt-1">Real-time access to pattern grading charts ensures 99.9% match accuracy.</p>
            </div>
          </div>
          <a href="#" className="px-6 py-3 font-mono text-xs font-bold tracking-wider uppercase transition-colors border border-primary text-primary hover:bg-primary hover:text-background-dark whitespace-nowrap">
            View Partner Index
          </a>
        </div>
      </div>
    </section>
  );
};