import React from 'react';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { DiagramLayer } from './DiagramLayer';

export const ArchitectureDiagram: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-0 border border-border-subtle relative bg-surface-dark rounded-xl shadow-sm overflow-hidden">
      {/* Decorative corners */}
      <div className="absolute w-3 h-3 border-t border-l -top-1 -left-1 border-primary rounded-tl-sm z-10"></div>
      <div className="absolute w-3 h-3 border-t border-r -top-1 -right-1 border-primary rounded-tr-sm z-10"></div>
      <div className="absolute w-3 h-3 border-b border-l -bottom-1 -left-1 border-primary rounded-bl-sm z-10"></div>
      <div className="absolute w-3 h-3 border-b border-r -bottom-1 -right-1 border-primary rounded-br-sm z-10"></div>

      {/* Layer 01 */}
      <div className="border-b lg:border-b-0 lg:border-r border-border-subtle">
        <DiagramLayer
          layerNumber="01"
          title="Measurement Normalization"
          label="Input Stream"
          dotColorClass="bg-primary"
          borderColorClass="border-transparent"
          description={
            <>
              <span className="text-text-dim font-medium">// AI-Assisted Processing</span>
              <br />
              Ingests raw scan data, removes artifact noise, and standardizes topology into ISO-compliant metric vectors.
            </>
          }
        >
          <div className="p-4 border rounded-xl bg-[#15120e] shadow-inner border-border-subtle mt-4">
            <div className="flex justify-between border-b border-border-subtle pb-2 mb-3">
              <span className="text-text-dim font-bold tracking-wide">INPUT_SOURCE</span>
              <span className="text-primary font-bold bg-primary/10 px-2 py-0.5 rounded-md">LiDAR_V4</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="text-text-dim text-[10px] font-bold tracking-wider">RAW_DATA</div>
                <div className="text-text-secondary font-medium">H: 1824mm</div>
                <div className="text-text-secondary font-medium">C: 1042mm</div>
                <div className="text-text-dim font-medium">N: 24% (High)</div>
              </div>
              <div className="relative space-y-1">
                <div className="absolute top-0 bottom-0 w-px -left-3 bg-border-subtle"></div>
                <div className="text-primary text-[10px] font-bold tracking-wider">NORMALIZED</div>
                <div className="text-white font-bold">H: 182.4cm</div>
                <div className="text-white font-bold">C: 104.2cm</div>
                <div className="text-primary font-bold">N: 0.2% (Clean)</div>
              </div>
            </div>
          </div>
        </DiagramLayer>
      </div>

      {/* Connector Desktop */}
      <div className="relative flex-col items-center justify-center hidden w-24 lg:flex bg-[#1a1713] border-r border-border-subtle">
        <div className="absolute left-0 w-full h-px bg-border-brass top-1/2"></div>
        <div className="z-10 p-2 border rounded-full bg-surface-dark border-primary/30 shadow-sm">
          <ArrowRight className="text-primary animate-pulse" size={20} />
        </div>
        <div className="absolute top-1/2 -mt-10 font-mono text-[9px] font-bold text-primary rotate-90 tracking-widest uppercase whitespace-nowrap bg-[#1a1713] px-2">
          Secure Handover
        </div>
      </div>

      {/* Connector Mobile */}
      <div className="relative flex items-center justify-center h-16 border-b lg:hidden bg-[#1a1713] border-border-subtle">
        <div className="absolute top-0 w-px h-full bg-border-brass left-1/2"></div>
        <div className="z-10 p-2 border rounded-full bg-surface-dark border-primary/30 shadow-sm">
          <ArrowDown className="text-primary animate-pulse" size={20} />
        </div>
      </div>

      {/* Layer 02 */}
      <div>
        <DiagramLayer
          layerNumber="02"
          title="Size Logic Engine"
          label="Client Logic"
          dotColorClass="bg-emerald-500"
          borderColorClass="border-transparent"
          description={
            <>
              <span className="text-text-dim font-medium">// Brand-Owned Ruleset</span>
              <br />
              Applies proprietary fit preferences, ease allowances, and sizing charts to the normalized body data.
            </>
          }
        >
          <div className="p-4 border rounded-xl bg-[#0d0f0e] shadow-md border-emerald-900/50 mt-4 text-text-muted">
            <div className="flex justify-between border-b border-emerald-900/40 pb-2 mb-3">
              <span className="text-text-dim font-bold tracking-wide">LOGIC_KERNEL</span>
              <span className="text-emerald-400 font-bold bg-emerald-950 px-2 py-0.5 rounded-md">v2.1_RELAXED</span>
            </div>
            <div className="space-y-3 font-mono">
              <div className="flex items-start gap-3">
                <span className="text-text-dim mt-0.5">01</span>
                <div>
                  <span className="text-emerald-400 font-bold">IF</span> <span className="text-primary/80">fit_preference</span> == <span className="text-amber-300">{"\"RELAXED\""}</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-text-dim mt-0.5">02</span>
                <div>
                  <span className="text-emerald-400 font-bold">THEN</span> <span className="text-primary/80">chest_ease</span> += <span className="text-amber-300">4.5cm</span>
                </div>
              </div>
              <div className="flex items-start gap-3 border-t border-emerald-900/40 pt-3 mt-3">
                <span className="text-emerald-500 font-bold mt-0.5">&gt;&gt;</span>
                <div>
                  <span className="text-text-dim">OUTPUT:</span> <span className="px-2 py-0.5 font-bold text-background-dark bg-emerald-400 rounded">SIZE L (Regular)</span>
                </div>
              </div>
            </div>
          </div>
        </DiagramLayer>
      </div>
    </div>
  );
};