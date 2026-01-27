import React, { useState, useEffect, useContext } from "react";
import { MeasurementData, SystemStatus } from "../types";
import { BodyMeasureEstimateContext } from "@/provider/BodyMeasureEstimate";
import { useRouterService } from "@/Shared/Service/routerService";
import { useDataMeasure } from "../hooks/useDataMeasure";



interface ControlPanelProps {
  status: SystemStatus;
  data: MeasurementData;
  onToggleGrid: (enabled: boolean) => void;
  onToggleFlash: (enabled: boolean) => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  status,
  data,
  onToggleGrid,
  onToggleFlash,
}) => {
  const [gridEnabled, setGridEnabled] = useState(false);
  const [flashEnabled, setFlashEnabled] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const context = useContext(BodyMeasureEstimateContext);
  const { handleSaveMeasure } = useDataMeasure();
  const {navigate}=useRouterService();
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
    return date.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <div className="bg-panel-dark flex flex-col h-full border-l border-grid-line relative z-10 w-full lg:w-[360px] shrink-0 overflow-y-scroll">
      <div className="p-6 border-b border-grid-line">
        <div className="flex flex-row items-start justify-between mb-3">
          <h2 className="text-xl font-bold tracking-wide text-white font-display">
            SESSION DATA
          </h2>
        </div>
        <div className="flex items-center justify-between text-[#8a806d] font-mono text-xs">
          <span>ID: {status.id}</span>
          <span>T: {formatTime(currentTime)}</span>
        </div>
      </div>

      <div className="flex-1 p-6 space-y-8 overflow-y-auto custom-scrollbar">
        {/* Status Block */}
        <div className="space-y-3">
          <p className="text-xs font-mono text-[#8a806d] tracking-widest uppercase">
            Input Status
          </p>
          <div className="flex items-center gap-3 p-3 border shadow-inner border-grid-line bg-background-dark">
            <span
              className={`material-symbols-outlined text-xl ${
                context.openCamera
                  ? "animate-pulse text-green-500"
                  : "text-red-500"
              }`}
            >
              sensors
            </span>
            <span
              className={`font-mono text-sm font-bold tracking-widest ${
                context.openCamera ? "text-brass-light" : "text-[#8a806d]"
              }`}
            >
              {context.openCamera ? "LIVE FEED ACTIVE" : "OFFLINE"}
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-end justify-between">
            <p className="text-xs font-mono text-[#8a806d] tracking-widest uppercase">
              Time to Measure
            </p>
            <p className="font-mono text-sm font-bold text-brass-light">
              {context.countdown?.toFixed(0)}s
            </p>
          </div>
          <div className="flex w-full h-4 gap-1">
            {Array.from({ length: 15 }).map((_, i) => (
              <div
                key={i}
                className={`flex-1 transition-all duration-300 shadow-[0_0_8px_rgba(242,166,13,0.4)] ${
                  i >= context.countdown!
                    ? "bg-white opacity-100 "
                    : "bg-primary opacity-50"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="pt-4 space-y-4 border-t border-grid-line">
          <p className="text-xs font-mono text-[#8a806d] tracking-widest uppercase mb-4">
            Realtime Metrics
          </p>
          <div className="grid grid-cols-2 gap-4">
            {data.metrics.map((metric: any) => (
              <div
                key={metric.id}
                className="relative p-3 transition-colors border cursor-default bg-background-dark border-grid-line group hover:border-brass"
              >
                <p className="text-[10px] font-mono text-[#8a806d] uppercase mb-1">
                  {metric.label}
                </p>
                <div className="flex items-baseline gap-1">
                  <span className="font-mono text-xl font-medium text-white">
                    {metric.value.toFixed(1)}
                  </span>
                  <span className="text-[10px] font-mono text-brass-light">
                    {metric.unit}
                  </span>
                </div>
                <div className="absolute top-0 right-0 transition-opacity opacity-0 size-2 bg-brass-light group-hover:opacity-100" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Brand Fit CTA - Fixed position, chỉ hiện khi đo xong */}
      {context.dataMeasured && Object.keys(context.dataMeasured).length > 0 && (
        <div className="px-6 py-3 border-t border-grid-line bg-gradient-to-b from-background-dark to-panel-dark">
          <div className="relative p-3 overflow-hidden transition-all duration-300 border-2 rounded bg-gradient-to-br from-primary/20 to-brass-light/10 border-primary group hover:border-brass-light">
            {/* Decorative element */}
            <div className="absolute top-0 right-0 w-12 h-12 transform rotate-45 translate-x-6 -translate-y-6 bg-primary/30" />
            
            <div className="relative z-10 flex items-center justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-base material-symbols-outlined text-brass-light">
                    checkroom
                  </span>
                  <p className="text-[10px] font-mono text-brass-light tracking-widest uppercase">
                    Ready for Next Step
                  </p>
                </div>
                <h3 className="text-sm font-bold text-white font-display">
                  Find Your Perfect Fit
                </h3>
              </div>
              
              <button
                onClick={() => navigate("/Brand")}
                className="px-4 h-10 bg-primary text-background-dark font-bold font-mono text-sm tracking-wider border-2 border-transparent hover:bg-white hover:border-brass-light hover:shadow-[0_0_20px_rgba(242,166,13,0.6)] transition-all flex items-center justify-center gap-2 group-hover:scale-[1.05] active:scale-[0.95] whitespace-nowrap"
              >
                <span>ANALYZE</span>
                <span className="text-base material-symbols-outlined">
                  arrow_forward
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Save Measurements Button */}
      {context.dataMeasured && (
        <div className="px-6 pt-3 pb-2 border-t border-grid-line">
          <button
            onClick={handleSaveMeasure}
            className="h-12 w-full cursor-pointer bg-background-dark text-brass-light text-sm font-bold font-mono tracking-widest border-2 border-grid-line hover:border-primary hover:bg-primary hover:text-background-dark hover:shadow-[0_0_15px_rgba(242,166,13,0.3)] transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
          >
            <span className="text-lg material-symbols-outlined">save</span>
            <span>SAVE DATA</span>
          </button>
        </div>
      )}

      {/* Controls Section - Always visible */}
      <div className="p-6 space-y-2 border-t border-grid-line bg-background-dark">
        <div className="flex gap-4 mb-2">
          <label
            className="flex items-center gap-2 cursor-pointer select-none group"
            onClick={handleGridToggle}
          >
            <div
              className={`w-10 h-5 border border-[#8a806d] bg-transparent relative flex items-center px-1 transition-colors group-hover:border-brass ${
                gridEnabled ? "justify-end border-brass" : "justify-start"
              }`}
            >
              <div
                className={`size-3 transition-colors ${
                  gridEnabled ? "bg-brass-light" : "bg-[#3a342a]"
                }`}
              />
            </div>
            <span
              className={`text-[10px] font-mono uppercase transition-colors ${
                gridEnabled ? "text-white" : "text-[#8a806d]"
              }`}
            >
              Grid
            </span>
          </label>

          <label
            className="flex items-center gap-2 cursor-pointer select-none group"
            onClick={handleFlashToggle}
          >
            <div
              className={`w-10 h-5 border border-[#8a806d] bg-transparent relative flex items-center px-1 transition-colors group-hover:border-brass ${
                flashEnabled ? "justify-end border-brass" : "justify-start"
              }`}
            >
              <div
                className={`size-3 transition-colors ${
                  flashEnabled ? "bg-brass-light" : "bg-[#3a342a]"
                }`}
              />
            </div>
            <span
              className={`text-[10px] font-mono uppercase transition-colors ${
                flashEnabled ? "text-white" : "text-[#8a806d]"
              }`}
            >
              Flash
            </span>
          </label>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => {
              if (context.openCamera === false) {
                context?.setOpenCamera?.(true);
                return;
              }
              context?.setMeasuring?.(true);
            }}
            className="w-full h-14 cursor-pointer bg-primary text-background-dark text-lg font-bold font-mono tracking-widest border border-transparent hover:bg-white hover:border-brass-light hover:shadow-[0_0_20px_rgba(242,166,13,0.5)] transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
          >
            <span className="material-symbols-outlined">camera_alt</span>
            {context.openCamera ? "START ESTIMATE" : "CAPTURE IMAGE"}
          </button>

          {context.openCamera && (
            <div className="space-y-3">
              <button
                onClick={() => {
                  context?.setOpenCamera?.(false);
                  context?.setMeasuring?.(false);
                }}
                className="w-full h-12 cursor-pointer bg-red-600 text-white text-base font-bold font-mono tracking-widest border border-transparent hover:bg-red-700 hover:shadow-[0_0_20px_rgba(255,0,0,0.5)] transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
              >
                <span className="text-lg material-symbols-outlined">power_settings_new</span>
                <span>OFF</span>
              </button>
              {context.dataMeasured &&
                Object.keys(context.dataMeasured).length > 0 && (
                  <button
                    className="w-full h-12 cursor-pointer bg-gray-800 text-white text-base font-bold font-mono tracking-widest border border-transparent hover:bg-primary hover:text-background-dark hover:shadow-[0_0_20px_rgba(242,166,13,0.5)] transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
                    onClick={() => {
                      context?.setCapturedFallback?.(true);
                    }}
                  >
                    <span className="text-lg material-symbols-outlined">restart_alt</span>
                    <span>RESTART</span>
                  </button>
                )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;