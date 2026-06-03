import React from "react";

const IntroSection: React.FC = () => {
  return (
    <section className="rx-shell">
      <div className="rx-core p-6 md:p-8 lg:p-10">
        <span className="rx-badge rx-badge-blue">Hợp tác doanh nghiệp</span>
        <h1 className="mt-5 max-w-3xl text-4xl font-extrabold leading-[0.98] text-[var(--ink)] md:text-6xl">
          Kết nối bảng size thương hiệu với cơ thể thật của khách hàng.
        </h1>
        <p className="rx-copy mt-6 max-w-2xl text-lg">
          Raidexi xây dựng lớp định cỡ giúp thương hiệu chuyển dữ liệu cơ thể thành gợi ý size rõ ràng, có thể kiểm soát và phù hợp với logic riêng của từng dòng sản phẩm.
        </p>
      </div>
    </section>
  );
};

export default IntroSection;
