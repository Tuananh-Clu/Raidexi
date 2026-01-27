import { create } from "zustand";

type MobileScreenState = {
    isMobileScreen: boolean;
    setIsMobileScreen: (value: boolean) => void;
    openMobileMenu?: boolean;
    setOpenMobileMenu: (value: boolean) => void;
};

export const mobileScreenStore = create<MobileScreenState>((set) => ({
    isMobileScreen: window.innerWidth < 500,
    setIsMobileScreen: (value: boolean) => set({ isMobileScreen: value }),
    openMobileMenu: false,
    setOpenMobileMenu: (value: boolean) => set({ openMobileMenu: value }),
}));