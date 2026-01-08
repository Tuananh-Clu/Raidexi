import { createContext, useState } from "react";

export interface BodyMeasureEstimateContextType {
  countdown?: number;
  measuring?: boolean;
  setCountdown?: React.Dispatch<React.SetStateAction<number>>;
  setMeasuring?: React.Dispatch<React.SetStateAction<boolean>>;
  dataMeasured?: { [key: string]: number };
  setDataMeasured?: React.Dispatch<
    React.SetStateAction<{ [key: string]: number }>
  >;
}
export const BodyMeasureEstimateContext =
  createContext<BodyMeasureEstimateContextType>({
    countdown: 15000,
    measuring: false,
    dataMeasured: {},
    setCountdown: () => {},
    setMeasuring: () => {},
    setDataMeasured: () => {},
  });

export const BodyMeasureEstimateProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [dataMeasured, setDataMeasured] = useState<{ [key: string]: number }>(
    {}
  );
  const [countdown, setCountdown] = useState(() => {
    if (dataMeasured) {
      return 15;
    }
    return 15;
  });
  const [measuring, setMeasuring] = useState(false);

  return (
    <BodyMeasureEstimateContext.Provider
      value={{
        countdown,
        measuring,
        setCountdown,
        setMeasuring,
        dataMeasured,
        setDataMeasured,
      }}
    >
      {children}
    </BodyMeasureEstimateContext.Provider>
  );
};
