"use client";
import { useBrandProfile } from "@/features/Brand/hook/useBrandProfile";
import { Brand } from "@/features/Brand/types";
import { createContext, useEffect, useMemo, useState } from "react";
interface BrandContextType {
    dataBrand: Brand[];
    popUpSettings: { isopened: boolean; brandrefcode: string; gender: string; productType: string; sizeSystem: string };
    setPopUpSettings: React.Dispatch<React.SetStateAction<{ isopened: boolean; brandrefcode: string; gender: string; productType: string; sizeSystem: string }>>;
}
export const BrandContext = createContext<BrandContextType >(
    {
        dataBrand: [],
        popUpSettings: { isopened: false, brandrefcode: "", gender: "", productType: "", sizeSystem: "" },
        setPopUpSettings:()=>{}
    }
);

export const BrandProvider = ({children}: {children: React.ReactNode}) => {
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
            console.log(data);
        };
        fetchData();
    }, []);

    const data=useMemo(()=>dataBrand,[dataBrand]);
  return (
    <BrandContext.Provider value={{ dataBrand: data, popUpSettings, setPopUpSettings }}>
        {children}
    </BrandContext.Provider>
  );
}