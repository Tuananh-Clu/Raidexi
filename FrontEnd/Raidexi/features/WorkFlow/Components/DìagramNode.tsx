export const DiagramNode: React.FC<DiagramNodeProps> = ({ 
  icon, 
  step, 
  title, 
  subHeader, 
  description, 
  variant = 'default',
  cornerMark = 'none',
  pulseReversed = false
}) => {
  const isDefault = variant === 'default';
  
  return (
    <div className="flex flex-col gap-4 w-72 shrink-0 group">
      <div 
        className={`
          h-36 p-6 flex flex-col gap-4 relative transition-colors duration-300
          ${isDefault 
            ? 'border border-border-subtle bg-background-dark group-hover:border-primary' 
            : 'border border-primary bg-[#1a160f] shadow-[0_0_15px_-5px_rgba(212,141,17,0.1)]'
          }
        `}
      >
        <span className={`${isDefault ? 'text-text-muted group-hover:text-primary' : 'text-primary'}`}>
          {icon}
        </span>
        
        <div className="flex flex-col">
          <span className="mb-1 font-mono text-xs uppercase text-primary">{step}</span>
          <span className="font-mono text-sm font-bold text-white">{title}</span>
        </div>

        {/* Decorative Corner Marks */}
        {cornerMark === 'top-right' && (
          <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-primary"></div>
        )}
        {cornerMark === 'bottom-left' && (
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-primary"></div>
        )}

        {/* Active Decoration */}
        {!isDefault && (
          <>
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-primary/20"></div>
            <div className="flex gap-1 mt-1">
              <div className={`h-1 w-1 bg-primary ${pulseReversed ? '' : ''}`}></div>
              <div className={`h-1 w-1 bg-primary ${pulseReversed ? 'opacity-30' : 'animate-pulse'}`}></div>
              <div className={`h-1 w-1 bg-primary ${pulseReversed ? 'animate-pulse' : 'opacity-30'}`}></div>
            </div>
          </>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <span className="font-mono text-xs tracking-wider uppercase text-primary">
          {subHeader}
        </span>
        <p className="pl-4 font-sans text-sm leading-relaxed text-justify border-l text-text-muted border-border-subtle">
          {description}
        </p>
      </div>
    </div>
  );
};