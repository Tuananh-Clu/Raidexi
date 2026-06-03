import { API, api_Response } from "@/Shared/Service/Api";
import { ProfileTag } from "../types";
import { useCallback } from "react";

export const useProfileTagApi = () => {
  const saveCustomProfile = useCallback(async (profile: ProfileTag) => {
    return await api_Response(API.Authentication.SaveCustomProfile, "POST", profile);
  }, []);

  const getCustomProfiles = useCallback(async (): Promise<ProfileTag[]> => {
    try {
      const result = await api_Response(API.Authentication.GetCustomProfileForUser, "GET");
      return result.data || [];
    } catch {
      return [];
    }
  }, []);

  const updateCustomProfile = useCallback(async (profile: ProfileTag) => {
    return await api_Response(API.Authentication.UpdateCustomProfile, "PUT", profile);
  }, []);

  return {
    saveCustomProfile,
    getCustomProfiles,
    updateCustomProfile,
  };
};
