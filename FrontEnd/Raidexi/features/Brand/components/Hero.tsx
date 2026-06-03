import React from "react";

const Hero: React.FC = () => {
  return (
    <section className="rx-section pt-32 text-center md:pt-40">
      <div className="rx-container">
        <span className="rx-badge rx-badge-blue mx-auto">Mạng lưới định cỡ toàn cầu</span>
        <h1 className="mx-auto mt-6 max-w-4xl text-5xl font-extrabold leading-[0.95] text-[var(--ink)] md:text-7xl">
          Đối tác hạ tầng cho size theo từng thương hiệu.
        </h1>
        <p className="rx-copy mx-auto mt-7 max-w-3xl text-lg md:text-xl">
          Raidexi kết nối bảng size, logic fit và dữ liệu cơ thể để mỗi thương hiệu đưa ra một gợi ý rõ ràng thay vì một chuẩn đoán chung chung.
        </p>
      </div>
    </section>
  );
};

export default Hero;
