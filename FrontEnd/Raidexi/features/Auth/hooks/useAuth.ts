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
        fullname: string,
        typeLogin: string
    ) => {
        return await authApi.register({ email, password, fullname, typeLogin });
    };

    const GetDataUser = async () => {
        return await authApi.getDataUser();
    };

    const LoginWithGoogle = async () => {
        const data = await signInWithPopup(auth, provider);
        const token = await data.user.getIdToken();
        return await authApi.loginWithFirebase(token);
    };

    const ResetPassword = async (email: string) => {
        return await authApi.resetPassword(email);
    };

    const ConfirmResetPassword = async (email: string, token: string, newPassword: string) => {
        return await authApi.confirmResetPassword({ email, token, newPassword });
    };

    return {
        Login,
        Logout,
        Register,
        GetDataUser,
        LoginWithGoogle,
        ResetPassword,
        ConfirmResetPassword,
    };
};
