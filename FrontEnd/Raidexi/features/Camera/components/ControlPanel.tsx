import React, { useState, useEffect, useContext } from "react";
import { MeasurementData, SystemStatus, ProfileTag } from "../types";
import { BodyMeasureEstimateContext } from "@/provider/BodyMeasureEstimate";
import { useRouterService } from "@/Shared/Service/routerService";
import { useDataMeasure } from "../hooks/useDataMeasure";
import ProfileTagSelector from "./ProfileTagSelector";
import { motion, AnimatePresence } from "framer-motion";
import {
  Video,
  User,
  Scan,
  CheckCircle2,
  Check,
  Shirt,
  ArrowRight,
  Save,
  PlayCircle,
  Power,
  RefreshCw,
  Grid,
  Zap,
} from "lucide-react";

interface ControlPanelProps {
  status: SystemStatus;
  data: MeasurementData;
  onToggleGrid: (enabled: boolean) => void;
  onToggleFlash: (enabled: boolean) => void;
}

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
    icon: Video,
    title: "Bật Camera",
    desc: "Khởi động camera của bạn để bắt đầu",
  },
  {
    step: 2,
    icon: User,
    title: "Chuẩn bị tư thế",
    desc: "Đứng thẳng, dang tay 45° trong khung",
  },
  {
    step: 3,
    icon: Scan,
    title: "Đang đo",
    desc: "Giữ nguyên tư thế trong 15 giây",
  },
  {
    step: 4,
    icon: CheckCircle2,
    title: "Hoàn thành",
    desc: "Số đo đã sẵn sàng để lưu lại",
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
  const [selectedProfile, setSelectedProfile] = useState<ProfileTag | null>(
    null,
  );
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
    <aside aria-label="Bảng điều khiển đo lường" className="bg-white flex flex-col h-full border-l border-slate-200 relative z-10 w-full lg:w-[380px] shrink-0 overflow-hidden shadow-xl font-sans">
      {/* ── Header ── */}
      <header className="px-6 py-5 border-b border-slate-200 shrink-0 bg-white/80 backdrop-blur-md">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold tracking-tight text-slate-800 mb-1">
              Đo số đo cơ thể
            </h2>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
              <span>ID: {status.id}</span>
              <span className="w-1 h-1 rounded-full bg-slate-300" aria-hidden="true" />
              <span>{formatTime(currentTime)}</span>
            </div>
          </div>
          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono font-bold tracking-wide border transition-all duration-300 ${
              context.openCamera
                ? "border-emerald-200 text-emerald-600 bg-emerald-50 shadow-sm"
                : "border-slate-200 text-slate-500 bg-slate-50"
            }`}
            aria-live="polite"
          >
            <span
              className={`w-2 h-2 rounded-full ${
                context.openCamera
                  ? "bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.4)]"
                  : "bg-slate-400"
              }`}
              aria-hidden="true"
            />
            {context.openCamera ? "LIVE" : "OFF"}
          </div>
        </div>
      </header>

      {/* ── Scrollable body ── */}
      <section aria-label="Cài đặt và tiến trình" className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent bg-slate-50/50">
        {/* ─ Profile Tag Selector ─ */}
        <div className="px-6 py-5 border-b border-slate-200 bg-white">
          <h3 className="text-[10px] font-mono text-slate-500 font-semibold uppercase tracking-[0.1em] block mb-3">
            Hồ sơ người dùng
          </h3>
          <ProfileTagSelector
            selectedProfile={selectedProfile}
            onSelectProfile={setSelectedProfile}
            data={data}
          />
        </div>

        {/* ─ Step guide ─ */}
        <div className="px-6 py-6 border-b border-slate-200 bg-white">
          <h3 className="text-[10px] font-mono text-slate-500 font-semibold uppercase tracking-[0.1em] block mb-4">
            Tiến trình
          </h3>
          <div className="space-y-3 relative" role="list">
            <div className="absolute left-[15px] top-4 bottom-4 w-px bg-slate-200 z-0" aria-hidden="true" />
            {STEPS.map(({ step, icon: Icon, title, desc }) => {
              const isDone = step < currentStep;
              const isActive = step === currentStep;
              return (
                <motion.div
                  initial={false}
                  animate={{ opacity: isActive || isDone ? 1 : 0.6 }}
                  key={step}
                  role="listitem"
                  aria-current={isActive ? "step" : undefined}
                  className={`relative z-10 flex items-start gap-4 p-3 rounded-xl border transition-all duration-300 ${
                    isDone
                      ? "border-emerald-100 bg-emerald-50/50"
                      : isActive
                        ? "border-blue-200 bg-blue-50/50 shadow-sm ring-1 ring-blue-100"
                        : "border-transparent hover:bg-slate-50"
                  }`}
                >
                  <div
                    className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors duration-300 bg-white ${
                      isDone
                        ? "border-emerald-400 text-emerald-500"
                        : isActive
                          ? "border-blue-500 text-blue-600 shadow-sm"
                          : "border-slate-200 text-slate-400"
                    }`}
                    aria-hidden="true"
                  >
                    {isDone ? <Check size={14} strokeWidth={3} /> : <Icon size={14} />}
                  </div>
                  <div className="flex-1 min-w-0 pt-1.5">
                    <h4
                      className={`text-sm font-semibold tracking-wide mb-1 ${
                        isDone
                          ? "text-emerald-700"
                          : isActive
                            ? "text-blue-700"
                            : "text-slate-600"
                      }`}
                    >
                      {title}
                    </h4>
                    <p className="text-xs text-slate-500 leading-relaxed pr-2">
                      {desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ─ Countdown / Measuring progress ─ */}
        <AnimatePresence>
          {context.measuring && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="border-b border-slate-200 overflow-hidden"
              aria-live="assertive"
            >
              <div className="px-6 py-6 bg-gradient-to-b from-blue-50 to-white">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[10px] font-mono text-blue-600 font-bold uppercase tracking-[0.1em]">
                    Đang quét số đo
                  </h3>
                  <span className="font-mono text-2xl font-bold text-blue-700 tabular-nums tracking-tighter" aria-label={`Còn lại ${context.countdown?.toFixed(0)} giây`}>
                    {context.countdown?.toFixed(0)}<span className="text-base text-blue-400">s</span>
                  </span>
                </div>
                <div className="flex w-full h-1.5 gap-1 rounded-full overflow-hidden mb-3" aria-hidden="true">
                  {Array.from({ length: 15 }).map((_, i) => (
                    <div
                      key={i}
                      className={`flex-1 rounded-full transition-all duration-300 ${
                        i >= (context.countdown ?? 0)
                          ? "bg-blue-500"
                          : "bg-slate-200"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs text-center font-medium text-blue-600 animate-pulse">
                  Giữ nguyên tư thế — đang xử lý dữ liệu...
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ─ Realtime metrics ─ */}
        <div className="px-6 py-6 border-b border-slate-200 bg-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[10px] font-mono text-slate-500 font-semibold uppercase tracking-[0.1em]">
              Kết quả đo lường
            </h3>
            {hasMeasured && (
              <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-emerald-100 text-emerald-700 border border-emerald-200" role="status">
                HOÀN TẤT
              </span>
            )}
          </div>
          <div className="grid grid-cols-2 gap-3" role="list" aria-label="Danh sách số đo">
            {data.metrics.map((metric: any, idx: number) => (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                key={metric.id}
                role="listitem"
                className={`group relative p-3.5 rounded-xl border transition-all duration-300 ${
                  hasMeasured
                    ? "border-blue-200 bg-blue-50/50 hover:border-blue-300 hover:bg-blue-50"
                    : "border-slate-200 bg-white hover:border-slate-300 shadow-sm"
                }`}
              >
                <p className={`text-[10px] font-mono font-medium uppercase tracking-wider mb-1.5 ${hasMeasured ? "text-blue-600" : "text-slate-500"}`}>
                  {metric.label}
                </p>
                <div className="flex items-baseline gap-1.5">
                  <span
                    className={`font-mono text-2xl font-bold tracking-tight transition-colors ${
                      hasMeasured ? "text-blue-700" : "text-slate-800"
                    }`}
                  >
                    {metric?.value?.toFixed(1) || "0.0"}
                  </span>
                  <span className={`text-[10px] font-mono ${hasMeasured ? "text-blue-500" : "text-slate-400"}`}>
                    {metric.unit}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ─ View toggles ─ */}
        <div className="px-6 py-5 bg-white">
          <div className="flex items-center gap-6">
            {[
              { label: "Lưới", state: gridEnabled, toggle: handleGridToggle, icon: Grid },
              { label: "Flash", state: flashEnabled, toggle: handleFlashToggle, icon: Zap },
            ].map(({ label, state, toggle, icon: Icon }) => (
              <button
                key={label}
                onClick={toggle}
                aria-pressed={state}
                aria-label={`Bật tắt ${label}`}
                className="group flex items-center gap-2.5 text-xs font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded text-slate-600 hover:text-slate-900"
              >
                <div
                  className={`relative flex items-center w-10 h-5 rounded-full transition-colors duration-300 shadow-inner ${
                    state ? "bg-blue-500" : "bg-slate-200"
                  }`}
                  aria-hidden="true"
                >
                  <motion.div
                    layout
                    className={`absolute w-3.5 h-3.5 bg-white rounded-full shadow-sm ${
                      state ? "right-1" : "left-1"
                    }`}
                  />
                </div>
                <span
                  className={`flex items-center gap-1.5 transition-colors`}
                >
                  <Icon size={14} className={state ? "text-blue-500" : "text-slate-400"} aria-hidden="true" />
                  {label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Fixed bottom action area ── */}
      <footer className="shrink-0 border-t border-slate-200 bg-white/95 backdrop-blur-md px-6 py-5 space-y-3 z-20">
        {hasMeasured && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => navigate("/Brand")}
            aria-label="Xem gợi ý thời trang"
            className="group w-full h-12 relative overflow-hidden rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-transform active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-blue-500 text-[#0f172a] shadow-md hover:shadow-lg"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 transition-transform duration-300 group-hover:scale-105" aria-hidden="true" />
            <Shirt size={18} className="relative z-10" aria-hidden="true" />
            <span className="relative z-10 tracking-wide">Xem gợi ý thời trang</span>
            <ArrowRight size={18} className="relative z-10 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </motion.button>
        )}

        {hasMeasured && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => handleSaveMeasure(selectedProfile)}
            aria-label="Lưu số đo cơ thể"
            className="w-full h-11 rounded-xl border border-blue-200 bg-blue-50 text-blue-700 text-sm font-semibold tracking-wide hover:bg-blue-100 transition-all flex items-center justify-center gap-2 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-blue-500 shadow-sm"
          >
            <Save size={16} aria-hidden="true" />
            Lưu số đo
          </motion.button>
        )}

        {!context.measuring && (
          <button
            onClick={() => {
              if (!context.openCamera) {
                context?.setOpenCamera?.(true);
              } else {
                context?.setMeasuring?.(true);
              }
            }}
            aria-label={context.openCamera ? "Bắt đầu đo ngay" : "Bật camera"}
            className={`w-full h-14 rounded-xl text-sm font-bold tracking-wide transition-all flex items-center justify-center gap-2.5 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-blue-500 shadow-sm ${
              context.openCamera
                ? "bg-blue-600 text-[#0f172a] hover:bg-blue-700 hover:shadow-md"
                : "bg-white border border-slate-300 text-slate-700 hover:border-blue-500 hover:text-blue-600"
            }`}
          >
            {context.openCamera ? <PlayCircle size={20} aria-hidden="true" /> : <Video size={20} aria-hidden="true" />}
            {context.openCamera ? "Bắt đầu đo ngay" : "Bật camera"}
          </button>
        )}

        {/* Secondary: Off + Restart */}
        {context.openCamera && !context.measuring && (
          <div className="flex gap-3 pt-1">
            <button
              onClick={() => {
                context?.setOpenCamera?.(false);
                context?.setMeasuring?.(false);
              }}
              aria-label="Tắt camera"
              className="flex-1 h-11 rounded-xl bg-rose-50 text-rose-600 text-xs font-semibold tracking-wide border border-rose-200 hover:bg-rose-600 hover:text-[#0f172a] hover:border-rose-600 transition-all flex items-center justify-center gap-2 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-rose-500"
            >
              <Power size={14} aria-hidden="true" />
              Tắt camera
            </button>
            {hasMeasured && (
              <button
                onClick={() => context?.setCapturedFallback?.(true)}
                aria-label="Đo lại"
                className="flex-1 h-11 rounded-xl bg-slate-50 text-slate-600 text-xs font-semibold tracking-wide border border-slate-200 hover:border-slate-400 hover:text-slate-800 transition-all flex items-center justify-center gap-2 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-slate-500"
              >
                <RefreshCw size={14} aria-hidden="true" />
                Đo lại
              </button>
            )}
          </div>
        )}
      </footer>
    </aside>
  );
};

export default ControlPanel;

