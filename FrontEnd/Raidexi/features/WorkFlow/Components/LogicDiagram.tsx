import React from 'react';
import { 
  Network, 
  ArrowRightToLine, 
  Sliders, 
  Brain, 
  ArrowRightFromLine 
} from 'lucide-react';
import { DiagramNode } from './DìagramNode';
import { Connector } from './Connector';

export const LogicDiagram: React.FC = () => {
  return (
    <section className="w-full px-6 lg:px-12 py-20 max-w-[1400px] border-b border-border-subtle bg-surface-dark relative overflow-hidden">
      {/* Background Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{
          backgroundImage: 'linear-gradient(#d48d11 1px, transparent 1px), linear-gradient(90deg, #d48d11 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      <div className="relative z-10 flex flex-col gap-12">
        <div className="flex flex-col gap-2">
          <h3 className="flex items-center gap-2 font-mono text-sm font-bold tracking-widest text-white uppercase">
            <Network size={16} className="text-primary" />
            System Logic Diagram
          </h3>
          <p className="max-w-lg font-sans text-sm text-text-muted">
            Sequential processing pipeline from raw anthropometric data to deterministic SKU generation.
          </p>
        </div>

        <div className="w-full pb-8 overflow-x-auto scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
          <div className="min-w-[1200px] flex flex-col md:flex-row items-center md:items-start justify-between gap-0">
            
            {/* Step 1: Input */}
            <DiagramNode 
              icon={<ArrowRightToLine size={24} />}
              step="Input"
              title="HUMAN_BODY_DATA"
              subHeader="01. Data Capture"
              description="The system ingests raw anthropometric signals via third-party computer vision APIs or manual tape entries. This stage establishes a baseline coordinate system for the human subject, converting unstructured physical dimensions into a structured, machine-readable JSON payload."
              variant="default"
              cornerMark="top-right"
            />

            <Connector />

            {/* Step 2: Layer 01 */}
            <DiagramNode 
              icon={<Sliders size={24} />}
              step="Layer 01"
              title="AI_NORMALIZATION"
              subHeader="02. Standardization"
              description="Proprietary machine learning algorithms filter incoming data noise and measurement anomalies. This layer normalizes variable scan inputs against the ISO-8559 standard, creating a mathematically perfect 'truth set' required for accurate downstream logic application."
              variant="active"
            />

            <Connector />

            {/* Step 3: Layer 02 */}
            <DiagramNode 
              icon={<Brain size={24} />}
              step="Layer 02"
              title="BRAND_LOGIC"
              subHeader="03. Rule Application"
              description="The engine injects brand-owned grade rules, fabric ease allowances, and fit preference tables. It maps the normalized body coordinates against specific garment specifications to mathematically resolve sizing conflicts and determine optimal fit."
              variant="active"
              pulseReversed
            />

            <Connector />

            {/* Step 4: Output */}
            <DiagramNode 
              icon={<ArrowRightFromLine size={24} />}
              step="Output"
              title="FINAL_OUTPUT"
              subHeader="04. Deterministic SKU"
              description="The system generates a singular, immutable SKU recommendation alongside a confidence interval score. This standardized output is formatted for instant API delivery to ERP systems, warehouse logs, or e-commerce frontends."
              variant="default"
              cornerMark="bottom-left"
            />

          </div>
        </div>
      </div>
    </section>
  );
};