import React from 'react';
import { InputGroupProps } from '../types';



export const InputGroup: React.FC<InputGroupProps> = ({
  id,
  label,
  type,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label
        className="font-mono text-xs tracking-widest uppercase text-primary"
        htmlFor={id}
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        className="w-full bg-[#2a2415]  border border-border-dark text-white p-4 h-14 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none placeholder:text-[#544d3b] rounded-sm transition-colors font-sans text-lg"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};