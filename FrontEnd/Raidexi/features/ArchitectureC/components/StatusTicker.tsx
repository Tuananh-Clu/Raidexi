import React from 'react';

export const StatusTicker: React.FC = () => {
  return (
    <div className="relative z-10 flex py-3 overflow-hidden border-t border-y border-border-subtle bg-[var(--surface-linen)] whitespace-nowrap">
      <div className="font-mono text-[10px] text-primary font-bold uppercase tracking-[0.2em] animate-marquee flex gap-16 px-4">
        <span>Trạng thái hệ thống: ổn định</span>
        <span>Độ trễ: 12ms</span>
        <span>Nút xử lý: 24 đang hoạt động</span>
        <span>Bộ máy logic: Brand_Key_044 đã xác thực</span>
        <span>Mã hóa: AES-256</span>
        <span>Trạng thái hệ thống: ổn định</span>
        <span>Độ trễ: 12ms</span>
        <span>Nút xử lý: 24 đang hoạt động</span>
        <span>Bộ máy logic: Brand_Key_044 đã xác thực</span>
        <span>Mã hóa: AES-256</span>
      </div>
      <div className="font-mono text-[10px] text-primary font-bold uppercase tracking-[0.2em] animate-marquee flex gap-16 px-4 absolute left-full top-3">
        <span>Trạng thái hệ thống: ổn định</span>
        <span>Độ trễ: 12ms</span>
        <span>Nút xử lý: 24 đang hoạt động</span>
        <span>Bộ máy logic: Brand_Key_044 đã xác thực</span>
        <span>Mã hóa: AES-256</span>
        <span>Trạng thái hệ thống: ổn định</span>
        <span>Độ trễ: 12ms</span>
        <span>Nút xử lý: 24 đang hoạt động</span>
        <span>Bộ máy logic: Brand_Key_044 đã xác thực</span>
        <span>Mã hóa: AES-256</span>
      </div>
    </div>
  );
};
