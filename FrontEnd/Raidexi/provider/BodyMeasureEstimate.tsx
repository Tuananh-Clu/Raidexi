"use client";
import { MeasurementDataResponse } from "@/features/Camera/types";
import { Landmark } from "@mediapipe/pose";
import { createContext, useEffect, useRef, useState } from "react";

export interface BodyMeasureEstimateContextType {
  countdown?: number;
  measuring?: boolean;
  setCountdown?: React.Dispatch<React.SetStateAction<number>>;
  setMeasuring?: React.Dispatch<React.SetStateAction<boolean>>;
  dataMeasured?: MeasurementDataResponse;
  setDataMeasured?: React.Dispatch<
    React.SetStateAction<MeasurementDataResponse>
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
    dataMeasured: {
      height: 0,
      chest: 0,
      waist: 0,
      hip: 0,
      shoulderWidth: 0,
    },
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
  const [dataMeasured, setDataMeasured] = useState<MeasurementDataResponse>(
    localStorage?.getItem("userMeaurements")
      ? JSON.parse(localStorage.getItem("userMeaurements") || "{}")
      : null
  );

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
