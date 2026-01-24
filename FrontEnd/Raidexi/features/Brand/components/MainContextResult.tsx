"use client";
import React, { useContext, useState } from 'react';
import { ArrowLeft, CheckCircle2, ShoppingBag, List, Diamond } from '../Ui/IconComponents';
import { Gender, ProductType, RegionSystem, SizeChartRow } from '../types';
import { AISuggestSize } from '@/provider/AISuggestSize';
import { useRouter } from 'next/navigation';

export const MainContent = ({ brandData }: any) => {
  const [activeGender, setActiveGender] = useState<Gender>(Gender.MALE);
  const [activeType, setActiveType] = useState<ProductType>(ProductType.TOP);
  const [activeRegion, setActiveRegion] = useState<RegionSystem>(RegionSystem.EU);
  const context=useContext(AISuggestSize);

  const nav=useRouter();
  const sizeChart: SizeChartRow[] = [
    { size: '46 (M)', chestRange: '90 - 94', shoulderRange: '42 - 43', fitStatus: 'Chật' },
    { size: '48 (L)', chestRange: '95 - 99', shoulderRange: '44 - 45', fitStatus: 'MATCH' },
    { size: '50 (XL)', chestRange: '100 - 104', shoulderRange: '46 - 47', fitStatus: 'Rộng' },
  ];
  console.log('context data analysis response:', context.dataAnalysisResponse);

  return (
    <div className="flex-1">
      {/* Header */}
      <div className="flex flex-col pb-6 mb-8 border-b md:flex-row md:justify-between md:items-start border-dark-700">
        <div>
          <h1 className="mb-2 text-4xl text-white font-display-Newsreader">
            KẾT QUẢ FIT THƯƠNG HIỆU: <span className="text-gold-500">{brandData.name}</span>
          </h1>
          <p className="font-mono text-xs tracking-wider text-gray-500">
            MÃ PHÂN TÍCH: #{context.dataAnalysisResponse?.analysisCode} // DATE: {context.dataAnalysisResponse?.analysisDate}
          </p>
        </div>
        <button onClick={()=>nav.back()} className="flex items-center gap-2 px-6 py-2 mt-4 text-xs tracking-widest uppercase transition-colors border md:mt-0 border-dark-600 hover:border-white">
          <ArrowLeft size={16} /> QUAY LẠI
        </button>
      </div>

      {/* Filters */}
      <div className="p-6 mb-6 border rounded-sm bg-dark-800 border-dark-600">
        <h4 className="flex items-center gap-2 mb-6 text-xs font-bold tracking-widest uppercase text-gold-500">
           <span className="text-lg">⎚</span> TÙY CHỌN BỘ LỌC
        </h4>
        
        <div className="grid grid-cols-1 gap-8 mb-6 md:grid-cols-2">
          <div>
            <label className="block mb-3 text-xs tracking-wide text-gray-500 uppercase">GIỚI TÍNH</label>
            <div className="grid grid-cols-2 border border-dark-600">
              {Object.values(Gender).map((gender) => (
                <button
                  key={gender}
                  onClick={() => setActiveGender(gender)}
                  className={`py-3 text-sm font-medium transition-colors ${
                    activeGender === gender 
                      ? 'bg-primary text-black' 
                      : 'bg-transparent text-gray-400 hover:text-white'
                  }`}
                >
                  {gender}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block mb-3 text-xs tracking-wide text-gray-500 uppercase">LOẠI SẢN PHẨM</label>
            <div className="grid grid-cols-3 border border-dark-600">
              {Object.values(ProductType).map((type) => (
                <button
                  key={type}
                  onClick={() => setActiveType(type)}
                  className={`py-3 text-sm font-medium transition-colors border-l border-dark-600 first:border-l-0 ${
                    activeType === type 
                      ? 'bg-primary text-black' 
                      : 'bg-transparent text-gray-400 hover:text-white'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div>
          <label className="block mb-3 text-xs tracking-wide text-gray-500 uppercase">HỆ THỐNG SIZE</label>
          <div className="flex flex-wrap gap-4">
             {Object.values(RegionSystem).map((region) => (
                <button
                  key={region}
                  onClick={() => setActiveRegion(region)}
                  className={`px-6 py-3 border text-xs font-bold uppercase tracking-wider transition-all ${
                    activeRegion === region
                      ? 'bg-primary border-gold-500 text-black'
                      : 'bg-transparent border-dark-600 text-gray-400 hover:border-gray-400'
                  }`}
                >
                  {region}
                </button>
              ))}
          </div>
        </div>
      </div>

      <div className="relative grid grid-cols-1 gap-0 mb-6 overflow-hidden border rounded-sm lg:grid-cols-2 border-primary">
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary"></div>
        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-primary"></div>
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-primary"></div>
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-primary"></div>

        <div className="flex flex-col items-center justify-center p-10 border-b lg:border-b-0 lg:border-r border-gray bg-gradient-to-br from-dark-[#121212] to-dark-[#0a0a0a]">
          <span className="text-gray-400 text-xs uppercase tracking-[0.2em] mb-4">SIZE ĐƯỢC ĐỀ XUẤT</span>
          <span className="text-[120px] leading-none font-display-Newsreader text-gold-500 drop-shadow-lg">{context.dataAnalysisResponse?.sizeSuggest}</span>
          <span className="mt-4 font-mono text-sm tracking-widest text-gray-500">(SIZE L QUỐC TẾ)</span>
        </div>

        <div className="flex flex-col justify-center p-10 bg-dark-800/50">
          <div className="pb-8 mb-8 border-b border-dashed border-dark-600">
            <span className="block mb-2 text-xs tracking-widest text-gray-400 uppercase">ĐỘ TIN CẬY</span>
            <div className="flex items-center gap-2">
              <span className="text-5xl font-light text-white">{context.dataAnalysisResponse?.reliableRate}%</span>
              <CheckCircle2 className="text-gold-500" size={24} />
            </div>
            <div className="w-full h-1 mt-4 bg-dark-700">
                <div
                  className="bg-primary h-1 shadow-[0_0_10px_rgba(236,174,24,0.5)]"
                  style={{ width: `${Math.max(0, Math.min(100, Number(context.dataAnalysisResponse?.reliableRate) || 0))}%` }}
                ></div>
            </div>
          </div>
          <div>
            <span className="block mb-2 text-xs tracking-widest text-gray-400 uppercase">LOẠI FIT DỰ KIẾN</span>
            <span className="text-2xl font-medium text-white">{context.dataAnalysisResponse?.fitSuggestFromAI.expectedFit}</span>
          </div>
        </div>
      </div>

      {/* Logic Analysis */}
      <div className="p-8 mb-6 border rounded-sm bg-dark-800 border-dark-600">
        <h4 className="flex items-center gap-3 mb-6 font-serif text-lg text-white">
           <Diamond className="text-gold-500 fill-gold-500" size={16} /> LOGIC & PHÂN TÍCH CHI TIẾT
        </h4>

        <div className="grid grid-cols-1 gap-10 mb-8 text-sm leading-relaxed text-gray-300 md:grid-cols-2">
          <div>
             <h5 className="pl-3 mb-3 text-xs font-bold tracking-widest uppercase border-l-2 text-gold-500 border-gold-500">CÁC SỐ ĐO QUAN TRỌNG NHẤT</h5>
             <p>
              {context.dataAnalysisResponse?.fitSuggestFromAI.measureInsight}
             </p>
          </div>
          <div>
             <h5 className="pl-3 mb-3 text-xs font-bold tracking-widest uppercase border-l-2 text-gold-500 border-gold-500">ĐIỀU CHỈNH THEO LOẠI SẢN PHẨM</h5>
             <p>
              {context.dataAnalysisResponse?.fitSuggestFromAI.productFitInsight}
             </p>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="border bg-dark-900 border-dark-700">
           <div className="grid grid-cols-4 px-4 py-3 border-b bg-dark-700 border-dark-600">
              <div className="text-xs font-bold tracking-wider text-gray-400 uppercase">SIZE</div>
              <div className="text-xs font-bold tracking-wider text-gray-400 uppercase">NGỰC (CHEST)</div>
              <div className="text-xs font-bold tracking-wider text-gray-400 uppercase">VAI (SHOULDER)</div>
              <div className="text-xs font-bold tracking-wider text-right text-gray-400 uppercase">TÌNH TRẠNG</div>
           </div>
           {sizeChart.map((row, idx) => (
             <div 
                key={idx} 
                className={`grid grid-cols-4 py-4 px-4 border-b border-dark-700 last:border-b-0 items-center ${
                    row.fitStatus === 'MATCH' ? 'bg-gold-500/10' : ''
                }`}
             >
                <div className={`font-mono text-sm ${row.fitStatus === 'MATCH' ? 'text-gold-500 font-bold' : 'text-gray-400'}`}>
                    {row.size}
                </div>
                <div className={`font-mono text-sm ${row.fitStatus === 'MATCH' ? 'text-white' : 'text-gray-500'}`}>
                    {row.chestRange}
                </div>
                <div className={`font-mono text-sm ${row.fitStatus === 'MATCH' ? 'text-white' : 'text-gray-500'}`}>
                    {row.shoulderRange}
                </div>
                <div className="text-right">
                    {row.fitStatus === 'MATCH' ? (
                        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-bold uppercase rounded text-gold-500 bg-gold-500/20">
                            <CheckCircle2 size={12} /> MATCH
                        </span>
                    ) : (
                        <span className="text-xs text-gray-500">{row.fitStatus}</span>
                    )}
                </div>
             </div>
           ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <button className="md:col-span-2 bg-primary hover:bg-gold-400 text-black font-bold text-sm uppercase tracking-widest py-4 flex items-center justify-center gap-3 transition-colors shadow-[0_4px_20px_rgba(236,174,24,0.3)]">
            <ShoppingBag size={18} /> MUA NGAY TẠI 
        </button>
        <button onClick={()=>nav.replace('/Brand')} className="flex items-center justify-center gap-3 py-4 text-sm font-bold tracking-widest text-white uppercase transition-colors border border-dark-500 hover:border-white bg-dark-800">
           <List size={18} /> DANH SÁCH THƯƠNG HIỆU
        </button>
      </div>
    </div>
  );
};