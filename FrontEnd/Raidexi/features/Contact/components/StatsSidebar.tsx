import React from "react";
import { BadgeCheck, Fingerprint, Mail, MapPin, Phone, Repeat2, ShieldCheck, TrendingDown } from "lucide-react";

const benefits = [
  { icon: TrendingDown, title: "Giảm đổi trả" },
  { icon: BadgeCheck, title: "Size đáng tin cậy" },
  { icon: ShieldCheck, title: "Giữ logic riêng" },
  { icon: Repeat2, title: "Nhất quán đa kênh" },
];

const StatsSidebar: React.FC = () => {
  return (
    <aside className="space-y-6">
      <div className="rx-shell">
        <div className="rx-core p-6 md:p-8">
          <span className="rx-badge rx-badge-red">Dữ liệu tác động</span>
          <div className="mt-6">
            <span className="font-mono text-6xl font-semibold tracking-tight text-[var(--ink)] tabular-nums">
              -18.5<span className="text-3xl text-[var(--tailor-red)]">%</span>
            </span>
            <p className="rx-label mt-3">Tỷ lệ hoàn trả</p>
            <p className="rx-copy mt-4 text-sm">
              Tín hiệu từ nhóm bán lẻ sau khi chuẩn hóa size bằng dữ liệu cơ thể và luật fit theo thương hiệu.
            </p>
          </div>
        </div>
      </div>

      <div className="rx-shell">
        <div className="rx-core p-6 md:p-8">
          <div className="mb-5 flex items-center justify-between gap-3">
            <span className="rx-badge">Giá trị đối tác</span>
            <Fingerprint size={18} strokeWidth={1.35} className="text-[var(--brass)]" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            {benefits.map(({ icon: Icon, title }) => (
              <div key={title} className="rounded-[1.2rem] bg-[rgba(24,23,20,0.04)] p-4 ring-1 ring-[rgba(24,23,20,0.08)]">
                <Icon size={18} strokeWidth={1.35} className="text-[var(--signal-blue)]" />
                <h4 className="mt-5 text-xs font-extrabold uppercase leading-tight text-[var(--ink)]">{title}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rx-shell">
        <div className="rx-core p-6 md:p-8">
          <span className="rx-badge">Liên hệ trực tiếp</span>
          <div className="mt-5 space-y-3">
            <a href="mailto:partners@raidexi.com" className="rx-card flex items-center gap-4 p-4">
              <Mail size={17} strokeWidth={1.35} className="text-[var(--signal-blue)]" />
              <span>
                <span className="rx-label block">Email đối tác</span>
                <span className="font-mono text-sm text-[var(--ink)]">partners@raidexi.com</span>
              </span>
            </a>
            <a href="tel:+842812345678" className="rx-card flex items-center gap-4 p-4">
              <Phone size={17} strokeWidth={1.35} className="text-[var(--signal-blue)]" />
              <span>
                <span className="rx-label block">Hotline kinh doanh</span>
                <span className="font-mono text-sm text-[var(--ink)]">(+84) 28 1234 5678</span>
              </span>
            </a>
            <div className="rx-card flex items-start gap-4 p-4">
              <MapPin size={17} strokeWidth={1.35} className="mt-1 text-[var(--brass)]" />
              <p className="text-sm leading-relaxed text-[var(--ink-soft)]">
                Tầng 8, Tòa nhà Innovation<br />Quận 1, TP. Hồ Chí Minh, Việt Nam
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default StatsSidebar;
