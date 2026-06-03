import React from "react";
import { CustomerData, Measurement } from "../types";

interface MeasurementSheetProps {
  customer: CustomerData;
  measurements: Measurement[];
}

const MeasurementSheet: React.FC<MeasurementSheetProps> = ({ customer, measurements }) => {
  return (
    <article id="measurement-sheet" className="w-full max-w-[820px] rounded-[1.5rem] bg-[var(--surface-paper)] p-8 text-[var(--ink)] ring-1 ring-[rgba(24,23,20,0.12)] md:p-12 lg:p-14">
      <header className="border-b border-[rgba(24,23,20,0.12)] pb-8 text-center">
        <p className="text-2xl font-extrabold tracking-[0.34em]">RAIDEXI</p>
        <h1 className="mt-6 text-3xl font-extrabold uppercase tracking-[0.18em] md:text-4xl">Phiếu số đo</h1>
        <p className="mt-3 font-mono text-sm text-[var(--ink-muted)]">Ngày: {customer.date}</p>
      </header>

      <section className="mt-8 grid gap-4 rounded-[1.25rem] bg-[rgba(24,23,20,0.04)] p-5 ring-1 ring-[rgba(24,23,20,0.08)] sm:grid-cols-2">
        <div>
          <p className="rx-label">ID</p>
          <p className="mt-2 font-mono text-sm font-semibold">{customer.id}</p>
        </div>
        <div>
          <p className="rx-label">Khách hàng</p>
          <p className="mt-2 text-sm font-extrabold">{customer.name}</p>
        </div>
      </section>

      <div className="mt-8 overflow-hidden rounded-[1.25rem] ring-1 ring-[rgba(24,23,20,0.12)]">
        <table className="w-full border-collapse">
          <thead className="bg-[var(--ink)] text-[var(--surface-paper)]">
            <tr>
              <th className="px-5 py-3 text-left font-mono text-[11px] uppercase tracking-[0.16em]">Vị trí đo</th>
              <th className="px-5 py-3 text-right font-mono text-[11px] uppercase tracking-[0.16em]">Số đo</th>
            </tr>
          </thead>
          <tbody className="font-mono text-sm">
            {measurements.map((item) => (
              <tr key={item.id} className="border-b border-[rgba(24,23,20,0.08)] last:border-b-0">
                <td className="px-5 py-3 font-semibold">{item.label}</td>
                <td className="px-5 py-3 text-right">{item.value ?? "-"} {item.unit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-20 grid grid-cols-2 gap-10">
        {["Người đo", "Khách hàng"].map((label) => (
          <div key={label} className="text-center">
            <p className="mb-16 text-xs font-extrabold uppercase tracking-[0.16em]">{label}</p>
            <div className="border-t border-[rgba(24,23,20,0.35)] pt-2">
              <p className="font-mono text-xs text-[var(--ink-muted)]">Ký tên</p>
            </div>
          </div>
        ))}
      </div>

      <footer className="mt-16 text-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ink-muted)]">
          HẠ TẦNG ĐO LƯỜNG CHUYÊN NGHIỆP RAIDEXI - TÀI LIỆU BẢO MẬT
        </p>
      </footer>
    </article>
  );
};

export default MeasurementSheet;
