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
    <header className="sticky top-0 z-50 border-b border-border-subtle bg-[#1a1510]/95 backdrop-blur-md" role="banner">
      <div className="flex items-center justify-between h-16 px-6 mx-auto max-w-7xl">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary" aria-hidden="true">
            <SquareActivity size={20} strokeWidth={2.5} />
          </div>
          <button
            onClick={() => {
              window.scrollBy(0, 0);
              navigate("/");
            }}
            aria-label="Về trang chủ Raidexi"
            className="font-sans text-xl font-bold tracking-tight text-white hover:text-primary transition-colors focus-visible:ring-2 focus-visible:ring-primary rounded outline-none flex items-center gap-2"
          >
            Raidexi
            <span className="font-mono text-[9px] font-bold text-primary bg-primary/10 border border-primary/20 px-1.5 py-0.5 rounded-md uppercase tracking-wider">
              SYS.V.1
            </span>
          </button>
        </div>

        <nav className="hidden gap-8 md:flex" aria-label="Điều hướng chính">
          {description.map((item) => (
            <a
              key={item.label}
              href={item.href}
              aria-current={currentPath === item.href ? "page" : undefined}
              className={`relative px-1 py-2 text-[13px] font-semibold tracking-wide transition-colors focus-visible:ring-2 focus-visible:ring-primary rounded outline-none ${
                currentPath === item.href
                  ? "text-primary"
                  : "text-text-muted hover:text-white"
              }`}
            >
              {item.label}
              {currentPath === item.href && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full" />
              )}
            </a>
          ))}
        </nav>

        {isLoggedIn ? (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2.5 text-sm font-semibold text-text-secondary">
              <button
                onClick={() => navigate("/Dashboard")}
                aria-label="Đến trang tổng quan tài khoản"
                className="flex items-center justify-center w-8 h-8 text-xs font-bold rounded-full bg-primary text-background-dark cursor-pointer hover:bg-primary-dark transition-colors shadow-sm focus-visible:ring-2 focus-visible:ring-primary outline-none"
              >
                {context?.userData.fullName?.[0]?.toUpperCase() || "U"}
              </button>
              <button
                onClick={() => navigate("/Dashboard")}
                aria-label={`Xin chào, ${context?.userData.fullName || "User"}`}
                className="cursor-pointer hover:text-primary transition-colors text-[13px] focus-visible:ring-2 focus-visible:ring-primary rounded outline-none"
              >
                {!isMobileScreen &&
                  `Xin chào, ${context?.userData.fullName || "User"}`}
              </button>
            </div>
            <div className="w-px h-5 bg-border-subtle" aria-hidden="true" />
            <a
              href="/Dashboard"
              aria-label="Mở hồ sơ"
              className="px-3 py-1.5 text-xs font-semibold text-primary hover:bg-primary/10 rounded-lg transition-colors hidden md:block focus-visible:ring-2 focus-visible:ring-primary outline-none"
            >
              Hồ sơ
            </a>
            {!isMobileScreen && (
              <button
                onClick={handleClick}
                aria-label="Đăng xuất khỏi hệ thống"
                className="px-4 py-2 text-xs font-semibold text-text-muted bg-surface-dark border border-border-subtle rounded-lg hover:bg-surface-hover hover:text-white transition-all focus-visible:ring-2 focus-visible:ring-primary outline-none"
              >
                Đăng xuất
              </button>
            )}
            { isMobileScreen && (
            <button
              onClick={() => setOpenMobileMenu(true)}
              aria-label="Mở menu điều hướng trên thiết bị di động"
              className="p-2 text-text-muted rounded-lg hover:text-white hover:bg-surface-hover transition-colors focus-visible:ring-2 focus-visible:ring-primary outline-none"
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
              className="px-5 py-2.5 text-[13px] font-semibold text-text-secondary bg-surface-dark border border-border-subtle rounded-xl hover:bg-surface-hover hover:border-border-brass transition-all focus-visible:ring-2 focus-visible:ring-primary outline-none"
            >
              Đăng nhập
            </a>
            <a
              href="/SignUp"
              aria-label="Đăng ký tài khoản mới"
              className="px-5 py-2.5 text-[13px] font-semibold text-background-dark bg-primary rounded-xl hover:bg-primary-dark shadow-sm hover:shadow transition-all focus-visible:ring-2 focus-visible:ring-primary outline-none"
            >
              Đăng ký
            </a>
          </div>
        )}
      </div>
    </header>
  );
};
