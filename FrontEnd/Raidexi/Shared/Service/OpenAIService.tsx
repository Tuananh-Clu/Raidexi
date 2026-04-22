
import { API, api_Response } from "./Api";
import axios from "axios";



export function OpenAIService() {
    const getMeasureWithPicture = async (file: File) => {
        try {
            const formData = new FormData();
            formData.append("file", file);

            const response = await api_Response(
                API.AnalysisDataMeasurement.UploadChart,
                "POST",
                formData
            );

            console.log("Raw API Response:", response);
            return response;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 429) {
                window.alert("You have reached the API rate limit. Please try again later.");
                return null;
            }

            console.error("Error fetching data from image:", error);
            throw error;
        }
    };

    return {
        getMeasureWithPicture,
    };
}
