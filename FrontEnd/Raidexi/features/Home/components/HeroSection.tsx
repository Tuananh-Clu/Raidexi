"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './Button';
import { Camera, Ruler, ShoppingBag, CheckCircle } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden min-h-[92vh] flex items-center">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f8fafc] via-[#eff6ff] to-[#e0f2fe]" />
      <div className="absolute inset-0 bg-dot-pattern opacity-30" />

      {/* Soft blobs */}
      <motion.div animate={{ y: [-12, 12, -12] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 right-[10%] w-96 h-96 rounded-full bg-gradient-to-br from-[#2563eb]/8 to-[#06b6d4]/6 blur-3xl pointer-events-none" />
      <motion.div animate={{ y: [8, -10, 8] }} transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-20 left-[5%] w-80 h-80 rounded-full bg-gradient-to-tr from-[#06b6d4]/6 to-[#2563eb]/5 blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-7xl mx-auto px-6 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT: Message */}
          <div className="flex flex-col gap-8">
            {/* Badge */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 border border-[#2563eb]/15 shadow-sm w-fit">
              <span className="relative flex w-2 h-2">
                <span className="absolute inline-flex w-full h-full rounded-full opacity-60 animate-ping bg-[#06b6d4]" />
                <span className="relative inline-flex w-2 h-2 rounded-full bg-[#06b6d4]" />
              </span>
              <span className="text-xs font-semibold text-[#2563eb] tracking-wide uppercase">AI đo cơ thể miễn phí</span>
            </motion.div>

            {/* Headline */}
            <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight text-[#0f172a]">
                Biết chính xác<br />
                <span className="gradient-text">size của bạn</span><br />
                <span className="text-[#334155] text-4xl md:text-5xl font-semibold">tại mọi thương hiệu.</span>
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-[#64748b] leading-relaxed max-w-lg">
              Chỉ cần <strong className="text-[#334155]">đứng trước camera 5 giây</strong>, Raidexi đo 13 số đo cơ thể và cho bạn biết nên mặc size gì của Nike, Uniqlo, Levi's...
            </motion.p>

            {/* CTA Buttons */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.35 }}
              className="flex flex-wrap gap-4">
              <Button navigation="/Measurements">
                <span className="flex items-center gap-2">
                  <Camera size={16} />
                  Đo ngay — Miễn phí
                </span>
              </Button>
              <Button navigation="/WorkFlow" variant="outline">Xem cách hoạt động</Button>
            </motion.div>

            {/* Social proof */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
              className="flex items-center gap-8 pt-2 border-t border-[#e2e8f0]">
              {[
                { val: '1,200+', label: 'người dùng' },
                { val: '99.8%', label: 'độ chính xác' },
                { val: '13', label: 'số đo' },
              ].map(s => (
                <div key={s.label}>
                  <p className="text-xl font-bold gradient-text">{s.val}</p>
                  <p className="text-xs text-[#94a3b8]">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT: Visual demo card */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
            className="relative flex flex-col gap-4">

            {/* Main measurement result card */}
            <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.3 }}
              className="relative rounded-3xl p-7 bg-white border border-[#e2e8f0] shadow-xl shadow-[#2563eb]/5 overflow-hidden">
              {/* Glow accent top-right */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-[#2563eb]/10 to-[#06b6d4]/10 rounded-full blur-2xl" />

              {/* Header */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#2563eb] to-[#06b6d4] flex items-center justify-center">
                    <Camera size={16} className="text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-[#94a3b8]">Phiên đo</p>
                    <p className="text-sm font-bold text-[#0f172a]">Kết quả của bạn</p>
                  </div>
                </div>
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ecfdf5] text-[#059669] text-xs font-semibold">
                  <CheckCircle size={12} />
                  Hoàn tất
                </span>
              </div>

              {/* Measurements */}
              <div className="space-y-4">
                {[
                  { label: 'Chiều cao', val: '172', unit: 'cm', pct: 82 },
                  { label: 'Vòng ngực', val: '96', unit: 'cm', pct: 72 },
                  { label: 'Vòng eo',   val: '78', unit: 'cm', pct: 60 },
                  { label: 'Vòng hông', val: '98', unit: 'cm', pct: 74 },
                ].map((m, i) => (
                  <div key={m.label}>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="text-[#64748b] font-medium">{m.label}</span>
                      <span className="font-bold text-[#0f172a]">{m.val} <span className="text-[#94a3b8] font-normal text-xs">{m.unit}</span></span>
                    </div>
                    <div className="h-1.5 bg-[#f1f5f9] rounded-full overflow-hidden">
                      <motion.div className="h-full rounded-full bg-gradient-to-r from-[#2563eb] to-[#06b6d4]"
                        initial={{ width: 0 }} animate={{ width: `${m.pct}%` }}
                        transition={{ delay: 0.8 + i * 0.15, duration: 1, ease: "easeOut" }} />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Size recommendation card — floats below */}
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4, duration: 0.6 }}
              className="rounded-2xl p-5 bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] shadow-lg shadow-[#2563eb]/20 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
                    <ShoppingBag size={16} className="text-black" />
                  </div>
                  <div>
                    <p className="text-xs text-black">Gợi ý size cho bạn</p>
                    <p className="text-sm text-black font-semibold">Uniqlo · Nike · Levi's</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  {['M', 'M', '32'].map((s, i) => (
                    <span key={i} className="px-3 py-1.5 bg-white/20 rounded-xl text-sm text-black font-bold">{s}</span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Floating badge */}
            <motion.div animate={{ y: [-4, 4, -4] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-6 top-1/3 bg-white border border-[#e2e8f0] rounded-2xl px-4 py-3 shadow-lg flex items-center gap-2 text-xs">
              <Ruler size={14} className="text-[#2563eb]" />
              <span className="font-semibold text-[#334155]">5 giây · 13 số đo</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};