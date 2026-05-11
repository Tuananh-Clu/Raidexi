"use client";
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <>
      <footer className="relative overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#0f172a]">
        {/* Decorative */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#2563eb]/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-[#06b6d4]/8 to-transparent rounded-full blur-3xl" />
        
        <div className="relative px-6 py-16">
          <div className="flex flex-col items-start justify-between gap-10 mx-auto max-w-7xl md:flex-row md:items-center">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#2563eb] to-[#06b6d4] flex items-center justify-center">
                  <span className="text-white text-xs font-bold">R</span>
                </div>
                <h3 className="text-lg font-bold tracking-tight text-white">RAIDEXI</h3>
              </div>
              <p className="text-sm text-white/50 max-w-xs leading-relaxed">
                Tiêu chuẩn đo lường cơ thể khách quan cho kỷ nguyên số.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8 sm:flex sm:gap-12">
              <div className="flex flex-col gap-3">
                <a href="#" className="text-sm text-white/50 hover:text-white transition-colors">Điều khoản dịch vụ</a>
                <a href="#" className="text-sm text-white/50 hover:text-white transition-colors">Chính sách bảo mật</a>
              </div>
              <div className="flex flex-col gap-3">
                <a href="#" className="text-sm text-white/50 hover:text-white transition-colors">Hỗ trợ</a>
                <a href="#" className="text-sm text-white/50 hover:text-white transition-colors">Tài liệu</a>
              </div>
            </div>
          </div>
          <div className="pt-8 mx-auto mt-12 border-t max-w-7xl border-white/10 md:text-left text-center">
            <p className="text-xs text-white/30">
              © 2024 RAIDEXI Systems. Đã đăng ký bản quyền. Phiên bản hệ thống v2.4.1
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};