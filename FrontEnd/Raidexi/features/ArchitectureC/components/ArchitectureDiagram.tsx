import React from 'react';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { DiagramLayer } from './DiagramLayer';

export const ArchitectureDiagram: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-0 border border-border-subtle relative bg-white rounded-xl shadow-sm overflow-hidden">
      {/* Decorative corners */}
      <div className="absolute w-3 h-3 border-t border-l -top-1 -left-1 border-primary rounded-tl-sm z-10"></div>
      <div className="absolute w-3 h-3 border-t border-r -top-1 -right-1 border-primary rounded-tr-sm z-10"></div>
      <div className="absolute w-3 h-3 border-b border-l -bottom-1 -left-1 border-primary rounded-bl-sm z-10"></div>
      <div className="absolute w-3 h-3 border-b border-r -bottom-1 -right-1 border-primary rounded-br-sm z-10"></div>

      {/* Layer 01 */}
      <div className="border-b lg:border-b-0 lg:border-r border-border-subtle">
        <DiagramLayer
          layerNumber="01"
          title="Chuẩn hóa số đo"
          label="Luồng đầu vào"
          dotColorClass="bg-primary"
          borderColorClass="border-transparent"
          description={
            <>
              <span className="text-[var(--ink-muted)] font-medium">// Xử lý có AI hỗ trợ</span>
              <br />
              Tiếp nhận dữ liệu quét thô, loại bỏ nhiễu và chuẩn hóa hình học cơ thể thành vector số đo theo chuẩn ISO.
            </>
          }
        >
          <div className="p-4 border rounded-xl bg-[var(--surface-linen)] shadow-inner border-border-subtle mt-4">
            <div className="flex justify-between border-b border-border-subtle pb-2 mb-3">
              <span className="text-[var(--ink-muted)] font-bold tracking-wide">NGUỒN_ĐẦU_VÀO</span>
              <span className="text-primary font-bold bg-primary/10 px-2 py-0.5 rounded-md">LiDAR_V4</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="text-[var(--ink-muted)] text-[10px] font-bold tracking-wider">DỮ_LIỆU_THÔ</div>
                <div className="text-text-secondary font-medium">H: 1824mm</div>
                <div className="text-text-secondary font-medium">C: 1042mm</div>
                <div className="text-[var(--ink-muted)] font-medium">N: 24% (cao)</div>
              </div>
              <div className="relative space-y-1">
                <div className="absolute top-0 bottom-0 w-px -left-3 bg-border-subtle"></div>
                <div className="text-primary text-[10px] font-bold tracking-wider">ĐÃ_CHUẨN_HÓA</div>
                <div className="text-[var(--ink)] font-bold">H: 182.4cm</div>
                <div className="text-[var(--ink)] font-bold">C: 104.2cm</div>
                <div className="text-primary font-bold">N: 0.2% (sạch)</div>
              </div>
            </div>
          </div>
        </DiagramLayer>
      </div>

      {/* Connector Desktop */}
      <div className="relative flex-col items-center justify-center hidden w-24 lg:flex bg-[var(--ink)] border-r border-border-subtle">
        <div className="absolute left-0 w-full h-px bg-white/10 top-1/2"></div>
        <div className="z-10 p-2 border rounded-full bg-[var(--surface-paper)] border-primary/30 shadow-sm">
          <ArrowRight className="text-primary animate-pulse" size={20} />
        </div>
        <div className="absolute top-1/2 -mt-10 font-mono text-[9px] font-bold text-primary rotate-90 tracking-widest uppercase whitespace-nowrap bg-[var(--ink)] px-2">
          Bàn giao bảo mật
        </div>
      </div>

      {/* Connector Mobile */}
      <div className="relative flex items-center justify-center h-16 border-b lg:hidden bg-[var(--ink)] border-border-subtle">
        <div className="absolute top-0 w-px h-full bg-white/10 left-1/2"></div>
        <div className="z-10 p-2 border rounded-full bg-[var(--surface-paper)] border-primary/30 shadow-sm">
          <ArrowDown className="text-primary animate-pulse" size={20} />
        </div>
      </div>

      {/* Layer 02 */}
      <div>
        <DiagramLayer
          layerNumber="02"
          title="Bộ máy logic size"
          label="Logic khách hàng"
          dotColorClass="bg-emerald-500"
          borderColorClass="border-transparent"
          description={
            <>
              <span className="text-[var(--ink-muted)] font-medium">// Bộ luật thuộc thương hiệu</span>
              <br />
              Áp dụng ưu tiên fit, độ rộng cho phép và bảng size riêng vào dữ liệu cơ thể đã chuẩn hóa.
            </>
          }
        >
          <div className="p-4 border rounded-xl bg-[var(--ink)] shadow-[0_24px_70px_-54px_rgba(23,19,15,0.82)] border-white/10 mt-4 text-white/62">
            <div className="flex justify-between border-b border-white/10 pb-2 mb-3">
              <span className="text-[var(--ink-muted)] font-bold tracking-wide">NHÂN_LOGIC</span>
              <span className="text-[var(--brass-soft)] font-bold bg-white/10 px-2 py-0.5 rounded-md">v2.1_RELAXED</span>
            </div>
            <div className="space-y-3 font-mono">
              <div className="flex items-start gap-3">
                <span className="text-[var(--ink-muted)] mt-0.5">01</span>
                <div>
                  <span className="text-[var(--brass-soft)] font-bold">NẾU</span> <span className="text-primary/80">ưu_tiên_fit</span> == <span className="text-[var(--surface-paper)]">{"\"THOẢI_MÁI\""}</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[var(--ink-muted)] mt-0.5">02</span>
                <div>
                  <span className="text-[var(--brass-soft)] font-bold">THÌ</span> <span className="text-primary/80">độ_rộng_ngực</span> += <span className="text-[var(--surface-paper)]">4.5cm</span>
                </div>
              </div>
              <div className="flex items-start gap-3 border-t border-white/10 pt-3 mt-3">
                <span className="text-primary font-bold mt-0.5">&gt;&gt;</span>
                <div>
                  <span className="text-white/50">ĐẦU RA:</span> <span className="px-2 py-0.5 font-bold text-[var(--surface-paper)] bg-primary rounded">SIZE L (vừa chuẩn)</span>
                </div>
              </div>
            </div>
          </div>
        </DiagramLayer>
      </div>
    </div>
  );
};
