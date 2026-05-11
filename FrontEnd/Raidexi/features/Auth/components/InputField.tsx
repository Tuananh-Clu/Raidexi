import React from 'react';
import { InputFieldProps } from '../types';

const InputField: React.FC<InputFieldProps> = ({ label, icon, className = '', ...props }) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label className="font-mono text-xs tracking-widest uppercase text-[#2563eb]">
        {label}
      </label>
      <div className="relative group">
        <input
          className="w-full bg-[#f1f5f9] border border-[#e2e8f0] text-[#0f172a] h-12 px-4 font-mono text-sm focus:outline-none focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb] transition-all placeholder-[#cbd5e1]"
          {...props}
        />
        {icon && (
          <span className="absolute right-3 top-3 text-border-[#2563eb] material-symbols-outlined text-[20px] pointer-events-none">
            {icon}
          </span>
        )}
      </div>
    </div>
  );
};

export default InputField;