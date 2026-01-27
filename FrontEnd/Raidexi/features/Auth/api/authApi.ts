import { API, api_Response } from "@/Shared/Service/Api";
import { LoginParams, RegisterParams } from "../types";

export const authApi = {
    login: (params: LoginParams) => api_Response(API.Authentication.Login, "POST", params),
    register: (params: RegisterParams) =>
        api_Response(API.Authentication.Register, "POST", {
            email: params.email,
            password: params.password,
            fullname: params.fullname
        }),
    logout: () => api_Response(API.Authentication.Logout, "POST", {}),
    getDataUser: () => api_Response(API.Authentication.GetDataUser, "GET", {}, {}),
    loginWithFirebase: (token: string) =>
        api_Response(`${API.Authentication.LoginWithFirebase}?token=${token}`, "POST", {})
};
