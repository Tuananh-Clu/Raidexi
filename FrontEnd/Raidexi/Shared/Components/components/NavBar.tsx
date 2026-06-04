"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { useRouterService } from "@/Shared/Service/routerService";
import { AuthContext } from "@/provider/AuthProvider";

const links = [
  { label: "Trang chủ", href: "/" },
  { label: "Đo lường", href: "/Measurements" },
  { label: "Thương hiệu", href: "/Brand" },
  { label: "Quy trình", href: "/WorkFlow" },
  { label: "Liên hệ", href: "/Contact" },
];

const navEase = [0.32, 0.72, 0, 1] as const;

export const NavBar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const context = useContext(AuthContext);
  const currentPath = usePathname();
  const { navigate } = useRouterService();
  const isLoggedIn = context?.isLoggedIn;

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const closeAndGo = (href: string) => {
    setOpen(false);
    navigate(href);
  };

  const handleLogout = () => {
    context?.AuthLogout();
    closeAndGo("/");
  };

  return (
    <>
      <header className="sticky top-4 z-40 mx-auto w-full px-3 md:px-6" role="banner">
        <div className="mx-auto max-w-6xl rounded-full border border-[rgba(24,23,20,0.08)] bg-[rgba(24,23,20,0.045)] p-1.5 shadow-[0_28px_90px_-62px_rgba(24,23,20,0.72)] backdrop-blur-2xl">
          <div className="flex min-h-[3.65rem] items-center justify-between gap-3 rounded-full border border-[rgba(255,255,255,0.72)] bg-[rgba(255,253,247,0.88)] px-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.92)]">
            <button
              onClick={() => closeAndGo("/")}
              className="group flex min-w-0 items-center gap-3 rounded-full py-1.5 pl-1 pr-3 text-left transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--signal-blue)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface-paper)]"
              aria-label="Về trang chủ Raidexi"
            >
              <img src="/logo.png" alt="Logo" className="h-13 w-13" />
              <span className="hidden min-w-0 sm:block">
                <span className="block text-[0.86rem] font-extrabold leading-none text-[var(--ink)]">Raidexi</span>
                <span className="mt-1 block font-mono text-[9px] font-semibold uppercase tracking-[0.13em] text-[var(--ink-muted)]">
                  Trợ lý chọn size
                </span>
              </span>
            </button>

            <nav
              className="hidden items-center rounded-full border border-[rgba(24,23,20,0.08)] bg-[rgba(24,23,20,0.045)] p-1 lg:flex"
              aria-label="Điều hướng chính"
            >
              {links.map((item) => {
                const active = currentPath === item.href;
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`rounded-full px-4 py-2 text-xs font-bold transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--signal-blue)] ${
                      active
                        ? "bg-[var(--ink)] text-[var(--surface-paper)] shadow-[0_16px_44px_-30px_rgba(24,23,20,0.72)]"
                        : "text-[var(--ink-soft)] hover:bg-[rgba(255,253,247,0.7)] hover:text-[var(--ink)]"
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
            </nav>

            <div className="hidden items-center gap-2 md:flex">
              {isLoggedIn ? (
                <>
                  <button
                    onClick={() => navigate("/Dashboard")}
                    className="rounded-full border border-[rgba(24,23,20,0.08)] bg-[rgba(24,23,20,0.045)] px-4 py-2 text-xs font-bold text-[var(--ink)] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-[rgba(24,23,20,0.075)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--signal-blue)]"
                  >
                    Hồ sơ
                  </button>
                  <button
                    onClick={handleLogout}
                    className="rounded-full px-4 py-2 text-xs font-bold text-[var(--ink-muted)] transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-[var(--ink)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--signal-blue)]"
                  >
                    Đăng xuất
                  </button>
                </>
              ) : (
                <>
                  <a
                    href="/Login"
                    className="rounded-full px-4 py-2 text-xs font-bold text-[var(--ink-soft)] transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-[var(--ink)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--signal-blue)]"
                  >
                    Đăng nhập
                  </a>
                  <a
                    href="/SignUp"
                    className="group inline-flex items-center gap-2 rounded-full bg-[var(--ink)] py-1.5 pl-4 pr-1.5 text-xs font-bold text-[var(--surface-paper)] shadow-[0_18px_54px_-34px_rgba(24,23,20,0.78)] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--signal-blue)]"
                  >
                    Đăng ký
                    <span
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--signal-blue)] text-[var(--surface-paper)] transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1 group-hover:-translate-y-[1px]"
                      aria-hidden="true"
                    >
                      -&gt;
                    </span>
                  </a>
                </>
              )}
            </div>

            <button
              onClick={() => setOpen((value) => !value)}
              className="relative flex h-10 w-10 items-center justify-center rounded-full bg-[var(--ink)] text-[var(--surface-paper)] transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--signal-blue)] md:hidden"
              aria-label={open ? "Đóng menu" : "Mở menu"}
              aria-expanded={open}
            >
              <span
                className={`absolute h-px w-4 bg-current transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                  open ? "translate-y-0 rotate-45" : "-translate-y-1.5"
                }`}
              />
              <span
                className={`absolute h-px w-4 bg-current transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                  open ? "translate-y-0 -rotate-45" : "translate-y-1.5"
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: navEase }}
            className="fixed inset-0 z-30 bg-[rgba(246,241,231,0.92)] px-4 pt-28 backdrop-blur-3xl md:hidden"
          >
            <motion.nav
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 24, opacity: 0 }}
              transition={{ duration: 0.62, ease: navEase }}
              className="raidexi-shell mx-auto max-w-sm rounded-[2rem] p-1.5"
              aria-label="Điều hướng di động"
            >
              <div className="raidexi-core rounded-[calc(2rem-0.375rem)] p-4">
                <div className="mb-5 flex items-center justify-between border-b border-[rgba(24,23,20,0.1)] pb-4">
                  <span>
                    <span className="block text-sm font-extrabold text-[var(--ink)]">Raidexi</span>
                    <span className="mt-1 block font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-[var(--ink-muted)]">
                      Menu
                    </span>
                  </span>
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--ink)] text-sm font-bold text-[var(--surface-paper)]">
                    R
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  {links.map((item, index) => {
                    const active = currentPath === item.href;
                    return (
                      <motion.button
                        key={item.href}
                        initial={{ opacity: 0, y: 28 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.08 + index * 0.045, duration: 0.58, ease: navEase }}
                        onClick={() => closeAndGo(item.href)}
                        className={`rounded-[1.35rem] px-4 py-3 text-left text-2xl font-bold transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                          active
                            ? "bg-[var(--ink)] text-[var(--surface-paper)]"
                            : "bg-[rgba(255,253,247,0.58)] text-[var(--ink)] ring-1 ring-[rgba(24,23,20,0.08)]"
                        }`}
                      >
                        {item.label}
                      </motion.button>
                    );
                  })}
                </div>

                <button
                  onClick={() => closeAndGo(isLoggedIn ? "/Dashboard" : "/Login")}
                  className="mt-5 flex w-full items-center justify-between rounded-full bg-[var(--ink)] py-1.5 pl-5 pr-1.5 text-left text-sm font-bold text-[var(--surface-paper)]"
                >
                  {isLoggedIn ? "Mở hồ sơ" : "Đăng nhập"}
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--signal-blue)]" aria-hidden="true">
                    -&gt;
                  </span>
                </button>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
