"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

export const CalibrationSection: React.FC = () => {
  const measurements = [
    { label: 'Vai', value: '44.2', icon: '↔️' },
    { label: 'Ngực', value: '96.0', icon: '🫁' },
    { label: 'Eo', value: '78.5', icon: '⬤' },
    { label: 'Hông', value: '98.0', icon: '⬤' },
    { label: 'Chiều cao', value: '172.0', icon: '↕️' },
    { label: 'Dài tay', value: '61.5', icon: '💪' },
    { label: 'Đùi', value: '57.3', icon: '🦵' },
    { label: 'Cổ', value: '38.0', icon: '🔵' },
  ];

  const benefits = [
    'Không cần thước dây, chỉ cần camera',
    'Đo 13 vị trí trong 5 giây',
    'Chính xác đến ±0.5cm',
    'Lưu trữ lịch sử số đo của bạn',
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-[#f8fafc] to-[#f0f9ff]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left: What you actually get */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}
            className="flex flex-col gap-8">
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ecfdf5] border border-[#bbf7d0] text-[#059669] text-xs font-semibold tracking-wider uppercase mb-5">
                📐 Kết quả bạn nhận được
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#0f172a] mb-4 leading-tight">
                13 số đo cơ thể<br />
                <span className="gradient-text">đầy đủ & chính xác</span>
              </h2>
              <p className="text-[#64748b] text-lg leading-relaxed">
                Raidexi đo tất cả những gì bạn cần khi mua quần áo — từ vòng ngực, vòng eo, đến chiều dài tay và chân — tất cả chỉ từ một lần đứng trước camera.
              </p>
            </div>

            {/* Benefits */}
            <ul className="space-y-3">
              {benefits.map((b) => (
                <li key={b} className="flex items-center gap-3 text-[#334155] font-medium">
                  <CheckCircle2 size={18} className="text-[#059669] flex-shrink-0" />
                  {b}
                </li>
              ))}
            </ul>

            {/* Accuracy badge */}
            <div className="flex items-center gap-4 p-5 rounded-2xl bg-gradient-to-r from-[#eff6ff] to-[#ecfeff] border border-[#bfdbfe]">
              <div className="text-3xl font-black gradient-text">99.8%</div>
              <div>
                <p className="font-bold text-[#0f172a] text-sm">Độ chính xác</p>
                <p className="text-xs text-[#64748b]">Được kiểm chứng trên 10,000+ lần đo</p>
              </div>
            </div>
          </motion.div>

          {/* Right: Measurement card preview */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}>
            <div className="rounded-3xl bg-white border border-[#e2e8f0] shadow-xl shadow-[#2563eb]/5 overflow-hidden">
              {/* Card header */}
              <div className="px-6 py-4 bg-gradient-to-r from-[#f8fafc] to-[#eff6ff] border-b border-[#e2e8f0] flex items-center justify-between">
                <span className="font-semibold text-sm text-[#0f172a]">Kết quả đo của bạn</span>
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ecfdf5] text-[#059669] text-xs font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#059669] animate-pulse" />
                  Hoàn tất
                </span>
              </div>

              {/* Grid of measurements */}
              <div className="p-6 grid grid-cols-2 gap-3">
                {measurements.map((m, i) => (
                  <motion.div key={m.label}
                    initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.07 }}
                    className="flex items-center gap-3 p-3.5 rounded-xl bg-[#f8fafc] border border-[#f1f5f9] hover:border-[#bfdbfe] hover:bg-[#eff6ff] transition-colors">
                    <span className="text-lg">{m.icon}</span>
                    <div>
                      <p className="text-[11px] text-[#94a3b8] font-medium">{m.label}</p>
                      <p className="text-sm font-bold text-[#0f172a]">{m.value} <span className="text-xs text-[#94a3b8] font-normal">cm</span></p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Footer note */}
              <div className="px-6 pb-5 flex items-center gap-2 text-xs text-[#94a3b8]">
                <CheckCircle2 size={12} className="text-[#059669]" />
                Đã lưu vào hồ sơ · 11/05/2026
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};