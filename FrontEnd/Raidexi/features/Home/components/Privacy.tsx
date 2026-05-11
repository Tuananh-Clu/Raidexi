"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, EyeOff, HardDrive, Lock } from 'lucide-react';

export const Privacy: React.FC = () => {
  const points = [
    {
      icon: EyeOff,
      title: 'Camera không ghi lại',
      desc: 'Ảnh và video không bao giờ được lưu hay gửi lên server. Mọi xử lý diễn ra ngay trên thiết bị của bạn.',
    },
    {
      icon: HardDrive,
      title: 'Dữ liệu thuộc về bạn',
      desc: 'Số đo của bạn được lưu trong tài khoản của chính bạn. Chúng tôi không chia sẻ với bên thứ ba.',
    },
    {
      icon: Lock,
      title: 'Xóa bất cứ lúc nào',
      desc: 'Bạn có thể xóa toàn bộ lịch sử số đo chỉ với một nút nhấn. Không có điều kiện ràng buộc.',
    },
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Dark background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#0f172a]" />
      <motion.div animate={{ y: [-10, 10, -10] }} transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-10 right-[20%] w-72 h-72 rounded-full bg-[#2563eb]/10 blur-3xl pointer-events-none" />
      <motion.div animate={{ y: [8, -8, 8] }} transition={{ duration: 6, repeat: Infinity }}
        className="absolute bottom-10 left-[15%] w-56 h-56 rounded-full bg-[#06b6d4]/8 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} className="text-center mb-14">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/10 border border-white/15 mb-6">
            <Shield size={26} className="text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Quyền riêng tư là<br />
            <span className="text-[#06b6d4]">ưu tiên số một</span>
          </h2>
          <p className="text-white/60 text-lg max-w-lg mx-auto">
            Bạn đang đo cơ thể của mình — đó là thông tin riêng tư. Chúng tôi thiết kế hệ thống để bảo vệ điều đó.
          </p>
        </motion.div>

        {/* Privacy points */}
        <div className="grid md:grid-cols-3 gap-5 mb-12">
          {points.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div key={p.title}
                initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.12, duration: 0.6 }}
                className="rounded-2xl p-6 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-4">
                  <Icon size={18} className="text-[#06b6d4]" />
                </div>
                <h3 className="font-bold text-white mb-2">{p.title}</h3>
                <p className="text-white/55 text-sm leading-relaxed">{p.desc}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Final CTA */}
        <motion.div initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="text-center p-10 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm">
          <h3 className="text-2xl font-bold text-white mb-3">
            Sẵn sàng biết size chính xác của bạn?
          </h3>
          <p className="text-white/55 mb-7 max-w-md mx-auto">
            Miễn phí hoàn toàn. Không cần thẻ tín dụng. Kết quả ngay trong 5 giây.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href="/Measurements"
              className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#2563eb] to-[#06b6d4] text-white font-bold text-sm shadow-lg shadow-[#2563eb]/30 hover:shadow-xl hover:shadow-[#2563eb]/40 hover:-translate-y-0.5 transition-all duration-300">
              Đo ngay — Miễn phí 🎯
            </a>
            <a href="/WorkFlow"
              className="px-8 py-3.5 rounded-2xl border border-white/20 text-white/80 font-semibold text-sm hover:bg-white/10 hover:text-white transition-all duration-300">
              Tìm hiểu thêm
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};