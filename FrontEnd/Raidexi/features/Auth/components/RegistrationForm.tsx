"use client"
import React, { useContext, useState } from 'react';
import { InputGroup } from './InputGroup';
import { AuthContext } from '@/provider/AuthProvider';
import { useRouterService } from '@/Shared/Service/routerService';


const RegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreed: false
  });
  const context=useContext(AuthContext);
  const {navigate}=useRouterService();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    context?.AuthRegister(formData.email,formData.password,formData.fullname);
  };

  return (
    <div className="w-full max-w-200 border border-border-dark bg-[#1c1912] relative flex flex-col shadow-2xl shadow-black/50">
      <div className="absolute w-4 h-4 border-t-2 border-l-2 -top-1 -left-1 border-primary"></div>
      <div className="absolute w-4 h-4 border-t-2 border-r-2 -top-1 -right-1 border-primary"></div>
      <div className="absolute w-4 h-4 border-b-2 border-l-2 -bottom-1 -left-1 border-primary"></div>
      <div className="absolute w-4 h-4 border-b-2 border-r-2 -bottom-1 -right-1 border-primary"></div>


      <div className="p-8 border-b border-border-dark md:p-10 bg-surface-dark/30">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-black leading-tight tracking-tight text-white md:text-4xl font-display">
            KHỞI TẠO TÀI KHOẢN CÁ NHÂN
          </h2>
          <p className="text-[#b9b29d] text-lg font-normal italic font-display">
            Thiết lập định danh truy cập vào mạng lưới dữ liệu.
          </p>
        </div>
      </div>

      {/* Form Content */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-8 p-8 md:p-10">
        <InputGroup
          id="fullname"
          label="01 // Họ và Tên"
          type="text"
          placeholder="Nhập tên định danh của bạn"
          value={formData.fullname}
          onChange={handleChange}
        />

        <InputGroup
          id="email"
          label="02 // Địa chỉ Email"
          type="email"
          placeholder="name@organization.com"
          value={formData.email}
          onChange={handleChange}
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <InputGroup
            id="password"
            label="03 // Mật khẩu"
            type="password"
            placeholder="••••••••••••"
            value={formData.password}
            onChange={handleChange}
          />
          <InputGroup
            id="confirmPassword"
            label="04 // Xác nhận mật khẩu"
            type="password"
            placeholder="••••••••••••"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>

        <div className="flex items-start gap-3 mt-2 cursor-pointer group">
          <div className="flex items-center h-6">
            <input
              id="agreed"
              type="checkbox"
              className="w-5 h-5 transition-all border rounded-none cursor-pointer border-primary/50 bg-background-dark focus:ring-offset-0 focus:ring-0 text-primary"
              checked={formData.agreed}
              onChange={handleChange}
            />
          </div>
          <label
            htmlFor="agreed"
            className="text-[#b9b29d] text-base leading-6 cursor-pointer select-none group-hover:text-white transition-colors font-sans"
          >
            Tôi xác nhận đã đọc và đồng ý với{' '}
            <a
              href="#"
              className="underline text-primary underline-offset-4 decoration-1 hover:decoration-2"
            >
              Điều khoản Dịch vụ
            </a>{' '}
            và{' '}
            <a
              href="#"
              className="underline text-primary underline-offset-4 decoration-1 hover:decoration-2"
            >
              Chính sách Bảo mật
            </a>{' '}
            dữ liệu.
          </label>
        </div>

        <div className="flex flex-col items-center gap-6 pt-4 mt-2 border-t md:flex-row border-border-dark/50">
          <button
            type="submit"
            className="w-full md:w-auto flex-1 bg-primary hover:bg-[#d6a411] text-[#181611] font-bold text-lg h-14 px-8 uppercase tracking-wider rounded-sm transition-colors flex items-center justify-center gap-2 group font-sans"
          >
            <span className="font-medium transition-transform material-symbols-outlined group-hover:translate-x-1">
              terminal
            </span>
            Xác nhận & Đăng ký
          </button>
          <a
            href="/Login"
            className="flex items-center gap-2 text-[#b9b29d] hover:text-primary transition-colors text-base font-medium px-4 py-2 font-sans"
          >
            <span>Đã có tài khoản? <h1 onClick={()=>navigate('/Login')}>Đăng nhập</h1></span>
            <span className="text-sm material-symbols-outlined">
              arrow_forward
            </span>
          </a>
        </div>
      </form>

      <div className="bg-black/40 border-t border-border-dark px-4 py-2 flex justify-between items-center text-[10px] text-[#544d3b] font-mono uppercase tracking-wider select-none">
        <span>SECURE_CONNECTION: TLS 1.3</span>
        <span>NODE_ID: VN-SGN-09</span>
      </div>
    </div>
  );
};

export default RegistrationForm;