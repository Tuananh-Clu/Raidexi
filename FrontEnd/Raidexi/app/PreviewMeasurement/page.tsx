"use client";
import Header from "@/features/Preview/component/header";
import React, { useState, useContext } from "react";
import Sidebar from "@/features/Preview/component/Sidebar";
import MeasurementSheet from "@/features/Preview/component/MeasurementInfrastructure";
import { ExportFormat } from "@/features/Preview/types";
import { AuthContext } from "@/provider/AuthProvider";
import { BodyMeasureEstimateContext } from "@/provider/BodyMeasureEstimate";
import {
  ExportCsv,
  ExportPdf,
  ExportPng,
} from "@/Shared/Service/DownloadService";

const App: React.FC = () => {
  const [currentFormat, setCurrentFormat] = useState<ExportFormat>("pdf");
  const context = useContext(AuthContext)!;
  const measureContext = useContext(BodyMeasureEstimateContext)!;
  const CUSTOMER_DATA = {
    id: context.userData?.id || "",
    name: context.userData?.fullName || "",
    date: new Date().toLocaleDateString("vi-VN"),
  };
  const data = measureContext.dataMeasured?.[0]?.dataMeasure;
  const MEASUREMENTS = [
    { id: "1",  label: "Vai (Shoulder Width)", value: data?.shoulderWidth, unit: "cm" },
    { id: "2",  label: "Ngực (Chest)",          value: data?.chest,         unit: "cm" },
    { id: "3",  label: "Eo (Waist)",            value: data?.waist,         unit: "cm" },
    { id: "4",  label: "Hông (Hip)",            value: data?.hip,           unit: "cm" },
    { id: "5",  label: "Chiều cao (Height)",    value: data?.height,        unit: "cm" },
    { id: "6",  label: "Cổ (Neck)",             value: data?.neck,          unit: "cm" },
    { id: "7",  label: "Dài tay (Sleeve)",      value: data?.sleeveLength,  unit: "cm" },
    { id: "8",  label: "Nách vòng (Armhole)",   value: data?.armHole,       unit: "cm" },
    { id: "9",  label: "Bắp tay (Upper Arm)",   value: data?.upperArm,      unit: "cm" },
    { id: "10", label: "Dài trong (Inseam)",    value: data?.inseam,        unit: "cm" },
    { id: "11", label: "Độ sâu đáy (Crotch)",  value: data?.crotchDepth,   unit: "cm" },
    { id: "12", label: "Đùi (Thigh)",           value: data?.thigh,         unit: "cm" },
    { id: "13", label: "Dài ngoài (Outseam)",   value: data?.outseamLength, unit: "cm" },
  ];

  const handleClickExport = (types: ExportFormat) => {
    switch (types) {
      case "pdf":
        ExportPdf("measurement-sheet", "measurement.pdf");
        break;
      case "png":
        ExportPng("measurement-sheet", "measurement.png");
        break;
      case "csv":
        ExportCsv(
          [CUSTOMER_DATA, ...MEASUREMENTS.map((item) => ({
            Label: item.label,
            Value: item.value,
            Unit: item.unit,
          }))],
          "measurement.csv"
        )
        ;
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div className="flex flex-col flex-1 lg:flex-row">
        <Sidebar
          handleClickExport={handleClickExport}
          currentFormat={currentFormat}
          onFormatChange={setCurrentFormat}
        />

        <main className="flex items-start justify-center flex-1 px-4 py-12 overflow-auto transition-colors duration-300 paper-container bg-stone-100 dark:bg-stone-950/20">
          <MeasurementSheet
            customer={CUSTOMER_DATA}
            measurements={MEASUREMENTS}
          />
        </main>
      </div>
    </div>
  );
};

export default App;
