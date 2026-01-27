import { BodyMeasureEstimateContext } from "@/provider/BodyMeasureEstimate"
import { cameraApi } from "../api/cameraApi";
import { ToasterUi } from "@/Shared/Ui/ToasterUi";
import { useContext } from "react"

export const useDataMeasure = () => {
    const context = useContext(BodyMeasureEstimateContext);

    const handleSaveMeasure = async () => {
        const response = await cameraApi.saveDataMeasurement(context.dataMeasured);
        ToasterUi(response.isSuccess ? "Lưu dữ liệu thành công" : "Lưu dữ liệu thất bại", response.isSuccess ? "success" : "error");
    }

    return {
        handleSaveMeasure
    }
}