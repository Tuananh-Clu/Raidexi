import React, { useState, useEffect } from 'react';
import { MeasurementData, SystemStatus } from '../types';

interface ControlPanelProps {
  status: SystemStatus;
  data: MeasurementData;
  onToggleGrid: (enabled: boolean) => void;
  onToggleFlash: (enabled: boolean) => void;
  openCamera: boolean;
  setOpenCamera: React.Dispatch<React.SetStateAction<boolean>>;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ 
  status, 
  data, 
  onToggleGrid, 
  onToggleFlash, 
  openCamera,
  setOpenCamera
}) => {
  const [gridEnabled, setGridEnabled] = useState(false);
  const [flashEnabled, setFlashEnabled] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleGridToggle = () => {
    const newState = !gridEnabled;
    setGridEnabled(newState);
    onToggleGrid(newState);
  };

  const handleFlashToggle = () => {
    const newState = !flashEnabled;
    setFlashEnabled(newState);
    onToggleFlash(newState);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  return (
    <div className="bg-panel-dark flex flex-col h-full border-l border-grid-line relative z-10 w-full lg:w-[360px] shrink-0">
      <div className="p-6 border-b border-grid-line">
        <h2 className="mb-1 text-xl font-bold tracking-wide text-white font-display">SESSION DATA</h2>
        <div className="flex items-center justify-between text-[#8a806d] font-mono text-xs">
          <span>ID: {status.id}</span>
          <span>T: {formatTime(currentTime)}</span>
        </div>
      </div>
      <div className="flex-1 p-6 space-y-8 overflow-y-auto custom-scrollbar">
        {/* Status Block */}
        <div className="space-y-3">
          <p className="text-xs font-mono text-[#8a806d] tracking-widest uppercase">Input Status</p>
          <div className="flex items-center gap-3 p-3 border shadow-inner border-grid-line bg-background-dark">
            <span className={`material-symbols-outlined text-xl ${openCamera ? 'animate-pulse text-green-500' : 'text-red-500'}`}>sensors</span>
            <span className={`font-mono text-sm font-bold tracking-widest ${openCamera ? 'text-brass-light' : 'text-[#8a806d]'}`}>
              {openCamera ? 'LIVE FEED ACTIVE' : 'OFFLINE'}
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-end justify-between">
            <p className="text-xs font-mono text-[#8a806d] tracking-widest uppercase">Signal Confidence</p>
            <p className="font-mono text-sm font-bold text-brass-light">{status.signalConfidence}%</p>
          </div>
          <div className="flex w-full h-4 gap-1">
            {Array.from({ length: 10 }).map((_, i) => (
              <div 
                key={i} 
                className={`flex-1 transition-all duration-300 ${
                  i < status.signalConfidence / 10 
                    ? 'bg-brass-light opacity-100 shadow-[0_0_8px_rgba(242,166,13,0.4)]' 
                    : 'bg-brass-light opacity-20'
                }`} 
              />
            ))}
          </div>
        </div>

        {/* Live Metrics Grid */}
        <div className="pt-4 space-y-4 border-t border-grid-line">
          <p className="text-xs font-mono text-[#8a806d] tracking-widest uppercase mb-4">Realtime Metrics</p>
          <div className="grid grid-cols-2 gap-4">
            {data.metrics.map((metric:any) => (
              <div key={metric.id} className="relative p-3 transition-colors border cursor-default bg-background-dark border-grid-line group hover:border-brass">
                <p className="text-[10px] font-mono text-[#8a806d] uppercase mb-1">{metric.label}</p>
                <div className="flex items-baseline gap-1">
                  <span className="font-mono text-xl font-medium text-white">{metric.value.toFixed(1)}</span>
                  <span className="text-[10px] font-mono text-brass-light">{metric.unit}</span>
                </div>
                <div className="absolute top-0 right-0 transition-opacity opacity-0 size-2 bg-brass-light group-hover:opacity-100" />
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-grid-line">
          <div className="bg-brass/10 border border-brass p-4 flex items-center justify-between shadow-[0_0_15px_rgba(194,142,43,0.1)]">
            <div>
              <p className="text-[10px] font-mono text-brass uppercase">Estimated Size</p>
              <p className="mt-1 text-2xl font-bold text-white font-display">{data.estimatedSize} <span className="text-brass-light">/</span> {data.sizeIndex}</p>
            </div>
            <span className="text-3xl material-symbols-outlined text-brass">check_circle</span>
          </div>
        </div>
      </div>
    <div className="p-6 mt-auto space-y-4 border-t border-grid-line bg-background-dark">

        <div className="flex gap-4 mb-2">
          <label className="flex items-center gap-2 cursor-pointer select-none group" onClick={handleGridToggle}>
            <div className={`w-10 h-5 border border-[#8a806d] bg-transparent relative flex items-center px-1 transition-colors group-hover:border-brass ${gridEnabled ? 'justify-end border-brass' : 'justify-start'}`}>
              <div className={`size-3 transition-colors ${gridEnabled ? 'bg-brass-light' : 'bg-[#3a342a]'}`} />
            </div>
            <span className={`text-[10px] font-mono uppercase transition-colors ${gridEnabled ? 'text-white' : 'text-[#8a806d]'}`}>Grid</span>
          </label>
          
          <label className="flex items-center gap-2 cursor-pointer select-none group" onClick={handleFlashToggle}>
            <div className={`w-10 h-5 border border-[#8a806d] bg-transparent relative flex items-center px-1 transition-colors group-hover:border-brass ${flashEnabled ? 'justify-end border-brass' : 'justify-start'}`}>
              <div className={`size-3 transition-colors ${flashEnabled ? 'bg-brass-light' : 'bg-[#3a342a]'}`} />
            </div>
            <span className={`text-[10px] font-mono uppercase transition-colors ${flashEnabled ? 'text-white' : 'text-[#8a806d]'}`}>Flash</span>
          </label>
        </div>

        <button 
        onClick={()=>setOpenCamera((a:boolean)=>!a)}
          className="w-full h-14 bg-brass-light text-background-dark text-lg font-bold font-mono tracking-widest border border-transparent hover:bg-white hover:border-brass-light hover:shadow-[0_0_20px_rgba(242,166,13,0.5)] transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
        >
          <span className="material-symbols-outlined">camera_alt</span>
          {openCamera ? 'CLOSE CAMERA' : 'CAPTURE IMAGE'}
        </button>

        <div className="grid grid-cols-2 gap-3">
          <button className="h-10 bg-transparent border border-[#3a342a] text-[#8a806d] text-xs font-bold font-mono tracking-wider hover:border-white hover:text-white transition-colors">
            RESET
          </button>
          <button className="h-10 bg-transparent border border-[#3a342a] text-[#8a806d] text-xs font-bold font-mono tracking-wider hover:border-white hover:text-white transition-colors">
            CALIBRATE
          </button>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;