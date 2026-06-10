import { API, api_Response } from "@/Shared/Service/Api";
import { DataToSaveBrandMeasure } from "@/Shared/types";
import { BrandProfileRequest } from "../types";

export const brandApi = {
    getBrandProfile: () => api_Response(API.Brand.GetBrandProfile, 'GET'),
    createBrandProfileRequest: (data: BrandProfileRequest) =>
        api_Response(API.Brand.CreateBrandProfileRequest, "POST", data, {
            withCredentials: true
        }),
    getBrandProfileRequests: () => api_Response(API.Brand.GetBrandProfileRequests, "GET"),
    getMyBrandProfileRequests: () => api_Response(API.Brand.MyBrandProfileRequests, "GET", undefined, {
        withCredentials: true
    }),
    addBrandSizeChart: (data: object) =>
        api_Response(API.Brand.AddBrandSizeChart, "POST", data, {
            withCredentials: true
        }),
    saveMeasureBrandSize: (data: DataToSaveBrandMeasure | undefined) =>
        api_Response(API.Authentication.SaveMeasureBrandSize, "POST", data, {
            withCredentials: true
        }),
    getBrandMeasurements: () =>
        api_Response(API.Authentication.GetBrandMeasurements, "GET", undefined, {
            withCredentials: true
        }),
};
