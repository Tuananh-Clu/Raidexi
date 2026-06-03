import { useContext, useState } from "react";
import { ArrowRight, History, X } from "lucide-react";
import { Gender, ProductType, SizeSystem } from "../types";
import { BrandContext } from "@/provider/BrandProvider";
import { AISuggestSize } from "@/provider/AISuggestSize";
import { AISuggestSizeImageType, AISuggestSizeType } from "@/Shared/types";
import { BodyMeasureEstimateContext } from "@/provider/BodyMeasureEstimate";
import { useLoadingStore } from "@/Shared/store/loading.store";
import { useRouterService } from "@/Shared/Service/routerService";
import { sizeTransferFromPic } from "@/Shared/store/sizeTransferFromPic";

export const SizeCustomizer = ({ type }: { type: string }) => {
  const { navigate } = useRouterService();
  const [gender, setGender] = useState<Gender>(Gender.MALE);
  const [productType, setProductType] = useState<ProductType>(ProductType.TOP);
  const [sizeSystem, setSizeSystem] = useState<SizeSystem>(SizeSystem.EU);
  const context = useContext(BrandContext);
  const aiContext = useContext(AISuggestSize);
  const measurementData = useContext(BodyMeasureEstimateContext);
  const size = sizeTransferFromPic((state) => state.sizes);
  const { isLoading } = useLoadingStore();

  const onClose = () => {
    context.setPopUpSettings({ isopened: false, brandrefcode: "", gender: "", productType: "", sizeSystem: "" });
  };

  const handleSubmit = async () => {
    const latestMeasure = measurementData.dataMeasured?.[0]?.dataMeasure;
    if (!latestMeasure) return;

    if (type === "brand") {
      aiContext.setDataMeasure({
        brand: context.popUpSettings.brandrefcode,
        dataMeasure: latestMeasure,
        userCustom: { gender, typeProduct: productType, sizeOutput: sizeSystem },
      } as AISuggestSizeType);
    } else {
      aiContext.setDataMeasureForImage({
        measureData: latestMeasure,
        customizeDataAiSuggest: { gender, typeProduct: productType, sizeOutput: sizeSystem },
        sizeAnalysisResponse: { sizes: size && size.length > 0 ? size : null },
      } as AISuggestSizeImageType);
    }

    onClose();
  };

  const renderOption = <T extends string>(value: T, currentValue: T, setValue: (val: T) => void, label: string) => {
    const isSelected = value === currentValue;
    return (
      <button
        onClick={() => setValue(value)}
        className={`rx-btn flex-1 ${isSelected ? "rx-btn-primary" : "rx-btn-secondary"}`}
        type="button"
        aria-pressed={isSelected}
      >
        {label}
      </button>
    );
  };

  return (
    <div className="rx-shell w-full max-w-2xl">
      <div className="rx-core p-6 md:p-8">
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <span className="rx-badge rx-badge-blue">Tùy chọn fit</span>
            <h2 className="mt-4 text-3xl font-extrabold text-[var(--ink)]">Tùy chỉnh kết quả định cỡ</h2>
            <p className="rx-copy mt-2 text-sm">Thiết lập giới tính, loại sản phẩm và hệ size để AI đưa ra kết quả sát ngữ cảnh hơn.</p>
          </div>
          <button onClick={onClose} className="rx-icon-btn" type="button" aria-label="Đóng">
            <X size={16} strokeWidth={1.35} />
          </button>
        </div>

        <div className="space-y-6">
          <section>
            <p className="rx-label">Giới tính</p>
            <div className="grid grid-cols-2 gap-3">
              {renderOption(Gender.MALE, gender, setGender, "Nam")}
              {renderOption(Gender.FEMALE, gender, setGender, "Nữ")}
            </div>
          </section>

          <section>
            <p className="rx-label">Loại sản phẩm</p>
            <div className="grid grid-cols-3 gap-3">
              {renderOption(ProductType.TOP, productType, setProductType, "Áo")}
              {renderOption(ProductType.BOTTOM, productType, setProductType, "Quần")}
              {renderOption(ProductType.DRESS, productType, setProductType, "Đầm")}
            </div>
          </section>

          <section>
            <p className="rx-label">Hệ thống size</p>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {renderOption(SizeSystem.UK, sizeSystem, setSizeSystem, "UK")}
              {renderOption(SizeSystem.US, sizeSystem, setSizeSystem, "US")}
              {renderOption(SizeSystem.VN, sizeSystem, setSizeSystem, "VN")}
              {renderOption(SizeSystem.EU, sizeSystem, setSizeSystem, "EU")}
            </div>
          </section>

          {context?.brandMeasuredRefCodesData && (
            <button
              onClick={() => navigate(`/Brand/result/?brand=${context.brandMeasuredRefCodesData?.brand}`)}
              className="rx-card flex w-full items-center justify-between gap-4 p-4 text-left"
              type="button"
            >
              <span>
                <span className="rx-label">Bảng đo gần nhất</span>
                <span className="block text-sm font-semibold text-[var(--ink)]">{context.brandMeasuredRefCodesData?.dataAnalysis.analysisDate}</span>
              </span>
              <History size={16} strokeWidth={1.35} className="text-[var(--signal-blue)]" />
            </button>
          )}

          <div className="flex flex-col gap-3 pt-3 md:flex-row">
            <button onClick={onClose} className="rx-btn rx-btn-secondary flex-1" type="button">Hủy bỏ</button>
            <button disabled={isLoading} onClick={handleSubmit} className={`rx-btn rx-btn-primary flex-1 ${isLoading ? "rx-btn-loading" : ""}`} type="button">
              Xem kết quả
              <ArrowRight size={16} strokeWidth={1.35} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
