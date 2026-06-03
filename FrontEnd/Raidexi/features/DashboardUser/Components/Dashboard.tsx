import type { data } from "@/features/Camera/types";
import { useRouterService } from "@/Shared/Service/routerService";
import { useContext, useState } from "react";
import { Camera, Download, Eye, History, Plus, Ruler } from "lucide-react";
import { AuthContext } from "@/provider/AuthProvider";
import { EditProfile } from "./EditProfile";
import { ListMeasure } from "./ListMeasure";

const groups = [
  {
    group: "Cơ bản",
    tone: "blue",
    items: [
      { label: "Vòng ngực", key: "chest", unit: "cm" },
      { label: "Vòng eo", key: "waist", unit: "cm" },
      { label: "Vòng hông", key: "hip", unit: "cm" },
      { label: "Rộng vai", key: "shoulderWidth", unit: "cm" },
    ],
  },
  {
    group: "Thân trên",
    tone: "brass",
    items: [
      { label: "Vòng cổ", key: "neck", unit: "cm" },
      { label: "Dài tay", key: "sleeveLength", unit: "cm" },
      { label: "Nách vòng", key: "armHole", unit: "cm" },
      { label: "Bắp tay", key: "upperArm", unit: "cm" },
    ],
  },
  {
    group: "Thân dưới",
    tone: "red",
    items: [
      { label: "Dài trong", key: "inseam", unit: "cm" },
      { label: "Độ sâu đáy", key: "crotchDepth", unit: "cm" },
      { label: "Vòng đùi", key: "thigh", unit: "cm" },
      { label: "Dài ngoài", key: "outseamLength", unit: "cm" },
    ],
  },
] as const;

const toneClass = {
  blue: "rx-badge-blue",
  brass: "rx-badge-brass",
  red: "rx-badge-red",
};

const Dashboard = ({
  dataMeasurements,
  setEditProfileOpen,
  editProfileOpen,
}: {
  dataMeasurements?: data[];
  setEditProfileOpen: React.Dispatch<React.SetStateAction<boolean>>;
  editProfileOpen: boolean;
}) => {
  const { navigate } = useRouterService();
  const [isOpen, setIsOpen] = useState(false);
  const context = useContext(AuthContext);
  const latest = dataMeasurements?.[0]?.dataMeasure;
  const hasData = !!latest;

  return (
    <section className="flex flex-col gap-6 lg:col-span-9">
      <ListMeasure isOpen={isOpen} onClose={() => setIsOpen(false)} dataMeasured={dataMeasurements || []} />
      {editProfileOpen && (
        <EditProfile
          isOpen={editProfileOpen}
          setIsOpen={() => setEditProfileOpen(false)}
          data={context?.userData}
        />
      )}

      {!hasData && (
        <div className="rx-shell">
          <div className="rx-core p-10 text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[rgba(24,23,20,0.06)]">
              <Camera size={28} strokeWidth={1.35} className="text-[var(--signal-blue)]" />
            </div>
            <h2 className="text-xl font-extrabold text-[var(--ink)]">Chưa có dữ liệu đo lường</h2>
            <p className="rx-copy mx-auto mt-3 max-w-sm">
              Thực hiện lần đo đầu tiên để tạo hồ sơ cơ thể và bắt đầu quy đổi size theo thương hiệu.
            </p>
            <a href="/Measurements" className="rx-btn rx-btn-primary mt-7">
              <Camera size={16} strokeWidth={1.35} />
              Bắt đầu đo ngay
            </a>
          </div>
        </div>
      )}

      {hasData && (
        <div className="rx-shell">
          <div className="rx-core overflow-hidden">
            <header className="flex flex-col justify-between gap-4 border-b border-[rgba(24,23,20,0.1)] p-6 sm:flex-row sm:items-center">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--ink)] text-[var(--surface-paper)]">
                  <Ruler size={19} strokeWidth={1.35} />
                </div>
                <div>
                  <h2 className="text-lg font-extrabold text-[var(--ink)]">Số đo cơ thể</h2>
                  <p className="text-xs text-[var(--ink-muted)]">Kết quả lần đo gần nhất</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <button onClick={() => setIsOpen(true)} className="rx-btn rx-btn-secondary">
                  <History size={15} strokeWidth={1.35} />
                  Lịch sử
                </button>
                <a href="/Measurements" className="rx-btn rx-btn-primary">
                  <Plus size={15} strokeWidth={1.35} />
                  Đo mới
                </a>
              </div>
            </header>

            <div className="grid gap-px bg-[rgba(24,23,20,0.1)] md:grid-cols-[0.8fr_1.2fr]">
              <div className="bg-[var(--ink)] p-7 text-[var(--surface-paper)]">
                <p className="font-mono text-[10px] font-semibold uppercase text-white/50">Chiều cao</p>
                <div className="mt-4 flex items-end gap-2">
                  <span className="font-mono text-6xl font-semibold leading-none">{latest?.height ?? "—"}</span>
                  <span className="pb-2 text-sm text-white/55">cm</span>
                </div>
                <div className="mt-8 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-white/[0.06] p-4 ring-1 ring-white/10">
                    <p className="font-mono text-[10px] uppercase text-white/50">Độ tin cậy</p>
                    <p className="mt-2 text-2xl font-extrabold text-[var(--brass)]">99.8%</p>
                  </div>
                  <div className="rounded-2xl bg-white/[0.06] p-4 ring-1 ring-white/10">
                    <p className="font-mono text-[10px] uppercase text-white/50">Số đo</p>
                    <p className="mt-2 text-2xl font-extrabold">13</p>
                  </div>
                </div>
              </div>

              <div className="bg-[var(--surface-paper)]">
                {groups.map((group) => (
                  <div key={group.group} className="border-b border-[rgba(24,23,20,0.08)] last:border-b-0">
                    <div className="p-4">
                      <span className={`rx-badge ${toneClass[group.tone]}`}>{group.group}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-px bg-[rgba(24,23,20,0.08)] sm:grid-cols-4">
                      {group.items.map((item) => {
                        const value = latest?.[item.key as keyof typeof latest];
                        const hasValue = value !== undefined && value !== null && value !== 0;
                        return (
                          <div key={item.key} className="bg-[rgba(255,253,247,0.82)] p-4">
                            <p className="font-mono text-[10px] uppercase text-[var(--ink-muted)]">{item.label}</p>
                            <p className="mt-2 font-mono text-xl font-semibold text-[var(--ink)]">
                              {hasValue ? value : "—"}
                              {hasValue && <span className="ml-1 text-xs text-[var(--ink-muted)]">{item.unit}</span>}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="rx-card flex flex-col items-start justify-between gap-5 p-5 sm:flex-row sm:items-center">
        <div className="flex items-center gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[rgba(24,23,20,0.06)]">
            <Download size={18} strokeWidth={1.35} className="text-[var(--signal-blue)]" />
          </div>
          <div>
            <h3 className="font-extrabold text-[var(--ink)]">Xuất dữ liệu</h3>
            <p className="text-sm text-[var(--ink-muted)]">PDF, PNG và CSV cho hồ sơ số đo.</p>
          </div>
        </div>
        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
          <button onClick={() => navigate("/PreviewMeasurement")} className="rx-btn rx-btn-secondary w-full sm:w-auto">
            <Eye size={15} strokeWidth={1.35} />
            Xem trước
          </button>
          <button onClick={() => navigate("/PreviewMeasurement")} className="rx-btn rx-btn-primary w-full sm:w-auto">
            <Download size={15} strokeWidth={1.35} />
            Tải xuống
          </button>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
