"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, X, KeyRound, CheckCircle2 } from "lucide-react";
import { useLoadingStore } from "@/Shared/store/loading.store";
import { useAuth } from "@/features/Auth/hooks/useAuth";
import { ToasterUi } from "@/Shared/Ui/ToasterUi";

interface ResetPasswordPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResetPasswordPopup: React.FC<ResetPasswordPopupProps> = ({
  isOpen,
  onClose,
}) => {
  const [email, setEmail] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const { startLoading, stopLoading, isLoading } = useLoadingStore();
  const { ResetPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    startLoading?.("Đang gửi yêu cầu...");
    
    try {
      await ResetPassword(email);
      setIsSuccess(true);
    } catch (error) {
      ToasterUi("Gửi yêu cầu thất bại. Vui lòng kiểm tra lại email.", "error");
    } finally {
      stopLoading?.();
    }
  };

  const handleClose = () => {
    setIsSuccess(false);
    setEmail("");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="rx-modal-backdrop z-40"
            onClick={handleClose}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="rx-shell w-full max-w-[420px] pointer-events-auto"
            >
              <div className="rx-core relative p-6 sm:p-8">
                <button
                  type="button"
                  onClick={handleClose}
                  className="absolute right-4 top-4 text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors"
                >
                  <X size={20} strokeWidth={1.5} />
                </button>

                {!isSuccess ? (
                  <>
                    <div className="mb-6 text-center">
                      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[rgba(24,23,20,0.05)] text-[var(--ink)]">
                        <KeyRound size={20} strokeWidth={1.5} />
                      </div>
                      <h2 className="text-xl font-extrabold text-[var(--ink)]">
                        Quên mật khẩu?
                      </h2>
                      <p className="mt-2 text-sm leading-6 text-[var(--ink-muted)]">
                        Nhập email của bạn và chúng tôi sẽ gửi liên kết để đặt lại mật khẩu.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                      <div>
                        <label className="rx-label" htmlFor="reset-email">
                          Email của bạn
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--ink-muted)]" size={16} strokeWidth={1.35} />
                          <input
                            id="reset-email"
                            className="rx-input pl-11"
                            type="email"
                            placeholder="ban@example.com"
                            required
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={isLoading || !email}
                        className={`rx-btn rx-btn-primary w-full mt-2 ${isLoading || !email ? "rx-btn-disabled" : ""}`}
                      >
                        {isLoading ? "Đang gửi..." : "Gửi liên kết"}
                      </button>
                    </form>
                  </>
                ) : (
                  <div className="text-center py-4">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 20 }}
                      className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--signal-blue-soft)] text-[var(--signal-blue)]"
                    >
                      <CheckCircle2 size={28} strokeWidth={1.5} />
                    </motion.div>
                    <h2 className="text-xl font-extrabold text-[var(--ink)]">
                      Đã gửi liên kết!
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-[var(--ink-muted)]">
                      Vui lòng kiểm tra hộp thư email <strong>{email}</strong> để đặt lại mật khẩu của bạn.
                    </p>
                    <button
                      type="button"
                      onClick={handleClose}
                      className="rx-btn rx-btn-secondary w-full mt-6"
                    >
                      Quay lại đăng nhập
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
