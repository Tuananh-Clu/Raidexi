import React from 'react';


export const DiagramLayer: React.FC<DiagramLayerProps> = ({
  layerNumber,
  title,
  description,
  label,
  borderColorClass = 'border-border-brass',
  dotColorClass,
  children
}) => {
  return (
    <div className={`bg-surface-dark p-8 md:p-12 border border-transparent ${borderColorClass} relative group hover:bg-surface-hover hover:shadow-sm transition-all duration-300 rounded-2xl`}>
      <div className={`absolute top-4 right-4 font-mono text-[10px] font-bold ${layerNumber === '01' ? 'text-primary border-primary/30 bg-primary/10' : 'text-text-dim border-border-subtle bg-surface-dark'} border px-2 py-1 uppercase tracking-widest rounded`}>
        {label}
      </div>

      <div className="flex flex-col justify-between h-full gap-12">
        <div>
          <h3 className={`font-mono text-xs font-bold ${layerNumber === '01' ? 'text-primary' : 'text-text-dim'} mb-2 tracking-widest uppercase flex items-center gap-2`}>
            <span className={`w-2 h-2 rounded-full ${dotColorClass}`}></span>
            Layer {layerNumber}
          </h3>
          <h4 className="mb-4 text-2xl font-bold text-white tracking-tight">{title}</h4>
          <div className="pl-4 text-sm leading-relaxed border-l-2 text-text-muted border-border-subtle">
            {description}
          </div>
        </div>
        <div className="space-y-3 font-mono text-xs">
          {children}
        </div>
      </div>
    </div>
  );
};