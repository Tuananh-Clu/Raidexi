"use client";
import React, { useContext } from 'react';
import { Brand, BrandStatus } from '../types';
import { BrandContext} from '@/provider/BrandProvider';

interface BrandCardProps {
  brand: Brand;
}

const BrandCard: React.FC<BrandCardProps> = ({ brand }) => {
  const { name, refCode, status, lastSync, metricLabel, metricValue, icon } = brand;
  const context=useContext(BrandContext);
  const {setPopUpSettings}=context;

  const handleClick = () => {
    setPopUpSettings({isopened:true,brandrefcode:name,gender:"",productType:"",sizeSystem:""});
  };
  const getConfig = (status: BrandStatus) => {
    switch (status) {
      case BrandStatus.OPTIMIZED:
        return {
          borderColor: 'group-hover:border-primary/60 group-hover:shadow-md group-hover:shadow-primary/5',
          statusColor: 'text-primary',
          statusIcon: 'verified',
          statusText: 'Đã tối ưu',
          metricValueColor: 'text-[#0f172a]',
          buttonStyles: 'border border-border-subtle hover:bg-primary/10 hover:border-primary/40 hover:text-primary text-text-muted bg-white shadow-sm',
          buttonText: 'Xem hồ sơ',
          buttonIcon: 'arrow_forward',
          cornerTag: null,
          iconGrayscale: 'grayscale group-hover:grayscale-0'
        };
      case BrandStatus.RECALIBRATE:
        return {
          borderColor: 'group-hover:border-rose-500/60 group-hover:shadow-md group-hover:shadow-rose-500/5',
          statusColor: 'text-rose-400',
          statusIcon: 'warning',
          statusText: 'Cần căn chỉnh',
          metricValueColor: 'text-rose-400',
          buttonStyles: 'bg-rose-500/10 border border-rose-500/30 hover:bg-rose-500/20 text-rose-400 shadow-sm',
          buttonText: 'Sửa lỗi',
          buttonIcon: 'build',
          cornerTag: (
            <div className="absolute top-0 right-0 w-0 h-0 border-t-[30px] border-t-rose-500 border-l-[30px] border-l-transparent"></div>
          ),
          iconGrayscale: 'grayscale'
        };
      case BrandStatus.PENDING:
        return {
          borderColor: 'group-hover:border-[#e2e8f0] group-hover:shadow-md',
          statusColor: 'text-[#94a3b8]',
          statusIcon: 'pending',
          statusText: 'Đang chờ',
          metricValueColor: 'text-[#94a3b8]',
          buttonStyles: 'border border-dashed border-border-subtle hover:border-solid hover:border-primary/40 hover:bg-primary/5 text-[#94a3b8] hover:text-primary bg-white shadow-sm',
          buttonText: brand.metricValue === '0/12' ? 'Bắt đầu' : 'Tiếp tục',
          buttonIcon: 'edit',
          cornerTag: null,
          iconGrayscale: 'grayscale opacity-50'
        };
    }
  };

  const config = getConfig(status);

  return (
    <>
      <article className={`bg-white border border-border-subtle rounded-2xl p-6 flex flex-col gap-5 group transition-all duration-300 relative overflow-hidden shadow-sm ${config.borderColor}`}>
      {config.cornerTag}
      
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 bg-[#e2e8f0] flex items-center justify-center border border-border-subtle rounded-xl transition-all duration-300 shadow-sm ${config.iconGrayscale}`}>
            <img src={icon} alt={`${name} icon`} className="object-contain w-7 h-7" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#0f172a] leading-tight mb-1">{name}</h3>
            <span className="font-mono text-[10px] font-semibold tracking-wider text-[#94a3b8] uppercase">{refCode}</span>
          </div>
        </div>
        <span className={`material-symbols-outlined text-[20px] ${status === BrandStatus.PENDING ? 'text-[#94a3b8]' : config.statusColor}`} title={config.statusText}>
          {config.statusIcon}
        </span>
      </div>

      <div className="w-full h-px bg-border-subtle my-1"></div>

      <div className="grid grid-cols-2 font-mono text-[11px] gap-y-3 font-medium">
        <span className="text-[#94a3b8] tracking-wider">Status:</span>
        <span className={`${config.statusColor} font-bold text-right uppercase tracking-wider`}>{config.statusText}</span>
        
        <span className="text-[#94a3b8] tracking-wider">Last Sync:</span>
        <span className={`${lastSync === '--' ? 'text-[#94a3b8]' : 'text-text-secondary font-bold'} text-right`}>{lastSync}</span>
        
        <span className="text-[#94a3b8] tracking-wider">{metricLabel}:</span>
        <span className={`${config.metricValueColor} font-bold text-right`}>{metricValue}</span>
      </div>

      <div className="pt-3 mt-auto border-t border-border-subtle">
        <button onClick={handleClick} className={`w-full h-10 rounded-xl uppercase text-xs font-bold tracking-wider transition-all flex items-center justify-center gap-2 ${config.buttonStyles}`}>
          <span>{config.buttonText}</span>
          <span className="material-symbols-outlined !text-[16px]">{config.buttonIcon}</span>
        </button>
      </div>
    </article>
    </>

  );
};

export default BrandCard;