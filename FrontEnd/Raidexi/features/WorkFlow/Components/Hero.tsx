import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="w-full px-6 lg:px-12 py-16 lg:py-24 max-w-[1400px] border-b border-border-subtle">
      <div className="flex flex-col max-w-4xl gap-6">
        <div className="flex items-center gap-2 mb-2 font-mono text-xs tracking-widest uppercase text-primary">
          <span className="w-2 h-2 bg-primary"></span>
          <span>Tài liệu hệ thống v2.4</span>
        </div>
        
        <h1 className="text-5xl font-bold leading-none tracking-tight text-[var(--ink)] lg:text-7xl">
          Cách Raidexi hoạt động
        </h1>
        
        <p className="max-w-2xl pl-6 mt-4 font-sans text-lg font-normal leading-relaxed border-l-2 text-text-muted lg:text-xl border-primary/30">
          RAIDEXI vận hành bằng kiến trúc hai lớp, chuẩn hóa dữ liệu size rời rạc thành một chuẩn đo nhất quán cho thương hiệu. Không đoán mò, chỉ tính toán có cơ sở.
        </p>
      </div>
    </section>
  );
};

export default Hero;
