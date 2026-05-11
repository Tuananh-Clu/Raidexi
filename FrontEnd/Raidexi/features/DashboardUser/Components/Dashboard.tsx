import { data } from "@/features/Camera/types";
import { useRouterService } from "@/Shared/Service/routerService";
import { useContext, useState } from "react";
import { ListMeasure } from "./ListMeasure";
import { EditProfile } from "./EditProfile";
import { AuthContext } from "@/provider/AuthProvider";
import { History, Plus, Download, Eye, Camera, TrendingUp } from "lucide-react";

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

  const measureGroups = [
    {
      group: "Cơ bản",
      color: "#2563eb",
      bg: "#eff6ff",
      items: [
        { label: "Vòng ngực",    key: "chest",         unit: "cm" },
        { label: "Vòng eo",      key: "waist",         unit: "cm" },
        { label: "Vòng hông",    key: "hip",           unit: "cm" },
        { label: "Rộng vai",     key: "shoulderWidth", unit: "cm" },
      ],
    },
    {
      group: "Thân trên",
      color: "#0891b2",
      bg: "#ecfeff",
      items: [
        { label: "Vòng cổ",     key: "neck",        unit: "cm" },
        { label: "Dài tay",     key: "sleeveLength", unit: "cm" },
        { label: "Nách vòng",   key: "armHole",      unit: "cm" },
        { label: "Bắp tay",     key: "upperArm",     unit: "cm" },
      ],
    },
    {
      group: "Thân dưới",
      color: "#7c3aed",
      bg: "#f5f3ff",
      items: [
        { label: "Dài trong",   key: "inseam",        unit: "cm" },
        { label: "Độ sâu đáy",  key: "crotchDepth",   unit: "cm" },
        { label: "Vòng đùi",    key: "thigh",         unit: "cm" },
        { label: "Dài ngoài",   key: "outseamLength", unit: "cm" },
      ],
    },
  ] as const;

  const hasData = !!latest;

  return (
    <div className="flex flex-col gap-5 lg:col-span-9">
      <ListMeasure isOpen={isOpen} onClose={() => setIsOpen(false)} dataMeasured={dataMeasurements || []} />
      {editProfileOpen && (
        <EditProfile isOpen={editProfileOpen} setIsOpen={() => setEditProfileOpen(false)} data={context?.userData} />
      )}

      {/* Empty state */}
      {!hasData && (
        <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-sm p-12 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#eff6ff] to-[#dbeafe] flex items-center justify-center mx-auto mb-5">
            <Camera size={28} className="text-[#2563eb]" />
          </div>
          <h3 className="text-lg font-bold text-[#0f172a] mb-2">Chưa có dữ liệu đo lường</h3>
          <p className="text-sm text-[#64748b] max-w-xs mx-auto mb-6">
            Thực hiện đo lường đầu tiên để xem số đo cơ thể của bạn tại đây.
          </p>
          <a href="/Measurements"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] text-white font-semibold text-sm shadow-md shadow-[#2563eb]/20 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
            <Camera size={16} />
            Bắt đầu đo ngay
          </a>
        </div>
      )}

      {/* Main measurement card */}
      {hasData && (
        <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-sm overflow-hidden">
          {/* Card header */}
          <div className="px-6 py-4 border-b border-[#f1f5f9] flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gradient-to-r from-[#f8fafc] to-[#eff6ff]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#2563eb] to-[#06b6d4] flex items-center justify-center">
                <TrendingUp size={15} className="text-white" />
              </div>
              <div>
                <h3 className="font-bold text-[#0f172a] text-sm">Số đo cơ thể</h3>
                <p className="text-[10px] text-[#94a3b8]">Kết quả lần đo gần nhất</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setIsOpen(true)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#e2e8f0] bg-white text-[#334155] text-xs font-semibold hover:bg-[#f1f5f9] hover:border-[#cbd5e1] transition-all">
                <History size={13} />
                Lịch sử
              </button>
              <a href="/Measurements"
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] text-white text-xs font-semibold shadow-sm hover:shadow-md transition-all">
                <Plus size={13} />
                Đo mới
              </a>
            </div>
          </div>

          {/* Height hero */}
          <div className="px-6 py-4 border-b border-[#f1f5f9] flex items-center gap-4 bg-gradient-to-r from-[#0f172a] to-[#1e3a8a]">
            <div className="flex-1">
              <p className="text-white/50 text-[11px] uppercase tracking-wider font-semibold mb-1">Chiều cao</p>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-white font-mono">
                  {latest?.height ?? "—"}
                </span>
                <span className="text-white/50 text-sm">cm</span>
              </div>
            </div>
            <div className="h-14 w-px bg-white/10" />
            <div className="text-right">
              <p className="text-white/50 text-[10px] uppercase tracking-wider mb-1">Độ chính xác</p>
              <p className="text-2xl font-black text-[#06b6d4]">99.8%</p>
            </div>
          </div>

          {/* Measurement groups */}
          <div className="divide-y divide-[#f1f5f9]">
            {measureGroups.map((group) => (
              <div key={group.group}>
                {/* Group label */}
                <div className="px-6 py-2.5 flex items-center gap-2" style={{ backgroundColor: `${group.bg}` }}>
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: group.color }} />
                  <span className="text-[11px] font-bold uppercase tracking-widest" style={{ color: group.color }}>
                    {group.group}
                  </span>
                </div>
                {/* Grid of measurements */}
                <div className="grid grid-cols-2 sm:grid-cols-4">
                  {group.items.map((item, idx) => {
                    const val = latest?.[item.key as keyof typeof latest];
                    const hasVal = val !== undefined && val !== null && val !== 0;
                    return (
                      <div key={item.label}
                        className={`px-5 py-4 flex flex-col gap-1.5 hover:bg-[#f8fafc] transition-colors border-r border-b border-[#f1f5f9] last:border-r-0 ${idx >= group.items.length - (group.items.length % 2 === 0 ? 2 : 1) ? 'border-b-0' : ''}`}>
                        <p className="text-[10px] text-[#94a3b8] font-semibold uppercase tracking-wider leading-tight">
                          {item.label}
                        </p>
                        <div className="flex items-baseline gap-1">
                          <span className={`text-xl font-bold font-mono ${hasVal ? 'text-[#0f172a]' : 'text-[#cbd5e1]'}`}>
                            {hasVal ? val : "—"}
                          </span>
                          {hasVal && <span className="text-[10px] text-[#94a3b8]">{item.unit}</span>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Export card */}
      <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-sm p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#eff6ff] to-[#dbeafe] flex items-center justify-center flex-shrink-0">
            <Download size={18} className="text-[#2563eb]" />
          </div>
          <div>
            <h4 className="font-bold text-[#0f172a] text-sm">Xuất dữ liệu</h4>
            <p className="text-xs text-[#94a3b8] mt-0.5">Định dạng hỗ trợ: PDF, PNG, CSV</p>
          </div>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <button onClick={() => navigate('/PreviewMeasurement')}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl border border-[#e2e8f0] text-[#334155] text-sm font-semibold hover:bg-[#f1f5f9] hover:border-[#cbd5e1] transition-all">
            <Eye size={14} />
            Xem trước
          </button>
          <button onClick={() => navigate('/PreviewMeasurement')}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] text-white text-sm font-semibold shadow-sm hover:shadow-md transition-all">
            <Download size={14} />
            Tải xuống
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
