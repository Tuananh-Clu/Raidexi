import React, { useContext, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Grid,
  PlayCircle,
  Power,
  RefreshCw,
  Ruler,
  Save,
  Scan,
  Shirt,
  User,
  Video,
  Zap,
} from "lucide-react";
import { MeasurementData, ProfileTag, SystemStatus } from "../types";
import { BodyMeasureEstimateContext } from "@/provider/BodyMeasureEstimate";
import { useRouterService } from "@/Shared/Service/routerService";
import { useDataMeasure } from "../hooks/useDataMeasure";
import ProfileTagSelector from "./ProfileTagSelector";

interface ControlPanelProps {
  status: SystemStatus;
  data: MeasurementData;
  onToggleGrid: (enabled: boolean) => void;
  onToggleFlash: (enabled: boolean) => void;
}

const STEPS = [
  { step: 1, icon: Video, title: "Mở camera", desc: "Kích hoạt nguồn hình để dựng khung đo." },
  { step: 2, icon: User, title: "Căn tư thế", desc: "Đứng thẳng, dang tay nhẹ, toàn thân trong vùng chuẩn." },
  { step: 3, icon: Scan, title: "Hiệu chuẩn", desc: "Giữ nguyên tư thế để hệ thống lấy mốc cơ thể." },
  { step: 4, icon: CheckCircle2, title: "Sẵn sàng", desc: "Số đo đã được chuẩn hóa cho gợi ý size." },
];

function getCurrentStep(context: React.ContextType<typeof BodyMeasureEstimateContext>): number {
  const hasMeasured = (context.dataMeasured?.length ?? 0) > 0;
  if (hasMeasured) return 4;
  if (context.measuring) return 3;
  if (context.openCamera) return 2;
  return 1;
}

const motionEase: [number, number, number, number] = [0.32, 0.72, 0, 1];

