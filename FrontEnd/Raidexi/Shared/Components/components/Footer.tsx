"use client";

import React from "react";

const footerLinks = [
  { label: "Đo lường", href: "/Measurements" },
  { label: "Thương hiệu", href: "/Brand" },
  { label: "Quy trình", href: "/WorkFlow" },
  { label: "Liên hệ", href: "/Contact" },
];

export const Footer: React.FC = () => {
  return (
    <footer className="px-4 pb-8 md:px-6">
      <div className="raidexi-shell mx-auto max-w-7xl rounded-[2.4rem] p-1.5">
        <div className="raidexi-core overflow-hidden rounded-[calc(2.4rem-0.375rem)]">
          <div className="grid gap-12 p-7 md:p-10 lg:grid-cols-[1.1fr_0.9fr] lg:p-12">
            <div>
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--ink)] text-sm font-bold text-[var(--surface-paper)]">
                  R
                </span>
                <div>
                  <p className="text-sm font-extrabold text-[var(--ink)]">Raidexi</p>
                  <p className="text-xs text-[var(--ink-muted)]">Trợ lý chọn size</p>
                </div>
              </div>

              <h2 className="mt-8 max-w-3xl font-serif text-[clamp(2.7rem,5vw,5.4rem)] font-light leading-[0.9] text-[var(--ink)]">
                Size rõ ràng hơn
                <span className="block italic text-[var(--signal-blue)]">cho mỗi lần mua.</span>
              </h2>

              <p className="mt-6 max-w-xl text-base leading-7 text-[var(--ink-soft)]">
                Raidexi biến số đo cơ thể thành hồ sơ fit cá nhân, rồi quy đổi theo logic size của từng thương hiệu để người mua bớt đoán mò.
              </p>
            </div>

            <div className="flex flex-col justify-between gap-10 lg:items-end">
              <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-4 lg:max-w-xl">
                {footerLinks.map((link) => (
                  <a
                    key={link.href}
                    className="rounded-full border border-[rgba(24,23,20,0.1)] bg-[rgba(255,253,247,0.62)] px-4 py-3 text-center text-sm font-bold text-[var(--ink)] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5 hover:border-[rgba(24,23,20,0.18)] hover:bg-[var(--surface-paper)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--signal-blue)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--surface-canvas)] active:scale-[0.98]"
                    href={link.href}
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              <div className="w-full rounded-[1.5rem] border border-[rgba(24,23,20,0.1)] bg-[rgba(255,253,247,0.58)] p-5 lg:max-w-xl">
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--ink-muted)]">
                  Cam kết sản phẩm
                </p>
                <p className="mt-3 text-sm leading-6 text-[var(--ink-soft)]">
                  Cơ thể thật, bảng size thật, đề xuất có lý do. Công nghệ ở phía sau, quyết định rõ ràng ở phía trước.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 border-t border-[rgba(24,23,20,0.1)] px-7 py-5 text-xs text-[var(--ink-muted)] md:flex-row md:items-center md:justify-between md:px-10 lg:px-12">
            <p>© 2026 Raidexi.</p>
            <p>Đo cơ thể / hồ sơ fit / size theo thương hiệu</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
