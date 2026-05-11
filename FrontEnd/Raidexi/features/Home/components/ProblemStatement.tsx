"use client";
import React from 'react';
import { motion } from 'framer-motion';

export const ProblemStatement: React.FC = () => {
  const problems = [
    {
      emoji: '😤',
      problem: 'Mua online mà size sai',
      detail: 'Bạn chọn M nhưng áo lại rộng hay chật — phải hoàn hàng, mất thời gian và phí ship.',
    },
    {
      emoji: '🤔',
      problem: 'Mỗi thương hiệu size khác nhau',
      detail: 'M của Nike khác M của Uniqlo, khác M của H&M. Không có cách nào biết trước.',
    },
    {
      emoji: '📏',
      problem: 'Tự đo thì không chính xác',
      detail: 'Dùng thước dây một mình rất khó, kết quả sai số lớn và bạn không biết đo điểm nào.',
    },
  ];

  return (
    <section className="relative py-24 overflow-hidden bg-[#f8fafc]">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-[#f8fafc] to-[#f0f9ff]" />

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Section label */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 border border-red-100 text-red-500 text-xs font-semibold tracking-wider uppercase mb-4">
            😫 Vấn đề thường gặp
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0f172a] mb-4">
            Mua quần áo online luôn là<br />
            <span className="text-red-400">canh bạc may rủi</span>?
          </h2>
          <p className="text-[#64748b] text-lg max-w-xl mx-auto">
            Bạn không phải người duy nhất gặp những vấn đề này.
          </p>
        </motion.div>

        {/* Problem cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {problems.map((p, i) => (
            <motion.div key={p.problem}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.12, duration: 0.5 }}
              className="bg-white rounded-2xl p-6 border border-[#fee2e2]/60 hover:border-red-200 hover:shadow-md transition-all duration-300 group">
              <span className="text-4xl mb-4 block">{p.emoji}</span>
              <h3 className="font-bold text-[#0f172a] text-lg mb-2 group-hover:text-red-500 transition-colors">{p.problem}</h3>
              <p className="text-[#64748b] text-sm leading-relaxed">{p.detail}</p>
            </motion.div>
          ))}
        </div>

        {/* Bridge to solution */}
        <motion.div initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden p-10 text-center bg-gradient-to-br from-[#2563eb] to-[#1e40af] shadow-2xl shadow-[#2563eb]/20">
          <div className="absolute inset-0 bg-dot-pattern opacity-10" />
          <div className="relative">
            <p className="text-black text-sm font-semibold uppercase tracking-wider mb-3">Giải pháp của chúng tôi</p>
            <h3 className="text-2xl md:text-3xl font-bold text-black mb-4">
              Raidexi đo chính xác cơ thể bạn<br />bằng camera, chỉ trong 5 giây.
            </h3>
            <p className="text-black max-w-lg mx-auto text-base">
              Không cần thước dây. Không cần ai giúp. Không cần đoán size nữa.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};