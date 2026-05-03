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

// Determine the current step (1-4) based on context state
function getCurrentStep(context: any): number {
  const hasMeasured =
    !!context.dataMeasured && Object.keys(context.dataMeasured).length > 0;
  if (hasMeasured) return 4;
  if (context.measuring) return 3;
  if (context.openCamera) return 2;
  return 1;
}

const STEPS = [
  {
    step: 1,
    icon: "videocam",
    title: "Bật Camera",
    desc: "Nhấn nút bên dưới để khởi động camera của bạn",
  },
  {
    step: 2,
    icon: "accessibility_new",
    title: "Chuẩn bị tư thế",
    desc: "Đứng thẳng, dang tay 45°, đảm bảo toàn thân trong khung hình",
  },
  {
    step: 3,
    icon: "self_improvement",
    title: "Đứng im — Đang đo",
    desc: "Giữ nguyên tư thế trong 15 giây để hệ thống ghi nhận số đo",
  },
  {
    step: 4,
    icon: "check_circle",
    title: "Hoàn thành!",
    desc: "Số đo đã sẵn sàng. Lưu lại và xem gợi ý thời trang phù hợp",
  },
];

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
  const { navigate } = useRouterService();

  const currentStep = getCurrentStep(context);
  const hasMeasured =
    !!context.dataMeasured && Object.keys(context.dataMeasured).length > 0;

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

  const formatTime = (date: Date) =>
    date.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

  return (
    <div className="bg-panel-dark flex flex-col h-full border-l border-grid-line relative z-10 w-full lg:w-[360px] shrink-0 overflow-hidden">
      {/* ── Header ── */}
      <div className="px-5 py-4 border-b border-grid-line shrink-0">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold tracking-wide text-white font-display">
              Đo số đo cơ thể
            </h2>
            <p className="text-[10px] font-mono text-[#8a806d] mt-0.5">
              ID: {status.id} · {formatTime(currentTime)}
            </p>
          </div>
          {/* Camera live indicator */}
          <div
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider border transition-all duration-500 ${
              context.openCamera
                ? "border-green-500/50 text-green-400 bg-green-900/20"
                : "border-[#8a806d]/30 text-[#8a806d] bg-transparent"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                context.openCamera
                  ? "bg-green-400 animate-pulse"
                  : "bg-[#8a806d]"
              }`}
            />
            {context.openCamera ? "LIVE" : "OFF"}
          </div>
        </div>
      </div>

      {/* ── Scrollable body ── */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {/* ─ Step guide ─ */}
        <div className="px-5 py-4 space-y-2 border-b border-grid-line">
          <p className="text-[10px] font-mono text-[#8a806d] tracking-[0.2em] uppercase mb-3">
            Các bước thực hiện
          </p>
          {STEPS.map(({ step, icon, title, desc }) => {
            const isDone = step < currentStep;
            const isActive = step === currentStep;
            return (
              <div
                key={step}
                className={`relative flex items-start gap-3 p-3 rounded-sm border transition-all duration-300 ${
                  isDone
                    ? "border-green-700/40 bg-green-950/20"
                    : isActive
                    ? "border-primary/60 bg-primary/8 shadow-[0_0_16px_rgba(242,166,13,0.1)]"
                    : "border-grid-line/50 bg-transparent opacity-35"
                }`}
              >
                {/* Left accent bar */}
                {isActive && (
                  <div className="absolute left-0 inset-y-0 w-[3px] rounded-l-sm bg-primary" />
                )}

                {/* Step badge */}
                <div
                  className={`shrink-0 w-7 h-7 rounded-sm flex items-center justify-center text-[11px] font-mono font-bold border transition-all ${
                    isDone
                      ? "border-green-500/60 bg-green-900/30 text-green-400"
                      : isActive
                      ? "border-primary bg-primary/20 text-primary"
                      : "border-[#8a806d]/40 text-[#8a806d]"
                  }`}
                >
                  {isDone ? (
                    <span className="material-symbols-outlined text-[15px]">
                      check
                    </span>
                  ) : (
                    step
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span
                      className={`material-symbols-outlined text-[15px] ${
                        isDone
                          ? "text-green-400"
                          : isActive
                          ? "text-primary"
                          : "text-[#8a806d]"
                      }`}
                    >
                      {icon}
                    </span>
                    <span
                      className={`text-xs font-bold tracking-wide ${
                        isDone
                          ? "text-green-400"
                          : isActive
                          ? "text-white"
                          : "text-[#8a806d]"
                      }`}
                    >
                      {title}
                    </span>
                  </div>
                  <p
                    className={`text-[10px] leading-relaxed ${
                      isDone
                        ? "text-green-600/70"
                        : isActive
                        ? "text-brass-light/70"
                        : "text-[#8a806d]/50"
                    }`}
                  >
                    {desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* ─ Countdown / Measuring progress ─ */}
        {context.measuring && (
          <div className="px-5 py-4 border-b border-grid-line space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-mono text-[#8a806d] tracking-[0.2em] uppercase">
                Thời gian đo còn lại
              </p>
              <span className="font-mono text-lg font-bold text-primary tabular-nums">
                {context.countdown?.toFixed(0)}s
              </span>
            </div>
            {/* Bar */}
            <div className="flex w-full h-2 gap-[3px] rounded-full overflow-hidden">
              {Array.from({ length: 15 }).map((_, i) => (
                <div
                  key={i}
                  className={`flex-1 rounded-full transition-all duration-300 ${
                    i >= (context.countdown ?? 0)
                      ? "bg-white/90"
                      : "bg-primary/40"
                  }`}
                />
              ))}
            </div>
            <p className="text-[10px] text-center font-mono text-brass-light/60 animate-pulse">
              Giữ nguyên tư thế — đừng di chuyển!
            </p>
          </div>
        )}

        {/* ─ Realtime metrics ─ */}
        <div className="px-5 py-4 border-b border-grid-line">
          <p className="text-[10px] font-mono text-[#8a806d] tracking-[0.2em] uppercase mb-3">
            Số đo {hasMeasured ? "đã ghi nhận" : "thời gian thực"}
          </p>
          <div className="grid grid-cols-2 gap-2.5">
            {data.metrics.map((metric: any) => (
              <div
                key={metric.id}
                className={`relative p-3 border rounded-sm transition-all duration-300 ${
                  hasMeasured
                    ? "border-primary/40 bg-primary/5"
                    : "border-grid-line bg-background-dark"
                }`}
              >
                <p className="text-[9px] font-mono text-[#8a806d] uppercase mb-1 tracking-wider">
                  {metric.label}
                </p>
                <div className="flex items-baseline gap-1">
                  <span
                    className={`font-mono text-xl font-semibold ${
                      hasMeasured ? "text-primary" : "text-white/50"
                    }`}
                  >
                    {metric?.value?.toFixed(1)}
                  </span>
                  <span className="text-[9px] font-mono text-brass-light/60">
                    {metric.unit}
                  </span>
                </div>
                {hasMeasured && (
                  <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-green-400 rounded-full" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ─ View toggles ─ */}
        <div className="px-5 py-3 border-b border-grid-line">
          <div className="flex items-center gap-5">
            <button
              onClick={handleGridToggle}
              className={`flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider transition-colors ${
                gridEnabled ? "text-white" : "text-[#8a806d]"
              }`}
            >
              <div
                className={`w-8 h-4 border rounded-full relative transition-all ${
                  gridEnabled ? "border-primary bg-primary/20" : "border-[#8a806d]/40"
                }`}
              >
                <div
                  className={`absolute top-0.5 w-3 h-3 rounded-full transition-all duration-200 ${
                    gridEnabled
                      ? "left-[calc(100%-14px)] bg-primary"
                      : "left-0.5 bg-[#8a806d]/50"
                  }`}
                />
              </div>
              Lưới
            </button>
            <button
              onClick={handleFlashToggle}
              className={`flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider transition-colors ${
                flashEnabled ? "text-white" : "text-[#8a806d]"
              }`}
            >
              <div
                className={`w-8 h-4 border rounded-full relative transition-all ${
                  flashEnabled ? "border-primary bg-primary/20" : "border-[#8a806d]/40"
                }`}
              >
                <div
                  className={`absolute top-0.5 w-3 h-3 rounded-full transition-all duration-200 ${
                    flashEnabled
                      ? "left-[calc(100%-14px)] bg-primary"
                      : "left-0.5 bg-[#8a806d]/50"
                  }`}
                />
              </div>
              Flash
            </button>
          </div>
        </div>
      </div>

      {/* ── Fixed bottom action area ── */}
      <div className="shrink-0 border-t border-grid-line bg-background-dark px-5 py-4 space-y-2.5">
        {/* After measurement: CTA to Brand page */}
        {hasMeasured && (
          <button
            onClick={() => navigate("/Brand")}
            className="w-full h-12 bg-gradient-to-r from-primary to-brass-light text-background-dark font-bold text-sm tracking-wider flex items-center justify-center gap-2 rounded-sm hover:opacity-90 hover:shadow-[0_0_24px_rgba(242,166,13,0.5)] transition-all active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-lg">checkroom</span>
            <span>Xem gợi ý thời trang</span>
            <span className="material-symbols-outlined text-base">
              arrow_forward
            </span>
          </button>
        )}

        {/* Save button */}
        {hasMeasured && (
          <button
            onClick={handleSaveMeasure}
            className="w-full h-10 cursor-pointer bg-transparent text-brass-light text-sm font-mono tracking-wider border border-grid-line hover:border-primary hover:text-white transition-all flex items-center justify-center gap-2 rounded-sm active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-base">save</span>
            <span>Lưu số đo</span>
          </button>
        )}

        {/* Main action button */}
        {!context.measuring && (
          <button
            onClick={() => {
              if (!context.openCamera) {
                context?.setOpenCamera?.(true);
              } else {
                context?.setMeasuring?.(true);
              }
            }}
            className="w-full h-14 cursor-pointer bg-primary text-background-dark text-base font-bold tracking-wider rounded-sm border-2 border-transparent hover:bg-white hover:border-primary hover:shadow-[0_0_24px_rgba(242,166,13,0.5)] transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-xl">
              {context.openCamera ? "play_circle" : "videocam"}
            </span>
            {context.openCamera ? "Bắt đầu đo ngay" : "Bật camera"}
          </button>
        )}

        {/* Secondary: Off + Restart */}
        {context.openCamera && !context.measuring && (
          <div className="flex gap-2">
            <button
              onClick={() => {
                context?.setOpenCamera?.(false);
                context?.setMeasuring?.(false);
              }}
              className="flex-1 h-10 cursor-pointer bg-transparent text-red-400 text-xs font-mono tracking-wider border border-red-800/50 hover:bg-red-900/20 hover:border-red-500 transition-all flex items-center justify-center gap-1.5 rounded-sm active:scale-[0.98]"
            >
              <span className="material-symbols-outlined text-base">
                power_settings_new
              </span>
              Tắt camera
            </button>
            {hasMeasured && (
              <button
                onClick={() => context?.setCapturedFallback?.(true)}
                className="flex-1 h-10 cursor-pointer bg-transparent text-[#8a806d] text-xs font-mono tracking-wider border border-grid-line hover:border-primary hover:text-white transition-all flex items-center justify-center gap-1.5 rounded-sm active:scale-[0.98]"
              >
                <span className="material-symbols-outlined text-base">
                  restart_alt
                </span>
                Đo lại
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ControlPanel;
