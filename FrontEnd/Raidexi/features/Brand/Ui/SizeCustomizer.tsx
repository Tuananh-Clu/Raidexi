import React, { useContext, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Gender, ProductType, SizeSystem } from '../types';
import { BrandContext } from '@/provider/BrandProvider';
import { AISuggestSize } from '@/provider/AISuggestSize';
import { AISuggestSizeType } from '@/Shared/types';
import { BodyMeasureEstimateContext } from '@/provider/BodyMeasureEstimate';



export const SizeCustomizer = () => {
  const [gender, setGender] = useState<Gender>(Gender.MALE);
  const [productType, setProductType] = useState<ProductType>(ProductType.TOP);
  const [sizeSystem, setSizeSystem] = useState<SizeSystem>(SizeSystem.EU);
  const context=useContext(BrandContext)
  const AIContext=useContext(AISuggestSize)
  const measurementData=useContext(BodyMeasureEstimateContext)
  const onClose = () => {
    context.setPopUpSettings({isopened:false,brandrefcode:"",gender:"",productType:"",sizeSystem:""});
  };

  const handleSubmit = async() => {
    AIContext.setDataMeasure({
        brand:context.popUpSettings.brandrefcode,
        dataMeasure:measurementData.dataMeasured,
        userCustom:{
            gender: gender,
            typeProduct: productType,
            sizeOutput: sizeSystem
        }
    } as AISuggestSizeType);
  }
  
  const renderOption = <T extends string>(
    value: T,
    currentValue: T,
    setValue: (val: T) => void,
    label: string
  ) => {
    const isSelected = value === currentValue;
    return (
      <button
        onClick={() => setValue(value)}
        className={`
          cursor-pointer
          relative flex-1 py-4 px-2 uppercase tracking-wider text-sm font-semibold transition-all duration-300
          border border-opacity-20
          ${isSelected 
            ? 'bg-primary text-black border-gold-accent shadow-[0_0_15px_rgba(230,179,37,0.3)]' 
            : 'bg-transparent text-gray-400 border-gray-600 hover:border-gold-accent/50 hover:text-gold-accent'}
        `}
      >
        {isSelected && (
          <span className="absolute top-1 right-2 text-[0.55rem] font-bold tracking-widest opacity-60">
            CHỌN
          </span>
        )}
        {label}
      </button>
    );
  };

  return (
    <div className="relative w-full max-w-2xl p-1 border bg-black/70 backdrop-blur-sm border-primary ">
      <div className="absolute w-4 h-4 border-t-2 border-l-2 -top-1 -left-1 border-primary" />
      <div className="absolute w-4 h-4 border-t-2 border-r-2 -top-1 -right-1 border-primary" />
      <div className="absolute w-4 h-4 border-b-2 border-l-2 -bottom-1 -left-1 border-primary" />
      <div className="absolute w-4 h-4 border-b-2 border-r-2 -bottom-1 -right-1 border-primary" />

      <div 
        className="relative p-8 border md:p-10 border-primary"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(230, 179, 37, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(230, 179, 37, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }}
      >
        <div className="mb-10 space-y-3 text-center">
          <h2 className="font-mono text-3xl font-bold tracking-wide uppercase md:text-4xl text-gold-accent drop-shadow-md">
            Tùy chỉnh kết quả định cỡ
          </h2>
          <p className="text-[10px] md:text-xs text-gray-400 uppercase tracking-[0.2em]">
            Thiết lập thông số để AI đề xuất size chính xác
          </p>
        </div>

        <div className="space-y-8">
          
          {/* Gender Section */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-gold-accent/80">
              <div className="w-1 h-3 bg-gold-accent" />
              <span className="text-xs font-bold tracking-widest uppercase">Giới tính</span>
            </div>
            <div className="flex gap-4">
              {renderOption(Gender.MALE, gender, setGender, 'NAM')}
              {renderOption(Gender.FEMALE, gender, setGender, 'NỮ')}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-gold-accent/80">
              <div className="w-1 h-3 bg-gold-accent" />
              <span className="text-xs font-bold tracking-widest uppercase">Loại sản phẩm</span>
            </div>
            <div className="flex gap-4">
              {renderOption(ProductType.TOP, productType, setProductType, 'ÁO')}
              {renderOption(ProductType.BOTTOM, productType, setProductType, 'QUẦN')}
              {renderOption(ProductType.DRESS, productType, setProductType, 'ĐẦM')}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-gold-accent/80">
              <div className="w-1 h-3 bg-gold-accent" />
              <span className="text-xs font-bold tracking-widest uppercase">Hệ thống size</span>
            </div>
            <div className="grid grid-cols-4 gap-2 md:gap-4">
              {renderOption(SizeSystem.UK, sizeSystem, setSizeSystem, 'ANH')}
              {renderOption(SizeSystem.US, sizeSystem, setSizeSystem, 'MỸ')}
              {renderOption(SizeSystem.VN, sizeSystem, setSizeSystem, 'VN')}
              {renderOption(SizeSystem.EU, sizeSystem, setSizeSystem, 'CHÂU ÂU')}
            </div>
          </div>
          <div className="flex gap-4 pt-6">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 text-sm font-semibold tracking-wider uppercase transition-colors border cursor-pointer border-gold-accent/30 text-gold-accent/70 hover:border-gold-accent hover:text-gold-accent"
            >
              Hủy bỏ
            </button>
            <button
            disabled={AIContext.isLoading}
              onClick={handleSubmit}
              className="flex-1 py-3 cursor-pointer px-6 bg-primary text-black uppercase text-sm font-bold tracking-wider hover:bg-gray-600 transition-colors flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(230,179,37,0.2)]"
            >
              Xem kết quả
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};