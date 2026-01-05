import React from 'react';
import { Button } from '../Ui/Button';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative border-b border-border-subtle">
      <div className="grid items-center gap-12 px-6 py-20 mx-auto max-w-7xl lg:py-32 lg:grid-cols-2">
        {/* Left Content */}
        <div className="flex flex-col max-w-2xl gap-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-border-subtle bg-surface-dark w-fit">
              <span className="w-2 h-2 bg-primary animate-pulse"></span>
              <span className="font-mono text-xs tracking-widest uppercase" style={{color: "var(--color-Background)"}}>System Online</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-medium leading-[1.1] tracking-tight text-white">
              Measure your body. <br />
              <span style={{color: "var(--color-Background)"}} className="italic ">Clearly.</span>
            </h2>
            <p className="text-lg text-[#b8b19d] leading-relaxed max-w-md " >
              Accurate body measurements translated into brand-specific sizing. Remove the ambiguity of guessing with objective data.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Button navigation="/Measurements">Start Measurement</Button>
            <Button navigation='/WorkFlow' variant="outline">How it works</Button>
          </div>
        </div>
        
        <div className="relative flex items-center justify-center w-full h-full p-1 border min-h-100 border-border-subtle bg-surface-dark">
          <div 
            className="absolute inset-0 pointer-events-none opacity-10" 
            style={{ 
              backgroundImage: 'linear-gradient(#383429 1px, transparent 1px), linear-gradient(90deg, #383429 1px, transparent 1px)', 
              backgroundSize: '40px 40px' 
            }} 
          />
          <div className="relative z-10 w-full max-w-md p-6 border shadow-none border-border-subtle bg-background-dark">
            <div className="flex justify-between pb-4 mb-6 border-b border-border-subtle">
              <span className="font-mono text-xs uppercase text-primary">Scan ID: #882-X9</span>
              <span className="font-mono text-xs text-text-main">STATUS: ACTIVE</span>
            </div>
            <div className="space-y-4 font-mono text-sm">
              {[
                { label: 'HEIGHT', val: '182.5', width: '88%' },
                { label: 'CHEST', val: '102.0', width: '76%' },
                { label: 'WAIST', val: '86.4', width: '65%' }
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[#b8b19d]">{item.label}</span>
                    <span className="text-white">{item.val} <span className="text-[#534d3c]">CM</span></span>
                  </div>
                  <div className="w-full bg-[#262018] h-1 mb-2">
                    <div className="h-1 " style={{ width: item.width,background: "var(--color-Background)" }}></div>
                  </div>
                </div>
              ))}
              
              <div className="mt-6 border-t border-border-subtle pt-4 text-xs text-[#534d3c] flex justify-between">
                <span>CONFIDENCE SCORE</span>
                <span className="text-primary">99.8%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};