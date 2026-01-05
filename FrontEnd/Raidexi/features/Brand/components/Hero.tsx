import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="w-full px-6 py-20 mx-auto text-center md:py-32">
      <span className="block text-primary text-xs font-bold tracking-[0.2em] uppercase mb-6">
        Mạng lưới định cỡ toàn cầu
      </span>
      <h2 className="mb-8 text-4xl font-light leading-tight tracking-tight text-white md:text-6xl lg:text-7xl">
        Đối tác Hạ tầng
      </h2>
      <div className="max-w-2xl mx-auto">
        <p className="text-lg font-normal leading-relaxed md:text-xl text-text-muted">
          RAIDEXI hợp tác với các nhà mốt hàng đầu thế giới để chuẩn hóa kích thước thông qua trí tuệ nhân tạo. Các đối tác của chúng tôi không chỉ là khách hàng, họ là những người định nghĩa tiêu chuẩn toàn cầu mới.
        </p>
      </div>
    </section>
  );
};

export default Hero;