const ControlPanel: React.FC<ControlPanelProps> = ({ status, data, onToggleGrid, onToggleFlash }) => {
  const [gridEnabled, setGridEnabled] = useState(false);
  const [flashEnabled, setFlashEnabled] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedProfile, setSelectedProfile] = useState<ProfileTag | null>(null);
  const context = useContext(BodyMeasureEstimateContext);
  const { handleSaveMeasure } = useDataMeasure();
  const { navigate } = useRouterService();

  const currentStep = getCurrentStep(context);
  const hasMeasured = (context.dataMeasured?.length ?? 0) > 0;

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) =>
    date.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

  const handleGridToggle = () => {
    const next = !gridEnabled;
    setGridEnabled(next);
    onToggleGrid(next);
  };

  const handleFlashToggle = () => {
    const next = !flashEnabled;
    setFlashEnabled(next);
    onToggleFlash(next);
  };

  const startPrimaryAction = () => {
    if (!context.openCamera) {
      context.setOpenCamera?.(true);
      return;
    }
    context.setMeasuring?.(true);
  };

  const resetCamera = () => {
    context.setOpenCamera?.(false);
    context.setMeasuring?.(false);
  };

  return (
    <aside aria-label="Bảng điều khiển đo lường" className="rx-shell m-4 mt-0 flex min-h-[72vh] w-auto shrink-0 overflow-hidden lg:m-5 lg:ml-0">
      <div className="rx-core flex h-full w-full flex-col overflow-hidden">
        <header className="border-b border-[rgba(24,23,20,0.1)] p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="rx-badge rx-badge-blue">Công cụ đo cơ thể</span>
              <h2 className="mt-3 text-xl font-extrabold text-[var(--ink)]">Đo số đo cơ thể</h2>
              <div className="mt-2 flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase text-[var(--ink-muted)]">
                <span>{status.id}</span>
                <span className="h-1 w-1 rounded-full bg-[rgba(24,23,20,0.25)]" />
                <span>{formatTime(currentTime)}</span>
              </div>
            </div>
            <div className={`rx-badge ${context.openCamera ? "rx-badge-blue" : ""}`} aria-live="polite">
              <span className={`h-1.5 w-1.5 rounded-full ${context.openCamera ? "bg-[var(--signal-blue)]" : "bg-[var(--ink-muted)]"}`} />
              {context.openCamera ? "Đang mở" : "Đã tắt"}
            </div>
          </div>
        </header>

        <section className="flex-1 overflow-y-auto bg-[rgba(24,23,20,0.025)]">
          <div className="border-b border-[rgba(24,23,20,0.1)] bg-[var(--surface-paper)] p-5">
            <p className="rx-label mb-3">Hồ sơ đo</p>
            <ProfileTagSelector selectedProfile={selectedProfile} onSelectProfile={setSelectedProfile} data={data} />
          </div>

          <div className="border-b border-[rgba(24,23,20,0.1)] bg-[var(--surface-paper)] p-5">
            <p className="rx-label mb-4">Tiến trình</p>
            <div className="relative space-y-3" role="list">
              <div className="absolute bottom-5 left-[18px] top-5 w-px bg-[rgba(24,23,20,0.12)]" aria-hidden="true" />
              {STEPS.map(({ step, icon: Icon, title, desc }) => {
                const isDone = step < currentStep;
                const isActive = step === currentStep;
                return (
                  <motion.div
                    key={step}
                    role="listitem"
                    aria-current={isActive ? "step" : undefined}
                    initial={false}
                    animate={{ opacity: isActive || isDone ? 1 : 0.58, y: 0 }}
                    transition={{ duration: 0.42, ease: motionEase }}
                    className={`relative z-10 flex items-start gap-3 rounded-[1.15rem] border p-3 ${
                      isActive
                        ? "border-[var(--signal-blue)] bg-[rgba(93,116,101,0.08)]"
                        : isDone
                          ? "border-[rgba(101,114,98,0.25)] bg-[rgba(101,114,98,0.08)]"
                          : "border-transparent bg-[rgba(255,253,247,0.56)]"
                    }`}
                  >
                    <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border bg-[var(--surface-paper)] ${isActive ? "border-[var(--signal-blue)] text-[var(--signal-blue)]" : isDone ? "border-[var(--sage)] text-[var(--sage)]" : "border-[rgba(24,23,20,0.12)] text-[var(--ink-muted)]"}`}>
                      {isDone ? <Check size={15} strokeWidth={1.35} /> : <Icon size={15} strokeWidth={1.35} />}
                    </span>
                    <span className="min-w-0 pt-1">
                      <span className="block text-sm font-extrabold text-[var(--ink)]">{title}</span>
                      <span className="mt-1 block text-xs leading-relaxed text-[var(--ink-muted)]">{desc}</span>
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <AnimatePresence>
            {context.measuring && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.5, ease: motionEase }}
                className="border-b border-[rgba(24,23,20,0.1)] bg-[rgba(93,116,101,0.08)] p-5"
                aria-live="assertive"
              >
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="rx-label text-[var(--signal-blue)]">Đang hiệu chuẩn</p>
                    <p className="mt-2 text-sm text-[var(--ink-soft)]">Giữ nguyên tư thế để số đo không bị lệch.</p>
                  </div>
                  <span className="font-mono text-4xl font-semibold text-[var(--signal-blue)] tabular-nums">
                    {context.countdown?.toFixed(0)}s
                  </span>
                </div>
                <div className="mt-4 flex gap-1" aria-hidden="true">
                  {Array.from({ length: 15 }).map((_, index) => (
                    <span
                      key={index}
                      className={`h-1.5 flex-1 rounded-full ${index >= (context.countdown ?? 0) ? "bg-[var(--signal-blue)]" : "bg-[rgba(24,23,20,0.14)]"}`}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="border-b border-[rgba(24,23,20,0.1)] bg-[var(--surface-paper)] p-5">
            <div className="mb-4 flex items-center justify-between gap-3">
              <p className="rx-label">Kết quả đo</p>
              {hasMeasured && <span className="rx-badge">Hoàn tất</span>}
            </div>
            <div className="grid grid-cols-2 gap-3" role="list" aria-label="Danh sách số đo">
              {data.metrics.map((metric, index) => (
                <motion.div
                  key={metric.id}
                  role="listitem"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.025, duration: 0.42, ease: motionEase }}
                  className={`rounded-[1.2rem] border p-3 ${hasMeasured ? "border-[rgba(93,116,101,0.24)] bg-[rgba(93,116,101,0.06)]" : "border-[rgba(24,23,20,0.1)] bg-[rgba(255,253,247,0.72)]"}`}
                >
                  <p className="font-mono text-[10px] uppercase text-[var(--ink-muted)]">{metric.label}</p>
                  <div className="mt-1 flex items-baseline gap-1.5">
                    <span className="font-mono text-2xl font-semibold text-[var(--ink)] tabular-nums">
                      {Number(metric.value || 0).toFixed(1)}
                    </span>
                    <span className="font-mono text-[10px] uppercase text-[var(--ink-muted)]">{metric.unit}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="bg-[var(--surface-paper)] p-5">
            <p className="rx-label mb-3">Chế độ hiển thị</p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Lưới", state: gridEnabled, toggle: handleGridToggle, icon: Grid },
                { label: "Flash", state: flashEnabled, toggle: handleFlashToggle, icon: Zap },
              ].map(({ label, state, toggle, icon: Icon }) => (
                <button
                  key={label}
                  onClick={toggle}
                  aria-pressed={state}
                  className={`rx-btn justify-between ${state ? "rx-btn-primary" : "rx-btn-secondary"}`}
                  type="button"
                >
                  <span className="inline-flex items-center gap-2">
                    <Icon size={14} strokeWidth={1.35} />
                    {label}
                  </span>
                  <span className={`h-2 w-2 rounded-full ${state ? "bg-[var(--surface-paper)]" : "bg-[var(--ink-muted)]"}`} />
                </button>
              ))}
            </div>
          </div>
        </section>

        <footer className="space-y-3 border-t border-[rgba(24,23,20,0.1)] bg-[var(--surface-paper)] p-5">
          {hasMeasured && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.42, ease: motionEase }}
              onClick={() => navigate("/Brand")}
              className="rx-btn rx-btn-primary w-full"
              aria-label="Xem gợi ý size"
              type="button"
            >
              <Shirt size={16} strokeWidth={1.35} />
              Xem gợi ý size
              <ArrowRight size={16} strokeWidth={1.35} />
            </motion.button>
          )}

          {hasMeasured && (
            <button onClick={() => handleSaveMeasure(selectedProfile)} className="rx-btn rx-btn-secondary w-full" aria-label="Lưu số đo" type="button">
              <Save size={15} strokeWidth={1.35} />
              Lưu số đo
            </button>
          )}

          {!context.measuring && (
            <button
              onClick={startPrimaryAction}
              className={`rx-btn w-full ${context.openCamera ? "rx-btn-primary" : "rx-btn-secondary"}`}
              aria-label={context.openCamera ? "Bắt đầu đo ngay" : "Mở camera"}
              type="button"
            >
              {context.openCamera ? <PlayCircle size={18} strokeWidth={1.35} /> : <Video size={18} strokeWidth={1.35} />}
              {context.openCamera ? "Bắt đầu đo ngay" : "Mở camera"}
            </button>
          )}

          {context.openCamera && !context.measuring && (
            <div className="grid grid-cols-2 gap-3">
              <button onClick={resetCamera} className="rx-btn rx-btn-danger" aria-label="Tắt camera" type="button">
                <Power size={14} strokeWidth={1.35} />
                Tắt
              </button>
              {hasMeasured && (
                <button onClick={() => context.setCapturedFallback?.(true)} className="rx-btn rx-btn-secondary" aria-label="Đo lại" type="button">
                  <RefreshCw size={14} strokeWidth={1.35} />
                  Đo lại
                </button>
              )}
            </div>
          )}
        </footer>
      </div>
    </aside>
  );
};

export default ControlPanel;
