"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './Button';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative border-b border-border-subtle">
      <div className="grid items-center gap-12 px-6 py-20 mx-auto max-w-7xl lg:py-32 lg:grid-cols-2">
        {/* Left Content */}
        <div className="flex flex-col max-w-2xl gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-border-subtle bg-surface-dark w-fit">
              <span className="w-2 h-2 bg-primary animate-pulse"></span>
              <span className="font-mono text-xs tracking-widest uppercase" style={{ color: "var(--color-Background)" }}>Hệ thống Trực tuyến</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-medium leading-[1.1] tracking-tight text-white">
              Đo lường cơ thể bạn. <br />
              <span style={{ color: "var(--color-Background)" }} className="italic ">Chính xác.</span>
            </h2>
            <p className="text-lg text-[#b8b19d] leading-relaxed max-w-md " >
              Số đo cơ thể chính xác được chuyển đổi thành kích cỡ cụ thể của từng thương hiệu. Loại bỏ sự mơ hồ khi đoán mò bằng dữ liệu khách quan.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap gap-4"
          >
            <Button navigation="/Measurements">Bắt đầu Đo lường</Button>
            <Button navigation='/WorkFlow' variant="outline">Cách hoạt động</Button>
          </motion.div>
        </div>

        <div className="relative flex items-center justify-center w-full h-full p-1 border min-h-100 border-border-subtle bg-surface-dark">
          <div
            className="absolute inset-0 pointer-events-none opacity-10"
            style={{
              backgroundImage: 'linear-gradient(#383429 1px, transparent 1px), linear-gradient(90deg, #383429 1px, transparent 1px)',
              backgroundSize: '40px 40px'
            }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 w-full max-w-md p-6 border shadow-none border-border-subtle bg-background-dark"
          >
            <div className="flex justify-between pb-4 mb-6 border-b border-border-subtle">
              <span className="font-mono text-xs uppercase text-primary">ID Quét: #882-X9</span>
              <span className="font-mono text-xs text-text-main">TRẠNG THÁI: HOẠT ĐỘNG</span>
            </div>
            <div className="space-y-4 font-mono text-sm">
              {[
                { label: 'CHIỀU CAO', val: '182.5', width: '88%' },
                { label: 'VÒNG NGỰC', val: '102.0', width: '76%' },
                { label: 'VÒNG EO', val: '86.4', width: '65%' }
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: "100%", opacity: 1 }}
                  transition={{ delay: 0.5 + (index * 0.2), duration: 0.8 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[#b8b19d]">{item.label}</span>
                    <span className="text-white">{item.val} <span className="text-[#534d3c]">CM</span></span>
                  </div>
                  <div className="w-full bg-[#262018] h-1 mb-2">
                    <motion.div
                      className="h-1 "
                      initial={{ width: 0 }}
                      animate={{ width: item.width }}
                      transition={{ delay: 0.8 + (index * 0.2), duration: 1, ease: "easeOut" }}
                      style={{ background: "var(--color-Background)" }}
                    ></motion.div>
                  </div>
                </motion.div>
              ))}

              <div className="mt-6 border-t border-border-subtle pt-4 text-xs text-[#534d3c] flex justify-between">
                <span>ĐỘ TIN CẬY</span>
                <span className="text-primary">99.8%</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};