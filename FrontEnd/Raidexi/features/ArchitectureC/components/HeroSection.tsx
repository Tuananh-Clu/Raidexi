import React from 'react';

export const HeroSection: React.FC = () => {
  return (
    <div className="flex flex-col items-start justify-between gap-6 pb-8 mb-12 border-b md:flex-row md:items-end border-border-subtle">
      <div className="max-w-2xl">
        <div className="mb-2 font-mono text-xs tracking-widest uppercase text-primary font-bold">
          Đặc tả thiết kế 084-B
        </div>
        <h2 className="mb-4 text-4xl font-bold leading-tight text-[var(--ink)] md:text-5xl tracking-tight">
          Kiến trúc giải pháp
        </h2>
        <p className="max-w-xl font-sans text-lg leading-relaxed text-text-muted">
          Hạ tầng hai lớp tách rời giúp giữ toàn vẹn dữ liệu và quyền tự chủ của thương hiệu.
          Từ hình học cơ thể thô đến logic size có thể thực thi.
        </p>
      </div>
      <div className="flex flex-col items-end gap-2 text-right">
        <div className="font-mono text-xs font-semibold text-[var(--ink-muted)] uppercase tracking-wider">BẢN 1.0.4</div>
        <div className="font-mono text-xs font-semibold text-primary flex items-center gap-2 uppercase tracking-wider">
          <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse shadow-[0_0_8px_rgba(242,166,13,0.4)]"></span>
          TRẠNG THÁI: TRỰC TUYẾN
        </div>
      </div>
    </div>
  );
};
