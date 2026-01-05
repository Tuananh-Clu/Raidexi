import React from 'react';
import { 
  Eraser, 
  Shuffle, 
  Ruler, 
  Cpu, 
  ArrowLeftRight, 
  RefreshCw 
} from 'lucide-react';
import { FeatureItem } from './FeatureItem';

const LayerGrid: React.FC = () => {
  return (
    <section className="w-full px-6 lg:px-12 py-20 max-w-[1400px]">
      <div className="grid grid-cols-1 gap-0 border lg:grid-cols-2 border-border-subtle bg-background-dark">
        
        {/* Left Column: Normalization */}
        <div className="flex flex-col border-b lg:border-b-0 lg:border-r border-border-subtle">
          <div className="p-8 border-b border-border-subtle bg-surface-dark">
            <h3 className="mb-2 text-2xl font-bold text-white font-display">Measurement Normalization Layer</h3>
            <p className="font-mono text-sm text-text-muted">STEP_01 // PRE_PROCESSING</p>
          </div>
          <div className="flex flex-col gap-8 p-8">
            <FeatureItem 
              icon={<Eraser size={20} />}
              title="Noise Reduction"
              description="Ingests variable cm/inch data points and strips vanity sizing noise from raw brand feeds."
            />
            <FeatureItem 
              icon={<Shuffle size={20} />}
              title="Input Standardization"
              description="Converts all regional formats (EU/US/UK/JP) into a single mathematical schema."
            />
            <FeatureItem 
              icon={<Ruler size={20} />}
              title="ISO Alignment"
              description="Aligns all incoming measurements to current international ISO 8559-1 standards."
            />
          </div>
        </div>
        <div className="flex flex-col">
          <div className="p-8 border-b border-border-subtle bg-surface-dark">
            <h3 className="mb-2 text-2xl font-bold text-white font-display">Brand Sizing Logic Layer</h3>
            <p className="font-mono text-sm text-text-muted">STEP_02 // ALGORITHMIC_RESOLUTION</p>
          </div>
          <div className="flex flex-col gap-8 p-8">
            <FeatureItem 
              icon={<Cpu size={20} />}
              title="Predictive Fit Algorithms"
              description="Applies brand-specific fit maps to generate final size recommendations based on garment cut."
            />
            <FeatureItem 
              icon={<ArrowLeftRight size={20} />}
              title="Conflict Resolution"
              description="Resolves conflicting sizing signals using weighted historical performance data."
            />
            <FeatureItem 
              icon={<RefreshCw size={20} />}
              title="Return Data Integration"
              description="Dynamically adjusts logic parameters by ingesting real-time return rate signals."
            />
          </div>
        </div>

      </div>
    </section>
  );
};


export default LayerGrid;