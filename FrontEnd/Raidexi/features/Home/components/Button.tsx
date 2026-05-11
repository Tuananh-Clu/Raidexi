"use client";


import { useRouterService } from '@/Shared/Service/routerService';
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'small';
  navigation?: string;
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', navigation, className = '', children, ...props }) => {
  const baseStyles = "font-semibold tracking-wide transition-all duration-300 rounded-2xl cursor-pointer";
  const variants = {
    primary: "bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] hover:from-[#1d4ed8] hover:to-[#1e40af] text-[#0f172a] px-8 py-4 text-sm shadow-lg shadow-[#2563eb]/20 hover:shadow-xl hover:shadow-[#2563eb]/30 hover:-translate-y-0.5 min-w-[200px]",
    outline: "bg-white/60 backdrop-blur-sm hover:bg-white text-[#2563eb] px-8 py-4 text-sm border border-[#2563eb]/20 hover:border-[#2563eb]/40 hover:shadow-lg hover:-translate-y-0.5 min-w-[200px]",
    small: "bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] hover:from-[#1d4ed8] hover:to-[#1e40af] text-[#0f172a] px-5 py-2 text-xs shadow-md shadow-[#2563eb]/15 hover:shadow-lg hover:-translate-y-0.5"
  };
  const { navigate } = useRouterService();
  return (
    <button onClick={() => { if (navigation) { navigate(navigation); } }} className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};