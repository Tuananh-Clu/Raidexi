"use client";

import { Dispatch, SetStateAction, useContext, useState } from "react";
import { ArrowLeft, CheckCircle2, List, Ruler, SaveAll } from "lucide-react";
import { Gender, ProductType, RegionSystem, Brand } from "../types";
import { AISuggestSize } from "@/provider/AISuggestSize";
import { useRouterService } from "@/Shared/Service/routerService";
import { DataToSaveBrandMeasure } from "@/Shared/types";
import { BodyMeasureEstimateContext } from "@/provider/BodyMeasureEstimate";
import { BrandContext } from "@/provider/BrandProvider";
import { useBrandMeasure } from "../hooks/useBrandMeasure";

export const MainContent = ({ brandData }: { brandData?: Brand }) => {
  const { navigate, back } = useRouterService();
  const { HandleSaveSuggestBrand } = useBrandMeasure();
  const context = useContext(AISuggestSize);
  const measurementContext = useContext(BodyMeasureEstimateContext);
  const brandContext = useContext(BrandContext);
  const dataCustomSize = brandContext.brandMeasuredRefCodesData?.dataAnalysis.typeCustom;
  const [activeGender, setActiveGender] = useState<Gender>((dataCustomSize?.gender?.toUpperCase() as Gender) ?? Gender.MALE);
  const [activeType, setActiveType] = useState<ProductType>((dataCustomSize?.typeProduct?.toUpperCase() as ProductType) ?? ProductType.TOP);
  const [activeRegion, setActiveRegion] = useState<RegionSystem>((dataCustomSize?.sizeOutput?.toUpperCase() as RegionSystem) ?? RegionSystem.EU);
  const dataAnalysis = context.dataAnalysisResponse ?? brandContext.brandMeasuredRefCodesData?.dataAnalysis;
  const reliableRate = Math.max(0, Math.min(100, Number(dataAnalysis?.reliableRate) || 0));

  const handleSave = () => {
    if (!brandData?.name || !dataAnalysis) return;
    const dataToSave: DataToSaveBrandMeasure = {
      brand: brandData.name,
      dataMeasure: measurementContext?.dataMeasured ?? [],
      dataAnalysis,
    };
    HandleSaveSuggestBrand(dataToSave);
  };

  const renderSegment = <T extends string>(value: T, current: T, setter: Dispatch<SetStateAction<T>>) => (
    <button
      key={value}
      onClick={() => setter(value)}
      className={`rx-btn ${current === value ? "rx-btn-primary" : "rx-btn-secondary"}`}
      type="button"
      aria-pressed={current === value}
    >
      {value}
    </button>
  );

  return (
    <div className="flex-1 space-y-6">
      <section className="rx-shell">
        <div className="rx-core flex flex-col justify-between gap-5 p-6 md:flex-row md:items-start md:p-8">
          <div>
            <span className="rx-badge rx-badge-blue">Kết quả fit theo thương hiệu</span>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-[var(--ink)]">
              Kết quả fit cho {brandData?.name || "thương hiệu"}
            </h1>
            <p className="mt-3 font-mono text-xs uppercase tracking-[0.14em] text-[var(--ink-muted)]">
              Mã phân tích: {dataAnalysis?.analysisCode || "-"} · {dataAnalysis?.analysisDate || "-"}
            </p>
            <p className="rx-copy mt-4 max-w-2xl text-sm">
              Nếu số đo hoặc hệ size cần hiệu chuẩn thêm, bạn có thể gửi cấu hình này cho admin để cập nhật logic thương hiệu.
            </p>
          </div>
          <button onClick={() => back()} className="rx-btn rx-btn-secondary" type="button">
            <ArrowLeft size={15} strokeWidth={1.35} />
            Quay lại
          </button>
        </div>
      </section>

      <section className="rx-shell">
        <div className="rx-core p-6 md:p-8">
          <p className="rx-label mb-4">Tùy chọn bộ lọc</p>
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <p className="rx-label">Giới tính</p>
              <div className="grid grid-cols-2 gap-2">{Object.values(Gender).map((item) => renderSegment(item, activeGender, setActiveGender))}</div>
            </div>
            <div>
              <p className="rx-label">Loại sản phẩm</p>
              <div className="grid grid-cols-3 gap-2">{Object.values(ProductType).map((item) => renderSegment(item, activeType, setActiveType))}</div>
            </div>
            <div className="md:col-span-2">
              <p className="rx-label">Hệ thống size</p>
              <div className="flex flex-wrap gap-2">{Object.values(RegionSystem).map((item) => renderSegment(item, activeRegion, setActiveRegion))}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
        <div className="rx-shell">
          <div className="rx-core flex h-full flex-col items-center justify-center p-8 text-center">
            <span className="rx-badge rx-badge-brass">Size được đề xuất</span>
            <p className="mt-6 font-mono text-[7rem] font-semibold leading-none text-[var(--ink)]">{dataAnalysis?.sizeSuggest || "-"}</p>
            <p className="mt-3 font-mono text-xs uppercase tracking-[0.16em] text-[var(--signal-blue)]">Hệ {activeRegion}</p>
          </div>
        </div>

        <div className="rx-shell">
          <div className="rx-core p-6 md:p-8">
            <div className="border-b border-[rgba(24,23,20,0.1)] pb-6">
              <p className="rx-label">Độ tin cậy</p>
              <div className="mt-3 flex items-center gap-3">
                <span className="font-mono text-5xl font-semibold text-[var(--ink)]">{reliableRate}%</span>
                <CheckCircle2 size={28} strokeWidth={1.35} className="text-[var(--signal-blue)]" />
              </div>
              <div className="mt-5 h-2 overflow-hidden rounded-full bg-[rgba(24,23,20,0.08)]">
                <div className="h-full rounded-full bg-[var(--signal-blue)]" style={{ width: `${reliableRate}%` }} />
              </div>
            </div>
            <div className="pt-6">
              <p className="rx-label">Độ vừa dự kiến</p>
              <p className="mt-2 text-xl font-extrabold text-[var(--ink)]">
                {dataAnalysis?.fitSuggestFromAI.expectedFit?.content || "Chưa có dữ liệu fit."}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="rx-shell">
        <div className="rx-core p-6 md:p-8">
          <div className="mb-6 flex items-center gap-3">
            <Ruler size={18} strokeWidth={1.35} className="text-[var(--signal-blue)]" />
            <h2 className="text-xl font-extrabold text-[var(--ink)]">Phân tích chi tiết</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <article className="rx-card p-5">
              <p className="rx-label">Số đo quan trọng</p>
              <p className="rx-copy mt-2 text-sm">{dataAnalysis?.fitSuggestFromAI.measurementInsight?.content || "Chưa có ghi chú số đo."}</p>
            </article>
            <article className="rx-card p-5">
              <p className="rx-label">Điều chỉnh theo sản phẩm</p>
              <p className="rx-copy mt-2 text-sm">{dataAnalysis?.fitSuggestFromAI.productFitNote?.content || "Chưa có ghi chú sản phẩm."}</p>
            </article>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <button onClick={handleSave} className="rx-btn rx-btn-primary md:col-span-2" type="button">
          <SaveAll size={18} strokeWidth={1.35} />
          Gửi yêu cầu hiệu chuẩn cho admin
        </button>
        <button onClick={() => navigate("/Brand")} className="rx-btn rx-btn-secondary" type="button">
          <List size={18} strokeWidth={1.35} />
          Danh sách thương hiệu
        </button>
      </div>
    </div>
  );
};
