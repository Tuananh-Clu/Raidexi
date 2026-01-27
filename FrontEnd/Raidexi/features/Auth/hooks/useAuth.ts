import { authApi } from "../api/authApi";
import { auth, provider } from "@/Shared/Service/firebaseService";
import { signInWithPopup } from "firebase/auth";

export const useAuth = () => {
    const Login = async (email: string, password: string) => {
        return await authApi.login({ email, password });
    };

    const Logout = async () => {
        await authApi.logout();
    };

    const Register = async (
        email: string,
        password: string,
        fullname: string
    ) => {
        return await authApi.register({ email, password, fullname });
    };

    const GetDataUser = async () => {
        return await authApi.getDataUser();
    };

    const LoginWithGoogle = async () => {
        const data = await signInWithPopup(auth, provider);
        const token = await data.user.getIdToken();
        return await authApi.loginWithFirebase(token);
    };

    return {
        Login,
        Logout,
        Register,
        GetDataUser,
        LoginWithGoogle,
    };
};
