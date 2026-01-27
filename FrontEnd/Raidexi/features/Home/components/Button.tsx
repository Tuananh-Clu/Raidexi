"use client";


import { useRouterService } from '@/Shared/Service/routerService';
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'small';
  navigation?: string;
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', navigation, className = '', children, ...props }) => {
  const baseStyles = "font-bold uppercase tracking-widest font-mono border transition-colors";
  const variants = {
    primary: "bg-primary hover:bg-[#d4ac40] text-background-dark px-8 py-4 text-sm border-primary min-w-[200px]",
    outline: "bg-transparent hover:bg-surface-dark text-white px-8 py-4 text-sm border-border-subtle min-w-[200px]",
    small: "bg-primary hover:bg-[#d4ac40] text-background-dark px-5 py-2 text-xs border-primary tracking-wider"
  };
  const { navigate } = useRouterService();
  return (
    <button onClick={() => { if (navigation) { navigate(navigation); } }} className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};