import { brandApi } from "../api/brandApi";
import { DataToSaveBrandMeasure } from "@/Shared/types";
import { ToasterUi } from "@/Shared/Ui/ToasterUi";


export const useBrandMeasure = () => {
    const HandleSaveSuggestBrand = async (data: DataToSaveBrandMeasure | undefined) => {
        try {
            await brandApi.saveMeasureBrandSize(data);
            ToasterUi("Lưu thành công", "success");
        } catch (error) {
            throw error;
        }
    };
    const GetBrandMeasureData= async () => {
        try {
            const response = await brandApi.getBrandMeasurements();
            return response;
        } catch (error) {
            throw error;
        }
    };
    return {
        HandleSaveSuggestBrand,
        GetBrandMeasureData
    };
}