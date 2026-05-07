import { BodyMeasureEstimateContext } from "@/provider/BodyMeasureEstimate"
import { cameraApi } from "../api/cameraApi";
import { ToasterUi } from "@/Shared/Ui/ToasterUi";
import { useContext } from "react"
import { useProfileTagApi } from "./useProfileTagApi";
import { ProfileTag } from "../types";

export const useDataMeasure = () => {
    const context = useContext(BodyMeasureEstimateContext);
    const { updateCustomProfile } = useProfileTagApi();

    const handleSaveMeasure = async (selectedProfile?: ProfileTag | null) => {
        if (selectedProfile && selectedProfile.id !== "self") {
            const data=
            {
                id:selectedProfile.id,
                color:selectedProfile.color,
                dataMeasure:context.dataMeasured[0]?.dataMeasure,
                name:selectedProfile.name
            } as ProfileTag;
            try {
                const response = await updateCustomProfile(data);
                ToasterUi(response.isSuccess ? "Lưu dữ liệu cho người thân thành công" : "Lưu dữ liệu thất bại", response.isSuccess ? "success" : "error");
            } catch (error) {
                ToasterUi("Lưu dữ liệu thất bại", "error");
            }
        } else {
            const response = await cameraApi.saveDataMeasurement(context.dataMeasured[0].dataMeasure);
            ToasterUi(response.isSuccess ? "Lưu dữ liệu thành công" : "Lưu dữ liệu thất bại", response.isSuccess ? "success" : "error");
        }
    }

    return {
        handleSaveMeasure
    }
}