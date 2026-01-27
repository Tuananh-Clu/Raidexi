import { API, api_Response } from "@/Shared/Service/Api";

export const cameraApi = {
    saveDataMeasurement: (data: any) =>
        api_Response(API.Authentication.SaveDataMeasurement, "POST", data, {})
};
