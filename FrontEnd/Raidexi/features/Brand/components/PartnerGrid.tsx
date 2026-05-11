import React from 'react';
import { PARTNER_ITEMS } from '../constants';


const PartnerGrid: React.FC = () => {
  return (
    <section className="w-full border-t border-border-subtle font-sans">
      <div className="grid grid-cols-2 mx-auto border-l border-border-subtle md:grid-cols-3 lg:grid-cols-5 bg-white">
        {PARTNER_ITEMS.map((item, index) => {
          if ('type' in item && item.type === 'join') {
            return (
              <div 
                key={`join-${index}`}
                className="aspect-4/3 flex items-center justify-center border-r border-b border-border-subtle p-8 group hover:bg-[#f1f5f9] transition-all duration-300 cursor-pointer shadow-sm"
              >
                <div className="flex flex-col items-center gap-2 transition-opacity opacity-60 group-hover:opacity-100 text-primary">
                  <span className="text-4xl material-symbols-outlined">handshake</span>
                  <span className="text-xs font-bold tracking-widest uppercase">Gia nhập</span>
                </div>
              </div>
            );
          }
          if ('src' in item) {
             return (
              <div 
                key={`partner-${index}`}
                className="aspect-4/3 flex items-center justify-center border-r border-b border-border-subtle p-8 group hover:bg-[#f1f5f9] hover:shadow-sm transition-all duration-300"
              >
                <img
                  className="w-2/3 h-auto transition-all duration-500 opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-80 brightness-150"
                  src={item.src}
                  alt={item.alt}
                />
              </div>
            );
          }
          
          return null;
        })}
      </div>
    </section>
  );
};

export default PartnerGrid;