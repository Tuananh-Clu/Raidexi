"use client";

import Dashboard from "@/features/DashboardUser/Components/Dashboard";
import { BodyMeasureEstimateContext } from "../../provider/BodyMeasureEstimate";
import { NavBar } from "../../Shared/Components/components/NavBar";
import { useContext, useState } from "react";
import Sidebar from "@/features/DashboardUser/Components/Sidebar";
import { AuthContext } from "@/provider/AuthProvider";
import { Camera } from "lucide-react";

export default function Page() {
  const context = useContext(BodyMeasureEstimateContext);
  const authContext = useContext(AuthContext);
  const dataMeasurements = context?.dataMeasured;
  const [editProfileOpen, setEditProfileOpen] = useState(false);

  const lastUpdate = dataMeasurements && dataMeasurements.length > 0
    ? new Date(
        [...dataMeasurements].sort(
          (a, b) => new Date(b.lastUpdate).getTime() - new Date(a.lastUpdate).getTime()
        )[0].lastUpdate
      ).toLocaleDateString("vi-VN")
    : null;

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col">
      <NavBar />

      {/* Page header */}
      <div className="border-b border-[#e2e8f0] bg-white">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-1 rounded-lg bg-[#eff6ff] border border-[#bfdbfe] text-[#2563eb] text-[10px] font-bold tracking-wider uppercase">
                Hồ sơ cá nhân
              </span>
              <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#ecfdf5] border border-[#bbf7d0] text-[#059669] text-[10px] font-bold tracking-wider uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[#059669] animate-pulse" />
                Hoạt động
              </span>
            </div>
            <h1 className="text-2xl font-bold text-[#0f172a]">
              Xin chào, {authContext?.userData?.fullName || "bạn"} 👋
            </h1>
            <p className="text-sm text-[#64748b] mt-0.5">
              {lastUpdate ? `Cập nhật lần cuối: ${lastUpdate}` : "Chưa có dữ liệu đo lường"}
            </p>
          </div>

          <a href="/Measurements"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] text-white text-sm font-semibold shadow-md shadow-[#2563eb]/20 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 whitespace-nowrap">
            <Camera size={16} />
            Đo lường mới
          </a>
        </div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <Sidebar setIsOpenProfile={setEditProfileOpen} />
          <Dashboard
            dataMeasurements={dataMeasurements}
            setEditProfileOpen={setEditProfileOpen}
            editProfileOpen={editProfileOpen}
          />
        </div>
      </main>
    </div>
  );
}
