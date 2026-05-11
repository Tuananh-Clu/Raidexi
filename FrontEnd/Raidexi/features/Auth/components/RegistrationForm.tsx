"use client"
import React, { useContext, useState } from 'react';
import { AuthContext } from '@/provider/AuthProvider';
import { useRouterService } from '@/Shared/Service/routerService';
import { NavBar } from '@/Shared/Components/components/NavBar';
import { UserPlus, Mail, Lock, User, ArrowRight } from 'lucide-react';

const RegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreed: false
  });
  const context = useContext(AuthContext);
  const { navigate } = useRouterService();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    context?.AuthRegister(formData.email, formData.password, formData.fullname);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <div className="flex-1 relative flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#f8fafc] via-[#e0f2fe] to-[#dbeafe]" />
        <div className="absolute inset-0 bg-dot-pattern opacity-30" />
        <div className="absolute top-20 right-[10%] w-72 h-72 rounded-full bg-gradient-to-br from-[#2563eb]/8 to-[#06b6d4]/6 blur-3xl" />
        <div className="absolute bottom-20 left-[10%] w-56 h-56 rounded-full bg-gradient-to-tr from-[#06b6d4]/6 to-[#2563eb]/5 blur-3xl" />

        {/* Form card */}
        <div className="relative z-10 w-full max-w-[520px] mx-4 my-12">
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl border border-[#e2e8f0] shadow-xl shadow-[#2563eb]/5 overflow-hidden">
            {/* Header */}
            <div className="px-8 pt-8 pb-5 text-center">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#2563eb] to-[#06b6d4] flex items-center justify-center mx-auto mb-5 shadow-lg shadow-[#2563eb]/20">
                <UserPlus size={22} className="text-white" />
              </div>
              <h1 className="text-2xl font-bold text-[#0f172a] mb-1">Tạo tài khoản mới</h1>
              <p className="text-sm text-[#64748b]">Bắt đầu đo lường cơ thể chính xác với AI</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="px-8 pb-8 flex flex-col gap-4">
              {/* Full name */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="fullname" className="text-xs font-semibold text-[#334155]">Họ và tên</label>
                <div className="relative">
                  <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94a3b8]" />
                  <input id="fullname" type="text" placeholder="Nhập họ tên đầy đủ" required
                    value={formData.fullname} onChange={handleChange}
                    className="w-full h-11 pl-10 pr-4 rounded-xl bg-[#f8fafc] border border-[#e2e8f0] text-[#0f172a] text-sm focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/10 transition-all placeholder:text-[#cbd5e1]" />
                </div>
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-xs font-semibold text-[#334155]">Email</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94a3b8]" />
                  <input id="email" type="email" placeholder="you@example.com" required
                    value={formData.email} onChange={handleChange}
                    className="w-full h-11 pl-10 pr-4 rounded-xl bg-[#f8fafc] border border-[#e2e8f0] text-[#0f172a] text-sm focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/10 transition-all placeholder:text-[#cbd5e1]" />
                </div>
              </div>

              {/* Passwords */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="password" className="text-xs font-semibold text-[#334155]">Mật khẩu</label>
                  <div className="relative">
                    <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94a3b8]" />
                    <input id="password" type="password" placeholder="••••••••" required
                      value={formData.password} onChange={handleChange}
                      className="w-full h-11 pl-10 pr-4 rounded-xl bg-[#f8fafc] border border-[#e2e8f0] text-[#0f172a] text-sm focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/10 transition-all placeholder:text-[#cbd5e1]" />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="confirmPassword" className="text-xs font-semibold text-[#334155]">Xác nhận</label>
                  <div className="relative">
                    <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94a3b8]" />
                    <input id="confirmPassword" type="password" placeholder="••••••••" required
                      value={formData.confirmPassword} onChange={handleChange}
                      className="w-full h-11 pl-10 pr-4 rounded-xl bg-[#f8fafc] border border-[#e2e8f0] text-[#0f172a] text-sm focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/10 transition-all placeholder:text-[#cbd5e1]" />
                  </div>
                </div>
              </div>

              {/* Terms */}
              <label className="flex items-start gap-3 mt-1 cursor-pointer group">
                <input id="agreed" type="checkbox" checked={formData.agreed} onChange={handleChange}
                  className="w-4 h-4 mt-0.5 rounded-md border border-[#cbd5e1] bg-white checked:bg-[#2563eb] checked:border-[#2563eb] focus:ring-0 focus:ring-offset-0 transition-colors" />
                <span className="text-sm text-[#64748b] group-hover:text-[#334155] transition-colors leading-snug">
                  Tôi đồng ý với{' '}
                  <a href="#" className="text-[#2563eb] font-medium hover:underline">Điều khoản Dịch vụ</a>
                  {' '}và{' '}
                  <a href="#" className="text-[#2563eb] font-medium hover:underline">Chính sách Bảo mật</a>
                </span>
              </label>

              {/* Submit */}
              <button type="submit"
                className="w-full h-11 rounded-xl bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] text-white font-semibold text-sm shadow-md shadow-[#2563eb]/20 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 mt-2">
                Đăng ký
                <ArrowRight size={16} />
              </button>

              {/* Login link */}
              <p className="text-center text-sm text-[#64748b] pt-1">
                Đã có tài khoản?{' '}
                <button type="button" onClick={() => navigate('/Login')}
                  className="text-[#2563eb] font-semibold hover:text-[#1d4ed8] transition-colors">
                  Đăng nhập
                </button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;