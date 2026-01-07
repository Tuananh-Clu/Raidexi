import React from 'react';
import { MapPin, Shirt, History, Ruler, Edit2 } from '../Ui/IconComponents';
import { UserMeasurements } from '../types';

interface BrandSidebarProps {
  measurements: UserMeasurements;
}

export const BrandSidebar: React.FC<BrandSidebarProps> = ({ measurements }) => {
  return (
    <div className="space-y-6">
      <div className="overflow-hidden border rounded-sm bg-dark-800 border-dark-600">
        <div className="h-48 bg-[#d4cbb8] relative flex items-center justify-center">
            <div className="absolute top-4 right-4 text-white/50">
               <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <div className="flex items-center justify-center w-24 h-24 font-serif text-3xl text-white bg-black shadow-lg">
                CE
            </div>
        </div>
        <div className="p-6">
          <h2 className="mb-4 font-serif text-3xl tracking-wide text-white">CELINE</h2>
          <div className="space-y-3 text-sm text-gray-400">
            <div className="flex items-center gap-3">
              <MapPin size={16} />
              <span>PARIS, PHÁP</span>
            </div>
            <div className="flex items-center gap-3">
              <Shirt size={16} />
              <span>LUXURY READY-TO-WEAR</span>
            </div>
            <div className="flex items-center gap-3">
              <History size={16} />
              <span>DỮ LIỆU: MÙA THU 2023</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 border rounded-sm bg-dark-800 border-dark-600">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-serif text-lg tracking-wider text-gray-200">SỐ ĐO CỦA BẠN</h3>
          <Ruler size={18} className="text-gray-500" />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-3 border bg-dark-700 border-dark-600">
            <div className="mb-1 text-xs text-gray-400 uppercase">VÒNG NGỰC</div>
            <div className="text-xl font-light">{measurements.chest} <span className="text-sm text-gray-500">cm</span></div>
          </div>
          <div className="p-3 border bg-dark-700 border-dark-600">
            <div className="mb-1 text-xs text-gray-400 uppercase">VÒNG EO</div>
            <div className="text-xl font-light">{measurements.waist} <span className="text-sm text-gray-500">cm</span></div>
          </div>
          <div className="p-3 border bg-dark-700 border-dark-600">
            <div className="mb-1 text-xs text-gray-400 uppercase">VÒNG HÔNG</div>
            <div className="text-xl font-light">{measurements.hips} <span className="text-sm text-gray-500">cm</span></div>
          </div>
          <div className="p-3 border bg-dark-700 border-dark-600">
            <div className="mb-1 text-xs text-gray-400 uppercase">CHIỀU CAO</div>
            <div className="text-xl font-light">{measurements.height} <span className="text-sm text-gray-500">cm</span></div>
          </div>
        </div>

        <button className="flex items-center justify-center w-full gap-2 py-3 text-xs tracking-widest uppercase transition-colors border border-gold-500/50 text-gold-500 hover:bg-gold-500/10">
          <Edit2 size={14} />
          CẬP NHẬT SỐ ĐO
        </button>
      </div>
    </div>
  );
};