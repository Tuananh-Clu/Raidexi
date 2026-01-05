import React from 'react';

const StatsSidebar: React.FC = () => {
  return (
    <>
      {/* Stats Block */}
      <div className="p-8 border-b border-border-retro bg-[#1d1a14] relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-2 pointer-events-none opacity-10">
          <span className="material-symbols-outlined text-[100px]">monitoring</span>
        </div>
        <div className="relative z-10">
          <h3 className="text-text-muted text-[10px] font-bold uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
            <span className="w-1 h-1 bg-primary"></span>
            Dữ Liệu Hiệu Suất
          </h3>
          <div className="border border-border-retro p-6 bg-[#181611] shadow-lg">
            <div className="flex flex-col gap-1 mb-4">
              <span className="font-mono text-5xl font-bold tracking-tighter text-white tabular-nums">
                -18.5<span className="text-2xl text-primary">%</span>
              </span>
              <span className="mt-1 font-mono text-xs tracking-widest uppercase text-text-muted">Tỷ lệ hoàn trả (Return Rate)</span>
            </div>
            <div className="w-full h-px mb-4 bg-border-retro"></div>
            <p className="font-mono text-xs leading-relaxed text-text-muted">
              Kết quả ghi nhận từ Đối tác Bán lẻ (Tier-1) trong Q3/2023 sau khi tích hợp API định cỡ tự động của RAIDEXI.
            </p>
          </div>
        </div>
      </div>

      {/* Benefits Grid */}
      <div className="p-8 border-b border-border-retro">
        <h3 className="text-primary text-sm font-bold uppercase tracking-[0.15em] mb-6 flex items-center justify-between">
          Lợi ích Hợp tác
          <span className="text-lg opacity-50 material-symbols-outlined">stars</span>
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <BenefitCard icon="trending_down" title="Giảm Tỷ Lệ Trả Hàng" />
          <BenefitCard icon="verified_user" title="Độ Tin Cậy Kích Cỡ" />
          <BenefitCard icon="fingerprint" title="Bảo Toàn Logic Riêng" />
          <BenefitCard icon="all_inclusive" title="Tính Nhất Quán" />
        </div>
      </div>

      {/* Contact Direct */}
      <div className="grow p-8 bg-[#181611]">
        <h4 className="text-text-muted text-xs font-bold uppercase tracking-[0.2em] mb-6">
          Liên hệ Trực tiếp
        </h4>
        <div className="flex flex-col gap-6">
          <a href="mailto:partners@raidexi.com" className="group border border-border-retro p-4 flex items-center gap-4 hover:border-primary hover:bg-[#1e1c16] transition-all">
            <div className="bg-[#2a271f] p-2 rounded-sm group-hover:text-primary transition-colors">
              <span className="text-xl material-symbols-outlined">mail</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-text-muted uppercase tracking-wider mb-0.5">Email Đối tác</span>
              <span className="font-mono text-sm text-white">partners@raidexi.com</span>
            </div>
          </a>
          <a href="tel:+842812345678" className="group border border-border-retro p-4 flex items-center gap-4 hover:border-primary hover:bg-[#1e1c16] transition-all">
            <div className="bg-[#2a271f] p-2 rounded-sm group-hover:text-primary transition-colors">
              <span className="text-xl material-symbols-outlined">call</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-text-muted uppercase tracking-wider mb-0.5">Hotline Kinh Doanh</span>
              <span className="font-mono text-sm text-white">(+84) 28 1234 5678</span>
            </div>
          </a>
          
          <div className="pl-2 mt-2 border-l border-border-retro">
            <span className="text-[10px] text-text-muted uppercase tracking-wider block mb-2">Trụ sở</span>
            <p className="font-serif text-sm leading-relaxed text-text-paper opacity-80">
              Tầng 8, Tòa nhà Innovation<br />
              Quận 1, TP. Hồ Chí Minh, VN
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

interface BenefitCardProps {
  icon: string;
  title: string;
}

const BenefitCard: React.FC<BenefitCardProps> = ({ icon, title }) => (
  <div className="border border-border-retro p-4 hover:border-primary/40 transition-colors bg-[#1a1812] flex flex-col justify-between h-32">
    <span className="text-2xl material-symbols-outlined text-text-muted">{icon}</span>
    <div>
      <h4 className="text-white text-[11px] font-bold uppercase leading-tight mb-1">{title}</h4>
      <div className="w-4 h-0.5 bg-primary/50"></div>
    </div>
  </div>
);

export default StatsSidebar;