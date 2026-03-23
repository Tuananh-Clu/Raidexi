import { create } from "zustand";

export interface SizeItem {
  size_us: string;
  size_uk: number;
  size_eu: number;
  chest_min_cm: number;
  chest_max_cm: number;
  height_min_cm: number;
  height_max_cm: number;
  weight_min_kg: number | null;
  weight_max_kg: number | null;
  waist_min_cm: number;
  waist_max_cm: number;
  hip_min_cm: number;
  hip_max_cm: number;
}

export interface SizeResponse {
  sizes:  SizeItem[] | null;
  SetSizes: (sizes: SizeItem[]) => void;
}

export const sizeTransferFromPic = create<SizeResponse>((set) => ({
    sizes:null,
    SetSizes: (sizes: SizeItem[]) => set(() => ({ sizes })),  
}));
