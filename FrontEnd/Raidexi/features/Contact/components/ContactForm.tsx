"use client";

import React, { useState } from "react";
import { ArrowRight, Send } from "lucide-react";
import { SendMailContactService } from "@/Shared/Service/MailService";
import { ToasterUi } from "@/Shared/Ui/ToasterUi";

const initialFormData = {
  name: "",
  brand: "",
  email: "",
  title: "",
  message: "",
};

const fields = [
  { name: "name", label: "Họ và tên", placeholder: "Nguyễn Văn A", required: true, type: "text" },
  { name: "brand", label: "Tên thương hiệu", placeholder: "Tên thương hiệu", required: true, type: "text" },
  { name: "email", label: "Email công ty", placeholder: "email@company.com", required: true, type: "email" },
  { name: "title", label: "Chức danh", placeholder: "Giám đốc sản phẩm", required: false, type: "text" },
] as const;

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const data = await SendMailContactService({
        name: formData.name,
        email: formData.email,
        message: formData.message,
        tier: formData.brand,
      });

      if (data) {
        setFormData(initialFormData);
        ToasterUi("Yêu cầu đã được gửi", "success");
      }
    } catch {
      ToasterUi("Không thể gửi yêu cầu lúc này", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
      <div className="grid gap-5 md:grid-cols-2">
        {fields.map((field) => (
          <label key={field.name} className="block">
            <span className="mb-2 flex items-center justify-between gap-3">
              <span className="rx-label">{field.label}</span>
              {field.required && <span className="font-mono text-[10px] uppercase text-[var(--ink-muted)]">Bắt buộc</span>}
            </span>
            <input
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              type={field.type}
              className="rx-input"
              placeholder={field.placeholder}
              required={field.required}
            />
          </label>
        ))}
      </div>

      <label className="block">
        <span className="rx-label mb-2 block">Thông điệp / nhu cầu định cỡ</span>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          className="rx-input min-h-44 resize-y py-4"
          placeholder="Mô tả quy mô sản phẩm, hệ thống size hiện tại và vấn đề định cỡ thương hiệu đang gặp."
        />
      </label>

      <div className="flex flex-col justify-between gap-4 border-t border-[rgba(24,23,20,0.1)] pt-6 md:flex-row md:items-center">
        <p className="max-w-md text-sm leading-relaxed text-[var(--ink-muted)]">
          Chúng tôi phản hồi bằng hướng tích hợp phù hợp với bảng size, dữ liệu sản phẩm và mục tiêu giảm đổi trả.
        </p>
        <button type="submit" disabled={isSubmitting} className={`rx-btn rx-btn-primary w-full md:w-auto ${isSubmitting ? "rx-btn-loading" : ""}`}>
          <Send size={15} strokeWidth={1.35} />
          {isSubmitting ? "Đang gửi" : "Gửi yêu cầu"}
          <ArrowRight size={15} strokeWidth={1.35} />
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
