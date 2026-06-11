"use client";

import React, { useState, Suspense } from "react";
import { ArrowLeft, Lock, ShieldCheck } from "lucide-react";
import { useLoadingStore } from "@/Shared/store/loading.store";
import { useRouterService } from "@/Shared/Service/routerService";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/features/Auth/hooks/useAuth";
import { ToasterUi } from "@/Shared/Ui/ToasterUi";

const ResetPasswordContent: React.FC = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const { startLoading, stopLoading, isLoading } = useLoadingStore();
  const { navigate } = useRouterService();
  const { ConfirmResetPassword } = useAuth();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const token = searchParams.get("token") || "";

  const handleResetPassword = async (event: React.FormEvent) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      ToasterUi("Mật khẩu xác nhận không khớp!", "error");
      return;
    }

    if (!email || !token) {
      ToasterUi("Đường dẫn không hợp lệ hoặc đã hết hạn.", "error");
      return;
    }

    startLoading?.("Đang cập nhật mật khẩu...");
    
    try {
      await ConfirmResetPassword(email, token, password);
      setIsSuccess(true);
    } catch (error: any) {
      const msg = error.response?.data?.message || "Cập nhật mật khẩu thất bại.";
      ToasterUi(msg, "error");
    } finally {
      stopLoading?.();
    }
  };

  return (
    <main className="rx-page relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-24">
      <button
        className="rx-btn rx-btn-secondary fixed left-5 top-5 z-20"
        onClick={() => window.history.back()}
        type="button"
      >
        <ArrowLeft size={15} strokeWidth={1.35} />
        Quay lại
      </button>

      <div className="rx-container grid items-center gap-8 lg:grid-cols-[0.85fr_1fr]">
        <section className="hidden lg:block">
          <span className="rx-badge rx-badge-blue">Bảo mật tài khoản</span>
          <h1 className="rx-heading-lg mt-6 max-w-[10ch]">
            Khôi phục quyền truy cập.
          </h1>
          <p className="rx-copy mt-6 max-w-lg">
            Nhập mật khẩu mới của bạn để tiếp tục sử dụng Raidexi và truy cập hồ sơ số đo của bạn một cách an toàn.
          </p>
        </section>

        <section className="rx-shell mx-auto w-full max-w-[480px]">
          <div className="rx-core p-6 sm:p-8">
            {!isSuccess ? (
              <>
                <div className="mb-8 text-center">
                  <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--ink)] text-[var(--surface-paper)]">
                    <ShieldCheck size={22} strokeWidth={1.35} />
                  </div>
                  <p className="rx-badge mx-auto">Mật khẩu mới</p>
                  <h2 className="mt-4 text-2xl font-extrabold text-[var(--ink)]">
                    Tạo mật khẩu mới
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-[var(--ink-muted)]">
                    Vui lòng nhập mật khẩu mới mạnh và dễ nhớ cho tài khoản của bạn.
                  </p>
                </div>

                <form onSubmit={handleResetPassword} className="flex flex-col gap-5">
                  <div>
                    <label className="rx-label" htmlFor="password">
                      Mật khẩu mới
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--ink-muted)]" size={16} strokeWidth={1.35} />
                      <input
                        id="password"
                        className="rx-input pl-11"
                        type="password"
                        placeholder="••••••••"
                        required
                        minLength={6}
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="rx-label" htmlFor="confirmPassword">
                      Xác nhận mật khẩu mới
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--ink-muted)]" size={16} strokeWidth={1.35} />
                      <input
                        id="confirmPassword"
                        className="rx-input pl-11"
                        type="password"
                        placeholder="••••••••"
                        required
                        minLength={6}
                        value={confirmPassword}
                        onChange={(event) => setConfirmPassword(event.target.value)}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading || !password || !confirmPassword}
                    className={`rx-btn rx-btn-primary w-full mt-2 ${isLoading || !password || !confirmPassword ? "rx-btn-disabled" : ""}`}
                  >
                    {isLoading ? "Đang xử lý..." : "Cập nhật mật khẩu"}
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-6">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--signal-blue-soft)] text-[var(--signal-blue)]">
                  <ShieldCheck size={32} strokeWidth={1.5} />
                </div>
                <h2 className="text-2xl font-extrabold text-[var(--ink)]">
                  Cập nhật thành công!
                </h2>
                <p className="mt-3 text-sm leading-6 text-[var(--ink-muted)]">
                  Mật khẩu của bạn đã được thay đổi an toàn. Bạn hiện có thể đăng nhập bằng mật khẩu mới.
                </p>
                <button
                  type="button"
                  onClick={() => navigate("/Login")}
                  className="rx-btn rx-btn-primary w-full mt-8"
                >
                  Đăng nhập ngay
                </button>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

const ResetPasswordPage: React.FC = () => {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Đang tải...</div>}>
      <ResetPasswordContent />
    </Suspense>
  );
};

export default ResetPasswordPage;
