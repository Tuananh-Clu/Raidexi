"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ShoppingBag } from 'lucide-react';

export const BrandIntegration: React.FC = () => {
  const brands = [
    { name: 'Uniqlo', flag: '🇯🇵', sizes: ['XS','S','M','L','XL'], color: '#ef4444', note: 'Áo, quần, váy' },
    { name: 'Nike', flag: '🇺🇸', sizes: ['S','M','L','XL','XXL'], color: '#f97316', note: 'Thể thao, giày' },
    { name: "Levi's", flag: '🇺🇸', sizes: ['28','30','32','34','36'], color: '#3b82f6', note: 'Jeans, quần dài' },
    { name: 'H&M', flag: '🇸🇪', sizes: ['XS','S','M','L','XL'], color: '#8b5cf6', note: 'Thời trang nhanh' },
    { name: 'Zara', flag: '🇪🇸', sizes: ['XS','S','M','L','XL'], color: '#ec4899', note: 'Thời trang Âu' },
    { name: 'Adidas', flag: '🇩🇪', sizes: ['S','M','L','XL','2XL'], color: '#06b6d4', note: 'Thể thao' },
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#f0f9ff] via-white to-[#f8fafc]" />

      <div className="relative px-6 mx-auto max-w-7xl">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} className="text-center mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#eff6ff] border border-[#bfdbfe] text-[#2563eb] text-xs font-semibold tracking-wider uppercase mb-4">
            🛍️ Hỗ trợ đa thương hiệu
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-[#0f172a] mb-4">
            Size đúng cho mọi<br />
            <span className="gradient-text">thương hiệu bạn thích</span>
          </h2>
          <p className="text-[#64748b] text-lg max-w-xl mx-auto">
            Mỗi thương hiệu có bảng size riêng. Raidexi tự động quy đổi số đo của bạn sang size phù hợp cho từng nơi — không cần đoán nữa.
          </p>
        </motion.div>

        {/* Brand grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
          {brands.map((brand, idx) => (
            <motion.div key={brand.name}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: idx * 0.08, duration: 0.5 }}
              className="group bg-white rounded-2xl p-5 border border-[#e2e8f0] hover:border-[#bfdbfe] hover:shadow-lg hover:shadow-[#2563eb]/5 transition-all duration-300 cursor-default">

              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="text-xl mr-1.5">{brand.flag}</span>
                  <span className="font-bold text-[#0f172a] text-base">{brand.name}</span>
                </div>
                <CheckCircle2 size={16} className="text-[#059669] flex-shrink-0 mt-0.5" />
              </div>

              <p className="text-xs text-[#94a3b8] mb-3">{brand.note}</p>

              {/* Size chips */}
              <div className="flex gap-1.5 flex-wrap">
                {brand.sizes.map(s => (
                  <span key={s} className="px-2 py-1 rounded-lg text-[11px] font-bold border transition-colors group-hover:border-current"
                    style={{ color: brand.color, borderColor: `${brand.color}30`, backgroundColor: `${brand.color}08` }}>
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* More brands note */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="flex items-center justify-center gap-3 mb-12 text-[#94a3b8] text-sm">
          <div className="h-px flex-1 bg-[#e2e8f0] max-w-24" />
          <span>và 40+ thương hiệu khác đang được thêm vào</span>
          <div className="h-px flex-1 bg-[#e2e8f0] max-w-24" />
        </motion.div>

        {/* CTA banner */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden p-8 md:p-10 bg-gradient-to-r from-[#0f172a] to-[#1e3a8a] shadow-2xl shadow-[#2563eb]/20">
          <div className="absolute inset-0 bg-dot-pattern opacity-10" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#2563eb]/20 to-transparent rounded-full blur-3xl" />

          <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center flex-shrink-0">
                <ShoppingBag size={24} className="text-white" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg mb-1">
                  Không còn hoàn hàng vì sai size
                </h3>
                <p className="text-white/60 text-sm">
                  Đo một lần · Mua đúng size mọi nơi · Tiết kiệm thời gian & tiền bạc
                </p>
              </div>
            </div>
            <a href="/Measurements"
              className="flex-shrink-0 px-7 py-3.5 rounded-2xl bg-white text-[#1e3a8a] font-bold text-sm hover:bg-[#f0f9ff] hover:shadow-lg transition-all duration-300 whitespace-nowrap">
              Bắt đầu đo ngay →
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};