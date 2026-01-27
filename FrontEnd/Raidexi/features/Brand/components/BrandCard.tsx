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
          borderColor: 'group-hover:border-primary/50',
          statusColor: 'text-primary',
          statusIcon: 'verified',
          statusText: 'Optimized',
          metricValueColor: 'text-white',
          buttonStyles: 'border border-border-sepia hover:bg-primary hover:border-primary hover:text-background-dark text-text-paper',
          buttonText: 'View Profile',
          buttonIcon: 'arrow_forward',
          cornerTag: null,
          iconGrayscale: 'grayscale group-hover:grayscale-0'
        };
      case BrandStatus.RECALIBRATE:
        return {
          borderColor: 'group-hover:border-danger',
          statusColor: 'text-danger',
          statusIcon: 'warning',
          statusText: 'Recalibrate',
          metricValueColor: 'text-danger',
          buttonStyles: 'bg-danger/10 border border-danger hover:bg-danger text-danger hover:text-white',
          buttonText: 'Fix Alignment',
          buttonIcon: 'build',
          cornerTag: (
            <div className="absolute top-0 right-0 w-0 h-0 border-t-[30px] border-t-danger border-l-[30px] border-l-transparent"></div>
          ),
          iconGrayscale: 'grayscale'
        };
      case BrandStatus.PENDING:
        return {
          borderColor: 'group-hover:border-white/40',
          statusColor: 'text-white',
          statusIcon: 'pending',
          statusText: 'Pending',
          metricValueColor: 'text-white',
          buttonStyles: 'border border-dotted border-text-muted hover:border-solid hover:border-white hover:bg-white/5 text-text-muted hover:text-white',
          buttonText: brand.metricValue === '0/12' ? 'Initialize' : 'Resume Setup',
          buttonIcon: 'edit',
          cornerTag: null,
          iconGrayscale: 'grayscale'
        };
    }
  };

  const config = getConfig(status);

  return (
    <>
        <article className={`bg-surface-dark border border-border-sepia p-5 flex flex-col gap-4 group transition-colors relative overflow-hidden ${config.borderColor}`}>
      {config.cornerTag}
      
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 bg-white/5 flex items-center justify-center border border-white/10 transition-all ${config.iconGrayscale}`}>
            <img src={icon} alt={`${name} icon`} className="object-contain w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold leading-none">{name}</h3>
            <span className="font-mono text-xs text-text-muted">{refCode}</span>
          </div>
        </div>
        <span className={`material-symbols-outlined ${status === BrandStatus.PENDING ? 'text-text-muted' : config.statusColor}`} title={config.statusText}>
          {config.statusIcon}
        </span>
      </div>

      <div className="w-full h-px my-1 bg-border-sepia/50"></div>

      <div className="grid grid-cols-2 font-mono text-xs gap-y-2">
        <span className="text-text-muted">Status:</span>
        <span className={`${config.statusColor} text-right uppercase`}>{config.statusText}</span>
        
        <span className="text-text-muted">Last Sync:</span>
        <span className={`${lastSync === '--' ? 'text-text-muted' : 'text-white'} text-right`}>{lastSync}</span>
        
        <span className="text-text-muted">{metricLabel}:</span>
        <span className={`${config.metricValueColor} text-right`}>{metricValue}</span>
      </div>

      <div className="pt-2 mt-auto">
        <button onClick={handleClick} className={`w-full h-9 uppercase text-xs font-bold tracking-wider font-mono transition-all flex items-center justify-center gap-2 ${config.buttonStyles}`}>
          <h1 className=''>Estimate Brand</h1>
          <span className="material-symbols-outlined !text-[16px]">{config.buttonIcon}</span>
        </button>
      </div>
    </article>
    </>

  );
};

export default BrandCard;