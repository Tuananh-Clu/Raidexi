import React from 'react';
import { Lock, Sliders, ClipboardCheck } from 'lucide-react';

export const FeaturesFooter: React.FC = () => {
  return (
    <div className="grid grid-cols-1 gap-6 pt-8 mt-12 border-t md:grid-cols-3 border-border-subtle">
      <div className="flex items-start gap-3">
        <div className="p-2 border border-border-subtle bg-white text-primary rounded-lg shadow-sm">
          <Lock size={20} strokeWidth={2} />
        </div>
        <div>
          <h5 className="mb-1 font-sans text-sm font-bold tracking-wide text-[var(--ink)] uppercase">Lõi mã hóa</h5>
          <p className="text-xs text-text-muted font-sans leading-relaxed">Mọi nhân logic được cô lập trong vùng chứa bảo mật.</p>
        </div>
      </div>
      
      <div className="flex items-start gap-3">
        <div className="p-2 border border-border-subtle bg-white text-primary rounded-lg shadow-sm">
          <Sliders size={20} strokeWidth={2} />
        </div>
        <div>
          <h5 className="mb-1 font-sans text-sm font-bold tracking-wide text-[var(--ink)] uppercase">Điều chỉnh độ rộng</h5>
          <p className="text-xs text-text-muted font-sans leading-relaxed">Điều chỉnh tham số độ thoải mái theo thời gian thực qua API.</p>
        </div>
      </div>
      
      <div className="flex items-start gap-3">
        <div className="p-2 border border-border-subtle bg-white text-primary rounded-lg shadow-sm">
          <ClipboardCheck size={20} strokeWidth={2} />
        </div>
        <div>
          <h5 className="mb-1 font-sans text-sm font-bold tracking-wide text-[var(--ink)] uppercase">Dấu vết kiểm toán</h5>
          <p className="text-xs text-text-muted font-sans leading-relaxed">Truy vết đầy đủ logic quyết định cho từng kết quả.</p>
        </div>
      </div>
    </div>
  );
};
