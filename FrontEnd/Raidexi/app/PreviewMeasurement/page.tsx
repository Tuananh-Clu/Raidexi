"use client";

import Header from "@/features/Preview/component/header";
import React, { useContext, useState } from "react";
import Sidebar from "@/features/Preview/component/Sidebar";
import MeasurementSheet from "@/features/Preview/component/MeasurementInfrastructure";
import { ExportFormat } from "@/features/Preview/types";
import { AuthContext } from "@/provider/AuthProvider";
import { BodyMeasureEstimateContext } from "@/provider/BodyMeasureEstimate";
import { ExportCsv, ExportPdf, ExportPng } from "@/Shared/Service/DownloadService";

const PreviewMeasurementPage: React.FC = () => {
  const [currentFormat, setCurrentFormat] = useState<ExportFormat>("pdf");
  const authContext = useContext(AuthContext)!;
  const measureContext = useContext(BodyMeasureEstimateContext)!;
  const data = measureContext.dataMeasured?.[0]?.dataMeasure;

  const customerData = {
    id: authContext.userData?.id || "-",
    name: authContext.userData?.fullName || "-",
    date: new Date().toLocaleDateString("vi-VN"),
  };

  const measurements = [
    { id: "1", label: "Vai", value: data?.shoulderWidth, unit: "cm" },
    { id: "2", label: "Ngực", value: data?.chest, unit: "cm" },
    { id: "3", label: "Eo", value: data?.waist, unit: "cm" },
    { id: "4", label: "Hông", value: data?.hip, unit: "cm" },
    { id: "5", label: "Chiều cao", value: data?.height, unit: "cm" },
    { id: "6", label: "Cổ", value: data?.neck, unit: "cm" },
    { id: "7", label: "Dài tay", value: data?.sleeveLength, unit: "cm" },
    { id: "8", label: "Vòng nách", value: data?.armHole, unit: "cm" },
    { id: "9", label: "Bắp tay", value: data?.upperArm, unit: "cm" },
    { id: "10", label: "Dài trong", value: data?.inseam, unit: "cm" },
    { id: "11", label: "Đáy", value: data?.crotchDepth, unit: "cm" },
    { id: "12", label: "Đùi", value: data?.thigh, unit: "cm" },
    { id: "13", label: "Dài ngoài", value: data?.outseamLength, unit: "cm" },
  ];

  const handleClickExport = (format: ExportFormat) => {
    switch (format) {
      case "pdf":
        ExportPdf("measurement-sheet", "measurement.pdf");
        break;
      case "png":
        ExportPng("measurement-sheet", "measurement.png");
        break;
      case "csv":
        ExportCsv([
          customerData,
          ...measurements.map((item) => ({ Label: item.label, Value: item.value, Unit: item.unit })),
        ], "measurement.csv");
        break;
      default:
        break;
    }
  };

  return (
    <div className="rx-page flex min-h-[100dvh] flex-col">
      <Header />
      <div className="flex flex-1 flex-col lg:flex-row">
        <Sidebar handleClickExport={handleClickExport} currentFormat={currentFormat} onFormatChange={setCurrentFormat} />
        <main className="flex flex-1 items-start justify-center overflow-auto px-4 py-10 md:px-8">
          <MeasurementSheet customer={customerData} measurements={measurements} />
        </main>
      </div>
    </div>
  );
};

export default PreviewMeasurementPage;
