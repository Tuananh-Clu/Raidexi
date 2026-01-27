import { API, api_Response } from "@/Shared/Service/Api";
import { DataToSaveBrandMeasure } from "@/Shared/types";

export const brandApi = {
    getBrandProfile: () => api_Response(API.Brand.GetBrandProfile, 'GET'),
    saveMeasureBrandSize: (data: DataToSaveBrandMeasure | undefined) =>
        api_Response(API.Authentication.SaveMeasureBrandSize, "POST", data, {
            withCredentials: true
        }),
    getBrandMeasurements: () =>
        api_Response(API.Authentication.GetBrandMeasurements, "GET", undefined, {
            withCredentials: true
        }),
};
