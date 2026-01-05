import React from 'react';
import { Lock, Sliders, ClipboardCheck } from 'lucide-react';

export const FeaturesFooter: React.FC = () => {
  return (
    <div className="grid grid-cols-1 gap-6 pt-8 mt-12 border-t md:grid-cols-3 border-border-brass/30">
      <div className="flex items-start gap-3">
        <div className="p-2 border border-border-brass bg-surface-dark text-text-muted">
          <Lock size={20} strokeWidth={1.5} />
        </div>
        <div>
          <h5 className="mb-1 font-sans text-sm font-bold tracking-wide text-white uppercase">Encrypted Core</h5>
          <p className="text-xs text-[#7a7060] font-sans">All logic kernels are isolated in secure containers.</p>
        </div>
      </div>
      
      <div className="flex items-start gap-3">
        <div className="p-2 border border-border-brass bg-surface-dark text-text-muted">
          <Sliders size={20} strokeWidth={1.5} />
        </div>
        <div>
          <h5 className="mb-1 font-sans text-sm font-bold tracking-wide text-white uppercase">Adjustable Bias</h5>
          <p className="text-xs text-[#7a7060] font-sans">Real-time adjustment of ease parameters via API.</p>
        </div>
      </div>
      
      <div className="flex items-start gap-3">
        <div className="p-2 border border-border-brass bg-surface-dark text-text-muted">
          <ClipboardCheck size={20} strokeWidth={1.5} />
        </div>
        <div>
          <h5 className="mb-1 font-sans text-sm font-bold tracking-wide text-white uppercase">Audit Trail</h5>
          <p className="text-xs text-[#7a7060] font-sans">Full traceability of decision logic for every output.</p>
        </div>
      </div>
    </div>
  );
};