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
    <div className={`bg-surface-dark p-8 md:p-12 border border-transparent ${borderColorClass} relative group hover:bg-surface-hover transition-colors duration-500`}>
      <div className={`absolute top-4 right-4 font-mono text-[10px] ${layerNumber === '01' ? 'text-primary border-primary/30' : 'text-text-muted border-border-brass'} border px-2 py-1 uppercase tracking-widest`}>
        {label}
      </div>

      <div className="flex flex-col justify-between h-full gap-12">
        <div>
          <h3 className={`font-mono text-sm ${layerNumber === '01' ? 'text-primary' : 'text-text-muted'} mb-2 tracking-widest uppercase flex items-center gap-2`}>
            <span className={`w-2 h-2 ${dotColorClass}`}></span>
            Layer {layerNumber}
          </h3>
          <h4 className="mb-4 text-2xl font-bold text-white font-display">{title}</h4>
          <div className="pl-4 font-mono text-sm leading-relaxed border-l-2 text-text-muted border-border-brass">
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