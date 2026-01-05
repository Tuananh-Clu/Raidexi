import React from 'react';

export const StatusTicker: React.FC = () => {
  return (
    <div className="relative z-10 flex py-3 overflow-hidden border-t border-y border-border-brass bg-background-dark whitespace-nowrap">
      <div className="font-mono text-[10px] text-border-brass uppercase tracking-[0.2em] animate-marquee flex gap-16 px-4">
        <span>System Status: Nominal</span>
        <span>Latency: 12ms</span>
        <span>Nodes: 24 Active</span>
        <span>Logic Engine: Brand_Key_044 Verified</span>
        <span>Encryption: AES-256</span>
        <span>System Status: Nominal</span>
        <span>Latency: 12ms</span>
        <span>Nodes: 24 Active</span>
        <span>Logic Engine: Brand_Key_044 Verified</span>
        <span>Encryption: AES-256</span>
      </div>
      <div className="font-mono text-[10px] text-border-brass uppercase tracking-[0.2em] animate-marquee flex gap-16 px-4 absolute left-full top-3"
      >
        <span>System Status: Nominal</span>
        <span>Latency: 12ms</span>
        <span>Nodes: 24 Active</span>
        <span>Logic Engine: Brand_Key_044 Verified</span>
        <span>Encryption: AES-256</span>
        <span>System Status: Nominal</span>
        <span>Latency: 12ms</span>
        <span>Nodes: 24 Active</span>
        <span>Logic Engine: Brand_Key_044 Verified</span>
        <span>Encryption: AES-256</span>
      </div>
    </div>
  );
};