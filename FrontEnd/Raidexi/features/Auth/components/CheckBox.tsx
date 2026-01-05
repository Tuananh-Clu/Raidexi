import React from 'react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, ...props }) => {
  return (
    <label className="flex items-center gap-3 cursor-pointer group">
      <div className="relative flex items-center">
        <input 
          type="checkbox"
          className="w-4 h-4 transition-colors border appearance-none peer border-border-brass bg-input-bg checked:bg-accent-brass checked:border-accent-brass focus:ring-0 focus:ring-offset-0"
          {...props}
        />
        <span className="absolute inset-0 flex items-center justify-center text-sm text-black opacity-0 pointer-events-none material-symbols-outlined peer-checked:opacity-100">
          check
        </span>
      </div>
      <span className="text-sm transition-colors text-text-dim font-display group-hover:text-paper-white">
        {label}
      </span>
    </label>
  );
};

export default Checkbox;