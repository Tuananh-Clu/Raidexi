import React from 'react';
import { Lock, Sliders, ClipboardCheck } from 'lucide-react';

export const FeaturesFooter: React.FC = () => {
  return (
    <div className="grid grid-cols-1 gap-6 pt-8 mt-12 border-t md:grid-cols-3 border-border-subtle">
      <div className="flex items-start gap-3">
        <div className="p-2 border border-border-subtle bg-white text-primary rounded-lg shadow-sm">
          <Lock size={20} strokeWidth={2} />
        </div>
        <div>
          <h5 className="mb-1 font-sans text-sm font-bold tracking-wide text-[#0f172a] uppercase">Encrypted Core</h5>
          <p className="text-xs text-text-muted font-sans leading-relaxed">All logic kernels are isolated in secure containers.</p>
        </div>
      </div>
      
      <div className="flex items-start gap-3">
        <div className="p-2 border border-border-subtle bg-white text-primary rounded-lg shadow-sm">
          <Sliders size={20} strokeWidth={2} />
        </div>
        <div>
          <h5 className="mb-1 font-sans text-sm font-bold tracking-wide text-[#0f172a] uppercase">Adjustable Bias</h5>
          <p className="text-xs text-text-muted font-sans leading-relaxed">Real-time adjustment of ease parameters via API.</p>
        </div>
      </div>
      
      <div className="flex items-start gap-3">
        <div className="p-2 border border-border-subtle bg-white text-primary rounded-lg shadow-sm">
          <ClipboardCheck size={20} strokeWidth={2} />
        </div>
        <div>
          <h5 className="mb-1 font-sans text-sm font-bold tracking-wide text-[#0f172a] uppercase">Audit Trail</h5>
          <p className="text-xs text-text-muted font-sans leading-relaxed">Full traceability of decision logic for every output.</p>
        </div>
      </div>
    </div>
  );
};