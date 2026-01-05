import React from 'react';
import { InputFieldProps } from '../types';

const InputField: React.FC<InputFieldProps> = ({ label, icon, className = '', ...props }) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label className="font-mono text-xs tracking-widest uppercase text-accent-brass">
        {label}
      </label>
      <div className="relative group">
        <input
          className="w-full bg-[#2a2415] border border-border-brass text-paper-white h-12 px-4 font-mono text-sm focus:outline-none focus:border-accent-brass focus:ring-1 focus:ring-accent-brass transition-all placeholder-[#544c3b]"
          {...props}
        />
        {icon && (
          <span className="absolute right-3 top-3 text-border-brass material-symbols-outlined text-[20px] pointer-events-none">
            {icon}
          </span>
        )}
      </div>
    </div>
  );
};

export default InputField;