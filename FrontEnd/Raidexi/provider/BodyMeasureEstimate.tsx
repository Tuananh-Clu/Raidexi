import { createContext,  useState } from "react";

export interface BodyMeasureEstimateContextType {
    countdown?: number;
    measuring?: boolean;
    userHeight?: number;
    setUserHeight?: React.Dispatch<React.SetStateAction<number>>;
    setCountdown?: React.Dispatch<React.SetStateAction<number>>;
    setMeasuring?: React.Dispatch<React.SetStateAction<boolean>>;
    dataMeasured?: {[key: string]: number};
    setDataMeasured?: React.Dispatch<React.SetStateAction<{[key: string]: number}>>;
    setCapturedFallback?: React.Dispatch<React.SetStateAction<boolean>>;
    capturedFallback?: boolean;
}
export const BodyMeasureEstimateContext = createContext<BodyMeasureEstimateContextType>(
    {
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
    }
);

export const BodyMeasureEstimateProvider = ({children}: {children: React.ReactNode}) => {
    const [userHeight, setUserHeight] = useState(170);
    const [countdown, setCountdown] =useState(15);
    const [measuring, setMeasuring] = useState(false);
    const [capturedFallback, setCapturedFallback] = useState(false);
    const [dataMeasured, setDataMeasured] = useState<{[key: string]: number}>({});
    return (
        <BodyMeasureEstimateContext.Provider value={{countdown, measuring, setCountdown, setMeasuring, dataMeasured, setDataMeasured ,capturedFallback,setCapturedFallback,userHeight,setUserHeight}}>
            {children}
        </BodyMeasureEstimateContext.Provider>
    );
}