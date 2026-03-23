import { API, api_Response } from "@/Shared/Service/Api";
import { useRouterService } from "@/Shared/Service/routerService";
import { useLoadingStore } from "@/Shared/store/loading.store";
import { AISuggestSizeImageType, AISuggestSizeResponse, AISuggestSizeType } from "@/Shared/types";
import { ToasterUi } from "@/Shared/Ui/ToasterUi";
import { createContext, useEffect, useState } from "react";

export const AISuggestSize= createContext(
    {
        dataMeasure:undefined as AISuggestSizeType|undefined,
        setDataMeasure: (dataMeasure:AISuggestSizeType)=>{},
        dataAnalysisResponse:undefined as AISuggestSizeResponse|undefined,
        handleAnalysisMeasure: async()=>{},
        handleAnalysisMeasureForImage: async()=>{},
        setDataMeasureForImage: (dataMeasureForImage:AISuggestSizeImageType)=>{}
    }
)
export const AISuggestSizeProvider=({children}:{children:React.ReactNode})=>{
    const [dataMeasure, setDataMeasure]=useState<AISuggestSizeType|undefined>();
    const [dataMeasureForImage, setDataMeasureForImage]=useState<AISuggestSizeImageType>();
    const [dataAnalysisResponse, setDataAnalysisResponse]=useState<AISuggestSizeResponse|undefined>();
    const { startLoading, stopLoading} = useLoadingStore();
    const {navigate}=useRouterService();
    const handleAnalysisMeasure=async()=>{
        try {
            startLoading?.("Đang phân tích dữ liệu...");
            const response= await api_Response(API.AnalysisDataMeasurement.GetSuggestSize,'POST',dataMeasure) ;
            if(response.data!==null){
                setDataAnalysisResponse(response as AISuggestSizeResponse);
                navigate(`Brand/result?brand=${dataMeasure?.brand}`)
            }
            if(response.statusCode===429)
            {
                ToasterUi("Bạn đã sử dụng hết lượt dùng thử trong ngày, vui lòng thử lại sau!","error");
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
    const handleAnalysisMeasureForImage=async()=>{
        try {
            startLoading?.("Đang phân tích dữ liệu...");
            const response= await api_Response(API.AnalysisDataMeasurement.AnalyseFromImage,'POST',dataMeasureForImage) ;
            if(response.data!==null){
                setDataAnalysisResponse(response as AISuggestSizeResponse);
                navigate(`Brand/result?brand=fromImage`)
            }
            if(response.statusCode===429)            {
                ToasterUi("Bạn đã sử dụng hết lượt dùng thử trong ngày, vui lòng thử lại sau!","error");
            }
            stopLoading?.();
        }
        catch (error) {
            console.log("Error API Suggest Size AI: ",error)
        }
        }
        useEffect(()=>{
            if(dataMeasureForImage){
                handleAnalysisMeasureForImage();
            }
        },[dataMeasureForImage])

    return <AISuggestSize.Provider value={{dataMeasure, setDataMeasure, dataAnalysisResponse, handleAnalysisMeasure, handleAnalysisMeasureForImage, setDataMeasureForImage   }}>
        {children}
    </AISuggestSize.Provider>
}