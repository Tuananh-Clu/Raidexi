"use client";
import React, { useContext, useState } from "react";
import { ChromiumIcon, ArrowLeft, Lock, Mail } from "lucide-react";
import { AuthContext } from "@/provider/AuthProvider";
import { useLoadingStore } from "@/Shared/store/loading.store";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keepActive, setKeepActive] = useState(false);
  const { startLoading, stopLoading, isLoading } = useLoadingStore();
  const context = useContext(AuthContext);

  const handleInitialize = (e: React.FormEvent) => {
    e.preventDefault();
    startLoading?.("Đang đăng nhập...");
    setTimeout(async () => {
      await context?.AuthLogin(email, password);
      stopLoading?.();
    }, 2000);
  };

  const handleSSO = () => {
    startLoading?.("Đang chuyển hướng đến Google...");
    setTimeout(async () => {
      await context?.AuthLoginWithGoogle();
      stopLoading?.();
    }, 2000);
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f8fafc] via-[#e0f2fe] to-[#dbeafe]" />
      <div className="absolute inset-0 bg-dot-pattern opacity-30" />
      <div className="absolute top-10 right-[15%] w-80 h-80 rounded-full bg-gradient-to-br from-[#2563eb]/8 to-[#06b6d4]/6 blur-3xl" />
      <div className="absolute bottom-10 left-[10%] w-64 h-64 rounded-full bg-gradient-to-tr from-[#06b6d4]/6 to-[#2563eb]/5 blur-3xl" />

      {/* Back button */}
      <button className="fixed z-20 top-6 left-6 flex items-center gap-2 px-4 py-2 rounded-xl bg-white/80 border border-[#e2e8f0] text-[#334155] text-sm font-medium hover:bg-white hover:shadow-sm transition-all backdrop-blur-sm"
        onClick={() => window.history.back()}>
        <ArrowLeft size={16} />
        Quay lại
      </button>

      {/* Login card */}
      <div className="relative z-10 w-full max-w-[440px] mx-4">
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl border border-[#e2e8f0] shadow-xl shadow-[#2563eb]/5 overflow-hidden">
          {/* Header */}
          <div className="px-8 pt-8 pb-6 text-center">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#2563eb] to-[#06b6d4] flex items-center justify-center mx-auto mb-5 shadow-lg shadow-[#2563eb]/20">
              <Lock size={22} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold text-[#0f172a] mb-1">Đăng nhập Raidexi</h1>
            <p className="text-sm text-[#64748b]">Truy cập vào hệ thống đo lường cơ thể</p>
          </div>

          <form onSubmit={handleInitialize} className="px-8 pb-8 flex flex-col gap-5">
            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#334155]">Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94a3b8]" />
                <input type="email" placeholder="you@example.com" required
                  value={email} onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-11 pl-10 pr-4 rounded-xl bg-[#f8fafc] border border-[#e2e8f0] text-[#0f172a] text-sm focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/10 transition-all placeholder:text-[#cbd5e1]" />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#334155]">Mật khẩu</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94a3b8]" />
                <input type="password" placeholder="••••••••" required
                  value={password} onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-11 pl-10 pr-4 rounded-xl bg-[#f8fafc] border border-[#e2e8f0] text-[#0f172a] text-sm focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/10 transition-all placeholder:text-[#cbd5e1]" />
              </div>
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" checked={keepActive}
                  onChange={(e) => setKeepActive(e.target.checked)}
                  className="w-4 h-4 rounded-md border border-[#cbd5e1] bg-white checked:bg-[#2563eb] checked:border-[#2563eb] text-white focus:ring-0 focus:ring-offset-0 transition-colors" />
                <span className="text-sm text-[#64748b] group-hover:text-[#334155] transition-colors">Ghi nhớ</span>
              </label>
              <a href="#" className="text-sm text-[#2563eb] hover:text-[#1d4ed8] font-medium transition-colors"
                onClick={(e) => { e.preventDefault(); alert("Chức năng đặt lại mật khẩu."); }}>
                Quên mật khẩu?
              </a>
            </div>

            {/* Submit */}
            <button type="submit" disabled={isLoading}
              className={`w-full h-11 rounded-xl bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] text-white font-semibold text-sm shadow-md shadow-[#2563eb]/20 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 ${isLoading ? 'opacity-70 cursor-wait' : ''}`}>
              {isLoading ? "Đang xử lý..." : "Đăng nhập"}
            </button>

            {/* Divider */}
            <div className="relative flex items-center py-1">
              <div className="flex-grow h-px bg-[#e2e8f0]" />
              <span className="px-4 text-xs text-[#94a3b8] font-medium">hoặc</span>
              <div className="flex-grow h-px bg-[#e2e8f0]" />
            </div>

            {/* Google SSO */}
            <button type="button" onClick={handleSSO}
              className="w-full h-11 rounded-xl border border-[#e2e8f0] bg-white text-[#334155] font-semibold text-sm hover:bg-[#f8fafc] hover:border-[#cbd5e1] hover:shadow-sm transition-all flex items-center justify-center gap-2">
              <ChromiumIcon size={16} />
              Đăng nhập với Google
            </button>

            {/* Sign up link */}
            <p className="text-center text-sm text-[#64748b] pt-2">
              Chưa có tài khoản?{" "}
              <a href="/SignUp" className="text-[#2563eb] font-semibold hover:text-[#1d4ed8] transition-colors">
                Đăng ký miễn phí
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
