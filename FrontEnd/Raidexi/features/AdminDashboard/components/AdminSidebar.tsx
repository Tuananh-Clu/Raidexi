import { ChevronRight, LogOut } from "lucide-react";
import type { AdminTabKey } from "../constants";
import { navItems } from "../constants";

export function AdminSidebar({
  activeTab,
  name,
  onLogout,
  onTabChange,
}: {
  activeTab: AdminTabKey;
  name?: string;
  onLogout: () => void;
  onTabChange: (key: AdminTabKey) => void;
}) {
  return (
    <aside className="lg:sticky lg:top-6 lg:h-[calc(100dvh-3rem)]">
      <div className="raidexi-shell h-full overflow-hidden rounded-[2.2rem] p-1.5">
        <div className="raidexi-core flex h-full min-w-0 flex-col overflow-hidden rounded-[calc(2.2rem-0.375rem)] p-3 md:p-4">
          <button className="flex items-center gap-3 rounded-full p-1 text-left" type="button">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--ink)] text-sm font-bold text-[var(--surface-paper)]">
              R
            </span>
            <span>
              <span className="block text-sm font-extrabold text-[var(--ink)]">Raidexi</span>
              <span className="block font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-[var(--ink-muted)]">
                Admin atelier
              </span>
            </span>
          </button>

          <nav
            className="mt-5 flex max-w-full gap-2 overflow-x-auto pb-1 lg:mt-8 lg:flex-col lg:overflow-visible lg:pb-0"
            aria-label="Điều hướng quản trị"
          >
            {navItems.map(({ key, label, eyebrow, icon: Icon }) => {
              const isActive = activeTab === key;

              return (
                <button
                  key={key}
                  aria-current={isActive ? "page" : undefined}
                  className={`group flex shrink-0 items-center justify-between rounded-full px-3 py-2.5 text-sm font-bold transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                    isActive
                      ? "bg-[var(--ink)] text-[var(--surface-paper)] shadow-[0_18px_40px_-32px_rgba(24,23,20,0.8)]"
                      : "text-[var(--ink-soft)] hover:bg-[rgba(24,23,20,0.055)] hover:text-[var(--ink)]"
                  }`}
                  onClick={() => onTabChange(key)}
                  type="button"
                >
                  <span className="flex items-center gap-3">
                    <Icon size={16} strokeWidth={1.15} />
                    <span className="flex flex-col items-start">
                      <span>{label}</span>
                      <span
                        className={`hidden font-mono text-[8px] font-semibold uppercase tracking-[0.12em] lg:block ${
                          isActive ? "text-[rgba(255,253,247,0.58)]" : "text-[var(--ink-muted)]"
                        }`}
                      >
                        {eyebrow}
                      </span>
                    </span>
                  </span>
                  {isActive && <ChevronRight className="hidden lg:block" size={14} strokeWidth={1.15} />}
                </button>
              );
            })}
          </nav>

          <div className="mt-auto hidden rounded-[1.6rem] border border-[rgba(24,23,20,0.1)] bg-[rgba(255,253,247,0.58)] p-4 lg:block">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--ink-muted)]">
              Phiên quản trị
            </p>
            <p className="mt-3 text-sm font-extrabold text-[var(--ink)]">{name || "Admin"}</p>
            <p className="mt-1 text-xs leading-5 text-[var(--ink-muted)]">
              Kiểm soát đo lường, size logic và dữ liệu fit.
            </p>
            <button
              onClick={onLogout}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-full border border-[rgba(24,23,20,0.1)] bg-[rgba(24,23,20,0.055)] px-4 py-2 text-xs font-bold text-[var(--ink)] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-[rgba(24,23,20,0.09)] active:scale-[0.98]"
              type="button"
            >
              <LogOut size={14} strokeWidth={1.15} />
              Đăng xuất
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
