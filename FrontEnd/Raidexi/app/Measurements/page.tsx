"use client";
import  { useState } from "react";
import { MeasurementData, SystemStatus } from "../../features/Camera/types";
import ControlPanel from "@/features/Camera/components/ControlPanel";
import Viewport from "@/features/Camera/components/ViewPort";
import { NavBar } from "@/Shared/Components/components/NavBar";

const INITIAL_DATA: MeasurementData = {
  metrics: [
    { id: "shoulder", label: "Shoulder", value: 44.2, unit: "CM" },
    { id: "chest", label: "Chest", value: 96.5, unit: "CM" },
    { id: "waist", label: "Waist", value: 78.0, unit: "CM" },
    { id: "height", label: "Height", value: 178, unit: "CM" },
  ],
  estimatedSize: "Medium",
  sizeIndex: 50,
};

const INITIAL_STATUS: SystemStatus = {
  id: "994-AZ",
  timestamp: new Date().toISOString(),
  isLive: true,
  signalConfidence: 87,
  location: "BERLIN_HQ_01",
};

export function page() {
  const [showGrid, setShowGrid] = useState(false);
  const [flashEnabled, setFlashEnabled] = useState(false);
  const [triggerFlash, setTriggerFlash] = useState(false);
  const [openCamera, setOpenCamera] = useState<boolean>(false);
  const [data, setData] = useState<MeasurementData>(INITIAL_DATA);
  const [status, setStatus] = useState<SystemStatus>(INITIAL_STATUS);

  return (
    <div className="flex flex-col w-full h-screen overflow-hidden bg-background-dark text-paper font-display selection:bg-brass-light selection:text-background-dark">
      <NavBar />

      <main className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr_360px] h-[calc(100vh-64px)] overflow-hidden">
        <Viewport showGrid={showGrid} triggerFlash={triggerFlash} openCamera={openCamera} />

        <ControlPanel
          openCamera={openCamera}
          setOpenCamera={setOpenCamera}
          status={status}
          data={data}
          onToggleGrid={setShowGrid}
          onToggleFlash={setFlashEnabled}
        />
      </main>
    </div>
  );
}

export default page;
