"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Ruler, ShoppingBag, ArrowRight } from 'lucide-react';

export const ProcessLogic: React.FC = () => {
  const steps = [
    {
      step: '01',
      icon: Camera,
      color: '#2563eb',
      bg: '#eff6ff',
      title: 'Đứng trước camera',
      desc: 'Mở app, bật camera và đứng cách 1-2 mét. Hệ thống nhận diện tư thế tự động.',
      time: '~5 giây',
    },
    {
      step: '02',
      icon: Ruler,
      color: '#0891b2',
      bg: '#ecfeff',
      title: 'AI phân tích & đo',
      desc: 'AI của chúng tôi tính toán 13 số đo cơ thể từ chiều cao đến vòng hông với độ chính xác 99.8%.',
      time: 'Tự động',
    },
    {
      step: '03',
      icon: ShoppingBag,
      color: '#1d4ed8',
      bg: '#eef2ff',
      title: 'Nhận size chính xác',
      desc: 'Xem ngay size phù hợp cho từng thương hiệu bạn thích. Lưu kết quả để dùng lại bất cứ lúc nào.',
      time: 'Ngay lập tức',
    },
  ];

  return (
    <section className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#f0f9ff] via-white to-[#f8fafc]" />

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} className="text-center mb-20">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#eff6ff] border border-[#2563eb]/15 text-[#2563eb] text-xs font-semibold tracking-wider uppercase mb-4">
            ✨ Đơn giản 3 bước
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-[#0f172a] mb-5">
            Hoạt động như thế nào?
          </h2>
          <p className="text-[#64748b] text-lg max-w-xl mx-auto">
            Không cần cài app. Không cần đăng ký thẻ tín dụng. Chỉ cần camera điện thoại hoặc laptop.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-16 left-1/6 right-1/6 h-px bg-gradient-to-r from-[#2563eb]/20 via-[#06b6d4]/40 to-[#1d4ed8]/20 z-0" />

          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div key={s.step}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.15, duration: 0.6 }}
                className="relative z-10 flex flex-col items-center text-center group">

                {/* Step icon circle */}
                <div className="relative mb-6">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 duration-300"
                    style={{ backgroundColor: s.bg, border: `1.5px solid ${s.color}20` }}>
                    <Icon size={26} style={{ color: s.color }} strokeWidth={2} />
                  </div>
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-br from-[#2563eb] to-[#06b6d4] text-white text-[10px] font-bold flex items-center justify-center shadow-sm">
                    {i + 1}
                  </span>
                </div>

                {/* Content */}
                <div className="bg-white rounded-2xl p-6 border border-[#e2e8f0] group-hover:border-[#2563eb]/20 group-hover:shadow-lg group-hover:shadow-[#2563eb]/5 transition-all duration-300 w-full">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold tracking-wider uppercase mb-3"
                    style={{ backgroundColor: s.bg, color: s.color }}>
                    ⏱ {s.time}
                  </div>
                  <h3 className="text-lg font-bold text-[#0f172a] mb-2">{s.title}</h3>
                  <p className="text-sm text-[#64748b] leading-relaxed">{s.desc}</p>
                </div>

                {/* Arrow between steps */}
                {i < 2 && (
                  <div className="hidden md:flex absolute right-0 top-16 translate-x-1/2 z-20">
                    <ArrowRight size={18} className="text-[#2563eb]/40" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.5 }}
          className="mt-16 text-center">
          <a href="/Measurements"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] text-black font-semibold text-base shadow-lg shadow-[#2563eb]/25 hover:shadow-xl hover:shadow-[#2563eb]/30 hover:-translate-y-0.5 transition-all duration-300">
            <Camera size={18} />
            Thử ngay — Hoàn toàn miễn phí
          </a>
          <p className="mt-3 text-xs text-[#94a3b8]">Không yêu cầu tài khoản để bắt đầu</p>
        </motion.div>
      </div>
    </section>
  );
};