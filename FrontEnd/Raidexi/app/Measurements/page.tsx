"use client";
import  { useContext, useState } from "react";
import { MeasurementData, SystemStatus } from "../../features/Camera/types";
import ControlPanel from "@/features/Camera/components/ControlPanel";
import { NavBar } from "@/Shared/Components/components/NavBar";
import Viewport from "@/features/Camera/components/ViewPort";
import { BodyMeasureEstimateContext } from "@/provider/BodyMeasureEstimate";



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

export function Page() {
  const [showGrid, setShowGrid] = useState(false);
  const [, setFlashEnabled] = useState(false);
  const [triggerFlash] = useState(false);
  const context=useContext(BodyMeasureEstimateContext)
  const [status] = useState<SystemStatus>(INITIAL_STATUS);

  return (
    <div className="flex flex-col w-full h-screen overflow-hidden bg-background-dark text-paper font-display selection:bg-brass-light selection:text-background-dark">
      <NavBar />

      <main className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr_360px] h-[calc(100vh-64px)] overflow-hidden">
        <Viewport 
          showGrid={showGrid}
          triggerFlash={triggerFlash}
        />
        <ControlPanel
          status={status}
          data={context.dataMeasured ? {
            metrics: Object.entries(context.dataMeasured).map(([key, value]) => ({
              id: key,
              label: key.charAt(0).toUpperCase() + key.slice(1),
              value,
              unit: "CM",
            })),
            estimatedSize: "Unknown",
            sizeIndex: 0,
          } : INITIAL_DATA}
          onToggleGrid={setShowGrid}
          onToggleFlash={setFlashEnabled}
        />
      </main>
    </div>
  );
}

export default Page;
