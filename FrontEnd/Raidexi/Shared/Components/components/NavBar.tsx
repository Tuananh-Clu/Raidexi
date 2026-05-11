"use client";
import React, { useContext } from "react";
import { MenuIcon, SquareActivity } from "lucide-react";
import { usePathname } from "next/navigation";
import { AuthContext } from "@/provider/AuthProvider";
import { useRouterService } from "@/Shared/Service/routerService";
import { mobileScreenStore } from "@/Shared/store/mobileScreen.store";

export const NavBar: React.FC = () => {
  const description = [
    { label: "Trang chủ", href: "/" },
    { label: "Đo lường", href: "/Measurements" },
    { label: "Kiến trúc", href: "/Architecture" },
    { label: "Đối tác", href: "/Brand" },
    { label: "Liên hệ", href: "/Contact" },
  ];
  const context = useContext(AuthContext);
  const isLoggedIn = context?.isLoggedIn;
  const currentPath = usePathname();
  const { navigate } = useRouterService();
  const handleClick = async () => {
    context?.AuthLogout();
    navigate("/");
  };
  const { isMobileScreen, setOpenMobileMenu } = mobileScreenStore();
  return (
    <header className="sticky top-0 z-50 border-b border-[#e2e8f0]/80 bg-white/80 backdrop-blur-xl" role="banner">
      <div className="flex items-center justify-between h-16 px-6 mx-auto max-w-7xl">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-br from-[#2563eb] to-[#06b6d4] text-[#0f172a] shadow-sm" aria-hidden="true">
            <SquareActivity size={18} strokeWidth={2.5} />
          </div>
          <button
            onClick={() => {
              window.scrollBy(0, 0);
              navigate("/");
            }}
            aria-label="Về trang chủ Raidexi"
            className="font-display text-xl font-bold tracking-tight text-[#0f172a] hover:text-[#2563eb] transition-colors focus-visible:ring-2 focus-visible:ring-[#2563eb] rounded outline-none flex items-center gap-2"
          >
            Raidexi
            <span className="font-mono text-[9px] font-bold text-[#2563eb] bg-[#2563eb]/5 border border-[#2563eb]/10 px-1.5 py-0.5 rounded-lg uppercase tracking-wider">
              SYS.V.1
            </span>
          </button>
        </div>

        <nav className="hidden gap-1 md:flex" aria-label="Điều hướng chính">
          {description.map((item) => (
            <a
              key={item.label}
              href={item.href}
              aria-current={currentPath === item.href ? "page" : undefined}
              className={`relative px-4 py-2 text-[13px] font-semibold tracking-wide transition-all rounded-xl focus-visible:ring-2 focus-visible:ring-[#2563eb] outline-none ${
                currentPath === item.href
                  ? "text-[#2563eb] bg-[#2563eb]/5"
                  : "text-[#64748b] hover:text-[#0f172a] hover:bg-[#f1f5f9]"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {isLoggedIn ? (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2.5 text-sm font-semibold text-[#334155]">
              <button
                onClick={() => navigate("/Dashboard")}
                aria-label="Đến trang tổng quan tài khoản"
                className="flex items-center justify-center w-8 h-8 text-xs font-bold rounded-xl bg-gradient-to-br from-[#2563eb] to-[#1d4ed8] text-[#0f172a] cursor-pointer hover:shadow-md hover:shadow-[#2563eb]/20 transition-all shadow-sm focus-visible:ring-2 focus-visible:ring-[#2563eb] outline-none"
              >
                {context?.userData.fullName?.[0]?.toUpperCase() || "U"}
              </button>
              <button
                onClick={() => navigate("/Dashboard")}
                aria-label={`Xin chào, ${context?.userData.fullName || "User"}`}
                className="cursor-pointer hover:text-[#2563eb] transition-colors text-[13px] focus-visible:ring-2 focus-visible:ring-[#2563eb] rounded outline-none"
              >
                {!isMobileScreen &&
                  `Xin chào, ${context?.userData.fullName || "User"}`}
              </button>
            </div>
            <div className="w-px h-5 bg-[#e2e8f0]" aria-hidden="true" />
            <a
              href="/Dashboard"
              aria-label="Mở hồ sơ"
              className="px-3 py-1.5 text-xs font-semibold text-[#2563eb] hover:bg-[#2563eb]/5 rounded-xl transition-colors hidden md:block focus-visible:ring-2 focus-visible:ring-[#2563eb] outline-none"
            >
              Hồ sơ
            </a>
            {!isMobileScreen && (
              <button
                onClick={handleClick}
                aria-label="Đăng xuất khỏi hệ thống"
                className="px-4 py-2 text-xs font-semibold text-[#64748b] bg-[#f1f5f9] border border-[#e2e8f0] rounded-xl hover:bg-[#e2e8f0] hover:text-[#0f172a] transition-all focus-visible:ring-2 focus-visible:ring-[#2563eb] outline-none"
              >
                Đăng xuất
              </button>
            )}
            { isMobileScreen && (
            <button
              onClick={() => setOpenMobileMenu(true)}
              aria-label="Mở menu điều hướng trên thiết bị di động"
              className="p-2 text-[#64748b] rounded-xl hover:text-[#0f172a] hover:bg-[#f1f5f9] transition-colors focus-visible:ring-2 focus-visible:ring-[#2563eb] outline-none"
            >
              <MenuIcon size={20} aria-hidden="true" />
            </button>
            ) }
          </div>
          
        ) : (
          <div className="flex items-center gap-3">
            <a
              href="/Login"
              aria-label="Đăng nhập vào hệ thống"
              className="px-5 py-2.5 text-[13px] font-semibold text-[#334155] bg-white border border-[#e2e8f0] rounded-xl hover:bg-[#f1f5f9] hover:border-[#cbd5e1] transition-all focus-visible:ring-2 focus-visible:ring-[#2563eb] outline-none"
            >
              Đăng nhập
            </a>
            <a
              href="/SignUp"
              aria-label="Đăng ký tài khoản mới"
              className="px-5 py-2.5 text-[13px] font-semibold text-[#0f172a] bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] rounded-xl hover:from-[#1d4ed8] hover:to-[#1e40af] shadow-sm shadow-[#2563eb]/20 hover:shadow-md transition-all focus-visible:ring-2 focus-visible:ring-[#2563eb] outline-none"
            >
              Đăng ký
            </a>
          </div>
        )}
      </div>
    </header>
  );
};
