import { useRouterService } from "@/Shared/Service/routerService";
import { Printer } from "lucide-react";
import React from "react";

const Header: React.FC = () => {
  const navigate = useRouterService().navigate;

  return (
    <header className="no-print sticky top-0 z-40 border-b border-[rgba(24,23,20,0.1)] bg-[rgba(250,247,239,0.9)] px-5 py-4 backdrop-blur-3xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <button onClick={() => navigate("/")} className="text-left" type="button">
          <span className="block text-lg font-extrabold tracking-[0.18em] text-[var(--ink)]">RAIDEXI</span>
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--ink-muted)] sm:block">Tài liệu số đo</span>
        </button>
        <button onClick={() => window.print()} className="rx-btn rx-btn-secondary" type="button">
          <Printer size={15} strokeWidth={1.35} />
          <span className="hidden sm:inline">In bản xem trước</span>
          <span className="sm:hidden">In</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
