import React from 'react';

export const SystemCapabilities: React.FC = () => {
  return (
    <section className="border-b border-border-subtle bg-surface-dark">
      <div className="grid mx-auto max-w-7xl lg:grid-cols-2">
        <div className="flex flex-col justify-center p-6 border-b lg:p-24 lg:border-b-0 lg:border-r border-border-subtle">
          <h2 className="mb-6 text-3xl font-medium text-white">System Capabilities</h2>
          <p className="text-[#b8b19d] text-lg mb-8 font-light">
            We deploy computer vision to extract precise linear measurements from a standard camera feed. The output is raw, unopinionated geometric data used for immediate comparison.
          </p>
          
          <div className="grid gap-8 mb-8 sm:grid-cols-2">
            <div>
              <h4 className="mb-2 text-sm font-medium tracking-wider text-white uppercase">Input Requirements</h4>
              <ul className="space-y-2 font-mono text-xs text-[#b8b19d]">
                <li className="flex items-start gap-2"><span className="text-primary mt-0.5">+</span> Standard RGB Camera (720p+)</li>
                <li className="flex items-start gap-2"><span className="text-primary mt-0.5">+</span> Static Background</li>
                <li className="flex items-start gap-2"><span className="text-primary mt-0.5">+</span> Tight-fitting garments</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-2 text-sm font-medium tracking-wider text-white uppercase">Data Processing</h4>
              <ul className="space-y-2 font-mono text-xs text-[#b8b19d]">
                <li className="flex items-start gap-2"><span className="text-primary mt-0.5">+</span> Local-first processing</li>
                <li className="flex items-start gap-2"><span className="text-primary mt-0.5">+</span> &lt; 200ms inference time</li>
                <li className="flex items-start gap-2"><span className="text-primary mt-0.5">+</span> JSON export available</li>
              </ul>
            </div>
          </div>
          
          <div className="pt-6 mt-2 border-t border-border-subtle">
            <ul className="space-y-4 font-mono text-sm text-[#e0dcd5]">
              <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-primary"></span>Extracts 12 key body dimensions</li>
              <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-primary"></span>Calibrates scale automatically</li>
              <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-primary"></span>Computes fit delta against brand charts</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center p-6 bg-background-dark lg:p-24">
          <div className="w-full mb-6 border border-border-subtle">
            <div className="bg-[#2c261e] px-4 py-2 border-b border-border-subtle flex justify-between items-center">
              <span className="font-mono text-xs tracking-widest uppercase text-primary">Live Output</span>
              <span className="material-symbols-outlined text-[#534d3c] text-sm">terminal</span>
            </div>
            <div className="p-0 overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-xs font-mono text-[#534d3c] border-b border-border-subtle">
                    <th className="p-4 font-normal">DIMENSION</th>
                    <th className="p-4 font-normal">VALUE (CM)</th>
                    <th className="p-4 font-normal text-right">CONFIDENCE</th>
                  </tr>
                </thead>
                <tbody className="font-mono text-sm text-[#e0dcd5]">
                  {[
                    { dim: 'Shoulder Width', val: '44.2', conf: '99.1%' },
                    { dim: 'Chest Circumference', val: '102.0', conf: '98.8%' },
                    { dim: 'Sleeve Length', val: '64.5', conf: '99.5%' },
                    { dim: 'Inseam', val: '81.0', conf: '99.2%' },
                  ].map((row, i) => (
                    <tr key={i} className={`hover:bg-[#2c261e]/50 ${i !== 3 ? 'border-b border-border-subtle' : ''}`}>
                      <td className="p-4 whitespace-nowrap">{row.dim}</td>
                      <td className="p-4">{row.val}</td>
                      <td className="p-4 text-right text-primary">{row.conf}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="text-xs font-mono text-[#534d3c] w-full text-left">
            * Values represent mean calculation from 30 frame burst.
          </p>
        </div>
      </div>
    </section>
  );
};