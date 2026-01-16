"use client";
import React from 'react';
import { motion } from 'framer-motion';

export const ProblemStatement: React.FC = () => {
  const problems = [
    {
      id: '01',
      icon: 'straighten',
      title: 'Kích cỡ khác biệt',
      desc: 'Size M ở nhãn hiệu này là size L ở nhãn hiệu khác. Nhãn size là công cụ tiếp thị tùy ý, không phải là tiêu chuẩn đo lường.'
    },
    {
      id: '02',
      icon: 'close',
      title: 'Đoán mò thất bại',
      desc: 'Việc thử đồ chủ quan dẫn đến đổi trả và không hài lòng. "Chuẩn size" là chuyện hoang đường khi chính kích cỡ cũng biến thiên.'
    },
    {
      id: '03',
      icon: 'check_circle',
      title: 'Chính xác quan trọng',
      desc: 'Từng milimet đều quan trọng. RAIDEXI đo các kích thước chính với độ tin cậy cao, thay thế nhãn chủ quan bằng dữ liệu khách quan.'
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section className="border-b border-border-subtle bg-background-dark">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="border-l-2 border-primary pl-6 max-w-2xl">
            <h2 className="text-3xl font-medium text-white mb-2">Tại sao chúng tôi tồn tại</h2>
            <p className="text-[#b8b19d] text-lg font-light">Ngành thời trang thiếu một tiêu chuẩn chung. Chúng tôi cung cấp hằng số trong một thế giới biến thiên.</p>
          </div>
          <div className="font-mono text-xs text-[#534d3c] uppercase tracking-widest text-right">
            Vấn đề <br /> v1.0
          </div>
        </div>
        <motion.div
          className="grid md:grid-cols-3 gap-0 border border-border-subtle divide-y md:divide-y-0 md:divide-x divide-border-subtle bg-surface-dark"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {problems.map((p) => (
            <motion.div key={p.id} variants={item} className="p-8 group hover:bg-[#2c261e] transition-colors relative">
              <div className="absolute top-4 right-4 text-[#383429] font-mono text-xs">{p.id}</div>
              <span className="material-symbols-outlined text-primary mb-6 text-3xl">{p.icon}</span>
              <h3 className="text-xl font-medium text-white mb-3">{p.title}</h3>
              <p className="text-[#b8b19d] text-sm leading-relaxed font-light">
                {p.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};