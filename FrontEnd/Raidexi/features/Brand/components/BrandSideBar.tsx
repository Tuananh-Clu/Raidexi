import React from 'react';
import { MapPin, Shirt, History, Ruler, Edit2 } from '../Ui/IconComponents';
import { UserMeasurements } from '../types';

interface BrandSidebarProps {
  measurements: UserMeasurements;
  brandData: any;
}
  
export const BrandSidebar: React.FC<BrandSidebarProps> = ({ measurements, brandData }) => {
  return (
    <div className="space-y-6">
      <div className="overflow-hidden border rounded-sm bg-dark-800 border-dark-600">
        <div className="h-48 bg-[#d4cbb8] relative flex items-center justify-center">
            <div className="flex items-center justify-center w-24 h-24 font-serif text-3xl text-white bg-black shadow-lg">
                <img className='w-20 h-20' src={brandData.icon}></img>
            </div>
        </div>
        <div className="p-6">
          <h2 className="mb-4 font-serif text-3xl tracking-wide text-white">{brandData.name}</h2>
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
            <div className="mb-1 text-xs text-gray-400 uppercase">NGANG VAI</div>
            <div className="text-xl font-light">{measurements.shoulderWidth} <span className="text-sm text-gray-500">cm</span></div>
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