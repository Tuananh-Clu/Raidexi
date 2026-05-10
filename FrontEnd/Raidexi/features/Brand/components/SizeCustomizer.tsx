import  { useContext, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Gender, ProductType, SizeSystem } from "../types";
import { BrandContext } from "@/provider/BrandProvider";
import { AISuggestSize } from "@/provider/AISuggestSize";
import { AISuggestSizeImageType, AISuggestSizeType } from "@/Shared/types";
import { BodyMeasureEstimateContext } from "@/provider/BodyMeasureEstimate";
import { useLoadingStore } from "@/Shared/store/loading.store";
import { useRouterService } from "@/Shared/Service/routerService";
import { sizeTransferFromPic } from "@/Shared/store/sizeTransferFromPic";

export const SizeCustomizer = ({type}:{type: string}) => {
  const {navigate}=useRouterService()
  const [gender, setGender] = useState<Gender>(Gender.MALE);
  const [productType, setProductType] = useState<ProductType>(ProductType.TOP);
  const [sizeSystem, setSizeSystem] = useState<SizeSystem>(SizeSystem.EU);
  const context = useContext(BrandContext);
  const AIContext = useContext(AISuggestSize);
  const measurementData = useContext(BodyMeasureEstimateContext);
  const size=sizeTransferFromPic((state)=>state.sizes);
  const onClose = () => {
    context.setPopUpSettings({
      isopened: false,
      brandrefcode: "",
      gender: "",
      productType: "",
      sizeSystem: "",
    });
  };
  const { isLoading } = useLoadingStore();

  const handleSubmit = async () => {
    if (type === "brand") {
      AIContext.setDataMeasure({
        brand: context.popUpSettings.brandrefcode,
        dataMeasure: measurementData.dataMeasured[0].dataMeasure,
        userCustom: {
          gender: gender,
          typeProduct: productType,
          sizeOutput: sizeSystem,
        },
      } as AISuggestSizeType);
    } else {
      AIContext.setDataMeasureForImage({
        measureData: measurementData.dataMeasured[0].dataMeasure,
        customizeDataAiSuggest: {
          gender: gender,
          typeProduct: productType,
          sizeOutput: sizeSystem,
        },
        sizeAnalysisResponse: {
          sizes: size && size.length > 0 ? size : null,
        }
      } as AISuggestSizeImageType);
    }

    onClose();
  };

  const renderOption = <T extends string>(
    value: T,
    currentValue: T,
    setValue: (val: T) => void,
    label: string,
  ) => {
    const isSelected = value === currentValue;
    return (
      <button
        onClick={() => setValue(value)}
        className={`
          cursor-pointer
          relative flex-1 py-4 px-2 uppercase tracking-wider text-sm font-bold transition-all duration-300 rounded-xl
          border
          ${
            isSelected
              ? "bg-primary/15 text-primary border-primary/50 shadow-sm"
              : "bg-surface-dark text-text-dim border-border-subtle hover:border-primary/30 hover:text-primary hover:bg-primary/5"
          }
        `}
      >
        {isSelected && (
          <span className="absolute top-1 right-2 text-[0.55rem] font-bold tracking-widest text-primary">
            CHỌN
          </span>
        )}
        {label}
      </button>
    );
  };

  return (
    <div className="relative w-full max-w-2xl p-1 bg-[#1a1510]/95 backdrop-blur-md rounded-3xl shadow-[0_0_40px_rgba(0,0,0,0.4)]">
      <div className="absolute w-4 h-4 border-t-2 border-l-2 -top-1 -left-1 border-primary rounded-tl-lg" />
      <div className="absolute w-4 h-4 border-t-2 border-r-2 -top-1 -right-1 border-primary rounded-tr-lg" />
      <div className="absolute w-4 h-4 border-b-2 border-l-2 -bottom-1 -left-1 border-primary rounded-bl-lg" />
      <div className="absolute w-4 h-4 border-b-2 border-r-2 -bottom-1 -right-1 border-primary rounded-br-lg" />

      <div
        className="relative p-8 border md:p-10 border-border-subtle bg-surface-dark rounded-2xl shadow-sm"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(242, 166, 13, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(242, 166, 13, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px",
        }}
      >
        <div className="mb-10 space-y-3 text-center">
          <h2 className="font-mono text-3xl font-bold tracking-wide uppercase md:text-4xl text-white">
            Tùy chỉnh kết quả định cỡ
          </h2>
          <p className="text-[10px] md:text-xs text-text-dim font-semibold uppercase tracking-[0.2em]">
            Thiết lập thông số để AI đề xuất size chính xác
          </p>
        </div>

        <div className="space-y-8 font-sans">
          {/* Gender Section */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-primary">
              <div className="w-1.5 h-4 bg-primary rounded-full" />
              <span className="text-xs font-bold tracking-widest uppercase">
                Giới tính
              </span>
            </div>
            <div className="flex gap-4">
              {renderOption(Gender.MALE, gender, (v) => setGender(v), "NAM")}
              {renderOption(Gender.FEMALE, gender, (v) => setGender(v), "NỮ")}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-primary">
              <div className="w-1.5 h-4 bg-primary rounded-full" />
              <span className="text-xs font-bold tracking-widest uppercase">
                Loại sản phẩm
              </span>
            </div>
            <div className="flex gap-4">
              {renderOption(ProductType.TOP, productType, (v) => setProductType(v), "ÁO")}
              {renderOption(
                ProductType.BOTTOM,
                productType,
                (v) => setProductType(v),
                "QUẦN",
              )}
              {renderOption(
                ProductType.DRESS,
                productType,
                (v) => setProductType(v),
                "ĐẦM",
              )}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-primary">
              <div className="w-1.5 h-4 bg-primary rounded-full" />
              <span className="text-xs font-bold tracking-widest uppercase">
                Hệ thống size
              </span>
            </div>
            <div className="grid grid-cols-4 gap-2 md:gap-4">
              {renderOption(SizeSystem.UK, sizeSystem, (v) => setSizeSystem(v), "ANH")}
              {renderOption(SizeSystem.US, sizeSystem, (v) => setSizeSystem(v), "MỸ")}
              {renderOption(SizeSystem.VN, sizeSystem, (v) => setSizeSystem(v), "VN")}
              {renderOption(
                SizeSystem.EU,
                sizeSystem,
                (v) => setSizeSystem(v),
                "CHÂU ÂU",
              )}
            </div>
          </div>
         {
          context?.brandMeasuredRefCodesData && (
             <div
             onClick={()=>navigate('/Brand/result/?brand='+context.brandMeasuredRefCodesData?.brand)}
            className="relative p-4 transition-all duration-300 border cursor-pointer rounded-xl border-primary/30 bg-primary/10 hover:bg-primary/15 hover:border-primary/50 group shadow-sm"
          >
            <div className="absolute top-3 right-4 text-[10px] font-semibold text-primary uppercase">
              Gần đây : {context.brandMeasuredRefCodesData?.dataAnalysis.analysisDate}
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold tracking-widest uppercase text-white group-hover:text-primary">
                  Bảng đo gần nhất
                </p>
              </div>

              <span className="text-[11px] font-bold uppercase tracking-widest text-primary group-hover:translate-x-1 transition-transform">
                Xem lại →
              </span>
            </div>
          </div>
          )
         }

          <div className="flex gap-4 pt-6">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3.5 text-sm font-bold tracking-wider uppercase transition-all bg-surface-dark border border-border-subtle rounded-xl text-text-muted hover:bg-surface-hover hover:text-white shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              Hủy bỏ
            </button>
            <button
              disabled={isLoading}
              onClick={handleSubmit}
              className="flex-1 py-3.5 cursor-pointer px-6 bg-primary text-background-dark rounded-xl uppercase text-sm font-bold tracking-wider hover:bg-primary-dark transition-all flex items-center justify-center gap-2 shadow-md outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Xem kết quả
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
