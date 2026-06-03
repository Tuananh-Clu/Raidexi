import React from 'react';
import { 
  Network, 
  ArrowRightToLine, 
  Sliders, 
  Brain, 
  ArrowRightFromLine 
} from 'lucide-react';
import { DiagramNode } from './DìagramNode';
import { Connector } from './Connector';

export const LogicDiagram: React.FC = () => {
  return (
    <section className="w-full px-6 lg:px-12 py-20 max-w-[1400px] border-b border-border-subtle bg-white relative overflow-hidden">
      {/* Background Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{
          backgroundImage: 'linear-gradient(rgba(155,105,48,0.72) 1px, transparent 1px), linear-gradient(90deg, rgba(155,105,48,0.72) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      <div className="relative z-10 flex flex-col gap-12">
        <div className="flex flex-col gap-2">
          <h3 className="flex items-center gap-2 font-mono text-sm font-bold tracking-widest text-[var(--ink)] uppercase">
            <Network size={16} className="text-primary" />
            Sơ đồ logic hệ thống
          </h3>
          <p className="max-w-lg font-sans text-sm text-text-muted">
            Chuỗi xử lý từ dữ liệu nhân trắc học thô đến gợi ý SKU có thể xác định.
          </p>
        </div>

        <div className="w-full pb-8 overflow-x-auto scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
          <div className="min-w-[1200px] flex flex-col md:flex-row items-center md:items-start justify-between gap-0">
            
            {/* Step 1: Input */}
            <DiagramNode 
              icon={<ArrowRightToLine size={24} />}
              step="Đầu vào"
              title="DỮ_LIỆU_CƠ_THỂ"
              subHeader="01. Thu nhận dữ liệu"
              description="Hệ thống tiếp nhận tín hiệu nhân trắc học thô qua API thị giác máy tính hoặc nhập số đo thủ công. Giai đoạn này tạo hệ tọa độ nền cho cơ thể và chuyển kích thước vật lý rời rạc thành dữ liệu JSON có cấu trúc."
              variant="default"
              cornerMark="top-right"
            />

            <Connector />

            {/* Step 2: Layer 01 */}
            <DiagramNode 
              icon={<Sliders size={24} />}
              step="Lớp 01"
              title="AI_CHUẨN_HÓA"
              subHeader="02. Chuẩn hóa"
              description="Thuật toán học máy riêng lọc nhiễu dữ liệu và bất thường trong số đo. Lớp này chuẩn hóa đầu vào quét theo chuẩn ISO-8559, tạo tập dữ liệu nền đủ nhất quán cho logic phía sau."
              variant="active"
            />

            <Connector />

            {/* Step 3: Layer 02 */}
            <DiagramNode 
              icon={<Brain size={24} />}
              step="Lớp 02"
              title="LOGIC_THƯƠNG_HIỆU"
              subHeader="03. Áp dụng quy tắc"
              description="Bộ máy đưa vào quy tắc nhảy size, độ rộng chất liệu và bảng ưu tiên fit của thương hiệu. Nó đối chiếu tọa độ cơ thể đã chuẩn hóa với thông số sản phẩm để giải quyết xung đột size."
              variant="active"
              pulseReversed
            />

            <Connector />

            {/* Step 4: Output */}
            <DiagramNode 
              icon={<ArrowRightFromLine size={24} />}
              step="Đầu ra"
              title="KẾT_QUẢ_CUỐI"
              subHeader="04. SKU xác định"
              description="Hệ thống tạo một gợi ý SKU duy nhất kèm điểm tin cậy. Kết quả chuẩn hóa này sẵn sàng gửi qua API đến ERP, nhật ký kho hoặc giao diện thương mại điện tử."
              variant="default"
              cornerMark="bottom-left"
            />

          </div>
        </div>
      </div>
    </section>
  );
};
