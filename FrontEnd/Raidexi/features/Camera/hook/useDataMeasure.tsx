import { BodyMeasureEstimateContext } from "@/provider/BodyMeasureEstimate"
import { API, api_Response } from "@/Shared/Service/Api";
import { ToasterUi } from "@/Shared/Ui/ToasterUi";
import { useContext } from "react"

export const useDataMeasure = () => {
    const context=useContext(BodyMeasureEstimateContext);

    const handleSaveMeasure=async()=>{
       const response = await api_Response(API.Authentication.SaveDataMeasurement,"POST", context.dataMeasured,{});
       ToasterUi(response.isSuccess ? "Lưu dữ liệu thành công" : "Lưu dữ liệu thất bại", response.isSuccess ? "success" : "error");
    }
        
    return {
        handleSaveMeasure
    }
}