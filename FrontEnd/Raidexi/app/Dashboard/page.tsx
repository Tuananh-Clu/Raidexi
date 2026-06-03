"use client";

import { useContext, useState } from "react";
import { Camera } from "lucide-react";
import Dashboard from "@/features/DashboardUser/Components/Dashboard";
import Sidebar from "@/features/DashboardUser/Components/Sidebar";
import { AuthContext } from "@/provider/AuthProvider";
import { BodyMeasureEstimateContext } from "@/provider/BodyMeasureEstimate";
import { NavBar } from "@/Shared/Components/components/NavBar";

export default function Page() {
  const context = useContext(BodyMeasureEstimateContext);
  const authContext = useContext(AuthContext);
  const dataMeasurements = context?.dataMeasured;
  const [editProfileOpen, setEditProfileOpen] = useState(false);

  const lastUpdate =
    dataMeasurements && dataMeasurements.length > 0
      ? new Date(
          [...dataMeasurements].sort(
            (a, b) => new Date(b.lastUpdate).getTime() - new Date(a.lastUpdate).getTime(),
          )[0].lastUpdate,
        ).toLocaleDateString("vi-VN")
      : null;

  return (
    <div className="rx-page flex min-h-screen flex-col">
      <NavBar />

      <header className="px-4 pb-4 pt-24 md:px-6">
        <div className="rx-container rx-shell">
          <div className="rx-core flex flex-col justify-between gap-6 p-6 md:flex-row md:items-end md:p-8">
            <div>
              <div className="mb-4 flex flex-wrap gap-2">
                <span className="rx-badge rx-badge-blue">Hồ sơ cá nhân</span>
                <span className="rx-badge">Đang hoạt động</span>
              </div>
              <h1 className="rx-heading-md">
                Xin chào, {authContext?.userData?.fullName || "bạn"}.
              </h1>
              <p className="rx-copy mt-3">
                {lastUpdate ? `Cập nhật lần cuối: ${lastUpdate}` : "Chưa có dữ liệu đo lường."}
              </p>
            </div>

            <a href="/Measurements" className="rx-btn rx-btn-primary w-full md:w-auto">
              <Camera size={16} strokeWidth={1.35} />
              Đo lường mới
            </a>
          </div>
        </div>
      </header>

      <main className="rx-container grid flex-1 grid-cols-1 gap-6 px-4 py-8 md:px-6 lg:grid-cols-12">
        <Sidebar setIsOpenProfile={setEditProfileOpen} />
        <Dashboard
          dataMeasurements={dataMeasurements}
          setEditProfileOpen={setEditProfileOpen}
          editProfileOpen={editProfileOpen}
        />
      </main>
    </div>
  );
}
