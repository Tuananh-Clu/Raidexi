"use client";
import { data } from "@/features/Camera/types";
import { Landmark } from "@mediapipe/pose";
import { createContext, useEffect, useRef, useState } from "react";

export interface BodyMeasureEstimateContextType {
  countdown?: number;
  measuring?: boolean;
  setCountdown?: React.Dispatch<React.SetStateAction<number>>;
  setMeasuring?: React.Dispatch<React.SetStateAction<boolean>>;
  dataMeasured?:data[];
  setDataMeasured?: React.Dispatch<
    React.SetStateAction<data[]>
  >;
  setCapturedFallback?: React.Dispatch<React.SetStateAction<boolean>>;
  Buffer?: React.MutableRefObject<Landmark[][]>;
  capturedFallback?: boolean;
  openCamera?: boolean;
  setOpenCamera?: React.Dispatch<React.SetStateAction<boolean>>;
}
export const BodyMeasureEstimateContext =
  createContext<BodyMeasureEstimateContextType>({
    countdown: 15000,
    measuring: false,
    dataMeasured: [],
    setCountdown: () => {},
    setMeasuring: () => {},
    setDataMeasured: () => {},
    setCapturedFallback: () => {},
    capturedFallback: false,
   Buffer: undefined,
    openCamera: false,
    setOpenCamera: () => {},
  });

export const BodyMeasureEstimateProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [openCamera, setOpenCamera] = useState<boolean>(false);
  const [countdown, setCountdown] = useState(20);
  const [measuring, setMeasuring] = useState(false);
  const [capturedFallback, setCapturedFallback] = useState(false);
  const [dataMeasured, setDataMeasured] = useState<data[]>(() => {
    if (typeof window === "undefined") {
      return [];
    }

    const storedMeasurements = localStorage.getItem("userMeaurements");
    return storedMeasurements ? JSON.parse(storedMeasurements) : [];
  });

  const Buffer = useRef<Landmark[][]>([]);
  useEffect(() => {
    if(dataMeasured && Object.keys(dataMeasured).length > 0)
    {
    localStorage.setItem("userMeaurements", JSON.stringify(dataMeasured));
    }
  }, [dataMeasured]);
  return (
    <BodyMeasureEstimateContext.Provider
      value={{
        countdown,
        measuring,
        setCountdown,
        setMeasuring,
        dataMeasured,
        setDataMeasured,
        capturedFallback,
        setCapturedFallback,
        Buffer,
        openCamera,
        setOpenCamera,
      }}
    >
      {children}
    </BodyMeasureEstimateContext.Provider>
  );
};
