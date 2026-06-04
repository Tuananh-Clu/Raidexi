import { useContext, useState, Dispatch, SetStateAction } from "react";
import { ArrowRight, History, Ruler, Send, X } from "lucide-react";
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
  const requestedBrand = context.popUpSettings.brandrefcode || "Yêu cầu thương hiệu mới";

  const onClose = () => {
    context.setPopUpSettings({ isopened: false, brandrefcode: "", gender: "", productType: "", sizeSystem: "" });
  };

  const handleSubmit = async () => {
    const latestMeasure = measurementData.dataMeasured?.[0]?.dataMeasure;
    if (!latestMeasure) return;

    if (type === "brand") {
      aiContext.setDataMeasure({
        brand: requestedBrand,
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

  const renderOption = <T extends string | number>(
    value: T,
    currentValue: T,
    setValue: Dispatch<SetStateAction<T>>,
    label: string
  ) => {
    const isSelected = value === currentValue;
    return (
      <button
        onClick={() => setValue(value as SetStateAction<T>)}
        className={`min-h-12 rounded-full px-4 text-sm font-bold transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          isSelected
            ? "bg-[var(--ink)] text-[var(--surface-paper)] shadow-[0_16px_38px_-30px_rgba(24,23,20,0.75)]"
            : "border border-[rgba(24,23,20,0.1)] bg-[rgba(255,253,247,0.62)] text-[var(--ink)] hover:bg-[rgba(24,23,20,0.055)]"
        }`}
        type="button"
        aria-pressed={isSelected}
      >
        {label}
      </button>
    );
  };

  return (
    <div className="rx-shell w-full max-w-3xl">
      <div className="rx-core overflow-hidden">
        <div className="grid gap-0 md:grid-cols-[0.85fr_1.15fr]">
          <aside className="border-b border-[rgba(24,23,20,0.1)] bg-[linear-gradient(160deg,rgba(93,116,101,0.13),rgba(154,116,71,0.1),rgba(255,253,247,0.54))] p-6 md:border-b-0 md:border-r md:p-8">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[var(--ink)] text-[var(--surface-paper)]">
              <Ruler size={18} strokeWidth={1.25} />
            </span>
            <p className="mt-8 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--ink-muted)]">
              Brand measurement request
            </p>
            <h2 className="mt-4 font-serif text-5xl font-light leading-[0.92] text-[var(--ink)]">
              Customize số đo
              <span className="block italic text-[var(--signal-blue)]">cho admin duyệt.</span>
            </h2>
            <div className="mt-8 rounded-[1.4rem] border border-[rgba(24,23,20,0.1)] bg-[rgba(255,253,247,0.58)] p-4">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--ink-muted)]">Thương hiệu</p>
              <p className="mt-2 text-base font-extrabold text-[var(--ink)]">{requestedBrand}</p>
              <p className="mt-2 text-xs leading-5 text-[var(--ink-soft)]">
                Cấu hình này sẽ được dùng để tạo kết quả fit. Ở trang kết quả, bạn có thể gửi/lưu dữ liệu để admin hiệu chuẩn.
              </p>
            </div>
          </aside>

          <section className="p-6 md:p-8">
            <div className="mb-7 flex items-start justify-between gap-4">
              <div>
                <span className="rx-badge rx-badge-blue">Tùy chọn fit</span>
                <h3 className="mt-4 text-2xl font-extrabold text-[var(--ink)]">Thông số xuất cho thương hiệu</h3>
                <p className="rx-copy mt-2 text-sm">
                  Chọn ngữ cảnh sản phẩm để Raidexi tạo phân tích size đúng hơn trước khi gửi cho admin.
                </p>
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
                <p className="rx-label">Hệ thống size cần xuất</p>
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
                    <span className="rx-label">Yêu cầu gần nhất</span>
                    <span className="block text-sm font-semibold text-[var(--ink)]">{context.brandMeasuredRefCodesData?.dataAnalysis.analysisDate}</span>
                  </span>
                  <History size={16} strokeWidth={1.35} className="text-[var(--signal-blue)]" />
                </button>
              )}

              <div className="flex flex-col gap-3 pt-3 md:flex-row">
                <button onClick={onClose} className="rx-btn rx-btn-secondary flex-1" type="button">Hủy bỏ</button>
                <button disabled={isLoading} onClick={handleSubmit} className={`rx-btn rx-btn-primary flex-1 ${isLoading ? "rx-btn-loading" : ""}`} type="button">
                  Tạo phân tích
                  <Send size={16} strokeWidth={1.35} />
                  <ArrowRight size={16} strokeWidth={1.35} />
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
