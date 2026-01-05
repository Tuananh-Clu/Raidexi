"use client";

import { API, api_Response } from "@/Shared/Service/Api";
import { auth, provider } from "@/Shared/Service/firebaseService";
import { signInWithPopup } from "firebase/auth";

export const useAuthentication = () => {
  const Login = async (email: string, password: string) => {
    const data = await api_Response(API.Authentication.Login, "POST", {
      email,
      password,
    });
    return data;
  };
  const Logout = async () => {
    await api_Response(API.Authentication.Logout, "POST", {});
  };

  const Register = async (
    email: string,
    password: string,
    fullname: string
  ) => {
    const data = await api_Response(API.Authentication.Register, "POST", {
      email: email,
      password: password,
      fullname: fullname,
    });
    return data;
  };

  const GetDataUser = async () => {
    const data = await api_Response(
      API.Authentication.GetDataUser,
      "GET",
      {},
      {}
    );
    return data;
  };
  const LoginWithGoogle = async () => {
    const data = await signInWithPopup(auth, provider);
    const token = await data.user.getIdToken();
   const response = await api_Response(
      `${API.Authentication.LoginWithFirebase}?token=${token}`,
      "POST",
      {}
    );
    return response;
  };
  return {
    Login,
    Logout,
    Register,
    GetDataUser,
    LoginWithGoogle,
  };
};
