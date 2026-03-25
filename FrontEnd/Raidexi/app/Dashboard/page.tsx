"use client"

import Dashboard from "@/features/DashboardUser/components/Dashboard";
import Sidebar from "@/features/DashboardUser/components/Sidebar";
import { BodyMeasureEstimateContext } from "@/provider/BodyMeasureEstimate";
import { NavBar } from "@/Shared/Components/components/NavBar";
import { useContext, useState } from "react";

export default function page() {
  const context=useContext(BodyMeasureEstimateContext);
  const dataMeasurements=context?.dataMeasured;
    const [editProfileOpen, setEditProfileOpen] = useState(false);
  return (
    <>
      <NavBar></NavBar>
      <main className="w-full px-6 py-8 mx-auto grow max-w-360">
        <header className="flex flex-col justify-between gap-4 pb-6 mb-8 border-b border-border-color md:flex-row md:items-end">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 bg-[#2a241b] border border-border-color text-primary text-[10px] font-mono tracking-widest uppercase">
                Thành viên Vintage
              </span>
              <span className="px-2 py-0.5 border border-border-color text-text-muted text-[10px] font-mono tracking-widest uppercase">
                Trạng thái: Hoạt động
              </span>
            </div>
            <h2 className="text-3xl font-light tracking-tight text-white uppercase md:text-4xl">
              Quản lý Hồ sơ & Số đo
            </h2>
          </div>
          
          <div className="hidden text-right md:block">
            <p className="font-mono text-sm tracking-wider text-primary">
              REF: RX-8821-VN
            </p>
            <p className="text-xs italic text-text-muted">
              Cập nhật lần cuối: {dataMeasurements?.map((data) => new Date(data.lastUpdate).getDay()<10 ? `0${new Date(data.lastUpdate).getDay()}` : new Date(data.lastUpdate).getDay())}/{dataMeasurements?.map((data) => new Date(data.lastUpdate).getMonth()<9 ? `0${new Date(data.lastUpdate).getMonth()+1}` : new Date(data.lastUpdate).getMonth()+1)}/{dataMeasurements?.map((data) => new Date(data.lastUpdate).getFullYear())}
              
              
            </p>
          </div>
        </header>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <Sidebar setIsOpenProfile={setEditProfileOpen} />
          <Dashboard dataMeasurements={dataMeasurements} setEditProfileOpen={setEditProfileOpen} editProfileOpen={editProfileOpen} />
        </div>
      </main>
    </>
  );
}
