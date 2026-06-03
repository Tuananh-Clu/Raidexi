"use client";

import { useContext, useState } from "react";
import { MeasurementData, SystemStatus } from "../../features/Camera/types";
import ControlPanel from "@/features/Camera/components/ControlPanel";
import { NavBar } from "@/Shared/Components/components/NavBar";
import Viewport from "@/features/Camera/components/ViewPort";
import { BodyMeasureEstimateContext } from "@/provider/BodyMeasureEstimate";

const INITIAL_DATA: MeasurementData = {
  metrics: [
    { id: "shoulderWidth", label: "Vai", value: 0, unit: "CM" },
    { id: "chest", label: "Ngực", value: 0, unit: "CM" },
    { id: "waist", label: "Eo", value: 0, unit: "CM" },
    { id: "hip", label: "Hông", value: 0, unit: "CM" },
    { id: "height", label: "Chiều cao", value: 0, unit: "CM" },
    { id: "neck", label: "Cổ", value: 0, unit: "CM" },
    { id: "sleeveLength", label: "Dài tay", value: 0, unit: "CM" },
    { id: "armHole", label: "Vòng nách", value: 0, unit: "CM" },
    { id: "upperArm", label: "Bắp tay", value: 0, unit: "CM" },
    { id: "inseam", label: "Dài trong", value: 0, unit: "CM" },
    { id: "crotchDepth", label: "Đáy", value: 0, unit: "CM" },
    { id: "thigh", label: "Đùi", value: 0, unit: "CM" },
    { id: "outseamLength", label: "Dài ngoài", value: 0, unit: "CM" },
  ],
  estimatedSize: "-",
  sizeIndex: 0,
};

const INITIAL_STATUS: SystemStatus = {
  id: "RX-MEASURE-01",
  timestamp: new Date().toISOString(),
  isLive: true,
  signalConfidence: 87,
  location: "RAIDEXI_ATELIER",
};

const LABEL_MAP: Record<string, string> = {
  shoulderWidth: "Vai",
  chest: "Ngực",
  waist: "Eo",
  hip: "Hông",
  height: "Chiều cao",
  neck: "Cổ",
  sleeveLength: "Dài tay",
  armHole: "Vòng nách",
  upperArm: "Bắp tay",
  inseam: "Dài trong",
  crotchDepth: "Đáy",
  thigh: "Đùi",
  outseamLength: "Dài ngoài",
};

export function Page() {
  const [showGrid, setShowGrid] = useState(false);
  const [, setFlashEnabled] = useState(false);
  const [triggerFlash] = useState(false);
  const context = useContext(BodyMeasureEstimateContext);
  const [status] = useState<SystemStatus>(INITIAL_STATUS);

  const measuredData = context?.dataMeasured?.[0]?.dataMeasure;
  const data = measuredData
    ? {
        metrics: (Object.keys(LABEL_MAP) as (keyof typeof measuredData)[]).map((key) => ({
          id: key,
          label: LABEL_MAP[key as string],
          value: Number(measuredData[key] ?? 0),
          unit: "CM",
        })),
        estimatedSize: "-",
        sizeIndex: 0,
      }
    : INITIAL_DATA;

  return (
    <div className="rx-page flex min-h-[100dvh] flex-col overflow-hidden font-sans">
      <NavBar />
      <h1 className="sr-only">Đo lường cơ thể bằng AI</h1>

      <main className="grid min-h-[100dvh] flex-1 grid-cols-1 overflow-hidden pt-24 lg:grid-cols-[minmax(0,1fr)_410px] lg:pt-28">
        <Viewport showGrid={showGrid} triggerFlash={triggerFlash} />
        <ControlPanel
          status={status}
          data={data}
          onToggleGrid={setShowGrid}
          onToggleFlash={setFlashEnabled}
        />
      </main>
    </div>
  );
}

export default Page;
