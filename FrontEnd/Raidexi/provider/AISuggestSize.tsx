import { API, api_Response } from "@/Shared/Service/Api";
import { AISuggestSizeResponse, AISuggestSizeType } from "@/Shared/types";
import { useRouter } from "next/navigation";
import { createContext, useState } from "react";

export const AISuggestSize= createContext(
    {
        dataMeasure:undefined as AISuggestSizeType|undefined,
        setDataMeasure: (dataMeasure:AISuggestSizeType)=>{},
        dataAnalysisResponse:undefined as AISuggestSizeResponse|undefined,
        handleAnalysisMeasure: async()=>{},
        isLoading: false,
        setIsLoading: (isLoading:boolean)=>{},
    }
)
export const AISuggestSizeProvider=({children}:{children:React.ReactNode})=>{
    const [dataMeasure, setDataMeasure]=useState<AISuggestSizeType|undefined>();
    const [dataAnalysisResponse, setDataAnalysisResponse]=useState<AISuggestSizeResponse|undefined>();
    const [isLoading, setIsLoading]=useState<boolean>(false);
    const nav=useRouter();

    const handleAnalysisMeasure=async()=>{
        try {
            const response= await api_Response(API.AnalysisDataMeasurement.GetSuggestSize,'POST',dataMeasure) ;
            setDataAnalysisResponse(response as AISuggestSizeResponse);
            nav.push('Brand/result?brand='+dataMeasure?.brand)
        }
        catch (error) {
            console.log("Error API Suggest Size AI: ",error)
        }
    }
    

    return <AISuggestSize.Provider value={{dataMeasure, setDataMeasure, dataAnalysisResponse, handleAnalysisMeasure, isLoading, setIsLoading    }}>
        {children}
    </AISuggestSize.Provider>
}