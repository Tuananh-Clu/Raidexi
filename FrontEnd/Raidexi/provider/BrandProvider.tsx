"use client";
import { useBrandProfile } from "@/features/Brand/hook/useBrandProfile";
import { Brand } from "@/features/Brand/types";
import { createContext, useEffect, useState } from "react";
interface BrandContextType {
    dataBrand: Brand[];
}
export const BrandContext = createContext<BrandContextType >(
    {
        dataBrand: [],
    }
);

export const BrandProvider = ({children}: {children: React.ReactNode}) => {
    const [dataBrand, setDataBrand] = useState<Brand[]>([]); 
    const {getBrandProfile}=useBrandProfile();
    useEffect(() => {
        const fetchData = async () => {
            const data = await getBrandProfile();
            setDataBrand(data);
            console.log(data?.data)
        };
        fetchData();
    }, []);

  return (
    <BrandContext.Provider value={{ dataBrand }}>
        {children}
    </BrandContext.Provider>
  );
}