"use client";
import { useContext } from 'react';
import { AuthContext } from '@/provider/AuthProvider';
import { BodyMeasureEstimateContext } from '@/provider/BodyMeasureEstimate';


const Sidebar = ({setIsOpenProfile}: { setIsOpenProfile: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const context = useContext(AuthContext);
  const dataMeasure = useContext(BodyMeasureEstimateContext);

  if (!context || !context.isLoggedIn || !context.userData) {
    return (
      <div className="flex flex-col gap-8 p-8 lg:col-span-4">
        <div className="text-center text-text-dim animate-pulse text-sm font-medium">
          Đang tải thông tin hồ sơ...
        </div>
      </div>
    );
  }

  const profile = {
    id: context.userData?.id ?? "",
    name: context.userData?.username ?? "",
    email: context.userData?.email ?? "",
    createdAt: context.userData?.createdAt ?? "",
    phone: context.userData?.phone ?? "",
    address: context.userData?.address ?? "",
    imageUrl: context.userData?.imageUrl ?? "",
  };

  return (
    <div className="flex flex-col gap-6 lg:col-span-4 font-sans">
      {/* Profile Card */}
      <div className="relative flex flex-col bg-surface-dark border border-border-subtle rounded-2xl overflow-hidden shadow-sm group">
        {/* Gold accent corners */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-primary rounded-tl-lg z-10"></div>
        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-primary rounded-tr-lg z-10"></div>

        {/* Avatar section */}
        <div className="p-8 border-b border-border-subtle flex flex-col items-center text-center bg-[#15120e]">
          <div className="relative mb-6">
            <div className="w-28 h-28 rounded-2xl overflow-hidden border-2 border-border-subtle shadow-sm">
              <img
                alt="Portrait"
                className="object-cover w-full h-full"
                src={profile.imageUrl || "/default-avatar.png"}
              />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-primary text-background-dark text-[10px] font-bold px-2 py-0.5 rounded-md shadow-sm">
              ID: {profile.id}
            </div>
          </div>
          <h3 className="text-xl font-bold tracking-wide text-white uppercase">{profile.name}</h3>
          <p className="mt-1 text-xs font-semibold text-primary tracking-widest uppercase"></p>
        </div>

        {/* Info section */}
        <div className="p-6 bg-surface-dark">
          <div className="space-y-3 border border-border-subtle rounded-xl p-4 bg-[#15120e]">
            <div className="flex items-baseline justify-between pb-2 border-b border-border-subtle">
              <span className="text-text-dim text-[10px] uppercase tracking-widest font-semibold">Email</span>
              <span className="ml-4 text-xs font-medium text-text-secondary truncate">{profile.email}</span>
            </div>
            <div className="flex items-baseline justify-between pb-2 border-b border-border-subtle">
              <span className="text-text-dim text-[10px] uppercase tracking-widest font-semibold">Điện thoại</span>
              <span className="ml-4 text-xs font-medium text-text-secondary truncate">{profile.phone}</span>
            </div>
            <div className="flex items-baseline justify-between pb-2 border-b border-border-subtle">
              <span className="text-text-dim text-[10px] uppercase tracking-widest font-semibold">Khu vực</span>
              <span className="ml-4 text-xs font-medium text-text-secondary truncate">{profile.address}</span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-text-dim text-[10px] uppercase tracking-widest font-semibold">Ngày tham gia</span>
              <span className="ml-4 text-xs font-medium text-text-secondary truncate">{new Date(profile.createdAt).toLocaleDateString("vi-VN")}</span>
            </div>
          </div>
          <button
            onClick={() => setIsOpenProfile(true)}
            className="mt-5 w-full h-11 flex items-center justify-center bg-primary hover:bg-primary-dark text-background-dark text-sm font-bold uppercase tracking-widest rounded-xl transition-all shadow-md hover:shadow-lg outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
          >
            <span className="material-symbols-outlined text-[18px] mr-2">edit_square</span>
            Chỉnh sửa hồ sơ
          </button>
        </div>
      </div>

      {/* Stats Card */}
      <div className="bg-surface-dark border border-border-subtle rounded-2xl p-6 relative overflow-hidden shadow-sm">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/40 via-primary to-primary/40 opacity-60 rounded-t-2xl"></div>
        <h4 className="text-text-secondary text-sm font-bold uppercase tracking-widest mb-5 border-b border-border-subtle pb-3">Tổng quan hồ sơ</h4>
        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col">
            <span className="font-bold text-4xl leading-none text-primary">{dataMeasure?.dataMeasured?.length ?? 0}</span>
            <span className="text-text-dim text-[10px] uppercase tracking-widest mt-2 font-semibold">Tổng số đo</span>
          </div>
          <div className="flex flex-col pl-6 border-l border-border-subtle">
            <span className="font-bold text-4xl leading-none text-primary">{}%</span>
            <span className="text-text-dim text-[10px] uppercase tracking-widest mt-2 font-semibold">Độ hoàn thiện</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
