"use client";
import  { useContext, useState } from "react";
import { MeasurementData, SystemStatus } from "../../features/Camera/types";
import ControlPanel from "@/features/Camera/components/ControlPanel";
import { NavBar } from "@/Shared/Components/components/NavBar";
import Viewport from "@/features/Camera/components/ViewPort";
import { BodyMeasureEstimateContext } from "@/provider/BodyMeasureEstimate";



const INITIAL_DATA: MeasurementData = {
  metrics: [
    // Core
    { id: "shoulder",     label: "Vai",          value: 0, unit: "CM" },
    { id: "chest",        label: "Ngực",          value: 0, unit: "CM" },
    { id: "waist",        label: "Eo",            value: 0, unit: "CM" },
    { id: "hip",          label: "Hông",          value: 0, unit: "CM" },
    { id: "height",       label: "Chiều cao",     value: 0, unit: "CM" },
    // Upper body
    { id: "neck",         label: "Cổ",            value: 0, unit: "CM" },
    { id: "sleeveLength", label: "Dài tay",       value: 0, unit: "CM" },
    { id: "armHole",      label: "Nách (vòng)",  value: 0, unit: "CM" },
    { id: "upperArm",     label: "Bắp tay",       value: 0, unit: "CM" },
    // Lower body
    { id: "inseam",       label: "Dài trong",     value: 0, unit: "CM" },
    { id: "crotchDepth",  label: "Độ sâu đáy",   value: 0, unit: "CM" },
    { id: "thigh",        label: "Đùi",           value: 0, unit: "CM" },
    { id: "outseamLength",label: "Dài ngoài",     value: 0, unit: "CM" },
  ],
  estimatedSize: "—",
  sizeIndex: 0,
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
          data={context?.dataMeasured[0]?.dataMeasure ? (() => {
            const d = context.dataMeasured[0].dataMeasure;
            const LABEL_MAP: Record<string, string> = {
              // Core
              shoulderWidth: "Vai",
              chest:         "Ngực",
              waist:         "Eo",
              hip:           "Hông",
              height:        "Chiều cao",
              // Upper body
              neck:          "Cổ",
              sleeveLength:  "Dài tay",
              armHole:       "Nách (vòng)",
              upperArm:      "Bắp tay",
              // Lower body
              inseam:        "Dài trong",
              crotchDepth:   "Độ sâu đáy",
              thigh:         "Đùi",
              outseamLength: "Dài ngoài",
            };
            return {
              metrics: (Object.keys(LABEL_MAP) as (keyof typeof d)[]).map(key => ({
                id:    key,
                label: LABEL_MAP[key],
                value: d[key] ?? 0,
                unit:  "CM",
              })),
              estimatedSize: "—",
              sizeIndex: 0,
            };
          })() : INITIAL_DATA}
          onToggleGrid={setShowGrid}
          onToggleFlash={setFlashEnabled}
        />
      </main>
    </div>
  );
}

export default Page;
