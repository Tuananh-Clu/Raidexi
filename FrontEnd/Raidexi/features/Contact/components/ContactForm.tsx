"use client"
import React, { useState } from 'react';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    email: '',
    title: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    // Add submission logic here
    alert("Cảm ơn bạn! Yêu cầu đã được gửi.");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col max-w-3xl gap-8">
      <div className="flex flex-col gap-6 md:flex-row">
        <label className="flex flex-col flex-1 group">
          <span className="flex justify-between pb-2 text-xs font-bold tracking-widest uppercase transition-colors text-text-paper opacity-70 group-focus-within:text-primary">
            Họ và Tên
            <span className="text-[10px] opacity-50 font-normal normal-case tracking-normal">Bắt buộc</span>
          </span>
          <input 
            name="name"
            value={formData.name}
            onChange={handleChange}
            type="text" 
            className="form-input w-full rounded-sm bg-input-bg border border-input-border text-white placeholder-text-muted/30 focus:border-primary focus:ring-0 focus:bg-[#2e2a20] h-12 px-4 font-mono text-sm transition-all" 
            placeholder="NGUYEN VAN A" 
            required
          />
        </label>
        <label className="flex flex-col flex-1 group">
          <span className="flex justify-between pb-2 text-xs font-bold tracking-widest uppercase transition-colors text-text-paper opacity-70 group-focus-within:text-primary">
            Tên Thương Hiệu
            <span className="text-[10px] opacity-50 font-normal normal-case tracking-normal">Bắt buộc</span>
          </span>
          <input 
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            type="text" 
            className="form-input w-full rounded-sm bg-input-bg border border-input-border text-white placeholder-text-muted/30 focus:border-primary focus:ring-0 focus:bg-[#2e2a20] h-12 px-4 font-mono text-sm transition-all" 
            placeholder="TÊN THƯƠNG HIỆU" 
            required
          />
        </label>
      </div>

      <div className="flex flex-col gap-6 md:flex-row">
        <label className="flex flex-col flex-1 group">
          <span className="flex justify-between pb-2 text-xs font-bold tracking-widest uppercase transition-colors text-text-paper opacity-70 group-focus-within:text-primary">
            Email Công Ty
            <span className="text-[10px] opacity-50 font-normal normal-case tracking-normal">Bắt buộc</span>
          </span>
          <input 
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email" 
            className="form-input w-full rounded-sm bg-input-bg border border-input-border text-white placeholder-text-muted/30 focus:border-primary focus:ring-0 focus:bg-[#2e2a20] h-12 px-4 font-mono text-sm transition-all" 
            placeholder="email@company.com" 
            required
          />
        </label>
        <label className="flex flex-col flex-1 group">
          <span className="pb-2 text-xs font-bold tracking-widest uppercase transition-colors text-text-paper opacity-70 group-focus-within:text-primary">
            Chức Danh
          </span>
          <input 
            name="title"
            value={formData.title}
            onChange={handleChange}
            type="text" 
            className="form-input w-full rounded-sm bg-input-bg border border-input-border text-white placeholder-text-muted/30 focus:border-primary focus:ring-0 focus:bg-[#2e2a20] h-12 px-4 font-mono text-sm transition-all" 
            placeholder="GIÁM ĐỐC SẢN PHẨM" 
          />
        </label>
      </div>

      <label className="flex flex-col w-full group">
        <span className="pb-2 text-xs font-bold tracking-widest uppercase transition-colors text-text-paper opacity-70 group-focus-within:text-primary">
          Thông điệp / Nhu cầu Định cỡ
        </span>
        <textarea 
          name="message"
          value={formData.message}
          onChange={handleChange}
          className="form-textarea w-full rounded-sm bg-input-bg border border-input-border text-white placeholder-text-muted/30 focus:border-primary focus:ring-0 focus:bg-[#2e2a20] p-4 font-mono text-sm min-h-40 resize-y transition-all" 
          placeholder="Mô tả ngắn gọn về quy mô sản xuất và các thách thức về kỹ thuật đo lường hiện tại của quý doanh nghiệp..."
        ></textarea>
      </label>

      <div className="pt-6 border-t border-dashed border-border-retro">
        <button 
          type="submit" 
          className="group relative inline-flex items-center justify-center px-10 h-14 bg-primary text-background-dark font-bold uppercase tracking-[0.2em] text-sm hover:bg-[#d4a00f] transition-all rounded-sm w-full md:w-auto overflow-hidden shadow-[4px_4px_0px_rgba(0,0,0,0.4)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5"
        >
          <span className="relative z-10 flex items-center gap-3">
            Gửi Yêu cầu
            <span className="text-lg transition-transform material-symbols-outlined group-hover:translate-x-1">arrow_right_alt</span>
          </span>
        </button>
      </div>
    </form>
  );
};

export default ContactForm;