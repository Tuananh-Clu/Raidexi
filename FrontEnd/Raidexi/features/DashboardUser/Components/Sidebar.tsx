"use client";
import { useContext } from 'react';
import { AuthContext } from '@/provider/AuthProvider';
import { BodyMeasureEstimateContext } from '@/provider/BodyMeasureEstimate';
import { User, Mail, Phone, MapPin, Calendar, Edit3, Ruler } from 'lucide-react';

const Sidebar = ({ setIsOpenProfile }: { setIsOpenProfile: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const context = useContext(AuthContext);
  const dataMeasure = useContext(BodyMeasureEstimateContext);

  if (!context || !context.isLoggedIn || !context.userData) {
    return (
      <div className="lg:col-span-3 flex flex-col gap-4">
        <div className="bg-white rounded-2xl border border-[#e2e8f0] p-8 text-center animate-pulse">
          <div className="w-20 h-20 rounded-full bg-[#f1f5f9] mx-auto mb-4" />
          <div className="h-4 bg-[#f1f5f9] rounded w-3/4 mx-auto mb-2" />
          <div className="h-3 bg-[#f1f5f9] rounded w-1/2 mx-auto" />
        </div>
      </div>
    );
  }

  const profile = {
    id: context.userData?.id ?? "",
    name: context.userData?.username ?? "Người dùng",
    fullName: context.userData?.fullName ?? "",
    email: context.userData?.email ?? "",
    createdAt: context.userData?.createdAt ?? "",
    phone: context.userData?.phone ?? "Chưa cập nhật",
    address: context.userData?.address ?? "Chưa cập nhật",
    imageUrl: context.userData?.imageUrl ?? "",
  };

  const totalMeasurements = dataMeasure?.dataMeasured?.length ?? 0;
  const hasData = dataMeasure?.dataMeasured?.[0]?.dataMeasure;
  const filledFields = hasData
    ? Object.values(hasData).filter(v => v !== null && v !== undefined && v !== 0).length
    : 0;
  const completeness = hasData ? Math.round((filledFields / 13) * 100) : 0;

  const infoRows = [
    { icon: Mail, label: 'Email', value: profile.email },
    { icon: Phone, label: 'Điện thoại', value: profile.phone },
    { icon: MapPin, label: 'Khu vực', value: profile.address },
    { icon: Calendar, label: 'Tham gia', value: profile.createdAt ? new Date(profile.createdAt).toLocaleDateString("vi-VN") : "—" },
  ];

  return (
    <div className="flex flex-col gap-5 lg:col-span-3">
      {/* Profile card */}
      <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-sm overflow-hidden">
        {/* Blue accent top bar */}
        <div className="h-1 w-full bg-gradient-to-r from-[#2563eb] to-[#06b6d4]" />

        {/* Avatar area */}
        <div className="px-6 pt-6 pb-5 flex flex-col items-center text-center border-b border-[#f1f5f9]">
          <div className="relative mb-4">
            <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-[#e2e8f0] shadow-sm bg-gradient-to-br from-[#eff6ff] to-[#e0f2fe] flex items-center justify-center">
              {profile.imageUrl ? (
                <img alt="Avatar" className="object-cover w-full h-full" src={profile.imageUrl} />
              ) : (
                <span className="text-3xl font-bold text-[#2563eb]">
                  {(profile.fullName || profile.name)?.[0]?.toUpperCase() || "U"}
                </span>
              )}
            </div>
            <div className="absolute -bottom-2 -right-2 w-6 h-6 rounded-full bg-[#059669] border-2 border-white flex items-center justify-center">
              <span className="text-white text-[8px]">✓</span>
            </div>
          </div>
          <h3 className="text-base font-bold text-[#0f172a]">{profile.fullName || profile.name}</h3>
          <p className="text-xs text-[#94a3b8] mt-0.5 font-mono">#{profile.id?.slice(-6) || "——"}</p>
        </div>

        {/* Info list */}
        <div className="px-5 py-4 space-y-3">
          {infoRows.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-lg bg-[#f8fafc] border border-[#f1f5f9] flex items-center justify-center flex-shrink-0 mt-0.5">
                <Icon size={13} className="text-[#64748b]" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] text-[#94a3b8] uppercase tracking-wider font-semibold">{label}</p>
                <p className="text-xs font-medium text-[#334155] truncate mt-0.5">{value || "—"}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Edit button */}
        <div className="px-5 pb-5">
          <button
            onClick={() => setIsOpenProfile(true)}
            className="w-full h-10 flex items-center justify-center gap-2 rounded-xl border border-[#e2e8f0] bg-[#f8fafc] text-[#334155] text-sm font-semibold hover:bg-[#eff6ff] hover:border-[#bfdbfe] hover:text-[#2563eb] transition-all duration-200">
            <Edit3 size={14} />
            Chỉnh sửa hồ sơ
          </button>
        </div>
      </div>

      {/* Stats card */}
      <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-sm p-5">
        <div className="flex items-center gap-2 mb-4">
          <Ruler size={15} className="text-[#2563eb]" />
          <h4 className="text-sm font-bold text-[#0f172a]">Tổng quan</h4>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="p-4 rounded-xl bg-gradient-to-br from-[#eff6ff] to-[#dbeafe] text-center">
            <p className="text-2xl font-black text-[#2563eb]">{totalMeasurements}</p>
            <p className="text-[10px] text-[#64748b] font-semibold mt-1">Lần đo</p>
          </div>
          <div className="p-4 rounded-xl bg-gradient-to-br from-[#ecfdf5] to-[#d1fae5] text-center">
            <p className="text-2xl font-black text-[#059669]">{completeness}%</p>
            <p className="text-[10px] text-[#64748b] font-semibold mt-1">Hoàn thiện</p>
          </div>
        </div>

        {/* Progress bar */}
        {totalMeasurements > 0 && (
          <div className="mt-4">
            <div className="flex justify-between text-[10px] text-[#94a3b8] mb-1.5">
              <span>Độ hoàn thiện hồ sơ</span>
              <span>{completeness}%</span>
            </div>
            <div className="h-1.5 bg-[#f1f5f9] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#2563eb] to-[#06b6d4] transition-all duration-700"
                style={{ width: `${completeness}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
