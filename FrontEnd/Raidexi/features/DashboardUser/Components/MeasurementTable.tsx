import React from 'react';
import { MeasurementDetail } from '../types';

interface MeasurementTableProps {
  data: MeasurementDetail[];
}

const MeasurementTable: React.FC<MeasurementTableProps> = ({ data }) => {
  return (
    <div className="flex flex-col flex-1 w-full">
      <div className="p-4 border-b border-border-color bg-[#1a1713]">
        <h4 className="text-white text-xs font-bold uppercase tracking-[0.15em]">Các số đo chi tiết</h4>
      </div>
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#181511] border-b border-border-color">
              <th className="py-4 px-6 text-[10px] font-mono font-bold text-primary uppercase tracking-[0.15em] w-1/3">Vị trí đo</th>
              <th className="py-4 px-6 text-[10px] font-mono font-bold text-primary uppercase tracking-[0.15em] text-right">Giá trị</th>
              <th className="py-4 px-6 text-[10px] font-mono font-bold text-primary uppercase tracking-[0.15em] hidden sm:table-cell">Ngày đo</th>
              <th className="py-4 px-6 text-[10px] font-mono font-bold text-primary uppercase tracking-[0.15em] hidden md:table-cell">Phương pháp</th>
              <th className="w-10 px-6 py-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-color/50">
            {Array.isArray(data) && data.map((item) => (
              <tr key={item.id} className="hover:bg-[#2a251e] group transition-colors">
                <td className="px-6 py-4 text-sm text-white font-display">
                    {item.label} <span className="text-text-muted">({item.englishLabel})</span>
                </td>
                <td className="px-6 py-4 font-mono text-sm text-right text-white">{item.value.toFixed(1)} {item.unit}</td>
                <td className="hidden px-6 py-4 font-mono text-xs text-text-muted sm:table-cell">{item.date}</td>
                <td className="hidden px-6 py-4 md:table-cell">
                  <span className={`inline-flex items-center px-2 py-1 border text-[9px] font-mono uppercase ${
                    item.method === '3D Scan' 
                        ? 'border-primary text-primary bg-primary/5 font-bold' 
                        : 'border-border-highlight text-text-muted'
                    }`}>
                    {item.method}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="transition-opacity opacity-0 text-text-muted hover:text-white group-hover:opacity-100">
                    <span className="material-symbols-outlined text-[18px]">more_vert</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Table Pagination / Footer */}
      <div className="p-4 border-t border-border-color bg-[#1a1713] flex justify-between items-center">
        <span className="font-mono text-xs text-text-muted">HIỂN THỊ {data.length} TRÊN 42 SỐ ĐO</span>
        <div className="flex gap-2">
          <button className="flex items-center justify-center transition-colors border size-9 border-primary/50 text-primary hover:bg-primary hover:text-background-dark disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-primary">
            <span className="material-symbols-outlined text-[18px]">chevron_left</span>
          </button>
          <button className="flex items-center justify-center transition-colors border size-9 border-primary/50 text-primary hover:bg-primary hover:text-background-dark">
            <span className="material-symbols-outlined text-[18px]">chevron_right</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MeasurementTable;