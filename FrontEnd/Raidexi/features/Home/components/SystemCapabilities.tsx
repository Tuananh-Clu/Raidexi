"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Wifi, Lock, Zap, BarChart3, RefreshCw } from 'lucide-react';

export const SystemCapabilities: React.FC = () => {
  const features = [
    {
      icon: Smartphone,
      color: '#2563eb',
      bg: '#eff6ff',
      title: 'Không cần cài app',
      desc: 'Chạy hoàn toàn trên trình duyệt — điện thoại, laptop, tablet đều được.',
    },
    {
      icon: Zap,
      color: '#f59e0b',
      bg: '#fffbeb',
      title: 'Kết quả trong 5 giây',
      desc: 'AI xử lý cực nhanh, bạn không cần chờ đợi hay thực hiện nhiều lần.',
    },
    {
      icon: Lock,
      color: '#059669',
      bg: '#ecfdf5',
      title: 'Ảnh không được lưu',
      desc: 'Camera chỉ xử lý tại chỗ. Không có ảnh nào được gửi lên server.',
    },
    {
      icon: BarChart3,
      color: '#8b5cf6',
      bg: '#f5f3ff',
      title: 'Lưu lịch sử số đo',
      desc: 'Theo dõi thay đổi cơ thể theo thời gian và so sánh giữa các lần đo.',
    },
    {
      icon: Wifi,
      color: '#0891b2',
      bg: '#ecfeff',
      title: 'Hoạt động offline',
      desc: 'Sau lần đầu tải xong, bạn có thể đo ngay cả khi không có mạng.',
    },
    {
      icon: RefreshCw,
      color: '#e11d48',
      bg: '#fff1f2',
      title: 'Cập nhật tự động',
      desc: 'Bảng size thương hiệu được cập nhật thường xuyên. Bạn luôn có số liệu mới nhất.',
    },
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#f8fafc] via-[#eff6ff]/30 to-white" />
      <div className="absolute inset-0 bg-dot-pattern opacity-20" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f5f3ff] border border-[#ddd6fe] text-[#7c3aed] text-xs font-semibold tracking-wider uppercase mb-4">
            ⚡ Tính năng nổi bật
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-[#0f172a] mb-4">
            Mọi thứ bạn cần,<br />
            <span className="gradient-text">không gì thừa thãi</span>
          </h2>
          <p className="text-[#64748b] text-lg max-w-xl mx-auto">
            Thiết kế đơn giản để bạn tập trung vào việc quan trọng: tìm đúng size, mua đúng hàng.
          </p>
        </motion.div>

        {/* Feature grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div key={f.title}
                initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.09, duration: 0.55 }}
                whileHover={{ y: -4 }}
                className="bg-white rounded-2xl p-6 border border-[#e2e8f0] hover:border-[#bfdbfe] hover:shadow-lg hover:shadow-[#2563eb]/5 transition-all duration-300 group cursor-default">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 duration-300"
                  style={{ backgroundColor: f.bg }}>
                  <Icon size={20} style={{ color: f.color }} strokeWidth={2} />
                </div>
                <h3 className="font-bold text-[#0f172a] mb-2">{f.title}</h3>
                <p className="text-sm text-[#64748b] leading-relaxed">{f.desc}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom stat row */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.4 }}
          className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-px bg-[#e2e8f0] rounded-2xl overflow-hidden border border-[#e2e8f0]">
          {[
            { val: '5s', label: 'Thời gian đo' },
            { val: '13', label: 'Số đo cơ thể' },
            { val: '99.8%', label: 'Độ chính xác' },
            { val: '40+', label: 'Thương hiệu' },
          ].map(s => (
            <div key={s.label} className="bg-white px-6 py-5 text-center">
              <p className="text-2xl font-black gradient-text mb-1">{s.val}</p>
              <p className="text-xs text-[#94a3b8] font-medium">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};