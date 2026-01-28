"use client";
import { useBrandMeasure } from "@/features/Brand/hooks/useBrandMeasure";
import { useBrandProfile } from "@/features/Brand/hooks/useBrandProfile";
import { Brand } from "@/features/Brand/types";
import { useBrandDataUserStore } from "@/Shared/store/brandDataUser.store";
import { DataToSaveBrandMeasure } from "@/Shared/types";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { AuthContext } from "./AuthProvider";
interface BrandContextType {
    dataBrand: Brand[];
    popUpSettings: { isopened: boolean; brandrefcode: string; gender: string; productType: string; sizeSystem: string };
    setPopUpSettings: React.Dispatch<React.SetStateAction<{ isopened: boolean; brandrefcode: string; gender: string; productType: string; sizeSystem: string }>>;
    brandMeasuredRefCodesData?:DataToSaveBrandMeasure;
}
export const BrandContext = createContext<BrandContextType >(
    {
        dataBrand: [],
        popUpSettings: { isopened: false, brandrefcode: "", gender: "", productType: "", sizeSystem: "" },
        setPopUpSettings:()=>{},
        brandMeasuredRefCodesData:undefined,
    }
);

export const BrandProvider = ({children}: {children: React.ReactNode}) => {
    const {dataBrandMeasured,setDataBrandMeasured} =useBrandDataUserStore();
    const {GetBrandMeasureData}=useBrandMeasure();
    const {isLoggedIn}=useContext(AuthContext)!;
    const [dataBrand, setDataBrand] = useState<Brand[]>(()=>{
        const storedData = localStorage.getItem("brandData");
        return storedData ? JSON.parse(storedData) : [];
    }); 
    const [popUpSettings,setPopUpSettings] = useState({isopened:false,brandrefcode:"",gender:"",productType:"",sizeSystem:""});
    const {getBrandProfile}=useBrandProfile();
    useEffect(() => {
        const fetchData = async () => {
            const data = await getBrandProfile();
            setDataBrand(data);
            localStorage.setItem("brandData",JSON.stringify(data));
            if(!isLoggedIn) return;
            const brandMeasureData = await GetBrandMeasureData();
            setDataBrandMeasured(brandMeasureData.data);  
        };
        fetchData();
    }, [isLoggedIn]);
    const brandMeasuredRefCodesData = useMemo(
        () => {
            return dataBrandMeasured?.dataBrandAnalysis.find(
                item => item.brand.toUpperCase() === popUpSettings.brandrefcode.toUpperCase()
            );
        },
        [dataBrandMeasured, popUpSettings.brandrefcode]
    );
    const data=useMemo(()=>dataBrand,[dataBrand]);

  return (
    <BrandContext.Provider value={{ dataBrand: data, popUpSettings, setPopUpSettings, brandMeasuredRefCodesData }}>
        {children}
    </BrandContext.Provider>
  );
}