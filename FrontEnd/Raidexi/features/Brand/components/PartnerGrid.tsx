import React from "react";
import { Handshake } from "lucide-react";
import { PARTNER_ITEMS } from "../constants";

const PartnerGrid: React.FC = () => {
  return (
    <section className="rx-section pt-0">
      <div className="rx-container">
        <div className="rx-shell">
          <div className="rx-core grid grid-cols-2 overflow-hidden md:grid-cols-3 lg:grid-cols-5">
            {PARTNER_ITEMS.map((item, index) => {
              if ("type" in item && item.type === "join") {
                return (
                  <a
                    key={`join-${index}`}
                    href="/Contact"
                    className="flex aspect-[4/3] items-center justify-center border-b border-r border-[rgba(24,23,20,0.08)] p-8 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-[rgba(93,116,101,0.08)]"
                  >
                    <span className="flex flex-col items-center gap-3 text-[var(--signal-blue)]">
                      <Handshake size={28} strokeWidth={1.35} />
                      <span className="font-mono text-[10px] font-bold uppercase tracking-[0.16em]">Gia nhập</span>
                    </span>
                  </a>
                );
              }

              if ("src" in item) {
                return (
                  <div key={`partner-${index}`} className="flex aspect-[4/3] items-center justify-center border-b border-r border-[rgba(24,23,20,0.08)] p-8">
                    <img className="h-auto w-2/3 opacity-45 grayscale transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:opacity-85 hover:grayscale-0" src={item.src} alt={item.alt} />
                  </div>
                );
              }

              return null;
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnerGrid;
