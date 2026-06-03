"use client";

import React, { useContext, useState } from "react";
import { ArrowRight, Lock, Mail, User, UserPlus } from "lucide-react";
import { AuthContext } from "@/provider/AuthProvider";
import { NavBar } from "@/Shared/Components/components/NavBar";
import { useRouterService } from "@/Shared/Service/routerService";

const RegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreed: false,
  });
  const context = useContext(AuthContext);
  const { navigate } = useRouterService();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = event.target;
    setFormData((current) => ({
      ...current,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    context?.AuthRegister(formData.email, formData.password, formData.fullname, "user");
  };

  return (
    <div className="rx-page min-h-screen">
      <NavBar />
      <main className="rx-section pt-28">
        <div className="rx-container grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <section>
            <span className="rx-badge rx-badge-brass">Thiết lập hồ sơ fit</span>
            <h1 className="rx-heading-lg mt-6 max-w-[10ch]">
              Tạo hồ sơ đo dùng cho mọi thương hiệu.
            </h1>
            <p className="rx-copy mt-6 max-w-xl">
              Tài khoản giúp bạn lưu số đo, xem lịch sử cơ thể và nhận gợi ý size có ngữ cảnh theo từng bảng size thật.
            </p>
          </section>

          <section className="rx-shell w-full">
            <div className="rx-core p-6 sm:p-8">
              <div className="mb-7 text-center">
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--ink)] text-[var(--surface-paper)]">
                  <UserPlus size={22} strokeWidth={1.35} />
                </div>
                <p className="rx-badge mx-auto">Tài khoản mới</p>
                <h2 className="mt-4 text-2xl font-extrabold text-[var(--ink)]">
                  Đăng ký Raidexi
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="grid gap-5">
                <div>
                  <label htmlFor="fullname" className="rx-label">
                    Họ và tên
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--ink-muted)]" size={16} strokeWidth={1.35} />
                    <input
                      id="fullname"
                      type="text"
                      placeholder="Nhập họ tên đầy đủ"
                      required
                      value={formData.fullname}
                      onChange={handleChange}
                      className="rx-input pl-11"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="rx-label">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--ink-muted)]" size={16} strokeWidth={1.35} />
                    <input
                      id="email"
                      type="email"
                      placeholder="ban@example.com"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="rx-input pl-11"
                    />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="password" className="rx-label">
                      Mật khẩu
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--ink-muted)]" size={16} strokeWidth={1.35} />
                      <input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        required
                        value={formData.password}
                        onChange={handleChange}
                        className="rx-input pl-11"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="confirmPassword" className="rx-label">
                      Xác nhận
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--ink-muted)]" size={16} strokeWidth={1.35} />
                      <input
                        id="confirmPassword"
                        type="password"
                        placeholder="••••••••"
                        required
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="rx-input pl-11"
                      />
                    </div>
                  </div>
                </div>

                <label className="flex items-start gap-3 text-sm leading-6 text-[var(--ink-muted)]">
                  <input
                    id="agreed"
                    type="checkbox"
                    checked={formData.agreed}
                    onChange={handleChange}
                    className="mt-1 h-4 w-4 rounded border-[rgba(24,23,20,0.22)] bg-[var(--surface-paper)] text-[var(--signal-blue)]"
                  />
                  <span>
                    Tôi đồng ý với{" "}
                    <a href="#" className="font-bold text-[var(--signal-blue)]">
                      Điều khoản Dịch vụ
                    </a>{" "}
                    và{" "}
                    <a href="#" className="font-bold text-[var(--signal-blue)]">
                      Chính sách Bảo mật
                    </a>
                  </span>
                </label>

                <button type="submit" className="rx-btn rx-btn-primary w-full">
                  Đăng ký
                  <ArrowRight size={16} strokeWidth={1.35} />
                </button>

                <p className="text-center text-sm text-[var(--ink-muted)]">
                  Đã có tài khoản?{" "}
                  <button
                    type="button"
                    onClick={() => navigate("/Login")}
                    className="font-bold text-[var(--signal-blue)]"
                  >
                    Đăng nhập
                  </button>
                </p>
              </form>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default RegistrationForm;
