import { Landmark } from "@mediapipe/pose";
import { createContext, useRef, useState } from "react";

export interface BodyMeasureEstimateContextType {
  countdown?: number;
  measuring?: boolean;
  userHeight?: number;
  setUserHeight?: React.Dispatch<React.SetStateAction<number>>;
  setCountdown?: React.Dispatch<React.SetStateAction<number>>;
  setMeasuring?: React.Dispatch<React.SetStateAction<boolean>>;
  dataMeasured?: { [key: string]: number };
  setDataMeasured?: React.Dispatch<
    React.SetStateAction<{ [key: string]: number }>
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
    dataMeasured: {},
    setCountdown: () => {},
    setMeasuring: () => {},
    setDataMeasured: () => {},
    setCapturedFallback: () => {},
    capturedFallback: false,
    userHeight: 170,
    setUserHeight: () => {},
   Buffer: undefined,
    openCamera: false,
    setOpenCamera: () => {},
  });

export const BodyMeasureEstimateProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [userHeight, setUserHeight] = useState(170);
  const [openCamera, setOpenCamera] = useState<boolean>(false);
  const [countdown, setCountdown] = useState(20);
  const [measuring, setMeasuring] = useState(false);
  const [capturedFallback, setCapturedFallback] = useState(false);
  const [dataMeasured, setDataMeasured] = useState<{ [key: string]: number }>(
    {}
  );
  const Buffer = useRef<Landmark[][]>([]);
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
        userHeight,
        setUserHeight,
        Buffer,
        openCamera,
        setOpenCamera,
      }}
    >
      {children}
    </BodyMeasureEstimateContext.Provider>
  );
};
