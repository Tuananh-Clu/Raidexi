
import { API, api_Response } from "./Api";



export function OpenAIService() {
    const getMeasureWithPicture = async (base64String: string) => {
        try {
            const response = await api_Response(
                API.AnalysisDataMeasurement.GetDataFromImage,
                "POST",
                JSON.stringify(base64String),
                {
                    "Content-Type": "application/json",
                }
            );
            if(response.status===429)
            {
                window.alert("You have reached the API rate limit. Please try again later.");
                return null;
            }
            console.log("Raw API Response:", response);
            return response;
        } catch (error) {
            console.error("Error fetching data from image:", error);
            throw error;
        }
    };

    return {
        getMeasureWithPicture,
    };
}