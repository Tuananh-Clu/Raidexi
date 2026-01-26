import { API, api_Response } from "@/Shared/Service/Api";
import { AISuggestSizeResponse, DataToSaveBrandMeasure } from "@/Shared/types";
import { ToasterUi } from "@/Shared/Ui/ToasterUi";

export const useBrandMeasure = () => {
    const HandleSaveSuggestBrand=async(data:DataToSaveBrandMeasure|undefined)=>{
        try {
            await api_Response(API.Authentication.SaveMeasureBrandSize,"POST",data,{
                withCredentials: true
            })
            ToasterUi("Lưu thành công","success");
        }catch (error) {
            throw error;
        }
    };
    return {
        HandleSaveSuggestBrand
    };
}