import React from 'react';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { DiagramLayer } from './DiagramLayer';

export const ArchitectureDiagram: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-0 border border-border-brass relative">
      {/* Decorative corners */}
      <div className="absolute w-3 h-3 border-t border-l -top-1 -left-1 border-primary"></div>
      <div className="absolute w-3 h-3 border-t border-r -top-1 -right-1 border-primary"></div>
      <div className="absolute w-3 h-3 border-b border-l -bottom-1 -left-1 border-primary"></div>
      <div className="absolute w-3 h-3 border-b border-r -bottom-1 -right-1 border-primary"></div>

      {/* Layer 01 */}
      <div className="border-b lg:border-b-0 lg:border-r border-border-brass">
        <DiagramLayer
          layerNumber="01"
          title="Measurement Normalization"
          label="Input Stream"
          dotColorClass="bg-primary"
          description={
            <>
              <span className="opacity-50">// AI-Assisted Processing</span>
              <br />
              Ingests raw scan data, removes artifact noise, and standardizes topology into ISO-compliant metric vectors.
            </>
          }
        >
          <div className="p-4 border bg-terminal-black border-border-brass">
            <div className="flex justify-between border-b border-[#3a3225] pb-2 mb-2">
              <span className="text-[#7a7060]">INPUT_SOURCE</span>
              <span className="text-white">LiDAR_V4</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="text-border-brass text-[10px]">RAW_DATA</div>
                <div className="text-[#b8b0a0]">H: 1824mm</div>
                <div className="text-[#b8b0a0]">C: 1042mm</div>
                <div className="text-[#b8b0a0] opacity-50">N: 24% (High)</div>
              </div>
              <div className="relative space-y-1">
                <div className="absolute top-0 bottom-0 w-px -left-3 bg-border-brass"></div>
                <div className="text-primary text-[10px]">NORMALIZED</div>
                <div className="text-white">H: 182.4cm</div>
                <div className="text-white">C: 104.2cm</div>
                <div className="text-primary">N: 0.2% (Clean)</div>
              </div>
            </div>
          </div>
        </DiagramLayer>
      </div>

      {/* Connector Desktop */}
      <div className="relative flex-col items-center justify-center hidden w-24 lg:flex bg-terminal-black">
        <div className="absolute left-0 w-full h-px bg-border-brass top-1/2"></div>
        <div className="z-10 p-2 border bg-terminal-black border-primary">
          <ArrowRight className="text-primary animate-pulse" size={20} />
        </div>
        <div className="absolute top-1/2 -mt-10 font-mono text-[9px] text-primary rotate-90 tracking-widest uppercase whitespace-nowrap">
          Secure Handover
        </div>
      </div>

      {/* Connector Mobile */}
      <div className="relative flex items-center justify-center h-16 border-b lg:hidden bg-terminal-black border-border-brass">
        <div className="absolute top-0 w-px h-full bg-border-brass left-1/2"></div>
        <div className="z-10 p-2 border bg-terminal-black border-primary">
          <ArrowDown className="text-primary" size={20} />
        </div>
      </div>

      {/* Layer 02 */}
      <div>
        <DiagramLayer
          layerNumber="02"
          title="Size Logic Engine"
          label="Client Logic"
          dotColorClass="bg-border-brass"
          description={
            <>
              <span className="opacity-50">// Brand-Owned Ruleset</span>
              <br />
              Applies proprietary fit preferences, ease allowances, and sizing charts to the normalized body data.
            </>
          }
        >
          <div className="p-4 border bg-terminal-black border-border-brass">
            <div className="flex justify-between border-b border-[#3a3225] pb-2 mb-2">
              <span className="text-[#7a7060]">LOGIC_KERNEL</span>
              <span className="text-white">v2.1_RELAXED</span>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-border-brass mt-0.5">01</span>
                <div>
                  <span className="text-primary">IF</span> <span className="text-[#b8b0a0]">fit_preference</span> == <span className="text-white">"RELAXED"</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-border-brass mt-0.5">02</span>
                <div>
                  <span className="text-primary">THEN</span> <span className="text-[#b8b0a0]">chest_ease</span> += <span className="text-white">4.5cm</span>
                </div>
              </div>
              <div className="flex items-start gap-3 border-t border-[#3a3225] pt-2 mt-2">
                <span className="text-border-brass mt-0.5">&gt;&gt;</span>
                <div>
                  <span className="text-[#b8b0a0]">OUTPUT:</span> <span className="px-1 font-bold text-white bg-primary-dim">SIZE L (Regular)</span>
                </div>
              </div>
            </div>
          </div>
        </DiagramLayer>
      </div>
    </div>
  );
};