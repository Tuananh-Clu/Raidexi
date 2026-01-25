import { API, api_Response } from "@/Shared/Service/Api";
import { useRouterService } from "@/Shared/Service/routerService";
import { useLoadingStore } from "@/Shared/store/loading.store";
import { AISuggestSizeResponse, AISuggestSizeType } from "@/Shared/types";
import { createContext, useEffect, useState } from "react";

export const AISuggestSize= createContext(
    {
        dataMeasure:undefined as AISuggestSizeType|undefined,
        setDataMeasure: (dataMeasure:AISuggestSizeType)=>{},
        dataAnalysisResponse:undefined as AISuggestSizeResponse|undefined,
        handleAnalysisMeasure: async()=>{},
    }
)
export const AISuggestSizeProvider=({children}:{children:React.ReactNode})=>{
    const [dataMeasure, setDataMeasure]=useState<AISuggestSizeType|undefined>();
    const [dataAnalysisResponse, setDataAnalysisResponse]=useState<AISuggestSizeResponse|undefined>();
    const { startLoading, stopLoading} = useLoadingStore();
    const { navigate }=useRouterService();

    const handleAnalysisMeasure=async()=>{
        try {
            const response= await api_Response(API.AnalysisDataMeasurement.GetSuggestSize,'POST',dataMeasure) ;
            setDataAnalysisResponse(response as AISuggestSizeResponse);
            startLoading?.("Đang phân tích dữ liệu...");
            if(response.statusCode===200){
                setDataAnalysisResponse(response as AISuggestSizeResponse);
            }
            stopLoading?.();
        }
        catch (error) {
            console.log("Error API Suggest Size AI: ",error)
        }
    }
    useEffect(()=>{
        if(dataMeasure){
            handleAnalysisMeasure();
        }
    },[dataMeasure])

    return <AISuggestSize.Provider value={{dataMeasure, setDataMeasure, dataAnalysisResponse, handleAnalysisMeasure   }}>
        {children}
    </AISuggestSize.Provider>
}