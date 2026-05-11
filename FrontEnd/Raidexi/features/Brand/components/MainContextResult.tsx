"use client";
import { useContext, useState } from "react";
import { ArrowLeft, CheckCircle2, Diamond, List } from "../components/IconComponents";
import { Gender, ProductType, RegionSystem } from "../types";
import { AISuggestSize } from "@/provider/AISuggestSize";
import { SaveAllIcon } from "lucide-react";
import { useRouterService } from "@/Shared/Service/routerService";
import { DataToSaveBrandMeasure } from "@/Shared/types";
import { BodyMeasureEstimateContext } from "@/provider/BodyMeasureEstimate";
import { BrandContext } from "@/provider/BrandProvider";
import { useBrandMeasure } from "../hooks/useBrandMeasure";


export const MainContent = ({ brandData }: any) => {
  const { navigate, back } = useRouterService();
  const { HandleSaveSuggestBrand } = useBrandMeasure();
  const context = useContext(AISuggestSize);
  const measurementContext = useContext(BodyMeasureEstimateContext);
  const brandContext=useContext(BrandContext)

  const handleSave = () => {
    const dataToSave: DataToSaveBrandMeasure = {
      brand: brandData.name,
      dataMeasure: measurementContext?.dataMeasured!,
      dataAnalysis: context.dataAnalysisResponse!,
    };

    HandleSaveSuggestBrand(dataToSave);
  };
  const dataCustomSize = brandContext.brandMeasuredRefCodesData?.dataAnalysis.typeCustom;
  const [activeGender, setActiveGender] = useState<Gender>((dataCustomSize?.gender?.toUpperCase() as Gender) ?? Gender.MALE);
  const [activeType, setActiveType] = useState<ProductType>((dataCustomSize?.typeProduct?.toUpperCase() as ProductType) ?? ProductType.TOP);
  const [activeRegion, setActiveRegion] = useState<RegionSystem>(
    (dataCustomSize?.sizeOutput?.toUpperCase() as RegionSystem) ?? RegionSystem.EU
  );
  const dataAnalysisWithFilter = context.dataAnalysisResponse==null?brandContext.brandMeasuredRefCodesData?.dataAnalysis:context.dataAnalysisResponse;
  console.log("dataAnalysisWithFilter",dataAnalysisWithFilter);
    return (
    <div className="flex-1 font-sans">
      <div className="flex flex-col pb-6 mb-8 border-b md:flex-row md:justify-between md:items-start border-border-subtle">
        <div>
          <h1 className="mb-2 text-3xl font-bold tracking-tight text-[#0f172a] md:text-4xl">
            KẾT QUẢ FIT THƯƠNG HIỆU:{" "}
            <span className="text-primary">{brandData?.name}</span>
          </h1>
          <p className="font-mono text-xs font-semibold tracking-wider text-[#94a3b8] uppercase">
            MÃ PHÂN TÍCH: # {dataAnalysisWithFilter?.analysisCode} // DATE:{" "}
            {dataAnalysisWithFilter?.analysisDate}
          </p>
        </div>
        <button
          onClick={() => back()}
          className="flex items-center gap-2 px-6 py-2.5 mt-4 text-xs font-bold tracking-widest uppercase transition-colors border rounded-lg md:mt-0 border-border-subtle hover:border-primary/40 hover:text-primary hover:bg-primary/5 shadow-sm"
        >
          <ArrowLeft size={16} /> QUAY LẠI
        </button>
      </div>

      <div className="p-6 mb-8 bg-white border border-border-subtle rounded-2xl shadow-sm">
        <h4 className="flex items-center gap-2 mb-6 text-xs font-bold tracking-widest uppercase text-primary">
          <span className="text-lg">⎚</span> TÙY CHỌN BỘ LỌC
        </h4>

        <div className="grid grid-cols-1 gap-8 mb-6 md:grid-cols-2">
          <div>
            <label className="block mb-3 text-xs font-bold tracking-wide text-[#94a3b8] uppercase">
              GIỚI TÍNH
            </label>
            <div className="grid grid-cols-2 overflow-hidden border border-border-subtle rounded-xl">
              {Object.values(Gender).map((gender) => (
                <button
                  key={gender}
                  onClick={() => setActiveGender(gender)}
                  className={`py-3 text-sm font-bold transition-colors ${
                    activeGender === gender.toUpperCase()
                      ? "bg-primary text-background-dark"
                      : "bg-white text-[#94a3b8] hover:bg-[#f1f5f9] hover:text-[#0f172a]"
                  }`}
                >
                  {gender}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block mb-3 text-xs font-bold tracking-wide text-[#94a3b8] uppercase">
              LOẠI SẢN PHẨM
            </label>
            <div className="grid grid-cols-3 overflow-hidden border border-border-subtle rounded-xl">
              {Object.values(ProductType).map((type) => (
                <button
                  key={type}
                  onClick={() => setActiveType(type)}
                  className={`py-3 text-sm font-bold transition-colors border-l border-border-subtle first:border-l-0 ${
                    activeType === type.toUpperCase()
                      ? "bg-primary text-background-dark"
                      : "bg-white text-[#94a3b8] hover:bg-[#f1f5f9] hover:text-[#0f172a]"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div>
          <label className="block mb-3 text-xs font-bold tracking-wide text-[#94a3b8] uppercase">
            HỆ THỐNG SIZE
          </label>
          <div className="flex flex-wrap gap-3">
            {Object.values(RegionSystem).map((region) => (
              <button
                key={region}
                onClick={() => setActiveRegion(region)}
                className={`px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all border ${
                  activeRegion === region.toUpperCase()
                    ? "bg-primary/15 border-primary/50 text-primary shadow-sm"
                    : "bg-white border-border-subtle text-[#94a3b8] hover:border-primary/30 hover:text-primary hover:bg-primary/5"
                }`}
              >
                {region}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="relative grid grid-cols-1 gap-0 mb-8 overflow-hidden bg-white border border-border-subtle rounded-2xl shadow-sm lg:grid-cols-2">
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-primary rounded-tl-sm z-10"></div>
        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-primary rounded-tr-sm z-10"></div>
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-primary rounded-bl-sm z-10"></div>
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-primary rounded-br-sm z-10"></div>

        <div className="flex flex-col items-center justify-center p-10 border-b lg:border-b-0 lg:border-r border-border-subtle bg-[#f1f5f9]">
          <span className="text-[#94a3b8] text-[11px] font-bold uppercase tracking-[0.2em] mb-4">
            SIZE ĐƯỢC ĐỀ XUẤT
          </span>
          <span className="text-[120px] leading-none font-bold text-[#0f172a] drop-shadow-sm tracking-tighter">
            {dataAnalysisWithFilter?.sizeSuggest}
          </span>
          <span className="mt-4 font-mono text-sm font-semibold tracking-widest text-primary uppercase">
            (SIZE L QUỐC TẾ)
          </span>
        </div>

        <div className="flex flex-col justify-center p-10 bg-white">
          <div className="pb-8 mb-8 border-b border-dashed border-border-subtle">
            <span className="block mb-2 text-xs font-bold tracking-widest text-[#94a3b8] uppercase">
              ĐỘ TIN CẬY
            </span>
            <div className="flex items-center gap-2">
              <span className="text-5xl font-bold text-[#0f172a]">
                {dataAnalysisWithFilter?.reliableRate}%
              </span>
              <CheckCircle2 className="text-emerald-500" size={28} />
            </div>
            <div className="w-full h-1.5 mt-5 bg-[#e2e8f0] rounded-full overflow-hidden">
              <div
                className="bg-emerald-500 h-1.5 rounded-full"
                style={{
                  width: `${Math.max(0, Math.min(100, Number(dataAnalysisWithFilter?.reliableRate) || 0))}%`,
                }}
              ></div>
            </div>
          </div>
          <div>
            <span className="block mb-2 text-xs font-bold tracking-widest text-[#94a3b8] uppercase">
              LOẠI FIT DỰ KIẾN
            </span>
            <span className="text-xl font-bold text-[#0f172a]">
              {
                dataAnalysisWithFilter?.fitSuggestFromAI.expectedFit
                  ?.content
              }
            </span>
          </div>
        </div>
      </div>

      {/* Logic Analysis */}
      <div className="p-8 mb-8 bg-white border border-border-subtle rounded-2xl shadow-sm">
        <h4 className="flex items-center gap-3 mb-6 font-bold tracking-wide text-lg text-[#0f172a] uppercase">
          <Diamond className="text-primary fill-primary" size={18} /> LOGIC &
          PHÂN TÍCH CHI TIẾT
        </h4>

        <div className="grid grid-cols-1 gap-10 mb-8 text-sm leading-relaxed text-text-muted md:grid-cols-2">
          <div>
            <h5 className="pl-3 mb-3 text-xs font-bold tracking-widest uppercase border-l-2 text-primary border-primary">
              CÁC SỐ ĐO QUAN TRỌNG NHẤT
            </h5>
            <p>
              {
                dataAnalysisWithFilter?.fitSuggestFromAI
                  .measurementInsight?.content
              }
            </p>
          </div>
          <div>
            <h5 className="pl-3 mb-3 text-xs font-bold tracking-widest uppercase border-l-2 text-primary border-primary">
              ĐIỀU CHỈNH THEO LOẠI SẢN PHẨM
            </h5>
            <p>
              {
                dataAnalysisWithFilter?.fitSuggestFromAI.productFitNote
                  ?.content
              }
            </p>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="overflow-hidden border border-border-subtle rounded-xl">
          <div className="grid grid-cols-4 px-5 py-4 border-b bg-[#f1f5f9] border-border-subtle">
            <div className="text-[11px] font-bold tracking-wider text-[#94a3b8] uppercase">
              SIZE
            </div>
            <div className="text-[11px] font-bold tracking-wider text-[#94a3b8] uppercase">
              NGỰC (CHEST)
            </div>
            <div className="text-[11px] font-bold tracking-wider text-[#94a3b8] uppercase">
              VAI (SHOULDER)
            </div>
            <div className="text-[11px] font-bold tracking-wider text-right text-[#94a3b8] uppercase">
              TÌNH TRẠNG
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <button
          onClick={handleSave}
          className="md:col-span-2 bg-primary hover:bg-primary-dark text-background-dark rounded-xl font-bold text-sm uppercase tracking-widest py-4 flex items-center justify-center gap-3 transition-colors shadow-md hover:shadow-lg outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
        >
          <SaveAllIcon size={20} /> Lưu dữ liệu vào tài khoản của tôi
        </button>
        <button
          onClick={() => navigate("/Brand")}
          className="flex items-center justify-center gap-3 py-4 text-sm font-bold tracking-widest text-text-muted uppercase transition-all bg-white border border-border-subtle rounded-xl hover:bg-[#f1f5f9] hover:text-[#0f172a] hover:border-[#e2e8f0] shadow-sm"
        >
          <List size={20} /> DANH SÁCH THƯƠNG HIỆU
        </button>
      </div>
    </div>
  );
}
