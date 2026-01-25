export type loadingState = {
    isLoading: boolean;
    note: string;
    startLoading?: (note?: string) => void;
    stopLoading?: () => void;

};
import { create } from "zustand";

export const useLoadingStore = create<loadingState>((set) => ({
    isLoading: false,
    note: "Đang tải...",
    startLoading: (note?:string) =>
        set(() => ({ isLoading: true, note })),
    stopLoading: () => set(() => ({ isLoading: false, note: "Đang tải..." })),
}));