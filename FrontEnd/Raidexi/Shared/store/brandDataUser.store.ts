import { create } from "zustand";
import { DataBrandMeasureResponse } from "../types";


interface BrandDataUserState {
    dataBrandMeasured: DataBrandMeasureResponse | undefined;
    setDataBrandMeasured: (data: DataBrandMeasureResponse) => void;
}

export const useBrandDataUserStore = create<BrandDataUserState>((set) => ({
    dataBrandMeasured: undefined,
    setDataBrandMeasured: (data) => set(() => ({ dataBrandMeasured: data })),
}));