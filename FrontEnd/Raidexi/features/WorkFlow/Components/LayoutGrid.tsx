import React from 'react';
import { 
  Eraser, 
  Shuffle, 
  Ruler, 
  Cpu, 
  ArrowLeftRight, 
  RefreshCw 
} from 'lucide-react';
import { FeatureItem } from './FeatureItem';

const LayerGrid: React.FC = () => {
  return (
    <section className="w-full px-6 lg:px-12 py-20 max-w-[1400px]">
      <div className="grid grid-cols-1 gap-0 border lg:grid-cols-2 border-border-subtle bg-[var(--surface-canvas)]">
        
        {/* Left Column: Normalization */}
        <div className="flex flex-col border-b lg:border-b-0 lg:border-r border-border-subtle">
          <div className="p-8 border-b border-border-subtle bg-white">
            <h3 className="mb-2 text-2xl font-bold text-[var(--ink)] font-display">Lớp chuẩn hóa số đo</h3>
            <p className="font-mono text-sm text-text-muted">BƯỚC_01 // TIỀN_XỬ_LÝ</p>
          </div>
          <div className="flex flex-col gap-8 p-8">
            <FeatureItem 
              icon={<Eraser size={20} />}
              title="Giảm nhiễu dữ liệu"
              description="Tiếp nhận dữ liệu cm/inch khác nhau và loại bỏ độ lệch từ bảng size gốc của thương hiệu."
            />
            <FeatureItem 
              icon={<Shuffle size={20} />}
              title="Chuẩn hóa đầu vào"
              description="Chuyển mọi hệ size khu vực (EU/US/UK/JP) về một lược đồ đo lường thống nhất."
            />
            <FeatureItem 
              icon={<Ruler size={20} />}
              title="Căn chuẩn ISO"
              description="Đưa số đo đầu vào về gần chuẩn quốc tế ISO 8559-1 hiện hành."
            />
          </div>
        </div>
        <div className="flex flex-col">
          <div className="p-8 border-b border-border-subtle bg-white">
            <h3 className="mb-2 text-2xl font-bold text-[var(--ink)] font-display">Lớp logic size thương hiệu</h3>
            <p className="font-mono text-sm text-text-muted">BƯỚC_02 // GIẢI_BẰNG_THUẬT_TOÁN</p>
          </div>
          <div className="flex flex-col gap-8 p-8">
            <FeatureItem 
              icon={<Cpu size={20} />}
              title="Thuật toán dự đoán fit"
              description="Áp dụng bản đồ fit riêng của thương hiệu để tạo gợi ý size theo phom cắt sản phẩm."
            />
            <FeatureItem 
              icon={<ArrowLeftRight size={20} />}
              title="Giải quyết xung đột"
              description="Xử lý tín hiệu size mâu thuẫn bằng dữ liệu hiệu suất lịch sử có trọng số."
            />
            <FeatureItem 
              icon={<RefreshCw size={20} />}
              title="Tích hợp dữ liệu đổi trả"
              description="Điều chỉnh tham số logic bằng tín hiệu tỷ lệ đổi trả theo thời gian thực."
            />
          </div>
        </div>

      </div>
    </section>
  );
};


export default LayerGrid;
