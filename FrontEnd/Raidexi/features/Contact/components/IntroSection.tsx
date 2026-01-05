import React from 'react';

const IntroSection: React.FC = () => {
  return (
    <div className="p-8 lg:p-12 border-b border-border-retro bg-[#1a1812]">
      <div className="flex items-center gap-2 mb-6">
        <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
        <p className="text-primary text-xs font-bold tracking-[0.2em] uppercase">Hợp tác Doanh nghiệp</p>
      </div>
      <h1 className="text-white text-4xl lg:text-5xl font-light leading-tight tracking-[-0.02em] mb-6">
        Liên hệ với Đội ngũ Đối tác
      </h1>
      <p className="max-w-2xl pl-6 font-serif text-lg italic leading-relaxed border-l-2 text-text-muted border-primary/30">
        "Chúng tôi xây dựng hạ tầng số để chuẩn hóa kích cỡ thời trang. Hãy chia sẻ những thách thức về định cỡ mà thương hiệu của bạn đang gặp phải, chúng tôi sẽ cung cấp giải pháp kỹ thuật phù hợp nhất."
      </p>
    </div>
  );
};

export default IntroSection;