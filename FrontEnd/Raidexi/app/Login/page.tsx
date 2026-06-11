"use client";

import React, { useContext, useState } from "react";
import { ArrowLeft, Lock, Mail } from "lucide-react";
import { AuthContext } from "@/provider/AuthProvider";
import { useLoadingStore } from "@/Shared/store/loading.store";
import { ResetPasswordPopup } from "@/features/Auth/components/ResetPasswordPopup";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keepActive, setKeepActive] = useState(false);
  const [isResetPopupOpen, setIsResetPopupOpen] = useState(false);
  const { startLoading, stopLoading, isLoading } = useLoadingStore();
  const context = useContext(AuthContext);

  const handleInitialize = (event: React.FormEvent) => {
    event.preventDefault();
    startLoading?.("Đang đăng nhập...");
    setTimeout(async () => {
      await context?.AuthLogin(email, password);
      stopLoading?.();
    }, 900);
  };

  const handleSSO = () => {
    startLoading?.("Đang chuyển hướng đến Google...");
    setTimeout(async () => {
      await context?.AuthLoginWithGoogle();
      stopLoading?.();
    }, 900);
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
          <span className="rx-badge rx-badge-blue">Hồ sơ fit riêng tư</span>
          <h1 className="rx-heading-lg mt-6 max-w-[9ch]">
            Mở hồ sơ số đo của bạn.
          </h1>
          <p className="rx-copy mt-6 max-w-lg">
            Đăng nhập để lưu lịch sử đo, xem lại hồ sơ cơ thể và chuyển số đo sang size của từng thương hiệu.
          </p>
        </section>

        <section className="rx-shell mx-auto w-full max-w-[480px]">
          <div className="rx-core p-6 sm:p-8">
            <div className="mb-8 text-center">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--ink)] text-[var(--surface-paper)]">
                <Lock size={22} strokeWidth={1.35} />
              </div>
              <p className="rx-badge mx-auto">Truy cập tài khoản</p>
              <h2 className="mt-4 text-2xl font-extrabold text-[var(--ink)]">
                Đăng nhập Raidexi
              </h2>
              <p className="mt-2 text-sm leading-6 text-[var(--ink-muted)]">
                Tiếp tục với hồ sơ chọn size cá nhân.
              </p>
            </div>

            <form onSubmit={handleInitialize} className="flex flex-col gap-5">
              <div>
                <label className="rx-label" htmlFor="email">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--ink-muted)]" size={16} strokeWidth={1.35} />
                  <input
                    id="email"
                    className="rx-input pl-11"
                    type="email"
                    placeholder="ban@example.com"
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="rx-label" htmlFor="password">
                  Mật khẩu
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--ink-muted)]" size={16} strokeWidth={1.35} />
                  <input
                    id="password"
                    className="rx-input pl-11"
                    type="password"
                    placeholder="••••••••"
                    required
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between gap-4">
                <label className="flex items-center gap-2 text-sm text-[var(--ink-muted)]">
                  <input
                    type="checkbox"
                    checked={keepActive}
                    onChange={(event) => setKeepActive(event.target.checked)}
                    className="h-4 w-4 rounded border-[rgba(24,23,20,0.22)] bg-[var(--surface-paper)] text-[var(--signal-blue)]"
                  />
                  Ghi nhớ
                </label>
                <button
                  type="button"
                  className="text-sm font-bold text-[var(--signal-blue)]"
                  onClick={() => setIsResetPopupOpen(true)}
                >
                  Quên mật khẩu?
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`rx-btn rx-btn-primary w-full ${isLoading ? "rx-btn-disabled" : ""}`}
              >
                {isLoading ? "Đang xử lý..." : "Đăng nhập"}
              </button>

              <div className="flex items-center gap-4 py-1">
                <div className="h-px flex-1 bg-[rgba(24,23,20,0.1)]" />
                <span className="font-mono text-[10px] uppercase text-[var(--ink-muted)]">
                  hoặc
                </span>
                <div className="h-px flex-1 bg-[rgba(24,23,20,0.1)]" />
              </div>

              <button type="button" onClick={handleSSO} className="rx-btn rx-btn-secondary w-full">
                <span className="font-mono text-xs">G</span>
                Đăng nhập với Google
              </button>

              <p className="text-center text-sm text-[var(--ink-muted)]">
                Chưa có tài khoản?{" "}
                <a href="/SignUp" className="font-bold text-[var(--signal-blue)]">
                  Đăng ký miễn phí
                </a>
              </p>
            </form>
          </div>
        </section>
      </div>

      <ResetPasswordPopup isOpen={isResetPopupOpen} onClose={() => setIsResetPopupOpen(false)} />
    </main>
  );
};

export default LoginPage;
