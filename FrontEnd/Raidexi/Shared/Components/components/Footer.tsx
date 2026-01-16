"use client";
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <>

      <footer className="px-6 py-12 border-t border-border-subtle bg-surface-dark">
        <div className="flex flex-col items-start justify-between gap-8 mx-auto max-w-7xl md:flex-row md:items-center">
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-bold tracking-tight text-white">RAIDEXI</h3>
            <p className="text-xs text-[#b8b19d] font-mono max-w-xs">
              Tiêu chuẩn đo lường cơ thể khách quan cho kỷ nguyên số.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:flex sm:gap-12">
            <div className="flex flex-col gap-3">
              <a href="#" className="text-xs text-[#b8b19d] hover:text-white font-mono uppercase tracking-wider">Điều khoản dịch vụ</a>
              <a href="#" className="text-xs text-[#b8b19d] hover:text-white font-mono uppercase tracking-wider">Chính sách bảo mật</a>
            </div>
            <div className="flex flex-col gap-3">
              <a href="#" className="text-xs text-[#b8b19d] hover:text-white font-mono uppercase tracking-wider">Hỗ trợ</a>
              <a href="#" className="text-xs text-[#b8b19d] hover:text-white font-mono uppercase tracking-wider">Tài liệu</a>
            </div>
          </div>
        </div>
        <div className="pt-8 mx-auto mt-12 text-center border-t max-w-7xl border-border-subtle md:text-left">
          <p className="text-[10px] text-[#534d3c] font-mono uppercase">
            © 2024 RAIDEXI Systems. Đã đăng ký bản quyền. Phiên bản hệ thống v2.4.1
          </p>
        </div>
      </footer>
    </>
  );
};