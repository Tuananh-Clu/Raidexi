import React from 'react';
import { CustomerData, Measurement } from '../types';

interface MeasurementSheetProps {
  customer: CustomerData;
  measurements: Measurement[];
}

const MeasurementSheet: React.FC<MeasurementSheetProps> = ({ customer, measurements }) => {
  return (
    <article id="measurement-sheet" className=" w-full max-w-[800px] bg-white text-stone-900 shadow-[0_0_50px_rgba(0,0,0,0.3)] p-8 md:p-12 lg:p-16 border border-stone-300">
      <header className="mb-10 text-center">
        <div className="mb-8">
          <span className="text-charcoal font-display text-3xl font-bold tracking-[0.4em] uppercase">RAIDEXI</span>
          <div className="h-[1px] w-12 bg-charcoal/20 mx-auto mt-2"></div>
        </div>
        <h1 className="font-display text-2xl md:text-4xl font-bold uppercase tracking-[0.2em] mb-2 text-charcoal">Phiếu Số Đo</h1>
        <p className="font-mono text-sm text-stone-600">Ngày: {customer.date}</p>
      </header>

      <div className="flex flex-col items-start justify-between gap-4 pb-2 mb-8 border-b sm:flex-row sm:items-end border-stone-900 sm:gap-0">
        <div className="flex gap-2">
          <span className="text-sm font-bold uppercase">ID:</span>
          <span className="font-mono text-sm">{customer.id}</span>
        </div>
        <div className="flex gap-2">
          <span className="text-sm font-bold uppercase">Khách hàng:</span>
          <span className="italic font-display">{customer.name}</span>
        </div>
      </div>

      <div className="border border-stone-900">
        <table className="w-full border-collapse">
          <thead className="text-white bg-stone-900">
            <tr>
              <th className="px-6 py-3 text-xs font-bold tracking-widest text-left uppercase border-r border-stone-700">Vị trí đo</th>
              <th className="px-6 py-3 text-xs font-bold tracking-widest text-right uppercase">Số đo</th>
            </tr>
          </thead>
          <tbody className="font-mono text-sm text-charcoal">
            {measurements.map((item) => (
              <tr key={item.id} className="border-b border-stone-300 last:border-b-0">
                <td className="px-6 py-3 font-sans font-bold border-r border-stone-300">{item.label}</td>
                <td className="px-6 py-3 text-right">{item.value} {item.unit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-2 gap-12 mt-24">
        <div className="text-center">
          <p className="mb-16 text-sm font-bold tracking-widest uppercase">Người đo</p>
          <div className="pt-2 border-t border-stone-400">
            <p className="font-mono text-xs italic text-stone-500">Ký tên</p>
          </div>
        </div>
        <div className="text-center">
          <p className="mb-16 text-sm font-bold tracking-widest uppercase">Khách hàng</p>
          <div className="pt-2 border-t border-stone-400">
            <p className="font-mono text-xs italic text-stone-500">Ký tên</p>
          </div>
        </div>
      </div>

      <div className="mt-20 text-center">
        <p className="text-[10px] text-stone-400 font-mono uppercase tracking-widest">
          RAIDEXI PROFESSIONAL MEASUREMENT INFRASTRUCTURE — CONFIDENTIAL DOCUMENT
        </p>
      </div>
    </article>
  );
};

export default MeasurementSheet;