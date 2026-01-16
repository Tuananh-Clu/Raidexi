"use client";
import React from 'react';
import { motion } from 'framer-motion';

export const CalibrationSection: React.FC = () => {
  const steps = [
    { letter: 'A', title: 'Chiếu hình trục', desc: 'Camera truyền thống làm sai lệch chiều sâu. Thuật toán của chúng tôi làm phẳng trường chụp, sửa lỗi méo phối cảnh để đảm bảo các phép đo chân tay được thực hiện trên một mặt phẳng đồng nhất.' },
    { letter: 'B', title: 'Trích xuất khung xương', desc: 'Chúng tôi xác định 24 điểm khớp chính. Bằng cách đo khoảng cách vector giữa các điểm xương ổn định thay vì diện tích bề mặt phần mềm, sai số chỉ dưới 0.5cm.' },
    { letter: 'C', title: 'Chuẩn hóa tham chiếu', desc: 'Các phép đo được tham chiếu chéo với đầu vào chiều cao đã biết hoặc đối tượng tham chiếu chuẩn (kích thước thẻ ISO 7810) để hiệu chỉnh tỷ lệ pixel sang milimet một cách linh hoạt.' }
  ];

  return (
    <section className="px-6 py-24 border-b border-border-subtle bg-background-dark">
      <div className="mx-auto max-w-7xl">
        <div className="pl-6 mb-16 border-l-2 border-primary">
          <h2 className="mb-2 text-3xl font-medium text-white">Khoa học Hiệu chuẩn</h2>
          <p className="text-[#b8b19d] text-lg font-light max-w-2xl">Chuyển đổi dữ liệu pixel thành kích thước vật lý bằng tỷ lệ tham chiếu.</p>
        </div>
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <div className="space-y-8">
            {steps.map((step) => (
              <div key={step.letter}>
                <h3 className="flex items-center gap-3 mb-3 text-xl font-medium text-white">
                  <span className="flex items-center justify-center w-8 h-8 font-mono text-xs border bg-surface-dark border-border-subtle text-primary">{step.letter}</span>
                  {step.title}
                </h3>
                <p className="text-[#b8b19d] font-light leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Custom Diagram */}
          <div className="border border-border-subtle bg-surface-dark p-8 relative min-h-[400px] flex flex-col justify-between">
            <div className="absolute inset-0 border-[0.5px] border-[#383429] m-4 pointer-events-none opacity-50"></div>
            {/* Corner Markers */}
            <div className="absolute top-0 left-0 w-4 h-4 m-4 border-t border-l border-primary"></div>
            <div className="absolute top-0 right-0 w-4 h-4 m-4 border-t border-r border-primary"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 m-4 border-b border-l border-primary"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 m-4 border-b border-r border-primary"></div>

            <div className="relative flex items-center justify-center flex-1">
              <div className="relative w-32 h-64">
                <motion.div
                  initial={{ height: 0 }}
                  whileInView={{ height: "100%" }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  className="absolute top-0 bottom-0 w-px -translate-x-1/2 left-1/2 bg-primary/30"
                ></motion.div>
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
                  className="absolute left-0 right-0 h-px top-8 bg-primary/30"
                ></motion.div>
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 1.5, ease: "easeInOut", delay: 1 }}
                  className="absolute h-px bottom-24 left-4 right-4 bg-primary/30"
                ></motion.div>
                {/* Dots */}
                <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: 0.5 }} className="absolute left-0 w-2 h-2 -translate-x-1/2 -translate-y-1/2 top-8 bg-primary"></motion.div>
                <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: 0.5 }} className="absolute right-0 w-2 h-2 translate-x-1/2 -translate-y-1/2 top-8 bg-primary"></motion.div>
                <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: 1 }} className="absolute w-2 h-2 -translate-x-1/2 translate-y-1/2 bottom-24 left-4 bg-primary"></motion.div>
                <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: 1 }} className="absolute w-2 h-2 translate-x-1/2 translate-y-1/2 bottom-24 right-4 bg-primary"></motion.div>
                {/* Labels */}
                <div className="absolute top-4 -right-12 font-mono text-[10px] text-primary">d(x,y)</div>
                <div className="absolute bottom-20 -left-12 font-mono text-[10px] text-primary">ref_scale</div>
              </div>
            </div>
            <div className="mt-8 pt-4 border-t border-border-subtle flex justify-between font-mono text-xs text-[#534d3c]">
              <span>HÌNH 2.4 - BẢN ĐỒ KHUNG XƯƠNG</span>
              <span>TỶ LỆ: 1:12</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};