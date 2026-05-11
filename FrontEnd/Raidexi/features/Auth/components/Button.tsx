import React from 'react';
import { ButtonProps } from '../types';

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  icon, 
  fullWidth = false, 
  className = '',
  ...props 
}) => {
  const baseStyles = "h-12 px-6 flex items-center justify-center gap-3 font-bold tracking-widest text-sm font-mono uppercase transition-colors";
  
  const variantStyles = {
    primary: "bg-[#2563eb] hover:bg-[#d9950b] text-white mt-2",
    outline: "bg-transparent border border-[#e2e8f0] hover:border-[#cbd5e1] text-[#94a3b8] hover:text-[#0f172a] group"
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button 
      className={`${baseStyles} ${variantStyles[variant]} ${widthClass} ${className}`}
      {...props}
    >
      {icon && (
        <span className={`material-symbols-outlined text-[20px] ${variant === 'outline' ? 'group-hover:text-[#2563eb] transition-colors' : ''}`}>
          {icon}
        </span>
      )}
      <span>{children}</span>
    </button>
  );
};

export default Button;