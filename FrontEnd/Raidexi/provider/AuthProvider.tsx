"use client";
import { useAuthentication } from "@/features/Auth/Hook/Authentication";
import { ToasterUi } from "@/Shared/Ui/ToasterUi";
import { useRouter } from "next/navigation";
import {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useMemo,
  useCallback,
  useContext,
} from "react";
import { BodyMeasureEstimateContext } from "./BodyMeasureEstimate";

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

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { Login, LoginWithGoogle, Logout, Register, GetDataUser } =
    useAuthentication();
  const navigate = useRouter();

  const [userData, setUserData] = useState<any>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("userData");
      return stored ? JSON.parse(stored) : null;
    }
    return null;
  });
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return userData !== null;
  });
  const context=useContext(BodyMeasureEstimateContext)
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await GetDataUser();
        if (data?.user) {
          setIsLoggedIn(true);
          setUserData(data.user);
          localStorage.setItem("userData", JSON.stringify(data.user));
          context?.setDataMeasured?.({
            height: data.user.measureData?.height || null,
            waist:data.user.measureData?.waist || null,
            hip: data.user.measureData?.hip || null,
            chest: data.user.measureData?.chest || null,
            shoulderWidth: data.user.measureData?.shoulderWidth || null,

          });
          localStorage.setItem("userMeaurements",JSON.stringify({
            height: data.user.measureData?.height || null,
            waist:data.user.measureData?.waist || null,
            hip: data.user.measureData?.hip || null,
            chest: data.user.measureData?.chest || null,
            shoulderWidth: data.user.measureData?.shoulderWidth || null,
          }));
        
        }
      } catch (error) {
        console.error("Auth init error:", error);
        localStorage.removeItem("userData");
        setUserData(null);
        setIsLoggedIn(false);

      } finally {
        setLoading(false);
      }
    };

    if (userData === null) {
      fetchUserData();
    } else {
      setLoading(false);
    }
  }, []);

  const AuthLogin = useCallback(
    async (email: string, password: string) => {
      const result = await Login(email, password);
      if (result) {
        setIsLoggedIn(true);
        const data = await GetDataUser();
        if (data?.user) {
          setUserData(data.user);
          localStorage.setItem("userData", JSON.stringify(data.user));
        }
        navigate.push("/");
      ToasterUi("Logged in successfully", "success");
      }
      return result;
    },
    [Login, GetDataUser, navigate]
  );

  const AuthRegister = useCallback(
    async (email: string, password: string, username: string) => {
      return await Register(email, password, username);
    },
    [Register]
  );

  const AuthLoginWithGoogle = useCallback(async () => {
    const result = await LoginWithGoogle();
    if (result.isSuccess) {
      setIsLoggedIn(true);
      setUserData(result.user);
      localStorage.setItem("userData", JSON.stringify(result.user));
      navigate.push("/");
    }
    return result;
  }, [LoginWithGoogle, navigate]);

  const AuthLogout = useCallback(async () => {
    await Logout();
    setIsLoggedIn(false);
    setUserData(null);
    localStorage.removeItem("userData");
    navigate.push("/Login");
    ToasterUi("Logged out successfully", "success");
  }, [Logout, navigate]);

  const AuthGetDataUser = useCallback(async () => {
    const data = await GetDataUser();
    if (data?.user) {
      setUserData(data.user);
      localStorage.setItem("userData", JSON.stringify(data.user));

    }
    return data;
  }, [GetDataUser]);
  const contextValue = useMemo(
    () => ({
      isLoggedIn,
      userData,
      AuthLogin,
      AuthRegister,
      AuthLoginWithGoogle,
      AuthLogout,
      AuthGetDataUser,
      loading,
    }),
    [
      isLoggedIn,
      userData,
      AuthLogin,
      AuthRegister,
      AuthLoginWithGoogle,
      AuthLogout,
      AuthGetDataUser,
      loading,
    ]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
