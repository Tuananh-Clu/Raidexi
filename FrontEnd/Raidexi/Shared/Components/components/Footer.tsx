import React from 'react';
import { Button } from '../../../features/Home/Ui/Button';

export const Footer: React.FC = () => {
  return (
    <>
      <section className="relative flex flex-col items-center justify-center px-6 py-32 text-center bg-background-dark">
        <h2 className="mb-8 text-4xl font-medium tracking-tight text-white md:text-5xl">Ready to measure.</h2>
        <Button className="px-10 py-5 min-w-60">Start Measurement</Button>
      </section>

      <footer className="px-6 py-12 border-t border-border-subtle bg-surface-dark">
        <div className="flex flex-col items-start justify-between gap-8 mx-auto max-w-7xl md:flex-row md:items-center">
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-bold tracking-tight text-white">RAIDEXI</h3>
            <p className="text-xs text-[#b8b19d] font-mono max-w-xs">
              Objective body measurement standards for the digital age.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:flex sm:gap-12">
            <div className="flex flex-col gap-3">
              <a href="#" className="text-xs text-[#b8b19d] hover:text-white font-mono uppercase tracking-wider">Terms of Service</a>
              <a href="#" className="text-xs text-[#b8b19d] hover:text-white font-mono uppercase tracking-wider">Privacy Policy</a>
            </div>
            <div className="flex flex-col gap-3">
              <a href="#" className="text-xs text-[#b8b19d] hover:text-white font-mono uppercase tracking-wider">Contact Support</a>
              <a href="#" className="text-xs text-[#b8b19d] hover:text-white font-mono uppercase tracking-wider">Documentation</a>
            </div>
          </div>
        </div>
        <div className="pt-8 mx-auto mt-12 text-center border-t max-w-7xl border-border-subtle md:text-left">
          <p className="text-[10px] text-[#534d3c] font-mono uppercase">
            © 2024 RAIDEXI Systems. All rights reserved. System Build v2.4.1
          </p>
        </div>
      </footer>
    </>
  );
};