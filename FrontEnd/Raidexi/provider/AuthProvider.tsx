"use client";
import { useAuthentication } from "@/features/Auth/Hook/Authentication";
import { useRouter } from "next/navigation";
import { createContext, useState, ReactNode, useLayoutEffect } from "react";
export interface AuthContextType {
  isLoggedIn: boolean;
  userData: any;
  AuthLogin: (email: string, password: string) => Promise<boolean>;
  AuthRegister: (
    email: string,
    password: string,
    username: string
  ) => Promise<boolean>;
  AuthLoginWithGoogle: () => Promise<boolean>;
  AuthLogout: () => Promise<void>;
  AuthGetDataUser: () => Promise<any>;
  loading: boolean;
}
export const AuthContext = createContext<AuthContextType | null>({
  isLoggedIn: false,
  userData: null,
  AuthLogin: async (email: string, password: string) => false,
  AuthRegister: async (email: string, password: string, username: string) =>
    false,
  AuthLoginWithGoogle: async () => false,
  AuthLogout: async () => {},
  AuthGetDataUser: async () => null,
  loading: true,
});

interface AuthProviderProps {
  children: ReactNode;
}
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { Login, LoginWithGoogle, Logout, Register, GetDataUser } =
    useAuthentication();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const navigate = useRouter();
   const [loading, setLoading] = useState(true);  

  useLayoutEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await GetDataUser();
        if (data) {
          setIsLoggedIn(true);
          setUserData(data);
        }
      } catch (error) {
        console.error('Auth init error:', error);
      } finally {
        setLoading(false);  
      }
    };
    fetchUserData();
  }, []);

  const AuthLogin = async (email: string, password: string) => {
    const result = await Login(email, password);
    if (result) {
      setIsLoggedIn(true);
      const data = await GetDataUser();
      setUserData(data);
      navigate.push("/");
    }
    return result;
  };
  const AuthRegister = async (
    email: string,
    password: string,
    username: string
  ) => {
    const result = await Register(email, password, username);
    return result;
  };

  const AuthLoginWithGoogle = async () => {
    const result = await LoginWithGoogle();
    if (result.isSuccess) {
      setIsLoggedIn(true);
      setUserData(result.user);
      navigate.push("/");
    }
    return result;
  };

  const AuthLogout = async () => {
    await Logout();
    setIsLoggedIn(false);
    setUserData(null);
    navigate.push("/Login");
  };

  const AuthGetDataUser = async () => {
    const data = await GetDataUser();
    setUserData(data);
    return data;
  };
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        userData,
        AuthLogin,
        AuthRegister,
        AuthLoginWithGoogle,
        AuthLogout,
        AuthGetDataUser,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
