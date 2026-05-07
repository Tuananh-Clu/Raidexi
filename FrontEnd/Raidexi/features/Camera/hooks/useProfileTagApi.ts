import { API, api_Response } from "@/Shared/Service/Api";
import { ProfileTag } from "../types";
import { useCallback } from "react";

export const useProfileTagApi = () => {

  const saveCustomProfile = useCallback(async (profile: ProfileTag) => {
    try {
      const result = await api_Response(
        API.Authentication.SaveCustomProfile,
        "POST",
        profile
      );
      return result;
    } catch (error) {
      console.error("❌ Error saving custom profile:", error);
      throw error;
    }
  }, []);

  const getCustomProfiles = useCallback(async (): Promise<ProfileTag[]> => {
    try {
      const result = await api_Response(
        API.Authentication.GetCustomProfileForUser,
        "GET"
      );
      return result.data || [];
    } catch (error) {
      console.error("❌ Error fetching custom profiles:", error);
      return [];
    }
  }, []);

  const updateCustomProfile = useCallback(async (profile: ProfileTag) => {
    try {
      const result = await api_Response(
        API.Authentication.UpdateCustomProfile,
        "PUT",
        profile
      );
      return result;
    } catch (error) {
      console.error("❌ Error updating custom profile:", error);
      throw error;
    }
  }, []);

  return {
    saveCustomProfile,
    getCustomProfiles,
    updateCustomProfile,
  };
};
