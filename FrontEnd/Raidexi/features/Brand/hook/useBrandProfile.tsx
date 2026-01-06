import { API, api_Response } from "@/Shared/Service/Api";

export const useBrandProfile = () => {
    const getBrandProfile = async () => {
        try {
            const response=await api_Response(API.Brand.GetBrandProfile,'GET');
            return response;
        } catch (error) {
            throw error;
        }
    };
    return { getBrandProfile };
};