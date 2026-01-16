"use client";
import React from 'react';
import { motion } from 'framer-motion';

export const SystemCapabilities: React.FC = () => {
  return (
    <section className="border-b border-border-subtle bg-surface-dark">
      <div className="grid mx-auto max-w-7xl lg:grid-cols-2">
        <div className="flex flex-col justify-center p-6 border-b lg:p-24 lg:border-b-0 lg:border-r border-border-subtle">
          <h2 className="mb-6 text-3xl font-medium text-white">Khả năng Hệ thống</h2>
          <p className="text-[#b8b19d] text-lg mb-8 font-light">
            Chúng tôi triển khai thị giác máy tính để trích xuất các phép đo tuyến tính chính xác từ nguồn cấp dữ liệu camera tiêu chuẩn. Đầu ra là dữ liệu hình học thô, không chủ quan, được sử dụng để so sánh ngay lập tức.
          </p>

          <div className="grid gap-8 mb-8 sm:grid-cols-2">
            <div>
              <h4 className="mb-2 text-sm font-medium tracking-wider text-white uppercase">Yêu cầu Đầu vào</h4>
              <ul className="space-y-2 font-mono text-xs text-[#b8b19d]">
                <li className="flex items-start gap-2"><span className="text-primary mt-0.5">+</span> Camera RGB Tiêu chuẩn (720p+)</li>
                <li className="flex items-start gap-2"><span className="text-primary mt-0.5">+</span> Nền Tĩnh</li>
                <li className="flex items-start gap-2"><span className="text-primary mt-0.5">+</span> Trang phục bó sát</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-2 text-sm font-medium tracking-wider text-white uppercase">Xử lý Dữ liệu</h4>
              <ul className="space-y-2 font-mono text-xs text-[#b8b19d]">
                <li className="flex items-start gap-2"><span className="text-primary mt-0.5">+</span> Xử lý cục bộ (Local-first)</li>
                <li className="flex items-start gap-2"><span className="text-primary mt-0.5">+</span> Thời gian suy luận &lt; 200ms</li>
                <li className="flex items-start gap-2"><span className="text-primary mt-0.5">+</span> Có sẵn xuất file JSON</li>
              </ul>
            </div>
          </div>

          <div className="pt-6 mt-2 border-t border-border-subtle">
            <ul className="space-y-4 font-mono text-sm text-[#e0dcd5]">
              <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-primary"></span>Trích xuất 12 kích thước cơ thể chính</li>
              <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-primary"></span>Tự động hiệu chỉnh tỷ lệ</li>
              <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-primary"></span>Tính toán độ lệch kích cỡ so với bảng size</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center p-6 bg-background-dark lg:p-24">
          <div className="w-full mb-6 border border-border-subtle">
            <div className="bg-[#2c261e] px-4 py-2 border-b border-border-subtle flex justify-between items-center">
              <span className="font-mono text-xs tracking-widest uppercase text-primary">Đầu ra Trực tiếp</span>
              <span className="material-symbols-outlined text-[#534d3c] text-sm">terminal</span>
            </div>
            <div className="p-0 overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-xs font-mono text-[#534d3c] border-b border-border-subtle">
                    <th className="p-4 font-normal">KÍCH THƯỚC</th>
                    <th className="p-4 font-normal">GIÁ TRỊ (CM)</th>
                    <th className="p-4 font-normal text-right">ĐỘ TIN CẬY</th>
                  </tr>
                </thead>
                <motion.tbody
                  className="font-mono text-sm text-[#e0dcd5]"
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  variants={{
                    hidden: { opacity: 0 },
                    show: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.1
                      }
                    }
                  }}
                >
                  {[
                    { dim: 'Rộng vai', val: '44.2', conf: '99.1%' },
                    { dim: 'Vòng ngực', val: '102.0', conf: '98.8%' },
                    { dim: 'Dài tay', val: '64.5', conf: '99.5%' },
                    { dim: 'Chiều dài trong chân', val: '81.0', conf: '99.2%' },
                  ].map((row, i) => (
                    <motion.tr
                      key={i}
                      className={`hover:bg-[#2c261e]/50 ${i !== 3 ? 'border-b border-border-subtle' : ''}`}
                      variants={{
                        hidden: { opacity: 0, x: -10 },
                        show: { opacity: 1, x: 0 }
                      }}
                    >
                      <td className="p-4 whitespace-nowrap">{row.dim}</td>
                      <td className="p-4">{row.val}</td>
                      <td className="p-4 text-right text-primary">{row.conf}</td>
                    </motion.tr>
                  ))}
                </motion.tbody>
              </table>
            </div>
          </div>
          <p className="text-xs font-mono text-[#534d3c] w-full text-left">
            * Giá trị thể hiện phép tính trung bình từ loạt 30 khung hình.
          </p>
        </div>
      </div>
    </section>
  );
};