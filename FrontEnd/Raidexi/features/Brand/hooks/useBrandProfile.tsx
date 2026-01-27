import { brandApi } from "../api/brandApi";

export const useBrandProfile = () => {
    const getBrandProfile = async () => {
        try {
            const response = await brandApi.getBrandProfile();
            return response;
        } catch (error) {
            throw error;
        }
    };
    return { getBrandProfile };
};